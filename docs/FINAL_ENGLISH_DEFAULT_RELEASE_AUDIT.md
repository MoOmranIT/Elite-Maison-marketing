# Final English-Default Release Audit

**Date:** 2026-09-25  
**Branch:** `main`  
**Baseline commit:** `b97bd80 fix some phases`  
**Scope:** Reverse default locale from Arabic to English; preserve `/ar/...` and `/en/...` bilingual architecture; final pre-commit release audit of accumulated approved work.

---

## A. Default-language changes

Active files changed to reverse default/fallback from `ar` → `en`:

| File | Change |
|---|---|
| `src/lib/i18n-path.ts` | Added `DEFAULT_LANG = "en"` |
| `src/context/LanguageProvider.tsx` | Fallback chain: URL prefix → `savedLang()` → `DEFAULT_LANG` (`en`) |
| `src/App.tsx` | `fallbackLang()` replaces `preferredLang()`; query `?lang=` → localStorage → `en` |
| `src/lib/routes.ts` | `toRoute(..., lang = "en")` (was `"ar"`) |
| `src/components/seo/SeoHead.tsx` | `hreflang="x-default"` → English alternate URL |
| `scripts/prerender.mjs` | Root canonical → `/en`; all `x-default` → English URLs |
| `index.html` | Shell `lang="en" dir="ltr"`; English meta; root canonical `/en` |
| `server.mjs` | All legacy `.html` / `case.html` / `insight.html` defaults → `/en/...` |
| `public/sitemap.xml` | Reciprocal alternates retained; `x-default` → English URL per entry |
| `scripts/qa-seo.mjs` | Assertions: `hreflang-xdefault-en`, `shell-canonical-en` |
| `scripts/qa-hosting.mjs` | Legacy redirect expectations → English |
| `scripts/qa-playwright.mjs` | `LEGACY_ALIASES` expect `/en`; clears `localStorage["em-lang"]` before alias tests |
| `README.md` | Documents English default and precedence chain |
| `HOSTING_REDIRECTS.md` | Legacy default + root canonical policy → English |
| `docs/implementation-map.md` | Legacy case mapping note updated |

**Explicit Arabic routes preserved (unchanged):** `/ar/...` hreflang alternates, Arabic prerender HTML (`lang="ar" dir="rtl"`), Arabic canonical self-references.

**Historical audit reports** (e.g. `docs/phase3-seo-audit.md`, `PHASE5_AUDIT_REPORT.md`) were **not** rewritten; they record the prior Arabic-default era.

### Accumulated approved content (same commit)

| Area | Files |
|---|---|
| Copy/runtime | `src/data/em.js`, `docs/approved-copy/elite_maison_editorial_copy_deck_v2.md` |
| Pages | `AboutPage`, `ConsultingPage`, `ExecutionPage`, `CasesPage`, `HomePage` |
| Home hero | `HomePage.tsx`, `assets/css/folio.css`, `assets/css/home.css`, `sections.tsx`, `public/assets/images/home-hero-four-is.{jpg,webp,avif}` |

---

## B. Runtime behavior

Verified against production `server.mjs` + built `dist/` (Playwright on port 4183/4190).

| Case | Result |
|---|---|
| `/` (no saved language) | **PASS** → client navigates to `/en` |
| `/?lang=ar` | **PASS** → `/ar` |
| `/?lang=en` | **PASS** → `/en` |
| `/ar`, `/ar/about` | **PASS** — stays Arabic (`dir=rtl`) |
| `/en`, `/en/about` | **PASS** — stays English (`dir=ltr`) |
| Language switcher `/en/consulting` ↔ `/ar/consulting` | **PASS** |
| Deep routes `/en/cases/bloom` ↔ `/ar/cases/bloom` | **PASS** |
| Deep routes `/en/insights/ai-insight` ↔ `/ar/insights/ai-insight` | **PASS** |
| Legacy `/about.html` | **PASS** → 301 `/en/about` |
| Legacy `/case.html?id=patchouli` | **PASS** → 301 `/en/cases/patchouli` |
| Legacy `/insight.html?id=ai-insight` | **PASS** → 301 `/en/insights/ai-insight` |
| Unknown route | **PASS** — HTTP 404, branded noindex document |
| Precedence preserved | URL prefix beats saved preference; saved preference beats fallback |

---

## C. SEO

