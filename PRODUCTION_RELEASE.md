# Production Release

## Current Release State

- Local engineering QA is complete: **READY FOR GODADDY NODE.JS HOSTING PREVIEW**.
- The selected deployment is GoDaddy Node.js Hosting, GitHub-connected to `main`, with Node.js 22, `npm run build`, and `npm start`.
- The pre-release `dist/` artifact may be imported by the owner into a private GoDaddy Preview for runtime validation.
- Human publication approval was granted on **2026-09-18** for the current client names, results and quantitative figures, award claim, 18+ years claim, GCC positioning, public email, phone, WhatsApp, and public publication of those facts.
- Production release/indexing decision was granted on **2026-09-19**. `EM_RELEASE_APPROVED=1` is configured in `.env.production`, so `npm run build` now produces open-crawler `robots.txt` with `Allow: /` and the sitemap directive.
- **GoDaddy Preview/live deployment is the next step.** The site is not yet live.

## Before GoDaddy Preview QA

- Run `npm ci` with Node `>=22.18`.
- Run `npm run typecheck`.
- Run `npm run qa:copy`.
- Run `npm run qa:inquiry`.
- Run `npm run build` and review `dist/` from a clean build. The build is browserless:
  no Chromium, no Playwright, no browser binaries. 36 canonical pages are rendered via
  `renderToString` + `StaticRouter` and verified without a browser.
  `dist/robots.txt` is now in production mode: crawlers allowed, sitemap present.
- Run `npm run qa:seo`, `npm run qa`, `npm run qa:hosting`, and `npm run qa:http`.
- Run `npm audit --omit=optional --audit-level=high`.
- Run `npm run check:release`; it should exit 0 under the standard production environment
  because `.env.production` supplies `EM_RELEASE_APPROVED=1`.

`npm run qa:release` is the aggregate technical gate and includes Node hosting QA;
Apache QA is no longer an active release check.

`npm run qa:http -- --host=https://PRIVATE-PREVIEW-URL` verifies an owner-provided
preview without submitting FormSubmit data. The local hosting QA additionally
simulates production apex/www and preview host headers.

## Required Configuration

- `VITE_FORMSUBMIT_URL`: public FormSubmit AJAX endpoint; the owner must activate and test the recipient before production delivery.
- No secrets belong in the frontend bundle. FormSubmit activation and provider-side controls remain owner-managed.

The repository uses a static frontend with one inquiry flow: the form submits through FormSubmit AJAX, while WhatsApp, email, and phone remain direct contact routes. Consultation means an inquiry for manual team follow-up; there is no calendar or time-slot booking flow. The code validates and normalizes fields, rejects honeypot/control-character input, enforces client-side limits, times out after 10 seconds, suppresses provider errors, and never claims success for non-2xx or malformed provider responses. A controlled non-production submission is required before launch.

## Contact Delivery

FormSubmit is intentionally provider-facing and has no server runtime in this repository. The owner must activate the FormSubmit recipient, verify the inbox and spam handling, confirm the provider's privacy/retention behavior, and perform one controlled live test without exposing customer data. Do not add a second backend or provider dependency without an owner decision.

## Hosting Redirects

The active production layer is the dependency-free `server.mjs`. GoDaddy starts it
with `npm start`; it serves the finite prerendered files in `dist/`, does not use
Apache or `.htaccess`, and never falls back to `dist/index.html` for unknown URLs.

Verify `/`, all localized canonical routes, deep routes, slash-free normalization,
the complete legacy matrix, real HTTP 404 responses, static MIME types, `HEAD`,
path traversal rejection, and narrow production-host normalization. The complete
mapping and owner preview command are in `HOSTING_REDIRECTS.md`.

The production host remains `https://www.elitemaisonmarketing.com`. Exact apex
requests normalize to that origin; private GoDaddy preview hostnames are not
redirected to production.

## Publication Approval And Crawler Activation

Human publication approval was granted on **2026-09-18** for the current client names, results and quantitative figures, award claim, 18+ years claim, GCC positioning, public email, phone, WhatsApp, and public publication of those facts. Crawler/indexing activation remains a separate release decision after successful GoDaddy live QA. Only the owner may set `EM_RELEASE_APPROVED=1`; do not modify `publicationApproved` or `anonymizeCases` as an automation shortcut.

## Build And Deploy

The repository-supported deployment is GitHub-connected GoDaddy Node.js Hosting on
`main`. The owner workflow:

1. Commit verified local changes and push to `main`.
2. Open GoDaddy Node.js Hosting and choose **Connect GitHub**.
3. Authorize access and choose repository `MoOmranIT/Elite-Maison-marketing`.
4. Choose branch `main` and use **Import & Deploy**.
5. GoDaddy installs dependencies, runs `npm run build`, then runs `npm start`.
6. Inspect build logs and confirm `36/36 canonical pages rendered successfully`.
7. Open the private Preview for manual browser QA.
8. Inspect runtime logs, activate/test FormSubmit, and attach the production domain
   only after successful Preview/live checks.
9. Keep indexing closed (`Disallow: /`) until the separate release decision.

No manual `dist/` upload is required or recommended. GoDaddy builds from the connected
repository. The pre-release artifact and its closed robots policy remain in effect
until preview/live QA and the separate release decision pass.

## Post Deploy

- Check root, localized canonical routes, legacy aliases, and an unknown route.
- Check HTTP status, canonical, hreflang, robots, security headers, and console/network errors.
- Submit one controlled consultation inquiry through the non-production FormSubmit transport before enabling production delivery.
- Confirm direct email, phone, and WhatsApp links.

## Search And Indexing

Production release/indexing approval is granted (2026-09-19). `npm run build` now
generates `dist/robots.txt` in production mode with crawlers allowed and the
sitemap directive. Submit the sitemap through approved search tools after GoDaddy
deployment and verify Googlebot, Bingbot, and OAI-SearchBot access.
