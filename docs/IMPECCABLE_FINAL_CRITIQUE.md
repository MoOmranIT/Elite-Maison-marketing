# Elite Maison — Impeccable Final Visual Critique

**Date:** 22 September 2026  
**Command:** Impeccable `critique` (audit only)  
**Method:** dual-agent (Assessment A: design review · Assessment B: detector + CSS audit)  
**Scope:** Post copy + Humanizer pass · no code changes · no deploy  
**Evidence:** Source (`src/`, `assets/css/`), Playwright QA notes (21 routes, axe 0 violations), Impeccable `detect` on `src/` → `[]`

---

## 1. Overall verdict

The site reads as **one coherent premium editorial system** across EN and AR. Ink headlines, ivory/sky grounds, gold as line/number/icon accent, architectural framing, and restrained motion all align with the brand direction. Locked home decisions (ink hero, restrained gold, credibility strip placement, Arabic method rail) are implemented correctly and should not be revisited.

The experience is **near launch-ready**, not fully there. Material gaps are **layout and interaction polish**, not brand identity or copy. Three issues stand out: (1) consulting/sectors folio side-index styling does not apply to anchor markup, (2) keyboard focus rings can disappear on gold-filled controls, (3) mobile service pages stack a full index plus full content list, creating long redundant scroll. None of these require redesign — targeted CSS/layout and accessibility hardening would close the gap.

---

## 2. Keep unchanged

Do **not** touch these — they are among the strongest parts of the current system:

| Area | Why it works |
|---|---|
| **Home hero** | Ink headline at intentional scale; gold limited to rule/accent; no decorative EN italics; locked copy renders cleanly |
| **Credibility strip** | `18+` / GCC sits directly below hero and above results — reads as proof continuation, not a detached module |
| **Impact ledger** | Editorial list with gold indices; avoids generic card-grid templating |
| **Home method rail** | Arabic stage titles (`نشخّص → نرتّب → ننفّذ → نقيس ونحسّن`) and locked method headline rhythm |
| **Four I's section** | Locked heading; calm editorial framing |
| **Page hero shell** | `PageHero` + `GoldRule` + kicker pattern consistent on consulting, execution, sectors, insights, contact, about |
| **Cases / insights index** | `editorial-list` / `editorial-row` — scannable, on-brand |
| **Case & insight detail** | Story-column flow (challenge → strategy → execution → result → proof); plum/ink section alternation |
| **Chrome** | Sticky topbar, lang switch, drawer, breadcrumbs, RTL mirroring |
| **Motion discipline** | Scroll-linked skyfield, draw rules, comprehensive `prefers-reduced-motion` resets |
| **Accessibility baseline** | Skip link, 44px touch targets on primary controls, contact form ARIA wiring, axe 0 on 21 QA routes |

---

## 3. High-priority visual issues

Only issues that materially hurt hierarchy, readability, usability, brand perception, or responsive behavior.

### 3.1 Folio side-index unstyled on consulting & sectors

| Field | Detail |
|---|---|
| **Page** | `/ar/consulting`, `/en/consulting`, `/ar/sectors`, `/en/sectors` |
| **Viewport** | All; most visible 1024–1440 (split layout) and 768 (stacked) |
| **Issue** | Markup uses `<a href="#id">` in `.folio-index`, but CSS in `assets/css/round2.css` styles only `.folio-index button` (grid, hover, active state, line-clamp, icon motion). Anchors render as unstyled text links. |
| **Why it matters** | Breaks the canonical split-navigation pattern — the index loses visual hierarchy, active state, and editorial grid rhythm. Users cannot scan capabilities/sectors as designed. |
| **Recommended direction** | Extend folio-index selectors to `a` (or align markup with existing button styles). Preserve active/hover/focus-visible parity. **Do not redesign the pattern — wire styling to existing anchors.** |

### 3.2 Gold focus ring on gold-filled controls

| Field | Detail |
|---|---|
| **Page** | Site-wide; worst on home hero primary CTA, contact submit, skip link |
| **Viewport** | All |
| **Issue** | Global `:focus-visible { outline: 2px solid var(--gold) }` (`site.css:104`) on controls with `background: var(--gold)` (`.btn--gold`, skip link). Gold-on-gold focus ring has insufficient contrast for keyboard users. |
| **Why it matters** | Primary actions are invisible to keyboard focus — accessibility and premium polish both suffer. |
| **Recommended direction** | Use ink (or ivory) outline on gold fills; keep gold outline on light/ink surfaces. Contact fields already override with ink focus in `round3.css` — extend that pattern to gold buttons and skip link. |

### 3.3 Mobile folio-split: duplicate navigation scroll

