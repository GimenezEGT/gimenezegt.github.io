# Research: Portfolio Core

Phase 0 output for `002-portfolio-core`. Resolves the technical decisions behind
the data-driven homepage so Phase 1 build has no open `NEEDS CLARIFICATION`.
All choices honour the constitution: zero-framework JS, performance budget,
accessibility, single-source tokens, content-first data.

## Decision 1 — Projects grid technique

- **Decision**: CSS Grid with `repeat(auto-fill, minmax(<card-min>, 1fr))` and a
  token-based gap. Columns reflow naturally to 3 / 2 / 1 as viewport narrows; a
  `max` clamp on the container caps it at three columns on wide screens.
- **Rationale**: One rule produces the 3/2/1 responsive behaviour (FR-009,
  SC-003) without per-breakpoint media-query gymnastics, and never overflows
  horizontally. Fewer lines, fluid between breakpoints.
- **Alternatives considered**: Fixed column counts switched via media queries at
  each breakpoint (more CSS, brittle, less fluid); Flexbox with wrapping
  (uneven last-row widths, harder to keep equal-height cards).

## Decision 2 — Featured-project emphasis & ordering

- **Decision**: Sort featured first in Liquid (stable: featured entries in source
  order, then the rest in source order) and apply an accent-border/glow modifier
  class to featured cards.
- **Rationale**: Satisfies FR-005 (visually distinguished *or* ordered ahead) by
  doing both, while keeping a single unified grid. Ordering is data-driven, so
  flipping `featured: true` is the only edit needed (SC-002).
- **Alternatives considered**: A separate "Featured" section above the grid
  (fragments the grid, duplicates markup); CSS `order` on a flex container
  (decouples DOM order from visual order, hurting keyboard/reading sequence).

## Decision 3 — About "terminal window" facts panel

- **Decision**: A static, styled panel that renders `profile.facts` as
  `> label: value` lines using terminal-flavoured component styles. No JS, no
  animation this sprint.
- **Rationale**: Delivers the credibility/identity beat now (FR-006) while
  staying static and accessible. Full terminal chrome and typing motion are
  explicitly deferred to Sprint 6 / Sprint 5 per the spec assumptions.
- **Alternatives considered**: Faking a live terminal with JS typing (violates
  Principle I and the sprint scope); a plain definition list with no identity
  (misses the design intent the panel exists to convey).

## Decision 4 — Smooth-scroll for the hero CTA

- **Decision**: `scroll-behavior: smooth` in CSS, gated behind
  `@media (prefers-reduced-motion: no-preference)`. The "Explore Projects" CTA is
  an ordinary `#projects` anchor.
- **Rationale**: Zero JS (Principle I, SC-005); degrades to an instant anchor
  jump with JS disabled or reduced-motion set (Principle III). No blocking work
  on the main thread.
- **Alternatives considered**: `Element.scrollIntoView({behavior:'smooth'})` in
  JS (adds a script for a CSS-native effect); ungated smooth scroll (ignores
  `prefers-reduced-motion`, an accessibility regression).

## Decision 5 — Reusable component boundary (button / card / tag)

- **Decision**: Extract `_sass/components/_buttons.scss`, `_cards.scss`, and
  `_tags.scss` as token-only partials, imported by `main.scss`. The hero CTAs,
  project cards, and tech tags consume them.
- **Rationale**: Sprint 3 (blog) reuses the same card/tag/button vocabulary, so
  building them as shared components now avoids duplication and visual drift
  (Principle IV). All values come from tokens — no hard-coded hex/px.
- **Alternatives considered**: Page-scoped styles inside `_portfolio.scss`
  (would force a rewrite or copy-paste in Sprint 3); a CSS framework (banned by
  the constitution and over budget).

## Decision 6 — Missing / optional field handling

- **Decision**: Templates render repo/demo links, cover image, and linked post
  only when the field is present and non-empty; an absent image falls back to a
  text-only card (or a neutral placeholder block) with no layout shift. External
  links open in a new tab with `rel="noopener"`.
- **Rationale**: Matches FR-004 and the spec edge cases (no image, no demo, long
  text). Keeps the grid robust to real, partially-filled data and avoids broken
  empty actions. Prevents CLS from missing media (Principle II).
- **Alternatives considered**: Requiring every field (brittle, unrealistic for a
  living portfolio); always reserving image space even when absent (wastes space,
  looks broken).

## Decision 7 — Empty-state behaviour

- **Decision**: If `projects.yml` is empty, the projects section renders a
  tasteful empty state rather than an empty grid; sections with no data are
  skipped, but the page still builds and renders.
- **Rationale**: Spec edge case ("projects data file is empty"). Guarantees the
  homepage never ships a broken or blank section, supporting the data-driven
  promise (Principle V).
- **Alternatives considered**: Letting an empty `for` loop render nothing (leaves
  an orphaned heading and dead whitespace).

## Open questions

None. All Technical Context items in `plan.md` are resolved; no
`NEEDS CLARIFICATION` remain.
