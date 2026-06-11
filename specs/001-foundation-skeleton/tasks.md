---
description: "Task list for Foundation & Skeleton (Sprint 1)"
---

# Tasks: Foundation & Skeleton

**Input**: Design documents from `/specs/001-foundation-skeleton/`

**Prerequisites**: [plan.md](plan.md) (required), [spec.md](spec.md) (required for user stories)

**Tests**: Not requested. This is a static Jekyll theme; verification is manual
(build/serve, axe contrast, keyboard pass) per the plan. No test tasks are
generated.

**Implementation status (2026-06-11)**: All file-authoring tasks are complete
(`[X]`). Six tasks that require a running toolchain — **T005, T015, T022, T023,
T032, T034** — are left unchecked and tagged ⛔ because **Ruby/Bundler/Jekyll are
not installed in the implementation environment**, so the build/serve/audit
steps could not be executed here. Run them locally (`bundle install` →
`bundle exec jekyll serve`) to close them out.

**Organization**: Tasks are grouped by user story so each can be implemented and
verified independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1 / US2 / US3 (setup, foundational, and polish tasks carry no story label)
- All paths are repo-relative.

## Path Conventions

Single Jekyll project at the repository root: `_config.yml`, `_data/`,
`_includes/`, `_layouts/`, `_sass/`, `assets/`. SCSS uses the 7-1 pattern;
`assets/css/main.scss` is the single compiled entry point.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Jekyll project so it builds, even while empty.

- [X] T001 Create the directory tree per plan.md at repo root: `_data/`, `_includes/{portfolio,blog,shared}/`, `_layouts/`, `_posts/`, `_drafts/`, `_sass/{abstracts,base,components,layout,pages,vendors}/`, `assets/{css,js,images,fonts}/`, `pages/`, `scripts/`
- [X] T002 [P] Create `Gemfile` with `jekyll ~> 4.3` and a `:jekyll_plugins` group (`jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-paginate-v2`)
- [X] T003 [P] Create `_config.yml` (title, description, url, baseurl, permalink `/blog/:categories/:title/`, timezone, `_posts` defaults, kramdown+rouge, `sass: { style: compressed }`, plugins, exclude) per plan.md §1.2
- [X] T004 [P] Create `assets/css/main.scss` with the Jekyll front-matter fence (`---`/`---`) and the ordered `@import` list (abstracts → base → layout; components/pages stubbed for later)
- [ ] T005 ⛔ Run `bundle install` then `JEKYLL_ENV=production bundle exec jekyll build` and confirm the empty skeleton compiles with no errors (FR-001) — *blocked: Ruby/Jekyll not installed; run locally*

**Checkpoint**: `jekyll build` succeeds on an empty skeleton.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The design-token system and root layout every user story depends on.

**⚠️ CRITICAL**: No user-story work can begin until this phase is complete.

- [X] T006 [P] Create `_sass/abstracts/_variables.scss`: define all tokens as CSS custom properties — portfolio palette at `:root`, blog overrides at `[data-page-type="blog"]`; modular type scale (`--text-xs`…`--text-4xl`), 4px-based spacing scale, and a `$breakpoints` map (sm 576, md 768, lg 1024, xl 1280, xxl 1536) (FR-002, FR-003)
- [X] T007 [P] Create `_sass/abstracts/_mixins.scss`: `respond-to($bp)` media-query mixin, `motion-safe`, and `visually-hidden`
- [X] T008 [P] Create `_sass/abstracts/_functions.scss`: `bp()` breakpoint lookup
- [X] T009 Create `_layouts/base.html`: HTML5 skeleton that sets `data-page-type` (default `portfolio`), includes `head.html`, skip-link, header, `<main>` content slot, footer (FR-004)
- [X] T010 Create `_includes/head.html`: charset/viewport/theme-color meta, seo include, link to compiled `main.css`, feed + canonical links
- [X] T011 Activate the abstracts `@import`s in `assets/css/main.scss` (order: functions → variables → mixins)

**Checkpoint**: Tokens compile and `base.html` renders a valid (unstyled) page.

---

## Phase 3: User Story 1 - Buildable, servable site skeleton (Priority: P1) 🎯 MVP

**Goal**: A fresh checkout installs, builds, serves, and live-reloads.

**Independent Test**: On a clean machine, run the documented install + serve
commands; a page loads with no build errors and edits reflect on reload.

