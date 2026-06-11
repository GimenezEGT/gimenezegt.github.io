# 🏗️ Comprehensive Development Plan — Jekyll Portfolio + Blog Theme

## Phase 0 · Foundation & Design System

Before writing a single line of code, we lock down the visual language and architecture. Everything else flows from here.

### 0.1 — Colour Palette Definition

Based on your direction (deep dark + amber/gold + terminal green + blue + white), here's the semantic palette split across the two "worlds" of your site:

| Token | Portfolio (Professional) | Blog (Creative) | Role |
|---|---|---|---|
| `--bg-primary` | `#08090d` (near-black ink) | `#0c0f14` (slightly warmer dark) | Page background |
| `--bg-surface` | `#12141a` (dark slate) | `#141820` (dark with blue tint) | Cards, sections |
| `--bg-elevated` | `#1a1d25` | `#1c2030` | Modals, dropdowns, code blocks |
| `--text-primary` | `#e8e6e3` (warm white) | `#f0ece6` (cream white) | Body text |
| `--text-muted` | `#8b8d94` | `#9b9da4` | Secondary text |
| `--accent-primary` | `#d4a017` (amber/gold) | `#e8b631` (brighter gold) | CTAs, links, highlights |
| `--accent-secondary` | `#3b82f6` (clean blue) | `#60a5fa` (softer blue) | Secondary actions, tags |
| `--accent-terminal` | `#4ade80` (terminal green) | `#34d399` (emerald) | Code, tech elements, cursor blinks |
| `--accent-danger` | `#ef4444` | `#f87171` | Errors, destructive |
| `--border` | `#1f2937` | `#1e293b` | Subtle borders |

**Key idea:** The portfolio palette is cooler, tighter, more restrained. The blog palette is slightly warmer and looser — same family, different personality.

### 0.2 — Typography System

| Element | Font | Rationale |
|---|---|---|
| Headings (Portfolio) | Inter or Space Grotesk (sans-serif) | Clean, geometric, technical — feels like a well-designed dashboard |
| Headings (Blog) | Newsreader or Lora (serif) | Warm, literary, invites reading |
| Body (both) | Inter (sans-serif) | Excellent readability at all sizes, bridges both worlds |
| Code / monospace | JetBrains Mono or Fira Code | Terminal aesthetic, ligatures for code blocks |

Type scale (modular, ratio ≈ 1.25):

```
--text-xs:   0.75rem   (12px)
--text-sm:   0.875rem  (14px)
--text-base: 1rem      (16px)
--text-lg:   1.25rem   (20px)
--text-xl:   1.563rem  (25px)
--text-2xl:  1.953rem  (31px)
--text-3xl:  2.441rem  (39px)
--text-4xl:  3.052rem  (49px)
```

### 0.3 — Spacing & Grid

- **Base unit:** `0.25rem` (4px) — all spacing is multiples of this
- **Grid:** CSS Grid with 12-column layout for portfolio, simpler centred column for blog
- **Max content width:** 1200px (portfolio), 720px (blog prose)
- **Section padding:** 6rem vertical on desktop, 3rem on mobile

### 0.4 — Visual Motifs & Identity Elements

These tie your bioinformatics/data science identity into the design:

| Motif | Where | How |
|---|---|---|
| 🧬 DNA helix / double-strand | Portfolio hero background | Subtle SVG animation, very low opacity, slow rotation |
| `>_` Terminal cursor blink | Portfolio section headers | A blinking green cursor before the heading text |
| 📊 Data scatter / node graph | Portfolio project cards on hover | Tiny particle animation or SVG pattern |
| 🌿 Organic/botanical line art | Blog headers, dividers | Hand-drawn-style SVG separators — the "human" touch |
| ⬡ Hexagonal grid | Portfolio skills section | Nod to chemical/molecular structures |

These motifs create the bridge: the portfolio says "I am technical and precise", but the organic touches whisper "…and there's a creative mind behind this — explore the blog."

