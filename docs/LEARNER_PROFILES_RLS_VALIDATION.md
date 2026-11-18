# Learner profiles migration: review and validation gate

This document applies to `20261114033000_learner_profiles_rls.sql`. **The migration is not applied to the AlgoAcademy Supabase project or to production.** PostgreSQL-only CI checks have passed on a disposable test container (below), but real Supabase Auth JWT/PostgREST validation is still required before production consideration.

## CI verification: disposable PostgreSQL 17 (2026-11-18)
- Workflow: `.github/workflows/learner-profiles-rls.yml`; [successful run #44266255557](https://github.com/tbao4151/web_lap_trinh/actions/runs/44266255557) for commit `0735686a335912c969fa463154ecb0714c7b372e`.
- Bootstrap: `tests/sql/learner_profiles_ci_bootstrap.sql` creates **synthetic** `auth.users`, `anon`, `authenticated` and a minimal `auth.uid()` function inside a one-use PostgreSQL 17 container. Fixture user IDs are static throwaway UUIDs, not customer or real Supabase Auth records.
- Execution: apply the **exact migration**, run `tests/sql/learner_profiles_structure.sql`, then `tests/sql/learner_profiles_behavior_psql.sql` with simulated JWT claim GUCs and PostgreSQL `SET LOCAL ROLE`. All steps passed in the linked run.
- Covered: structure, grants, owner-only SELECT/INSERT/UPDATE/DELETE, anon denials, cross-account access restrictions, attempted ownership reassignment.
- **Not covered:** authentic JWT signature validation, PostgREST requests, Supabase Auth sign-in/session lifecycle, production grants/function warning, the managed Supabase project's full schema/events. The fixture does **not** replace a disposable Supabase project.
- CI automatically reruns for subsequent PR changes; check the latest workflow conclusion against the latest head SHA before any merge.

## Remaining integration gate
Use a disposable Supabase project with its actual Auth users and PostgREST endpoint. Validate `anon`, user A, and user B through actual signed JWTs; verify the FK cascade and collect redacted results. Do not write production data.

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

## Fresh read-only AlgoAcademy security audit (2026-11-18, 16:04 Asia/Ho_Chi_Minh)
The linked **production** Supabase project was queried using catalog-only SELECTs; no SQL mutations, migrations, test users, or production deployments were performed.

- Project status: `ACTIVE_HEALTHY`, PostgreSQL `17.11.0.019`.
- `to_regclass('public.learner_profiles')` returned **NULL**. The PR migration has **not** been applied to this project.
- `public.rls_auto_enable()`: owner `postgres`; `prosecdef = true` (`SECURITY DEFINER`); `proacl = NULL`.
- Effective `EXECUTE` privilege: `PUBLIC = true`, `anon = true`, `authenticated = true`. This confirms the warning persists as of this audit; it does **not** by itself establish that a client can exploit the event-trigger function as an RPC.
- Event trigger `ensure_rls` references `rls_auto_enable()` and has `evtenabled = 'O'` (enabled for origin/local sessions).
- Do **not** revoke production privileges blindly: inspect function body/dependencies, test least-privilege revocation and event-trigger behavior on a disposable Supabase clone, then propose a separately reviewed migration. This PR remains blocked on genuine Auth JWT/PostgREST owner-isolation tests.

## Read-only production audit snapshot (2026-11-15; NOT a migration test)
A read-only inspection of the linked AlgoAcademy Supabase project (PostgreSQL 17.11) found:
- `public.rls_auto_enable()` is owned by `postgres`, returns `event_trigger`, uses `SECURITY DEFINER`, and sets `search_path=pg_catalog`.
- `proacl` is NULL (default privileges); effective EXECUTE is **true** for `PUBLIC`, `anon`, and `authenticated`.
- One event trigger references this function. Its implementation attempts to enable RLS on newly created `public` tables, but catches and logs errors. This mechanism is **not a substitute** for explicitly enabling RLS and defining restrictive policies in every migration.
- `public.learner_profiles` does not exist in this project. The proposed migration remains unapplied.

**Proposed remediation for separate review (do not run in production as part of this PR):**

```sql
-- Confirm the function identity, event-trigger dependency and privileges first.
select p.oid::regprocedure, p.prosecdef, p.proacl,
       has_function_privilege('anon', p.oid, 'EXECUTE') as anon_exec,
       has_function_privilege('authenticated', p.oid, 'EXECUTE') as authenticated_exec
from pg_proc p
where p.oid = 'public.rls_auto_enable()'::regprocedure;

-- Candidate least-privilege change, only after testing in an isolated clone:
-- REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;
-- Verify both effective privileges become false and the event trigger still works.
-- Rollback, if required and explicitly approved:
-- GRANT EXECUTE ON FUNCTION public.rls_auto_enable() TO PUBLIC;
```

The proposed rollback restores the *observed default effective grant*, not a snapshot of any future ACL changes. Before using it, re-read current privileges. An event-trigger function is not a normal application RPC endpoint, so the warning should not be described as a confirmed exploit. No production SQL writes were performed during this audit.
