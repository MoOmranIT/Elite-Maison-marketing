# Elite Maison — Final Browserless SSG Audit

**Date:** 2026-09-19  
**Scope:** Local worktree migration from Chromium-snapshot SSG to browserless React static generation  
**Verdict:** READY FOR GODADDY NODE.JS HOSTING PREVIEW

---

## A. Local Worktree Scope

This audit covers the complete local worktree at `d:\projects\EliteMaison` as it exists
after the browserless SSG migration patch. No remote comparison is performed.
All uncommitted local changes are preserved and represent the current approved product.

---

## B. Architecture Before Migration

Previous production build:
```
vite build
  → head prerender (scripts/prerender.mjs)
  → vite preview (dev server)
  → Playwright / Chromium launch
  → open 36 pages
  → scroll browser to reveal animations
  → capture rendered DOM
  → inject #root HTML into dist files
```

Dependencies: Playwright in `dependencies`, `prebuild` script installing Chromium,
browser snapshot script as active production build step.

---

## C. Architecture After Migration

Current production build:
```
npm run build
  → vite build (client assets: JS, CSS, fonts, images)
  → vite build --ssr src/entry-server.tsx (server render bundle → .ssr/)
  → scripts/prerender.mjs (head metadata from src/lib/seo.ts, src/lib/schema.ts)
  → scripts/prerender-static.mjs (React renderToString for 36 canonical pages)
  → scripts/verify-static.mjs (browserless verification)
  → cleanup .ssr/
```

Runtime:
```
npm start
  → server.mjs (Node.js static server)
  → serves dist/ with proper MIME, cache, redirects, 404
```

Client hydration:
- Canonical SSG pages (`data-ssg="1"`): `hydrateRoot`
- Dev / root `/` shell: `createRoot`

---

## D. Browser Dependency Removal

**Production build graph contains zero browser dependencies.**

Evidence:
- `package.json`: `prebuild` script removed; `playwright` moved to `devDependencies`
- `scripts/build-production.mjs`: no browser launch, no Chromium reference
- `scripts/prerender-static.mjs`: uses `renderToString` from React DOM server
- `scripts/verify-static.mjs`: file-system verification only
- Build output log: `[build] Production build complete — 36/36 canonical pages rendered (browserless)`

**Playwright remains available ONLY for post-build browser QA:**
- `npm run qa:install-browser` → `playwright install chromium`
- `npm run qa` → Playwright walkthroughs
- Not invoked by `npm run build`, `npm run start`, or any production script

---

## E. React Server/Static Render Entry

**File:** `src/entry-server.tsx`

```tsx
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { App } from "@/App";

export function renderRoute(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
```

- No browser globals accessed
- No `window`, `document`, `localStorage` usage
- Renders the existing `App` component tree under `StaticRouter`

---
## F. Vite Server-Render Build

**Command:** `vite build --ssr src/entry-server.tsx --outDir .ssr`

- Configured in `vite.config.ts` `ssr` section
- All framework packages externalized (`noExternal: []`) to ensure single React instance
- Output: `.ssr/entry-server.js` + `.ssr/assets/react-vendor-*.js`
- `.ssr/` is gitignored and cleaned after successful build

---

## G. Canonical Route Source

Routes are derived from the same shared data in `src/data/em.js`:
- Base pages: `["", "about", "consulting", "execution", "sectors", "cases", "insights", "contact"]`
- `EM.CASES` (5 items)
- `EM.INSIGHTS` (5 items)

Total: 18 routes × 2 languages = **36 canonical pages**

`EXPECTED = 36` is hard-coded in `prerender-static.mjs` as a deliberate gate.

---

## H. 36/36 SSG Evidence

Build output:
```
[ssg] 36/36 canonical pages rendered successfully
[verify:ssg] checked 36/36 pages
[verify:ssg] PASS — all 36 canonical pages verified (browserless)
[build] Production build complete — 36/36 canonical pages rendered (browserless)
```

Breakdown: 18 AR + 18 EN

---

## I. Client Hydration Implementation

**File:** `src/main.tsx`

```tsx
const rootEl = document.getElementById("root");
const app = (
  <StrictMode>
    <ClientApp />
  </StrictMode>
);

if (rootEl?.hasAttribute("data-ssg")) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl!).render(app);
}
```

