---
description: "Task list for Portfolio Core (Sprint 2)"
---

# Tasks: Portfolio Core

**Input**: Design documents from `/specs/002-portfolio-core/`

**Prerequisites**: [plan.md](plan.md) (required), [spec.md](spec.md) (required for
user stories). Design docs available: [research.md](research.md),
[data-model.md](data-model.md), [contracts/sections.md](contracts/sections.md),
[quickstart.md](quickstart.md).

**Builds on**: Sprint 1 (`001-foundation-skeleton`) — token system,
`_layouts/base.html`, `_layouts/portfolio.html` stub, `index.html` placeholder,
`_data/navigation.yml` + `_data/social.yml`, and `assets/css/main.scss` (which
already has commented `@import` slots for `components/buttons` and
`pages/portfolio`).

**Tests**: Not requested. This is a static Jekyll theme; verification is manual
(build/serve, responsive resize, axe contrast, keyboard pass) per the plan and
[quickstart.md](quickstart.md). No automated test tasks are generated.

**Implementation status (2026-06-11)**: All file-authoring tasks are complete
(`[X]`). Seven verification tasks that need a running toolchain — **T010, T017,
T024, T028, T029, T030, T031** — are tagged ⛔ and left unchecked because
**Ruby/Bundler/Jekyll are not installed in this environment**, so the
build / serve / axe / keyboard / budget checks could not be executed here. Run
them locally (`bundle install` → `bundle exec jekyll serve`, then the
[quickstart.md](quickstart.md) checklist) to close them out.

**Organization**: Tasks are grouped by user story so each can be implemented and
verified independently. Each story authors its own section include and wires it
into the matching slot in `_layouts/portfolio.html`, so the build stays green
after every story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1 / US2 / US3 / US4 (setup, foundational, and polish tasks carry no story label)
- All paths are repo-relative.

## Path Conventions

Single Jekyll project at the repository root. Section includes live in
`_includes/portfolio/`, shared components in `_sass/components/`, page styles in
`_sass/pages/_portfolio.scss`, and `assets/css/main.scss` is the single compiled
entry point. Tokens only — no hard-coded colours/sizes/spacing (Constitution
Principle IV).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure the Sprint 2 directories exist before authoring files.

- [X] T001 Confirm/create the Sprint 2 directories at repo root (scaffolded by Sprint 1 T001 — create any that are missing): `_includes/portfolio/`, `_sass/components/`, `_sass/pages/`

**Checkpoint**: Target directories exist; ready to author shared assets.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The shared button component, page-layout scaffold, and section-rhythm
styles every section depends on.

**⚠️ CRITICAL**: No user-story work can begin until this phase is complete.

- [X] T002 [P] Create `_sass/components/_buttons.scss`: token-only button system (primary / secondary / ghost / CTA variants, hover + `:focus-visible`) consumed by the hero CTAs (US1) and project-card actions (US2) (FR-002, FR-004)
- [X] T003 [P] Create `_sass/pages/_portfolio.scss` base: section vertical rhythm, max-width container, per-breakpoint section padding, and the responsive projects-grid utility using `repeat(auto-fill, minmax(<card-min>, 1fr))` capped at 3 columns (FR-001, FR-009) — see [research.md](research.md) Decision 1
- [X] T004 Flesh out `_layouts/portfolio.html` (currently a Sprint 1 stub): a `<main>` landmark composing five ordered, id'd `<section>` slots — `#hero`, `#about`, `#projects`, `#skills`, `#contact` — each with a placeholder include comment to be filled by its story phase (FR-001)
- [X] T005 Activate component + page `@import`s in `assets/css/main.scss`: uncomment/add `components/buttons` and `pages/portfolio` (cards/tags imports added in US2)

**Checkpoint**: `jekyll build` succeeds — portfolio layout compiles with empty section slots; buttons + page scaffolding available.

---

## Phase 3: User Story 1 - First impression: who this is and what they do (Priority: P1) 🎯 MVP

**Goal**: A hero that shows the author's name, role tagline, and two working CTAs
("Explore Projects", "Read the Blog") above the fold on desktop and mobile.

**Independent Test**: Load the homepage; the hero shows name, tagline, and two
working CTAs above the fold; "Explore Projects" scrolls down, "Read the Blog"
navigates to the blog index.

### Implementation for User Story 1

- [X] T006 [US1] Add the author name + role `tagline` the hero will read to `_config.yml` (`author.name`, `author.tagline`) or `_data/profile.yml` per [data-model.md](data-model.md), so the hero is data-driven, not hard-coded — keep a single source (FR-002, FR-010)
- [X] T007 [US1] Create `_includes/portfolio/hero.html`: author name as the page `<h1>`, role tagline, and two CTAs — "Explore Projects" (anchor to `#projects`) and "Read the Blog" (link to the blog index URL `/blog/`). **Note**: the blog index itself ships in Sprint 3 (`003-blog-core`); in Sprint 2 this is a forward-reference link — it resolves once Sprint 3 lands (FR-002)
- [X] T008 [US1] Wire the hero include into the `#hero` slot of `_layouts/portfolio.html`, and flesh out `index.html` (replace the Sprint 1 placeholder, keep `layout: portfolio`) so the hero renders above the fold (FR-002, SC-001)
- [X] T009 [US1] Add hero styles to `_sass/pages/_portfolio.scss`: hero layout, responsive tagline scale, CTA group, and `scroll-behavior: smooth` gated behind `@media (prefers-reduced-motion: no-preference)` (SC-001, SC-005) — see [research.md](research.md) Decision 4
- [ ] T010 ⛔ [US1] Build/serve and confirm name, tagline, and both CTAs are visible above the fold on desktop + mobile; "Explore Projects" scrolls to the projects slot; the "Read the Blog" CTA points to `/blog/` (full navigation verified in Sprint 3, when the blog index exists) (FR-002, SC-001)

