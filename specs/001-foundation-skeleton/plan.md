# Implementation Plan: Foundation & Skeleton

**Branch**: `001-foundation-skeleton` | **Date**: 2026-06-11 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-foundation-skeleton/spec.md`

## Summary

Stand up the Jekyll project, its directory structure, and the design-token
foundation, then build the root layout and global styles that every later sprint
extends. The technical approach: scaffold a Jekyll 4.3 site with a 7-1 SCSS
architecture; define both palettes as CSS custom properties switched by a
`data-page-type` attribute on `<body>`; ship a `base.html` layout plus header
and footer includes driven by `_data/*.yml`.

## Technical Context

**Language/Version**: Ruby (Jekyll ~> 4.3), SCSS, HTML5, minimal vanilla JS

**Primary Dependencies**: jekyll-feed, jekyll-seo-tag, jekyll-sitemap,
jekyll-paginate-v2 (declared now; first used later)

**Storage**: Flat files — `_data/*.yml`, Markdown; no database

**Testing**: `bundle exec jekyll build` (must succeed, no warnings treated as
errors); manual browser smoke test; axe DevTools for contrast; Lighthouse for
budget check

**Target Platform**: Static hosting (GitHub Pages / Netlify / Cloudflare Pages),
modern evergreen browsers

**Project Type**: Static site (single project) — Jekyll theme

**Performance Goals**: Skeleton CSS ≤ 30 KB compressed; 0 KB blocking JS;
FCP < 1.2 s; CLS < 0.1

**Constraints**: Zero JS frameworks; design tokens only; WCAG AA contrast;
`prefers-reduced-motion` honoured

**Scale/Scope**: One author, two "worlds" (portfolio/blog), ~5 layouts and a
handful of shared includes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Zero-Framework JS & Progressive Enhancement | ✅ Pass | Skeleton ships no JS; layout works statically. |
| II. Performance Budget Is a Gate | ✅ Pass | Compressed SCSS output; budget asserted in success criteria. |
| III. Accessibility by Default | ✅ Pass | Skip link, focus-visible, contrast-checked tokens, reduced-motion in `_global.scss`. |
| IV. Single-Source Dual-Palette Design System | ✅ Pass | This sprint *creates* the token system and `data-page-type` switch. |
| V. Content-First & Data-Driven | ✅ Pass | Header/footer read `_data/navigation.yml` and `_data/social.yml`; SEO include stubbed. |

**Result**: PASS — no violations. Complexity Tracking not required.

## Project Structure

### Documentation (this feature)

```text
specs/001-foundation-skeleton/
├── plan.md              # This file
└── spec.md              # Feature specification
```

### Source Code (repository root)

```text
_config.yml                      # Jekyll config (FR-001)
Gemfile                          # Ruby deps (FR-001)
404.html                         # Base error page
_data/
├── navigation.yml               # Primary nav items (FR-006)
└── social.yml                   # Social links (FR-007)
_layouts/
├── base.html                    # Root HTML skeleton (FR-004)
├── portfolio.html               # extends base (stub for Sprint 2)
├── blog-index.html              # extends base (stub for Sprint 3)
├── post.html                    # extends base (stub for Sprint 3)
└── page.html                    # generic page (extends base)
_includes/
├── head.html                    # <head>: meta, fonts, CSS link
├── header.html                  # Site nav (FR-006)
├── footer.html                  # Footer + social (FR-007)
└── shared/
    ├── seo.html                 # SEO meta stub (expanded Sprint 7)
    └── skip-link.html           # Skip-to-content (FR-008)
_sass/
├── abstracts/
│   ├── _variables.scss          # All tokens + both palettes (FR-002, FR-003)
│   ├── _mixins.scss             # Breakpoints, type, reduced-motion
│   └── _functions.scss          # SCSS helpers
├── base/
│   ├── _reset.scss              # Normalize (FR-005)
│   ├── _typography.scss         # Global type (FR-005)
│   └── _global.scss             # Body bg, scrollbar, ::selection, focus (FR-005, FR-008, FR-010)
└── layout/
    ├── _header.scss
    ├── _footer.scss
    ├── _grid.scss
    └── _section.scss
assets/
├── css/main.scss                # @import entry point
└── fonts/                       # Self-hosted fonts (optional this sprint)
```

**Structure Decision**: Single Jekyll project using the 7-1 SCSS pattern from the
constitution. `assets/css/main.scss` is the single compiled entry point that
imports `_sass/` partials in dependency order (abstracts → base → layout). Later
sprints add `components/` and `pages/` partials and their `@import` lines.

## Implementation Phases

### Phase 0: Research & Decisions

Resolve before writing styles:

- **Font choice & hosting** — Decision: Inter (body + portfolio headings),
  Newsreader/Lora (blog headings), JetBrains Mono (code). Self-host with
  `font-display: swap`; system-font stack as fallback so the build is not
  blocked on font files.
- **Palette switching mechanism** — Decision: define portfolio tokens at
  `:root`, override on `[data-page-type="blog"]`. Rationale: pure CSS, no JS,
  one component set; satisfies Principle IV. Alternative rejected: separate
  stylesheets per world (duplication, drift risk).
- **Contrast verification** — Decision: verify amber `#d4a017` and muted text
  against each background before locking tokens; adjust token value, not
  component, if any pair fails 4.5:1.
- **Reduced-motion strategy** — Decision: a global `@media (prefers-reduced-motion: reduce)`
  block in `_global.scss` zeroes transition/animation durations site-wide.

**Output**: `research.md` (optional for this sprint — decisions are captured
inline above).

### Phase 1: Design & Build

1. **Scaffold** — `_config.yml`, `Gemfile`, base directory tree, `404.html`.
2. **Tokens** — `abstracts/_variables.scss`: both palettes as custom properties,
   modular type scale, 4px spacing scale, breakpoint map; `_mixins.scss`
   (`respond-to`, type helpers, reduced-motion); `_functions.scss`.
3. **Base styles** — `_reset.scss`, `_typography.scss`, `_global.scss`
   (background, scrollbar, `::selection`, `:focus-visible`, reduced-motion).
4. **Layout primitives** — `_grid.scss` (12-col), `_section.scss`
   (max-width containers, responsive section padding), `_header.scss`,
   `_footer.scss`.
5. **Templates** — `base.html` (sets `data-page-type` from front matter,
   includes head/skip-link/header/content/footer); `head.html`; `header.html`
   (from `navigation.yml`); `footer.html` (from `social.yml`); `seo.html` stub;
   stub `portfolio.html`/`blog-index.html`/`post.html`/`page.html` extending base.
6. **Entry point** — `assets/css/main.scss` importing partials in order.

**Data contracts** (`data-model.md` candidates, inlined here as they are small):

- `navigation.yml`: list of `{ name, url }`, ordered.
- `social.yml`: list of `{ platform, url, icon }`.

7. **Agent context** — update the SPECKIT-marked block in `CLAUDE.md` to point at
   this plan.

**Output**: working skeleton meeting FR-001…FR-010.

### Phase 2 (handoff)

`/speckit-tasks` will break this plan into ordered tasks (scaffold → tokens →
base → layout → templates → verify). Implementation is `/speckit-implement` or
manual.

## Verification

- `bundle exec jekyll build` succeeds with no errors; `serve` renders pages.
- Toggle `data-page-type` on a test page → palette changes, no markup change
  (SC-002).
- axe DevTools: all global text ≥ 4.5:1 (SC-003).
- Lighthouse / build output: CSS ≤ 30 KB compressed, no blocking JS (SC-004).
- Keyboard pass: skip link first, then header and footer links with visible
  focus (SC-005).

## Complexity Tracking

No constitution violations. Table intentionally empty.
