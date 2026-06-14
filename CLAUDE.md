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

Active plan: `specs/006-motifs-identity/plan.md` (Sprint 6 — Motifs & Identity;
complete). Delivered the bioinformatics/creative identity layer: an aria-hidden DNA
helix behind the hero (external SVG via CSS `mask`, token-tinted, transform-animated,
motion-safe), a reusable `shared/section-header.html` partial driving the `>_`
terminal headers (`_terminal.scss` + reused Sprint-5 caret), a hexagonal skills grid
(`clip-path` on md+, simple grid below), organic blog dividers (`_includes/blog/divider.html`,
SVG mask in the blog palette), and an optional capped node-graph particle effect on
project-card hover (`portfolio.js`, pointer + motion only). Every motif is
decorative/`aria-hidden` and reduced-motion safe. Budgets: CSS 4.9 KB gz, per-page
JS ≤ 3.34 KB gz (≤ 30 / 10 KB). Next: Sprint 7 (`007-optimization-launch`) — SEO/JSON-LD,
perf + a11y launch gates, README, deploy.
<!-- SPECKIT END -->
