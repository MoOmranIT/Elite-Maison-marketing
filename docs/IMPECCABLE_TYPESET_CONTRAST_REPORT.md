# Elite Maison — Impeccable Typeset Contrast Report

**Date:** 22 September 2026  
**Command:** Impeccable `typeset` (readable-text contrast only)  
**Scope:** `.challenge-grid .go` and `.section--plum .method p` from prior Impeccable passes  
**Status:** IMPECCABLE TYPESET CONTRAST PASS COMPLETE — READY FOR FINAL POLISH

No typography redesign, copy, layout, palette, font, route, SEO, commit, push, or deploy changes were made.

---

## A. `.challenge-grid .go`

### Root cause

Readable interactive link text used pure decorative gold (`var(--gold)`) on a light ivory card surface. The existing readable gold-toned token `--gold-ink` (defined in `round4.css`) was already used for index numbers but not for `.go` link labels.

### Change

**File:** `assets/css/site.css`

```css
.challenge-grid .go { margin-top: auto; padding-top: 1rem; color: var(--gold-ink); }
```

Gold accent behavior preserved via existing `.go::after` underline, icon-well hover inversion, and global `.go:hover / :focus-visible { color: var(--ink); }` rules. No link layout or motion changes.

### Measured contrast (Playwright, injected challenge-grid fixture)

| Field | Before | After |
|---|---|---|
| **Foreground** | `rgb(217, 165, 55)` (`var(--gold)`) | `color(srgb 0.321 0.293 0.191)` ≈ `rgb(82, 75, 49)` (`var(--gold-ink)`) |
| **Background** | `rgb(243, 238, 232)` (challenge card) | same |
| **Contrast ratio** | ~2.8:1 (insufficient for normal text) | **7.56:1** |

Verified at 1440×900, 768×1024, and 390×844 on `/ar`, `/en`, `/ar/about`, `/en/about`.

### Hover / focus verification

- **Hover:** global `.go:hover { color: var(--ink); }` unchanged — ink on light card
- **Focus-visible:** 2px gold outline preserved (`outline-width: 2px` confirmed in QA)
- **RTL/LTR:** icon shift and underline motion unchanged (`html[dir="ltr|rtl"] .go:hover .icon` rules untouched)

---

## B. `.section--plum .method p`

### Root cause

Body paragraphs inside Four I's method cards were forced to pure gold via a selector that also competed with `.method p { color: var(--muted); }`. Decorative gold is reserved for kickers, rules, icons, and numbers — not body copy on plum.

### Change

**Removed:**

```css
.section--plum .method p { color: var(--gold); }
```

**Added (body copy only; kickers excluded):**

```css
.section--plum .method article > p:not(.kicker) {
  color: var(--ivory);
}
```

`--gold-ink` was evaluated but rejected for this surface: body copy sits on a plum section with a translucent ivory article panel; full ivory on the composited plum background meets contrast and matches existing plum-section body patterns. Kickers retain `var(--gold)` via `.section--plum .kicker`.

### Measured contrast (About page, `/ar/about` and `/en/about`)

| Field | Before | After |
|---|---|---|
| **Foreground** | `rgb(217, 165, 55)` (`var(--gold)`) | `rgb(242, 236, 230)` (`var(--ivory)`) |
| **Background** | `rgb(50, 16, 46)` (composited `var(--plum)` section) | same |
| **Contrast ratio** | ~7.5:1 (passed WCAG but violated brand readable-text rule) | **14.34:1** |

Verified at 1440×900, 768×1024, and 390×844 in AR and EN.

### Scope audit

| Selector | Override risk | Result |
|---|---|---|
| `.challenge-grid .go` | none elsewhere | only `site.css` |
| `.section--plum .method p` | replaced by narrower `article > p:not(.kicker)` | kickers + gold rules unaffected |
| `body[data-page="about"] .section--plum .method article .kicker` | `phase4.css` typography sizing only | no color conflict |
| `.method p { color: var(--muted); }` | lower specificity than new plum body rule | body copy resolves to ivory |

No site-wide recoloring was introduced.

---

## C. Brand integrity

Confirmed unchanged:

- Font families, weights, scale, heading hierarchy, line-height system
- Home hero, copy, layout, spacing, motion language
- Global brand palette and gold accent roles (rules, icons, numbers, kickers)
- Routes and SEO

Gold remains decorative/accent on kickers, `.gold-rule`, icon-wells, and `.challenge-grid .num`. Readable text now uses `--gold-ink` (light surfaces) or `--ivory` (plum section body).

---

## D. Browser verification

| Route | Viewports | Checks |
|---|---|---|
| `/ar`, `/en` | 1440, 768, 390 | challenge-grid `.go` contrast + focus |
| `/ar/about`, `/en/about` | 1440, 768, 390 | plum method body contrast; kickers still gold |

- RTL/LTR parity: verified via existing QA routes (AR + EN)
- No typography reflow or wrapping regressions observed
- axe: **0 violations** on 21 routes (includes `/ar/about`, `/en/about`)

---

## E. QA results

| Command | Result |
|---|---|
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** — 38/38 canonical pages |
| `npm run verify:ssg` | **PASS** — 38/38 pages verified |
| `npm run qa` | **PASS** — 21 routes, axe 0 violations |
| `npm run qa:harden` | **PASS** — focus + reveal regressions covered |
| `npm run qa:typeset` | **PASS** — contrast contract + measured ratios |
| `git diff --check` | **PASS** (LF/CRLF warnings only) |

### Regression coverage added

| Script | Assertions |
|---|---|
| `scripts/qa-typeset-contrast.mjs` (`npm run qa:typeset`) | CSS contract; `.challenge-grid .go` ≥ 4.5:1; `.section--plum .method article > p:not(.kicker)` ≥ 4.5:1; focus outline on `.go`; AR/EN × 3 viewports |

---

## F. Remaining Impeccable findings

All material issues from `docs/IMPECCABLE_FINAL_CRITIQUE.md` addressed across layout, hardening, and this typeset pass:

- Folio side-index styling — **resolved** (layout pass)
- Gold-on-gold focus — **resolved** (hardening pass)
- Mobile service-page index duplication — **resolved** (layout pass)
- Service hero mobile sizing — **resolved** (layout pass)
- Contact message width — **resolved** (layout pass)
- `[data-reveal]` no-JS resilience — **resolved** (hardening pass)
- Gold readable-text contrast (`.challenge-grid .go`, `.section--plum .method p`) — **resolved** (this pass)

No material visual issue from the original critique remains unresolved.

---

## Files changed (typeset pass only)

| File | Change |
|---|---|
| `assets/css/site.css` | `.challenge-grid .go` → `--gold-ink`; plum method body → `--ivory`; removed gold body override |
| `scripts/qa-typeset-contrast.mjs` | New contrast regression gate |
| `package.json` | Added `qa:typeset` script |

---

## Final status

**IMPECCABLE TYPESET CONTRAST PASS COMPLETE — READY FOR FINAL POLISH**
