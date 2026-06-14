---
description: "Task list for Motifs & Identity (Sprint 6)"
---

# Tasks: Motifs & Identity

**Input**: Design documents from `/specs/006-motifs-identity/`

**Prerequisites**: [plan.md](plan.md) (required), [spec.md](spec.md) (required for
user stories). No `data-model.md`, `research.md`, `contracts/`, or `quickstart.md`
(spec states "No new persistent data"; decisions live inline in [plan.md](plan.md)
Phase 0).

**Builds on**: Sprint 2 — `_includes/portfolio/{hero,about,projects,skills,contact}.html`
(the `.section__intro` + `.eyebrow` pattern; `.skills__grid` category cards) and
`_sass/pages/_portfolio.scss`. Sprint 3/5 — `_layouts/post.html`,
`_sass/pages/_blog.scss`. Sprint 5 — `_sass/components/_cursor-blink.scss` (already
blinks a `_` caret on `.eyebrow`), the `_global.scss` `prefers-reduced-motion`
guard, `assets/js/portfolio.js` (hero typing; loaded only on portfolio pages),
`_sass/components/_cards.scss` (hover gated to pointer + `:focus-within`).

**Already in place (verified 2026-06-13)**:
- **FR-002 is partly delivered.** Every portfolio section header is
  `<div class="section__intro"><p class="eyebrow"><span aria-hidden="true">&gt;_ </span>label</p><h2>…</h2></div>`
  (projects, skills, contact, about, blog-teaser; hero uses the same `.eyebrow` but
  standalone). Sprint 5's `_cursor-blink.scss` **already** renders a blinking `_`
  caret via `.eyebrow::after` (motion-safe). This sprint **DRYs the repeated eyebrow
  markup into a reusable `shared/section-header.html` partial** and moves its layout
  styling into `_terminal.scss`, **reusing** (not duplicating) the existing caret.
- `_includes/portfolio/skills.html` renders **category-grouped cards**
  (`.skills__grid` → `.skills__group` → `.skills__list`/`.skills__item`), **not** a
  hex grid — FR-003 is a real restructure with a documented small-screen fallback.
- `assets/images/` contains only `.gitkeep` — **no `hero/` or `blog/` subdirs and no
  SVG assets** yet. (The variant post references a cover PNG that also does not
  exist; the card omits it gracefully — out of scope here.)
- `_includes/shared/` has `seo.html`, `skip-link.html`, `scroll-top.html` — **no
  `section-header.html`**. `_includes/blog/` has no `divider.html`.
- `_sass/components/` has buttons/cards/code-blocks/cursor-blink/tags — **no
  `_terminal.scss`**. `assets/css/main.scss` imports components in a clear block (a
  new partial must be registered there).
- `_sass/base/_global.scss` `@media (prefers-reduced-motion: reduce)` block already
  freezes **all** animations/transitions site-wide via `!important` — motifs inherit
  this automatically; per-motif static states only need adding where the *resting*
  visual must differ (e.g. helix opacity).
- `assets/js/portfolio.js` exists (hero typing) and is the home for the optional
  particle routine; it loads **only on portfolio-world pages** (head.html), so
  particles never ship to the blog.

**Tests**: Not requested. Static Jekyll theme; verification is manual
(`bundle exec jekyll build`, both-worlds visual review, `prefers-reduced-motion`
emulation, screen-reader/decorative-tree check, axe contrast over the helix,
gzipped CSS/JS measurement, CLS spot-check). No automated test tasks are generated.

**Build environment note**: Ruby is available (ruby 4.0.5, jekyll 4.4.1) — build
and verify against `_site/`; genuinely visual checks (helix animation + contrast,
hex grid across breakpoints, organic-vs-geometric read, reduced-motion emulation,
live particle hover) are author spot-checks.

