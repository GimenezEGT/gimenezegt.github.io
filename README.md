# Enrico Gimenez — Portfolio + Blog (Jekyll theme)

A dual-world Jekyll theme: a cool, technical **portfolio** and a warmer,
literary **blog**, sharing one design-token system. Built with vanilla JS,
strict performance and accessibility budgets, and a spec-driven workflow.

> **Status:** Complete (Sprints 1–7). The site builds and serves with the full
> portfolio (hero, about, projects, skills, contact), blog (index, posts,
> terminal code blocks, syntax theme), responsive navigation, interactivity
> (copy-to-clipboard, TOC, tag filter, hero typing, scroll-to-top), the
> bioinformatics motif layer (DNA helix, terminal headers, hex skills grid,
> organic dividers), and the launch hardening below (SEO/JSON-LD, default OG
> image, lazy images, cache-busting, GitHub Pages deploy). See
> [`DEVELOPMENT_PLAN.md`](DEVELOPMENT_PLAN.md) and [`specs/`](specs/).

## Prerequisites

- **Ruby** 3.x and **Bundler** (`gem install bundler`)
- Jekyll + plugins are installed via Bundler (see `Gemfile`)

## Run locally

```bash
bundle install                 # install Jekyll + plugins (first time)
bundle exec jekyll serve       # build + serve with live reload at http://localhost:4000
```

Other useful commands:

```bash
bundle exec jekyll build                        # one-off build into _site/
JEKYLL_ENV=production bundle exec jekyll build   # production build (used for audits)
```

On Windows PowerShell, set the production env var first:

```powershell
$env:JEKYLL_ENV = "production"; bundle exec jekyll build
```

> Run all performance/accessibility audits against a **production** build, never
> the dev server.

## Project structure

```
_config.yml            Site config: identity, SEO/social, plugins, defaults
_data/                 navigation.yml, social.yml, projects.yml (content, not markup)
_includes/
  head.html            <head>: SEO include, cache-busted CSS/JS, feed link
  header.html footer.html
  shared/              seo.html (jekyll-seo-tag + Person/BlogPosting JSON-LD),
                       section-header.html, skip-link.html, scroll-top.html
  portfolio/           hero, about, projects, skills, contact, blog-teaser
  blog/                post-card, post-meta, toc, related-posts, divider
_layouts/              base → portfolio / blog-index / post / page
_sass/                 7-1 SCSS: abstracts, base, layout, components, pages
assets/
  css/main.scss        Single compiled stylesheet entry point
  js/                  main.js (shared) + portfolio.js / blog.js (per-world)
  images/              og-default.png (default social image), hero/, blog/
index.html             Portfolio homepage
404.html               Themed not-found page
.github/workflows/     deploy.yml (GitHub Pages build + deploy)
specs/                 Spec Kit specs + plans (one per sprint)
.specify/              Spec Kit templates, scripts, and the project constitution
```

## Design system

All colour, type-scale, and spacing values are **design tokens** defined once in
`_sass/abstracts/_variables.scss`. The two worlds are the same tokens re-themed
at runtime via the `data-page-type` attribute (`portfolio` default, `blog`
override) — no component markup is duplicated. Do not hard-code colours, font
sizes, or spacing in component styles.

### Fonts

The theme ships with a **system-font stack** (Inter / Newsreader / JetBrains Mono
as the preferred faces, with native fallbacks) — zero external font payload and
no flash of unstyled text. This is a deliberate launch decision: self-hosting
woff2 was evaluated and intentionally **not** adopted, to protect the
performance budget. To self-host later, add the woff2 files under `assets/fonts/`,
declare `@font-face` with `font-display: swap`, and preload the primary body font.

## Adding content

- **A blog post:** add `_posts/YYYY-MM-DD-slug.md` with the front matter described
  in [`specs/003-blog-core/data-model.md`](specs/003-blog-core/data-model.md). An
  optional `image:` sets the post cover and its Open Graph image; without one, the
  default OG image is used.
- **A project:** add an entry to `_data/projects.yml` per
  [`specs/002-portfolio-core/data-model.md`](specs/002-portfolio-core/data-model.md).
- **Navigation / social links:** edit `_data/navigation.yml` / `_data/social.yml`.

## SEO & structured data

`jekyll-seo-tag` emits title, description, canonical, Open Graph, and Twitter Card
tags from `_config.yml` + page front matter. `_includes/shared/seo.html` adds the
JSON-LD the plugin does not: **Person** on the homepage and **BlogPosting** on
posts. A default Open Graph image (`assets/images/og-default.png`) covers pages
without their own cover. `jekyll-sitemap` and `jekyll-feed` produce `sitemap.xml`
and `feed.xml`.

## Principles (the short version)

Zero JS frameworks · progressive enhancement · performance is a gate
(Lighthouse ≥ 95, CSS ≤ 30 KB, JS ≤ 10 KB compressed) · accessibility by default
(WCAG AA, keyboard, reduced-motion) · single-source dual-palette tokens ·
content-first. Full text in
[`.specify/memory/constitution.md`](.specify/memory/constitution.md).

## Deployment (GitHub Pages)

The site deploys to **GitHub Pages** via the Actions workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (Ruby setup →
`JEKYLL_ENV=production jekyll build` → `upload-pages-artifact` → `deploy-pages`),
triggered on every push to `main`.

**Setting the custom domain** — the domain lives in exactly **two** places:

1. `url:` in [`_config.yml`](_config.yml) (absolute URLs in SEO/canonical/feed).
2. A root `CNAME` file containing the bare domain (e.g. `example.com`).

> The repository ships with a placeholder `url` and **no committed `CNAME`** so a
> placeholder domain cannot break a live deploy. Add the real domain to both spots
> before going live.

**One-time setup:**

1. Push to GitHub; in **Settings → Pages**, set **Source: GitHub Actions**.
2. Set the **custom domain** in Settings → Pages (this writes the `CNAME`), or add
   the `CNAME` file yourself.
3. Add DNS: apex `A`/`AAAA` records to the GitHub Pages IPs, or a `CNAME` record
   to `<user>.github.io`.
4. Enable **Enforce HTTPS** once the certificate provisions.

The full deploy + launch-verification runbook (Lighthouse, axe, responsive,
cross-browser, post-deploy gate) is in
[`specs/007-optimization-launch/quickstart.md`](specs/007-optimization-launch/quickstart.md).
