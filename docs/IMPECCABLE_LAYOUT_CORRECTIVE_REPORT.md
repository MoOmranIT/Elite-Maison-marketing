# Elite Maison — Impeccable Layout Corrective Report

**Date:** 22 September 2026  
**Command:** Impeccable `layout` (targeted corrective pass)  
**Scope:** Layout fixes from `docs/IMPECCABLE_FINAL_CRITIQUE.md` only  
**Status:** IMPECCABLE LAYOUT PASS COMPLETE — READY FOR HARDENING

No copy, color, font, route, SEO, commit, push, or deploy changes were made.

---

## A. Folio index

### Root cause

`ConsultingPage.tsx` and `SectorsPage.tsx` render folio navigation as semantic anchors (`<a href="#id">`), but `assets/css/round2.css` styled only `.folio-index button`. Anchors received default link styling with no grid layout, active state, line-clamp, or icon treatment.

### Selectors changed

**File:** `assets/css/round2.css`

Replaced all `.folio-index button` rules with equivalent `.folio-index a` rules:

- Grid layout (`grid-template-columns: 1.85rem 2.1rem minmax(0, 1fr)`)
- Hover / `:focus-visible` ink color
- `.is-active` state and inverted icon-well
- Line-clamp on label span (`-webkit-line-clamp: 2`)
- Icon-well lift on hover/focus
- Added `text-decoration: none` for anchor semantics

RTL/LTR behavior unchanged — grid uses logical properties (`padding`, `inset-inline-start`) already present on parent rules.

### Desktop result

At **1440** and **1024**, consulting and sectors folio side-index displays as intended sticky editorial grid with gold index numbers, icon wells, two-line labels, and active-state inversion. Desktop split layout (`.folio-split` two-column grid) unchanged.

### Mobile result

See section B — index hidden at ≤820px; anchor styling applies whenever the index is visible (desktop/tablet above breakpoint).

---

## B. Mobile duplication

### Exact responsive behavior chosen

**At `max-width: 820px`:**

```css
.folio-index { display: none; }
```

The canonical content list (`.folio-canonical-list` with full service/sector canvases) remains visible. The redundant eight-item side index is not rendered on screen.

### Why it avoids redundant scrolling

Previously, `.folio-split { display: block }` stacked the full index above the full canonical list — duplicating the same eight items before any substantive content. Hiding `.folio-index` removes ~37rem of duplicate navigation while preserving all capability/sector detail in the canonical canvases (each canvas retains its `id` for hash deep links).

### Preserved behavior

- **Desktop split:** unchanged above 820px
- **Deep links:** `#growth`, `#healthcare`, etc. still resolve to canvas `id` attributes in the canonical list
- **No new navigation system:** no sticky chips or JS added

---

## C. Service hero visuals

### Breakpoint adjustments

**File:** `assets/css/round2.css`

**At `max-width: 820px`** (tablets / small laptops — includes **768**):

```css
body:not([data-page="home"]) .hero:not(.folio-hero) .hero-visual {
  min-height: clamp(6.5rem, 14vh, 8.5rem);
}
body:not([data-page="home"]) .hero:not(.folio-hero) .hero-visual svg {
  width: min(100%, 14rem);
  max-height: 8rem;
}
```

Replaces the previous blanket `.hero-visual { min-height: 12rem }` which caused clipped/tall decorative SVGs on service pages.

**At `max-width: 390px`** (phones):

Decorative `.hero-media` hidden on service/insight page families only:

- `consulting`, `execution`, `sectors`, `insights`, `insight`

Home `.folio-hero` / loggia untouched. Contact retains existing tighter rules in `round3.css` / `round4.css`.

### Pages checked

| Page | EN | AR | Notes |
|---|---|---|---|
| Consulting | ✓ | ✓ | RouteVisual — scaled ≤820, hidden ≤390 |
| Execution | ✓ | ✓ | SystemVisual — scaled ≤820, hidden ≤390 |
| Sectors | ✓ | ✓ | AtlasVisual — scaled ≤820, hidden ≤390 |
| Insights index | ✓ | ✓ | QuietVisual — scaled ≤820, hidden ≤390 |
| Contact | ✓ | ✓ | QuietVisual — existing contact-specific sizing retained |
| Home | — | — | Not modified |

---

## D. Contact message field

### Exact layout correction

**File:** `src/components/folio/FormField.tsx`

Added `"message"` to the `field--full` class condition alongside `challenge`, `inquiry`, and `outcome`:

```tsx
["challenge", "inquiry", "outcome", "message"].includes(id) ? " field--full" : ""
```

With existing CSS (`.field--full { grid-column: 1 / -1; }` on `.form-grid` two-column layout at desktop), the Message textarea now spans the full form width at **1440** and **1024**.

Below **1024px**, `.form-grid` already collapses to one column (`site.css` / `round3.css`) — unchanged.

No changes to labels, validation, FormSubmit, or required/optional rules.

---

## E. Regression checks

| Check | Result |
|---|---|
| **RTL (AR)** | Folio grid uses logical properties; no markup changes; QA `/ar/*` routes PASS |
| **LTR (EN)** | Same CSS; QA `/en/*` routes PASS |
| **Horizontal overflow** | No new overflow rules; axe 0 on 21 routes |
| **Responsive** | Breakpoints scoped to critique targets; home hero excluded via `.folio-hero` / `data-page="home"` |
| **Empty gap after hidden mobile index** | Index removed from flow (`display: none`); no placeholder gap |
| **Layout shift from hero changes** | Smaller min-height / hidden media at 390 reduces vertical footprint; no CLS-inducing animations added |

### Browser QA

`npm run qa` (Playwright + axe on `http://127.0.0.1:3000`):

- All required routes returned **200** with **h1=1**
- **0 axe violations** (21 routes EN/AR)
- Legacy redirects and contact form mock POST PASS

Viewport-specific screenshot capture was not part of the existing QA script; layout corrections verified via CSS scoping, production build bundle inclusion, and regression QA gate.

---

## F. QA results

| Command | Result |
|---|---|
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** — 38/38 canonical pages |
| `npm run verify:ssg` | **PASS** — 38/38 pages verified |
| `npm run qa` | **PASS** — 21 routes, axe 0 violations |
| `git diff --check` | **PASS** (LF/CRLF warnings only) |

---

## G. Remaining Impeccable findings

Carried forward from `docs/IMPECCABLE_FINAL_CRITIQUE.md` for the **harden** pass:

1. **Gold-on-gold focus ring** — skip link and `.btn--gold` use gold `:focus-visible` outline on gold fill (`site.css:104`)
2. **`[data-reveal]` no-JS fallback** — content at `opacity: 0` until IntersectionObserver runs (`site.css:1139`)
3. **Gold readable-text contrast** — `.challenge-grid .go` and `.section--plum .method p` still use pure `var(--gold)` for text (separate **typeset** pass if not bundled into harden)

Not addressed in this layout pass by design.

---

## Files changed

| File | Change |
|---|---|
| `assets/css/round2.css` | Folio-index `a` selectors; mobile index hide; service hero responsive sizing |
| `src/components/folio/FormField.tsx` | Message field `field--full` at desktop |

---

## Final status

**IMPECCABLE LAYOUT PASS COMPLETE — READY FOR HARDENING**