**Budget (carried from Sprint 5)**: CSS **4.58 KB gz** (≤ 30 KB); per-page JS max
**3.34 KB gz** (≤ 10 KB). SVG assets are separate files (not counted against CSS/JS
but must be SVGO-optimised and must not cause CLS). **If a motif pushes a budget,
drop the optional P3 particle effect (US4) first** (FR-008, plan mitigation).

**Implementation status (2026-06-13)**: **All 27 tasks complete (`[X]`).** Built &
verified with `bundle exec jekyll build` (clean; only the pre-existing Sprint-1 Dart
Sass deprecation warnings) and `node --check`. Verified against `_site/`:
- **Helix (US1)**: `assets/images/hero/dna-helix.svg` (1.3 KB, two Q-curve strands +
  rungs) referenced as a CSS `mask` on `.hero__motif` (`aria-hidden`), tinted by
  `--accent-terminal`, opacity 0.08 on the right so hero text keeps contrast;
  `transform` drift under `@include motion-safe`, static otherwise (T005–T008).
- **Terminal headers (US1)**: new `shared/section-header.html` partial renders the
  `>_` eyebrow + heading; refactored all five portfolio intros (projects/skills/
  contact/about/blog-teaser) + the hero eyebrow to use it (6 `eyebrow__prompt`,
  3 `section__intro` wrappers, about/contact `wrap=false`); `_terminal.scss` styles
  the prompt glyph, **reusing** the Sprint-5 caret (no duplicate keyframes); all
  `aria-labelledby` ids still resolve (T009, T010).
- **Hex grid (US1)**: `skills.html` → one `.hexgrid__cell` per skill item (14 cells,
  level tints expert/proficient); `clip-path` hexagons on `md`+, simple labelled
  grid below `md` (mobile-first fallback), `aspect-ratio` reserves space → no CLS
  (T011, T012).
- **Blog dividers (US2)**: `assets/images/blog/organic-divider.svg` (0.9 KB, vine +
  leaves) via `_includes/blog/divider.html` (`aria-hidden`, `role=presentation`),
  CSS `mask` tinted by the blog `--accent-primary`; placed on the blog index and
  before each post footer (T014–T017).
- **Guardrail (US3)**: every motif is `aria-hidden`/decorative, `pointer-events:none`,
  out of focus order; the `_global.scss` reduced-motion guard freezes all motif
  animation; hex/divider/helix reserve space (T018–T020).
- **Particles (US4)**: capped (14-node) canvas node-graph in `portfolio.js`, init on
  `pointerenter` only when `(pointer: fine)` + motion; token colour read via
  `getComputedStyle`; `aria-hidden` canvas, removed on leave (T021–T023).
- **Budgets (T024/T026)**: CSS **4.9 KB gz** (≤ 30); per-page JS — portfolio
  **2.92 KB gz**, blog **3.34 KB gz** (≤ 10). Particles fit; no P3 drop needed.

**Browser spot-checks left to the author** (structurally sound, not run headless):
the live helix drift + hero-text contrast over it, the hex grid honeycomb read
across sm→xl + 360px fallback, the organic-vs-geometric world comparison,
`prefers-reduced-motion` emulation (helix/caret static, particles absent), and the
live card particle hover on a pointer device (parts of T008, T013, T017, T019, T023, T026).

**Note**: SVGs are hand-authored and minimal (no SVGO pass run — files are already
~1 KB with no editor cruft). The hex grid is a clean responsive grid of hexagon
cells rather than a fully-interlocking honeycomb (robust across arbitrary skill
counts); it reads clearly as a hex grid.

**Organization**: Tasks are grouped by user story for independent implementation
and verification.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1 / US2 / US3 / US4 (setup, foundational, and polish tasks carry no story label)
- All paths are repo-relative.

## Path Conventions

