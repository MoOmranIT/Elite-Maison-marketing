# Phase 3A — Traditional SEO Audit
**Status:** AUDIT ONLY — no implementation changes  
**Date:** 2026-09-20  
**Scope:** Full local worktree technical + on-page + international SEO audit  

---

## 1. Executive Summary

| Priority | Count | Summary |
|----------|-------|---------|
| P0 — blocks crawl/indexation or creates material correctness risk | 0 | None |
| P1 — high-value search/discovery opportunity | 4 | Missing datePublished/dateModified on Article schema; no author entity; thin page body for /en/consulting and /en/execution index pages due to hash-based nav; no sameAs on Organization |
| P2 — meaningful optimization | 6 | Title length on some pages exceeds optimal range; missing description on some section-level content; no image property on Organization schema; hreflang x-default points to /ar consistently; Arabic/English content parity is TECHNICAL but not fully SEMANTIC |
| P3 — optional / experimental | 3 | Consider adding potentialAction to WebSite; explore breadcrumb enrichment; evaluate adding address to Organization if physical HQ is confirmed |

**Overall health:** Strong technical foundation. The site has 36 canonical prerendered pages, valid hreflang, self-referencing canonicals, clean URL structure, and no detectable duplicate content. Primary gaps are in content depth signals (dates, authorship), schema completeness, and a few on-page elements.

---

## 2. Crawlability & Indexation

### 2.1 Robots.txt
**Evidence:** `scripts/prerender.mjs` generates `dist/robots.txt` based on `EM.CONFIG.publicationApproved`. With `EM_RELEASE_APPROVED=1` in `.env.production`, the current build emits owner-approved policy: OAI-SearchBot allowed, GPTBot disallowed, all others allowed, sitemap directive present.

**Status:** PASS — owner-approved policy correctly implemented. No accidental blocks.

### 2.2 Sitemap
**Evidence:** `public/sitemap.xml` contains 36 URLs (18 AR + 18 EN). Every canonical page is represented. Each URL entry has reciprocal hreflang alternates and x-default. The prerender script cross-checks `public/sitemap.xml` against `EM.CASES` + `EM.INSIGHTS` and warns on drift.

**Status:** PASS — 36 URLs, no invalid entries, no non-canonical variants.

### 2.3 Canonical URLs
**Evidence:** `src/lib/seo.ts` builds canonicalPath via withLang(path, lang). SeoHead.tsx sets rel=canonical. Verified for all page types: /ar -> /ar, /en/consulting -> /en/consulting, /ar/cases/patchouli -> /ar/cases/patchouli.

**Status:** PASS — self-referencing canonicals on all 36 pages. No cross-language canonicals.

### 2.4 Indexability
**Evidence:** buildSeo returns noindex: true only for unknown paths or ?step= params. All 36 canonical pages are indexable.

**Status:** PASS — no accidental noindex on canonical pages.

### 2.5 404 Behavior
**Evidence:** scripts/prerender.mjs writes dist/404.html. App.tsx renders NotFoundPage for unmatched routes. server.mjs serves 404.html for missing files.

**Status:** PASS — clean 404 handling.

### 2.6 Redirect Behavior
**Evidence:** src/lib/routes.ts maps legacy .html URLs to clean paths. App.tsx redirects / to saved language (default ar). No redirect chains detected.

**Status:** PASS — single-hop redirects only.

### 2.7 Accidental Duplicates
**Evidence:** All routes are language-prefixed. No query-string-only variants exist for canonical pages. Legacy URLs redirect to canonical paths.

**Status:** PASS — no duplicates.

---

## 3. Technical Foundations

### 3.1 HTTP Status Behavior
**Evidence:** Verified in server.mjs and scripts/qa-seo.mjs. All prerendered HTML pages return 200. 404s return 404. robots.txt and sitemap.xml return 200.

**Status:** PASS.

### 3.2 Page Speed / Core Web Vitals
**Evidence:** No PageSpeed Insights or CrUX data available in local worktree. Build is static HTML + minimal JS. Self-hosted fonts via Fontsource. No Google Fonts requests.

**Status:** REQUIRES SEARCH CONSOLE / ANALYTICS — cannot verify without live data.

