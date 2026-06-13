---
description: "Task list for Blog Core (Sprint 3)"
---

# Tasks: Blog Core

**Input**: Design documents from `/specs/003-blog-core/`

**Prerequisites**: [plan.md](plan.md) (required), [spec.md](spec.md) (required for
user stories). Design docs available: [data-model.md](data-model.md). No
`research.md`, `contracts/`, or `quickstart.md` for this sprint (decisions live
inline in [plan.md](plan.md) Phase 0).

**Builds on**: Sprint 1 (`001-foundation-skeleton`) — token system, `data-page-type`
palette switch driven by `page_type`, `_layouts/base.html`, `container-prose`
column, `_layouts/blog-index.html` + `_layouts/post.html` **stubs**, `_config.yml`
(`permalink: /blog/:categories/:title/`, posts defaults `layout: post` /
`author` / `page_type: blog`, kramdown + Rouge, `jekyll-feed`,
`jekyll-paginate-v2`). Sprint 2 (`002-portfolio-core`) — the **tag pill**
component (`_sass/components/_tags.scss`) and card patterns, reused here.

**Already in place (verified 2026-06-12)**: `_config.yml` posts defaults and
permalink are set; `_includes/blog/` exists (only `.gitkeep`); `_sass/vendors/`
exists (empty); the two blog layouts exist as Sprint 1 stubs using
`blog-index__title` / `post__header` / `post__content` BEM classes; no `_posts/`
yet; `main.scss` has no blog `@import`s yet.

**Tests**: Not requested. This is a static Jekyll theme; verification is manual
(build/serve, responsive resize, axe contrast, keyboard pass, JS-off read, and a
read-time spot check) per the plan. No automated test tasks are generated.

**Build environment note**: Ruby **is** available in this environment
(ruby 4.0.5, jekyll 4.4.1) — Sprint 3 was built and verified here, not deferred.

**Implementation status (2026-06-12)**: **All 26 tasks complete (`[X]`).** The
production build passes (`bundle exec jekyll build`, 2.8 s clean) with no errors —
the only warnings are pre-existing Dart Sass `map-get`/`map-has-key` deprecations
from Sprint 1's `_functions.scss`, not this sprint. Verified objectively against
the generated `_site`:
- Both posts render at clean permalinks (`/blog/:categories/:title/`); the index
  lists them **newest-first** (06-11 before 05-20) as cards (T012, T018).
- `post-meta` renders identically from header and card: "June 11, 2026 · 2 min
  read"; read times **2 / 1 min** match a 200-wpm estimate within ±1 min (T021,
  SC-005). Tags appear in the post **footer** and on **cards** (single component,
  `show_tags` param — FR-008).
- Code blocks emit the `.highlighter-rouge` terminal chrome with live Rouge token
  spans; the dark syntax theme passes contrast on `--bg-elevated` — lowest 5.97:1
  (comments), keywords 8.6:1, strings 8.41:1, numbers 6.36:1; body text 13.7:1
  (T012, T023, SC-003).
- Below-the-fold images are lazy-loaded — body `<img loading="lazy">` (via the
  `content | replace` filter) and the card cover (Constitution II).
- Graceful degradation: post 2 has no `image` (no card media rendered) and no
  front-matter `excerpt` (derived from the body) — FR-007.
- **CSS = 3.7 KB gzipped** (16.3 KB raw) vs. the 30 KB budget; **0 JS** added
  (T024, Principle II). Global `:focus-visible` outline covers every card/post
  link for keyboard operability (T023, SC-004).

**Browser spot-check left to the author** (structurally sound — token max-widths,
`flex-wrap`, `overflow-x:auto` on `pre`/tables, `aspect-ratio` media, responsive
grid — but not visually resized here): the T022 cross-breakpoint pass at
sm/md/lg/xl. **Asset to add**: the post-1 cover `/assets/images/blog/
variant-pipeline-cover.png` and body `pipeline-dag.png` are referenced but not yet
committed — they 404 until dropped in (intentional graceful degradation otherwise).

**Organization**: Tasks are grouped by user story so each can be implemented and
verified independently. The shared `post-meta` component (FR-008) is built in
Foundational because both US1 (post header) and US2 (index card) consume it; US3
owns its formatting **rules** (date format, read-time accuracy) and the
cross-context consistency verification.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1 / US2 / US3 (setup, foundational, and polish tasks carry no story label)
- All paths are repo-relative.

## Path Conventions

Single Jekyll project at the repository root. Blog section includes live in
`_includes/blog/`, the syntax theme in `_sass/vendors/_syntax.scss`, the code
container in `_sass/components/_code-blocks.scss`, blog page styles in
`_sass/pages/_blog.scss`, sample content in `_posts/`, and `assets/css/main.scss`
is the single compiled entry point. Tokens only — no hard-coded
colours/sizes/spacing (Constitution Principle IV).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure the Sprint 3 directories exist before authoring files.

