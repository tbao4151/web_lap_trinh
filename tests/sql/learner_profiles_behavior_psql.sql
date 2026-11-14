-- AlgoAcademy: disposable Supabase behavioral RLS test.
-- Run with psql as a privileged migration/test operator, NOT in production.
-- Prerequisites: migration applied; pass two distinct throwaway auth.users IDs with -v.
-- All learner_profiles mutations are rolled back. Auth users are not modified.
-- This tests PostgreSQL role/JWT claim simulation, not the HTTP PostgREST path.
\set ON_ERROR_STOP on
begin;

-- Explicitly supply IDs of two disposable test accounts. Never select arbitrary
-- existing auth.users, which may belong to real learners.
\if :{?test_user_a}
\else
  \echo 'Missing test_user_a. Pass -v test_user_a=<throwaway-auth-uuid>'
  \quit 3
\endif
\if :{?test_user_b}
\else
  \echo 'Missing test_user_b. Pass -v test_user_b=<throwaway-auth-uuid>'
  \quit 3
\endif

-- psql variables are expanded outside dollar-quoted blocks.
select set_config('algoacademy.test_user_a', :'test_user_a', true);
select set_config('algoacademy.test_user_b', :'test_user_b', true);

do $$
begin
  if nullif(current_setting('algoacademy.test_user_a', true), '') is null
     or nullif(current_setting('algoacademy.test_user_b', true), '') is null
     or current_setting('algoacademy.test_user_a', true) =
        current_setting('algoacademy.test_user_b', true) then
    raise exception 'Need two distinct disposable auth users';
  end if;
  if exists (
    select 1 from public.learner_profiles
    where user_id in (
      current_setting('algoacademy.test_user_a')::uuid,
      current_setting('algoacademy.test_user_b')::uuid
    )
  ) then
    raise exception 'Test users already have profiles; refusing to modify them';
  end if;
end $$;

-- Anonymous clients must have no read or write access.
set local role anon;
select set_config('request.jwt.claim.role', 'anon', true);
do $$
begin
  begin
    perform 1 from public.learner_profiles limit 1;
    -- An empty result is acceptable only if SELECT is granted, which is forbidden.
    raise exception 'anon unexpectedly has SELECT privilege';
  exception
    when insufficient_privilege then null;
  end;
  begin
    insert into public.learner_profiles (user_id, display_name)
    values (current_setting('algoacademy.test_user_a')::uuid, 'Unauthorized anon');
    raise exception 'anon unexpectedly inserted profile';
  exception
    when insufficient_privilege then null;
  end;
end $$;

set local role authenticated;
select set_config('request.jwt.claim.sub', :'test_user_a', true);
select set_config('request.jwt.claim.role', 'authenticated', true);

insert into public.learner_profiles (user_id, display_name)
values (:'test_user_a'::uuid, 'Temporary RLS A');

do $$
declare a uuid := current_setting('algoacademy.test_user_a')::uuid;
begin
  if (select count(*) from public.learner_profiles where user_id = a) <> 1 then
    raise exception 'Owner A cannot read own profile';
  end if;
end $$;

select set_config('request.jwt.claim.sub', :'test_user_b', true);
do $$
declare
  a uuid := current_setting('algoacademy.test_user_a')::uuid;
  b uuid := current_setting('algoacademy.test_user_b')::uuid;
begin
  if exists (select 1 from public.learner_profiles where user_id = a) then
    raise exception 'B can read A profile';
  end if;
  update public.learner_profiles set display_name = 'Unauthorized' where user_id = a;
  if found then raise exception 'B updated A profile'; end if;
  delete from public.learner_profiles where user_id = a;
  if found then raise exception 'B deleted A profile'; end if;
  begin
    insert into public.learner_profiles (user_id, display_name)
    values (a, 'Spoofed');
    raise exception 'B inserted A profile';
  exception
    when check_violation or insufficient_privilege then null;
  end;
  insert into public.learner_profiles (user_id, display_name)
  values (b, 'Temporary RLS B');
  if not exists (select 1 from public.learner_profiles where user_id = b) then
    raise exception 'B cannot read own profile';
  end if;
end $$;

select set_config('request.jwt.claim.sub', :'test_user_a', true);
update public.learner_profiles set display_name = 'Updated RLS A'
where user_id = :'test_user_a'::uuid;
do $$
begin
  if not exists (
    select 1 from public.learner_profiles
    where user_id = current_setting('algoacademy.test_user_a')::uuid
      and display_name = 'Updated RLS A'
  ) then raise exception 'A cannot update own profile'; end if;
end $$;

rollback;
-- Required additional gate: repeat via actual anon/A/B JWTs over PostgREST.
