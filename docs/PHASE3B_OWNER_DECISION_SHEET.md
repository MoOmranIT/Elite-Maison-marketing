# Phase 3B — Owner Decision Sheet
**Status:** IMPLEMENTED — final owner decisions applied  
**Date:** 2026-09-20  

---

## Instructions for Owner

Every proposed change that would modify the public website is listed below. Review each item and provide a decision: **APPROVE**, **REVISE**, or **REJECT**. Do not approve on behalf of the owner.

---

## SEO-01: Add datePublished and dateModified to Article schema

| Field | Value |
|-------|-------|
| Area | Schema / On-page |
| Current state | No publication or modification dates on any insight or case |
| Proposed change | Add datePublished and dateModified to Article schema for insights; add dateCreated to CreativeWork schema for cases |
| Why | Recency is a ranking and AI citation signal. Search engines and AI systems weight fresh content higher. |
| Expected benefit | Improved freshness signals; potential ranking uplift for time-sensitive queries |
| Risk / tradeoff | Requires defining publication dates for existing content (may be approximate) |
| Evidence | Missing in all 5 insights and 5 cases (schema audit) |
| Recommendation | DO NOT IMPLEMENT — no fake search endpoint |

---

## SEO-02: Add author entity to Article and CreativeWork schema

| Field | Value |
|-------|-------|
| Area | Schema / E-E-A-T |
| Current state | No author entity; Organization used as author proxy |
| Proposed change | Add a Person entity for the founder/owner with name, jobTitle, and url; reference from Article and CreativeWork author property |
| Why | E-E-A-T requires expertise signals. Named authors improve citation credibility. |
| Expected benefit | Stronger E-E-A-T; improved AI citation potential |
| Risk / tradeoff | Requires owner approval for public name and title |
| Evidence | Missing in all Article and CreativeWork schema (schema audit) |
| Recommendation | REVISE / Organization author — Elite Maison entity only, no Person |

---

## SEO-03: Add sameAs to Organization schema

| Field | Value |
|-------|-------|
| Area | Schema / Entity |
| Current state | No sameAs property on Organization |
| Proposed change | Add sameAs array with verified social/profile URLs (LinkedIn, etc.) |
| Why | sameAs helps search engines disambiguate the entity and connect brand presence across platforms. |
| Expected benefit | Improved Knowledge Graph entity confidence |
| Risk / tradeoff | Only add verified, real profiles. Do not invent or speculate. |
| Evidence | Missing in Organization schema (schema audit) |
| Recommendation | DEFER — no verified external profiles yet |

---

## SEO-04: Add image property to Organization schema

| Field | Value |
|-------|-------|
| Area | Schema / Entity |
| Current state | Organization has logo and image but image is architectural, not organizational |
| Proposed change | Ensure image points to a verified organizational image (logo lockup or approved team photo) |
| Why | image property helps search engines display correct visual in knowledge panels. |
| Expected benefit | Improved brand presentation in search |
| Risk / tradeoff | Requires approved organizational image asset |
| Evidence | Current image is /assets/images/elite-architecture.webp (architectural identity) |
| Recommendation | REVISE — keep architectural image as intentional brand mark |

---

## AEO-01: Add publication dates to insights and cases (visible content)

| Field | Value |
|-------|-------|
| Area | AI SEO / Content |
| Current state | No visible publication dates on any insight or case detail page |
| Proposed change | Add a publication date line (e.g., "Published [date]") to insight and case detail pages |
| Why | AI systems and searchers use visible dates for recency weighting. Schema dates alone are insufficient if not visible. |
| Expected benefit | Improved AI citation potential; clearer user expectations |
| Risk / tradeoff | Must not invent dates; use actual publication or last-updated dates |
| Evidence | No datePublished visible in rendered HTML (AI SEO audit) |
| Recommendation | DEFER — no verified dates for existing content |

---

## AEO-02: Add author byline to insights and cases (visible content)

| Field | Value |
|-------|-------|
| Area | AI SEO / E-E-A-T |
| Current state | No author bylines on any insight or case detail page |
| Proposed change | Add author byline (name, title) to insight and case detail pages |
| Why | AI systems attribute content to named experts. Bylines improve citation credibility. |
| Expected benefit | Stronger E-E-A-T; improved AI citation potential |
| Risk / tradeoff | Requires owner approval for public name and title; do not invent credentials |
| Evidence | No author bylines visible in rendered HTML (AI SEO audit) |
| Recommendation | REVISE / institutional attribution only — Elite Maison byline on Insights |

