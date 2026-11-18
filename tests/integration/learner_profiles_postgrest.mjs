// Manual integration gate for a DISPOSABLE Supabase project only.
// No npm packages; run with Node.js 22+. Never run against production.
// Actual Auth JWTs are sent to PostgREST, not simulated PostgreSQL GUCs.
import assert from 'node:assert/strict';

const required = (name) => {
  const value = process.env[name];
  assert(value, `Missing ${name}`);
  return value;
};
assert.equal(
  required('ALGOACADEMY_DISPOSABLE_CONFIRM'),
  'I_CONFIRM_DISPOSABLE_PROJECT',
  'Refusing to run without explicit disposable-project confirmation',
);
const url = new URL(required('SUPABASE_TEST_URL'));
assert.equal(url.protocol, 'https:', 'HTTPS is required');
assert.equal(url.pathname, '/', 'Supply only the project root URL');
const expectedHost = required('SUPABASE_TEST_EXPECTED_HOST');
assert.equal(url.hostname, expectedHost, 'Target host does not match the reviewed disposable project');
assert.match(url.hostname, /^[a-z0-9-]+\\.supabase\\.co$/, 'Expected a Supabase project hostname');
// Use the legacy anon JWT key for an explicit anonymous Authorization header.\nconst apiKey = required('SUPABASE_TEST_ANON_KEY');\nassert.equal(apiKey.split('.').length, 3, 'Expected legacy JWT anon key (not a publishable key)');
const tokenA = required('SUPABASE_TEST_JWT_A');
const tokenB = required('SUPABASE_TEST_JWT_B');
const decode = (token) => {
  const parts = token.split('.');
  assert.equal(parts.length, 3, 'Expected a three-part JWT');
  const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
  assert.match(payload.sub ?? '', /^[0-9a-f]{8}-[0-9a-f-]{27,}$/i);
  assert.equal(payload.role, 'authenticated', 'Both tokens must belong to authenticated users');
  assert(payload.exp > Date.now() / 1000 + 60, 'JWT must not be expired or about to expire');
  return payload;
};
const a = decode(tokenA);
const b = decode(tokenB);
assert.notEqual(a.sub, b.sub, 'Two distinct Auth users are required');
assert.equal(a.iss, b.iss, 'JWT issuers must match');
assert(a.iss.includes(url.hostname.split('.')[0]), 'JWT issuer must match the disposable project');
const table = new URL('rest/v1/learner_profiles', url);
const request = async (jwt, method, query = '', body) => {
  const endpoint = new URL(table);
  endpoint.search = query;
  const response = await fetch(endpoint, {
    method,
    headers: {
      apikey: apiKey,
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : { Authorization: `Bearer ${apiKey}` }),
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(15000),
  });
  const raw = await response.text();
  let data;
  try { data = raw ? JSON.parse(raw) : null; } catch { data = raw; }
  return { status: response.status, data };
};
const ok = (r, context) => assert(r.status >= 200 && r.status < 300, `${context}: HTTP ${r.status}`);
const denied = (r, context) => assert(r.status === 401 || r.status === 403, `${context}: expected 401/403, got ${r.status}`);
const rows = (r, context) => {
  ok(r, context);
  assert(Array.isArray(r.data), `${context}: expected rows array`);
  return r.data;
};
const select = (id) => `select=user_id,display_name&user_id=eq.${encodeURIComponent(id)}`;
const labelA = 'RLS integration A';
const labelB = 'RLS integration B';
const owned = new Set();
try {
  // Never mutate profiles that existed before this run.
  assert.equal(rows(await request(tokenA, 'GET', select(a.sub)), 'preflight A').length, 0);
  assert.equal(rows(await request(tokenB, 'GET', select(b.sub)), 'preflight B').length, 0);
  const anonRead = await request(null, 'GET', 'select=user_id');
  denied(anonRead, 'anon SELECT (table grants are intentionally revoked)');
  denied(await request(null, 'POST', '', { user_id: a.sub, display_name: 'anon' }), 'anon INSERT');

  ok(await request(tokenA, 'POST', '', { user_id: a.sub, display_name: labelA }), 'A insert');
  owned.add(a.sub);
  assert.equal(rows(await request(tokenA, 'GET', select(a.sub)), 'A read').length, 1);
  assert.equal(rows(await request(tokenB, 'GET', select(a.sub)), 'B read A').length, 0);
  assert.equal(rows(await request(tokenB, 'PATCH', `user_id=eq.${a.sub}`, { display_name: 'spoof' }), 'B update A').length, 0);
  assert.equal(rows(await request(tokenB, 'DELETE', `user_id=eq.${a.sub}`), 'B delete A').length, 0);
  denied(await request(tokenB, 'POST', '', { user_id: a.sub, display_name: 'spoof' }), 'B insert A');
  assert.equal(rows(await request(tokenA, 'PATCH', `user_id=eq.${a.sub}`, { display_name: 'updated A' }), 'A update').length, 1);

  // B has no row yet: a rejected reassignment cannot be explained by duplicate PK.\n  denied(await request(tokenA, 'PATCH', `user_id=eq.${a.sub}`, { user_id: b.sub }), 'A ownership reassignment');\n\n  ok(await request(tokenB, 'POST', '', { user_id: b.sub, display_name: labelB }), 'B insert');
  owned.add(b.sub);
  assert.equal(rows(await request(tokenB, 'GET', select(b.sub)), 'B read').length, 1);
  assert.equal(rows(await request(tokenA, 'GET', select(b.sub)), 'A read B').length, 0);
  denied(await request(tokenA, 'PATCH', `user_id=eq.${a.sub}`, { user_id: b.sub }), 'A ownership reassignment');

  assert.equal(rows(await request(tokenB, 'DELETE', `user_id=eq.${b.sub}`), 'B delete').length, 1);
  owned.delete(b.sub);
  assert.equal(rows(await request(tokenA, 'DELETE', `user_id=eq.${a.sub}`), 'A delete').length, 1);
  owned.delete(a.sub);
  console.log('PASS: disposable Supabase PostgREST JWT owner-isolation checks');
} finally {
  // Best-effort cleanup with the *same* user's JWT; never use service_role.
  for (const [id, jwt] of [[a.sub, tokenA], [b.sub, tokenB]]) {
    if (!owned.has(id)) continue;
    try {
      const r = await request(jwt, 'DELETE', `user_id=eq.${id}`);
      if (r.status >= 300) console.error(`Cleanup requires manual review for test user ${id}: HTTP ${r.status}`);
    } catch { console.error(`Cleanup requires manual review for test user ${id}`); }
  }
}
