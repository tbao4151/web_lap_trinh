# Learner profiles migration: review and validation gate

This document applies to `20261114033000_learner_profiles_rls.sql`. It is **not** evidence that the migration was applied or tested. Do not apply it to production until the checks below pass in a disposable Supabase project.

## Preconditions
1. Use an isolated Supabase project with Auth schema and `anon` / `authenticated` roles. Confirm the target table does not already exist; the migration deliberately fails if it does.
2. Record the migration checksum and verify no prior migration creates `public.learner_profiles`.
3. Apply the SQL using a privileged migration connection, not a client-side key. Inspect the migration output for errors.

## Structural checks (SQL Editor; read-only)

```sql
select c.relname, c.relrowsecurity, c.relforcerowsecurity
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relname = 'learner_profiles';

select policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'learner_profiles'
order by policyname;

select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public' and table_name = 'learner_profiles'
order by grantee, privilege_type;
```

Expected: RLS enabled, four owner-only policies, authenticated CRUD grants, and no anonymous table grants. Do not infer RLS enforcement solely from policy definitions.

## Behavioral checks (disposable project only)
- Create two independent test Auth accounts A and B; use **their actual authenticated JWTs** via the normal Supabase client, never a service-role client.
- As anonymous: SELECT returns no rows; INSERT, UPDATE and DELETE cannot modify rows.
- As A: INSERT a profile with A's UID succeeds; SELECT A succeeds; UPDATE A succeeds.
- As B: SELECT A returns no row; INSERT/UPDATE/DELETE targeting A fail or affect zero rows; B can create and manage B's own row.
- As A: INSERT a row using B's UID must fail the WITH CHECK policy.
- Repeat the checks through the actual PostgREST/client path, not only SQL Editor as postgres (which can bypass RLS).
- Verify that deleting a test Auth user cascades only their own profile. Remove all disposable test accounts afterward.

## Separate SECURITY DEFINER warning
The `public.rls_auto_enable()` event-trigger function is **outside this migration**. Before any change, inspect its definition, owner, dependencies and effective EXECUTE privileges. A separately reviewed least-privilege migration may revoke EXECUTE from PUBLIC/anon/authenticated, but must validate the event trigger still enables RLS on newly created public tables in a disposable project. Do not drop the event trigger or apply an unverified production change.

## Rollback
Rollback is **destructive**: `DROP TABLE public.learner_profiles;`. Only use it on the disposable project after confirming no user data or dependent objects remain. For a production rollback, first prepare a data-preserving recovery plan and explicit approval.

## Merge gate
Frontend CI and Vercel Preview do not exercise PostgreSQL policies. Merge only after recording disposable-project SQL and client-level RLS results in the PR, confirming the latest PR head and main SHAs, and resolving any concurrent edits.
