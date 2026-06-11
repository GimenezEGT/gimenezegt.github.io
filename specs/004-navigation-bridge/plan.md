# Implementation Plan: Navigation & Bridge

**Branch**: `004-navigation-bridge` | **Date**: 2026-06-11 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/004-navigation-bridge/spec.md`

## Summary

Connect the site: a responsive navigation component (desktop links + accessible
mobile overlay), the portfolio↔blog bridge (homepage blog teaser, project↔post
cross-links, back-to-portfolio), and the visible world-switch via
`data-page-type` with a gentle background transition. JavaScript is minimal and
strictly enhancement: the mobile menu and nav-on-scroll layer on a no-JS
fallback. This is the first sprint that introduces shared JS, so the JS budget
(< 10 KB) starts being tracked here.

## Technical Context

**Language/Version**: Jekyll ~> 4.3, Liquid, SCSS, vanilla JS (ES2017+)

**Primary Dependencies**: Sprint 1 nav data + tokens; Sprint 2 card/button
components; Sprint 3 post-card; optional `jekyll-paginate-v2` if pagination is
turned on here

**Storage**: `_data/navigation.yml` (reused); posts from `_posts/`

**Testing**: `jekyll build`; manual desktop + 360px mobile; JS-disabled pass;
keyboard/focus-trap audit; axe contrast

**Target Platform**: Static hosting, evergreen browsers

**Project Type**: Static site (single project)

**Performance Goals**: Shared JS for menu + scroll behaviour ≤ ~2 KB of the
10 KB JS budget; no layout shift from the sticky/solidifying nav (reserve space)

**Constraints**: No-JS fallback mandatory; reduced-motion disables the transition
and smooth scroll; design tokens only; WCAG AA; focus management on the overlay

**Scale/Scope**: 1 nav component (responsive), 1 teaser section, cross-link
snippets in card/post templates, ~1 small JS module, CSS transition wiring

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Zero-Framework JS & Progressive Enhancement | ✅ Pass | Mobile menu and nav-on-scroll enhance a no-JS fallback (FR-003); links always work. |
| II. Performance Budget Is a Gate | ✅ Pass | First JS introduced is small and deferred; nav reserves space to avoid CLS. |
| III. Accessibility by Default | ✅ Pass | Overlay focus trap, Escape, ARIA `expanded`; active-world cue not colour-only. |
| IV. Single-Source Dual-Palette Design System | ✅ Pass | World switch via `data-page-type`; transition on tokens, not duplicated styles. |
| V. Content-First & Data-Driven | ✅ Pass | Nav from `navigation.yml`; teaser from `_posts`; cross-links from project `post` field. |

**Result**: PASS. Watch item: the mobile overlay must keep contrast and focus
order correct; the nav-on-scroll must not cause layout shift.

## Project Structure

### Documentation (this feature)

```text
specs/004-navigation-bridge/
├── plan.md
└── spec.md
```

### Source Code (repository root)

```text
_includes/
├── header.html                  # Upgraded: responsive nav + menu toggle (FR-001, FR-002)
└── portfolio/
    └── blog-teaser.html         # Latest posts on homepage (FR-006)
_includes/blog/post-card.html    # Reused by teaser (blog styling)
_includes/portfolio/projects.html# Add "read the write-up →" link (FR-007)
_layouts/post.html               # Add "back to portfolio" link (FR-007)
_layouts/base.html               # Wire data-page-type transition hook (FR-005)
_sass/
├── layout/_header.scss          # Desktop nav + overlay + scroll states (FR-002, FR-009)
├── base/_global.scss            # Background-color transition on <body> (FR-005), smooth scroll (FR-008)
└── pages/_portfolio.scss        # Blog-teaser section styling (FR-006)
assets/js/
└── main.js                      # Menu toggle + focus trap + nav-on-scroll (FR-002, FR-009)
```

**Structure Decision**: Navigation stays a single `header.html` include that
adapts by CSS; the mobile overlay uses a `<details>`/checkbox-style no-JS
fallback that `main.js` upgrades into a focus-trapped overlay with Escape. The
world transition is a CSS `transition` on `<body>` background, gated by
reduced-motion. The blog teaser reuses `post-card.html` so there is no new card.

## Implementation Phases

### Phase 0: Research & Decisions

- **No-JS mobile menu** — Decision: use a hidden checkbox or `<details>` toggle so
  links are reachable without JS; `main.js` progressively replaces it with a
  button + `aria-expanded`, focus trap, and Escape-to-close. Alternative
  rejected: JS-only menu (fails FR-003/Principle I).
- **Nav-on-scroll** — Decision: toggle a `.is-scrolled` class via a throttled
  scroll listener (or `IntersectionObserver` on a hero sentinel) to solidify the
  nav; default state is solid so no-JS users get a usable nav. Reserve nav height
  to avoid CLS.
- **World transition** — Decision: `transition: background-color 200ms` on
  `<body>`, disabled under `prefers-reduced-motion`. Keep it subtle.
- **Smooth scroll** — Decision: CSS `scroll-behavior: smooth` gated by
  reduced-motion (no JS), consistent with Sprint 2.
- **Teaser source** — Decision: `site.posts | limit: 3` (or `featured` first),
  rendered with the blog card; omit section when empty (FR-006 edge case).

### Phase 1: Design & Build

1. **Responsive nav** — upgrade `header.html`; `_header.scss` for desktop links,
   overlay, and scroll states; active-world highlight from `page.layout`/page type.
2. **JS module** — `assets/js/main.js`: menu toggle, focus trap, Escape, and the
   scroll class; loaded with `defer`. Track size against budget.
3. **Transition + smooth scroll** — wire `_global.scss` and `base.html`.
4. **Blog teaser** — `portfolio/blog-teaser.html`; style in `_portfolio.scss`;
   include on `index.html`.
5. **Cross-links** — add "read the write-up →" to project cards (when `post`
   present) and "back to portfolio" to `post.html`.
6. **(Optional) pagination** — enable `jekyll-paginate-v2` on the blog index if
   post count warrants.
7. **Agent context** — update the SPECKIT block in `CLAUDE.md` to this plan.

### Phase 2 (handoff)

`/speckit-tasks` generates ordered tasks: nav markup → nav styles → JS module →
transition/scroll → teaser → cross-links → a11y/no-JS verify.

## Verification

- Desktop + 360px: all destinations reachable; mobile menu opens/closes (SC-001).
- Disable JS: every nav link still works; menu fallback shows links (SC-002, FR-003).
- Portfolio → blog: palette/type shift + background transition; reduced-motion
  removes animation (SC-003).
- Add a post: teaser updates with no edits (SC-004).
- Keyboard audit on overlay: open, focus trapped, Escape closes, focus returns,
  `aria-expanded` correct (SC-005).
- Lighthouse: no CLS from nav; JS within budget.

## Complexity Tracking

No constitution violations. Table intentionally empty.
