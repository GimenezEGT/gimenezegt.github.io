<!-- SPECKIT START -->
This project is planned with Spec Kit. Governing principles live in
`.specify/memory/constitution.md` (v1.0.0) and MUST be honoured by every change.

The work is split into 7 sprint features, each with a spec + implementation plan
under `specs/`. Read the relevant plan before implementing a sprint:

- `specs/001-foundation-skeleton/`   — Jekyll scaffold, design tokens, base layout, global styles
- `specs/002-portfolio-core/`        — homepage: hero, about, projects, skills, contact (+ data-model)
- `specs/003-blog-core/`             — blog index, post layout, terminal code blocks, syntax theme (+ data-model)
- `specs/004-navigation-bridge/`     — responsive nav, blog teaser, cross-links, palette switch
- `specs/005-interactivity-polish/`  — copy-to-clipboard, TOC, tag filter, hero typing, scroll-to-top
- `specs/006-motifs-identity/`       — DNA helix, terminal headers, hex skills grid, organic dividers
- `specs/007-optimization-launch/`   — SEO/JSON-LD, perf + a11y gates, README, deploy (+ quickstart)

Source of truth for scope: `DEVELOPMENT_PLAN.md`. Next step per sprint:
`/speckit-tasks` to generate `tasks.md`, then `/speckit-implement`.

Active plan: `specs/005-interactivity-polish/plan.md` (Sprint 5 — Interactivity &
Polish; complete). Delivered: copy-to-clipboard, server-rendered TOC with
IntersectionObserver active-tracking, client-side blog tag filter, hero typing,
CSS cursor blink, scroll-to-top, and pointer-gated card hover — all `defer`/CSS
progressive enhancements over a no-JS baseline. Per-page JS now split across
`main.js` (shared: menu, nav-on-scroll, reduced-motion helper, scroll-top),
`portfolio.js` (hero typing), and `blog.js` (copy, TOC, tag filter); loaded
page-conditionally from `head.html`. Per-page JS ≤ 3.4 KB gz (budget 10 KB).
Next: Sprint 6 (`006-motifs-identity`) — DNA helix, terminal headers, hex skills
grid, organic dividers, building on this CSS/JS base.
<!-- SPECKIT END -->
