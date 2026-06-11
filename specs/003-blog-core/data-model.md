# Data Model: Blog Core

Phase 1 output for `003-blog-core`. Defines the post front-matter schema and the
derived metadata the blog templates consume. Posts are Markdown files in
`_posts/` named `YYYY-MM-DD-slug.md` (Jekyll convention).

## Entity: Post front matter

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `layout` | string | yes | `post` (set by default in `_config.yml`). |
| `title` | string | yes | Post title (serif heading). |
| `date` | date | yes | Publication date (also from filename). |
| `categories` | list of string | no | Used in permalink and grouping (e.g. `[bioinformatics, tutorials]`). |
| `tags` | list of string | no | Topic pills (e.g. `[python, snakemake, ngs]`). |
| `excerpt` | string | no | Custom summary; if absent, derived from body. |
| `image` | string (path) | no | Cover image; omitted gracefully if absent. |
| `toc` | boolean | no (default false) | Requests a table of contents (sticky behaviour: Sprint 5). |
| `featured` | boolean | no (default false) | Eligible for homepage blog teaser (Sprint 4). |
| `author` | string | no | Defaults to site author via `_config.yml` defaults. |

**Validation / rules**:
- `title` and `date` are mandatory; `date` MUST be parseable.
- Permalink format follows `_config.yml` (`/blog/:categories/:title/`).
- Drafts live in `_drafts/` and are excluded from production builds.

**Example**:

```yaml
---
layout: post
title: "Building a Variant Calling Pipeline from Scratch"
date: 2026-06-11
categories: [bioinformatics, tutorials]
tags: [python, snakemake, ngs, genomics]
excerpt: "A step-by-step guide to a reproducible NGS pipeline."
image: /assets/images/blog/variant-pipeline-cover.png
toc: true
featured: false
---
```

## Derived: Post metadata (computed by templates)

| Value | Source | Rule |
|-------|--------|------|
| `display_date` | `date` | Formatted human-readable (e.g. "June 11, 2026"). |
| `read_time` | body word count | `ceil(words / 200)` minutes, "X min read". |
| `excerpt_text` | `excerpt` or body | Custom excerpt if set, else first ~160 chars of stripped body. |
| `tag_pills` | `tags` | Rendered via the shared tag component (reused from Sprint 2). |

## Reuse / cross-feature notes

- The **tag pill** component is shared with Sprint 2 portfolio tags.
- The **post-meta** component (FR-008) is consumed by both the index card
  (`blog/post-card.html`) and the post header (`_layouts/post.html`).
- `featured: true` posts feed the Sprint 4 homepage blog teaser.
- `toc: true` is read here but the sticky/active-section behaviour is Sprint 5.
- `categories` participate in the Sprint 5 tag-filter on the blog index.