---

## AEO-03: Evaluate llms.txt / agent-readable files

| Field | Value |
|-------|-------|
| Area | AI SEO / Architecture |
| Current state | No llms.txt or agent-readable bundles |
| Proposed change | Evaluate need for llms.txt after Phase 3B implementation; current static architecture does not require it |
| Why | llms.txt is an emerging standard with unclear adoption. 36-page static site is already fully crawlable. |
| Expected benefit | Minimal for current architecture |
| Risk / tradeoff | Maintenance burden; unclear ROI |
| Evidence | ai-seo audit: NOT NEEDED for current static architecture |
| Recommendation | DEFER — revisit only if future evidence justifies it |

---

## SCH-01: Add WebSite potentialAction (SearchAction)

| Field | Value |
|-------|-------|
| Area | Schema |
| Current state | WebSite schema has no potentialAction |
| Proposed change | Add SearchAction to WebSite schema on home page |
| Why | Enables sitelinks search box in Google SERPs |
| Expected benefit | Improved SERP presence for branded queries |
| Risk / tradeoff | Low risk; requires search results page or handling |
| Evidence | Missing in WebSite schema (schema audit) |
| Recommendation | DO NOT IMPLEMENT — no fake search endpoint |

---

## SCH-02: Add datePublished and dateModified to Article schema

| Field | Value |
|-------|-------|
| Area | Schema |
| Current state | Article schema has no dates |
| Proposed change | Add datePublished and dateModified to Article schema for all 5 insights |
| Why | Google requires dates for rich results eligibility; improves freshness signals |
| Expected benefit | Potential rich result eligibility; improved freshness |
| Risk / tradeoff | Requires accurate dates |
| Evidence | Missing in all Article schema (schema audit) |
| Recommendation | MERGED WITH SEO-01 |

---

## SCH-03: Enrich Article schema with articleBody and image

| Field | Value |
|-------|-------|
| Area | Schema |
| Current state | Article schema has headline, description, abstract — no articleBody or image |
| Proposed change | Add articleBody (full text) and image (article hero or OG) to Article schema |
| Why | articleBody helps AI extraction; image enables rich results |
| Expected benefit | Improved AI citation; potential image rich results |
| Risk / tradeoff | Increases JSON-LD size; articleBody duplication of page content |
| Evidence | Missing in Article schema (schema audit) |
| Recommendation | REVISE — image conditional only where real; articleBody excluded |

---

## ARCH-01: Add contextual internal links between insights and capabilities/cases

| Field | Value |
|-------|-------|
| Area | Site Architecture / Internal Linking |
| Current state | RelatedPath components exist but are generic; no insight-to-capability or insight-to-case contextual links |
| Proposed change | Add contextual CTAs and inline links: Insight -> relevant Consulting/Execution capability, Insight -> relevant Case, Sector -> relevant Case |
| Why | Passes crawl equity to important pages; improves user discovery; supports topic clustering |
| Expected benefit | Improved crawl distribution; better user journey |
| Risk / tradeoff | Low risk; must avoid mechanical linking |
| Evidence | Internal link map identifies 20+ high-value contextual links |
| Recommendation | APPROVE WITH LIMITS — selective links only, max 1–2 per page |

---

## ARCH-02: Evaluate hash-based navigation SEO implications

| Field | Value |
|-------|-------|
| Area | Site Architecture |
| Current state | Consulting, Execution, Sectors pages use hash-based navigation |
| Proposed change | No change needed now; monitor if individual capabilities gain independent search demand |
| Why | Current architecture is flat and prerendered; hash nav is acceptable |
| Expected benefit | N/A — no change |
| Risk / tradeoff | N/A |
| Evidence | Hash-based nav detected in site architecture audit |
| Recommendation | KEEP CURRENT — hash navigation unchanged |

---

## ARCH-03: Add breadcrumb rich results validation

