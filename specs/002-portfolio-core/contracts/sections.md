# Contracts: Portfolio Section Includes

Phase 1 output for `002-portfolio-core`. The homepage's external interface is the
**data → section** contract: each `_includes/portfolio/*.html` partial reads a
fixed set of `_data` inputs and emits a defined semantic structure. Honouring
these contracts is what makes sections independently testable and keeps content
out of markup (Constitution Principle V).

Data field schemas live in [data-model.md](../data-model.md); this file fixes the
**render contract** (inputs consumed, output structure, conditional rules) for
each include.

## Composition contract — `_layouts/portfolio.html`

- **Input**: none directly; composes the includes below.
- **Output order (FR-001)**: `hero → about → projects → skills → contact`, each
  wrapped in a semantic `<section>` with a stable `id` and an accessible heading.
- **Rule**: `index.html` sets `layout: portfolio`; the layout owns section order,
  not `index.html`.

## `hero.html` (FR-002)

- **Reads**: `site.title` / `profile` name, role tagline, `navigation`/blog URL.
- **Emits**: name (page `<h1>`), one-line role tagline, two CTAs —
  "Explore Projects" (anchor to `#projects`) and "Read the Blog" (link to blog
  index).
- **Rules**: CTAs are real anchors/links (work with JS off); content sits above
  the fold (SC-001).

## `about.html` (FR-006)

- **Reads**: `site.data.profile.bio` (optional) and `site.data.profile.facts`
  (required list of `{ label, value }`).
- **Emits**: bio copy + a "key facts" / terminal-style panel listing each fact
  as `> label: value`.
- **Rules**: if `bio` is absent, fall back to inline about copy; facts render in
  source order.

## `projects.html` (FR-003 … FR-005)

- **Reads**: `site.data.projects` (list of Project entries).
- **Emits**: a grid of cards, one per entry, each with title, description, and
  tech tags; featured entries first and visually distinguished.
- **Conditional rules**:
  - `repo` present → render repo link (`target="_blank" rel="noopener"`).
  - `demo` present and non-empty → render demo link; absent → omit (no broken
    action) (FR-004).
  - `image` present → cover image (lazy-loaded); absent → text-only/placeholder
    card, no layout shift.
  - `featured: true` → sorted ahead + accent modifier class (FR-005).
  - empty list → empty state, not an empty grid.

## `skills.html` (FR-007)

- **Reads**: `site.data.skills` (list of `{ category, items[] }`).
- **Emits**: one group per category, with a category heading and its skills;
  optional `level` rendered as a proficiency indicator when present.
- **Rules**: categories and items render in source order; missing `level`/`icon`
  degrade silently.

## `contact.html` (FR-008)

- **Reads**: `site.data.social` (reused from Sprint 1) and the author email.
- **Emits**: an email action (`mailto:`) and social links.
- **Rules**: external social links open in a new tab with `rel="noopener"`;
  links are keyboard-reachable with visible focus.

## Cross-cutting contract (all sections)

- **Tokens only** — no hard-coded hex/px/spacing (Principle IV).
- **Responsive** — 3/2/1 projects grid at desktop/tablet/mobile; section padding
  scales per breakpoint (FR-009, SC-003).
- **Accessible** — semantic landmarks, heading hierarchy, contrast ≥ 4.5:1,
  visible `:focus-visible`, all CTAs/links keyboard-operable (FR-011, SC-004).
- **No blocking JS** — smooth-scroll/hover are CSS enhancement only (SC-005).
