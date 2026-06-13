---
description: "Task list for Navigation & Bridge (Sprint 4)"
---

# Tasks: Navigation & Bridge

**Input**: Design documents from `/specs/004-navigation-bridge/`

**Prerequisites**: [plan.md](plan.md) (required), [spec.md](spec.md) (required for
user stories). No `data-model.md`, `research.md`, `contracts/`, or `quickstart.md`
(decisions live inline in [plan.md](plan.md) Phase 0).

**Builds on**: Sprint 1 — `_includes/header.html` (data-driven desktop nav from
`_data/navigation.yml`), `_layouts/base.html` (sets `data-page-type` on `<body>`),
and `_sass/base/_global.scss` which **already** has the `<body>` background-color
world transition and `scroll-behavior: smooth`, both gated by
`prefers-reduced-motion`. Sprint 2 — `_layouts/portfolio.html` section-slot
pattern, `_includes/portfolio/projects.html`, card/button components. Sprint 3 —
`_includes/blog/post-card.html` (reused by the teaser) and the post layout's
existing "back to portfolio" link.

**Already in place (verified 2026-06-13)**: `header.html` renders the desktop nav
(`item.name`/`item.url`); `head.html` loads CSS but **no `<script>` yet** (this
sprint adds the first, deferred); `_sass/layout/_header.scss` exists as a stub;
`_data/navigation.yml` has Projects/Blog/About (no `world` hint); `assets/js/`
does **not** exist; `_data/projects.yml` already has a `post:` field, but its URL
(`/blog/bioinformatics/variant-pipeline/`) does **not** match the real Sprint-3
permalink (`/blog/bioinformatics/tutorials/variant-calling-pipeline/`) — fixed in
T017. `index.html` is metadata-only, so the teaser wires into
`_layouts/portfolio.html` (not `index.html`).

**Tests**: Not requested. Static Jekyll theme; verification is manual
(`bundle exec jekyll build`, desktop + 360px, JS-disabled pass, keyboard/focus-trap
audit, axe contrast). No automated test tasks are generated.

**Build environment note**: Ruby is available (ruby 4.0.5, jekyll 4.4.1) — build
and verify against `_site/` here; only genuinely visual checks (cross-breakpoint
resize, live keyboard/focus-trap walk-through) are author spot-checks.

**First JS sprint**: this introduces shared JavaScript, so the **JS budget
(≤ 10 KB; target ≤ ~2 KB here)** starts being tracked. All JS is `defer`-loaded
enhancement over a no-JS fallback (Constitution Principle I).

**Organization**: Tasks are grouped by user story for independent implementation
and verification.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1 / US2 / US3 / US4 (setup, foundational, and polish tasks carry no story label)
- All paths are repo-relative.

## Path Conventions

Single Jekyll project at the repository root. Shared nav lives in
`_includes/header.html`; the teaser in `_includes/portfolio/blog-teaser.html`;
shared JS in `assets/js/main.js`; nav styles in `_sass/layout/_header.scss`;
transition/scroll in `_sass/base/_global.scss`; teaser styles in
`_sass/pages/_portfolio.scss`. Tokens only — no hard-coded values (Principle IV).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure the Sprint 4 directories exist before authoring files.

- [ ] T001 Create the `assets/js/` directory at repo root (new this sprint); confirm `_includes/portfolio/` and `_sass/layout/` exist (from Sprints 1–2)

**Checkpoint**: Target directories exist; ready to author shared assets.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Nav data hints and the link targets every story depends on.

**⚠️ CRITICAL**: No user-story work can begin until this phase is complete.

- [ ] T002 Add an optional `world` hint to the relevant items in `_data/navigation.yml` (e.g. `world: blog` on Blog, `world: portfolio` on Projects) so the nav can compute its active-world state from data rather than hard-coded URLs (FR-001, FR-004)
- [ ] T003 Create a minimal `about.md` stub at repo root (`permalink: /about/`, `layout: page`, a short placeholder body) so the nav's "About" destination resolves and SC-001 holds — full About content is out of scope this sprint per [spec.md](spec.md) Assumptions
- [ ] T004 Confirm the Sprint-1 `_sass/base/_global.scss` world transition (`<body>` `background-color` transition) and `scroll-behavior: smooth` are present and `prefers-reduced-motion`-gated; no rework expected — this is the shared CSS foundation US2 (FR-005) and US4 (FR-008) build on

