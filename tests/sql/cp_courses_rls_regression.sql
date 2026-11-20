-- Run only against a disposable PostgreSQL database as a privileged test role.
-- psql -v ON_ERROR_STOP=1 -f tests/sql/cp_courses_rls_regression.sql
-- This script rolls back all changes. It does not exercise signed Supabase JWT/PostgREST.
\set ON_ERROR_STOP on
BEGIN;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN CREATE ROLE anon NOLOGIN; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN CREATE ROLE authenticated NOLOGIN; END IF;
END $$;
CREATE SCHEMA IF NOT EXISTS auth;
CREATE TABLE IF NOT EXISTS auth.users (id uuid PRIMARY KEY);
INSERT INTO auth.users (id) VALUES
  ('11111111-1111-4111-8111-111111111111'),
  ('22222222-2222-4222-8222-222222222222')
ON CONFLICT DO NOTHING;

\ir ../../supabase/migrations/20261120203000_cp_courses_readonly_rls.sql

INSERT INTO public.cp_courses (slug, title, language, level, status, author_id)
VALUES
 ('cpp-basics', 'C++ contest basics', 'cpp', 'beginner', 'published', '11111111-1111-4111-8111-111111111111'),
 ('python-draft', 'Python contest draft', 'python', 'advanced', 'draft', '22222222-2222-4222-8222-222222222222'),
 ('cpp-archived', 'Archived contest track', 'cpp', 'basic', 'archived', '11111111-1111-4111-8111-111111111111');

DO $$
DECLARE n int;
BEGIN
  SELECT count(*) INTO n FROM pg_policies
  WHERE schemaname = 'public' AND tablename = 'cp_courses'
    AND policyname = 'cp_courses_published_select';
  IF n <> 1 THEN RAISE EXCEPTION 'published SELECT policy missing'; END IF;
  IF NOT (SELECT relrowsecurity AND relforcerowsecurity FROM pg_class WHERE oid = 'public.cp_courses'::regclass)
  THEN RAISE EXCEPTION 'RLS and FORCE RLS required'; END IF;
  IF has_table_privilege('anon', 'public.cp_courses', 'INSERT')
    OR has_table_privilege('authenticated', 'public.cp_courses', 'UPDATE')
    OR has_table_privilege('authenticated', 'public.cp_courses', 'DELETE')
  THEN RAISE EXCEPTION 'client write privilege leaked'; END IF;
END $$;

SET LOCAL ROLE anon;
DO $$
DECLARE n int;
BEGIN
  SELECT count(*) INTO n FROM public.cp_courses;
  IF n <> 1 THEN RAISE EXCEPTION 'anon expected 1 published row, got %', n; END IF;
  BEGIN
    INSERT INTO public.cp_courses (slug,title,language,level,author_id)
    VALUES ('anon-write','Should be blocked','cpp','basic','11111111-1111-4111-8111-111111111111');
    RAISE EXCEPTION 'anon INSERT unexpectedly succeeded';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
END $$;
RESET ROLE;

SET LOCAL ROLE authenticated;
DO $$
DECLARE n int;
BEGIN
  SELECT count(*) INTO n FROM public.cp_courses;
  IF n <> 1 THEN RAISE EXCEPTION 'authenticated expected 1 published row, got %', n; END IF;
  BEGIN
    UPDATE public.cp_courses SET title = 'Unauthorized' WHERE slug = 'cpp-basics';
    RAISE EXCEPTION 'authenticated UPDATE unexpectedly succeeded';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
  BEGIN
    DELETE FROM public.cp_courses WHERE slug = 'cpp-basics';
    RAISE EXCEPTION 'authenticated DELETE unexpectedly succeeded';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
END $$;
RESET ROLE;

-- Constraint regression tests as the privileged migration owner.
DO $$
BEGIN
  BEGIN
    INSERT INTO public.cp_courses (slug,title,language,level,author_id)
    VALUES ('java-invalid','Unsupported language','java','basic','11111111-1111-4111-8111-111111111111');
    RAISE EXCEPTION 'invalid language accepted';
  EXCEPTION WHEN check_violation THEN NULL;
  END;
  BEGIN
    INSERT INTO public.cp_courses (slug,title,language,level,author_id)
    VALUES ('invalid-author','Missing user','cpp','basic','33333333-3333-4333-8333-333333333333');
    RAISE EXCEPTION 'invalid author accepted';
  EXCEPTION WHEN foreign_key_violation THEN NULL;
  END;
END $$;
ROLLBACK;