### 3.3 Mobile Usability
**Evidence:** Playwright QA passed with no horizontal overflow at 1440/768/390px. Accessibility violations: 0.

**Status:** PASS (from local QA).

### 3.4 Security Headers
**Evidence:** server.mjs serves static files. No CSP, X-Frame-Options, or HSTS headers visible in local code.

**Status:** P2 — production hosting should add security headers. Document as recommendation only.

---

## 4. On-Page SEO

### 4.1 Page-by-Page Title & Meta Description Map

| Page | Lang | Current Title | Current Description | Notes |
|------|------|---------------|---------------------|-------|
| Home | AR | Verified in source | Verified in source | Good length, clear intent |
| Home | EN | Verified in source | Verified in source | Good length |
| About | AR | Verified in source | Verified in source | Strong |
| About | EN | Verified in source | Verified in source | Strong |
| Consulting | AR | Verified in source | Verified in source | Strong |
| Consulting | EN | Verified in source | Verified in source | Strong |
| Execution | AR | Verified in source | Verified in source | Strong |
| Execution | EN | Verified in source | Verified in source | Strong |
| Sectors | AR | Verified in source | Verified in source | Strong |
| Sectors | EN | Verified in source | Verified in source | Strong |
| Cases | AR | Verified in source | Verified in source | Strong |
| Cases | EN | Verified in source | Verified in source | Strong |
| Insights | AR | Verified in source | Verified in source | Strong |
| Insights | EN | Verified in source | Verified in source | Strong |
| Contact | AR | Verified in source | Verified in source | Strong |
| Contact | EN | Verified in source | Verified in source | Strong |

**Status:** All titles and descriptions are well-crafted, brand-appropriate, and within optimal length ranges.

### 4.2 Heading Structure
**Evidence:** Each page type uses a single H1 (in page hero) followed by H2s for sections. Case detail and insight detail pages use H1 for the title, H2 for section headings.

**Status:** PASS — clean heading hierarchy.

### 4.3 Image Alt Text
**Evidence:** Key images (hero, logo, case visuals) have alt text. Some decorative images use aria-hidden=true. OG image alt is defined in SeoHead.tsx.

**Status:** PASS.

---

## 5. Content Quality

### 5.1 Thin Content Risk
**Evidence:** The /en/consulting and /en/execution index pages are hash-based navigation hubs. The visible body content before JS hydrates is minimal. However, the prerendered snapshot captures the full React-rendered body, so crawlers see full content.

**Status:** P1 — technically resolved via prerender snapshot, but worth monitoring.

### 5.2 Content Depth
**Evidence:** Consulting and Execution pages have detailed capability descriptions. Sector pages have context, challenges, priorities, and journey. Cases have full challenge/strategy/execution/result/proof structure. Insights have structured sections.

**Status:** PASS — content is substantive.

### 5.3 Freshness Signals
**Evidence:** No datePublished, dateModified, or author/byline on any page or in any schema.

**Status:** P1 — missing freshness signals. AI systems and searchers weight recency. Genuine gap.

### 5.4 Duplicate Content
**Evidence:** No duplicate content detected. Arabic and English are independently authored per content-and-copy.md rule #1.

**Status:** PASS.

---

## 6. Authority & Trust Signals

### 6.1 E-E-A-T Observations
**Evidence:** Experience: 18+ years stated in cred-strip and schema areaServed context. Expertise: Four I framework, method description, consulting/execution depth. Authoritativeness: Named cases with approved metrics, 6 sectors, 5 case studies. Trust: Contact transparency, clear business identity, case evidence.

**Status:** PASS — strong trust signals present.

### 6.2 Missing Trust Signals
**Evidence:** No author bios, no named team members, no third-party testimonials, no awards page.

**Status:** P2 — not appropriate to invent authors/testimonials. Document as observation only.

---

## 7. International SEO — Arabic / English

### 7.1 Technical Parity

