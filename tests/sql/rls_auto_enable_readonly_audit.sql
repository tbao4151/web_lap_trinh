-- AlgoAcademy: read-only audit of the existing public.rls_auto_enable function.
-- Run against the target Supabase project using a trusted SQL console/operator.
-- This script changes NO privileges, functions, policies, or data.
-- Review ALL overloads before proposing any REVOKE. Do not run on assumptions.
--
-- SECURITY DEFINER executes with owner privileges. PostgreSQL functions
-- normally grant EXECUTE to PUBLIC by default unless explicitly revoked.
-- Both direct grants and inherited/PUBLIC privileges matter.
select
  n.nspname as schema_name,
  p.proname as function_name,
  pg_get_function_identity_arguments(p.oid) as identity_arguments,
  pg_get_userbyid(p.proowner) as owner_name,
  p.prosecdef as security_definer,
  p.proconfig as function_settings,
  has_function_privilege('anon', p.oid, 'EXECUTE') as anon_can_execute,
  has_function_privilege('authenticated', p.oid, 'EXECUTE') as authenticated_can_execute,
  exists (
    select 1
    from aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) acl
    where acl.grantee = 0 and acl.privilege_type = 'EXECUTE'
  ) as execute_granted_to_public,
  p.oid::regprocedure::text as exact_signature,
  pg_get_functiondef(p.oid) as definition_for_manual_review
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname = 'rls_auto_enable'
order by identity_arguments;

-- If no rows appear, the function is absent from this database.
-- Before any change: inspect trigger/event-trigger dependencies and the body,
-- identify exact signatures, test revocations in an isolated environment,
-- and confirm legitimate migration/maintenance workflows still work.
-- A possible least-privilege remediation, only AFTER verification, is to
-- revoke EXECUTE from PUBLIC, anon, and authenticated on each exact signature.
-- Do not blindly execute a REVOKE or alter SECURITY DEFINER in production.


-- Dependency inventory: event triggers and ordinary table triggers that call
-- any overload of public.rls_auto_enable. A missing row means no direct trigger
-- reference was found; it does not prove the function is unused elsewhere.
select
  'event_trigger' as trigger_kind,
  e.evtname as trigger_name,
  e.evtevent as trigger_event,
  e.evtenabled::text as enabled_mode,
  null::text as relation_name,
  e.evtfoid::regprocedure::text as called_function
from pg_event_trigger e
join pg_proc p on p.oid = e.evtfoid
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.proname = 'rls_auto_enable'
union all
select
  'table_trigger' as trigger_kind,
  t.tgname as trigger_name,
  null::text as trigger_event,
  t.tgenabled::text as enabled_mode,
  t.tgrelid::regclass::text as relation_name,
  t.tgfoid::regprocedure::text as called_function
from pg_trigger t
join pg_proc p on p.oid = t.tgfoid
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.proname = 'rls_auto_enable'
  and not t.tgisinternal
order by trigger_kind, trigger_name;

-- Review pg_get_functiondef above and the trigger inventory together.
-- This audit does not revoke privileges or prove that revocation is safe.