**Checkpoint**: `jekyll build` succeeds; nav data + link targets + transition base ready.

---

## Phase 3: User Story 1 - Navigate the whole site from any page (Priority: P1) 🎯 MVP

**Goal**: A consistent, data-driven nav on every page — horizontal links on
desktop, an accessible mobile overlay that is operable with JS off and enhanced
(focus trap, Escape, `aria-expanded`) when JS is on.

**Independent Test**: On desktop and at 360px, the nav exposes Projects/Blog/About
and they work; the mobile menu opens and closes; with JS disabled every link is
still reachable.

### Implementation for User Story 1

- [ ] T005 [US1] Upgrade `_includes/header.html`: keep the data-driven list; add a no-JS-operable mobile toggle (hidden-checkbox or `<details>` pattern) revealing an overlay/menu that contains all links, with semantic markup and baseline ARIA (FR-001, FR-002, FR-003) — see [plan.md](plan.md) Phase 0 "No-JS mobile menu"
- [ ] T006 [US1] Upgrade `_sass/layout/_header.scss`: desktop horizontal nav; mobile overlay shown/hidden by the no-JS toggle; make the nav `position: sticky` (top) with its height reserved so the solidify causes **no CLS**. Three scroll/world states: (a) **transparent-over-hero at the top of pages that have a hero** (portfolio home) — the signature look; (b) `.is-scrolled` **solid** once scrolled; (c) **solid by default** on pages without a hero (blog/about) and as the no-JS fallback (FR-002, FR-009)
- [ ] T007 [P] [US1] Create `assets/js/main.js`: progressively replace the fallback toggle with a `<button>` managing `aria-expanded`; trap focus within the open overlay, close on Escape, and return focus to the toggle; add a throttled scroll listener (or `IntersectionObserver` on a hero sentinel) toggling `.is-scrolled`. Vanilla ES2017+, no framework (FR-002, FR-009, Principle I)
- [ ] T008 [US1] Load `assets/js/main.js` with `defer` from `_includes/head.html` (single shared script; must not block first paint) (FR-002, Principle I/II)
- [ ] T009 [US1] Verify: desktop + 360px reach all destinations; mobile menu opens/closes; keyboard open → focus trapped → Escape closes → focus returns to toggle; `aria-expanded` correct; **with JS disabled** every link still works (SC-001, SC-002, SC-005, FR-003)

**Checkpoint**: MVP — the site is navigable everywhere, on every device, with and without JS.

---

## Phase 4: User Story 2 - Feel the shift between the two worlds (Priority: P1)

**Goal**: Navigating portfolio↔blog produces a visible palette/type shift with a
subtle background transition, and the nav highlights the current world.

**Independent Test**: Navigate portfolio → blog; the palette and type visibly
shift via `data-page-type`, with a gentle background transition; the Blog link is
highlighted on blog pages.

### Implementation for User Story 2

- [ ] T010 [US2] Add active-world highlighting to `_includes/header.html`: mark the nav link matching the current page's world (from `page.page_type` / the `world` hint in T002) as current with `aria-current="page"` plus a class — not colour-only (FR-004)
- [ ] T011 [US2] Style the active-world nav cue in `_sass/layout/_header.scss` with a non-colour-only indicator (e.g. underline/weight) meeting contrast (FR-004, FR-010)
- [ ] T012 [US2] Confirm the world shift end-to-end: `_layouts/base.html` applies `data-page-type` to `<body>` (Sprint 1) and the `_sass/base/_global.scss` `background-color` transition fires on navigation, gated by reduced-motion (FR-005)
- [ ] T013 [US2] Verify: portfolio → blog shows the palette/type shift and a sub-second background transition; reduced-motion removes the animation but keeps the shift; the Blog link is highlighted on blog pages (SC-003)

**Checkpoint**: The dual-world identity is real across navigation.

---

## Phase 5: User Story 3 - Cross-link between work and writing (Priority: P2)

**Goal**: The homepage surfaces the latest posts as a teaser, projects link to
their write-ups, and posts link back to the portfolio.