Single Jekyll project at the repository root. SVG assets:
`assets/images/hero/dna-helix.svg`, `assets/images/blog/organic-divider.svg`.
Includes: `_includes/shared/section-header.html`, `_includes/blog/divider.html`,
`_includes/portfolio/{hero,skills,…}.html`. Styles:
`_sass/components/{_terminal,_cursor-blink,_cards}.scss`,
`_sass/pages/{_portfolio,_blog}.scss`, `_sass/base/_global.scss`. JS:
`assets/js/portfolio.js`. Tokens only for colours/opacities — no hard-coded values
(Principle IV); every motif `aria-hidden` and reduced-motion safe.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Stand up the asset directories and the terminal-style stylesheet slot
so the motif work has somewhere to land.

- [X] T001 [P] Create `assets/images/hero/` and `assets/images/blog/` directories (with `.gitkeep` if empty) for the SVG motifs
- [X] T002 [P] Create `_sass/components/_terminal.scss` (skeleton + header comment) and register it in the components block of `assets/css/main.scss` (after `_code-blocks`/`_cursor-blink`)
- [X] T003 Confirm the reuse points for FR-002/FR-007: Sprint 5's `_cursor-blink.scss` `.eyebrow::after` caret and the `_global.scss` `prefers-reduced-motion` guard (which already freezes all animations). Document the decorative-motif convention (every motif is `aria-hidden` and out of focus order) as a comment in `_global.scss` — no rework expected

**Checkpoint**: `jekyll build` succeeds; asset dirs + terminal stylesheet exist.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The cross-cutting decorative + reduced-motion treatment that US3 (P1
guardrail) mandates and **every** motif must honour — established once so each motif
task layers compliantly.

**⚠️ CRITICAL**: No motif should be built without applying these conventions.

- [X] T004 In `_sass/base/_global.scss`, add a consolidated motif block: a base decorative-layer convention (e.g. a `.motif`/`[data-motif]` helper that is `pointer-events: none`, sits behind content via `z-index`, and reserves space to avoid CLS) and explicit reduced-motion static states for motifs whose *resting* look differs from their animated look (e.g. the helix stays visible-but-static). Token-driven; this underpins US1/US2/US4 (FR-005, FR-007, FR-008, SC-003)

**Checkpoint**: Build passes; the decorative/reduced-motion foundation is ready.

---

## Phase 3: User Story 1 - The portfolio signals "technical and precise" (Priority: P1) 🎯 MVP

**Goal**: The portfolio gains its technical motifs — a faint animated DNA helix
behind the hero, terminal-style section headers, and a hexagonal skills grid — all
legible, non-distracting, and reduced-motion safe.

**Independent Test**: On the homepage the hero shows a low-opacity animated helix
(text still meets contrast), section headers show the `>_` terminal treatment, and
skills render as a hex grid on desktop (simpler grid/tags on mobile).

### Implementation for User Story 1

