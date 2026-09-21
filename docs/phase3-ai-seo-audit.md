# Phase 3A — AI SEO / GEO / AEO Audit
**Status:** AUDIT ONLY — no implementation changes  
**Date:** 2026-09-20  

---

## 1. Executive Summary

| Priority | Count | Summary |
|----------|-------|---------|
| P0 — blocks AI citation or creates material correctness risk | 0 | None |
| P1 — high-value AI citation opportunity | 5 | Missing datePublished/dateModified; missing author/expert entity; no sameAs on Organization; no publication dates on insights; no author attribution anywhere |
| P2 — meaningful AI optimization | 4 | GeoAnswer component is well-structured but lacks schema tie-in; no llms.txt evaluation needed (NOT NEEDED for current architecture); article content is quoteable but could be more explicitly answerable |
| P3 — optional / experimental | 3 | Consider adding speakable schema to key answer blocks; evaluate OKF/agent-readable bundles; monitor AI crawler policy interaction |

**Overall health:** Content is substantive, structured, and brand-consistent. Primary gaps are in metadata signals that AI systems use for attribution and recency weighting.

---

## 2. AI Citation Readiness

### 2.1 Clear Entity Identity
**Evidence:** Organization schema uses consistent name: "Elite Maison Marketing Consultancies" with alternateName "Elite Maison". URL, email, telephone, logo, and image are present.

**Status:** PASS — entity is consistent.

