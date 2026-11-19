-- Disposable PostgreSQL regression for PR #50. NEVER run on production.
-- Run as PostgreSQL superuser from repository root:
--   psql -X -v ON_ERROR_STOP=1 -d disposable_db -f tests/sql/rls_auto_enable_revoke_disposable.sql
-- All setup and DDL are rolled back. Requires psql (for relative migration include).
BEGIN;

CREATE ROLE anon NOLOGIN;
CREATE ROLE authenticated NOLOGIN;

CREATE OR REPLACE FUNCTION public.rls_auto_enable()
RETURNS event_trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog
AS $function$
DECLARE
  command record;
BEGIN
  FOR command IN SELECT * FROM pg_event_trigger_ddl_commands() LOOP
    IF command.object_type = 'table' AND command.schema_name = 'public' THEN
      EXECUTE format('ALTER TABLE %s ENABLE ROW LEVEL SECURITY', command.object_identity);
    END IF;
  END LOOP;
END
$function$;

CREATE EVENT TRIGGER disposable_rls_auto_enable
  ON ddl_command_end WHEN TAG IN ('CREATE TABLE')
  EXECUTE FUNCTION public.rls_auto_enable();

-- Confirm the test fixture reproduces the default PUBLIC grant.
DO $$
BEGIN
  IF NOT has_function_privilege('anon', 'public.rls_auto_enable()', 'EXECUTE')
    OR NOT has_function_privilege('authenticated', 'public.rls_auto_enable()', 'EXECUTE')
  THEN
    RAISE EXCEPTION 'Fixture does not reproduce default EXECUTE exposure';
  END IF;
END $$;

CREATE TABLE public.disposable_rls_before (id integer PRIMARY KEY);

DO $$
BEGIN
  IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.disposable_rls_before'::regclass) THEN
    RAISE EXCEPTION 'Fixture event trigger failed before migration';
  END IF;
END $$;

-- Execute the exact proposed migration, not a duplicate of its statements.
\ir ../../supabase/migrations/20261119235500_revoke_rls_auto_enable_execute.sql

CREATE TABLE public.disposable_rls_after (id integer PRIMARY KEY);

DO $$
BEGIN
  IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.disposable_rls_after'::regclass) THEN
    RAISE EXCEPTION 'RLS event trigger failed after EXECUTE revocation';
  END IF;
  IF has_function_privilege('anon', 'public.rls_auto_enable()', 'EXECUTE')
    OR has_function_privilege('authenticated', 'public.rls_auto_enable()', 'EXECUTE')
    OR EXISTS (\n      SELECT 1 FROM pg_proc p, LATERAL aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) acl\n      WHERE p.oid = 'public.rls_auto_enable()'::regprocedure\n        AND acl.grantee = 0 AND acl.privilege_type = 'EXECUTE'\n    )
  THEN
    RAISE EXCEPTION 'Client/PUBLIC EXECUTE remains after migration';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_event_trigger
    WHERE evtname = 'disposable_rls_auto_enable' AND evtenabled = 'O'
  ) THEN
    RAISE EXCEPTION 'Event trigger disabled or missing';
  END IF;
END $$;

ROLLBACK;
