# Production Release

## Before Approval

- Run `npm ci` with Node `>=22.18`.
- Run `npm run typecheck`.
- Run `npm run qa:contact`.
- Run `npm run build` and review `dist/` from a clean build.
- Run `npm run qa:seo` and the browser QA available in the environment.
- Keep `EM_RELEASE_APPROVED` unset. `npm run check:release` must remain blocked.
- Keep `dist/robots.txt` in PRE-RELEASE mode with `Disallow: /`.

## Required Configuration

- `VITE_CONTACT_ENDPOINT`: public URL of the deployed contact endpoint; leave empty until a real endpoint exists.
- Server-side contact transport credentials and recipient: deployment secrets only, named by the chosen hosting/transport implementation.
- Production allowed origin: the verified production domain only.

The repository does not contain a server runtime, hosting adapter, provider configuration, recipient env, or production secrets. Contact delivery is therefore `CODE READY — ENV/PROVIDER REQUIRED` until those are supplied. Do not add a provider dependency or select a host without an owner decision.

## Contact Backend

Implement the contract in `docs/CONTACT_ENDPOINT_CONTRACT.md`. Validate every field server-side, enforce payload limits, reject unexpected fields and content types, use shared-storage rate limiting where the runtime supports it, and return 2xx only after transport acceptance. Use a test transport for automated QA; tests must never send to a production mailbox.

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
- Submit one controlled test through the non-production transport before enabling production delivery.
- Confirm direct email, phone, and WhatsApp links.

## Search And Indexing

After human publication approval and a verified deployment only, review robots, submit sitemap through approved search tools, and verify Googlebot, Bingbot, and OAI-SearchBot access. No indexing request is part of Phase 6 before approval.
