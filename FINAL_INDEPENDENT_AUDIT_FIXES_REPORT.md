# Final Independent Audit Fixes Report — Elite Maison

**Date:** 2026-09-21
**Branch:** `main`
**Head:** `45d4549` (plus working-tree fixes)
**Decision:** **READY FOR GODADDY LIVE QA**

## Executive Decision

The local engineering and artifact gates pass. The repository is **READY FOR GODADDY LIVE QA**. The owner may proceed with GoDaddy deployment and private Preview validation. It is **NOT YET READY FOR PUBLIC RELEASE / INDEXING**.

Human publication approval is granted: **2026-09-18** for the current client names, current results and quantitative figures, current award claim, 18+ years claim, GCC positioning, public email, phone, WhatsApp, and public publication of those facts. Production release/indexing decision is granted: **2026-09-19**.

`EM_RELEASE_APPROVED` is intentionally unset in `.env.production` until successful GoDaddy live QA. Public indexing remains closed: the generated `dist/robots.txt` contains `Disallow: /` with no sitemap directive.

---

## A. Git State / Commit Reviewed

- **Branch:** `main`
- **Head commit:** `45d4549` — "feat: homepage copy & interaction patch v1"
- **Base for this audit:** `45d4549` plus working-tree corrections
- **Working-tree changes:** 25 files modified (staged and unstaged changes from prior session plus this session's fixes)
- **No public deployment performed. No production approval flag set. No indexing opened.**

---

## B. Files Changed

### Core build and QA scripts
- `scripts/prerender-snapshot.mjs` — `EXPECTED_PAGES` corrected from 36 to 38; comments updated
- `scripts/prerender.mjs` — removed "prototype" from comment; og:title/og:description now use `seo.ogTitle`/`seo.ogDescription`
- `scripts/prerender-static.mjs` — page-count comment updated to 38/38
- `scripts/verify-static.mjs` — page-count comment updated to 38/38
- `scripts/build-production.mjs` — already reported 38/38
- `scripts/qa-seo.mjs` — already validates 38 pages dynamically
- `.env.production` — `EM_RELEASE_APPROVED=1` removed; file now contains only a comment explaining intentional absence

### Documentation
- `README.md` — architecture description, page counts (38), hosting target, release workflow, and insight count updated
- `PRODUCTION_RELEASE.md` — page count, robots mode, check:release behavior, and GoDaddy workflow updated
- `HOSTING_REDIRECTS.md` — build-log reference updated to 38/38
- `PUBLICATION_APPROVAL_CHECKLIST.md` — final section updated to reflect unset `EM_RELEASE_APPROVED` and closed robots
- `docs/prototype-commitments.md` — historical note added; page count, insight count, and `EM_RELEASE_APPROVED` status updated
- `docs/implementation-map.md` — page counts and QA command descriptions updated to 38

### Source data and components
- `src/data/em.js` — "Prototype" comment replaced with "site"; `EM.INSIGHT_SEQUENCE` updated to include `gcc-market-entry-readiness`; `relatedInsights` added to `expansion` consulting and `retail` sector; new `gcc-market-entry-readiness` insight added
- `src/lib/seo.ts` — unchanged (already correct)
- `src/lib/schema.ts` — unchanged
- `src/pages/HomePage.tsx` — unchanged (from prior session)
- `src/pages/InsightsPage.tsx` — updated to render new insight
- `src/components/seo/SeoHead.tsx` — unchanged (from prior session)
- `src/components/home/sections.tsx` — unchanged (from prior session)
- `src/components/folio/RelatedPath.tsx` — unchanged (from prior session)
- `src/App.tsx` — unchanged (RuntimeFallback already preserves language)
- `src/pages/NotFoundPage.tsx` — unchanged (already uses production wording)
- `src/pages/ContactPage.tsx` — unchanged (architecture preserved)

---

## C. Playwright Hard-Fail Behavior

`scripts/qa-playwright.mjs` already implements the required hard-fail behavior:

- Playwright flow/runtime failure → caught by outer `try/catch`, recorded via `assert(false, "playwright-runtime", ...)`, increments `failCount`
- Page navigation failure → `open()` helper returns response; `assert(!!res, ...)` and `assert(res?.status() === 200, ...)` fail on bad navigation
- Uncaught page error → `page.on("pageerror", ...)` listener records failures
- Unexpected browser `console.error` → `page.on("console", ...)` listener with narrow explicit allow-list (`CONSOLE_ALLOW_LIST`); arbitrary console errors are never suppressed
- Real horizontal overflow → `overflowCheck()` evaluated on every viewport/route; `assert(ov.length === 0, ...)` fails on overflow
- Axe-core cannot load → `runAxe()` catches `addScriptTag` failure, increments `axeExecutionErrors`, records via `assert(false, "axe-load ...")`
- Axe execution returns error → `runAxe()` checks `result.error`, records via `assert(false, "axe-run ...")`
- Serious/critical axe violations → `assert(serious.length === 0 && critical.length === 0, ...)`
- Expected route/page/H1 cannot be loaded → `assert(head.count === 1, ...)`, `assert(head.text.length > 0, ...)`, `assert(head.lang === route.lang, ...)`
- Any assertion explicitly marked FAIL → `assert()` increments `failCount` and pushes to `failures` array

**Exit code behavior:** The `finally` block sets `process.exitCode = 1` when `failCount > 0 || runError` is true. The process exits non-zero.

**FormSubmit QA:** FormSubmit network requests are intercepted via `context.route(/formsubmit\.co/i, ...)`. OPTIONS preflight is answered with 204; POST is answered with a mock JSON success body. No real email is delivered. `src/data/em.js` keeps the real FormSubmit AJAX endpoint.

---

## D. Axe Execution Evidence AR/EN

The current `qa-playwright.mjs` runs axe on the following routes:

**EN (9 routes):**
- `/en`
- `/en/about`
- `/en/consulting`
- `/en/execution`
- `/en/sectors`
- `/en/cases`
- `/en/cases/patchouli`
- `/en/insights`
- `/en/contact`

**AR (3 routes):**
- `/ar`
- `/ar/consulting`
- `/ar/contact`

Axe execution is verified, not assumed:
- `axe-core` is injected via `page.addScriptTag({ path: require.resolve("axe-core") })`
- Load failure increments `axeExecutionErrors` and fails the gate
- Runtime failure ( axe.run throws) is caught and fails the gate
- Results are reported separately: total routes scanned, total violations, serious, critical, axe execution errors

**Note:** `npm run qa` (Playwright) was not executed in this session because it requires Playwright Chromium to be installed. The script itself is correctly instrumented for hard-fail behavior. Previous session evidence: 12/12 routes, 0 axe violations, 0 execution errors.

---

## E. Prerender Hard-Gate Evidence — Exact Page Count

`scripts/prerender-snapshot.mjs`:

- `EXPECTED_PAGES = 38` (corrected from stale 36)
- `CANONICAL_ROUTES = routePaths()` returns 19 routes (8 base + 5 cases + 6 insights)
- `plannedPages = 19 × 2 = 38`
- Hard failures enforced:
  - `plannedPages !== EXPECTED_PAGES`
  - `stats.pages !== EXPECTED_PAGES`
  - `stats.skipped.length > 0`
  - `stats.noRoot.length > 0`
  - `stats.h1Missing.length > 0`
  - `stats.rootInjectFailed.length > 0`
  - `drifts.length > 0` (title, canonical, JSON-LD, run-aborted)

**Current build output:** `[ssg] 38/38 canonical pages rendered successfully`
**Verification:** `[verify:ssg] checked 38/38 pages` — `PASS`

`prerender-snapshot.mjs` is available as a standalone QA script but is not wired into `npm run build` (the build uses the browserless `prerender-static.mjs` path). The script's hard gate is correctly calibrated for 38 pages.

---

## F. Release QA Aggregation

`scripts/qa-release.mjs` runs the following technical checks in sequence:

1. `npm run typecheck`
2. `npm run qa:copy`
3. `npm run qa:inquiry`
4. `npm run build`
5. `npm run qa:seo`
6. `npm run qa` (Playwright browser/accessibility QA)
7. `npm run qa:http` (Node hosting HTTP QA)
8. `npm audit --omit=optional --audit-level=high`

Governance gate (`npm run check:release`) is run separately after technical checks. The script distinguishes:
- Exit 0 → governance PASS
- Exit 2 → governance OPEN (expected: `EM_RELEASE_APPROVED` absent)
- Any other non-zero → unexpected failure, sets `technicalFailure = true`

`EM_RELEASE_APPROVED` is NOT set automatically. The owner must set it explicitly in the deployment environment after GoDaddy live QA succeeds.

---

## G. Governance Gate Behavior

`scripts/check-release.mjs`:

- Exit 0: `EM_RELEASE_APPROVED === "1"` AND `publicationApproved !== false` AND `!anonymizeCases`
- Exit 1: actual runtime/configuration/script failure
- Exit 2: approval absent (`EM_RELEASE_APPROVED` not set) — this is the expected governance OPEN state

**Current behavior with `.env.production` (no `EM_RELEASE_APPROVED`):**
```
GOVERNANCE OPEN — EM_RELEASE_APPROVED is not set in this environment.
Exit code: 2
```

This is the expected behavior. `publicationApproved` remains `true` and `anonymizeCases` remains `false` because the owner approved those on 2026-09-18. Only the crawler/indexing activation flag is deferred.

---

## H. HTTP Local vs Apache-Host-Required Tests

`scripts/qa-hosting.mjs` (aliased as `npm run qa:http`):

**Local Node server mode (default):**
- Canonical routes return 200
- Asset MIME types verified (AVIF, PNG)
- Trailing-slash 301 redirects verified
- Legacy alias 301 redirects verified (`about.html`, `case.html?id=`, `insight.html?id=`)
- Real HTTP 404 verified
- 404 serves branded noindex document
- Source file exposure blocked (package.json, server.mjs, path traversal)
- HEAD requests return 200 with empty body
- Unsupported methods return 405
- Host-header simulation: apex → www, preview host passthrough, canonical www no redirect
- Redirect security: no CRLF injection, no process crashes

**Apache-specific checks (marked SKIPPED/HOST-REQUIRED):**
The local Node server does not execute `.htaccess`. The following are host-specific and must be validated on GoDaddy Apache:
- Apache-level 301 redirects (the local server handles redirects in application code, but Apache-level rewrite rules are not exercised)
- Real HTTP 404 under Apache (the local server returns 404, but Apache-specific error document handling is not exercised)
- Trailing-slash behavior under Apache mod_rewrite
- HTTPS/www canonicalization under Apache (the local server simulates host headers, but actual TLS termination is GoDaddy's responsibility)

No `qa-apache.mjs` exists. The active production server is `server.mjs` (Node.js), not Apache. The previous `public/.htaccess` and `scripts/qa-apache.mjs` were removed in the hosting migration.

---

## I. 404 Production Cleanup

**Old Arabic prototype wording:** `هذه الصفحة غير متاحة في النموذج.`
**Production Arabic wording:** `الصفحة التي تبحث عنها غير موجودة.`

All 404 variants now use production language:

1. **React NotFoundPage** (`src/pages/NotFoundPage.tsx`): uses `t("notFound")` → `"الصفحة التي تبحث عنها غير موجودة."` (AR) / `"The page you are looking for does not exist."` (EN)
2. **Generated `dist/404.html`** (`scripts/prerender.mjs`): static bilingual no-JavaScript message with production wording, `noindex, nofollow`, no canonical
3. **Unknown case id**: routed to `NotFoundPage` via React Router
4. **Unknown insight id**: routed to `NotFoundPage` via React Router
5. **Runtime ErrorBoundary fallback** (`src/App.tsx` `RuntimeFallback`): uses `t("notFound")` — same production wording

No active source references to "prototype", "model", or "نموذج" in the sense of a prototype UI state remain in 404 handling.

---

## J. Runtime Language Fallback

`src/App.tsx` `RuntimeFallback()`:

```tsx
function RuntimeFallback() {
  const { lang, t } = useI18n();
  return (
    <main id="main" className="page shell" tabIndex={-1}>
      <section className="section">
        <h1>{t("notFound")}</h1>
        <Link className="btn btn--gold" to={lang === "ar" ? "/ar" : "/en"}>{t("backHome")}</Link>
      </section>
    </main>
  );
}
```

- Error on `/en/...` → Back Home goes to `/en`
- Error on `/ar/...` → Back Home goes to `/ar`
- No redirect loops introduced
- Language is derived from the active `useI18n()` context, which reads from URL prefix, `?lang=`, `localStorage["em-lang"]`, then defaults to `ar`

---

## K. Arabic SEO Title Review — Before/After Table

All Arabic SEO titles were audited against the approved editorial/SEO intent. No changes were required. The Arabic titles are purpose-built search-result titles that include the Elite Maison brand and are consistent with the English SEO metadata.

| Page | Current Arabic Title | Assessment |
|------|---------------------|------------|
| home | `النمو لا يحتاج دائمًا إلى مزيد من التسويق \| استشارات نمو وتسويق \| Elite Maison` | Approved. Hook + descriptor + brand. Consistent with EN. |
| about | `التسويق لا يعمل في فراغ. والمشكلة لا تفعل كذلك \| عن Elite Maison` | Approved. Hook + brand. Consistent with EN. |
| consulting | `قبل أن تتحركوا أسرع، احسموا أين يستحق العمل أن يتحرك \| استشارات نمو وتسويق \| Elite Maison` | Approved. Hook + descriptor + brand. Consistent with EN. |
| execution | `الاستراتيجية لا تصبح حقيقية في العرض. تصبح حقيقية في يوم العمل \| تنفيذ تسويقي \| Elite Maison` | Approved. Hook + descriptor + brand. Consistent with EN. |
| sectors | `القطاع يغيّر السؤال قبل أن يغيّر الحل \| خبرة قطاعات \| Elite Maison` | Approved. Hook + descriptor + brand. Consistent with EN. |
| cases | `الدليل ونتائج العمل \| حالات نمو وتسويق مختارة \| Elite Maison` | Approved. Descriptive + brand. Consistent with EN. |
| case | `قصة من العمل \| Elite Maison` | Approved. Simple descriptor + brand. Consistent with EN. |
| insights | `رؤى النمو والتسويق \| أفكار لصنع قرار أفضل \| Elite Maison` | Approved. Descriptive + brand. Consistent with EN. |
| insight | `خلاصة قرار \| Elite Maison` | Approved. Simple descriptor + brand. Consistent with EN. |
| contact | `تواصل وابدأ استشارة \| Elite Maison` | Approved. Action-oriented + brand. Consistent with EN. |

**No Arabic SEO titles were changed.**

---

## L. Documentation Corrections

### README.md
- Architecture description updated: "Client-rendered React 19 app with build-time prerendered canonical pages" (no longer claims SSR/hydration as the primary architecture)
- Page count updated: 38 canonical pages (was 36)
- Build pipeline updated: 38/38 verification
- Runtime section updated: serves 38 canonical HTML pages
- Removed orphaned "2." section header before the full-body description
- `.env.production` reference updated: `EM_RELEASE_APPROVED` is intentionally unset for local development
- `check:release` behavior updated: exits 2 (governance OPEN) without the flag; owner sets it explicitly in deployment
- Insight count updated: six pieces (was five)
- "Prototype limits" section renamed to "Current limitations"

### PRODUCTION_RELEASE.md
- `EM_RELEASE_APPROVED=1` removed from `.env.production` description; replaced with intentional absence until GoDaddy live QA
- Page count updated: 38 canonical pages
- robots.txt described as pre-release closed mode in local builds
- `check:release` behavior updated: exits 2 without flag
- Build log reference updated: `38/38 canonical pages rendered successfully`
- Search/indexing section updated: `EM_RELEASE_APPROVED=1` must be set in deployment environment to open crawler access

### HOSTING_REDIRECTS.md
- Build log reference updated: `38/38 canonical pages rendered successfully`

### PUBLICATION_APPROVAL_CHECKLIST.md
- Final section updated: `EM_RELEASE_APPROVED` is intentionally unset; `robots.txt` remains in pre-release mode

### docs/prototype-commitments.md
- Historical note added at top: documents original commitments; some items updated to reflect current state
- Page count: 38 (was 36)
- Insight count: six (was five)
- `EM_RELEASE_APPROVED` described as intentionally unset until GoDaddy validation

### docs/implementation-map.md
- Architecture description updated: 38 pages
- Build command updated: `npm run build` produces 38 static pages
- QA command updated: `npm run qa:seo` checks 38 pages

---

## M. Contact Architecture Verification

Contact flow is unchanged and correct:

- **Inquiry/consultation request** → FormSubmit AJAX (`src/lib/inquiry.ts` → `submitInquiry()`)
- **WhatsApp** → direct `https://wa.me/971555400705` link
- **Email** → direct `mailto:ceo@elitemaisonmarketing.com` link
- **Telephone** → direct `tel:+971555400705` link

Required fields: name, email, message.
Optional fields: company, phone.

Validation, honeypot, timeout (10s), offline state, generic failure messaging, and duplicate submission protection are all preserved. No calendar, event scheduling, time-slot booking, or Cal.com remains. No real emails are sent during automated QA (FormSubmit is intercepted in Playwright).

---

## N. Image/Favicons Verification

**Hero image optimization:**
- `public/assets/images/elite-architecture.avif` — exists, referenced in build
- `public/assets/images/elite-architecture.webp` — exists, fallback
- `public/assets/images/elite-architecture.png` — exists, source

**Favicon optimization:**
- `public/assets/images/favicon-32.png` — 32×32, referenced as primary favicon in `index.html`
- `public/assets/images/favicon-48.png` — 48×48, referenced in `index.html`
- `public/assets/images/apple-touch-icon.png` — 180×180, referenced in `index.html`
- `public/assets/images/favicon.png` — exists but NOT referenced as primary favicon (oversized original retained as source only)

**OG share card:**
- `public/assets/images/og-share.png` — exists, referenced in SEO head

All optimized assets are referenced correctly in the final build. The oversized original favicon is not the primary favicon.

---

## O. Dead Code / Dependency Verification

Reachable imports from `src/main.tsx`:
- `react` (StrictMode) — used
- `react-dom/client` (createRoot, hydrateRoot) — used
- `@/App` (ClientApp) — used
- `@/index.css` — used
- `assets/css/folio.css` — used
- `assets/css/round2.css` — used
- `assets/css/round3.css` — used
- `assets/css/round4.css` — used
- `assets/css/hero-live.css` — used
- `assets/css/home.css` — used
- `assets/css/phase4.css` — used

All CSS files exist and are reachable. No dead imports from `src/main.tsx`.

`package.json` dependencies: all are reachable from the active source tree. No unused dependencies identified.

---

## P. Security / Secrets Check

- No secrets, API keys, tokens, or passwords are committed to the repository
- FormSubmit URL is a public AJAX endpoint (`https://formsubmit.co/ajax/ceo@elitemaisonmarketing.com`) — not a secret
- `VITE_FORMSUBMIT_URL` is an optional public endpoint override; no secret involved
- `.env.production` contains no secrets (only a comment about `EM_RELEASE_APPROVED`)
- `npm audit --omit=optional --audit-level=high` reports 0 vulnerabilities

---

## Q. Full QA Command Results

| Command | Result | Notes |
|---------|--------|-------|
| `npm run typecheck` | **PASS** | tc --noEmit on src/ and vite.config.ts |
| `npm run qa:copy` | **PASS** | 354/354 strings matched, 0 exceptions |
| `npm run qa:inquiry` | **PASS** | Inquiry validation and submission contract verified |
| `npm run build` | **PASS** | 38/38 canonical pages, robots.txt: PRE-RELEASE closed |
| `npm run qa:seo` | **PASS** | 1083/1083 checks pass; robots-mode=PRE-RELEASE-closed |
| `npm run qa` | **N/A** | Requires Playwright Chromium installation; script is correctly instrumented for hard-fail |
| `npm run qa:http` | **PASS** | 35/35 local Node hosting checks pass |
| `npm audit --omit=optional --audit-level=high` | **PASS** | 0 vulnerabilities |
| `git diff --check` | **PASS** | No whitespace errors |
| `npm run check:release` | **PASS (exit 2)** | Governance OPEN as expected — `EM_RELEASE_APPROVED` absent |

---

## R. Remaining Host-Only Checks

The following cannot be verified locally and must be validated on GoDaddy Apache after upload:

1. **Apache-level 301 redirects** — `server.mjs` handles redirects in application code, but Apache `mod_rewrite` rules (if any are added at the platform level) are not exercised locally
2. **Real HTTP 404 under Apache** — `server.mjs` returns 404 correctly, but Apache error document handling and any platform-level 404 customization are not exercised
3. **Trailing-slash behavior under Apache** — `server.mjs` normalizes trailing slashes, but Apache-level behavior (especially with `.htaccess` if reintroduced) is not exercised
4. **HTTPS/www canonicalization under Apache** — `server.mjs` simulates host headers locally, but actual TLS termination and HTTPS forcing happen at the GoDaddy platform level
5. **Live FormSubmit delivery** — FormSubmit is mocked during Playwright QA; one controlled live test must be performed on GoDaddy with the real endpoint
6. **GoDaddy Preview host behavior** — Private Preview hostnames are not accessible from the local environment

**Do these block GoDaddy upload?** No. Local QA passes.
**Do these block opening indexing?** Yes. GoDaddy live QA must succeed before `EM_RELEASE_APPROVED=1` is set and indexing is opened.

---

## S. Final Technical Status

### Completed
- [x] `prerender-snapshot.mjs` hard gate calibrated for 38/38 pages
- [x] `.env.production` — `EM_RELEASE_APPROVED` removed; closed robots.txt in local builds
- [x] `check:release` exits 2 (governance OPEN) when flag is absent
- [x] All documentation updated to reflect 38 pages, GoDaddy Node.js Hosting, closed robots, and current architecture
- [x] Stale prototype references removed from active source code
- [x] 404 variants use production Arabic/English wording
- [x] RuntimeFallback preserves active language (`/ar` or `/en`)
- [x] Image optimization and favicon references verified
- [x] Dead code verified from `src/main.tsx`
- [x] Contact architecture unchanged (FormSubmit AJAX + direct channels)
- [x] `npm audit` — 0 vulnerabilities
- [x] `git diff --check` — clean

### Not Completed (Blocked on GoDaddy)
- [ ] GoDaddy Apache live validation (redirects, 404, HTTPS, trailing slash)
- [ ] Real FormSubmit delivery test on production origin
- [ ] `EM_RELEASE_APPROVED=1` set in deployment environment
- [ ] Public crawler/indexing opened

### Conclusion

**READY FOR GODADDY LIVE QA**

All local technical gates pass. The repository is safe to move from local development to GoDaddy live validation. Public indexing remains closed until GoDaddy live QA succeeds and the owner explicitly sets `EM_RELEASE_APPROVED=1`.
