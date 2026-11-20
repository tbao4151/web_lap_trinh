-- Review-only migration. Apply only to a disposable Supabase/PostgreSQL project
-- until release is explicitly approved. Does not enable client-side author writes.
create table public.cp_courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  language text not null,
  level text not null,
  status text not null default 'draft',
  author_id uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cp_courses_slug_format check (
    char_length(slug) between 3 and 100
    and slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
  ),
  constraint cp_courses_title_length check (
    char_length(btrim(title)) between 3 and 200
  ),
  constraint cp_courses_language_check check (language in ('cpp', 'python')),
  constraint cp_courses_level_check check (
    level in ('beginner', 'basic', 'intermediate', 'advanced', 'oi_icpc')
  ),
  constraint cp_courses_status_check check (
    status in ('draft', 'published', 'archived')
  )
);

create index cp_courses_published_language_idx
  on public.cp_courses (language, level, slug)
  where status = 'published';

create index cp_courses_author_idx on public.cp_courses (author_id);

alter table public.cp_courses enable row level security;
alter table public.cp_courses force row level security;

-- Default PostgreSQL PUBLIC table grants may vary by project configuration.
-- Explicitly disallow all client writes; author management will be added only
-- after server-verified teacher roles and ownership tests exist.
revoke all on table public.cp_courses from public, anon, authenticated;
grant select on table public.cp_courses to anon, authenticated;

create policy cp_courses_published_select
  on public.cp_courses
  for select
  to anon, authenticated
  using (status = 'published');

-- No INSERT/UPDATE/DELETE policies or grants for anon/authenticated.
-- SECURITY DEFINER event-trigger remediation belongs to PR #50.
