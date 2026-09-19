# Production Release

## Current Release State

- Local engineering QA is complete: **READY FOR GODADDY NODE.JS HOSTING PREVIEW**.
- The selected deployment is GoDaddy Node.js Hosting, GitHub-connected to `main`, with Node.js 22, `npm run build`, and `npm start`.
- The pre-release `dist/` artifact may be imported by the owner into a private GoDaddy Preview for runtime validation.
- This is **NOT YET READY FOR PRODUCTION RELEASE / INDEXING**. Keep `EM_RELEASE_APPROVED` unset and keep `dist/robots.txt` in PRE-RELEASE mode with `Disallow: /`.
- Human publication approval was granted on **2026-09-18** for the current client names, results and quantitative figures, award claim, 18+ years claim, GCC positioning, public email, phone, WhatsApp, and public publication of those facts.

## Before GoDaddy Preview QA

- Run `npm ci` with Node `>=22.18`.
- Run `npm run typecheck`.
- Run `npm run qa:copy`.
- Run `npm run qa:inquiry`.
- Run `npm run build` and review `dist/` from a clean build. The build installs the Playwright Chromium browser and hard-fails unless all 36 full-body snapshots succeed.
- Run `npm run qa:seo`, `npm run qa`, `npm run qa:hosting`, and `npm run qa:http`.
- Run `npm audit --omit=optional --audit-level=high`.
- Run `npm run check:release` separately; its non-zero governance result while `EM_RELEASE_APPROVED` is unset must not be confused with a technical QA failure.

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
`main`: `npm install`, `npm run build`, then `npm start`. The owner must connect
`MoOmranIT/Elite-Maison-marketing`, select `main`, and use the private Preview first.
No automated deployment, GoDaddy account connection, domain attachment, DNS change,
or publishing action is included here. Keep the pre-release artifact and its closed
robots policy until preview/live QA and the separate release decision pass.

## Post Deploy

- Check root, localized canonical routes, legacy aliases, and an unknown route.
- Check HTTP status, canonical, hreflang, robots, security headers, and console/network errors.
- Submit one controlled consultation inquiry through the non-production FormSubmit transport before enabling production delivery.
- Confirm direct email, phone, and WhatsApp links.

## Search And Indexing

After successful GoDaddy live QA and the separate owner release decision, review robots, submit the sitemap through approved search tools, and verify Googlebot, Bingbot, and OAI-SearchBot access. Until then, keep `robots.txt` at `Disallow: /`; production release and indexing are not yet enabled.
