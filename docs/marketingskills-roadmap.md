# MarketingSkills Routing Map — Elite Maison

**Document version:** v1  
**Last updated:** 2026-09-20  
**Purpose:** Explain exactly how the installed MarketingSkills library should be used for Elite Maison, in the right sequence and for the right business problem.

---

## Phase 1

**Product Marketing Foundation (CURRENT — this phase)**

Skill: `product-marketing`  
Status: In progress. Created `.agents/product-marketing.md`, evidence register, knowledge gaps, and roadmap.

---

## Phase 2

**Positioning + Copy + CRO**

| Skill | Why Elite Maison needs it | Input dependency | Expected output | Sequence |
|---|---|---|---|---|
| `copywriting` | Homepage, about, consulting, execution, cases, insights, contact pages need conversion-focused copy in AR/EN | `.agents/product-marketing.md` (audience, JTBD, objections, brand voice) | Rewritten page copy and CTAs that match verified audience language | 2.1 |
| `copy-editing` | Ensure AR/EN parity, tone consistency, and editorial rule compliance across all pages | `copywriting` drafts + approved copy deck v2 | Polished, compliant copy deck v3 | 2.2 |
| `cro` | Identify conversion friction, form drop-off points, and CTA effectiveness on key pages | `.agents/product-marketing.md`, analytics baseline (when available) | Prioritized CRO backlog with hypotheses | 2.3 |
| `marketing-psychology` | Apply persuasion principles to CTAs, social proof, and objection handling | `.agents/product-marketing.md`, `cro` findings | Psychology-tested copy and layout recommendations | 2.4 |
| `offers` | Clarify consultation vs execution engagement framing and packaging | `.agents/product-marketing.md`, `cro` findings | Offer architecture and inquiry-path optimization | 2.5 |

---

## Phase 3

**SEO + GEO/AEO + Content Discovery**

| Skill | Why Elite Maison needs it | Input dependency | Expected output | Sequence |
|---|---|---|---|---|
| `seo-audit` | Audit current 36-page SSG for metadata, headings, internal linking, crawlability, and Core Web Vitals | `.agents/product-marketing.md`, built `dist/` output | Technical SEO audit with prioritized fixes | 3.1 |
| `ai-seo` | Optimize for AI/LLM answerability (GEO/AEO) given decision-maker query patterns | `.agents/product-marketing.md`, `seo-audit` output | GEO-optimized content structure and answer blocks | 3.2 |
| `schema` | Validate and extend JSON-LD for Organization, Service, Article, BreadcrumbList | `.agents/product-marketing.md`, `seo-audit` output | Schema recommendations; current schema is sound but can be extended | 3.3 |
| `site-architecture` | Review crawl depth, URL structure, hreflang, internal linking, and sitemap | `.agents/product-marketing.md`, `seo-audit` output | Architecture recommendations | 3.4 |
| `content-strategy` | Plan insight and sector content calendar aligned to JTBD and buyer journey | `.agents/product-marketing.md`, `seo-audit` output | Content strategy brief | 3.5 |

---

## Phase 4

**Analytics + Attribution + Experimentation**

| Skill | Why Elite Maison needs it | Input dependency | Expected output | Sequence |
|---|---|---|---|---|
| `analytics` | Establish measurement baseline, define KPIs, and set up tracking | `.agents/product-marketing.md`, `seo-audit` output | Analytics implementation plan and KPI framework | 4.1 |
| `attribution` | Model how marketing touchpoints contribute to consultation inquiries | `.agents/product-marketing.md`, `analytics` setup | Attribution model recommendations | 4.2 |
| `ab-testing` | Test headline, CTA, and layout hypotheses from CRO findings | `.agents/product-marketing.md`, `cro` output | Prioritized A/B test backlog | 4.3 |

---

## Phase 5

**Growth / GTM / Distribution**

| Skill | Why Elite Maison needs it | Input dependency | Expected output | Sequence |
|---|---|---|---|---|
| `marketing-ideas` | Generate channel and campaign ideas grounded in verified positioning | `.agents/product-marketing.md`, `content-strategy` output | Prioritized idea backlog | 5.1 |
| `lead-magnets` | Design gated assets (briefs, checklists, readiness assessments) to capture qualified leads | `.agents/product-marketing.md`, `content-strategy` output | Lead magnet concepts and briefs | 5.2 |
| `social` | Define social proof and LinkedIn/Arabic-social presence strategy | `.agents/product-marketing.md`, `content-strategy` output | Social strategy brief | 5.3 |
| `emails` | Build nurture and follow-up sequences for inquiry and post-inquiry stages | `.agents/product-marketing.md`, `lead-magnets` output | Email sequence briefs | 5.4 |
| `public-relations` | Position owner and firm for GCC business press, podcasts, and speaking | `.agents/product-marketing.md`, `content-strategy` output | PR pitch angles and target list | 5.5 |
| `co-marketing` | Identify sector partners for joint content, events, or referrals | `.agents/product-marketing.md`, competitor research (when available) | Partner identification brief | 5.6 |
| `referrals` | Design referral and testimonial program | `.agents/product-marketing.md`, client research (when available) | Referral program brief | 5.7 |
| `sales-enablement` | Equip team with objection handling, pitch structure, and case-storytelling assets | `.agents/product-marketing.md`, `copy-editing` output | Sales playbook and asset kit | 5.8 |
| `revops` | Align marketing, sales, and operations handoffs and SLAs | `.agents/product-marketing.md`, `analytics` + `attribution` outputs | RevOps process recommendations | 5.9 |

---

## Phase 6

**Marketing Council + Final Prioritization**

| Skill | Why Elite Maison needs it | Input dependency | Expected output | Sequence |
|---|---|---|---|---|
| `marketing-council` | Challenge positioning clarity, differentiation, evidence quality, and conversion logic before major spend | All prior phases outputs | Expert critique with labeled opinions vs. facts | 6.1 |
| `marketing-plan` | Synthesize all prior work into a prioritized 12-month marketing plan | `.agents/product-marketing.md`, all prior phases outputs | Prioritized marketing plan with budget, timeline, and owners | 6.2 |

---

## Skills evaluated as NOT CURRENTLY RELEVANT

| Skill | Reason for exclusion |
|---|---|
| `ads` | No ad accounts, ad spend, or campaign data exist in the local worktree. Ads execution should follow analytics and CRO foundation in Phase 4. |
| `ab-testing` | Listed in Phase 4 because it requires a live analytics baseline first. Not relevant before Phase 4. |

