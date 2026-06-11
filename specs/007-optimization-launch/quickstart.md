# Quickstart: Launch & Verification Runbook

Phase 1 output for `007-optimization-launch`. The step-by-step path to take the
theme from a local production build to a verified live site on a custom domain.
Run audits against a **production** build, not the dev server.

## 1. Local production build

```bash
bundle install
JEKYLL_ENV=production bundle exec jekyll build
# Serve the built output for a realistic check:
bundle exec jekyll serve --no-watch
```

On Windows PowerShell, set the env var first:

```powershell
$env:JEKYLL_ENV = "production"; bundle exec jekyll build
```

## 2. Performance & budget gate (Constitution Principle II)

- Run Lighthouse (mobile) on `/`, `/blog/`, and one post. Target ≥ 95 across
  Performance, Accessibility, Best Practices, SEO (SC-002).
- Check compressed asset sizes (gzip): CSS ≤ 30 KB, JS ≤ 10 KB (SC-003).
- Confirm CLS < 0.1 and FCP < 1.2 s.
- If Performance < 95: inspect render-blocking resources, image weight, and font
  loading; fix and re-run before proceeding (launch is gated here).

## 3. Accessibility gate (Constitution Principle III)

- Run axe-core (browser extension or CLI) on `/`, `/blog/`, and a post — zero
  critical violations (SC-004).
- Manual keyboard pass: skip link is first; Tab order is logical; all controls
  (nav, mobile menu, CTAs, cards, copy button, scroll-to-top) are reachable and
  operable with visible focus; Escape closes the mobile menu.
- Verify `prefers-reduced-motion`: all motion (typing, helix, cursor, hover,
  particles) is static/hidden; information is intact.

## 4. SEO & feeds (Constitution Principle V)

- View source on `/` and a post: canonical URL, title, description, Open Graph,
  Twitter Card present (FR-003).
- Confirm Person JSON-LD on the homepage and BlogPosting JSON-LD on posts; validate
  with a structured-data testing tool.
- Confirm `/sitemap.xml` and `/feed.xml` exist and validate (FR-004).
- Test a shared link (homepage + post) renders a rich preview with image; confirm
  the default OG image is used when a page has no cover.

## 5. Responsive & cross-browser

- Verify layouts at sm 576, md 768, lg 1024, xl 1280, xxl 1536 — no horizontal
  overflow, grids reflow 3/2/1, mobile menu works (FR-006).
- Smoke test in current Chrome, Firefox, Safari, Edge (FR-007).

## 6. Deploy

Pick one host. All serve static Jekyll over HTTPS with custom domains.

**GitHub Pages (Actions)**
1. Push to GitHub; add a Pages build-and-deploy workflow (Ruby + `jekyll build`).
2. Set the custom domain in repo Settings → Pages (writes a `CNAME`).
3. Add DNS: `A`/`AAAA` to GitHub Pages IPs, or `CNAME` to `<user>.github.io`.
4. Enable "Enforce HTTPS" once the cert provisions.

**Netlify**
1. Connect the repo; build `jekyll build`, publish `_site`.
2. Add the custom domain; set DNS (`CNAME` to the Netlify subdomain) or use
   Netlify DNS.
3. HTTPS (Let's Encrypt) provisions automatically.

**Cloudflare Pages**
1. Connect the repo; build `jekyll build`, output `_site`.
2. Add the custom domain (Cloudflare-managed DNS provisions HTTPS automatically).

Record the chosen host and exact DNS records in `README.md`.

## 7. Post-deploy verification (gate to "done")

- [ ] Custom domain loads over HTTPS with a valid certificate (SC-001).
- [ ] Re-run Lighthouse on the **live** URL — still ≥ 95 (SC-002).
- [ ] A post deep-link loads directly; an unknown URL shows the themed 404 (FR-008).
- [ ] `sitemap.xml` and `feed.xml` resolve on the live domain.
- [ ] Updating a CSS/JS asset busts cache for returning visitors.

When every box is checked, the launch gates are satisfied and the project is
shippable.
