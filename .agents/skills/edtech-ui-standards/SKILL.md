---
name: edtech-ui-standards
description: Applies AlgoAcademy-specific user experience, accessibility and UI architecture standards when designing or reviewing learning journeys, coding labs, course editors, classrooms and dashboards. Use it for every EdTech UI task in web_lap_trinh.
---

# AlgoAcademy EdTech UI Standards

## Sources of truth

Read `ANTIGRAVITY_UI_BRIEF.md` (when present), `AGENTS.md` and `docs/AGENT_SKILLS_SETUP.md`. This skill adds project-specific rules and does not replace those documents. When general-purpose skills disagree with the product brief, follow the brief.

## Product invariants

- The platform is a multi-subject education product, not a C++-only HSG archive or a course storefront alone.
- Initial languages: C, C++, Python and Java; architecture must allow non-code courses and future languages.
- Separate knowledge level, learning goal, programming language and enrollment; a learner can have different levels in different skills.
- Surfaces: public discovery, learner experience, teacher/research studio, admin.
- Current implementation is frontend-only. All judge, payments, authentication and AI behaviors must be visibly labeled as mock/demo if no real integration exists.

## Screen-design workflow

1. Identify persona, primary user task, entry point, success state and key failure/empty states.
2. Define the information hierarchy and navigation before choosing ornamental visuals.
3. Reuse common design tokens: spacing, typography, surfaces, borders, focus rings, status tones and breakpoints.
4. Build components and states with keyboard/pointer interactions and realistic Vietnamese copy.
5. Verify the screen with realistic learning data and long titles/code/large tables.
6. Audit responsive layout, contrast, accessibility, motion preference and cross-persona consistency.

## Critical interfaces

### Learning Studio
- Keep lesson navigation and progress visible but unobtrusive. Focus on reading comfort and continuity.
- Support content blocks: text, diagrams, code samples, slide preview, quiz, video and exercises.
- Give actionable learning feedback, not only a percentage. Gaps should be per concept or skill.
- Use distinct reading vs practice mode when switching context would otherwise be distracting.
- Teacher-only notes are visually and logically separate from learner content.

### Coding Lab
- Desktop: a usable split of problem statement, code editor and result panel; resizable when practical.
- Mobile: tabbed/stacked alternative instead of tiny split panes.
- Keep programming language selector, code preservation, input, output and expected output clear.
- Show clear separate states for compile error, wrong answer, time limit, runtime error and accepted **only as examples** until a real judge exists.
- Code blocks support horizontal scrolling; never let long code destroy page layout.
- Keyboard shortcuts must not trap the user or override essential browser navigation.

### Course Builder / Teacher Studio
- Use a block-based lesson editor, sortable outline, draft/published state, and preview-as-learner.
- Prevent accidental data loss. In mock stage, use local persistence and clear reset behavior.
- Teacher workflow should minimize switching across file formats; use canonical web lessons with optional exports.
- Distinguish `Course`, `Module`, `Lesson`, `LessonBlock`, `Problem`, `Concept`, `Classroom` in UI models.

### Public Academy
- Focus on credibility through real, demonstrable product features; do not invent testimonials, learner counts, scores or revenue.
- Discovery, course detail, sample lesson and enroll CTA should be understandable without an account.
- Show free/paid/course-live attributes clearly. If checkout is not real, present a transparent demo state.

## UX / accessibility acceptance

- Semantic structure, labeled controls, visible focus and logical tab order.
- WCAG 2.2 AA-oriented color and interaction design; test actual contrast rather than trusting color labels.
- Error copy explains the problem and next possible action. Do not communicate status by color alone.
- Support dark and light modes without flicker and preserve sensible font scales.
- Work across desktop, tablet and mobile, especially 360px-width, 768px, 1024px and large desktops.
- Provide meaningful empty, loading, error and permission states for user-facing flows.
- Use data in Vietnamese and realistic C/C++/Python/Java samples.
- Avoid decorative emoji, irrelevant illustrations and forced animations.

## Required demo flows before marking P0 complete

1. Visitor discovers courses, filters by language/level and opens a public sample.
2. Learner navigates a lesson, answers a quiz, takes notes and sees progress update.
3. Learner switches Coding Lab language, edits sample code and sees explicit **demo** judge statuses.
4. Teacher creates and edits course structures/lesson blocks, previews as learner and refreshes without losing mock changes.
5. Persona switch, theme switch and demo-data reset behave consistently.

## Output of each UI milestone

Provide completed routes, screenshots or visual inspection notes, list of implemented interactions, mock-service limitations, accessibility issues resolved, lint/typecheck/build results and next milestone scope. Prioritize fully working P0 surfaces over a large number of empty routes.

## Skill cooperation

Use `ui-ux-pro-max` for visual direction/tokens, `frontend-design` for distinctive aesthetic refinement, `vercel-react-best-practices` for implementation, and `web-design-guidelines` for final UX audit. This skill is the domain-specific quality gate for all stages.
