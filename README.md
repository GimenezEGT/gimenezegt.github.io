# Enrico Gimenez — Portfolio + Blog

A **dual-world** Jekyll site: a cool, technical **portfolio** and a warmer,
literary **blog**, sharing one design-token system. It runs on vanilla
JavaScript (no frameworks), holds strict performance and accessibility budgets,
and was built spec-first with [Spec Kit](https://github.com/github/spec-kit).

The two "worlds" are the *same* components re-themed at runtime: a page declares
`page_type: portfolio` (default) or `page_type: blog`, and every colour switches
via the `data-page-type` attribute — no duplicated markup or stylesheets.

---

## Table of contents

- [Quick start](#quick-start)
- [How it works (architecture)](#how-it-works-architecture)
- [Tools & tech stack](#tools--tech-stack)
- [Project structure](#project-structure)
- [Authoring content](#authoring-content)
  - [Add a blog post](#add-a-blog-post)
  - [Add / edit a project](#add--edit-a-project)
  - [Add / edit skills](#add--edit-skills)
  - [Edit your profile (hero + about)](#edit-your-profile-hero--about)
  - [Navigation & social links](#navigation--social-links)
- [Design system & tokens](#design-system--tokens)
- [SEO & structured data](#seo--structured-data)
- [Performance & accessibility budgets](#performance--accessibility-budgets)
- [Deployment](#deployment)
- [How it was built](#how-it-was-built)

---

## Quick start

### Prerequisites

- **Ruby** 3.x and **Bundler** (`gem install bundler`)
- Jekyll and the plugins are installed through Bundler — you don't install them
  globally.

### Install

```bash
bundle install        # installs Jekyll + plugins from the Gemfile (first time)
```

### Run locally

```bash
bundle exec jekyll serve     # build + live-reload at http://localhost:4000
```

### Build

```bash
bundle exec jekyll build                         # one-off build into _site/
JEKYLL_ENV=production bundle exec jekyll build    # production build (for audits)
```

On **Windows PowerShell**, set the env var first:

```powershell
$env:JEKYLL_ENV = "production"; bundle exec jekyll build
```

> Run all performance/accessibility audits against a **production** build, never
> the dev server (compressed CSS, real SEO output, etc.).

---

## How it works (architecture)

### The dual-world model

Everything visual is driven by **design tokens** — CSS custom properties defined
once in `_sass/abstracts/_variables.scss`. The portfolio palette is the default;
a second block under `[data-page-type="blog"]` redefines the same tokens with
warmer values. `_layouts/base.html` stamps `data-page-type` onto `<html>` and
`<body>` from each page's `page_type`, so switching worlds is a single attribute —
no component CSS is duplicated.

### Layout chain

```
base.html                     ← <head> (SEO, assets), header, <main>, footer, scroll-top
├── portfolio.html            ← page_type: portfolio; composes the homepage sections
├── blog-index.html           ← page_type: blog; renders the post list + tag filter
├── post.html                 ← page_type: blog; a single article (TOC, dividers, nav)
└── page.html                 ← generic content page (e.g. /about/, 404)
```

The **portfolio homepage** (`index.html` → `portfolio.html`) composes six
partials in order, each reading its own data file so it's independently testable:

```
hero → about → projects → skills → blog-teaser → contact
```

### Content is data, not markup

Sections never hard-code content. They read from `_data/*.yml` (profile, projects,
skills, navigation, social) and `_posts/*.md`. To change what the site *says*, you
edit data and Markdown — never the templates. This is enforced as a project
principle (see [How it was built](#how-it-was-built)).

### JavaScript (progressive enhancement only)

No frameworks, no build step for JS. Each script is loaded `defer` and every
behaviour has a no-JS fallback baked into the markup. Pages ship only what they
need:

| File            | Loaded on    | Responsibilities |
|-----------------|--------------|------------------|
| `main.js`       | every page   | Mobile menu, nav-on-scroll, scroll-to-top |
| `portfolio.js`  | portfolio    | Hero typing effect; node-graph particle effect on project-card hover (pointer + motion only) |
| `blog.js`       | blog         | Copy-to-clipboard on code blocks, active-section TOC tracking, client-side tag filtering |

### Styling (7-1 SCSS)

`assets/css/main.scss` is the single entry point; it imports the partials under
`_sass/` organised in the 7-1 pattern: `abstracts` (tokens, functions, mixins),
`base` (reset, global, typography), `components` (buttons, cards, code-blocks,
tags, terminal, cursor-blink), `layout` (header, footer, grid, section), `pages`
(portfolio, blog), and `vendors` (Rouge syntax theme). Output is compressed.

---

## Tools & tech stack

| Concern        | Choice |
|----------------|--------|
| Static site    | **Jekyll** `~> 4.3` (Liquid templating, Kramdown/GFM Markdown) |
| Styling        | **SCSS** (Dart Sass via Jekyll), design-token custom properties |
| Scripting      | **Vanilla JavaScript** (ES5-safe, no bundler, no dependencies) |
| Syntax highlighting | **Rouge** (server-side, themed in `_sass/vendors/_syntax.scss`) |
| SEO            | **jekyll-seo-tag** + hand-written JSON-LD |
| Feed / sitemap | **jekyll-feed**, **jekyll-sitemap** |
| Pagination     | **jekyll-paginate-v2** |
| Hosting        | **GitHub Pages** via GitHub Actions |
| Planning       | **Spec Kit** (spec-driven, one feature per sprint) |

---

## Project structure

```
_config.yml            Site config: identity, SEO/social, plugins, defaults
_data/                 Content as data (see "Authoring content")
  profile.yml          Name, tagline, bio, about-facts (hero + about)
  projects.yml         Portfolio project cards
  skills.yml           Skills grouped by category
  navigation.yml       Primary nav links
  social.yml           Footer / contact links
_posts/                Blog posts (YYYY-MM-DD-slug.md)
_includes/
  head.html            <head>: SEO include, cache-busted CSS/JS, feed link
  header.html          Responsive nav (active-state by world)
  footer.html          Copyright + social links
  shared/              seo.html (jekyll-seo-tag + JSON-LD), section-header.html,
                       skip-link.html, scroll-top.html
  portfolio/           hero, about, projects, skills, blog-teaser, contact
  blog/                post-card, post-meta, toc, related-posts, divider
_layouts/              base → portfolio / blog-index / post / page
_sass/                 7-1 SCSS (abstracts, base, components, layout, pages, vendors)
assets/
  css/main.scss        Single compiled stylesheet entry point
  js/                  main.js (shared) + portfolio.js / blog.js (per-world)
  images/              og-default.png (default social card), hero/, blog/
index.html             Portfolio homepage (uses the portfolio layout)
about.md / 404.html    Content pages
.github/workflows/     deploy.yml (GitHub Pages build + deploy)
specs/                 Spec Kit specs + plans (one per sprint)
.specify/              Spec Kit templates, scripts, and the project constitution
```

---

## Authoring content

> Rule of thumb: **edit data and Markdown, not templates.** Every section reads
> from `_data/` or `_posts/` and degrades gracefully when a field or file is empty.

### Add a blog post

Create `_posts/YYYY-MM-DD-slug.md`. The date in the filename sets the publish
date and the URL (`permalink: /blog/:categories/:title/`).

```markdown
---
layout: post
title: "Building a Variant Calling Pipeline from Scratch"
date: 2026-06-11
categories: [bioinformatics, tutorials]   # become URL path segments
tags: [python, snakemake, ngs, genomics]  # drive the tag filter
excerpt: "A step-by-step guide to a reproducible NGS pipeline."
image: /assets/images/blog/variant-pipeline-cover.png  # optional cover + OG image
toc: true        # render a table of contents from the headings
featured: true   # optional emphasis
---

Your Markdown body here. Fenced code blocks get Rouge highlighting and a
copy-to-clipboard button automatically.
```

Notes:
- **`image`** sets both the card cover and the post's Open Graph image. Omit it
  and the site falls back to the default OG image (`assets/images/og-default.png`).
- **`tags`** populate the blog index's client-side tag filter. Use single-word,
  lowercase tags for clean filtering.
- Full schema: [`specs/003-blog-core/data-model.md`](specs/003-blog-core/data-model.md).

### Add / edit a project

Append an entry to [`_data/projects.yml`](_data/projects.yml):

```yaml
- title: "GenomePipe"
  description: "Automated NGS pipeline for variant calling."
  image: ""                       # optional cover; empty shows a "</>" placeholder
  tags: ["Python", "Snakemake", "Bioinformatics"]   # at least one
  repo: "https://github.com/you/genomepipe"          # optional "Code" link
  demo: ""                                            # optional "Demo" link
  featured: true                  # featured cards are ordered first + emphasised
  post: "/blog/bioinformatics/tutorials/variant-calling-pipeline/"  # optional write-up link
```

Required: `title`, `description`, and at least one `tag`. Everything else is
optional. Full schema: [`specs/002-portfolio-core/data-model.md`](specs/002-portfolio-core/data-model.md).

### Add / edit skills

Skills are grouped by category in [`_data/skills.yml`](_data/skills.yml) and
rendered as a hexagonal grid:

```yaml
- category: "Languages"
  items:
    - { name: "Python", level: "expert" }       # level: basic | proficient | expert
    - { name: "R", level: "proficient" }
    - { name: "Bash" }                           # level is optional
```

### Edit your profile (hero + about)

[`_data/profile.yml`](_data/profile.yml) feeds the hero and about section:

```yaml
name: "Enrico Gimenez"
tagline: "Molecular biologist building bioinformatics & data-science tools."
bio: >
  Multi-line bio paragraph for the about section.
facts:                              # the about-panel key/value list
  - { label: "based_in", value: "São Paulo, BR" }
  - { label: "focus", value: "Bioinformatics · Data Science" }
```

### Navigation & social links

- **Nav:** [`_data/navigation.yml`](_data/navigation.yml) — ordered links with an
  optional `world` hint (`portfolio` / `blog`) used for active-state highlighting.
- **Social / contact:** [`_data/social.yml`](_data/social.yml) — `platform`,
  `url`, `icon`; the footer omits the list gracefully if empty.

Site-wide identity (title, description, author, SEO/social handles) lives in
[`_config.yml`](_config.yml). **Restart `jekyll serve` after editing `_config.yml`
or any `_data` file** — Jekyll does not hot-reload those.

---

## Design system & tokens

All colour, type-scale, and spacing values are **design tokens** in
`_sass/abstracts/_variables.scss`:

- **Colours** are CSS custom properties (runtime) so each world re-themes them via
  `[data-page-type]`. Never hard-code a colour in a component — reference a token.
- **Type scale** is modular (ratio ≈ 1.25), from `--text-xs` to the display sizes.
- **Breakpoints** are Sass variables (compile-time), consumed through the
  `respond-to()` mixin: `sm` 576, `md` 768, `lg` 1024, `xl` 1280, `xxl` 1536.

Motion respects `prefers-reduced-motion`: the hero typing, DNA helix, hover
particles, and other effects become static or hidden, with no loss of information.

---

## SEO & structured data

`jekyll-seo-tag` (`{% raw %}{% seo %}{% endraw %}` in `_includes/shared/seo.html`)
emits title, description, canonical, Open Graph, and Twitter Card tags from
`_config.yml` + page front matter. On top of that, `seo.html` adds the JSON-LD the
plugin doesn't: **Person** on the homepage and **BlogPosting** on posts. A default
Open Graph image covers pages without their own cover. `jekyll-sitemap` and
`jekyll-feed` produce `sitemap.xml` and `feed.xml`.

CSS/JS references are **cache-busted** (`?v=<build time>`) so returning visitors
always get fresh assets after a deploy.

---

## Performance & accessibility budgets

These are enforced as hard gates (see the constitution):

- **Lighthouse ≥ 95** (Performance, Accessibility, Best Practices, SEO) on mobile.
- **CSS ≤ 30 KB** and **JS ≤ 10 KB** compressed. *Current: ~4.9 KB CSS, ~3.3 KB JS
  per page (gzipped).*
- **CLS < 0.1**, FCP < 1.2 s.
- **WCAG AA**: keyboard-operable, visible focus, skip link, reduced-motion safe.

### Fonts

The theme ships a **system-font stack** (Inter / Newsreader / JetBrains Mono
preferred, with native fallbacks) — zero font payload, no FOUT. This is a
deliberate decision to protect the budget; self-hosting woff2 was evaluated and
not adopted. To self-host later: add woff2 under `assets/fonts/`, declare
`@font-face` with `font-display: swap`, and preload the primary body font.

---

## Deployment

The site deploys to **GitHub Pages** via the Actions workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (Ruby setup →
`JEKYLL_ENV=production jekyll build` → `upload-pages-artifact` → `deploy-pages`),
on every push to `main`.

**The domain lives in exactly two places:**

1. `url:` in [`_config.yml`](_config.yml) — used for absolute URLs in
   SEO/canonical/feed.
2. A root `CNAME` file containing the bare domain (only for a custom domain).

> The repo ships with a placeholder `url` and **no committed `CNAME`**, so a
> placeholder can't break a live deploy. Set both before going live. Without a
> custom domain, set `url` to `https://<user>.github.io` and skip the `CNAME`.

**One-time setup:**

1. Push to GitHub; in **Settings → Pages**, set **Source: GitHub Actions**.
2. (Custom domain) Set it in Settings → Pages — this writes the `CNAME` — or add
   the file yourself.
3. (Custom domain) Add DNS: apex `A`/`AAAA` records to the GitHub Pages IPs, or a
   `CNAME` record to `<user>.github.io`.
4. Enable **Enforce HTTPS** once the certificate provisions.

The full deploy + launch-verification runbook (Lighthouse, axe, responsive,
cross-browser, post-deploy gate) is in
[`specs/007-optimization-launch/quickstart.md`](specs/007-optimization-launch/quickstart.md).

---

## How it was built

The project was developed **spec-first** with [Spec Kit](https://github.com/github/spec-kit):
each feature has a spec, an implementation plan, and a generated task list under
[`specs/`](specs/), and every change honours the project constitution
([`.specify/memory/constitution.md`](.specify/memory/constitution.md), v1.0.0).

The five governing principles:

1. **Zero-framework JS & progressive enhancement** — no JS frameworks; every
   feature works without JavaScript.
2. **Performance budget is a gate** — Lighthouse ≥ 95 and the CSS/JS size limits
   are launch blockers, not aspirations.
3. **Accessibility by default** — WCAG AA, keyboard, visible focus, reduced-motion.
4. **Single-source dual-palette design system** — one token set, re-themed per
   world; no duplicated component CSS.
5. **Content-first & data-driven** — content lives in data/Markdown, never in
   templates.

Delivered across seven sprints:

| Sprint | Feature | What it added |
|--------|---------|---------------|
| 1 | Foundation & skeleton | Jekyll scaffold, design tokens, base layout, global styles |
| 2 | Portfolio core | Hero, about, projects, skills, contact |
| 3 | Blog core | Blog index, post layout, terminal code blocks, syntax theme |
| 4 | Navigation & bridge | Responsive nav, blog teaser, cross-links, world switch |
| 5 | Interactivity & polish | Copy-to-clipboard, TOC, tag filter, hero typing, scroll-to-top |
| 6 | Motifs & identity | DNA helix, terminal headers, hex skills grid, organic dividers |
| 7 | Optimization & launch | SEO/JSON-LD, OG image, cache-busting, a11y/perf gates, deploy |

Scope of record: [`DEVELOPMENT_PLAN.md`](DEVELOPMENT_PLAN.md).
