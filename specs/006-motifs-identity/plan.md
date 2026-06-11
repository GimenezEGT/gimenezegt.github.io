# Implementation Plan: Motifs & Identity

**Branch**: `006-motifs-identity` | **Date**: 2026-06-11 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/006-motifs-identity/spec.md`

## Summary

Layer the bioinformatics/creative identity onto the finished, functional site:
a low-opacity animated DNA helix behind the hero, terminal-style section headers,
a hexagonal skills grid, organic SVG dividers for the blog, and an optional
particle effect on project-card hover. Implementation is SVG + CSS first, with a
tiny capped JS routine only for particles. Every motif is decorative-only
(hidden from assistive tech), reduced-motion safe, and held within the CSS/JS
budgets — motifs yield to legibility and performance, never the reverse.

## Technical Context

**Language/Version**: SVG, SCSS (clip-path, transforms, keyframes), minimal
vanilla JS/canvas; Jekyll ~> 4.3

**Primary Dependencies**: Sprint 1 tokens; Sprint 5 `_cursor-blink.scss` and
reduced-motion guard; existing section/card markup

**Storage**: Static SVG assets in `assets/images/`; no data

**Testing**: `jekyll build`; visual review both worlds; reduced-motion emulation;
screen-reader/decorative-tree check; axe contrast over the helix; Lighthouse
budget + CLS

**Target Platform**: Static hosting, evergreen browsers

**Project Type**: Static site (single project)

**Performance Goals**: No budget regression — CSS ≤ 30 KB, JS ≤ 10 KB compressed;
zero new CLS; animations lightweight (GPU-friendly transforms, capped particles)

**Constraints**: Decorative-only and `aria-hidden`; reduced-motion static/hidden;
helix must not drop hero contrast below AA; token-driven colours/opacities

**Scale/Scope**: ~4 SVG motifs + 1 optional JS particle routine; styling across
hero, section headers, skills, blog dividers, cards

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Zero-Framework JS & Progressive Enhancement | ✅ Pass | Motifs are SVG/CSS; only optional particles use a tiny JS routine; nothing required for content. |
| II. Performance Budget Is a Gate | ⚠ Watch | Decorative assets/animation can bloat CSS/JS; SVG optimisation, capped particles, and budget re-measure are gating (FR-008). |
| III. Accessibility by Default | ✅ Pass | Decorative motifs `aria-hidden`, out of focus order; helix contrast-constrained (FR-001/005, SC-001/004). |
| IV. Single-Source Dual-Palette Design System | ✅ Pass | Motif colours/opacities from tokens; portfolio geometric vs blog organic via palette (FR-009). |
| V. Content-First & Data-Driven | ✅ Pass | No content in decoration; motifs sit behind/around existing content. |

**Result**: PASS with a watch on Principle II. Mitigation: optimise/minify SVG,
inline only small assets, cap particle count and disable on touch/reduced-motion,
and re-measure budgets; if exceeded, drop particles (P3) first per FR-008.

## Project Structure

### Documentation (this feature)

```text
specs/006-motifs-identity/
├── plan.md
└── spec.md
```

### Source Code (repository root)

```text
assets/images/
├── hero/dna-helix.svg           # Hero background motif (FR-001)
└── blog/organic-divider.svg     # Blog divider/header art (FR-004)
_includes/portfolio/
├── hero.html                    # Inline/aria-hidden helix layer (FR-001)
└── skills.html                  # Hex-grid markup (FR-003)
_includes/shared/
└── section-header.html          # Terminal-style header partial (FR-002)
_includes/blog/divider.html      # Organic divider include (FR-004)
_sass/components/
├── _terminal.scss               # Terminal section-header styling (FR-002)
├── _cursor-blink.scss           # Reused from Sprint 5 (FR-002)
└── _cards.scss                  # Particle layer hooks (FR-006)
_sass/pages/
├── _portfolio.scss              # Helix layering, hex grid, responsive fallback (FR-001/003)
└── _blog.scss                   # Organic divider placement (FR-004)
_sass/base/_global.scss          # Reduced-motion overrides for all motifs (FR-007)
assets/js/portfolio.js           # Optional capped particle effect (FR-006)
```

**Structure Decision**: Motifs attach to existing includes rather than new
sections. The helix is an `aria-hidden` SVG layer positioned behind hero content
with constrained opacity/blur. The hex grid is CSS (clip-path) with a documented
small-screen fallback. Terminal headers become a reusable `section-header.html`
partial. Particles are an optional, lazily-initialised routine in `portfolio.js`,
gated on pointer + motion.

## Implementation Phases

### Phase 0: Research & Decisions

- **DNA helix** — Decision: a hand-authored/optimised SVG animated via CSS
  transform (slow rotate/translate), low opacity, `aria-hidden`, behind hero text;
  static under reduced motion. Verify hero contrast over it (FR-001/SC-001).
  Alternative rejected: canvas/WebGL helix (overkill, JS cost).
- **Terminal headers** — Decision: `section-header.html` partial renders a `>_`
  prefix using `_terminal.scss` + reused cursor-blink. CSS-only.
- **Hex skills grid** — Decision: CSS `clip-path: polygon(...)` hexagons in a grid;
  below `md`, fall back to the Sprint 2 tag/grid layout (FR-003).
- **Organic blog dividers** — Decision: optimised SVG line-art divider include,
  blog-palette stroke via `currentColor`/token; decorative/`aria-hidden` (FR-004).
- **Card particles (optional)** — Decision: tiny capped canvas routine (≤ ~1 KB),
  init on `pointerenter` only when pointer + motion; never on touch/reduced-motion;
  drop first if over budget (FR-006/FR-008).
- **Budget** — Decision: run SVGO on assets; re-measure CSS/JS gzipped after each
  motif (FR-008/SC-005).

### Phase 1: Design & Build

1. **Assets** — author + optimise `dna-helix.svg` and `organic-divider.svg`.
2. **Helix** — layer into `hero.html` (aria-hidden); style/animate in
   `_portfolio.scss`; contrast-verify hero text.
3. **Terminal headers** — `section-header.html` + `_terminal.scss`; apply to
   portfolio section headers.
4. **Hex grid** — hex markup in `skills.html`; `_portfolio.scss` clip-path grid +
   responsive fallback.
5. **Blog dividers** — `blog/divider.html`; place via `_blog.scss`.
6. **Particles (optional)** — capped routine in `portfolio.js`; card hooks in
   `_cards.scss`; gate on pointer + motion.
7. **Reduced-motion + a11y** — consolidate motif overrides in `_global.scss`;
   confirm all motifs `aria-hidden` and out of focus order.
8. **Budget + agent context** — re-measure budgets; update the SPECKIT block in
   `CLAUDE.md` to this plan.

### Phase 2 (handoff)

`/speckit-tasks` generates ordered tasks: assets → helix → terminal headers →
hex grid → blog dividers → (optional) particles → reduced-motion/a11y/budget verify.

## Verification

- Hero contrast over helix ≥ 4.5:1 in both motion states (SC-001).
- Side-by-side: portfolio reads geometric/technical, blog organic/creative (SC-002).
- Reduced-motion: no motif animates; layout unchanged (SC-003, FR-007).
- Screen reader: no decorative motif in focus/reading order (SC-004, FR-005).
- Lighthouse: CSS/JS within budget, no new CLS (SC-005, FR-008).

## Complexity Tracking

No constitution violations. Principle II watch is mitigated by SVG optimisation,
capped/optional particles, and budget re-measurement; the optional particle effect
is dropped rather than justified if it cannot fit the budget.
