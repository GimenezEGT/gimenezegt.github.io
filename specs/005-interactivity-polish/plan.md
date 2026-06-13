# Implementation Plan: Interactivity & Polish

**Branch**: `005-interactivity-polish` | **Date**: 2026-06-11 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/005-interactivity-polish/spec.md`

## Summary

Add the interactive enhancement layer on top of the now-complete static site:
copy-to-clipboard on code blocks, an Intersection-Observer table of contents,
client-side blog tag filtering, the hero typing animation, CSS cursor blink,
scroll-to-top, and project-card hover. Everything is vanilla JS in the existing
`assets/js/` modules, loaded `defer`, with strict graceful degradation and a hard
10 KB total-JS budget. CSS-only effects (cursor blink, hover, smooth scroll) are
preferred over JS wherever possible.

## Technical Context

**Language/Version**: Vanilla JS (ES2017+), SCSS, Liquid; Jekyll ~> 4.3

**Primary Dependencies**: Browser APIs only — Clipboard API, IntersectionObserver,
`matchMedia('(prefers-reduced-motion)')`; no third-party libraries

**Storage**: None (operates on rendered DOM)

**Testing**: `jekyll build`; manual with JS on/off; reduced-motion emulation;
keyboard pass; measure bundled+gzipped JS size against budget

**Target Platform**: Static hosting, evergreen browsers

**Project Type**: Static site (single project)

**Performance Goals**: Total site JS ≤ 10 KB compressed; no main-thread jank;
no CLS from late-appearing controls (reserve space / use transforms)

**Constraints**: Progressive enhancement mandatory (FR-008); every animation gated
by `prefers-reduced-motion`; design tokens only; WCAG AA; accessible names/states

**Scale/Scope**: ~6 small JS behaviours across 3 modules, a few animation
stylesheets; no new content or data

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Zero-Framework JS & Progressive Enhancement | ✅ Pass | Whole sprint is enhancement; JS-off site stays fully functional (FR-008, SC-001). |
| II. Performance Budget Is a Gate | ⚠ Watch | Six behaviours risk JS bloat; CSS-first and budget measurement are gating (FR-009, SC-005). |
| III. Accessibility by Default | ✅ Pass | Reduced-motion gating (FR-004/007), keyboard scroll-top, focus-equivalent hover, accessible labels. |
| IV. Single-Source Dual-Palette Design System | ✅ Pass | Animations/effects use tokens; no hard-coded colours. |
| V. Content-First & Data-Driven | ✅ Pass | No content moved into JS; operates on rendered content only. |

**Result**: PASS with a watch on Principle II. Mitigation: prefer CSS, share one
reduced-motion guard, lazy-init observers, and measure the gzipped bundle before
sign-off; if over budget, drop the lowest-priority effect (P3) first.

## Project Structure

### Documentation (this feature)

```text
specs/005-interactivity-polish/
├── plan.md
└── spec.md
```

### Source Code (repository root)

```text
assets/js/
├── main.js                      # Shared: reduced-motion guard, scroll-to-top (FR-005)
├── portfolio.js                 # Hero typing animation (FR-004), card hover assist if needed (FR-006)
└── blog.js                      # Copy-to-clipboard (FR-001), TOC observer (FR-002), tag filter (FR-003)
_includes/
├── blog/toc.html                # Real TOC markup (from headings) replacing Sprint 3 stub (FR-002)
├── shared/scroll-top.html       # Back-to-top control markup (FR-005)
└── portfolio/hero.html          # Add tagline target + full-text fallback (FR-004)
_sass/components/
├── _cursor-blink.scss           # Blinking cursor animation, reduced-motion safe (FR-007)
├── _code-blocks.scss            # Copy-button affordance styles (FR-001)
└── _cards.scss                  # Hover/focus effect (FR-006)
_sass/base/_global.scss          # prefers-reduced-motion overrides (FR-004/006/007)
blog.html                        # Add tag-filter controls markup (FR-003)
```

**Structure Decision**: Keep the three-module JS split (shared / portfolio /
blog) so each page only ships what it needs. A single exported `prefersReducedMotion`
check is shared. The TOC and tag filter read the already-rendered DOM (headings,
`data-tags` on cards) — no new data files. Cursor blink and card hover are CSS;
JS only adds copy, TOC tracking, tag filter, typing, and scroll-top.

## Implementation Phases

### Phase 0: Research & Decisions

- **Copy-to-clipboard** — Decision: `navigator.clipboard.writeText`; on absence,
  fall back to a hidden `<textarea>` + `execCommand` or hide the button. Inject
  buttons at runtime so JS-off blocks have none (FR-001 edge case).
- **TOC tracking** — Decision: the anchor list is **server-rendered** by the
  `blog/toc.html` include (Liquid scans the post `content` for kramdown's
  auto-`id`d `h2`/`h3` and emits `<a href="#id">` items), so it is a working list
  with JS off (FR-002). JS **only layers** active-item tracking
  (`IntersectionObserver`) onto that existing list — it never builds it. Wrapped in
  a `<details>` for a no-JS collapse on small screens. Skip when < 2 headings.
- **Tag filter** — Decision: cards carry `data-tags`; clicking a tag toggles a
  visibility class via JS over the rendered list (no reload). Without JS, tags are
  plain links and all posts show (FR-003). Empty result → empty-state message.
- **Hero typing** — Decision: store the full tagline in the markup (so it is the
  no-JS/reduced-motion fallback); JS reveals it character-by-character only when
  motion is allowed (FR-004).
- **Cursor blink & hover** — Decision: pure CSS `@keyframes`, both inside
  reduced-motion guards (FR-007/006). The "terminal" headers of FR-007 are the
  **existing `.eyebrow` `>_` section markers** (hero/projects/etc.); no new markup
  is introduced. Card hover is additionally gated to pointer devices
  (`@media (hover: hover)`/`(pointer: fine)`) with a `:focus-visible` equivalent
  for keyboard users (FR-006).
- **Scroll-to-top** — Decision: show after a scroll threshold (transform-based to
  avoid CLS); `scrollTo` respecting reduced-motion (FR-005).
- **Budget control** — Decision: measure gzipped JS after each behaviour; CSS-first
  ordering keeps the bundle small (SC-005).

### Phase 1: Design & Build

1. **Shared guard + scroll-top** — `main.js`: reduced-motion helper, scroll-top;
   `shared/scroll-top.html`; styles.
2. **Code copy** — `blog.js` copy module; `_code-blocks.scss` button affordance.
3. **TOC** — real `blog/toc.html`; observer in `blog.js`; sticky/collapsible styles
   in `_blog.scss`.
4. **Tag filter** — controls on `blog.html`; filter logic in `blog.js`;
   `data-tags` on cards; empty state.
5. **Hero typing** — `portfolio.js` typing; ensure full-text fallback in
   `hero.html`.
6. **CSS polish** — `_cursor-blink.scss`, card hover/focus in `_cards.scss`, and a
   consolidated `prefers-reduced-motion` block in `_global.scss`.
7. **Budget check** — measure gzipped total JS; trim if needed (drop P3 first).
8. **Agent context** — update the SPECKIT block in `CLAUDE.md` to this plan.

### Phase 2 (handoff)

`/speckit-tasks` generates ordered tasks: shared guard → copy → TOC → tag filter →
hero typing → CSS polish → budget + a11y + JS-off verify.

## Verification

- JS-off pass: every page readable, no dead controls, copy buttons absent, TOC is
  a link list, all posts visible (SC-001, FR-008).
- Copy a block → clipboard holds exact code + confirmation (SC-002).
- Scroll a `toc: true` post → active item tracks the section (SC-003).
- Select a tag → list filters < 100 ms, no reload; clear restores (SC-004).
- Reduced-motion: no typing/blink/hover animation; full info present (SC-006).
- Measure gzipped JS ≤ 10 KB (SC-005); Lighthouse shows no new CLS.

## Complexity Tracking

No constitution violations. The Principle II watch is mitigated by CSS-first
design and explicit budget measurement; no justification entry required unless a
behaviour cannot fit the budget, in which case it is dropped rather than justified.
