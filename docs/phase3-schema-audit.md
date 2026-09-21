# Phase 3A — Schema Audit
**Status:** AUDIT ONLY — no implementation changes  
**Date:** 2026-09-20  

---

## 1. Executive Summary

| Priority | Count | Summary |
|----------|-------|---------|
| P0 — blocks correctness or creates material risk | 0 | None |
| P1 — high-value search/discovery opportunity | 3 | Missing datePublished/dateModified on Article; no author entity; no sameAs on Organization |
| P2 — meaningful optimization | 4 | Missing image property on Organization; no potentialAction on WebSite; Article schema uses abstract same as description; no article body property |
| P3 — optional / experimental | 2 | Consider adding hasPart for service collection; evaluate offer schema if pricing is ever added |

**Overall health:** Schema is valid, consistent, and appropriately scoped. No spam. Primary gaps are in completeness (dates, authorship, sameAs) and a few missed opportunities for entity richness.

---

## 2. Schema by Page Type

### 2.1 Home (/ar, /en)

**Current schema:**
- Organization (on all pages)
- WebSite (home only)

**Organization:**
- @type: Organization — CORRECT
- @id: #org — CORRECT, stable
- name: "Elite Maison Marketing Consultancies" — CORRECT
- alternateName: "Elite Maison" — CORRECT
- description: from EM.COPY.home.lead — CORRECT
- email, telephone, url — CORRECT
- logo: /assets/images/logo-lockup.png — CORRECT
- image: /assets/images/elite-architecture.webp — CORRECT
- areaServed: AdministrativeArea (GCC markets / أسواق الخليج) — CORRECT

**Missing from Organization:**
- sameAs — P1 — no social/profile links confirmed
- address — P3 — physical HQ not confirmed

**WebSite:**
- @type: WebSite — CORRECT
- @id: #website — CORRECT, stable
- name, url, inLanguage, publisher — CORRECT

**Missing from WebSite:**
- potentialAction (SearchAction) — P2 — would enable sitelinks search

### 2.2 About (/ar/about, /en/about)

**Current schema:**
- Organization only (inherited from all pages)

**Status:** PASS — no additional schema needed for About. About is not a specific schema type; Organization is appropriate.

### 2.3 Consulting (/ar/consulting, /en/consulting)

**Current schema:**
- Organization
- Service

**Service:**
- @type: Service — CORRECT
- name: Consulting / الاستشارات — CORRECT
- provider: #org — CORRECT
- description: from EM.COPY.consulting.lead — CORRECT
- url: page URL — CORRECT
- serviceType: list of 8 consulting capability titles — CORRECT

**Status:** PASS — Service schema is well-formed and accurate.

### 2.4 Execution (/ar/execution, /en/execution)

**Current schema:**
- Organization
- Service

**Service:**
- @type: Service — CORRECT
- name: Execution solutions / الحلول التنفيذية — CORRECT
- provider: #org — CORRECT
- description: from EM.COPY.execution.lead — CORRECT
- url: page URL — CORRECT
- serviceType: list of 6 execution solution titles — CORRECT

**Status:** PASS — Service schema is well-formed and accurate.

### 2.5 Sectors (/ar/sectors, /en/sectors)

**Current schema:**
- Organization only

**Status:** PASS — no additional schema needed. Sectors are not individual services; they are contexts for services.

### 2.6 Cases Index (/ar/cases, /en/cases)

**Current schema:**
- Organization only

**Status:** PASS — case index is a collection page; individual cases have their own schema.

### 2.7 Case Detail (/ar/cases/:id, /en/cases/:id)

**Current schema:**
- Organization
- CreativeWork
- BreadcrumbList

**CreativeWork:**
- @type: CreativeWork — CORRECT (case studies are creative works)
- headline: case name — CORRECT
- name: case name — CORRECT
- description: from item.challenge — CORRECT
- abstract: from item.result — CORRECT
- inLanguage: ar or en — CORRECT
- mainEntityOfPage: page URL — CORRECT
- publisher: #org — CORRECT
- about: challenge text — CORRECT
- text: concatenated challenge+strategy+execution+result+proof — CORRECT

**Missing from CreativeWork:**
- dateCreated / datePublished — P1 — no publication date
- author — P1 — no author entity

**BreadcrumbList:**
- Home -> Proof -> Case Name — CORRECT