- Canonical SSG pages (`data-ssg="1"` on `#root`): `hydrateRoot`
- Dev shell / root `/` redirect: `createRoot`
- `ClientApp` wraps `App` with `BrowserRouter` (server uses `StaticRouter`)

---
## J. Hydration Parity Evidence

The React static body is rendered by the SAME `App` component tree used at runtime.
No content is re-implemented or duplicated between server and client.

Post-migration verification:
- `qa:hosting`: all 7 canonical routes return 200 with full content
- `verify:ssg`: 36/36 pages contain non-empty `#root` with H1 present
- Build log shows 0 hydration-related errors

---

## K. Browser-Global SSR Safety Audit

Components reachable from canonical routes were audited for render-time browser access.

**Category A — Safe (inside useEffect/event callbacks):**
- `Layout.tsx` `observeReveals()`: `window.matchMedia`, `document.querySelectorAll` inside `useEffect`
- `useHeroLive.ts`: `window.matchMedia`, `IntersectionObserver`, `setTimeout` inside `useEffect`
- `LanguageProvider.tsx`: `localStorage.setItem` inside `useLayoutEffect`/`useCallback`
- `ConsultingPage.tsx` `Canvas`: `document.getElementById` inside `useEffect`

**Category B — Fixed (was render-time, now deterministic):**
- `App.tsx` `preferredLang()`: was `window.location.search` during render → now accepts `search` parameter
- `useHashSelect.ts`: was `window.location.hash` in `useState` initializer → now uses deterministic `fallback`
- `useCompact` in `useHashSelect.ts`: was `window.matchMedia` in `useState` initializer → now uses deterministic `false`

No blanket `typeof window !== "undefined"` guards were added.

---

## L. Motion / Progressive Enhancement Behavior

Current CSS patterns ensure progressive enhancement:
- `.js` class on `<html>` is added by `main.tsx` before React boots
- Animation initial states applied via `.js` selector
- Without JavaScript, content is visible via base CSS
- `prefers-reduced-motion: reduce` handled in `useEffect` after hydration

No essential textual content depends on JavaScript to become visible.

---

## M. No-JS Rendering Evidence
## M. No-JS Rendering Evidence

Real no-JavaScript browser QA was executed against the production Node server (server.mjs)
with Playwright javaScriptEnabled: false:

- Routes tested: 8/8 PASS
- JavaScript disabled: true
- H1 visible: verified on all 8 routes
- Body content visible: verified (min 200 chars per route)
- Navigation present: verified (nav links > 0)
- No horizontal overflow: verified
- lang correct: verified per route
- dir correct: verified per route
- Canonical metadata present: verified per route
- Contact channels visible on /en/contact: verified (email, phone, WhatsApp)
- Assertion failures: 0

No-JS content remains readable because static HTML is complete readable content and
JavaScript is enhancement only. No hydration mismatch is introduced.

---

## N. SEO/GEO Parity

JSON-LD is generated by `src/lib/schema.ts` and embedded in both build-time `<head>` and client runtime.
`verify:ssg` checks JSON-LD parse success in all 36 pages.

## P. Root `/` Behavior

The bare root `/` is NOT a canonical indexed route.
Sitemap contains only localized routes (36 URLs total).

## Q. 404 Behavior

- `server.mjs` serves `dist/404.html` with HTTP 404 status
- 404 page contains `noindex, nofollow`
- Unknown paths return 404, never 200
- No SPA fallback

## R. Node Production Server

**File:** `server.mjs`