| Field | Detail |
|---|---|
| **Page** | `/ar/consulting`, `/en/consulting`, `/ar/sectors`, `/en/sectors` |
| **Viewport** | ≤820px (`round2.css` sets `.folio-split { display: block }`) |
| **Issue** | Side index (8 items) stacks above full canonical list (8 canvases). Same information appears twice before substantive content. |
| **Why it matters** | Mobile users face a long scroll of redundant labels — hurts pacing and perceived premium efficiency. |
| **Recommended direction** | Collapse index to horizontal chips, sticky mini-nav, or hide index when canonical list is visible on mobile. Keep desktop split unchanged. |

### 3.4 Service hero decorative visuals clip on small viewports

| Field | Detail |
|---|---|
| **Page** | `/en/consulting`, `/ar/consulting`, `/en/execution`, `/en/sectors`, `/en/insights` (+ AR) |
| **Viewport** | **390** (also 768 to a lesser degree) |
| **Issue** | `.hero-visual` retains `min-height: 12rem` at ≤820px with SVG up to ~22rem wide. Decorative graphics extend below the headline fold and can read as cropped mid-graphic. |
| **Why it matters** | First impression on mobile service pages can feel unfinished — decorative noise without clear framing. |
| **Recommended direction** | Reduce hero-visual min-height and SVG max-width at ≤768; consider quieter or hidden visual at ≤390 on service heroes (not home loggia). |

### 3.5 Gold link text on light surfaces (contrast)

| Field | Detail |
|---|---|
| **Page** | Home challenge grid links; About method cards on plum |
| **Viewport** | All; readable text issue |
| **Issue** | `.challenge-grid .go { color: var(--gold) }` (`site.css:768`) and `.section--plum .method p { color: var(--gold) }` (`site.css:744–745`) use pure gold for link/body text. Brand rule in CSS comments says gold should not carry long/body text on light; `--gold-ink` exists in `round4.css` but is not applied here. |
| **Why it matters** | Estimated ~2.1–2.4:1 on ivory/sky — fails WCAG AA for normal text and links; undermines premium readability. |
| **Recommended direction** | Apply `--gold-ink` (or ink with gold accent line) to these interactive/body cases — not a color-system change, a consistency fix. |

---

## 4. Medium-priority polish

Worthwhile refinements that do not block launch perception:

| Page | Viewport | Issue | Direction |
|---|---|---|---|
| **Home** | 390 | Hero fold has primary inquiry CTA + secondary “Contact us” dock trigger + floating contact dock + loggia lockup mark | Reduce to one secondary path on mobile (hide dock on home, or drop lockup overlay at ≤390) |
| **Contact** | >1024 | Message textarea occupies half of two-column form grid — `FormField` only applies `field--full` to challenge/inquiry/outcome, not `message` | Span message full width at desktop |
| **Contact** | 390 | `QuietVisual` arch still competes with headline despite tightened min-height | Further quiet or hide decorative visual on smallest breakpoint |
| **About** | 768–1024 | `.frame` glass-bordered engagement cards read slightly more “SaaS card” than editorial lists elsewhere | Optional tonal alignment with list/rail patterns — not urgent |
| **About** | 768 | Four pillars in single plum band feel dense | Add vertical breathing room between pillar articles |
| **Insights detail** | 390 AR | Long article titles in breadcrumb trail wrap heavily (e.g. GCC market entry) | Truncate crumb label or move topic to kicker only |
| **Cases index** | All | `SectionIntro` kicker and title can repeat the same string | Drop redundant kicker when identical |
| **Site-wide** | All | Contact dock visible on contact page alongside page CTAs | Suppress dock on `/contact` |
| **Site-wide** | All | `[data-reveal]` sections at `opacity: 0` until JS/IO runs | Provide no-JS / slow-JS fallback (reduced-motion already resets) |

---

## 5. Arabic-specific findings

**Strengths**
- RTL layout, nav order, drawer insets, crumb flow, and icon mirroring are correctly implemented in CSS (`[dir=rtl]`, `html[dir="rtl"]` rules in `site.css`, `folio.css`).
- Arabic heading weight (700) and line-height read premium, not cramped, at 390 and 1440.
- Home method rail uses Arabic stage titles per locked decision — no English labels leaking into the visible chain.
- Case and insight body copy alignment and line length hold at mobile and desktop.

**Issues**
- Long insight titles in breadcrumbs wrap awkwardly on **390** — cosmetic but noticeable in AR where titles are longer.
- No material RTL breakage observed in QA (21 routes, axe 0).

---

## 6. English-specific findings

**Strengths**
- Serif headline + Work Sans body pairing is consistent and editorial across service pages.
- “Four I's. One Vision.” LTR kicker on home is intentional and renders cleanly.
- Service headlines (“Before moving faster…”, “Strategy does not become real…”) balance well at 1440 and 768.
- No decorative italic drift on hero or body — matches locked decision.

