# Insights Impeccable — Phase 2

Compare baseline: commit **b6bd8bc** (Phase 1 redesign).

## What changed

1. **Featured editorial cover** — ~58% / ~42% split: title block left, preview + CTA right; removed `max-width: 22ch` on the featured H2 (root cause of ~8-line wrapping).
2. **Catalog grid** — five-column desktop index: number · topic · title · description · arrow across shell width.
3. **Reading navigation rail** — sticky “In this article” sidebar (~220–260px) with IntersectionObserver active state; mobile `<details>` TOC; main column ~780px max.
4. **Content-specific structures** (exact copy unchanged):
   - Growth Roadmap: 01→02→03 decision sequence
   - Sales & Revenue: diagnostic path blocks
   - Market Expansion: 2×2 readiness matrix
   - Automation & AI: numbered workflow list
   - Customer Experience: numbered progression with connector line
   - GCC: four-question overview links + H3 rail entries

## Measured (production preview)

| Check | Phase 1 (b6bd8bc) | Phase 2 |
|-------|-------------------|---------|
| Featured H2 line boxes @ 1440 | ~8 (22ch constraint) | **2** |
| Index scroll height @ 1440 | 3201px | ~2823px |
| Featured crop height | tall empty band | cover band only |

See `metrics.json` for captured heights.

## Artifacts

- `before/` — Phase 1 reference crops (from prior review package)
- `after/` — Phase 2 index, featured crop, catalog crop, representative article pages

## Preview

```bash
npm run build && npm run preview
# http://127.0.0.1:4173/en/insights
```