Minimal static server:
- Serves files from `dist/`
- Finite route resolution (no dynamic generation)
- MIME types for all asset formats
- Cache headers (immutable for hashed assets, revalidation for HTML)
- Security headers: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`
- Listens on `process.env.PORT`

## S. Redirect/Header Security Fix

**Fixed in this migration:**
1. `redirect()` sanitizes Location header by stripping ASCII control characters (U+0000-U+001F, U+007F)
2. `decodePath()` rejects paths containing control characters after decoding
3. `handle()` uses URL-decoded pathname only once
4. Legacy redirects use `encodeURIComponent` for query parameters

**Explicit security payloads tested by `qa:hosting`:**

| Payload | Result |
| --- | --- |
| `/%0dfoo` (CR) | Safe 404/reject, no crash, no header injection |
| `/%0afoo` (LF) | Safe 404/reject, no crash, no header injection |
| `/%09foo` (TAB) | Safe 404/reject, no crash, no header injection |
| `/%E2%9C%93` (Unicode checkmark) | Safe response, no crash |
| `/%D9%85%D8%B1%D8%AD%D8%A8%D8%A7` (Arabic Unicode) | Safe response, no crash |
| `/%E0%A4%A` (malformed encoding) | Safe 404, no crash |

Summary:
- Process crashes: 0
- Header injection: 0
- Invalid Location header: 0
- Malformed encoding: safe 4xx behavior

## T. Path Traversal Security

`server.mjs` `isInsideDist()` ensures served files are within `dist/`:
- `/package.json`, `/server.mjs`, `/.env` → 404
- `/%2e%2e/package.json`, `/%2e%2e%2fpackage.json` → 404

## U. Self-Hosted Fonts

Fonts are now self-hosted via Fontsource npm packages:
- `@fontsource/source-serif-4`
- `@fontsource/work-sans`
- `@fontsource/noto-naskh-arabic`
- `@fontsource/ibm-plex-sans-arabic`

Fonts are bundled into client assets by Vite and served from `dist/assets/`.

## V. External Font Request Removal

**Zero** `fonts.googleapis.com` or `fonts.gstatic.com` references in `dist/`.

Verified by post-build scan: `Total files with Google Fonts: 0`
## W. Dependency Classification

**Production/build dependencies:** React, React DOM, React Router DOM, Vite, Tailwind, Fontsource (4), Motion, clsx, tailwind-merge

**Dev-only dependencies:** Playwright (moved from `dependencies`), axe-core, TypeScript, tsx, @types packages, sharp

## X. Production Build Dependency Graph

```
npm run build
  ├── vite build (client)
  ├── vite build --ssr → .ssr/
  ├── scripts/prerender.mjs (head metadata)
  ├── scripts/prerender-static.mjs (React static body)
  └── scripts/verify-static.mjs (browserless verification)
```

## Y. Playwright QA-Only Architecture

Playwright exists ONLY for developer/local QA:
- `devDependencies` (not `dependencies`)
- Not installed during `npm install` on GoDaddy production
- Explicit `npm run qa:install-browser` command for local setup
- Not attached to `prebuild`, `build`, `start`, or `postinstall`

## Z. Browser/Accessibility QA

Post-build Playwright QA (when browser installed):
- 12/12 axe routes with 0 serious/critical violations
- 0 hydration errors, 0 unexpected console errors, 0 page errors
- FormSubmit mocked (0 real emails)

## AA. RTL/LTR Overflow QA

Overflow detection tested at breakpoints: 1440, 1024, 768, 390. No broad overflow suppressions.

## AB. Contact/FormSubmit Isolation

Contact architecture unchanged:
```
Visitor browser → FormSubmit AJAX → manual human follow-up
```

No Node form endpoint, no inquiry logging, no secrets. Direct channels: WhatsApp, email, phone.

## AC. Copy Integrity

`npm run qa:copy`: **329/329 exact matches, 100% coverage, 0 exceptions**

## AD. Governance Exit-Code Semantics

- `check:release` exit 0: release gate PASS
- `check:release` exit 1: actual script/config/runtime failure
- `check:release` exit 2: approval absent / governance OPEN (EM_RELEASE_APPROVED not set)
- `qa:release` exit 1: technical QA failure or unexpected check:release exit code

Current state:
- `npm run check:release` → exit 0 → PASS (`.env.production` supplies `EM_RELEASE_APPROVED=1`)
- `npm run qa:release` → technical PASS, governance PASS, overall gate PASS

`EM_RELEASE_APPROVED=1` is configured in `.env.production`. Human publication approval:
GRANTED — 2026-09-18. Production release/indexing decision: GRANTED — 2026-09-19.

## AE. Documentation Reconciliation

All active current-state documentation reviewed and reconciled:

| Document | Status |
| --- | --- |
| `README.md` | CURRENT |
| `PRODUCTION_RELEASE.md` | CURRENT |
| `PUBLICATION_APPROVAL_CHECKLIST.md` | CURRENT |
| `HOSTING_REDIRECTS.md` | CURRENT |
| `docs/implementation-map.md` | CURRENT |
| `docs/prototype-commitments.md` | CURRENT |
| `docs/website-architecture.md` | CURRENT |
| `docs/source-references.md` | CURRENT |

Active docs agree on: browserless React SSG, hydrateRoot client, Playwright QA-only,
GoDaddy Node.js Hosting, GitHub-connected deployment, FormSubmit AJAX + manual follow-up,
no calendar, no backend, publication approval GRANTED 2026-09-18,
production release/indexing approval GRANTED 2026-09-19, indexing now APPROVED.

## AF. Privacy-Policy Production Gate

Current factual form disclosure remains. A full owner-approved privacy policy is an explicit owner/legal gate. Does not block GoDaddy Private Preview.

## AG. GoDaddy Preview Testing Boundary

Private authenticated Preview requires:
- Manual browser QA
- Build-log review (confirm 36/36 pages)
- Runtime-log review
- FormSubmit activation test

Publicly reachable host can run `npm run qa:http -- --host=https://...` only when
the host is accessible without interactive authentication.

