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

Active plan: `specs/003-blog-core/plan.md` (Sprint 3 — Blog Core). Next:
Sprint 4 (`004-navigation-bridge`) — its homepage blog teaser consumes
`featured: true` posts authored here.
<!-- SPECKIT END -->