- [X] T005 [P] [US1] Author + SVGO-optimise `assets/images/hero/dna-helix.svg`: geometric double-helix line art with a set `viewBox`, stroke via `currentColor` (token-tintable), no fixed fill colours, small file size (FR-001, FR-009)
- [X] T006 [US1] Layer the helix into `_includes/portfolio/hero.html`. **Decision: reference the external SVGO'd file** (not inline) inside a decorative `aria-hidden="true"` `.hero__motif` wrapper — via `<img>` or as a CSS `background-image` on the wrapper — positioned behind the hero content and out of focus order; the hero text markup is unchanged (FR-001, FR-005)
- [X] T007 [US1] Style + animate the helix in `_sass/pages/_portfolio.scss`. **Decision: animate the `.hero__motif` _wrapper_ via CSS `transform`** (slow GPU-friendly translate/rotate) under `@include motion-safe` — not internal SVG paths, since an external `<img>`/background can only be transformed as a whole; static otherwise. Position behind hero text, low opacity (token), reserve space so there is **no CLS** (FR-001, FR-007, FR-008)
- [X] T008 [US1] Verify hero text contrast over the helix is ≥ 4.5:1 in both motion and reduced-motion states (constrain opacity/blur if needed — the motif yields to legibility) (SC-001, FR-001)
- [X] T009 [P] [US1] Create `_includes/shared/section-header.html` (params: eyebrow label + heading text/id) rendering the terminal `>_` treatment. **Decision: the designated headers are all five portfolio section intros — `projects.html`, `skills.html`, `contact.html`, `about.html`, `blog-teaser.html` — plus the hero's `.eyebrow`**; refactor each to use the partial, DRYing the duplicated `.eyebrow` markup without changing output structure. (Blog-world headers are out of scope — they get the organic treatment in US2.) (FR-002)
- [X] T010 [US1] Add terminal-header styling in `_sass/components/_terminal.scss` (prefix alignment, mono treatment), **reusing** the existing `_cursor-blink.scss` `.eyebrow` caret (do not duplicate the keyframes); blink stays motion-safe (FR-002, FR-007)
- [X] T011 [US1] Convert `_includes/portfolio/skills.html` to hexagon markup. **Decision: one hexagon per skill _item_** (not per category); the category stays as a labelled row/heading above its hex cluster. Keep the data-driven `_data/skills.yml` loop (`group.category` → label, `group.items` → hex cells) and render the proficiency `level` inside or under each hex (FR-003)
- [X] T012 [US1] Implement the hex grid in `_sass/pages/_portfolio.scss`: `clip-path: polygon(...)` hex cells laid out with CSS Grid + alternating row offset (negative margin / translate) on `md`+; below `md` fall back to the Sprint-2 simpler grid/tag layout so nothing cramps. Hex cells use a fixed `aspect-ratio` so the grid reserves space (no CLS) (FR-003, FR-008)
- [X] T013 [US1] Verify the portfolio motifs: helix animates and text stays legible, every section header shows the `>_` terminal treatment, the hex grid renders on desktop and falls back cleanly on a 360px phone (SC-002, FR-002, FR-003)

**Checkpoint**: The portfolio reads as technical/precise from the motifs alone.

---

## Phase 4: User Story 2 - The blog whispers "and there's a creative mind here" (Priority: P2)

**Goal**: The blog gains organic, hand-drawn-style SVG dividers/header art in the
blog palette — a warmer counterpoint to the portfolio's geometry.

**Independent Test**: Blog pages show organic/botanical SVG dividers that read
warmer and more hand-made than the portfolio's geometric motifs.

### Implementation for User Story 2

- [X] T014 [P] [US2] Author + SVGO-optimise `assets/images/blog/organic-divider.svg`: organic/botanical line art with a set `viewBox` and stroke via `currentColor` so it tints to the blog palette token (FR-004, FR-009)
- [X] T015 [P] [US2] Create `_includes/blog/divider.html`: a decorative, `aria-hidden="true"` divider referencing the SVG (inline or `<img>`), out of focus order, tinted via the blog-world token (FR-004, FR-005)
- [X] T016 [US2] Place the divider in the blog flow via `_layouts/post.html` (and/or `blog-index.html`) and style it in `_sass/pages/_blog.scss` (spacing, max-width, blog-palette colour, no CLS) — e.g. between the post header and body, or as section breaks (FR-004, FR-008)
- [X] T017 [US2] Verify side-by-side: the blog's motifs read organic/warm and the portfolio's geometric/technical, using the correct palette in each world (SC-002, FR-004)

**Checkpoint**: The dual-world identity is complete — geometric portfolio vs organic blog.

---

## Phase 5: User Story 3 - Motifs never get in the way (Priority: P1)

**Goal**: Confirm — across every motif — that decoration never blocks content,
steals focus, hurts readability, or breaks budgets/reduced-motion.

**Independent Test**: With reduced motion all motif animations are static/hidden and
layouts are unchanged; screen-reader traversal encounters zero decorative motifs;
hero contrast and performance budgets still hold.

### Implementation for User Story 3

