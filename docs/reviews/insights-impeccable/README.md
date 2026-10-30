# English Insights — Impeccable redesign review

Branch: `review/insights-impeccable-20261030`

## Direction

This pass is a **visual redesign** of the English Insights index and six article detail pages only. Approved editorial copy in `src/data/insights-en.js` is unchanged. Arabic Insights, Proof/Cases, and global navigation were not modified.

Design goals:

- Editorial publication, not landing-page panels
- Tighter hero and masthead rhythm on `/en/insights`
- Asymmetric **Start here** featured panel with sand gradient band
- Numbered catalog rows with topic / title / deck hierarchy (no generic cards)
- Shared article system: compact masthead, Quick answer beside title on desktop, ~46rem reading measure, checklist list styling for short diagnostic articles, numbered CX sequence, nested H3 rail for GCC
- Related reading and FAQ unchanged in content and order (FAQ after CTA)

## Before / after (scroll height @ 1440px)

| Route | Before | After | Δ |
|-------|--------|-------|---|
| `/en/insights` | 4057 | 3201 | −856 |
| `growth-guide` | 3679 | 3104 | −575 |
| `sales-article` | 3649 | 3046 | −603 |
| `expansion-brief` | 3201 | 2664 | −537 |
| `ai-insight` | 3467 | 3112 | −355 |
| `cx-check` | 3931 | 3438 | −493 |
| `gcc-market-entry-readiness` | 4837 | 4448 | −389 |

Heights reduced by removing duplicate gold-rule bands, empty masthead columns, oversized section padding, and separated quick-answer shells—not by shrinking body copy.

## Artifacts

| File | Description |
|------|-------------|
| `before/*-before.png` | Pre-redesign full-page captures (baseline commit) |
| `after/index-1440-after.png` | Index desktop |
| `after/index-390-after.png` | Index mobile |
| `after/articles-desktop-contact.png` | Six article mastheads + body tops (desktop) |
| `after/articles-mobile-contact.png` | Same routes at 390px |
| `after/growth-guide-1440-after.png` | Growth Roadmap full page |
| `after/cx-check-1440-after.png` | Customer Experience full page |
| `after/gcc-market-entry-readiness-1440-after.png` | GCC full page |
| `height-comparison-1440.json` | Machine-readable height deltas |

## Unresolved / follow-up

- Shared **CtaBand** (`tone="strong"`) remains the site-wide component; color and band height were not changed globally per scope lock.
- Impeccable `detect` reported one pre-existing `transition: width` warning elsewhere in `folio.css` (unrelated line).
- Copy QA still reports **20 legacy deck exceptions** (unchanged baseline); no new exceptions from Insights strings.

## How to preview

```bash
npm run build
npm run preview
# http://127.0.0.1:4173/en/insights
```
