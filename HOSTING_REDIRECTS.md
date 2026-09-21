# Hosting Redirects

The selected production target is GoDaddy Node.js Hosting connected to GitHub
`main`. `server.mjs` is the active routing source and serves only the generated
`dist/` artifact. There is no active `.htaccess`, Apache, cPanel, or generic SPA
fallback requirement.

The server emits single-hop 301 mappings to canonical localized routes. It
accepts only known case and insight identifiers, never interpolates arbitrary
query values into a path, and removes the legacy `id` query from the canonical
URL. Unrelated query context is preserved only as encoded query context.

## Legacy redirect matrix

| Legacy alias | Arabic canonical | English canonical |
|---|---|---|
| `/index.html` | `/ar` | `/en` |
| `/about.html` | `/ar/about` | `/en/about` |
| `/consulting.html` | `/ar/consulting` | `/en/consulting` |
| `/execution.html` | `/ar/execution` | `/en/execution` |
| `/sectors.html` | `/ar/sectors` | `/en/sectors` |
| `/cases.html` | `/ar/cases` | `/en/cases` |
| `/insights.html` | `/ar/insights` | `/en/insights` |
| `/contact.html` | `/ar/contact` | `/en/contact` |
| `/case.html?id={id}` | `/ar/cases/{id}` | `/en/cases/{id}` |
| `/insight.html?id={id}` | `/ar/insights/{id}` | `/en/insights/{id}` |

The language variant for legacy aliases uses Arabic as the documented default because no supported legacy language signal exists. Do not create redirect chains. Unknown URLs must return the generated `dist/404.html` with HTTP 404. All non-root canonical routes are slash-free; a slash-suffixed known route gets one 301 to its slash-free form.

## Root behavior

`/` returns HTTP 200 and serves `dist/index.html`, whose prerendered canonical is
`https://www.elitemaisonmarketing.com/ar`. The existing React root behavior may
then select the saved/query language and navigate to `/ar` or `/en`; the root is
not an additional sitemap route and is not redirected by the Node server.

## Production host normalization

- Exact `Host: elitemaisonmarketing.com` redirects once to
  `https://www.elitemaisonmarketing.com` plus the original request target.
- `Host: www.elitemaisonmarketing.com` is not redirected when
  `X-Forwarded-Proto: https` is present.
- A canonical `www` request with `X-Forwarded-Proto: http` is redirected once to
  HTTPS. Preview/private GoDaddy hostnames are never redirected to production.
- Other hosts are not normalized by application code; GoDaddy remains responsible
  for platform SSL termination and preview routing.

## Active verification

Run `npm run qa:hosting` for the local production server. To validate an owner-
provided preview URL without submitting FormSubmit data, run:

```bash
npm run qa:http -- --host=https://PRIVATE-PREVIEW-URL
```

The external mode checks canonical pages, assets, slash redirects, legacy
redirects, real 404 responses, headers, and traversal resistance. Host-header
simulation remains covered by the local mode.

## Owner GoDaddy Node.js Hosting workflow

1. Commit verified local changes and push to `main`.
2. Open GoDaddy Node.js Hosting and choose **Connect GitHub**.
3. Authorize access and choose repository `MoOmranIT/Elite-Maison-marketing`.
4. Choose branch `main` and use **Import & Deploy**.
5. GoDaddy installs dependencies, runs `npm run build`, then runs `npm start`.
6. Inspect build logs for `38/38 canonical pages rendered successfully`.
7. Open the private Preview for manual browser QA.
8. Inspect runtime logs, activate/test FormSubmit, and attach the production domain
   only after successful Preview/live checks.
9. Keep indexing closed (`Disallow: /`) until the separate release decision.

Private authenticated Preview requires manual browser QA, build-log review, and
runtime-log review. Publicly reachable preview/production origin can run
`npm run qa:http -- --host=https://...` only when the host is accessible without
interactive authentication.