### Implementation for User Story 1

- [X] T012 [P] [US1] Create stub layouts that extend base: `_layouts/page.html`, `_layouts/portfolio.html`, `_layouts/blog-index.html`, `_layouts/post.html` (each `layout: base` with a minimal content block)
- [X] T013 [US1] Create `index.html` (`layout: portfolio`) with placeholder hero/landing content so `serve` renders a real page
- [X] T014 [US1] Create `404.html` (`layout: page`) with a minimal themed message
- [ ] T015 ⛔ [US1] Run `bundle exec jekyll serve`, confirm the page loads in a browser, then edit a source file and confirm the change live-reloads (FR-001, SC-001) — *blocked: Ruby/Jekyll not installed; run locally*

**Checkpoint**: MVP — the site builds, serves, and hot-reloads.

---

## Phase 4: User Story 2 - Consistent visual foundation across every page (Priority: P1)

**Goal**: Every page shares base typography, background, spacing, and a
token-driven palette that switches portfolio↔blog with no markup change.

**Independent Test**: Two different routes share type/bg/spacing; toggling
`data-page-type` to `blog` shifts the palette with zero component changes; no
hard-coded colours/sizes exist.

### Implementation for User Story 2

- [X] T016 [P] [US2] Create `_sass/base/_reset.scss` (normalize/reset browser defaults) (FR-005)
- [X] T017 [P] [US2] Create `_sass/base/_typography.scss` (headings, body, links, lists, code — all from tokens) (FR-005)
- [X] T018 [US2] Create `_sass/base/_global.scss` (body background, custom scrollbar, `::selection`, `:focus-visible`, skip-link styles, a body `background-color` transition, and a `@media (prefers-reduced-motion: reduce)` block that zeroes transitions/animations) (FR-005, FR-008, FR-010)
- [X] T019 [P] [US2] Create `_sass/layout/_grid.scss` (12-column grid + auto-fit card grid)
- [X] T020 [P] [US2] Create `_sass/layout/_section.scss` (max-width containers + responsive section padding)
- [X] T021 [US2] Add the base + layout `@import`s to `assets/css/main.scss`
- [ ] T022 ⛔ [US2] Contrast-verify amber (`--accent-primary`) and muted text against both palettes' backgrounds with axe/contrast tool; adjust the token value (not components) for any pair below 4.5:1 (SC-003) — *token values chosen to pass; tool verification blocked (no local build)*
- [ ] T023 ⛔ [US2] Confirm the palette shifts via `data-page-type="blog"` with no component markup change (SC-002) — *mechanism implemented in `_variables.scss`; visual confirm blocked (no local build)*

**Checkpoint**: A consistent, token-driven visual foundation works in both worlds.

---

## Phase 5: User Story 3 - Shared chrome on every page (Priority: P2)

**Goal**: A consistent, data-driven header and footer (plus skip link) frame
every page.

**Independent Test**: Every page shows the same header and footer with working
links sourced from data; the skip link is the first focusable element.

### Implementation for User Story 3

- [X] T024 [P] [US3] Create `_data/navigation.yml` (ordered `{ name, url }` primary-nav items) (FR-006)
- [X] T025 [P] [US3] Create `_data/social.yml` (list of `{ platform, url, icon }`) (FR-007)
- [X] T026 [US3] Create `_includes/header.html` rendering the site name and nav links from `navigation.yml` (FR-006)
- [X] T027 [US3] Create `_includes/footer.html` rendering copyright and social links from `social.yml`, degrading gracefully when the data is absent (FR-007)
- [X] T028 [P] [US3] Create `_includes/shared/skip-link.html` (skip-to-content link targeting the main content) (FR-008)
- [X] T029 [P] [US3] Create `_includes/shared/seo.html` stub (title, description, OG, canonical — expanded in Sprint 7)
- [X] T030 [P] [US3] Create `_sass/layout/_header.scss` and `_sass/layout/_footer.scss` from tokens
- [X] T031 [US3] Wire skip-link, header, footer, and seo into `_layouts/base.html` (skip link first, `<main>` landmark for content) and add `_header`/`_footer` `@import`s to `main.scss`
- [ ] T032 ⛔ [US3] Keyboard pass: confirm the skip link is the first focusable element, then all header and footer links are reachable in order with visible focus (SC-005) — *markup/focus styles implemented; live keyboard pass blocked (no local build)*

