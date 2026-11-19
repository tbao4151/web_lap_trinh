-- Review-only hardening: remove default client EXECUTE on the RLS DDL event-trigger function.
-- Observed 2026-11-19 (read-only): SECURITY DEFINER, search_path=pg_catalog,
-- proacl NULL; PUBLIC, anon and authenticated all have effective EXECUTE.
-- Does not alter the event trigger, function body, ownership or SECURITY DEFINER.
-- Apply only after explicit production release approval.
DO $$
BEGIN
  IF to_regprocedure('public.rls_auto_enable()') IS NULL THEN
    RAISE EXCEPTION 'Expected public.rls_auto_enable() function is missing';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc p
    WHERE p.oid = 'public.rls_auto_enable()'::regprocedure
      AND p.prosecdef
      AND p.prorettype = 'pg_catalog.event_trigger'::regtype
  ) THEN
    RAISE EXCEPTION 'Unexpected rls_auto_enable() signature or security mode';
  END IF;
END $$;

REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;

DO $$
BEGIN
  IF has_function_privilege('anon', 'public.rls_auto_enable()', 'EXECUTE')
    OR has_function_privilege('authenticated', 'public.rls_auto_enable()', 'EXECUTE')
  THEN
    RAISE EXCEPTION 'Client EXECUTE privilege remains on public.rls_auto_enable()';
  END IF;
END $$;