---

## Phase 1 · Project Scaffolding

### 1.1 — Directory Structure

```
my-theme/
├── _config.yml                 # Jekyll configuration
├── Gemfile                     # Ruby dependencies
├── index.html                  # Portfolio homepage
├── blog.html                   # Blog index page
├── 404.html
├── _data/
│   ├── navigation.yml          # Nav links
│   ├── projects.yml            # Portfolio project entries
│   ├── skills.yml              # Skills/tech stack
│   └── social.yml              # Social links
├── _includes/
│   ├── head.html               # <head> with meta, fonts, CSS
│   ├── header.html             # Site navigation
│   ├── footer.html             # Site footer
│   ├── portfolio/
│   │   ├── hero.html           # Hero section
│   │   ├── about.html          # About/intro section
│   │   ├── projects.html       # Project showcase grid
│   │   ├── skills.html         # Tech stack / skills
│   │   ├── publications.html   # Papers, if applicable
│   │   └── contact.html        # Contact CTA
│   ├── blog/
│   │   ├── post-card.html      # Blog post preview card
│   │   ├── post-meta.html      # Date, tags, read time
│   │   ├── toc.html            # Table of contents (auto)
│   │   └── related-posts.html  # Related posts section
│   └── shared/
│       ├── seo.html            # SEO meta tags
│       ├── analytics.html      # Analytics snippet
│       ├── theme-toggle.html   # (future) light/dark toggle
│       └── scroll-top.html     # Back-to-top button
├── _layouts/
│   ├── base.html               # Root layout (HTML skeleton)
│   ├── portfolio.html          # Portfolio page layout
│   ├── blog-index.html         # Blog listing layout
│   ├── post.html               # Individual blog post layout
│   └── page.html               # Generic page layout
├── _posts/                     # Blog posts (Markdown)
├── _drafts/                    # Draft posts
├── _sass/
│   ├── abstracts/
│   │   ├── _variables.scss     # All CSS custom properties
│   │   ├── _mixins.scss        # Responsive, typography mixins
│   │   └── _functions.scss     # SCSS utility functions
│   ├── base/
│   │   ├── _reset.scss         # CSS reset / normalize
│   │   ├── _typography.scss    # Global type styles
│   │   └── _global.scss        # Body, html, scrollbar, selection
│   ├── components/
│   │   ├── _buttons.scss
│   │   ├── _cards.scss
│   │   ├── _tags.scss
│   │   ├── _code-blocks.scss
│   │   ├── _terminal.scss      # Terminal-styled UI elements
│   │   └── _cursor-blink.scss  # Blinking cursor animation
│   ├── layout/
│   │   ├── _header.scss
│   │   ├── _footer.scss
│   │   ├── _grid.scss
│   │   └── _section.scss
│   ├── pages/
│   │   ├── _portfolio.scss     # Portfolio-specific styles
│   │   └── _blog.scss          # Blog-specific styles
│   └── vendors/
│       └── _syntax.scss        # Code syntax highlighting theme
├── assets/
│   ├── css/
│   │   └── main.scss           # Main entry point (@imports)
│   ├── js/
│   │   ├── main.js             # Shared JS
│   │   ├── portfolio.js        # Portfolio animations/interactions
│   │   └── blog.js             # Blog-specific JS (TOC, etc.)
│   ├── images/
│   │   ├── hero/
│   │   ├── projects/
│   │   └── blog/
│   └── fonts/                  # Self-hosted fonts (optional)
├── pages/
│   ├── about.md                # Standalone about page (optional)
│   └── uses.md                 # /uses page (tools, setup)
└── scripts/
    └── new-post.sh             # Bash script to scaffold new posts
```

### 1.2 — `_config.yml` Essentials

