# Quickstart: Portfolio Homepage Verification

Phase 1 output for `002-portfolio-core`. The path to build the data-driven
homepage and verify it against the spec's success criteria. Run against a real
`jekyll build`, not assumptions.

## 1. Seed data

Create/author the three data files per [data-model.md](data-model.md):

```text
_data/projects.yml   # ≥ 3 entries, at least one featured, one without a demo, one without an image
_data/skills.yml     # ≥ 2 categories with items
_data/profile.yml    # facts list (+ optional bio)
```

`social.yml` and `navigation.yml` already exist from Sprint 1 and are reused by
the contact section and header.

## 2. Build

```powershell
bundle exec jekyll build
# or, for live preview while iterating:
bundle exec jekyll serve
```

The build MUST succeed and produce `/index.html` using `layout: portfolio` with
sections in order: hero → about → projects → skills → contact (FR-001).

## 3. Content & data-driven checks (Principle V)

- [ ] **SC-002** — Add a project entry to `projects.yml`, rebuild → a new card
      appears with **zero** template edits. Remove it → card disappears.
- [ ] **FR-004** — A project with no `demo` shows no demo action (not a broken
      link); a project with no `image` renders a text-only/placeholder card with
      no layout break.
- [ ] **FR-005** — A project flagged `featured: true` is ordered first and
      visually distinguished.
- [ ] Empty `projects.yml` → tasteful empty state, page still renders.

## 4. Responsive check (FR-009, SC-003)

- [ ] Resize through sm 576 / md 768 / lg 1024 / xl 1280 / xxl 1536.
- [ ] Projects grid reflows 3 (desktop) / 2 (tablet) / 1 (mobile) columns.
- [ ] No horizontal overflow at any width; hero tagline scales and stays
      readable; tags wrap inside cards instead of overflowing.

## 5. Accessibility gate (Principle III, SC-004)

- [ ] axe (browser extension/CLI) on `/` → no critical violations.
- [ ] All homepage text contrast ≥ 4.5:1 (verify amber-on-dark, not assume).
- [ ] Keyboard pass: both hero CTAs, every project card link (repo/demo), and
      every contact link are reachable and operable with a visible focus ring.
- [ ] "Explore Projects" scrolls to the projects section; with
      `prefers-reduced-motion` set (or JS off) it still jumps to the anchor.

## 6. Performance / budget (Principle II, SC-005)

- [ ] Build output adds **no blocking JS** (smooth-scroll/hover are CSS only).
- [ ] Total compressed CSS stays within the 30 KB budget after the new
      component + page partials.
- [ ] Below-the-fold project images are lazy-loaded.

## 7. Design-system check (Principle IV)

- [ ] New styles (`_buttons.scss`, `_cards.scss`, `_tags.scss`,
      `pages/_portfolio.scss`) use **tokens only** — no hard-coded hex, px font
      sizes, or magic-number spacing.
- [ ] Card/tag/button components are generic enough for Sprint 3 (blog) reuse.

When every box is checked, Portfolio Core satisfies its spec and is ready for
`/speckit-tasks` → `/speckit-implement` execution (or, if already implemented,
ready for the Sprint 4 navigation bridge to build on top).
