# Implementation Plan: Blog Core

**Branch**: `003-blog-core` | **Date**: 2026-06-11 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/003-blog-core/spec.md`

## Summary

Deliver the reading experience: a blog index that lists posts as cards and an
individual post layout that renders Markdown with serif typography, terminal-
styled code blocks, and consistent metadata. Built on the Sprint 1 skeleton and
reusing Sprint 2 components (tags, cards). The blog world is activated via
`data-page-type="blog"`. A custom dark Rouge theme provides syntax highlighting.

## Technical Context

**Language/Version**: Jekyll ~> 4.3, Liquid, kramdown (GFM), Rouge, SCSS

**Primary Dependencies**: Sprint 1 tokens/layout; Sprint 2 tag/card components;
`jekyll-feed` (RSS, declared Sprint 1)

**Storage**: `_posts/*.md` (front matter + Markdown body); no database

**Testing**: `jekyll build` with sample posts; browser smoke test; axe contrast;
keyboard pass; read-time spot check

**Target Platform**: Static hosting, evergreen browsers

**Project Type**: Static site (single project)

**Performance Goals**: No JS required for reading; CSS additions stay within the
30 KB total budget; code highlighting via build-time Rouge (no client JS)

**Constraints**: Blog palette; serif headings; 720px prose column; design tokens
only; WCAG AA; reduced-motion safe

**Scale/Scope**: 2 layouts touched (`blog-index`, `post`), ~4 blog includes, 1
syntax theme, 1 page stylesheet, 1–2 sample posts

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Zero-Framework JS & Progressive Enhancement | ✅ Pass | Reading, navigation, and code blocks work fully with JS off (copy button deferred to Sprint 5). |
| II. Performance Budget Is a Gate | ✅ Pass | Highlighting is build-time (Rouge); images lazy-loaded; no client JS. |
| III. Accessibility by Default | ✅ Pass | Semantic `<article>`, heading order, readable contrast for code theme, focusable cards. |
| IV. Single-Source Dual-Palette Design System | ✅ Pass | Blog world via `data-page-type`; syntax theme uses palette tokens. |
| V. Content-First & Data-Driven | ✅ Pass | Posts are Markdown + front matter; graceful degradation for optional front matter. Per-post SEO/JSON-LD (BlogPosting) is delivered by Sprint 7's launch gate, not this sprint. |

**Result**: PASS. Note: the code theme MUST be contrast-verified (token values,
not component overrides) before locking.

## Project Structure

### Documentation (this feature)

```text
specs/003-blog-core/
├── plan.md
├── spec.md
└── data-model.md
```

### Source Code (repository root)

```text
blog.html                        # Blog index page (layout: blog-index)
_layouts/
├── blog-index.html              # Fleshed out from Sprint 1 stub
└── post.html                    # Individual post layout (FR-001..FR-005)
_includes/blog/
├── post-card.html               # Index card (FR-006)
├── post-meta.html               # Date, read time, tags (FR-008)
├── toc.html                     # TOC markup stub (behaviour: Sprint 5)
└── related-posts.html           # Stub (completed Sprint 5)
_posts/
├── 2026-06-11-variant-calling-pipeline.md   # Sample post
└── 2026-05-20-tidy-genomics-in-r.md         # Sample post
_sass/
├── components/_code-blocks.scss # Terminal-styled code container (FR-004)
├── pages/_blog.scss             # Blog index + post layout (FR-001, FR-009)
└── vendors/_syntax.scss         # Dark Rouge theme (FR-004)
assets/css/main.scss             # Add @imports for new partials
```

**Structure Decision**: `blog.html` uses `layout: blog-index`; posts use
`layout: post` (set as the default for `_posts` in `_config.yml`). Both set
`data-page-type="blog"`. `post-meta.html` is the single source of metadata
presentation (FR-008), included by both the card and the post header. The Rouge
theme lives in `vendors/_syntax.scss` so it is swappable.

## Implementation Phases

### Phase 0: Research & Decisions

- **Read-time computation** — Decision: Liquid filter on
  `content | number_of_words` divided by 200, rounded up. Alternative rejected:
  a plugin (violates minimal-plugin constraint).
- **Excerpt derivation** — Decision: use front-matter `excerpt` if present, else
  `post.content | strip_html | truncate: 160`. Satisfies FR-007.
- **Code block chrome** — Decision: wrap Rouge output via SCSS only — elevated
  background, top bar with three coloured dots, optional filename from a fenced
  code info string or a small include. No JS. Copy button is a Sprint 5 add-on
  that enhances this container.
- **Syntax theme** — Decision: hand-author a dark Rouge theme mapping token
  colours (amber/green/blue) to syntax classes; verify each foreground meets
  contrast on `--bg-elevated`.
- **Pagination** — Decision: render all posts newest-first now; wire
  `jekyll-paginate-v2` in Sprint 4 if post count warrants. Keeps this sprint
  focused on the reading experience.

### Phase 1: Design & Build

1. **Sample posts** — write 2 posts per [data-model.md](data-model.md) including
   varied Markdown (headings, list, blockquote, image, multi-language code).
2. **Syntax theme** — `vendors/_syntax.scss` dark Rouge theme; contrast-verify.
3. **Code component** — `components/_code-blocks.scss` terminal container.
4. **Meta component** — `blog/post-meta.html` (date format, read time, tags).
5. **Index** — `blog/post-card.html`; flesh out `_layouts/blog-index.html`;
   create `blog.html`.
6. **Post layout** — `_layouts/post.html` (title, meta, body, tags, back links;
   TOC + related-posts as stubs).
7. **Blog styles** — `pages/_blog.scss` (serif headings, 720px column, card list,
   responsive); add `@import`s to `main.scss`.
8. **Agent context** — update the SPECKIT block in `CLAUDE.md` to this plan.

### Phase 2 (handoff)

`/speckit-tasks` generates ordered tasks: sample posts → syntax theme → code
component → meta → index → post layout → blog styles → verify.

## Verification

- Add a Markdown file to `_posts/` → it appears on the index and at its permalink
  with no template change (SC-001).
- Visual diff portfolio vs blog → serif, narrower column, warmer palette (SC-002).
- Disable JS → posts read, code blocks selectable and highlighted (SC-003, FR-010).
- axe: blog + code text ≥ 4.5:1; keyboard reaches every card and post link (SC-004).
- Read-time spot check within ±1 min of 200-wpm estimate (SC-005).

## Complexity Tracking

No constitution violations. Table intentionally empty.