**Checkpoint**: MVP — the hero renders with working, no-JS CTAs.

---

## Phase 4: User Story 2 - Browse the work (Priority: P1)

**Goal**: A grid of project cards (title, description, tech tags, repo/demo links)
driven entirely by `_data/projects.yml`, featured-first.

**Independent Test**: Add entries to `_data/projects.yml`; the grid renders one
card per entry with all fields and working links, featured first, and degrades
gracefully for missing image/demo.

### Implementation for User Story 2

- [X] T011 [P] [US2] Create `_data/projects.yml` with realistic sample entries per [data-model.md](data-model.md) — at least 3 entries, with ≥1 `featured: true`, ≥1 with no `demo`, and ≥1 with no `image` (FR-003)
- [X] T012 [P] [US2] Create `_sass/components/_cards.scss`: token-only project card (image/placeholder area, body, tag row, action row, and a `featured` accent-border/glow modifier) (FR-003, FR-005)
- [X] T013 [P] [US2] Create `_sass/components/_tags.scss`: token-only tech-tag pills that wrap inside the card without overflowing (FR-003)
- [X] T014 [US2] Create `_includes/portfolio/projects.html`: sort `site.data.projects` featured-first (stable), render one card per entry with title/description/tags; conditionally render repo + demo links (`target="_blank" rel="noopener"`), image-or-placeholder, and a tasteful empty state when the list is empty (FR-003, FR-004, FR-005) — see [contracts/sections.md](contracts/sections.md)
- [X] T015 [US2] Wire the projects include into the `#projects` slot of `_layouts/portfolio.html`, and add `components/cards` + `components/tags` `@import`s to `assets/css/main.scss`
- [X] T016 [US2] Add projects-grid + card responsive rules to `_sass/pages/_portfolio.scss`: 3/2/1 column reflow with no horizontal overflow and wrapping tags (FR-009, SC-003)
- [ ] T017 ⛔ [US2] Verify: adding/removing a `projects.yml` entry changes the grid with no template edit (SC-002); featured cards are first and emphasised; missing demo/image degrade without breakage; grid is 3/2/1 across breakpoints (SC-003)

**Checkpoint**: The projects grid is fully data-driven and responsive.

---

## Phase 5: User Story 3 - Understand the person and skills (Priority: P2)

**Goal**: An about section (bio + terminal-style key-facts panel) and a skills
section grouped by category, both driven by data.

**Independent Test**: About text renders with its panel; `skills.yml` renders
grouped under category headings.

### Implementation for User Story 3

- [X] T018 [P] [US3] Create `_data/profile.yml` with a `facts` list (and optional `bio`) per [data-model.md](data-model.md) (FR-006)
- [X] T019 [P] [US3] Create `_data/skills.yml` with ≥2 categories, each with items (optional `level`) per [data-model.md](data-model.md) (FR-007)
- [X] T020 [US3] Create `_includes/portfolio/about.html`: bio copy (fallback to inline copy when `bio` absent) plus a terminal-style "key facts" panel rendering `profile.facts` as `> label: value` lines (FR-006) — see [research.md](research.md) Decision 3
- [X] T021 [US3] Create `_includes/portfolio/skills.html`: render `site.data.skills` grouped by category heading, listing each item with an optional proficiency indicator when `level` is present (FR-007)
- [X] T022 [US3] Wire the about + skills includes into the `#about` and `#skills` slots of `_layouts/portfolio.html`
- [X] T023 [P] [US3] Add about-panel + skills-group styles to `_sass/pages/_portfolio.scss` (terminal panel chrome, skills grouping, responsive layout) (FR-006, FR-007, FR-009)
- [ ] T024 ⛔ [US3] Verify: the about section shows bio + key-facts panel; skills render under their category headings from data; both are responsive (FR-006, FR-007)

**Checkpoint**: About + skills add context around the projects, fully data-driven.

---

## Phase 6: User Story 4 - Make contact (Priority: P2)

**Goal**: A contact section with an email action and social links sourced from
`_data/social.yml` (reused from Sprint 1).

**Independent Test**: The contact section renders email and social links from
data; the links work and are keyboard-operable.

### Implementation for User Story 4