```yaml
title: "Enrico Gimenez"
description: "Bioinformatics · Data Science · Molecular Biology"
url: "https://yourdomain.com"
baseurl: ""
permalink: /blog/:categories/:title/
timezone: America/Sao_Paulo
collections_dir: ""
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      author: "Enrico Gimenez"
markdown: kramdown
kramdown:
  syntax_highlighter: rouge
  input: GFM
sass:
  sass_dir: _sass
  style: compressed
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-paginate-v2
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - scripts/
  - README.md
```

### 1.3 — Gemfile

```ruby
source "https://rubygems.org"
gem "jekyll", "~> 4.3"
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-paginate-v2"
end
```

---

## Phase 2 · Base Layout & Global Styles

### 2.1 — `_layouts/base.html`

The root HTML skeleton. Every other layout extends this. It:

- Loads the correct CSS custom properties based on `page.layout` (portfolio vs. blog palette)
- Includes `<head>`, header, footer
- Adds a `data-page-type` attribute to `<body>` for CSS scoping

### 2.2 — CSS Architecture (build order)

```
1. abstracts/_variables.scss     → Define both palettes as CSS custom properties
2. abstracts/_mixins.scss        → Responsive breakpoints, type mixins
3. base/_reset.scss              → Normalize browser defaults
4. base/_typography.scss         → Headings, body, links, lists
5. base/_global.scss             → Body bg, scrollbar styling, ::selection
6. layout/_grid.scss             → 12-col grid system
7. layout/_section.scss          → Section padding, max-width containers
8. components/_buttons.scss      → Primary, secondary, ghost buttons
9. components/_cards.scss        → Project cards, blog post cards
10. components/_tags.scss        → Category/skill tags
```

### 2.3 — Palette Switching Mechanism

```scss
// In _variables.scss
:root {
  // Default: Portfolio palette
  --bg-primary: #08090d;
  --accent-primary: #d4a017;
  // ... all tokens
}
[data-page-type="blog"] {
  --bg-primary: #0c0f14;
  --accent-primary: #e8b631;
  // ... blog overrides
}
```

This way, the same component classes produce slightly different results depending on context — unified but distinct.

---

## Phase 3 · Portfolio Homepage (`index.html`)

### 3.1 — Section Breakdown (top to bottom)

| # | Section | Content | Key Visual Element |
|---|---|---|---|
| 1 | Hero | Name, title, one-liner tagline, CTA buttons ("View Projects" / "Read Blog") | Animated DNA helix SVG bg, terminal-style typing animation for the tagline |
| 2 | About | 2–3 paragraphs about you, photo (optional) | Clean two-column layout. Left: text. Right: stylised "terminal window" with key facts |
| 3 | Projects | Grid of project cards from `_data/projects.yml` | Cards with hover effects (subtle glow in accent colour), tech stack tags, links to repo/demo |
| 4 | Skills / Tech Stack | Grouped by category (Languages, Frameworks, Tools, Wet Lab, etc.) | Hexagonal grid or grouped tag clouds with proficiency indicators |
| 5 | Publications (optional) | Academic papers, preprints | Clean list with DOI links, citation count badge |
| 6 | Blog Teaser | Latest 2–3 blog posts | Cards styled slightly differently — warmer, with serif title — a visual "portal" to the blog world |
| 7 | Contact | Email, social links, CTA | Simple, elegant. Terminal-style: `> reach_out --email enrico@...` |

### 3.2 — Data-Driven Content (`_data/projects.yml`)

```yaml
- title: "GenomePipe"
  description: "Automated NGS pipeline for variant calling"
  image: "/assets/images/projects/genomepipe.png"
  tags: ["Python", "Snakemake", "Bioinformatics"]
  repo: "https://github.com/..."
  demo: ""
  featured: true
```

### 3.3 — Hero Interaction

Typing animation for the tagline (vanilla JS, no library):

```
> Bioinformatician · Data Scientist · Builder_
```

The `_` blinks in terminal green (`#4ade80`).

CTA buttons:

- "Explore Projects" → scrolls to `#projects`
- "Read the Blog →" → navigates to `/blog/` — styled subtly different (slightly warmer, hint of what the blog feels like)