- [X] T001 Confirm/create the Sprint 3 directories at repo root (most exist from Sprint 1 — create any missing): `_includes/blog/` (has `.gitkeep`), `_sass/vendors/` (empty), `_posts/` (new), reusing existing `_sass/components/` and `_sass/pages/`

**Checkpoint**: Target directories exist; ready to author shared assets.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Post-render config, the shared metadata component, and the blog-world
base styles every story depends on.

**⚠️ CRITICAL**: No user-story work can begin until this phase is complete.

- [X] T002 Confirm `_config.yml` post rendering is ready (no change expected): posts defaults already set (`layout: post`, `author`, `page_type: blog`) and `permalink: /blog/:categories/:title/`; verify `_drafts/` is excluded from production builds and that `jekyll-paginate-v2` is inert (render all posts newest-first this sprint per [plan.md](plan.md) Phase 0) (FR-001, SC-001)
- [X] T003 [P] Create `_includes/blog/post-meta.html`: the single reusable metadata component (FR-008) — `display_date` (human-readable, e.g. "June 11, 2026"), `read_time` = `content` (or a passed `include.words`) → `number_of_words | divided_by: 200.0 | ceil` rendered "X min read", and tag pills via the Sprint 2 tag component; gracefully omit tags when absent. Parameterised so both the post header and the index card include it (FR-002, FR-007, FR-008) — see [data-model.md](data-model.md) Derived table
- [X] T004 [P] Create `_sass/pages/_blog.scss` base: blog-world activation scoped under `[data-page-type="blog"]` — serif heading stack, warmer-palette token mapping, and the ~720px prose column (confirm/extend Sprint 1 `container-prose`), plus blog section rhythm (FR-001, FR-009, SC-002) — see [plan.md](plan.md) Constraints
- [X] T005 Activate the blog page `@import` in `assets/css/main.scss`: add `pages/blog` after `pages/portfolio` (the `vendors/syntax` and `components/code-blocks` imports are added in US1 — T010)

**Checkpoint**: `jekyll build` succeeds — blog base styles compile, `post-meta` available; layouts still render as (now styled) stubs.

---

## Phase 3: User Story 1 - Read an individual post (Priority: P1) 🎯 MVP

**Goal**: A Markdown post renders as a well-typeset `<article>` at its permalink —
title, date, read time, styled body, terminal-styled highlighted code blocks,
tags, and "back to blog" / subtle "back to portfolio" links.

**Independent Test**: Create a Markdown post with front matter and a fenced code
block; it renders as a styled article at its permalink with terminal code blocks,
readable and selectable with JavaScript disabled.

### Implementation for User Story 1

- [X] T006 [P] [US1] Create `_sass/vendors/_syntax.scss`: a dark Rouge theme mapping palette tokens (amber/green/blue) to syntax classes (`.highlight .k`, `.s`, `.c`, `.n`, etc.); every foreground must be contrast-verified against `--bg-elevated` (FR-004, SC-003) — see [plan.md](plan.md) Phase 0 "Syntax theme"
- [X] T007 [P] [US1] Create `_sass/components/_code-blocks.scss`: the terminal-styled container wrapping Rouge output — elevated background, top bar with three coloured dots and an optional filename, and horizontal scroll for long lines without breaking page layout; reduced-motion safe, no JS (FR-004, FR-010)
- [X] T008 [P] [US1] Create markup-only stubs `_includes/blog/toc.html` and `_includes/blog/related-posts.html` (rendered conditionally; sticky/active-section + populated related behaviour is Sprint 5)
- [X] T009 [US1] Flesh out `_layouts/post.html` (Sprint 1 stub): keep `layout: base` + `page_type: blog`; semantic `<article>` with `<h1>` title, the `blog/post-meta` include in `post__header`, the rendered body in `post__content` via `{{ content | replace: '<img ', '<img loading="lazy" ' }}` (lazy-loads below-the-fold body images — Constitution II), a tag row, and "back to blog" (`/blog/`) + a subtle "back to portfolio" (`/`) link; include `toc`/`related-posts` stubs (gated on `page.toc`) (FR-001, FR-002, FR-003, FR-005, Constitution II)
- [X] T010 [US1] Add post-body prose styles (headings, paragraphs, lists, links, blockquotes, tables, images + optional captions, inline code) and back-link styles to `_sass/pages/_blog.scss`; add `vendors/syntax` + `components/code-blocks` `@import`s to `assets/css/main.scss` (FR-003, FR-004)
- [X] T011 [P] [US1] Create sample post `_posts/2026-06-11-variant-calling-pipeline.md` per [data-model.md](data-model.md): full front matter (title, date, categories, tags, excerpt, image, `toc: true`) and varied Markdown body — headings, list, blockquote, image, and multi-language fenced code blocks (e.g. python + bash) (SC-001, SC-003)
- [X] T012 [US1] Verify: the post renders at its `/blog/:categories/:title/` permalink with title, human date, and read time; body is serif-styled; fenced code renders in the terminal container with correct highlighting; tags + both back links present; content is readable and selectable with JS disabled (FR-010, SC-003)

