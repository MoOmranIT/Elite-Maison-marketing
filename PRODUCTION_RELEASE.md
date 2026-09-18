# Production Release

## Before Approval

- Run `npm ci` with Node `>=22.18`.
- Run `npm run typecheck`.
- Run `npm run qa:inquiry`.
- Run `npm run build` and review `dist/` from a clean build.
- Run `npm run qa:seo` and the browser QA available in the environment.
- Keep `EM_RELEASE_APPROVED` unset. `npm run check:release` must remain blocked.
- Keep `dist/robots.txt` in PRE-RELEASE mode with `Disallow: /`.

## Required Configuration

- `VITE_FORMSUBMIT_URL`: public FormSubmit AJAX endpoint; the owner must activate and test the recipient before production delivery.
- No secrets belong in the frontend bundle. FormSubmit activation and provider-side controls remain owner-managed.

The repository uses a static frontend with one inquiry flow: the form submits through FormSubmit AJAX, while WhatsApp, email, and phone remain direct contact routes. Consultation means an inquiry for manual team follow-up; there is no calendar or time-slot booking flow. The code validates and normalizes fields, rejects honeypot/control-character input, enforces client-side limits, times out after 10 seconds, suppresses provider errors, and never claims success for non-2xx or malformed provider responses. A controlled non-production submission is required before launch.

## Contact Delivery

FormSubmit is intentionally provider-facing and has no server runtime in this repository. The owner must activate the FormSubmit recipient, verify the inbox and spam handling, confirm the provider's privacy/retention behavior, and perform one controlled live test without exposing customer data. Do not add a second backend or provider dependency without an owner decision.

## Hosting Redirects

The host is not specified in this repository, so no platform-specific redirect file is added. Configure these rules in the chosen host's native format:

- `/` to the default language destination using one redirect without a loop.
- Legacy `.html` aliases to the matching localized canonical route with one 301.
- Unknown paths to the generated `404.html` with HTTP 404, not a 200 SPA fallback.
- HTTPS and the selected www/non-www canonical host consistently.

The complete mapping is in `HOSTING_REDIRECTS.md`.

## Release Approval

The human owner must approve client names, results, quantitative figures, awards, public contact details, and crawler access. Only that owner may set `EM_RELEASE_APPROVED=1`. Do not modify `publicationApproved` or `anonymizeCases` as an automation shortcut.

## Build And Deploy

The repository-supported build is `npm run build`. Deploy the resulting `dist/` using the hosting platform selected by the owner. No provider-specific deploy command is documented because no host is configured here.

## Post Deploy

- Check root, localized canonical routes, legacy aliases, and an unknown route.
- Check HTTP status, canonical, hreflang, robots, security headers, and console/network errors.
- Submit one controlled consultation inquiry through the non-production FormSubmit transport before enabling production delivery.
- Confirm direct email, phone, and WhatsApp links.

## Search And Indexing

After human publication approval and a verified deployment only, review robots, submit sitemap through approved search tools, and verify Googlebot, Bingbot, and OAI-SearchBot access. No indexing request is part of Phase 6 before approval.