**Checkpoint**: Shared chrome appears on every page and is keyboard-accessible.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Foundation-wide quality, performance, and docs.

- [X] T033 [P] Font strategy: token font stack uses Inter/Newsreader/JetBrains Mono with system fallbacks (no external dependency); self-hosting woff2 + `font-display: swap` documented as deferred to Sprint 7 in `README.md` (FR-005 perf)
- [ ] T034 ⛔ Measure the production build: confirm compressed CSS ≤ 30 KB and 0 KB blocking JS (SC-004) — *blocked: no local build; design ships 0 JS and compressed Sass, expected well under budget*
- [X] T035 [P] Add install + local-serve instructions (and structure/content/deploy docs) to `README.md` so clone→running site is < 5 min (SC-001)
- [X] T036 Confirm `CLAUDE.md`'s SPECKIT block references the sprint plans (wired during planning)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies — start immediately.
- **Foundational (Phase 2)**: depends on Setup — **blocks all user stories**.
- **User Stories (Phase 3–5)**: all depend on Foundational.
  - US1 (P1) is the MVP and unblocks meaningful preview for US2/US3.
  - US2 (P1) and US3 (P2) depend on the tokens + `base.html` from Phase 2 and on
    US1's render path; they are otherwise independent of each other and may be
    built in parallel.
- **Polish (Phase 6)**: after the desired stories are complete.

### User Story Dependencies

- **US1 (P1)**: needs Phase 2 (base layout). No dependency on US2/US3.
- **US2 (P1)**: needs Phase 2 (tokens) + US1 render path. Independent of US3.
- **US3 (P2)**: needs Phase 2 (base layout) + US1 render path. Independent of US2
  (renders unstyled-but-functional even before US2 styles land).

### Within Each Story

- Create partials/data before wiring them into layouts.
- Add `@import`s and rebuild after creating SCSS partials.
- Verify (contrast / keyboard / build) at each checkpoint.

### Parallel Opportunities

- Phase 1: T002, T003, T004 in parallel (different files) after T001.
- Phase 2: T006, T007, T008 in parallel (abstracts partials).
- Phase 4: T016, T017, T019, T020 in parallel (independent SCSS partials).
- Phase 5: T024, T025, T028, T029, T030 in parallel (independent files).
- Phase 6: T033, T035 in parallel.
- With capacity, US2 and US3 can be built concurrently once Phase 2 + US1 land.

---

## Parallel Example: Phase 2 (Foundational)

```bash
# After T001 scaffolds folders, author the abstracts together:
Task: "Create _sass/abstracts/_variables.scss (tokens + both palettes)"
Task: "Create _sass/abstracts/_mixins.scss (respond-to, reduced-motion)"
Task: "Create _sass/abstracts/_functions.scss (SCSS helpers)"
```

## Parallel Example: User Story 2

```bash
# Independent SCSS partials can be authored in parallel:
Task: "Create _sass/base/_reset.scss"
Task: "Create _sass/base/_typography.scss"
Task: "Create _sass/layout/_grid.scss"
Task: "Create _sass/layout/_section.scss"
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 Setup → empty build passes.
2. Phase 2 Foundational → tokens + `base.html`.
3. Phase 3 US1 → site builds, serves, live-reloads. **STOP and validate.**

### Incremental Delivery

1. Setup + Foundational → foundation ready.
2. US1 → buildable/servable skeleton (MVP) → demo.
3. US2 → consistent token-driven visuals + palette switch → demo.
4. US3 → shared header/footer chrome + skip link → demo.
5. Polish → fonts, budget check, README.

### MVP Scope

**User Story 1 only** delivers a working, servable foundation that every later
sprint can build on.

---

## Notes

- No test tasks (tests not requested for this theme sprint).
- `[P]` = different files, no incomplete dependencies.
- Rebuild after adding any `@import` to catch SCSS errors early.
- Keep all colours/sizes/spacing in tokens (Constitution Principle IV) — no
  hard-coded values in partials.
- Commit after each logical group when you are ready to start version-controlling.

## Summary

- **Total tasks**: 36 (Setup 5, Foundational 6, US1 4, US2 8, US3 9, Polish 4)
- **By story**: US1 = 4, US2 = 8, US3 = 9
- **Parallel opportunities**: abstracts trio; US2 partials quartet; US3 file quintet
- **MVP**: Phases 1–3 (US1) → a buildable, servable, hot-reloading skeleton