| Field | Value |
|-------|-------|
| Area | Schema / Architecture |
| Current state | BreadcrumbList schema present on case detail and insight detail pages |
| Proposed change | Validate BreadcrumbList in Google Rich Results Test after implementation |
| Why | Ensures breadcrumb rich results eligibility |
| Expected benefit | Improved SERP appearance |
| Risk / tradeoff | None — validation only |
| Evidence | BreadcrumbList present but not validated externally |
| Recommendation | APPROVE — validation completed; no changes needed |

---

## CONT-01: Create GCC market entry readiness checklist

| Field | Value |
|-------|-------|
| Area | Content Strategy |
| Current state | expansion-brief insight exists but is a brief, not a checklist |
| Proposed change | Create a practical readiness checklist for GCC market entry from a marketing/commercial lens |
| Why | High search demand; fills gap between legal/tax entry content and practical marketing readiness |
| Expected benefit | Search traffic; AI citation; lead generation |
| Risk / tradeoff | Must be distinctive from existing legal/entry guides |
| Evidence | Bin Ablan case proof; expansion-brief insight; content opportunity backlog P1 |
| Recommendation | DEFER TO PHASE 3C |

---

## CONT-02: Create growth diagnosis framework

| Field | Value |
|-------|-------|
| Area | Content Strategy |
| Current state | growth-guide insight exists but is an article, not a framework page |
| Proposed change | Create a hub page for growth diagnosis with the Four I's framework as a practical diagnostic tool |
| Why | Core methodology; high commercial relevance; strong proof base |
| Expected benefit | Search traffic; AI citation; lead generation |
| Risk / tradeoff | Must not over-explain; ATTRACT > OVER-EXPLAIN |
| Evidence | Four I's framework; 5 cases; 18+ years proof |
| Recommendation | DEFER TO PHASE 3C |

---

## CONT-03: Create healthcare marketing sector brief

| Field | Value |
|-------|-------|
| Area | Content Strategy |
| Current state | Sectors page has healthcare section but no dedicated depth |
| Proposed change | Create a sector brief for healthcare marketing in GCC with Attractive Smile proof |
| Why | Sector-specific search demand; strong case proof; AI citation potential |
| Expected benefit | Search traffic; sector credibility; AI citation |
| Risk / tradeoff | Must not invent healthcare-specific claims beyond case proof |
| Evidence | Attractive Smile case (12 consecutive days); healthcare sector capability |
| Recommendation | DEFER TO PHASE 3C |

---

## CONT-04: Create FMCG demand generation sector brief

| Field | Value |
|-------|-------|
| Area | Content Strategy |
| Current state | Sectors page has FMCG section but no dedicated depth |
| Proposed change | Create a sector brief for FMCG demand generation in GCC with Bloom proof |
| Why | Sector-specific search demand; strongest case proof (AED 65K/month); AI citation potential |
| Expected benefit | Search traffic; sector credibility; AI citation |
| Risk / tradeoff | Must not inflate metrics beyond approved figures |
| Evidence | Bloom case (AED 18K -> AED 40K -> AED 65K/month); FMCG sector capability |
| Recommendation | DEFER TO PHASE 3C |

---

## CONT-05: Refresh AI insight with operational use cases

| Field | Value |
|-------|-------|
| Area | Content Strategy |
| Current state | ai-insight is a case insight with broad AI commentary |
| Proposed change | Expand with 2-3 specific operational use cases where AI adds value in marketing |
| Why | AI search demand is growing; current content is thin on practical application |
| Expected benefit | Search traffic; AI citation |
| Risk / tradeoff | Must not overpromise AI capabilities; stay within approved AI Brains proof |
| Evidence | AI Brains case; ai-insight existing content |
| Recommendation | DEFER TO PHASE 3C |

---

## Summary