- [X] T025 [US4] Create `_includes/portfolio/contact.html`: an email action (`mailto:`) plus social links from `site.data.social`, with external links opening in a new tab using `rel="noopener"` (FR-008) — see [contracts/sections.md](contracts/sections.md)
- [X] T026 [US4] Wire the contact include into the `#contact` slot of `_layouts/portfolio.html`
- [X] T027 [P] [US4] Add contact-section styles to `_sass/pages/_portfolio.scss` (layout + responsive) (FR-008, FR-009)
- [ ] T028 ⛔ [US4] Verify: the email action and social links are present, functional, keyboard-reachable, and show visible focus (FR-008, SC-004)

**Checkpoint**: All five homepage sections render in order (FR-001).

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Homepage-wide responsive, accessibility, performance, and design-system
verification (run against a real build — see [quickstart.md](quickstart.md)).

- [ ] T029 ⛔ [P] Responsive pass across sm 576 / md 768 / lg 1024 / xl 1280 / xxl 1536: full homepage has no horizontal overflow; projects grid is 3/2/1; section padding scales; hero tagline stays readable (FR-009, SC-003)
- [ ] T030 ⛔ a11y pass: axe contrast ≥ 4.5:1 on all homepage text (verify amber-on-dark, not assume); keyboard reaches both hero CTAs, every project-card link, and all contact links with visible focus (FR-011, SC-004)
- [ ] T031 ⛔ Budget check on a production build: 0 KB blocking JS added, and total compressed CSS stays within the 30 KB budget after the new component + page partials (SC-005, Constitution Principle II)
- [X] T032 [P] Confirm all new styles use tokens only — no hard-coded hex, px font sizes, or magic-number spacing (Constitution Principle IV)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies — start immediately.
- **Foundational (Phase 2)**: depends on Setup — **blocks all user stories**.
- **User Stories (Phase 3–6)**: all depend on Foundational.
  - US1 (P1) establishes the `index.html` → `portfolio.html` render path and is the MVP.
  - US2 (P1), US3 (P2), US4 (P2) each create an independent section include in a
    distinct layout slot with its own data file, so they are independent of one
    another and can be tackled in any order (or concurrently) after Foundational.
- **Polish (Phase 7)**: after the desired stories are complete.

### Shared-file edit points (sequential, not parallel)

- `_layouts/portfolio.html` — each story fills its own slot (T008, T015, T022, T026).
- `_sass/pages/_portfolio.scss` — each story appends its section's rules (T009, T016, T023, T027).
- `assets/css/main.scss` — imports added in T005 and T015.

These four cross-story edit points mean stories touch the same files; sequence the
slot/style edits even when the rest of a story runs in parallel.

### Parallel Opportunities

- Phase 2: T002, T003 in parallel (different files).
- US2: T011, T012, T013 in parallel (data + two independent component partials).
- US3: T018, T019 in parallel (two data files); T023 parallel with verification.
- Phase 7: T029, T032 in parallel.

---

## Parallel Example: User Story 2

```bash
# Author the data and component partials together (different files):
Task: "Create _data/projects.yml with sample entries"
Task: "Create _sass/components/_cards.scss (project card + featured modifier)"
Task: "Create _sass/components/_tags.scss (tech-tag pills)"
# Then, sequentially: projects.html → wire slot + imports → grid styles → verify
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 Setup → directories ready.
2. Phase 2 Foundational → buttons + page scaffold + layout slots.
3. Phase 3 US1 → hero with working CTAs renders above the fold. **STOP and validate.**

Because US1 and US2 are both P1 (the portfolio's reason to exist is its projects),
the recommended first shippable milestone is **US1 + US2** (hero + projects grid).

### Incremental Delivery

1. Setup + Foundational → scaffolding ready.
2. US1 → hero (MVP) → demo.
3. US2 → projects grid → demo (P1 complete).
4. US3 → about + skills → demo.
5. US4 → contact → demo (all five sections in order).
6. Polish → responsive + a11y + budget + token audit.

### MVP Scope

**User Story 1** delivers the hero entry point; **US1 + US2** together deliver the
must-have P1 homepage (hero + evidence of work).

---

## Notes

- No test tasks (tests not requested for this theme sprint).
- `[P]` = different files, no incomplete dependencies.
- Rebuild after adding any `@import` to catch SCSS errors early.
- Keep all colours/sizes/spacing in tokens (Constitution Principle IV).
- Hero typing animation and card hover/particle effects are **out of scope** here
  (Sprint 5 / Sprint 6); ship static, working versions.
- The homepage blog teaser is Sprint 4 (Bridge), not here.
- Commit after each logical group / completed story.

## Summary

- **Total tasks**: 32 (Setup 1, Foundational 4, US1 5, US2 7, US3 7, US4 4, Polish 4)
- **By story**: US1 = 5, US2 = 7, US3 = 7, US4 = 4
- **Parallel opportunities**: Foundational pair (T002/T003); US2 trio (T011/T012/T013); US3 data pair (T018/T019); Polish pair (T029/T032)
- **MVP**: Phases 1–3 (US1 hero); recommended first shippable = US1 + US2 (both P1)
- **Independent test per story**: US1 hero CTAs above fold; US2 data-driven grid (3/2/1, featured-first, graceful degradation); US3 about panel + grouped skills from data; US4 working, keyboard-operable email + social links