**Independent Test**: The homepage shows a blog teaser with the latest posts; a
project with a linked post shows a "read the write-up →" link to that post; a post
shows a "back to portfolio" link.

### Implementation for User Story 3

- [ ] T014 [P] [US3] Create `_includes/portfolio/blog-teaser.html`: the latest 2–3 `site.posts` (newest, optionally featured-first) rendered with the Sprint-3 `_includes/blog/post-card.html`, a section heading, and a "view all posts →" link to `/blog/`; omit the whole section gracefully when there are no posts (FR-006, SC-004) — see [plan.md](plan.md) Phase 0 "Teaser source"
- [ ] T015 [US3] Wire a `#blog-teaser` section slot into `_layouts/portfolio.html` (consistent with the Sprint-2 section-slot pattern) so `index.html` renders the teaser between existing sections (FR-006)
- [ ] T016 [P] [US3] Style the blog teaser in `_sass/pages/_portfolio.scss`: the post-cards in the portfolio-world context, responsive 3/2/1, within the portfolio container (FR-006, FR-009)
- [ ] T017 [US3] Add a "read the write-up →" link to `_includes/portfolio/projects.html`, rendered only for cards whose entry has a `post:` field; **fix the stale `post:` URL in `_data/projects.yml`** to the real permalink `/blog/bioinformatics/tutorials/variant-calling-pipeline/` so the link resolves (FR-007)
- [ ] T018 [US3] Confirm/refine the "back to portfolio" link already present in `_layouts/post.html` (added in Sprint 3) satisfies FR-007 — adjust wording/placement if needed; do **not** duplicate it (FR-007)
- [ ] T019 [US3] Verify: the homepage teaser shows the latest posts and updates automatically when a post is added (no template edit); a project with a linked post shows the write-up link pointing to a working post; the post shows back-to-portfolio (SC-004, FR-007)

**Checkpoint**: Work and writing reinforce each other; the bridge is complete.

---

## Phase 6: User Story 4 - Smooth in-page navigation (Priority: P3)

**Goal**: In-page anchors scroll smoothly where motion is allowed, jump directly
under reduced motion, and always land on target — with no JS dependency.

**Independent Test**: Clicking an in-page anchor scrolls smoothly; with reduced
motion or JS off it still lands on the section.

### Implementation for User Story 4

- [ ] T020 [US4] Confirm `scroll-behavior: smooth` (reduced-motion gated) in `_sass/base/_global.scss` drives in-page anchors with no JS; verify the nav's in-page anchor (`Projects` → `/#projects`) and the hero CTA land on their targets (FR-008)
- [ ] T021 [US4] Verify: activating an in-page anchor scrolls smoothly; `prefers-reduced-motion` (or JS disabled) jumps directly and still lands on the target (FR-008, SC-003)

**Checkpoint**: In-page navigation feels polished and degrades gracefully.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Site-wide responsive, accessibility, performance, and design-system
verification against a real build.

- [ ] T022 [P] Responsive pass across sm 576 / md 768 / lg 1024 / xl 1280 + a 360px phone: nav, mobile overlay, and teaser have no horizontal overflow; the nav-on-scroll solidify causes **no layout shift** (reserved height) (FR-009, SC-001)
- [ ] T023 a11y pass: axe contrast on nav, overlay, teaser, and the active-world cue; full keyboard walk-through — overlay focus trap, Escape, focus return, and correct `aria-expanded` / `aria-current` (FR-010, SC-005)
- [ ] T024 Budget check on a production build: shared `assets/js/main.js` is deferred, non-blocking, and within budget (target ≤ ~2 KB, hard ≤ 10 KB compressed); total CSS still ≤ 30 KB compressed (Constitution Principle II)
- [ ] T025 [P] Token-only audit: header/overlay/teaser/active-cue styles use tokens only — no hard-coded hex, px font sizes, or magic-number spacing (Constitution Principle IV)
- [ ] T026 Update the active-plan pointer in `CLAUDE.md` from Sprint 3 to Sprint 4; note Sprint 5 (`005-interactivity-polish`) is next (copy-to-clipboard, sticky TOC, tag filter, hero typing, scroll-to-top build on this nav/JS base)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies — start immediately.
- **Foundational (Phase 2)**: depends on Setup — **blocks all user stories** (nav `world` hints, About target, transition base).
- **User Stories (Phase 3–6)**: all depend on Foundational.
  - US1 (P1) builds the nav structure + JS and is the MVP.
  - US2 (P1) adds the active-world cue + confirms the transition; it edits `header.html` and `_header.scss` after US1, so sequence those edits.
  - US3 (P2) is independent (teaser + cross-link snippets in distinct files).
  - US4 (P3) is mostly confirmation of existing Sprint-1 CSS.
