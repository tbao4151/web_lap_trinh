-- AlgoAcademy competitive programming topic taxonomy (C++ / Python).
-- Review-only migration. Do not apply to production without release approval.
-- A topic is language-neutral: C++ and Python share the same algorithm taxonomy.
create table if not exists public.competitive_topics (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title_vi text not null,
  description_vi text,
  parent_id bigint references public.competitive_topics(id) on delete restrict,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint competitive_topics_slug_format
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint competitive_topics_title_nonempty
    check (length(btrim(title_vi)) > 0),
  constraint competitive_topics_no_self_parent
    check (parent_id is null or parent_id <> id)
);

create index if not exists competitive_topics_parent_sort_idx
  on public.competitive_topics (parent_id, sort_order, id);

-- No client role can insert, update or delete taxonomy rows.
-- Publication is managed by a privileged server-side migration/administration path.
alter table public.competitive_topics enable row level security;
alter table public.competitive_topics force row level security;

revoke all on table public.competitive_topics from public, anon, authenticated;
grant select on table public.competitive_topics to anon, authenticated;

drop policy if exists competitive_topics_public_read on public.competitive_topics;
create policy competitive_topics_public_read
  on public.competitive_topics
  for select
  to anon, authenticated
  using (true);

-- Do not grant sequence usage or table write privileges to client roles.
-- A future editor must enforce admin authorization on the server and use
-- a narrowly scoped privileged path, not a browser-side service-role key.