**Issues**
- No EN-only material issues beyond shared layout/focus/contrast findings in §3.

---

## 7. Responsive findings

| Breakpoint | Assessment |
|---|---|
| **1440** | **Strong.** Home split hero, service heroes, case plum hero, full nav row — coherent premium rhythm. Folio split works when index is styled (currently broken on anchors — see §3.1). |
| **1024** | **Strong.** Home two-column hero holds; nav full until ~900px. Contact form message half-width is the main desktop friction. |
| **768** | **Good.** Hamburger drawer, stacked heroes, home loggia stacks cleanly. Folio-split begins redundant index+list stacking. |
| **390** | **Weakest.** Service hero graphics clip; home contact entry redundancy; insight breadcrumb wraps; otherwise typography and touch targets hold. |

**Evidence note:** QA captures viewport-top screenshots with axe; below-fold sections assessed from source + CSS. Playwright QA passed 21 routes with 0 axe violations.

---

## 8. Accessibility-related visual findings

| Area | Finding | Severity |
|---|---|---|
| **Contrast** | Ink on ivory/sky is strong; plum sections use ivory text — axe reports 0 violations on QA routes | OK baseline |
| **Focus visibility** | Gold `:focus-visible` on gold fills (skip link, `.btn--gold`) — **material keyboard issue** | High |
| **Focus (contact fields)** | Ink outline override on `:focus-visible` in contact form — better than site default | Good |
| **Touch targets** | Buttons, drawer links, lang switch (~44px), method dots — meet minimum | Good |
| **Motion** | `prefers-reduced-motion` disables skyfield, hero sequences, folio animations, view transitions | Good |
| **Scroll reveal** | `.js [data-reveal]:not(.is-visible) { opacity: 0 }` — content hidden until JS | Medium (edge case) |
| **Color-only state** | Form errors use text + `aria-invalid` + summary region — not color-only | Good |

Impeccable `detect --json src/` returned **no automated findings**; manual CSS audit surfaced focus and gold-text contrast gaps the detector did not flag.

---

## 9. Recommended next Impeccable action

Based on findings, only these commands are justified:

### Primary: **`layout`**

Addresses the three layout issues with highest user impact:
- Wire `.folio-index` styles to anchor markup on consulting/sectors
- Reduce mobile hero-visual footprint on service pages
- Resolve mobile folio-split index duplication (chips, sticky nav, or hide redundant index)
- Full-width contact message field at desktop

### Secondary (after layout): **`harden`**

- Ink/ivory focus ring on gold-filled controls and skip link
- Optional `[data-reveal]` no-JS fallback

### Tertiary (if contrast fixes not bundled in layout): **`typeset`**

- Extend `--gold-ink` to `.challenge-grid .go` and `.section--plum .method p` — not a font or color-system change

**Not recommended at this stage:** `quieter` (home contact cluster is medium, not systemic noise), `polish` (run after layout/harden), `bolder`, `colorize`, `animate`, `distill` — none are justified by material findings.

---

## 10. Final status

**IMPECCABLE CRITIQUE COMPLETE — TARGETED POLISH REQUIRED**

The brand system is coherent and premium. Fix folio-index styling, keyboard focus on gold controls, and mobile layout duplication before treating the visual layer as launch-frozen. No redesign, copy rewrite, or color/font changes are needed.

---

## Appendix — Locked decisions respected in this critique

This pass did **not** recommend changes to:

- Home hero copy or ink/navy headline treatment
- Hero gold accent restraint or headline scale
- English hero non-italic rule
- Secondary CTA labels (`تواصل معنا` / `Contact us`)
- 18+ / GCC strip placement below hero
- Arabic method titles and method headline
- Four I's heading
- Brand colors, fonts, or new visual systems

---

## Appendix — Anti-pattern check

| Pattern | Verdict |
|---|---|
| Unnecessary cards | **Low** — mainly About `.frame` stack; home uses lists/rails |
| Excessive borders | **Low** — editorial lines, not card chrome |
| Decorative noise | **Mild** — geom arches, hero SVGs, contact dock; home mobile worst |
| Too much gold | **No on decoration** — issue is gold used as *readable text* in a few selectors |
| Gradients / blur / glass | **Mild** — skyfield washes, topbar backdrop-filter; within brief, near ceiling |
| Cramped mobile | **Yes** — 390 service heroes; home contact cluster |
| Templated blocks | **Mild** — repeating `PageHero` + `CtaBand` shell, but content varies |
| Hidden overflow masking layout | **No evidence** — overflow used for framing, not hiding broken layout |
| Animation distraction | **No** — motion is restrained; reduced-motion respected |
| AR/EN visual weight mismatch | **No material drift** |