### 2.2 Brand Consistency
**Evidence:** Brand name, positioning line (Four I's. One Vision.), and GCC focus appear consistently across home, about, consulting, execution, sectors, and schema.

**Status:** PASS.

### 2.3 Service / Category Clarity
**Evidence:** Consulting and Execution pages clearly describe 8 consulting capabilities and 6 execution solutions. Sectors page lists 6 sectors with context.

**Status:** PASS.

### 2.4 Explicit Factual Statements
**Evidence:** Case studies contain specific factual claims: Attractive Smile (12 consecutive days), Bloom (AED 18K -> AED 40K -> AED 65K/month), Bin Ablan (5 countries), Patchouli (11 branches), AI Brains (award). These are all APPROVED FOR PUBLIC USE per evidence register.

**Status:** PASS — facts are explicit and source-backed.

### 2.5 Case-Study Evidence
**Evidence:** Each case has challenge, strategy, execution, result, and proof. The ImpactLedger component renders these in array order with metrics.

**Status:** PASS — strong proof structure.

### 2.6 Named Proof
**Evidence:** Client names are public (publicationApproved=true, anonymizeCases=false). Case names appear in EM.CASES with publicName in both AR and EN.

**Status:** PASS — named proof is present.

### 2.7 Structured Headings
**Evidence:** All pages use H1 -> H2 hierarchy. Insight articles use H1 for title, H2 for sections. Cases use H1 for case name, H2 for section labels.

**Status:** PASS.

### 2.8 Answerable Sections
**Evidence:** Insights have explicit answer/summary fields. Consulting and Execution pages have objective/scope/impact/metrics structure. GeoAnswer component provides direct answers.

**Status:** PASS — content is answerable.

### 2.9 Source Attribution
**Evidence:** No author bylines, no publication dates, no external source citations within articles.

**Status:** P1 — missing. AI systems and searchers use attribution for credibility.

### 2.10 Publication Dates
**Evidence:** No datePublished or dateModified anywhere in schema or visible content.

**Status:** P1 — missing. Recency is a ranking and citation signal.

### 2.11 Author / Expertise Signals
**Evidence:** No author entity, no biography, no credentials, no named experts.

**Status:** P1 — missing. E-E-A-T requires expertise signals.

### 2.12 Internal Entity Consistency
**Evidence:** Organization name, URL, and services are consistent across all pages and schema.

**Status:** PASS.

---

## 3. Statement Quotability Analysis

### Easy to Quote / Cite
- "18+ years of hands-on experience in GCC" — specific, verifiable
- "Bloom / Perfect Foodstuff: AED 18K in Q1, AED 40K, average AED 65K/month" — quantitative, approved
- "Attractive Smile: 12 consecutive days of bookings" — specific, approved
- "Bin Ablan: market entry across 5 countries" — specific, approved
- "Le Patchouli Cafe: 11 franchise branches" — specific, approved
- "AI Brains: Award for Best AI-Supporting Project" — specific, approved
- "Four I's: Insight, Ideas, Influence, Impact" — distinctive framework
- "Diagnose -> Prioritize -> Execute -> Measure & Improve" — method clarity

### Too Vague to Cite
- "A strategic house for marketing influence and business impact" — good positioning but vague without proof context
- "Experience that understands the business" — generic without specifics
- "Growth and marketing consultancy connecting decisions to execution" — accurate but not quotable as proof

### Unsupported / Unsafe to Amplify
- None identified — all factual claims are source-backed per evidence register

---

## 4. AI-Answer Query Readiness

| Query Type | Current Elite Maison Page | Evidence Available | Content Gap | AI Citation Potential |
|------------|---------------------------|-------------------|------------|----------------------|
| How should a company diagnose stalled growth before increasing ad spend? | Consulting page + growth-guide insight | Four I's framework, growth diagnosis methodology | Could be more explicit as a direct answer block | HIGH |
| How do GCC markets differ when planning market entry? | Expansion-brief insight + Bin Ablan case | Five-country market entry proof, expansion sections | Could add GCC-specific readiness checklist | HIGH |
| What should a company review before expanding into GCC markets? | Expansion-brief insight | Four readiness areas (market, channel, model, operating capacity) | Already answerable; could be richer | HIGH |
| When should a business use a marketing consultant vs execution partner? | About page + TwoPaths section | Consulting vs Execution clarity | No dedicated comparison content | MEDIUM |
| How can an internal marketing team work with an external consultancy? | About page (engage section) | EM.ENGAGE descriptions | Could expand with practical integration advice | MEDIUM |
| How do healthcare companies improve commercial demand? | Sectors page + Attractive Smile case | 12 consecutive days proof | Sector page could have more explicit demand-generation answer | MEDIUM |
| How do FMCG companies improve commercial demand? | Sectors page + Bloom case | AED 18K->40K->65K progression | Sector page could have more explicit demand-generation answer | MEDIUM |

---

## 5. llms.txt / Agent-Readable Files Evaluation

| Mechanism | Verdict | Rationale |
|-----------|---------|-----------|
| llms.txt | OPTIONAL | Current static architecture is already crawlable; llms.txt would provide a lightweight summary but is not required for basic AI discovery |
| llms-full.txt | NOT NEEDED | Site has only 36 pages; full content is already in prerendered HTML |
| agent-readable knowledge bundles | INSUFFICIENT EVIDENCE | No clear standard has emerged; maintenance burden outweighs likely benefit for a 36-page static site |
| OKF (Open Knowledge Format) | INSUFFICIENT EVIDENCE | Not a widely adopted standard for commercial sites |

**Note:** Do NOT implement llms.txt in Phase 3A. Evaluate again after Phase 3B implementation.

---

## 6. AI Crawler Policy Analysis

**Current owner-approved policy:**
- OAI-SearchBot: allowed
- GPTBot: disallowed
- All others: allowed

**Analysis:**
- **Search discovery:** OAI-SearchBot allowed means OpenAI's search crawler can index the site for ChatGPT search and potential citation.
- **AI answer visibility:** Allowed status for OAI-SearchBot supports citation potential. Disallowing GPTBot means OpenAI's training crawler cannot use content for model training — this is a policy decision, not a technical SEO error.
- **Training access:** GPTBot disallow prevents training use. This does not affect search indexing or citation by OAI-SearchBot.

**Do NOT silently reverse GPTBot disallow.** It is an owner policy decision.

---

## 7. Evidence Classification

| Finding | Evidence Type |
|---------|--------------|
| Organization schema consistent | VERIFIED LOCAL TECHNICAL EVIDENCE |
| Missing datePublished/dateModified | VERIFIED LOCAL TECHNICAL EVIDENCE |
| Missing author entity | VERIFIED LOCAL TECHNICAL EVIDENCE |
| Missing sameAs on Organization | VERIFIED LOCAL TECHNICAL EVIDENCE |
| Case facts are explicit and approved | VERIFIED LOCAL TECHNICAL EVIDENCE |
| llms.txt not needed for 36-page static site | INFERENCE |
| GPTBot disallow is owner policy | VERIFIED LOCAL TECHNICAL EVIDENCE |
| High AI citation potential for growth diagnosis | INFERENCE |
