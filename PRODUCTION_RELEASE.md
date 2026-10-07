# Production Release

## Current Release State

- **LIVE** on `https://www.elitemaisonmarketing.com` (GoDaddy Node.js Hosting, GitHub `main`, Node.js 22).
- Local engineering QA is complete. Human publication approval: **2026-09-18**. Production release and crawler indexing approval: **2026-09-19**.
- Production builds load `.env.production` with **`EM_RELEASE_APPROVED=1`**, so `npm run build` generates an open `dist/robots.txt` (`Allow: /`, sitemap directive, OAI-SearchBot allowed, GPTBot disallowed) when `EM.CONFIG.publicationApproved` is true and `anonymizeCases` is false.
- GoDaddy runs `npm install`, `npm run build`, and `npm start` from the connected repository; `server.mjs` serves the verified `dist/` artifact.

## Before Deploy Or Re-Release

- Run `npm ci` with Node `>=22.18`.
- Run `npm run typecheck`.
- Run `npm run qa:copy` and `npm run qa:copy-contract`.
- Run `npm run qa:inquiry`.
- Run `npm run build` and confirm `38/38` canonical pages and production `robots.txt`.
- Run `npm run qa:seo`, `npm run check:release`, and `npm run qa:release` as needed.
- Run `npm audit --omit=optional --audit-level=high` before major releases.

`npm run qa:release` is the aggregate technical gate and includes Node hosting QA.

## Required Configuration

- `VITE_FORMSUBMIT_URL`: public FormSubmit AJAX endpoint; the owner must activate and test the recipient.
- `EM_RELEASE_APPROVED=1` in `.env.production` (committed) for open crawler policy in build output. No secrets belong in the frontend bundle.

## Hosting Redirects

The active production layer is the dependency-free `server.mjs`. See `HOSTING_REDIRECTS.md` for the route contract.

Production host: `https://www.elitemaisonmarketing.com`.

## Publication Approval And Crawler Activation

Human publication approval and indexing activation are **granted**. Do not modify `publicationApproved` or `anonymizeCases` as an automation shortcut.

## Build And Deploy

1. Commit verified changes and push to `main`.
2. GoDaddy builds from GitHub and runs `npm run build` / `npm start`.
3. Confirm build logs show `38/38 canonical pages` and `robots.txt: production (crawling open)`.
4. Spot-check live routes, FormSubmit, and search console sitemap submission as needed.

## Post Deploy

- Check root, localized canonical routes, legacy aliases, and unknown routes (real 404).
- Check HTTP status, canonical, hreflang, robots, and console/network errors.
- Confirm direct email, phone, and WhatsApp links.

## Search And Indexing

Production `dist/robots.txt` allows general crawlers and OAI-SearchBot; GPTBot is disallowed. Submit `sitemap.xml` through approved search tools after deploy.