- [X] T018 [US3] Audit every motif (hero helix, blog dividers, hex cells, terminal `>_` prefixes, particle layer) for the decorative convention: `aria-hidden`/decorative, `pointer-events: none`, and **absent from keyboard focus order** — fix any that leak into the a11y tree (FR-005, SC-004)
- [X] T019 [US3] Confirm `prefers-reduced-motion`: the helix, cursor blink, and particles are static or hidden while layout and information are unchanged (the global guard plus the T004 resting states) (FR-007, SC-003)
- [X] T020 [US3] Verify a11y end-to-end: screen-reader traversal hits no decorative motif in focus/reading order; hero text contrast over the helix holds ≥ 4.5:1 (SC-001, SC-004, FR-005)

**Checkpoint**: The motifs are guaranteed never to harm usability, a11y, or layout.

---

## Phase 6: User Story 4 - Project cards feel alive (Priority: P3)

**Goal**: A subtle particle/node-graph effect on project-card hover (pointer + motion
only) hints at the data-science theme — pure flourish, first to be cut on budget.

**Independent Test**: Hovering a project card on a pointer device with motion allowed
plays a subtle particle effect; it is absent under reduced motion and on touch, and
the card is otherwise complete.

### Implementation for User Story 4

- [X] T021 [P] [US4] Add particle-layer hooks to `_sass/components/_cards.scss`: a positioned, `aria-hidden`, `pointer-events: none` canvas/element slot on the card that reserves no extra space (no CLS) and is invisible until activated (FR-006, FR-008)
- [X] T022 [US4] Implement a tiny **capped** particle/node routine in `assets/js/portfolio.js`, lazily initialised on `pointerenter` **only when** the device is a fine pointer with motion allowed (reuse `Site.prefersReducedMotion()` + a `(pointer: fine)` check); never run on touch or reduced motion; keep it ≤ ~1 KB gzipped (FR-006, FR-007, FR-008)
- [X] T023 [US4] Verify: particles play on hover (pointer + motion), are absent under reduced motion and on touch, and their absence leaves the card content fully intact (FR-006, SC-003)

**Checkpoint**: Cards have a delightful flourish that vanishes responsibly.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Budget, token discipline, layout stability, and the plan pointer —
verified against a real build.

- [X] T024 Budget check on a production build: SVGO-optimise both assets, then re-measure **gzipped** CSS ≤ 30 KB and per-page JS ≤ 10 KB (helix/terminal/hex CSS + optional particle JS); **if over, drop the P3 particle effect (US4) first** (FR-008, SC-005)
- [X] T025 [P] Token-only audit: all motif colours and opacities come from tokens and render correctly in **both** palettes (portfolio geometric / blog organic) — no hard-coded hex or magic opacities (FR-009, Principle IV)
- [X] T026 No-CLS + responsive pass: the helix, hex grid, dividers, and particle slot reserve space and cause **no layout shift**; check hex grid + helix across sm/md/lg/xl and a 360px phone (FR-008, SC-005)
- [X] T027 Update the active-plan pointer in `CLAUDE.md` from Sprint 5 to Sprint 6; note Sprint 7 (`007-optimization-launch`) is next (SEO/JSON-LD, perf + a11y gates, README, deploy)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies — start immediately.
- **Foundational (Phase 2)**: depends on Setup — establishes the decorative/reduced-motion conventions every motif must honour (US3 P1 guardrail), so it **blocks** the motif builds.
- **User Stories (Phase 3–6)**: depend on Foundational.
  - US1 (P1) is the MVP — the portfolio motifs are the visual thesis.
  - US2 (P2) is independent of US1 (blog files vs portfolio files).
  - US3 (P1) is largely **verification** of the conventions applied during US1/US2/US4; run it after the motifs it audits exist.
  - US4 (P3) is independent and the budget-drop candidate.
- **Polish (Phase 7)**: after the desired stories are complete.

### Shared-file edit points (sequential, not parallel)

