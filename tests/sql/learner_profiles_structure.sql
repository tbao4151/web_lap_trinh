-- AlgoAcademy learner_profiles: structural smoke assertions.
-- Run ONLY after applying 20261114033000_learner_profiles_rls.sql
-- to an isolated disposable Supabase database.
-- Read-only catalog inspection; this does NOT prove RLS behavior.
-- Use a privileged SQL editor/psql connection. Any failed assertion raises an error.
do $checks$
declare
  target oid := to_regclass('public.learner_profiles');
  policy_count integer;
  owner_policy_count integer;
begin
  if target is null then
    raise exception 'learner_profiles migration not applied';
  end if;

  if not exists (
    select 1 from pg_class
    where oid = target and relkind in ('r','p') and relrowsecurity
  ) then
    raise exception 'learner_profiles must have RLS enabled';
  end if;

  if has_table_privilege('anon', target, 'SELECT')
     or has_table_privilege('anon', target, 'INSERT')
     or has_table_privilege('anon', target, 'UPDATE')
     or has_table_privilege('anon', target, 'DELETE') then
    raise exception 'anon must not have learner_profiles CRUD privileges';
  end if;

  -- PUBLIC grants reach anon and all other roles, including future roles.
  -- Checking anon alone cannot detect broad grants masked by a later REVOKE.
  if exists (
    select 1
    from pg_class c,
         lateral aclexplode(coalesce(c.relacl, acldefault('r', c.relowner))) acl
    where c.oid = target
      and acl.grantee = 0
      and acl.privilege_type in ('SELECT', 'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'REFERENCES', 'TRIGGER')
  ) then
    raise exception 'learner_profiles must not grant table privileges to PUBLIC';
  end if;

  if not (
    has_table_privilege('authenticated', target, 'SELECT')
    and has_table_privilege('authenticated', target, 'INSERT')
    and has_table_privilege('authenticated', target, 'UPDATE')
    and has_table_privilege('authenticated', target, 'DELETE')
  ) then
    raise exception 'authenticated role is missing expected CRUD privileges';
  end if;

  -- Authenticated learners may edit only their own rows via RLS; they must
  -- never receive table-wide maintenance or ownership-like privileges.
  if has_table_privilege('authenticated', target, 'TRUNCATE')
     or has_table_privilege('authenticated', target, 'REFERENCES')
     or has_table_privilege('authenticated', target, 'TRIGGER') then
    raise exception 'authenticated must not have elevated learner_profiles table privileges';
  end if;

  -- Ensure all four policies are scoped to authenticated and actually bind
  -- their predicates to the current authenticated user's UUID.
  -- Structural assertions supplement (never replace) JWT behavioral tests.
  if exists (
    select 1
    from pg_policy p
    where p.polrelid = target
      and (
        p.polcmd not in ('r', 'a', 'w', 'd')
        or p.polroles <> array['authenticated'::regrole::oid]
        or (p.polqual is not null and
            (pg_get_expr(p.polqual, p.polrelid) not like '%auth.uid()%'
             or pg_get_expr(p.polqual, p.polrelid) not like '%user_id%'))
        or (p.polwithcheck is not null and
            (pg_get_expr(p.polwithcheck, p.polrelid) not like '%auth.uid()%'
             or pg_get_expr(p.polwithcheck, p.polrelid) not like '%user_id%'))
      )
  ) then
    raise exception 'unexpected learner_profiles policy scope or ownership expression';
  end if;

  select count(*) into policy_count from pg_policy where polrelid = target;
  if policy_count <> 4 then
    raise exception 'expected 4 policies, found %', policy_count;
  end if;

  select count(*) into owner_policy_count
  from pg_policies
  where schemaname = 'public'
    and tablename = 'learner_profiles'
    and (
      (policyname = 'profiles_select_own' and cmd = 'SELECT' and qual is not null and with_check is null)
      or (policyname = 'profiles_insert_own' and cmd = 'INSERT' and qual is null and with_check is not null)
      or (policyname = 'profiles_update_own' and cmd = 'UPDATE' and qual is not null and with_check is not null)
      or (policyname = 'profiles_delete_own' and cmd = 'DELETE' and qual is not null and with_check is null)
    )
    and roles = array['authenticated']::name[];
  if owner_policy_count <> 4 then
    raise exception 'unexpected policy names, commands, role targets, or predicates';
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conrelid = target
      and contype = 'f'
      and confrelid = 'auth.users'::regclass
      and confdeltype = 'c'
  ) then
    raise exception 'missing cascading auth.users foreign key';
  end if;

  raise notice 'Structural checks passed; client JWT owner/non-owner RLS tests are still REQUIRED';
end
$checks$;
