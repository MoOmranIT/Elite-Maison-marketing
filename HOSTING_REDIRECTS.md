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