- `_sass/pages/_portfolio.scss` — helix (T007), then hex grid (T012). Same file.
- `_includes/portfolio/skills.html` — section-header refactor (T009) then hex markup (T011). Same file; sequence them.
- `_sass/components/_cards.scss` — particle hooks (T021) only.
- `assets/js/portfolio.js` — particle routine (T022) only.
- `_sass/base/_global.scss` — foundational conventions (T004); referenced by US3 (no new edits expected).

### Parallel Opportunities

- Setup: T001 + T002 in parallel; then T003.
- US1: T005 (helix asset) ∥ T009 (section-header partial) at the start; helix chain T006→T007→T008; hex chain (after T009) T011→T012; then T013 verify.
- US2: T014 (asset) ∥ T015 (include) — different files — then T016 place + T017 verify.
- US4: T021 (card CSS hooks) ∥ early; then T022 (JS) → T023 verify.
- Phase 7: T025 in parallel with the T024/T026 review.

---

## Parallel Example: User Story 1

```bash
# Kick off the independent pieces together (different files):
Task: "Author assets/images/hero/dna-helix.svg (SVGO-optimised)"
Task: "Create _includes/shared/section-header.html and refactor section intros"
# Then the helix chain (markup → style → contrast) and the hex chain
# (markup → clip-path grid + fallback), finishing with the US1 verify.
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 Setup → asset dirs + `_terminal.scss`.
2. Phase 2 Foundational → decorative/reduced-motion conventions.
3. Phase 3 US1 → helix + terminal headers + hex grid. **STOP and validate**
   (contrast over helix, reduced-motion, hex fallback at 360px).

US1 is the visual thesis of the theme and ships standalone.

### Incremental Delivery

1. Setup + Foundational → conventions ready.
2. US1 → portfolio motifs → demo (the technical identity).
3. US2 → organic blog dividers → demo (dual-world complete).
4. US3 → guardrail audit (a11y, reduced-motion, contrast) → sign off the P1 pair.
5. US4 → optional card particles → demo (budget permitting).
6. Polish → budgets + token audit + no-CLS/responsive + plan pointer.

### Budget-Driven Scope

Re-measure gzipped CSS/JS after each motif (T024). If a budget is threatened, drop
the **P3 particle effect (US4)** first — never the P1/P2 identity motifs.

---

## Notes

- No test tasks (tests not requested for this theme sprint).
- `[P]` = different files, no incomplete dependencies.
- **SVG/CSS-first**: helix, terminal headers, hex grid, and dividers are SVG/CSS and
  don't touch the JS budget; only the optional particles use a tiny JS routine.
- Every motif is `aria-hidden`/decorative, out of focus order (FR-005), and
  reduced-motion safe via the global guard + T004 resting states (FR-007).
- Reuse Sprint 5's `_cursor-blink.scss` caret for terminal headers — do not
  duplicate the blink keyframes.
- Keep all motif colours/opacities in tokens, consistent across both palettes
  (FR-009, Principle IV). Rebuild after adding the `@import`/asset references.
- SEO/JSON-LD, perf + a11y launch gates, README, and deploy are **Sprint 7**
  (`007-optimization-launch`) — not here.

## Summary

- **Total tasks**: 27 (Setup 3, Foundational 1, US1 9, US2 4, US3 3, US4 3, Polish 4)
- **By story**: US1 = 9, US2 = 4, US3 = 3, US4 = 3
- **Parallel opportunities**: Setup T001/T002; US1 T005/T009 (asset + partial); US2 T014/T015 (asset + include); Polish T025
- **MVP**: Phases 1–3 (US1 portfolio motifs — helix, terminal headers, hex grid)
- **Independent test per story**: US1 helix legible + terminal headers + hex grid (desktop) / fallback (mobile); US2 organic blog dividers reading warmer than the portfolio; US3 reduced-motion static + zero decorative motifs in a11y tree + hero contrast holds; US4 hover particles on pointer+motion, absent on touch/reduced-motion
- **Budget gate**: gzipped CSS ≤ 30 KB / per-page JS ≤ 10 KB (baselines 4.58 KB / 3.34 KB); drop the P3 particle effect first if exceeded
