<!--
SYNC IMPACT REPORT
==================
Version change: (none) → 1.0.0
Bump rationale: Initial ratification of the project constitution (MAJOR baseline).

Modified principles: N/A (initial creation)
Added principles:
  I.   Zero-Framework JavaScript & Progressive Enhancement
  II.  Performance Budget Is a Gate
  III. Accessibility by Default (NON-NEGOTIABLE)
  IV.  Single-Source Dual-Palette Design System
  V.   Content-First & Data-Driven
Added sections:
  - Technology Constraints
  - Development Workflow & Quality Gates

Templates requiring updates:
  ✅ .specify/templates/plan-template.md   — Constitution Check gate references these principles (no edit needed; generic)
  ✅ .specify/templates/spec-template.md   — Tech-agnostic spec sections remain compatible
  ✅ .specify/templates/tasks-template.md   — Task categories compatible (perf/a11y/design-token tasks fit existing structure)

Follow-up TODOs: none
-->

# Jekyll Portfolio + Blog Theme Constitution

## Core Principles

### I. Zero-Framework JavaScript & Progressive Enhancement

The site MUST render and function with JavaScript disabled. JavaScript is an
enhancement layer only — it adds polish (animations, copy buttons, client-side
filtering, table-of-contents tracking), never core content or navigation.

- No front-end frameworks or runtime libraries (no React, Vue, Alpine, jQuery,
  htmx). Vanilla JS only.
- Every interactive feature MUST have a working no-JS fallback: links navigate,
  forms submit, content is readable, anchors scroll.
- JS MUST be loaded with `defer` and MUST NOT block first paint.

**Rationale**: Maximum resilience, minimum payload, and full content access for
crawlers, readers, and constrained devices. A personal portfolio that breaks
without JS undermines the credibility it exists to build.

### II. Performance Budget Is a Gate

Performance budgets are hard limits, not aspirations. A change that breaks a
budget MUST be reworked or explicitly justified in Complexity Tracking before
it is accepted.

- Lighthouse Performance ≥ 95 (mobile profile).
- Total CSS ≤ 30 KB compressed; total JS ≤ 10 KB compressed (minified + gzip).
- First Contentful Paint < 1.2 s; Cumulative Layout Shift < 0.1.
- Images below the fold MUST be lazy-loaded; modern formats (WebP) with
  fallback. Fonts MUST be self-hosted with `font-display: swap`.

**Rationale**: Speed is a feature and a ranking signal. Budgets expressed as
gates keep the theme fast as it grows instead of degrading silently.

### III. Accessibility by Default (NON-NEGOTIABLE)

Accessibility is a baseline requirement of every component, not a later audit.

- Text contrast ratio MUST be ≥ 4.5:1 (≥ 3:1 for large text). Amber-on-dark
  combinations MUST be verified, not assumed.
- Semantic HTML5 landmarks (`<main>`, `<nav>`, `<article>`, `<section>`,
  `<aside>`) MUST be used; ARIA only to fill genuine gaps (e.g. hamburger,
  icon-only buttons).
- Keyboard operability MUST be complete, with visible `:focus-visible` styles
  and a skip-to-content link.
- All motion MUST be gated behind `prefers-reduced-motion`; reduced-motion
  users get a static, fully functional experience.

**Rationale**: An inaccessible site excludes real users and fails its purpose.
Building accessibly from the first component is cheaper and more reliable than
retrofitting.

### IV. Single-Source Dual-Palette Design System

All design decisions flow from one token system. The "Portfolio" and "Blog"
worlds are two palettes of the same family, switched by context — never by
duplicating components.

- Colour, type scale, spacing, and breakpoints MUST be defined once as design
  tokens (CSS custom properties / SCSS variables). No hard-coded hex values,
  pixel font sizes, or magic-number spacing in component styles.
- World switching MUST be achieved with the `data-page-type` attribute
  overriding custom properties at `:root` scope — the same component classes
  produce both worlds.
- Spacing MUST be multiples of the 4px base unit. Type MUST use the defined
  modular scale.

**Rationale**: One source of truth keeps the two worlds unified-yet-distinct,
prevents visual drift, and makes a future light-mode or rebrand a token swap
rather than a rewrite.

### V. Content-First & Data-Driven

Content lives in data and Markdown, not in markup. Structure is separate from
substance.

- Portfolio content (projects, skills, social, navigation) MUST come from
  `_data/*.yml`. Blog content MUST come from `_posts/*` Markdown with
  front matter. Templates MUST NOT hard-code these.
- Every page and post MUST emit correct SEO metadata: canonical URL, Open Graph
  + Twitter Card tags, and JSON-LD structured data (Person, BlogPosting).
- Posts MUST degrade gracefully when optional front matter (cover image,
  excerpt, TOC flag) is absent.

**Rationale**: Separating content from presentation lets the author add a
project or post without touching templates, and gives search engines and social
platforms the structured data they need.

## Technology Constraints

- **Static site generator**: Jekyll ~> 4.3 (Ruby). No headless CMS, no SPA.
- **Markdown**: kramdown with GFM input; syntax highlighting via Rouge with a
  custom dark theme matching the palette.
- **Styles**: SCSS organised in the 7-1 pattern under `_sass/`
  (`abstracts/`, `base/`, `components/`, `layout/`, `pages/`, `vendors/`),
  compiled by Jekyll Sass with `style: compressed`.
- **Plugins**: limited to `jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap`,
  `jekyll-paginate-v2`. Adding a plugin requires justification against the
  performance and zero-framework principles.
- **Hosting**: static host (GitHub Pages / Netlify / Cloudflare Pages) with
  HTTPS. No server-side runtime.
- **Browser support**: current Chrome, Firefox, Safari, Edge. Graceful
  degradation below; no IE.

## Development Workflow & Quality Gates

- **Spec-driven**: each sprint is specified (`spec.md`) and planned (`plan.md`)
  before implementation. Plans MUST include a Constitution Check that passes, or
  a justified Complexity Tracking entry.
- **Definition of Done** for any UI work:
  1. Renders correctly with JS disabled.
  2. Meets contrast and keyboard-operability requirements.
  3. Honours `prefers-reduced-motion`.
  4. Uses design tokens only (no hard-coded values).
  5. Stays within the CSS/JS budgets (verify on a representative build).
- **Launch gates** (Sprint 7): Lighthouse ≥ 95, accessibility audit
  (axe-core + keyboard pass), SEO verification (meta, sitemap, structured data),
  and cross-browser smoke test MUST all pass before deploy.
- **Responsive**: every component MUST be verified at the defined breakpoints
  (sm 576, md 768, lg 1024, xl 1280, xxl 1536).

## Governance

This constitution supersedes ad-hoc preferences for this project. When a plan or
change conflicts with a principle, either the change is reworked to comply or the
deviation is recorded in the plan's Complexity Tracking with a concrete
justification and the simpler rejected alternative.

- Amendments are made by editing this file, bumping the version per semantic
  versioning (MAJOR = principle removal/redefinition; MINOR = new principle or
  materially expanded guidance; PATCH = clarification/wording), and updating the
  Last Amended date.
- Every spec and plan review MUST verify compliance with Principles I–V and the
  Definition of Done. Complexity must be justified, never assumed.

**Version**: 1.0.0 | **Ratified**: 2026-06-11 | **Last Amended**: 2026-06-11