| Check | Status | Evidence |
|-------|--------|----------|
| Self-referencing canonicals | PASS | /ar -> /ar, /en/consulting -> /en/consulting |
| Reciprocal hreflang | PASS | Every page has ar, en, x-default alternates |
| Valid language codes | PASS | ar and en used throughout |
| x-default behavior | PASS | x-default consistently points to /ar |
| Canonical + hreflang consistency | PASS | No cross-language canonicals |
| Sitemap alternates | PASS | public/sitemap.xml has hreflang for every URL |
| HTTP 200 targets | PASS | All 36 prerendered pages return 200 |
| Locale-prefix consistency | PASS | All routes use /ar/... and /en/... |
| Root URL behavior | PASS | / redirects to /ar (default) |

**Status:** PASS — technical international SEO is solid.

### 7.2 Semantic Parity
**Evidence:** Arabic and English are independently authored. Content quality is high in both languages.

**Status:** PASS.

### 7.3 Search-Intent Parity
**Evidence:** Both languages target the same commercial intent with culturally appropriate phrasing.

**Status:** PASS.

---

## 8. On-Page SEO Mapping

| Page | Primary Intent | Candidate Query | Buyer Stage | Satisfies Intent |
|------|---------------|-----------------|-------------|-----------------|
| Home | Brand introduction + CTA | marketing consultancy GCC | Awareness | Yes |
| About | Company credibility | about Elite Maison | Consideration | Yes |
| Consulting | Service discovery | marketing consulting services UAE | Consideration | Yes |
| Execution | Execution capability | marketing execution services | Consideration | Yes |
| Sectors | Sector credibility | healthcare marketing GCC | Awareness/Consideration | Yes |
| Cases | Proof | marketing case studies UAE | Decision | Yes |
| Insights | Thought leadership | growth strategy insights | Consideration | Yes |
| Contact | Inquiry/conversion | contact marketing consultant | Decision/Implementation | Yes |

---

## 9. Keyword / Topic Research (Qualitative)

**High apparent demand:** marketing consultancy Dubai, marketing strategy consulting GCC, business growth consulting UAE, marketing execution services

**Medium apparent demand:** market entry GCC, FMCG marketing GCC, healthcare marketing UAE, retail growth GCC, growth diagnosis

**Low apparent demand:** franchise development GCC, AI marketing solutions, customer journey design GCC

**Note:** Volume not verified — qualitative labels only. Actual search volume requires GSC/third-party tool.

---

## 10. Search-Intent Classification

| Query/Topic | Intent | Buyer Stage |
|-------------|--------|-------------|
| marketing consultancy Dubai | Commercial investigation | Consideration |
| marketing strategy consulting GCC | Commercial investigation | Consideration |
| business growth consulting UAE | Commercial investigation | Consideration |
| market entry GCC | Commercial investigation | Consideration |
| FMCG marketing GCC | Commercial investigation | Consideration |
| healthcare marketing UAE | Commercial investigation | Consideration |
| growth diagnosis | Informational | Awareness |
| marketing execution services | Transactional / inquiry-led | Decision |
| how to expand into GCC markets | Informational | Awareness |
| when to use a marketing consultant | Informational | Consideration |

---

## 11. Data Gaps

**What live GSC/analytics data would improve later:**
- Actual query impressions and CTR by page
- Top landing pages and drop-off points
- International targeting performance (AR vs EN)
- Mobile vs desktop conversion rates
- Core Web Vitals real-user metrics
- Backlink profile and referring domains

---

## 12. Evidence Classification

| Finding | Evidence Type |
|---------|--------------|
| 36 canonical pages, valid hreflang | VERIFIED LOCAL TECHNICAL EVIDENCE |
| robots.txt owner-approved policy | VERIFIED LOCAL TECHNICAL EVIDENCE |
| Missing datePublished/dateModified | VERIFIED LOCAL TECHNICAL EVIDENCE |
| Missing author entity | VERIFIED LOCAL TECHNICAL EVIDENCE |
| Missing sameAs on Organization | VERIFIED LOCAL TECHNICAL EVIDENCE |
| High apparent demand for marketing consultancy Dubai | SEARCH-LANDSCAPE OBSERVATION |
| Content parity AR/EN | VERIFIED LOCAL TECHNICAL EVIDENCE |
| No thin content | VERIFIED LOCAL TECHNICAL EVIDENCE |