---

## Phase 4 · Blog System

### 4.1 — Blog Index (`blog.html`)

- **Layout shift:** narrower max-width (720px), serif headings, warmer palette kicks in
- **Header area:** a hand-drawn-style SVG illustration or organic pattern — immediately signals "different space"
- **Post listing:** clean vertical stack of post cards, each showing:
  - Title (serif font)
  - Date + estimated read time
  - Excerpt (first 160 chars or custom excerpt front matter)
  - Tags as small pills
- **Category/tag filter:** clickable tag list at the top to filter posts (JS-based, no page reload)
- **Pagination:** 8–10 posts per page via `jekyll-paginate-v2`

### 4.2 — Individual Post Layout (`_layouts/post.html`)

```
┌─────────────────────────────────────────┐
│  ← Back to Blog                         │
│                                         │
│  [Category Tag]                         │
│  # Post Title (serif, large)            │
│  June 11, 2026 · 8 min read             │
│                                         │
│  ┌──────────┐  ┌──────────────────────┐ │
│  │ TOC      │  │ Post content         │ │
│  │ (sticky) │  │ (Markdown rendered)  │ │
│  │          │  │                      │ │
│  └──────────┘  │ Code blocks styled   │ │
│                │ with terminal look   │ │
│                │                      │ │
│                │ Images with captions  │ │
│                └──────────────────────┘ │
│                                         │
│  ── Tags ──                             │
│  [python] [bioinformatics] [tutorial]   │
│                                         │
│  ── Related Posts ──                    │
│  [Card] [Card] [Card]                   │
│                                         │
│  ── Back to Portfolio ──                │
│  A subtle CTA linking back home         │
└─────────────────────────────────────────┘
```

### 4.3 — Blog Post Front Matter

```yaml
---
layout: post
title: "Building a Variant Calling Pipeline from Scratch"
date: 2026-06-11
categories: [bioinformatics, tutorials]
tags: [python, snakemake, ngs, genomics]
excerpt: "A step-by-step guide to building a reproducible NGS pipeline..."
image: /assets/images/blog/variant-pipeline-cover.png
toc: true
featured: false
---
```

### 4.4 — Code Block Styling

Code blocks get a terminal window aesthetic:

```
┌── terminal ─── filename.py ──────── ✕ ─┐
│ def align_reads(fastq, reference):      │
│     """Align reads using BWA-MEM2"""    │
│     cmd = f"bwa-mem2 mem {reference}..."│
└─────────────────────────────────────────┘
```

- Dark elevated background (`--bg-elevated`)
- Top bar with coloured dots (red/yellow/green) and filename
- Syntax highlighting via Rouge with a custom dark theme matching your palette
- Copy-to-clipboard button (top right)

---

## Phase 5 · Navigation & Cross-Linking

### 5.1 — Header/Navigation

```
┌──────────────────────────────────────────────┐
│  [Logo/Name]          Projects  Blog  About  │
└──────────────────────────────────────────────┘
```

- On portfolio pages: nav is semi-transparent, overlays the hero, becomes solid on scroll
- On blog pages: nav has a slightly different accent (warmer), and the "Blog" link is highlighted
- Mobile: hamburger menu with full-screen overlay

### 5.2 — The "Bridge" Between Worlds

| From | To | Mechanism |
|---|---|---|
| Portfolio → Blog | "Blog Teaser" section at bottom of portfolio | Shows 2–3 latest posts with blog-style card design |
| Portfolio → Blog | "Read the Blog →" CTA in hero | Amber/gold button with a slight warmth shift on hover |
| Blog → Portfolio | "← Back to Portfolio" link in blog header | Always visible, subtle |
| Blog Post → Project | Inline links in posts | "This is part of the /projects/genomepipe project" |
| Project Card → Blog | "Read the write-up →" link on project cards | When a project has an associated blog post |

### 5.3 — Visual Transition

When navigating from portfolio to blog, the user should feel a subtle shift:

