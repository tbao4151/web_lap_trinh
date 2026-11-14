-- AlgoAcademy backend foundation: private learner profiles only.
-- REVIEW ONLY: this migration is not applied to any Supabase project.
-- Requires Supabase Auth (auth.users). Never store authorization roles here.
begin;

create table if not exists public.learner_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 120),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.learner_profiles enable row level security;

-- Revoke default/public access first; only authenticated sessions get CRUD.
revoke all on table public.learner_profiles from public, anon, authenticated;
grant select, insert, update, delete on table public.learner_profiles to authenticated;

create policy "profiles_select_own" on public.learner_profiles
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "profiles_insert_own" on public.learner_profiles
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "profiles_update_own" on public.learner_profiles
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "profiles_delete_own" on public.learner_profiles
  for delete to authenticated using ((select auth.uid()) = user_id);

commit;

-- Manual rollback (only if table has no user data; destructive):
-- drop table public.learner_profiles;
