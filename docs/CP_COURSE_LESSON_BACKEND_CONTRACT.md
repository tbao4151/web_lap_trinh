# Course → module → lesson: hợp đồng backend C++/Python (đề xuất, chưa triển khai)

Phạm vi: chỉ lập trình thi đấu C++ và Python, từ nhập môn tới HSG/OI/ICPC. Tài liệu này xác định một lát cắt backend nhỏ để review trước khi viết migration; **không** khẳng định database, Auth hay RLS đã hoạt động. Không thay đổi luồng UI Demo/localStorage hiện tại.

## Mô hình dữ liệu tối thiểu

- `courses`: `id uuid primary key`, `slug text unique not null`, `title text not null`, `language text not null check (language in ('cpp','python'))`, `level text not null`, `status text not null check (status in ('draft','published','archived'))`, `author_id uuid not null references auth.users(id)`, timestamps. Không thêm trường thanh toán.
- `course_modules`: `id uuid primary key`, `course_id uuid not null references courses(id)`, `title text not null`, `position integer not null check (position >= 0)`; unique `(course_id,position)`.
- `lessons`: `id uuid primary key`, `module_id uuid not null references course_modules(id)`, `slug text not null`, `title text not null`, `position integer not null check (position >= 0)`, `status text not null check (status in ('draft','published'))`; unique `(module_id,slug)` and `(module_id,position)`. Lesson content/block schema is intentionally deferred.
- Add indexes on module/course and lesson/module foreign keys; use transactions for reorder to avoid temporary unique-position conflicts. Avoid client-provided `author_id` on create.

## Authorization / RLS acceptance criteria

1. Enable and **force** RLS on each new public table; revoke unnecessary grants and define explicit grants for authenticated/anon roles. Never rely on client-side Role Switcher.
2. Anonymous users can SELECT only published courses and published lessons belonging to published courses; no anonymous INSERT/UPDATE/DELETE. Draft modules/lessons must not leak through direct table access.
3. Authenticated learners have the same public-read boundary in this slice. Private enrollment/progress is outside this migration.
4. Authors may manage their own draft courses/modules/lessons only after a **server-verified teacher role** exists. Do not infer teacher status from a JWT user-editable metadata field. Until server roles exist, leave author mutations unavailable to clients; service-role administration must remain server-only.
5. Check every UPDATE policy with both `USING` and `WITH CHECK`, and protect ownership/parent FKs from reassignment to another user. Validate parent ownership on nested writes. No SECURITY DEFINER helper with EXECUTE granted to anon/authenticated unless explicitly audited.
6. The `public.rls_auto_enable()` event-trigger helper must not be callable by anon/authenticated; coordinate with existing PR #50 rather than duplicating its migration.

## Verification gate (disposable PostgreSQL/Supabase only)

- Apply migrations on a fresh isolated database in chronological order, including PR #43/#49/#50 if they are dependencies; do not touch production.
- Verify `relrowsecurity`, `relforcerowsecurity`, policies, grants, FK constraints and indexes with SQL assertions.
- Create two distinct Auth users A and B and obtain real access JWTs. Exercise PostgREST requests as anon/A/B, not just `SET ROLE` in psql.
- Seed one published C++ course, one published Python course, and one private draft with modules and lessons. Assert public list/detail excludes drafts, direct nested requests cannot leak draft lessons, and all anonymous writes are denied.
- Assert B cannot edit A's course or move a lesson into A's course; failed writes must leave original rows intact. Recheck after token refresh and session expiry handling where applicable.
- Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm test`, plus SQL/PostgREST integration tests before marking the implementation ready.
- Keep CI secrets out of logs; use disposable accounts and remove test data. Vercel Preview success is not proof of RLS or Auth correctness.

## Migration sequence

1. Land and validate identity/RLS foundations first (existing review PRs). No merge to `main` without explicit production-release approval, because merging triggers production deployment.
2. Implement `courses` with read-only published visibility and SQL/JWT tests in a separate small PR.
3. Add modules and lessons with nested visibility and cross-owner negative tests in subsequent PRs.
4. Wire one read-only C++/Python course-detail workflow behind a server adapter; keep Demo visibly separate until Auth and server authorization are verified.

This is a reviewable design contract, not a production migration or a claim that the workflows are live.