- Background warms slightly
- Headings switch from sans-serif to serif
- Accent gold becomes a touch brighter
- Layout narrows (full-width → centred column)

This is achieved purely through CSS (the `data-page-type` attribute) — no JS transitions needed, but a subtle CSS transition on `background-color` on `<body>` makes the shift feel intentional.

---

## Phase 6 · Components & Interactivity

### 6.1 — Component Library (build order)

| # | Component | Priority | JS Required |
|---|---|---|---|
| 1 | Buttons (primary, secondary, ghost, CTA) | 🔴 High | No |
| 2 | Project Card | 🔴 High | Minimal (hover) |
| 3 | Blog Post Card | 🔴 High | No |
| 4 | Tag Pills | 🔴 High | No |
| 5 | Terminal Window (code blocks) | 🔴 High | Yes (copy btn) |
| 6 | Section Headers (with cursor blink) | 🟡 Medium | CSS only |
| 7 | Table of Contents (blog) | 🟡 Medium | Yes (intersection observer) |
| 8 | Tag Filter (blog index) | 🟡 Medium | Yes |
| 9 | Scroll-to-top | 🟢 Low | Yes |
| 10 | Hero typing animation | 🟢 Low | Yes |
| 11 | DNA helix background | 🟢 Low | CSS/SVG |
| 12 | Dark/Light toggle | 🟢 Future | Yes |

### 6.2 — JavaScript Philosophy

- **Zero frameworks.** Vanilla JS only. No jQuery, no React, no Alpine.
- **Progressive enhancement.** Everything works without JS; JS adds polish.
- **Minimal footprint.** Target < 10 KB total JS (minified + gzipped).

---

## Phase 7 · Responsive Design

### 7.1 — Breakpoints

```scss
$breakpoints: (
  'sm':  576px,   // Mobile landscape
  'md':  768px,   // Tablet
  'lg':  1024px,  // Small desktop
  'xl':  1280px,  // Desktop
  'xxl': 1536px   // Large desktop
);
```

### 7.2 — Key Responsive Behaviours

| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| Project grid | 3 columns | 2 columns | 1 column |
| Blog post TOC | Sticky sidebar | Collapsible top | Collapsible top |
| Hero tagline | Large type + animation | Medium type + animation | Small type, static |
| Navigation | Horizontal links | Horizontal links | Hamburger menu |
| Skills hex grid | Full grid | Smaller grid | Tag list fallback |
| Section padding | 6rem | 4rem | 2rem |

---

## Phase 8 · SEO, Performance & Accessibility

### 8.1 — SEO

- `jekyll-seo-tag` for automatic meta tags
- `jekyll-sitemap` for `sitemap.xml`
- `jekyll-feed` for RSS feed (`/feed.xml`)
- Open Graph + Twitter Card meta tags per page/post
- Structured data (JSON-LD) for Person + BlogPosting schemas
- Canonical URLs on all pages

### 8.2 — Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | > 95 |
| First Contentful Paint | < 1.2s |
| Total CSS | < 30 KB (compressed) |
| Total JS | < 10 KB (compressed) |
| No layout shift (CLS) | < 0.1 |

**Strategies:**

- Self-host fonts with `font-display: swap`
- Lazy-load images below the fold (`loading="lazy"`)
- Inline critical CSS for above-the-fold content
- Preconnect to external domains (if any)
- Use `<picture>` with WebP + fallback

### 8.3 — Accessibility

- Semantic HTML5 (`<main>`, `<nav>`, `<article>`, `<section>`, `<aside>`)
- ARIA labels where needed (hamburger menu, icon-only buttons)
- Colour contrast ratio ≥ 4.5:1 for all text (verify amber on dark!)
- Focus-visible styles for keyboard navigation
- Skip-to-content link
- `prefers-reduced-motion` media query to disable animations
- `prefers-color-scheme` for potential future light mode

---

## Phase 9 · Build Order (Implementation Roadmap)

