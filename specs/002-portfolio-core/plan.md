# Implementation Plan: Portfolio Core

**Branch**: `002-portfolio-core` | **Date**: 2026-06-11 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/002-portfolio-core/spec.md`

## Summary

Build the portfolio homepage as a sequence of data-driven sections (hero →
about → projects → skills → contact) on top of the Sprint 1 skeleton. Content
comes from `_data/projects.yml`, `_data/skills.yml`, `_data/profile.yml`, and
`_data/social.yml`; presentation comes from a new `pages/_portfolio.scss` and
reusable card/tag/button components. Interactivity is limited to graceful
smooth-scroll anchors — no blocking JS.

## Technical Context

**Language/Version**: Jekyll ~> 4.3, Liquid templates, SCSS, HTML5

**Primary Dependencies**: Sprint 1 token system, layout primitives, and
`base.html`; no new gems

**Storage**: `_data/projects.yml`, `_data/skills.yml`, `_data/profile.yml`
(flat YAML)

**Testing**: `jekyll build` + browser smoke test; responsive check at
breakpoints; axe for contrast; keyboard pass

**Target Platform**: Static hosting, evergreen browsers

**Project Type**: Static site (single project)

**Performance Goals**: No regression to Sprint 1 budgets; portfolio CSS stays
within the 30 KB total; 0 KB blocking JS

**Constraints**: Design tokens only; portfolio palette; WCAG AA; responsive
3/2/1 grid

**Scale/Scope**: 5 homepage sections, ~3 reusable components (card, tag, button),
3 data files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Zero-Framework JS & Progressive Enhancement | ✅ Pass | Sections are static HTML/CSS; smooth-scroll degrades to normal anchor jump. |
| II. Performance Budget Is a Gate | ✅ Pass | Reuses tokens/components; images lazy-loaded; no JS added. |
| III. Accessibility by Default | ✅ Pass | Semantic `<section>`s, headings hierarchy, keyboard CTAs, alt text, contrast-checked. |
| IV. Single-Source Dual-Palette Design System | ✅ Pass | Uses existing tokens; new styles add no hard-coded values. |
| V. Content-First & Data-Driven | ✅ Pass | All section content from `_data` (see data-model.md). |

**Result**: PASS — no violations.

## Project Structure

### Documentation (this feature)

```text
specs/002-portfolio-core/
├── plan.md
├── spec.md
└── data-model.md
```

### Source Code (repository root)

```text
index.html                       # Portfolio homepage (layout: portfolio)
_layouts/portfolio.html          # Fleshed out from Sprint 1 stub
_data/
├── projects.yml                 # Project entries (FR-003)
├── skills.yml                   # Grouped skills (FR-007)
└── profile.yml                  # About facts/bio (FR-006)
_includes/portfolio/
├── hero.html                    # Name, tagline, CTAs (FR-002)
├── about.html                   # Bio + key-facts panel (FR-006)
├── projects.html               # Projects grid (FR-003..FR-005)
├── skills.html                 # Grouped skills (FR-007)
└── contact.html                # Email + social (FR-008)
_includes/shared/
└── (reuses Sprint 1 includes)
_sass/components/
├── _buttons.scss                # Primary / secondary / ghost / CTA
├── _cards.scss                  # Project card
└── _tags.scss                   # Tech tag pills
_sass/pages/
└── _portfolio.scss              # Section-specific layout (FR-001, FR-009)
assets/css/main.scss             # Add @imports for new partials
```

**Structure Decision**: `index.html` uses `layout: portfolio`, which composes the
five section includes. Each section include reads its own data file so sections
are independently testable. Card/tag/button components live in
`_sass/components/` so Sprint 3 (blog) can reuse them.

## Implementation Phases

### Phase 0: Research & Decisions

- **Grid technique** — Decision: CSS Grid with `repeat(auto-fill, minmax(...))`
  for the projects grid → natural 3/2/1 reflow without media-query gymnastics.
  Alternative rejected: fixed column counts per breakpoint (more code, less
  fluid).
- **Featured emphasis** — Decision: featured projects sorted first via Liquid
  (`where`/sort) and given an accent border/glow class. Alternative rejected:
  separate "featured" section (fragments the grid).
- **About "terminal window" panel** — Decision: a static styled panel listing
  `profile.facts` as `> label: value` lines using the terminal component styles
  (full terminal chrome lands in Sprint 6). Keeps it static and accessible now.
- **Smooth scroll** — Decision: `scroll-behavior: smooth` in CSS gated by
  `prefers-reduced-motion`; no JS. CTA is a normal `#projects` anchor.

### Phase 1: Design & Build

1. **Data** — author `projects.yml`, `skills.yml`, `profile.yml` with realistic
   sample entries per [data-model.md](data-model.md).
2. **Components** — `_buttons.scss`, `_cards.scss`, `_tags.scss` using tokens;
   add `@import`s to `main.scss`.
3. **Section includes** — `hero.html`, `about.html`, `projects.html`,
   `skills.html`, `contact.html`, each consuming data with conditional fields
   (FR-004 omits absent repo/demo).
4. **Layout** — flesh out `_layouts/portfolio.html` to order the sections;
   create `index.html` with `layout: portfolio`.
5. **Page styles** — `pages/_portfolio.scss`: section rhythm, grid, hero layout,
   responsive behaviour (FR-009).
6. **Agent context** — update the SPECKIT block in `CLAUDE.md` to this plan.

### Phase 2 (handoff)

`/speckit-tasks` generates ordered tasks: data files → components → includes →
layout → page styles → responsive/a11y verify.

## Verification

- Add/remove a project entry → card appears/disappears with no template edit
  (SC-002).
- Resize through breakpoints → grid is 3/2/1 with no overflow (SC-003).
- Project with missing demo → no broken demo link (FR-004 edge case).
- axe: homepage text ≥ 4.5:1; keyboard pass reaches both CTAs, every card link,
  and contact links with visible focus (SC-004).
- Build output: no blocking JS; total CSS within budget (SC-005).

## Complexity Tracking

No constitution violations. Table intentionally empty.