| ID | Area | Recommendation | Priority |
|----|------|----------------|---------|
| SEO-01 | Schema dates | REVISE / DEFER | P1 |
| SEO-02 | Author entity | REVISE / Organization author | P1 |
| SEO-03 | sameAs | DEFER | P1 |
| SEO-04 | Organization image | REVISE | P2 |
| AEO-01 | Visible dates | DEFER | P1 |
| AEO-02 | Author bylines | REVISE / institutional attribution only | P1 |
| AEO-03 | llms.txt | DEFER | P3 |
| SCH-01 | SearchAction | DO NOT IMPLEMENT | P1 |
| SCH-02 | Article dates | MERGED WITH SEO-01 | P1 |
| SCH-03 | Article body/image | REVISE / image conditional, articleBody excluded | P2 |
| ARCH-01 | Contextual links | APPROVE WITH LIMITS | P1 |
| ARCH-02 | Hash nav | KEEP CURRENT | P3 |
| ARCH-03 | Breadcrumb validation | APPROVE | P2 |
| CONT-01 | GCC readiness checklist | DEFER TO 3C | P1 |
| CONT-02 | Growth diagnosis framework | DEFER TO 3C | P1 |
| CONT-03 | Healthcare sector brief | DEFER TO 3C | P1 |
| CONT-04 | FMCG sector brief | DEFER TO 3C | P1 |
| CONT-05 | Refresh AI insight | DEFER TO 3C | P2 |

---

## Implementation Verification

**Verified:** 2026-09-20, on the final Phase 3B working tree (uncommitted change set on `main`).

| Gate | Command | Result |
|------|---------|--------|
| TypeScript | `npm run typecheck` | PASS — exit 0 (`tsc --noEmit` for app + node configs) |
| Copy integrity | `npm run qa:copy` | PASS — 333 expected strings, 333 exact matches, 100% coverage, 0 exceptions, 16 retired booking strings absent |
| SEO static gate | `npm run qa:seo` | PASS — `STATIC passes=1021 fails=0`, `robots-mode=production-open` |
| Production build | `npm run build` | PASS — 36/36 pages prerendered (client + SSR + SSG) |
| SSG verification | `npm run verify:ssg` | PASS — 36/36 canonical pages verified (browserless) |
| Dist acceptance audit | `npm run qa:phase3b` | PASS — 167 assertions, 0 failures (`scripts/qa-phase3b.mjs`, added with this phase) |
| Browser QA (a11y + flow) | `npm run qa` (Playwright + axe) | PASS — 12 routes (EN 9/9 · AR 3/3), 0 axe violations (0 serious, 0 critical), legacy redirects resolve, inquiry form POST intercepted (no email delivered). Evidence: `.qa/qa-out.txt` |

### What the dist audit asserts (EN + AR)

- All 5 insights: Article `author` → `https://www.elitemaisonmarketing.com/#org`.
- All 5 cases: CreativeWork `author` → `#org`.
- Deferred/rejected items absent as decided: `datePublished` / `dateModified` / `dateCreated` (SEO-01, AEO-01, SCH-02), `articleBody` (SCH-03), `sameAs` (SEO-03), `SearchAction` (SCH-01).
- Insights show the institutional byline (`By Elite Maison` / `بقلم Elite Maison`); case pages show no byline (AEO-02 limit).
- ARCH-01 contextual case links resolve to real case pages: growth-guide → Bloom / Perfect Foodstuff; sales-article → Attractive Smile Medical Center; expansion-brief → Bin Ablan; ai-insight → AI Brains — AI Solutions; cx-check → none.

### Files changed in Phase 3B

| File | Change |
|------|--------|
| `src/lib/schema.ts` | Case `CreativeWork` node gains `author` → Organization `#org` (SEO-02). Article author was already the Organization entity. |
| `src/data/em.js` | `relatedCase` UI label (AR `قصة ذات صلة` / EN `Related case`) plus one `relatedCase` slug per insight (ARCH-01). |
| `src/pages/InsightsPage.tsx` | Renders the institutional byline (AEO-02) and the related-case link (ARCH-01). |
| `assets/css/round3.css` | `.insight-attribution` styling for the byline. |
| `scripts/qa-phase3b.mjs` | New dist acceptance gate for the Phase 3B decisions (run after `npm run build`). |
| `package.json` | Registers the `qa:phase3b` script. |

### Repo hygiene note

The approved copy deck (`docs/approved-copy/elite_maison_editorial_copy_deck_v2.md`) was restored in the working tree after a PowerShell round-trip corrupted it (double UTF-8 BOM, stripped markdown hard-break trailing spaces, lost final newline). Content is identical to the pre-fix working copy apart from those artefacts and it keeps only the intentional Phase 2B copy edits (22 insertions / 18 deletions vs `HEAD`). `npm run qa:copy` still reports 333/333 exact matches.