- **Polish (Phase 7)**: after the desired stories are complete.

### Shared-file edit points (sequential, not parallel)

- `_includes/header.html` — US1 structure (T005) then US2 active-world (T010).
- `_sass/layout/_header.scss` — US1 layout/overlay/scroll (T006) then US2 active cue (T011).
- `_sass/base/_global.scss` — confirmed (T004), referenced by US2/US4 (no new edits expected).
- `_layouts/post.html` — Sprint 3 added back-to-portfolio; US3 only refines (T018).

### Parallel Opportunities

- US1: T007 (`main.js`) is `[P]` with the header markup/styles once the fallback contract (class/attribute names) is agreed; T005 → T006 → T008 sequence, then T009 verify.
- US3: T014 (teaser include) and T016 (teaser styles) `[P]` with each other; T017 (projects) is a separate file, also parallelizable.
- Phase 7: T022, T025 in parallel.

---

## Parallel Example: User Story 3

```bash
# Author the teaser and its styling together (different files), plus the
# project cross-link snippet:
Task: "Create _includes/portfolio/blog-teaser.html (latest posts via post-card)"
Task: "Style .blog-teaser in _sass/pages/_portfolio.scss"
Task: "Add read-the-write-up link to _includes/portfolio/projects.html + fix projects.yml post URL"
# Then, sequentially: wire #blog-teaser slot into portfolio.html → verify
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 Setup → `assets/js/` ready.
2. Phase 2 Foundational → nav `world` hints + About target + transition base.
3. Phase 3 US1 → responsive nav with no-JS fallback + JS enhancement. **STOP and validate** (incl. JS-off pass).

Because US1 and US2 are both P1 (navigation and the world-switch are the sprint's
reason to exist), the recommended first shippable milestone is **US1 + US2**.

### Incremental Delivery

1. Setup + Foundational → scaffolding ready.
2. US1 → responsive nav (MVP) → demo (desktop + 360px + JS-off).
3. US2 → world shift + active-nav cue → demo (P1 complete).
4. US3 → teaser + cross-links → demo (the bridge).
5. US4 → smooth-scroll confirmation → demo.
6. Polish → responsive + a11y + JS/CSS budgets + token audit + plan pointer.

### MVP Scope

**User Story 1** delivers usable navigation everywhere; **US1 + US2** together
deliver the must-have P1 connected, dual-world site.

---

## Notes

- No test tasks (tests not requested for this theme sprint).
- `[P]` = different files, no incomplete dependencies.
- All JS is `defer`-loaded enhancement over a no-JS fallback (Principle I); track
  it against the 10 KB JS budget — this is the first sprint with JS.
- Rebuild after adding the `@import`/`<script>` to catch errors early.
- Keep all colours/sizes/spacing in tokens (Principle IV).
- Copy-to-clipboard, sticky TOC, tag filter, hero typing, and scroll-to-top are
  **Sprint 5** — they build on this nav/JS base, not here.
- The About page is linked, not authored, this sprint (a stub keeps it from 404ing).
- Commit after each logical group / completed story.

## Summary

- **Total tasks**: 26 (Setup 1, Foundational 3, US1 5, US2 4, US3 6, US4 2, Polish 5)
- **By story**: US1 = 5, US2 = 4, US3 = 6, US4 = 2
- **Parallel opportunities**: US1 `main.js` (T007); US3 teaser pair + project snippet (T014/T016/T017); Polish pair (T022/T025)
- **MVP**: Phases 1–3 (US1 responsive nav); recommended first shippable = US1 + US2 (both P1)
- **Independent test per story**: US1 nav reaches all destinations desktop+360px, mobile menu open/close, JS-off links work; US2 visible world shift + highlighted Blog link; US3 auto-updating teaser + project↔post cross-links; US4 smooth anchor scroll degrading to a direct jump
