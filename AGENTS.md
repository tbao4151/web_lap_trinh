# web_lap_trinh — UI agent instructions

> **PRODUCT SCOPE OVERRIDE — 2026-11-18:** Read [docs/COMPETITIVE_PROGRAMMING_SCOPE.md](docs/COMPETITIVE_PROGRAMMING_SCOPE.md) first. AlgoAcademy is now exclusively a C++ and Python **competitive-programming** education platform (beginner → HSG/OI/ICPC). Legacy multi-discipline requirements below describe the existing demo only and do not authorize new C/Java or general IT courses. Preserve current UI until safely migrated and prefer secure backend work.

This repository is the single source for AlgoAcademy, a Vietnamese multi-discipline EdTech platform.

## Read first
1. `ANTIGRAVITY_UI_BRIEF.md` — product requirements and UI implementation scope.
2. `docs/AGENT_SKILLS_SETUP.md` — recommended external skills and activation order.
3. `.agents/skills/edtech-ui-standards/SKILL.md` — project-specific UX quality rules.

## Implementation priority
- First build foundations and high-fidelity interactive P0 flows. Do not generate many empty pages.
- Stack: Next.js App Router, TypeScript strict, Tailwind, accessible reusable components.
- Languages: C, C++, Python, Java. Design for future non-programming subjects.
- Distinguish goal, level, and language; a learner has different abilities in different subjects.
- Four surfaces: public academy, learner, teacher/study-research, admin.
- UI-only stage: typed mock data, realistic client-side interactions, local persistence when useful.
- Never claim to compile code, grade submissions, charge money, authenticate users, or call AI if a real service is not connected.
- No external design skill may override these product requirements.

## Agent skill order
1. `ui-ux-pro-max`: define design direction/tokens, do not blindly copy styles.
2. `frontend-design`: polish visual hierarchy and distinctiveness.
3. `vercel-react-best-practices`: maintain/refactor Next.js/React implementation.
4. `web-design-guidelines`: accessibility/UX audit near milestone completion.
5. `edtech-ui-standards`: always use for this project's core learning interfaces.

## Definition of done
A route is done only if it has meaningful Vietnamese content, actual demo interactions, responsive layout, focus and keyboard states, and validated loading/empty/error states as relevant. Run lint, typecheck, and build. Document limitations in `docs/UI_IMPLEMENTATION_STATUS.md`.
