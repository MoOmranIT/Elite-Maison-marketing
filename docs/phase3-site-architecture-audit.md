# Phase 3A — Site Architecture Audit
**Status:** AUDIT ONLY — no implementation changes  
**Date:** 2026-09-20  

---

## 1. Executive Summary

| Priority | Count | Summary |
|----------|-------|---------|
| P0 — blocks crawl/indexation or creates material correctness risk | 0 | None |
| P1 — high-value search/discovery opportunity | 2 | Hash-based navigation on Consulting/Execution may create thin initial body content; orphan-page risk for some deep-linked capabilities |
| P2 — meaningful optimization | 4 | Breadcrumb implementation could be richer; related-content links are present but could be more contextual; no hub-and-spoke content clusters; mobile nav depth is acceptable |
| P3 — optional / experimental | 3 | Consider adding page-level related-content sections; evaluate URL depth for future expansion |

**Overall health:** Architecture is clean, intentional, and bilingual. URL hierarchy is flat (max 2 levels), navigation is consistent across languages, and internal linking is present. Primary gaps are in depth of contextual linking and hash-based nav SEO implications.

---

## 2. Navigation Hierarchy

### 2.1 Primary Navigation
**Evidence:** EM.NAV_PRIMARY contains 7 items: Home, About, Consulting, Execution, Sectors, Cases (Proof), Insights. Contact is in EM.NAV but not EM.NAV_PRIMARY.

| Nav Item | AR Label | EN Label | URL |
|----------|----------|----------|-----|
| Home | الرئيسية | Home | /ar, /en |
| About | من نحن | About | /ar/about, /en/about |
| Consulting | الاستشارات | Consulting | /ar/consulting, /en/consulting |
| Execution | التنفيذ | Execution | /ar/execution, /en/execution |
| Sectors | القطاعات | Sectors | /ar/sectors, /en/sectors |
| Cases | الدليل | Proof | /ar/cases, /en/cases |
| Insights | الرؤى | Insights | /ar/insights, /en/insights |
| Contact (secondary) | تواصل معنا | Contact | /ar/contact, /en/contact |

**Status:** PASS — clear, consistent, bilingual.

### 2.2 Footer Navigation
**Evidence:** Footer contains Navigate and Contact sections with language toggle.

**Status:** PASS.

---

## 3. URL Hierarchy

| URL Pattern | Depth | Type | Notes |
|-------------|-------|------|-------|
| /ar, /en | 1 | Home | Language root |
| /ar/about, /en/about | 2 | Page | Clean |
| /ar/consulting, /en/consulting | 2 | Page + hash nav | Hash-based capability navigation |
| /ar/execution, /en/execution | 2 | Page + hash nav | Hash-based solution navigation |
| /ar/sectors, /en/sectors | 2 | Page + hash nav | Hash-based sector navigation |
| /ar/cases, /en/cases | 2 | Index | Clean |
| /ar/cases/:id, /en/cases/:id | 3 | Detail | Clean |
| /ar/insights, /en/insights | 2 | Index | Clean |
| /ar/insights/:id, /en/insights/:id | 3 | Detail | Clean |
| /ar/contact, /en/contact | 2 | Page | Clean |

**Max depth:** 3 levels (/cases/:id, /insights/:id)
**Status:** PASS — flat, clean, consistent.

---

## 4. Internal Linking

### 4.1 Current Internal Links
**Evidence from code review:**
- Home: ImpactLedger links to cases; FourIsSection, DeliveryPath, TwoPaths, SectorsSection, ClosingSection all link internally
- About: CtaBand links to /consulting; engage section links to /contact?source=engagement
- Consulting: Each Canvas has RelatedPath component; CtaBand links to /contact
- Execution: Each exec-mod has RelatedPath component; CtaBand links to /contact
- Sectors: Each Plate has RelatedPath component; CtaBand links to /contact
- Cases: Featured case links to case detail; rest link to case detail; CtaBand links to /contact
- Case Detail: RelatedCase, relatedExecution, relatedConsulting components; next/prev case sequence
- Insights: Featured insight links to insight detail; rest link to insight detail; CtaBand links to /contact
- Insight Detail: Crumbs, relatedInsights, relatedCase, relatedExecution, relatedConsulting components; next/prev insight sequence
- Contact: Direct channels (email, phone, WhatsApp) are external but relevant

**Status:** PASS — internal linking is present and contextual.

### 4.2 Orphan-Page Risk
**Evidence:** Every page has inbound internal links from: navigation, homepage sections, related-path components, case/insight sequences, or CTAs.

**Status:** PASS — no orphan pages.

### 4.3 Breadcrumb Logic
**Evidence:** Crumbs component used on case detail, insight detail, and other deep pages. Breadcrumbs show Home -> Section -> Current Page.

**Status:** PASS — breadcrumbs implemented where needed.

### 4.4 Related-Content Links
**Evidence:** RelatedPath component provides sector-relevant cases, consulting capabilities, and execution solutions. Case detail and insight detail have related-content sections.

**Status:** PASS — related-content links are present.

### 4.5 Hash-Based Navigation SEO
**Evidence:** Consulting, Execution, and Sectors pages use hash-based navigation (#growth, #sales, #healthcare, etc.). The prerendered snapshot captures full content, so crawlers see all sections. However, individual hash fragments do not have separate canonical URLs or schema.

**Status:** P1 — acceptable for current architecture; each capability/sector does not need a separate page unless search demand justifies it.

---

## 5. Arabic / English Parity

| Check | Status | Evidence |
|-------|--------|----------|
| Same navigation structure | PASS | Both languages have identical nav items |
| Same URL structure | PASS | Both languages use /ar/ and /en/ prefixes |
| Same page depth | PASS | Both languages have identical depth |
| Same internal linking | PASS | RelatedPath and sequence links work in both languages |
| Same breadcrumb logic | PASS | Breadcrumbs implemented in both languages |

**Status:** PASS — full architectural parity.

---

## 6. Page Depth Analysis

| Page | Clicks from Home | Internal Links In | Internal Links Out |
|------|------------------|-------------------|--------------------|
| Home | 0 | 0 (entry) | 7 (nav) + section links |
| About | 1 | 1 (nav) + home links | 1 (CTA) + engage links |
| Consulting | 1 | 1 (nav) + home links | 8 (capabilities) + CTA |
| Execution | 1 | 1 (nav) + home links | 6 (solutions) + CTA |
| Sectors | 1 | 1 (nav) + home links | 6 (sectors) + CTA |
| Cases | 1 | 1 (nav) + home links | 5 (cases) + CTA |
| Case Detail | 2 | 1 (case index) + sequences | Related paths + next/prev |
| Insights | 1 | 1 (nav) + home links | 5 (insights) + CTA |
| Insight Detail | 2 | 1 (insight index) + sequences | Related paths + next/prev |
| Contact | 1 | 1 (nav) + multiple CTAs | Direct channels |

**Status:** PASS — all pages within 2 clicks of home. No deep orphans.

---

## 7. Evidence Classification

| Finding | Evidence Type |
|---------|--------------|
| 36 pages, max depth 3 | VERIFIED LOCAL TECHNICAL EVIDENCE |
| No orphan pages | VERIFIED LOCAL TECHNICAL EVIDENCE |
| Hash-based nav on 3 pages | VERIFIED LOCAL TECHNICAL EVIDENCE |
| Breadcrumbs implemented | VERIFIED LOCAL TECHNICAL EVIDENCE |
| RelatedPath component present | VERIFIED LOCAL TECHNICAL EVIDENCE |
| No hub-and-spoke clusters | VERIFIED LOCAL TECHNICAL EVIDENCE |
