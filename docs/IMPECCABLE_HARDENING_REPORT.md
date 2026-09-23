# Elite Maison — Impeccable Hardening Report

**Date:** 22 September 2026  
**Command:** Impeccable `harden` (resilience + accessibility only)  
**Scope:** Focus visibility + reveal resilience from `docs/IMPECCABLE_FINAL_CRITIQUE.md`  
**Status:** IMPECCABLE HARDENING COMPLETE — READY FOR TYPESET CONTRAST PASS

No copy, layout, palette, font, route, SEO, commit, push, or deploy changes were made.

---

## A. Focus visibility

### Root cause

Global `:focus-visible` in `assets/css/site.css` uses `outline: 2px solid var(--gold)` with `outline-offset: 3px`. Gold-filled controls (`.btn--gold`, `.skip-link`) also use `background: var(--gold)`, so keyboard focus produced a gold ring on a gold fill — indistinguishable in practice.

### Selectors changed

**File:** `assets/css/site.css`

```css
.btn--gold:focus-visible,
.skip-link:focus-visible {
  outline-color: var(--ink);
}
```

No other button styling was modified. Non-gold surfaces retain the existing gold `:focus-visible` treatment.

### Final focus behavior

| Control | Surface | Focus outline |
|---|---|---|
| `.btn--gold` (Home primary CTA, Contact submit, header/drawer CTAs) | Gold fill | Ink/navy (`var(--ink)`) — 2px outline, 3px offset preserved |
| `.skip-link` | Gold fill | Ink/navy (`var(--ink)`) |
| Light/ink surfaces (nav, lang switch, secondary `.go`, form fields, footer links) | Ivory/sky/transparent | Existing gold outline — sufficient contrast |

**Verified computed values (Playwright, `/en`):**

- Skip link: outline `rgb(6, 24, 45)` on bg `rgb(217, 165, 55)` — Δ≈254
- Home primary CTA: same ink-on-gold contrast
- Contact submit: same ink-on-gold contrast
- Secondary CTA, header nav, lang switch, footer links: 2px visible outline (gold on non-gold surfaces)
- Contact name/email/message: ink outline on light field surfaces

---

## B. Reveal resilience

### Previous failure mode

`.js [data-reveal]:not(.is-visible) { opacity: 0 }` hid scroll-reveal content as soon as the `js` class was added in `main.tsx`. If JavaScript was disabled, `IntersectionObserver` was unavailable, observer setup threw, or initialization was delayed, substantive content could remain at `opacity: 0`.

### Initialization strategy

**File:** `src/components/layout/Layout.tsx`

1. Content is **visible by default** (no hide rule without readiness).
2. `observeReveals()` runs after a short frame delay on route change.
3. On successful observer setup:
   - `primeInView()` marks in-viewport nodes `.is-visible` first
   - `<html>` receives `reveal-ready`
   - Remaining nodes are observed
4. Fallback paths call `revealAll()` **without** adding `reveal-ready`:
   - `prefers-reduced-motion: reduce`
   - `IntersectionObserver` unavailable
   - Observer constructor/setup throws (try/catch)
5. Cleanup on route change removes `reveal-ready` and disconnects the observer.

**File:** `assets/css/site.css` + `assets/css/round4.css`

- Hide rule moved from `.js [data-reveal]` to `.reveal-ready [data-reveal]`
- Animation triggers similarly gated on `.reveal-ready`
- Reduced-motion reset extended to force `.reveal-ready [data-reveal]` visible

### No-JS behavior

Without JavaScript, `reveal-ready` is never added. All `[data-reveal]` nodes remain at default opacity. SSG HTML is fully readable.

### Observer-failure behavior

When `IntersectionObserver` is deleted or forced to throw, `reveal-ready` is not set (or is removed in catch), and all reveal targets are marked `.is-visible`. Zero nodes stuck hidden.

### Reduced-motion behavior

When `prefers-reduced-motion: reduce` matches, `revealAll()` runs immediately without `reveal-ready`. CSS reduced-motion block also forces opacity 1 on any reveal nodes.

---

## C. Browser verification

### Languages & routes

| Route | AR | EN |
|---|---|---|
| `/` (home) | ✓ | ✓ |
| `/about` | ✓ (qa gate) | ✓ (qa gate) |
| `/consulting` | ✓ | ✓ |
| `/contact` | ✓ | ✓ |

### Viewports

Existing `npm run qa` overflow capture at **1440×900**, **768×1024**, and **390×844** — no new horizontal overflow detected (21 routes, axe 0).

### Keyboard checks

Programmatic focus verification via `npm run qa:harden` on production `dist/`:

| Control | Result |
|---|---|
| Skip link | PASS — ink outline on gold |
| Home primary CTA (`.btn--gold`) | PASS — ink on gold |
| Home secondary CTA (`.go`) | PASS — gold outline visible |
| Header navigation | PASS — gold outline visible |
| Language switch | PASS — gold outline visible |
| Contact form (name, email, message) | PASS — ink outline visible |
| Contact submit (`.btn--gold`) | PASS — ink on gold |
| Footer links | PASS — gold outline visible |

Focus order remains logical in both AR and EN (RTL/LTR verified in no-JS and full QA gates).

### No-JS checks

`npm run qa:nojs` with JavaScript disabled against production server:

| Route | Status | Reveal stuck |
|---|---|---|
| `/ar` | 200 | 0 |
| `/en` | 200 | 0 |
| `/ar/consulting` | 200 | 0 |
| `/en/consulting` | 200 | 0 |
| `/ar/contact` | 200 | 0 |
| `/en/contact` | 200 | 0 |

All substantive content visible; no sections at `opacity: 0`; navigation and SSG HTML remain useful.

---

## D. QA

| Command | Result |
|---|---|
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** — 38/38 canonical pages |
| `npm run verify:ssg` | **PASS** — 38/38 pages verified |
| `npm run qa` | **PASS** — 21 routes, axe 0 violations |
| `npm run qa:nojs` | **PASS** — 10 routes, 0 reveal-stuck nodes |
| `npm run qa:harden` | **PASS** — CSS contract + focus + reveal failure modes |
| `git diff --check` | **PASS** (LF/CRLF warnings only) |

### Regression coverage added

| Script | Assertions |
|---|---|
| `scripts/qa-harden.mjs` (`npm run qa:harden`) | Gold-filled focus uses ink; no `.js`-only reveal hide; IO-missing / observer-throw / reduced-motion leave content visible; no-JS reveal visibility on 6 required routes |
| `scripts/qa-nojs.mjs` (extended) | Required consulting/contact routes; `[data-reveal]` not stuck at opacity &lt; 0.5 on every route |

---

## E. Remaining Impeccable issue

Carried forward for the **typeset contrast pass** (not modified in this harden pass):

**Gold readable-text contrast:**

- `.challenge-grid .go`
- `.section--plum .method p`

These selectors still use pure `var(--gold)` for readable body text on light/plum grounds.

---

## Files changed (hardening pass only)

| File | Change |
|---|---|
| `assets/css/site.css` | Ink focus on gold fills; reveal hide gated on `.reveal-ready` |
| `assets/css/round4.css` | Rise animation gated on `.reveal-ready` |
| `src/components/layout/Layout.tsx` | Robust reveal init with readiness class + fallbacks |
| `scripts/qa-harden.mjs` | New hardening regression gate |
| `scripts/qa-nojs.mjs` | Reveal visibility assertions + required routes |
| `package.json` | Added `qa:harden` script |

---

## Final status

**IMPECCABLE HARDENING COMPLETE — READY FOR TYPESET CONTRAST PASS**
