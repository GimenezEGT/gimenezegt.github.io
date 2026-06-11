# Enrico Gimenez — Portfolio + Blog (Jekyll theme)

A dual-world Jekyll theme: a cool, technical **portfolio** and a warmer,
literary **blog**, sharing one design-token system. Built with vanilla JS,
strict performance and accessibility budgets, and a spec-driven workflow.

> **Status:** Sprint 1 (Foundation & Skeleton) implemented — the site builds,
> serves, and has its design-token system, base layout, global styles, and
> shared header/footer. Portfolio sections, the blog, navigation, interactivity,
> and motifs follow in Sprints 2–6; optimisation and launch in Sprint 7.
> See [`DEVELOPMENT_PLAN.md`](DEVELOPMENT_PLAN.md) and [`specs/`](specs/).

## Prerequisites

- **Ruby** 3.x and **Bundler** (`gem install bundler`)
- Jekyll is installed via Bundler (see `Gemfile`)

## Run locally

```bash
bundle install                 # install Jekyll + plugins (first time)
bundle exec jekyll serve       # build + serve with live reload at http://localhost:4000
```

Other useful commands:

```bash
bundle exec jekyll build                       # one-off build into _site/
JEKYLL_ENV=production bundle exec jekyll build  # production build (used for audits)
```

On Windows PowerShell, set the production env var first:

```powershell
$env:JEKYLL_ENV = "production"; bundle exec jekyll build
```

## Project structure

```
_config.yml          Site configuration
_data/               navigation.yml, social.yml (content, not markup)
_includes/           head, header, footer, shared/ (skip-link, seo)
_layouts/            base → portfolio / blog-index / post / page
_sass/               7-1 SCSS: abstracts, base, layout (components/pages added later)
assets/css/main.scss Single compiled stylesheet entry point
index.html           Portfolio homepage
404.html             Themed not-found page
specs/               Spec Kit specs + plans (one per sprint)
.specify/            Spec Kit templates, scripts, and the project constitution
```

## Design system

All colour, type-scale, and spacing values are **design tokens** defined once in
`_sass/abstracts/_variables.scss`. The two worlds are the same tokens re-themed
at runtime via the `data-page-type` attribute (`portfolio` default, `blog`
override) — no component markup is duplicated. Do not hard-code colours, font
sizes, or spacing in component styles.

### Fonts

Sprint 1 uses a system-font fallback stack (Inter / Newsreader / JetBrains Mono
as the preferred faces, with native fallbacks) so the build has no external
dependency. Self-hosting the woff2 files with `font-display: swap` is scheduled
for Sprint 7 (Optimization & Launch).

## Adding content

- **A blog post** (Sprint 3+): add `_posts/YYYY-MM-DD-slug.md` with the front
  matter described in [`specs/003-blog-core/data-model.md`](specs/003-blog-core/data-model.md).
- **A project** (Sprint 2+): add an entry to `_data/projects.yml` per
  [`specs/002-portfolio-core/data-model.md`](specs/002-portfolio-core/data-model.md).
- **Navigation / social links:** edit `_data/navigation.yml` / `_data/social.yml`.

## Principles (the short version)

Zero JS frameworks · progressive enhancement · performance is a gate
(Lighthouse ≥ 95, CSS ≤ 30 KB, JS ≤ 10 KB) · accessibility by default (WCAG AA,
keyboard, reduced-motion) · single-source dual-palette tokens · content-first.
Full text in [`.specify/memory/constitution.md`](.specify/memory/constitution.md).

## Deployment

Static hosting (GitHub Pages / Netlify / Cloudflare Pages) over HTTPS on a custom
domain. The deploy + launch runbook is
[`specs/007-optimization-launch/quickstart.md`](specs/007-optimization-launch/quickstart.md).