| Check | Result |
|---|---|
| Root shell canonical | `https://www.elitemaisonmarketing.com/en` |
| `x-default` policy | All canonical pages → matching **English** URL |
| Arabic `hreflang="ar"` | Unchanged — self `/ar/...` |
| English `hreflang="en"` | Unchanged — self `/en/...` |
| Sitemap URL count | **38** (19 AR + 19 EN); no bare `/` |
| Sitemap alternates | Reciprocal `ar` / `en` / `x-default` on every entry |
| `public/sitemap.xml` ↔ build | Synchronized (English `x-default`) |
| Prerendered pages | **38/38** verified (`npm run verify:ssg`) |
| Indexing | **Still closed** — `robots.txt` → `Disallow: /` (pre-release) |

---

## D. Full QA results

| Command | Result |
|---|---|
| `npm run typecheck` | **PASS** |
| `npm run qa:i18n` | **PASS** (58 keys, 0 missing) |
| `npm run qa:copy-contract` | **PASS** |
| `npm run qa:copy` | **PASS** (359/359) |
| `npm run qa:inquiry` | **PASS** |
| `npm run build` | **PASS** (38/38 canonical pages) |
| `npm run verify:ssg` | **PASS** (38/38) |
| `npm run qa:seo` | **PASS** (1083 static checks) |
| `npm run qa:phase3b` | **PASS** (190 assertions) |
| `npm run qa:phase3c1` | **PASS** (56 assertions) |
| `npm run qa:nojs` | **PASS** |
| `npm run qa:harden` | **PASS** |
| `npm run qa:typeset` | **PASS** |
| `npm run qa:hosting` | **PASS** (local Node server) |
| `npm run qa` | **PASS** (21 routes axe, legacy aliases, flows) |
| `npm audit --omit=optional --audit-level=high` | **PASS** (0 vulnerabilities) |
| `git diff --check` | **PASS** (CRLF warnings only) |
| `npm run check:release` | **EXPECTED GOVERNANCE OPEN** (exit 2 — `EM_RELEASE_APPROVED` unset) |

**Production server acceptance (`npm start` / `server.mjs`):** Covered by `qa:hosting` and `qa` against built `dist/` — 200 on `/ar` and `/en`, one-hop legacy 301s to English, slash normalization, real 404, MIME types, path traversal blocks, HEAD/GET, no source exposure.

**Language-default acceptance (ad-hoc, session):** All 9 cases **PASS** (root, query overrides, explicit routes, switcher, deep case/insight parity).

---

## E. Release status

| Gate | Status |
|---|---|
| **LOCAL TECHNICAL READINESS** | **PASS** |
| **PUBLIC DEPLOYMENT READINESS** | **BLOCKED BY** GoDaddy Preview/live QA, live SSL/DNS/headers verification, FormSubmit recipient activation and authorized live delivery test |
| **INDEXING READINESS** | **WAITING FOR** owner `EM_RELEASE_APPROVED=1` in deployment environment after successful live QA; `.env.production` intentionally keeps crawling closed locally |

### External / operational items (not verified in this session)

- GoDaddy Node.js Preview deployment and manual browser QA on private preview URL
- FormSubmit inbox activation and controlled live submission (browser QA uses mocked intercept only)
- Privacy policy / legal review sign-off for public launch
- Live apex/www SSL and security headers on production host

---

## F. Commit

**Created:** yes  
**SHA:** Confirm with `git log -1 --oneline` on `main`  
**Message:** `Finalize bilingual content and set English as default locale`  
**Files:** 29 (approved copy/pages, home hero assets, English-default routing/SEO/server/QA/docs, audit report)

Working tree after commit: clean (ignored/local-only artifacts such as `dist/`, `.qa/` excluded from commit).

---

## G. No-go actions confirmed

| Action | Status |
|---|---|
| Push to remote | **Not performed** |
| Deploy | **Not performed** |
| Indexing activation | **Not performed** (`EM_RELEASE_APPROVED` unset) |
| Real FormSubmit send | **Not performed** (mocked in QA) |
| Destructive Git operations | **Not performed** (no fetch/pull/reset/stash/clean) |
| Humanizer | **Not run** |
| `.env.production` indexing change | **Not modified** |

---

## Summary

```
DEFAULT LANGUAGE:     ENGLISH
ARABIC:               FULLY AVAILABLE AT /ar/...
ENGLISH:              FULLY AVAILABLE AT /en/...
X-DEFAULT:            ENGLISH
ROOT CANONICAL:       /en
38/38 CANONICAL PAGES: VERIFIED
INDEXING:             STILL CLOSED UNTIL LIVE RELEASE GATE
```