**Status:** PASS with gaps. CreativeWork schema is accurate but incomplete.

### 2.8 Insights Index (/ar/insights, /en/insights)

**Current schema:**
- Organization only

**Status:** PASS — insights index is a collection page.

### 2.9 Insight Detail (/ar/insights/:id, /en/insights/:id)

**Current schema:**
- Organization
- Article
- BreadcrumbList

**Article:**
- @type: Article — CORRECT (insights are editorial articles)
- headline: insight title — CORRECT
- description: from item.answer || item.summary — CORRECT
- abstract: same as description — CORRECT (could be enriched)
- inLanguage: ar or en — CORRECT
- mainEntityOfPage: page URL — CORRECT
- publisher: #org — CORRECT
- author: #org — P1 — should be a Person or Organization; using Organization is acceptable but not ideal

**Missing from Article:**
- datePublished / dateModified — P1 — no publication date
- author (as Person entity) — P1 — no named author
- image — P2 — no article image defined
- articleBody — P2 — full text not included in schema

**BreadcrumbList:**
- Home -> Insights -> Insight Title — CORRECT

**Status:** PASS with gaps. Article schema is correct type but incomplete.

### 2.10 Contact (/ar/contact, /en/contact)

**Current schema:**
- Organization only

**Status:** PASS — contact page uses Organization schema. No additional schema needed.

---

## 3. Schema Quality Principles

| Principle | Status | Evidence |
|-----------|--------|----------|
| Valid JSON-LD | PASS | All schema builds via buildJsonLd with proper @context and @graph |
| Correct @type | PASS | Organization, WebSite, Service, CreativeWork, Article, BreadcrumbList — all appropriate |
| Accurate claims | PASS | Schema claims match visible page content |
| Stable entity identifiers | PASS | #org and #website are stable across all pages |
| Consistent Organization identity | PASS | Name, URL, email, telephone consistent everywhere |
| WebSite / WebPage relationships | PASS | WebSite on home; mainEntityOfPage on articles/cases |
| BreadcrumbList accuracy | PASS | Breadcrumbs reflect actual page hierarchy |
| Article schema where justified | PASS | All 5 insights use Article |
| Service schema where justified | PASS | Consulting and Execution use Service |
| sameAs only when real | PASS | No sameAs present (none confirmed) |
| Contact data accuracy | PASS | Email and phone match EM.CONFIG.contact |
| Language consistency | PASS | inLanguage matches page language |
| URL consistency | PASS | mainEntityOfPage and url properties use absolute URLs |

---

## 4. Entity Graph Audit

| Entity | Consistency | Issues |
|--------|-------------|--------|
| Elite Maison (Organization) | HIGH | Consistent name, URL, services across all pages |
| Consulting capabilities | HIGH | 8 capabilities listed consistently in page and schema |
| Execution solutions | HIGH | 6 solutions listed consistently in page and schema |
| Sectors | MEDIUM | 6 sectors listed in page; no schema connection to services |
| Cases | HIGH | 5 cases with consistent IDs, names, and proof |
| Insights | HIGH | 5 insights with consistent IDs, titles, and topics |

**Disconnected entity references:**
- Sectors are not linked to relevant Consulting/Execution capabilities in schema
- Cases are not linked to relevant Sectors in schema
- Insights are not linked to relevant Consulting/Execution capabilities in schema

**Missing relationships that would be useful:**
- Case -> Sector relationship in schema
- Insight -> Consulting/Execution capability relationship in schema
- Sector -> Consulting/Execution capability relationship in schema

---

## 5. Evidence Classification

| Finding | Evidence Type |
|---------|--------------|
| Valid JSON-LD on all pages | VERIFIED LOCAL TECHNICAL EVIDENCE |
| Correct @type usage | VERIFIED LOCAL TECHNICAL EVIDENCE |
| Missing datePublished on Article | VERIFIED LOCAL TECHNICAL EVIDENCE |
| Missing author entity | VERIFIED LOCAL TECHNICAL EVIDENCE |
| Missing sameAs | VERIFIED LOCAL TECHNICAL EVIDENCE |
| Disconnected sector-case-insight entities | VERIFIED LOCAL TECHNICAL EVIDENCE |
| No FAQPage/HowTo/Review/AggregateRating/Speakable | VERIFIED LOCAL TECHNICAL EVIDENCE |
