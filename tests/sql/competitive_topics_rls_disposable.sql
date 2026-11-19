-- Run ONLY against a disposable PostgreSQL database after applying
-- supabase/migrations/20261119210000_competitive_topics_rls.sql.
-- Requires a privileged test connection; all fixture changes roll back.
BEGIN;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    CREATE ROLE anon NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    CREATE ROLE authenticated NOLOGIN;
  END IF;
END $$;

DO $$
DECLARE enabled boolean; forced boolean;
BEGIN
  SELECT relrowsecurity, relforcerowsecurity INTO enabled, forced
  FROM pg_class WHERE oid = 'public.competitive_topics'::regclass;
  IF NOT enabled OR NOT forced THEN
    RAISE EXCEPTION 'competitive_topics must enable and FORCE RLS';
  END IF;
  IF NOT has_table_privilege('anon', 'public.competitive_topics', 'SELECT')
     OR NOT has_table_privilege('authenticated', 'public.competitive_topics', 'SELECT') THEN
    RAISE EXCEPTION 'read access missing';
  END IF;
  IF has_table_privilege('anon', 'public.competitive_topics', 'INSERT,UPDATE,DELETE')
     OR has_table_privilege('authenticated', 'public.competitive_topics', 'INSERT,UPDATE,DELETE') THEN
    RAISE EXCEPTION 'client role unexpectedly has write access';
  END IF;
END $$;

INSERT INTO public.competitive_topics (slug, title_vi, sort_order)
VALUES ('disposable-rls-topic', 'Chủ đề kiểm thử', 1);

SET LOCAL ROLE anon;
DO $$
BEGIN
  IF (SELECT count(*) FROM public.competitive_topics WHERE slug = 'disposable-rls-topic') <> 1 THEN
    RAISE EXCEPTION 'anon cannot read published taxonomy';
  END IF;
END $$;
RESET ROLE;

SET LOCAL ROLE authenticated;
DO $$
BEGIN
  IF (SELECT count(*) FROM public.competitive_topics WHERE slug = 'disposable-rls-topic') <> 1 THEN
    RAISE EXCEPTION 'authenticated cannot read published taxonomy';
  END IF;
END $$;
RESET ROLE;
ROLLBACK;