### Sprint 1 — Skeleton 🦴 (Days 1–3)

- Initialise Jekyll project, Gemfile, `_config.yml`
- Create directory structure
- Set up `_sass/abstracts/` (variables, mixins)
- Build `base.html` layout
- Implement CSS reset + global styles
- Typography system
- Basic header + footer includes

### Sprint 2 — Portfolio Core 🏠 (Days 4–7)

- Hero section (HTML + CSS, no animation yet)
- About section
- Projects grid + `_data/projects.yml` with sample data
- Skills section
- Contact section
- Portfolio-specific styles (`_portfolio.scss`)

### Sprint 3 — Blog Core 📝 (Days 8–11)

- Blog index page with post listing
- `post.html` layout
- Blog typography (serif headings)
- Code block terminal styling + syntax theme
- Post meta component (date, tags, read time)
- Write 1–2 sample posts for testing
- Blog-specific styles (`_blog.scss`)

### Sprint 4 — Navigation & Bridge 🌉 (Days 12–14)

- Responsive navigation (desktop + mobile hamburger)
- Blog teaser section on portfolio
- Cross-linking components
- Palette switching via `data-page-type`
- Smooth scroll for anchor links

### Sprint 5 — Interactivity & Polish ✨ (Days 15–18)

- Hero typing animation
- Terminal cursor blink CSS
- Table of contents (Intersection Observer)
- Copy-to-clipboard on code blocks
- Tag filtering on blog index
- Scroll-to-top button
- Project card hover effects

### Sprint 6 — Motifs & Identity 🧬 (Days 19–21)

- DNA helix SVG background animation
- Organic/botanical dividers for blog
- Hexagonal skill grid
- Terminal-style section headers
- Subtle particle effects on project cards

### Sprint 7 — Optimisation & Launch 🚀 (Days 22–25)

- Responsive testing across breakpoints
- Accessibility audit (axe-core, keyboard nav)
- Lighthouse performance audit + fixes
- SEO verification (meta, sitemap, structured data)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Write `README.md`
- Deploy to GitHub Pages / Netlify / Cloudflare Pages
- Set up custom domain + HTTPS

---

## Phase 10 · Future Enhancements (Post-Launch)

| Feature | Description | Priority |
|---|---|---|
| 🌗 Light mode toggle | Full light theme with palette swap | Medium |
| 🔍 Search | Client-side search with lunr.js or pagefind | Medium |
| 💬 Comments | Via giscus (GitHub Discussions-backed) | Low |
| 📊 Analytics | Privacy-friendly: Plausible or Umami | Medium |
| 🖼️ Image gallery | For project screenshots/figures | Low |
| 📄 CV/Resume page | Auto-generated from YAML data | Medium |
| 🌐 i18n | PT-BR + EN bilingual support | Low |
| ⚡ View Transitions API | Smooth page transitions (portfolio ↔ blog) | Low |

---

## Summary Diagram

```
                    ┌──────────────────────┐
                    │   base.html layout   │
                    │  (HTML skeleton,     │
                    │   head, nav, footer) │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
   ┌──────────▼──────┐ ┌──────▼───────┐ ┌──────▼──────┐
   │  portfolio.html  │ │ blog-index   │ │  post.html  │
   │  (homepage)      │ │  .html       │ │  (article)  │
   │                  │ │              │ │             │
   │  Sans-serif      │ │  Serif hdgs  │ │ Serif hdgs  │
   │  Cool palette    │ │  Warm palette│ │ Warm palette│
   │  12-col grid     │ │  Centred col │ │ Sidebar TOC │
   │  Tech motifs     │ │  Organic art │ │ Terminal    │
   │  🧬 💻 ⬡        │ │  🌿 ✨       │ │ code blocks │
   └──────────────────┘ └──────────────┘ └─────────────┘
         │                      ▲                ▲
         │    Blog Teaser       │   Related      │
         └──────────────────────┘   Posts ────────┘
```