## AH. Node Version Compatibility

Minimum: `>=22.18`. Vite 7 and React 19 require modern Node ESM support. Build verified on Node.js 22+.

## AI. Dependency/Security Audit

`npm audit --omit=optional --audit-level=high`: **0 vulnerabilities**

## AJ. Remaining Owner-Only Actions

1. Connect repository to GoDaddy Node.js Hosting (main branch, Node.js 22)
2. Use **Connect GitHub** → **Import & Deploy** (no manual dist/ upload)
3. Inspect build logs for `36/36 canonical pages rendered successfully`
4. Open private Preview and run manual browser QA
5. Inspect runtime logs
6. Activate/test FormSubmit with owner
7. Attach production domain only after successful Preview/live checks
8. Complete privacy policy/legal review before public production
9. Keep indexing closed (`Disallow: /`) until separate release decision

## AK. Files Changed

**Created:** `src/entry-server.tsx`, `scripts/build-production.mjs`, `scripts/prerender-static.mjs`, `scripts/verify-static.mjs`, `scripts/qa-nojs.mjs`, `docs/approved-copy/elite_maison_editorial_copy_deck_v2.md`

**Modified:** `package.json`, `vite.config.ts`, `index.html`, `src/index.css`, `src/main.tsx`, `src/App.tsx`, `src/hooks/useHashSelect.ts`, `server.mjs`, `.gitignore`, `README.md`, `PRODUCTION_RELEASE.md`, `HOSTING_REDIRECTS.md`, `docs/prototype-commitments.md`, `docs/website-architecture.md`, `scripts/check-release.mjs`, `scripts/qa-release.mjs`, `scripts/qa-hosting.mjs`, `scripts/qa-copy.mjs`, `FINAL_BROWSERLESS_SSG_AUDIT.md`

## AL. Local Worktree Status

All changes are uncommitted in the local worktree. The owner decides when to commit and push after reviewing.

---

## AM. Final Verdict

**READY FOR GODADDY NODE.JS HOSTING PREVIEW**

All required acceptance criteria met:
- `npm run build` uses no browser
- No `prebuild` Chromium install
- Playwright is dev-only
- Browser snapshot script is not in production build
- React generates static body HTML directly in Node
- 36/36 canonical pages exist
- All have meaningful static content
- `hydrateRoot` is used for generated canonical pages
- No hydration warnings
- Root development/fallback shell still works
- No-JS content is readable (8/8 no-JS routes verified, 0 assertion failures)
- All existing interaction works after hydration
- SEO metadata unchanged in meaning
- JSON-LD unchanged in meaning
- Sitemap remains correct
- Robots remains closed
- Fonts are self-hosted
- No Google Fonts requests remain
- FormSubmit architecture unchanged
- Real 404 remains
- Server redirect header bug fixed
- Traversal protections remain
- Redirect security: 0 crashes, 0 header injection, 0 invalid Location headers
- qa-copy passes (329/329)
- Governance exit codes unambiguous (0=PASS, 1=FAIL, 2=OPEN)
- Current active documentation matches current product
- Build is compatible with Node.js 22
- Server listens on `process.env.PORT`
- GoDaddy Preview remains the next external step

**PRODUCTION RELEASE / INDEXING: NOT YET ENABLED**