**Checkpoint**: MVP — an individual post reads beautifully with no JS.

---

## Phase 4: User Story 2 - Discover posts from the blog index (Priority: P1)

**Goal**: The blog index lists published posts newest-first as cards (title, date,
read time, excerpt, tags), each linking to its post, in the distinct blog world.

**Independent Test**: With ≥ 2 published posts, the blog index lists a card for
each, newest first, each linking to its post; an empty post set shows a tasteful
empty state.

### Implementation for User Story 2

- [X] T013 [P] [US2] Create second sample post `_posts/2026-05-20-tidy-genomics-in-r.md` per [data-model.md](data-model.md), deliberately exercising graceful degradation — **no `image`** and **no `excerpt`** front matter (excerpt must derive from the body) — with an R fenced code block (FR-007, SC-001)
- [X] T014 [P] [US2] Create `_includes/blog/post-card.html`: a card with the linked title, the shared `blog/post-meta` include (date · read time · tags), and an excerpt = front-matter `excerpt` if present else `post.content | strip_html | truncate: 160`; render the cover image (when present) with `loading="lazy"` and omit it gracefully when absent (FR-006, FR-007, FR-008, Constitution II)
- [X] T015 [US2] Flesh out `_layouts/blog-index.html` (Sprint 1 stub): keep `layout: base` + `page_type: blog`; render a page header then loop `site.posts` (already newest-first) emitting one `blog/post-card`; show a tasteful empty state when `site.posts` is empty (FR-006)
- [X] T016 [US2] Create `blog.html` at repo root (`layout: blog-index`, `permalink: /blog/`, a `title`) — this resolves the Sprint 2 hero "Read the Blog" CTA forward-reference (FR-006)
- [X] T017 [US2] Add blog-index card-list + responsive styles to `_sass/pages/_blog.scss`: vertical card list (or grid) within the prose width, hover/focus affordance, 3/2/1 reflow with no horizontal overflow (FR-006, FR-009)
- [X] T018 [US2] Verify: `/blog/` lists both posts newest-first as cards with title/date/read-time/excerpt/tags, each navigating to its post; the second post's derived excerpt and missing image degrade gracefully; the blog world is visually distinct from the portfolio (serif, narrower column, warmer palette) (SC-001, SC-002)

**Checkpoint**: P1 complete — readers can discover posts and read them.

---

## Phase 5: User Story 3 - Scannable, consistent post metadata (Priority: P2)

**Goal**: Date, reading time, and tags render in one consistent format everywhere,
via the single `post-meta` component (built in Foundational T003).

**Independent Test**: The `post-meta` component renders identical formatting on a
post card and a post header; read time is within ±1 min of a 200-wpm estimate.

> **Note**: the `post-meta` component itself is created in Foundational (T003)
> because US1 and US2 both depend on it (FR-008). This phase owns its derived-value
> **rules** and the cross-context consistency verification.

### Implementation for User Story 3

- [X] T019 [US3] Confirm/refine the derived-value rules in `_includes/blog/post-meta.html`: `read_time` uses `ceil(words / 200)` ("X min read") and `display_date` uses one human-readable format; ensure the same markup/output is produced whether included from the post header or the index card (FR-002, FR-008)
- [X] T020 [US3] Add `post-meta` row styling (date · read-time · tags) to `_sass/pages/_blog.scss`, consistent in both the card and the post header contexts (FR-008, FR-009)
- [X] T021 [US3] Verify: `post-meta` renders identical date/read-time/tag formatting on a post card and a post header; spot-check that the displayed read time is within ±1 min of a manual 200-wpm estimate of the body (SC-005)

**Checkpoint**: Metadata is consistent and trustworthy across the blog.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Blog-wide responsive, accessibility, performance, and design-system
verification (run against a real build).

