---
description: "Task list for Interactivity & Polish (Sprint 5)"
---

# Tasks: Interactivity & Polish

**Input**: Design documents from `/specs/005-interactivity-polish/`

**Prerequisites**: [plan.md](plan.md) (required), [spec.md](spec.md) (required for
user stories). No `data-model.md`, `research.md`, `contracts/`, or `quickstart.md`
(decisions live inline in [plan.md](plan.md) Phase 0; spec states "No new
persistent data").

**Builds on**: Sprint 2 — `_includes/portfolio/hero.html` (tagline `<p>`),
`_includes/portfolio/projects.html` + `_sass/components/_cards.scss` (project
cards). Sprint 3 — `_includes/blog/post-card.html`, `_includes/blog/toc.html`
(stub), `_sass/components/_code-blocks.scss` (terminal chrome on
`.highlighter-rouge`), `_layouts/blog-index.html` + `_layouts/post.html`. Sprint 4
— `assets/js/main.js` (the shared deferred IIFE: mobile menu + nav-on-scroll),
`_includes/head.html` (single deferred `<script>`), the `prefers-reduced-motion`
guard and `scroll-behavior: smooth` in `_sass/base/_global.scss`.

**Already in place (verified 2026-06-13)**:
- `assets/js/` contains **only `main.js`**; `portfolio.js`/`blog.js` do **not**
  exist. `head.html` loads `main.js` `defer` on **every** page (no page-conditional
  loading yet) — this sprint adds the per-page modules and the conditional load.
- `_includes/blog/toc.html` is a **stub**: `<nav class="post-toc" … hidden
  data-toc>` with an empty body and an explicit "Populated in Sprint 5" comment.
  The `hidden` attribute must be removed/restructured so the no-JS anchor list is
  visible (FR-002 / SC-001). Kramdown auto-generates heading `id`s, so anchors
  resolve. `post.html` already calls `{% include blog/toc.html %}`.
- `hero.html` tagline is `<p class="hero__tagline lead">{{ profile.tagline … }}</p>`
  — full text present (good no-JS/reduced-motion fallback) but **no JS target or
  data hook** for typing yet.
- `_sass/components/_code-blocks.scss` styles `.highlighter-rouge` (terminal bar +
  traffic-light dots) and its comment notes the copy button is a Sprint-5 layer;
  there is a `position: relative` to anchor an absolutely-positioned button.
- `_sass/components/_cards.scss` has `.card:hover { border-color … }` already; its
  comment says the **hover lift lives behind motion-safe** — refine for FR-006 +
  add a focus-visible equivalent.
- `post-card.html` (`<li class="post-card card">`) has **no `data-tags`** yet;
  tags render via `blog/post-meta.html show_tags=true`. `blog.html` is
  front-matter-only (`layout: blog-index`); the post **list** + empty state live in
  `_layouts/blog-index.html`, so tag-filter controls wire into that layout (its
  `{{ content }}` slot or header), not `blog.html`.
- `_includes/shared/` has `seo.html` + `skip-link.html` only — **no
  `scroll-top.html`**. `base.html` is the include point for a site-wide control.
- `_sass/components/` has buttons/cards/tags/code-blocks; **no `_cursor-blink.scss`**.
  `assets/css/main.scss` imports components in a clear block — a new partial must be
  registered there.
- `_sass/base/_global.scss` already has `scroll-behavior: smooth` and a
  `@media (prefers-reduced-motion: reduce)` block (the consolidation point for new
  motion overrides). `base.html` sets `data-page-type` on `<html>` and `<body>`.

**Tests**: Not requested. Static Jekyll theme; verification is manual
(`bundle exec jekyll build`, JS-on/off passes, `prefers-reduced-motion` emulation,
keyboard pass, gzipped-JS measurement). No automated test tasks are generated.

**Build environment note**: Ruby is available (ruby 4.0.5, jekyll 4.4.1) — build
and verify against `_site/` here; only genuinely visual/behavioural checks (live
typing animation, scroll-driven TOC tracking, reduced-motion emulation,
cross-device hover) are author spot-checks.

**JS budget (carried from Sprint 4)**: `main.js` is **1.22 KB gzipped**; the hard
budget is **≤ 10 KB total compressed** (Constitution Principle II / FR-009 /
SC-005). This sprint adds `portfolio.js` + `blog.js`; **CSS-first** ordering keeps
the bundle small. Measure the gzipped total before sign-off; **if over budget, drop
the lowest-priority effect (P3 / US4) first** (plan Constitution Check mitigation).

**Implementation status (2026-06-13)**: **All 28 tasks complete (`[X]`).** Built &
verified with `bundle exec jekyll build` (clean, ~2.2 s; only the pre-existing
Sprint-1 Dart Sass deprecation warnings). Verified against `_site/`:
- **Per-page JS split + conditional load**: `main.js` (shared) site-wide;
  `blog.js` on blog pages, `portfolio.js` on portfolio pages (confirmed in built
  `<head>`). All `defer`. Gzipped: `main.js` 1.74 KB, `blog.js` 1.56 KB,
  `portfolio.js` 0.64 KB → **per-page max ≈ 3.34 KB** (blog) / 2.4 KB (portfolio),
  well under the 10 KB budget. All three pass `node --check`. CSS 4.58 KB gz ≤ 30 KB
  (T003, T004, T024).
- **US1 copy**: `blog.js` runtime-injects an accessible copy button per
  `.highlighter-rouge` (Clipboard API with graceful skip); **0 buttons in static
  HTML** (5 code blocks stay selectable JS-off). Affordance styled in the terminal
  bar, no CLS (T005–T007).
- **US2 TOC**: `blog/toc.html` now **server-renders** the anchor list from the
  post's `h2`/`h3` (Liquid `split` over `content`) — verified 4 correct items
  (3×h2 + 1×h3) with ids matching the body on the variant-calling post; wrapped in
  `<details open>` for no-JS collapse; `IntersectionObserver` adds `aria-current`
  active tracking (T008–T011). **Deviation**: the TOC renders as a collapsible
  block at the top of the post, **not a sticky desktop sidebar** — the post uses a
  single `.container-prose` column with no aside, so a sticky full-width TOC would
  overlap the prose. Active-tracking + no-JS list + collapse are delivered; the
  sticky-sidebar nicety is deferred (would need a post-layout grid; flagged for the
  author).
- **US3 tag filter**: `data-tags` on each post-card; `[data-tag-filter]` controls
  (unique `site.tags` + "All") render as real `/blog/` links (harmless JS-off);
  `blog.js` toggles `card.hidden`, updates active control + `aria-current`, and an
  empty-state `[data-filter-empty]` (T012–T016).
- **US4 polish**: hero `[data-typed]` keeps full text (no-JS/reduced-motion
  fallback); `portfolio.js` types it only when motion is allowed; `_cursor-blink.scss`
  blinks the hero caret + `.eyebrow` `>_` markers (motion-safe); `scroll-top.html`
  (anchor to `#main-content`, CSS-hidden until `main.js` reveals it past 600 px,
  reduced-motion-aware, keyboard-focuses `#main-content`); card hover gated to
  `(hover: hover)`/`(pointer: fine)` with a `:focus-within` equivalent (T017–T023).
- Added a global `.visually-hidden` utility in `_global.scss` (the class was used in
  markup but never defined) — gives the scroll-top label and the existing header
  "Menu" span a proper accessible-name-only treatment (T020, cross-cutting a11y).

**Browser spot-checks left to the author** (structurally sound, not run headless):
live hero typing + caret blink, scroll-driven TOC active-item tracking, the
< 100 ms tag-filter feel + empty state, `prefers-reduced-motion` emulation (no
typing/blink/hover), scroll-top reveal/return + focus, and pointer-vs-touch card
hover (parts of T007, T011, T016, T023, T025, T026).

**Organization**: Tasks are grouped by user story for independent implementation
and verification.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1 / US2 / US3 / US4 (setup, foundational, and polish tasks carry no story label)
- All paths are repo-relative.

## Path Conventions

Single Jekyll project at the repository root. Per-page JS: `assets/js/main.js`
(shared), `assets/js/portfolio.js`, `assets/js/blog.js`. Includes:
`_includes/blog/toc.html`, `_includes/portfolio/hero.html`,
`_includes/shared/scroll-top.html`, `_includes/blog/post-card.html`. Styles:
`_sass/components/{_code-blocks,_cards,_cursor-blink,_tags}.scss`,
`_sass/pages/_blog.scss`, `_sass/base/_global.scss`. Layouts:
`_layouts/{blog-index,post,base}.html`. Tokens only — no hard-coded values
(Principle IV).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Stand up the per-page JS module split and its loading so each story
has a home and each page ships only what it needs.

- [X] T001 [P] Create `assets/js/portfolio.js` as a `"use strict"` IIFE skeleton (empty bodies for hero typing + card-hover assist) — the home for portfolio-page enhancements (plan Project Structure)
- [X] T002 [P] Create `assets/js/blog.js` as a `"use strict"` IIFE skeleton (empty bodies for copy, TOC observer, tag filter) — the home for blog-page enhancements (plan Project Structure)
- [X] T003 Update `_includes/head.html` to load JS page-conditionally with `defer`: keep `main.js` site-wide; add `portfolio.js` only when `page.page_type` is `portfolio` and `blog.js` only when `page.page_type` is `blog`, so no page over-ships (FR-009, Principle II)

**Checkpoint**: `jekyll build` succeeds; the right module loads on each world, all deferred and non-blocking.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: One shared reduced-motion primitive the animated behaviours reuse, so
the guard is defined once (plan: "a single exported `prefersReducedMotion` check is
shared").

**⚠️ CRITICAL**: No motion-bearing user-story JS (US4 typing/scroll-top) should be
written until this exists.

- [X] T004 In `assets/js/main.js`, expose a tiny shared reduced-motion helper on a small global namespace (e.g. `window.Site.prefersReducedMotion()` wrapping `matchMedia('(prefers-reduced-motion: reduce)')`); `defer` order guarantees `main.js` runs before `portfolio.js`/`blog.js`, which consume it. Keep it a few lines; no behaviour change to the existing menu/scroll code (FR-004, FR-005, SC-006)

**Checkpoint**: Build passes; the reduced-motion guard is available to all modules.

---

## Phase 3: User Story 1 - Copy code with one click (Priority: P1) 🎯 MVP

**Goal**: Every code block gains a one-click copy button (when JS is available)
that copies the exact code and confirms; absent and harmless with JS off or when
the Clipboard API is missing.

**Independent Test**: On a post with code blocks, each block shows a copy button
that copies the exact code and shows a brief "Copied" confirmation; with JS off the
button is absent and the code is still selectable.

### Implementation for User Story 1

- [X] T005 [P] [US1] In `assets/js/blog.js`, add a copy module: at runtime, find each `.highlighter-rouge` block, inject an accessible `<button>` (with `aria-label`/visible text), copy the block's `code` text via `navigator.clipboard.writeText`, and fall back to a hidden-`<textarea>` + `document.execCommand('copy')` (or omit the button) when the Clipboard API is absent; swap the label to "Copied" briefly on success then restore (FR-001, SC-002, plan Phase 0 "Copy-to-clipboard")
- [X] T006 [P] [US1] In `_sass/components/_code-blocks.scss`, style the injected copy button as an affordance positioned in the existing terminal title bar (the container already has `position: relative`): default/hover/`:focus-visible` states and the "Copied" state, token-only, no layout shift (FR-001, FR-010, Principle IV)
- [X] T007 [US1] Verify on a post with multiple code blocks: each button copies the exact code, shows the confirmation, and is keyboard-operable with an accessible name; **with JS disabled** no button is rendered and the code remains fully selectable (SC-001, SC-002, FR-008)

**Checkpoint**: MVP — readers can copy code in one click; JS-off stays clean.

---

## Phase 4: User Story 2 - Find your way through a long post (Priority: P2)

**Goal**: Posts with `toc: true` render a table of contents from their headings —
a working anchor list with JS off, with the current section highlighted as the
reader scrolls when JS is on.

**Independent Test**: A long `toc: true` post shows a TOC whose links jump to
headings and whose active item updates while scrolling; with JS off it is still a
usable anchor list (no active tracking); a post with < 2 headings shows no TOC.

### Implementation for User Story 2

- [X] T008 [US2] Replace the `_includes/blog/toc.html` stub with a **server-rendered** anchor list (no JS): extract `<h2>`/`<h3>` headings from the post's `content` in Liquid by scanning for kramdown's auto-`id`d openers — capture each via `content | split: '<h2 ' / '<h3 '` then pull the `id="…"` and inner text, building `<a href="#id">` items (decision: Liquid regex/`split` over `content`, **not** a JS-built list, so it works JS-off). Wrap the list in a `<details open class="post-toc__disclosure">` for no-JS collapse (see T010); **remove the `hidden` attribute**; render nothing when there are < 2 matched headings (FR-002, SC-001, plan Phase 0 "TOC tracking")
- [X] T009 [US2] In `assets/js/blog.js`, **only layer active-section tracking onto the already-server-rendered list** (never build the list in JS): an `IntersectionObserver` toggles an active class (with `aria-current`) on the TOC item for the heading in view; no-op when `[data-toc]` is absent or has < 2 items (FR-002, SC-003)
- [X] T010 [US2] Style the TOC in `_sass/pages/_blog.scss`: sticky on desktop; on smaller screens the `<details>` disclosure (T008) provides a **CSS/no-JS collapse** (no JS toggle); a **non-colour-only** active-item indicator meeting contrast; reserve space so it causes no layout shift (FR-002, FR-010, Principle IV)
- [X] T011 [US2] Verify on a long `toc: true` post: links jump to the right headings, the active item tracks the section while scrolling, a < 2-heading post shows no TOC, and **with JS off** the TOC is a working anchor list with no active tracking (SC-001, SC-003, FR-008)

**Checkpoint**: Long posts are navigable and orient the reader; degrades to a plain anchor list.

---

## Phase 5: User Story 3 - Filter the blog by topic (Priority: P2)

**Goal**: The blog index supports client-side tag filtering with no reload; with JS
off all posts show and tags behave as plain links/labels.

**Independent Test**: On the blog index, selecting a tag shows only posts with that
tag; clearing restores all; an empty result shows an empty-state with a way to
clear; with JS off all posts are visible and nothing is broken.

### Implementation for User Story 3

- [X] T012 [P] [US3] Add a `data-tags` attribute (space- or comma-joined `post.tags`) to the `<li class="post-card card">` in `_includes/blog/post-card.html` so the filter can match without re-reading the DOM text (FR-003)
- [X] T013 [US3] Add tag-filter controls to `_layouts/blog-index.html` (header or `{{ content }}` region): a list of the index's unique tags plus an "All" reset, rendered as real anchors/labels so they degrade to harmless links with JS off; mark the control container with a hook (e.g. `data-tag-filter`) (FR-003, SC-001)
- [X] T014 [US3] In `assets/js/blog.js`, implement the filter: clicking a tag toggles a visibility class on the `data-tags` cards over the already-rendered list (no reload, < 100 ms), updates the active control state, shows an empty-state message with a clear-action when zero match, and restores all on "All"/clear (FR-003, SC-004, plan Phase 0 "Tag filter")
- [X] T015 [P] [US3] Style the tag-filter controls and empty state in `_sass/components/_tags.scss` (and/or `_sass/pages/_blog.scss`): active/inactive control states (non-colour-only), `:focus-visible`, and the empty-state message, token-only (FR-003, FR-010, Principle IV)
- [X] T016 [US3] Verify on the blog index: selecting a tag filters in under 100 ms with no reload, clearing restores all, a zero-match filter shows the empty state + clear control, and **with JS off** all posts are visible and tags are non-broken links (SC-001, SC-004, FR-008)

**Checkpoint**: Topic discovery works on the index; static index still fully usable.

---

## Phase 6: User Story 4 - Animated hero and finishing touches (Priority: P3)

**Goal**: The hero tagline types out with a blinking cursor, terminal headers blink
(CSS), project cards react on hover/focus, and a back-to-top control appears after
scrolling — all gated by `prefers-reduced-motion`.

**Independent Test**: With motion allowed the hero types its tagline and ends with a
blinking cursor; a scroll-to-top control appears after scrolling and returns to top
(keyboard-operable); cards show a hover effect on pointer + an equivalent focus
state; under `prefers-reduced-motion` the full tagline shows immediately and no
typing/blink/hover animation runs.

### Implementation for User Story 4

- [X] T017 [P] [US4] In `_includes/portfolio/hero.html`, keep the full tagline text in the markup as the fallback and wrap it in a JS target (e.g. a `[data-typed]` span retaining the full string) so typing enhances rather than supplies the text (FR-004, SC-006, plan Phase 0 "Hero typing")
- [X] T018 [US4] In `assets/js/portfolio.js`, implement the typing animation that reveals the tagline character-by-character **only when** `Site.prefersReducedMotion()` is false (T004); under reduced motion leave the full text untouched; end in a cursor state coordinating with the CSS blink (FR-004, SC-006) (depends on T004, T017)
- [X] T019 [P] [US4] Create `_sass/components/_cursor-blink.scss` (and register it in the components block of `assets/css/main.scss`): a CSS `@keyframes` blink applied to the hero cursor and the **designated "terminal" headers** — **decision: the existing `.eyebrow` `>_` section markers** (e.g. hero `>_ portfolio`, projects `>_ projects`) are the terminal headers; no new markup/class is introduced. Wholly inside a `prefers-reduced-motion` guard so it is static under reduced motion (FR-007, SC-006, Principle IV)
- [X] T020 [P] [US4] Create `_includes/shared/scroll-top.html` (an accessible back-to-top `<a href="#main-content">`/`<button>` with a label, hidden initially) and include it once in `_layouts/base.html` so it is site-wide (FR-005, FR-010)
- [X] T021 [US4] In `assets/js/main.js`, reveal the scroll-top control past a scroll threshold (transform/opacity so there is **no CLS**) and scroll to top on activation, honouring `Site.prefersReducedMotion()` for the scroll behaviour; ensure it is keyboard-operable (FR-005, SC-006) (depends on T004, T020)
- [X] T022 [P] [US4] In `_sass/components/_cards.scss`, refine the project-card hover into a subtle accent/glow gated to **pointer devices** (`@media (hover: hover)`/`(pointer: fine)`) and behind a motion-safe guard, plus an equivalent `:focus-visible` state for keyboard users, token-only (FR-006, FR-010, Principle IV)
- [X] T023 [US4] Verify (motion allowed): hero types out + cursor blinks, terminal headers blink, scroll-top appears after scrolling and returns to top via mouse + keyboard, cards respond on hover and show a focus state; under `prefers-reduced-motion`: full tagline immediate, no typing/blink/hover, scroll-top jumps directly (SC-006, FR-004–FR-007)

**Checkpoint**: The site feels alive and crafted, and goes calm under reduced motion.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Budget, accessibility, JS-off integrity, token discipline, and the
plan pointer — verified against a real build.

- [X] T024 Budget check on a production build: measure the **gzipped total** of `main.js` + `portfolio.js` + `blog.js` ≤ 10 KB (target small; baseline `main.js` ≈ 1.22 KB) and confirm all are `defer`/non-blocking; total CSS still ≤ 30 KB compressed; **if over, drop the lowest-priority (P3/US4) effect first** (FR-009, SC-005, Principle II)
- [X] T025 a11y pass: axe contrast + full keyboard walk-through of the copy button, TOC (active item), tag-filter controls, and scroll-top — each has an accessible name/state; `prefers-reduced-motion` emulation confirms no typing/blink/hover animation runs and all information is still conveyed (FR-010, SC-006)
- [X] T026 JS-disabled full-site pass: every page readable, no dead controls — copy buttons absent, TOC is a working anchor list, all posts visible with tags as links, hero shows full tagline, scroll-top harmless/absent (SC-001, FR-008)
- [X] T027 [P] Token-only audit of all new/changed styles (copy button, TOC, tag controls, cursor-blink, scroll-top, card hover): no hard-coded hex, px font sizes, or magic-number spacing (Principle IV)
- [X] T028 Update the active-plan pointer in `CLAUDE.md` from Sprint 4 to Sprint 5; note Sprint 6 (`006-motifs-identity`) is next (DNA helix, terminal headers, hex skills grid, organic dividers)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies — start immediately.
- **Foundational (Phase 2)**: depends on Setup (the modules must exist to host the shared helper) — **blocks the motion-bearing US4 JS** (T018, T021).
- **User Stories (Phase 3–6)**: depend on Setup; only US4's motion JS depends on Foundational.
  - US1 (P1, copy) is the MVP and is independent of US2–US4.
  - US2 (TOC) and US3 (tag filter) are independent of each other (different markup + different `blog.js` modules) but both add code to `blog.js`, so sequence the `blog.js` edits.
  - US4 (P3) is independent but is the budget-drop candidate if JS exceeds 10 KB.
- **Polish (Phase 7)**: after the desired stories are complete.

### Shared-file edit points (sequential, not parallel)

- `assets/js/blog.js` — US1 copy (T005) → US2 TOC observer (T009) → US3 filter (T014). Same file; sequence these edits.
- `assets/js/main.js` — Foundational helper (T004) → US4 scroll-top (T021). Same file.
- `assets/js/portfolio.js` — created in T001, filled by US4 typing (T018).
- `assets/css/main.scss` — one import line added in T019 (cursor-blink).
- `_sass/components/_cards.scss` — US4 hover/focus only (T022).

### Parallel Opportunities

- Setup: T001 + T002 (different files) in parallel; then T003.
- US1: T005 (`blog.js` copy) ∥ T006 (`_code-blocks.scss`) — different files — then T007 verify.
- US3: T012 (`post-card.html`) ∥ T015 (tag/empty-state styles) with the layout/logic work; T014 sequences after T013.
- US4: T017 (hero markup) ∥ T019 (cursor-blink) ∥ T020 (scroll-top include) ∥ T022 (card styles); then T018/T021 (JS) which depend on T004 + their markup; then T023 verify.
- Phase 7: T027 in parallel with T024–T026 review.

---

## Parallel Example: User Story 4

```bash
# Author the independent markup/style pieces together (different files):
Task: "Add [data-typed] tagline target + full-text fallback in _includes/portfolio/hero.html"
Task: "Create _sass/components/_cursor-blink.scss + register in main.scss"
Task: "Create _includes/shared/scroll-top.html + include in _layouts/base.html"
Task: "Refine card hover + add :focus-visible in _sass/components/_cards.scss"
# Then the JS that depends on the shared guard (T004) and the markup:
Task: "Hero typing in assets/js/portfolio.js (reduced-motion gated)"
Task: "Scroll-top show/scroll in assets/js/main.js (reduced-motion gated)"
# Then verify (T023).
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 Setup → per-page modules + conditional loading.
2. Phase 2 Foundational → shared reduced-motion helper.
3. Phase 3 US1 → copy-to-clipboard on code blocks. **STOP and validate** (incl. JS-off pass).

US1 is the highest-value interaction for a technical blog and ships independently.

### Incremental Delivery

1. Setup + Foundational → module split + motion guard ready.
2. US1 → copy buttons → demo (JS-on + JS-off).
3. US2 → TOC (server list + active tracking) → demo.
4. US3 → client-side tag filter → demo.
5. US4 → hero typing, cursor blink, scroll-top, card hover → demo (reduced-motion checked).
6. Polish → JS/CSS budgets + a11y + JS-off integrity + token audit + plan pointer.

### Budget-Driven Scope

Measure gzipped JS continuously (T024). If the three modules exceed 10 KB, drop the
lowest-priority **US4** effect(s) first (plan Constitution Check mitigation) — never
US1–US3, which are the substantive interactions.

---

## Notes

- No test tasks (tests not requested for this theme sprint).
- `[P]` = different files, no incomplete dependencies.
- Every feature is a `defer`-loaded / CSS-only progressive enhancement over a fully
  functional no-JS baseline (Principle I, FR-008, SC-001).
- **CSS-first**: cursor blink (T019), card hover (T022), and smooth scroll (existing
  `_global.scss`) are CSS, not JS — they don't count against the JS budget.
- Every animation sits inside a `prefers-reduced-motion` guard (FR-004/006/007, SC-006).
- Keep all colours/sizes/spacing in tokens (Principle IV); rebuild after adding the
  `@import`/`<script>` lines to catch errors early.
- DNA helix, terminal-header motifs, hex skills grid, and organic dividers are
  **Sprint 6** (`006-motifs-identity`) — not here.

## Summary

- **Total tasks**: 28 (Setup 3, Foundational 1, US1 3, US2 4, US3 5, US4 7, Polish 5)
- **By story**: US1 = 3, US2 = 4, US3 = 5, US4 = 7
- **Parallel opportunities**: Setup T001/T002; US1 T005/T006; US3 T012/T015; US4 T017/T019/T020/T022; Polish T027
- **MVP**: Phases 1–3 (US1 copy-to-clipboard) — the highest-value blog interaction, ships standalone
- **Independent test per story**: US1 one-click copy + confirmation, JS-off no button; US2 server TOC + scroll-tracked active item, JS-off anchor list; US3 < 100 ms client filter + empty state, JS-off all visible; US4 hero typing + scroll-top + card hover, all calm under reduced motion
- **Budget gate**: gzipped total JS ≤ 10 KB (baseline `main.js` ≈ 1.22 KB); drop P3/US4 first if exceeded
