-- Disposable PostgreSQL 17 fixture for CI only. Never apply to Supabase production.
-- Minimal stand-ins for Supabase Auth; these are NOT actual Auth accounts or JWTs.
\set ON_ERROR_STOP on

create role anon nologin;
create role authenticated nologin;

create schema auth;
revoke all on schema auth from public;
create table auth.users (
  id uuid primary key
);

-- Approximate auth.uid() by reading the JWT subject GUC that PostgREST sets.
-- The role/JWT subject are simulated in the separate psql behavior assertions.
create function auth.uid()
returns uuid
language sql
stable
set search_path = pg_catalog
as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid;
$$;

revoke all on function auth.uid() from public;
grant usage on schema auth to authenticated;
grant execute on function auth.uid() to authenticated;

insert into auth.users (id) values
  ('00000000-0000-4000-8000-00000000000a'::uuid),
  ('00000000-0000-4000-8000-00000000000b'::uuid);