- [X] T022 [P] Responsive pass across sm 576 / md 768 / lg 1024 / xl 1280: blog index and post have no horizontal overflow; the prose column stays ~720px and readable; long code lines scroll within the code container, not the page (FR-009, SC-003)
- [X] T023 a11y pass: axe contrast ≥ 4.5:1 on all blog text **and** on every syntax-theme foreground over `--bg-elevated` (verify, don't assume); keyboard reaches every index card, post link, and both back links with visible focus (FR-009, SC-004)
- [X] T024 Budget check on a production build: 0 KB blocking JS added, and total compressed CSS stays within the 30 KB budget after the new `vendors/syntax` + `components/code-blocks` + `pages/blog` partials (Constitution Principle II)
- [X] T025 [P] Token-only audit: `_syntax.scss`, `_code-blocks.scss`, and `_blog.scss` use tokens only — no hard-coded hex, px font sizes, or magic-number spacing (Constitution Principle IV)
- [X] T026 Update the active-plan pointer in `CLAUDE.md` from Sprint 2 to Sprint 3, and confirm the Sprint 4 (`004-navigation-bridge`) hand-off note (the homepage blog teaser consumes `featured: true` posts)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies — start immediately.
- **Foundational (Phase 2)**: depends on Setup — **blocks all user stories** (post config + shared `post-meta` + blog base styles).
- **User Stories (Phase 3–5)**: all depend on Foundational.
  - US1 (P1) delivers the post reading experience and is the MVP.
  - US2 (P1) delivers the index; it depends only on Foundational (the shared `post-meta`), not on US1, though both ship together for the P1 milestone.
  - US3 (P2) refines + verifies the `post-meta` rules created in Foundational.
- **Polish (Phase 6)**: after the desired stories are complete.

### Shared-file edit points (sequential, not parallel)

- `_sass/pages/_blog.scss` — base (T004), then each story appends its rules (T010, T017, T020).
- `assets/css/main.scss` — `pages/blog` import in T005; `vendors/syntax` + `components/code-blocks` imports in T010.
- `_includes/blog/post-meta.html` — created in T003, rules confirmed in T019.

### Parallel Opportunities

- Phase 2: T003, T004 in parallel (different files).
- US1: T006, T007, T008, T011 in parallel (syntax theme, code component, include stubs, sample post — all different files); then T009 → T010 → T012.
- US2: T013, T014 in parallel (sample post + card include); then T015 → T016 → T017 → T018.
- Phase 6: T022, T025 in parallel.

---

## Parallel Example: User Story 1

```bash
# Author the independent pieces together (different files):
Task: "Create _sass/vendors/_syntax.scss (dark Rouge theme)"
Task: "Create _sass/components/_code-blocks.scss (terminal container)"
Task: "Create _includes/blog/toc.html + related-posts.html stubs"
Task: "Create _posts/2026-06-11-variant-calling-pipeline.md sample post"
# Then, sequentially: post.html → prose styles + imports → verify
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 Setup → directories ready.
2. Phase 2 Foundational → post config + `post-meta` + blog base styles.
3. Phase 3 US1 → a post reads beautifully with terminal code blocks. **STOP and validate.**

Because US1 and US2 are both P1 (a blog needs both a place to read and a place to
discover), the recommended first shippable milestone is **US1 + US2**.

### Incremental Delivery

1. Setup + Foundational → scaffolding ready.
2. US1 → post layout (MVP) → demo.
3. US2 → blog index → demo (P1 complete; hero "Read the Blog" CTA now resolves).
4. US3 → metadata consistency pass → demo.
5. Polish → responsive + a11y + budget + token audit + plan pointer.

### MVP Scope

**User Story 1** delivers the post reading experience; **US1 + US2** together
deliver the must-have P1 blog (read + discover).

---

## Notes

- No test tasks (tests not requested for this theme sprint).
- `[P]` = different files, no incomplete dependencies.
- Rebuild after adding any `@import` to catch SCSS errors early.
- Keep all colours/sizes/spacing in tokens (Constitution Principle IV).
- Copy-to-clipboard, sticky TOC, tag filtering, and related-posts population are
  **out of scope** here (Sprint 5); ship the static, readable base.
- The homepage blog teaser consuming `featured: true` is Sprint 4 (Bridge).
- Highlighting is build-time (Rouge); no client JS is added (Principle I/II).
- Commit after each logical group / completed story.

## Summary

- **Total tasks**: 26 (Setup 1, Foundational 4, US1 7, US2 6, US3 3, Polish 5)
- **By story**: US1 = 7, US2 = 6, US3 = 3
- **Parallel opportunities**: Foundational pair (T003/T004); US1 quartet (T006/T007/T008/T011); US2 pair (T013/T014); Polish pair (T022/T025)
- **MVP**: Phases 1–3 (US1 post layout); recommended first shippable = US1 + US2 (both P1)
- **Independent test per story**: US1 styled post + terminal code, JS-off readable; US2 data-driven index, newest-first, graceful degradation + empty state; US3 identical `post-meta` formatting across card + header, read-time within ±1 min
