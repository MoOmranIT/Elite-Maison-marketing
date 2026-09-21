# Phase 3A — Internal Link Map
**Status:** AUDIT ONLY — no implementation changes  
**Date:** 2026-09-20  

---

## 1. Executive Summary

Current internal linking is functional but largely mechanical (CTAs, nav, related-path components). There is a significant opportunity to add high-value contextual links that connect insights to capabilities, cases to sectors, and sectors to cases. These links would serve both user discovery and SEO crawl equity distribution.

---

## 2. Existing Internal Links

| Source Page | Target Page | Type | Why Useful |
|-------------|-------------|------|------------|
| Home -> Cases | ImpactLedger | Proof discovery | Outcome-first credibility |
| Home -> Sectors | SectorsSection | Sector discovery | Context before capability |
| About -> Consulting | CtaBand | Service discovery | Method -> application |
| About -> Contact | Engage CTAs | Conversion | Engagement path |
| Consulting -> Contact | CtaBand | Conversion | Inquiry entry |
| Execution -> Contact | CtaBand | Conversion | Inquiry entry |
| Sectors -> Contact | CtaBand | Conversion | Inquiry entry |
| Cases -> Contact | CtaBand | Conversion | Similar challenge CTA |
| Insights -> Contact | CtaBand | Conversion | Idea needs decision CTA |
| Case Detail -> Next/Prev Case | Sequence | Content discovery | Sequential reading |
| Insight Detail -> Next/Prev Insight | Sequence | Content discovery | Sequential reading |

---

## 3. Proposed High-Value Contextual Links

| Source Page | Target Page | Why Useful to User | SEO Role | Suggested Anchor Direction |
|-------------|-------------|-------------------|----------|---------------------------|
| Insight: growth-guide | Consulting: Growth & Business Development | User wants to move from roadmap to execution | Hub-and-spoke; passes equity to service page | From insight CTA or inline: "If your roadmap needs sharper prioritization, our growth consulting..." |
| Insight: growth-guide | Case: Bloom | User wants proof of roadmap impact | Contextual proof link | From insight body or related section: "See how Bloom used prioritization to grow from AED 18K to AED 65K/month" |
| Insight: sales-article | Consulting: Sales & Revenue Development | User wants to fix sales leakage | Hub-and-spoke | From insight CTA: "If handoffs are losing revenue, our sales development capability..." |
| Insight: sales-article | Case: Attractive Smile | User wants proof of demand stabilization | Contextual proof link | From insight body: "Attractive Smile stabilized bookings through demand-path clarity" |
| Insight: expansion-brief | Consulting: Market Expansion & Entry | User wants expansion advisory | Hub-and-spoke | From insight CTA: "Before entering a new market, our expansion advisory..." |
| Insight: expansion-brief | Case: Bin Ablan | User wants proof of market entry | Contextual proof link | From insight body: "Bin Ablan entered five markets with new distribution channels" |
| Insight: ai-insight | Execution: Automation & AI Solutions | User wants AI execution | Hub-and-spoke | From insight CTA: "When AI is ready for operational use, our automation practice..." |
| Insight: ai-insight | Case: AI Brains | User wants proof of AI project delivery | Contextual proof link | From insight body: "AI Brains turned an AI concept into a measurable, award-winning project" |
| Insight: cx-check | Consulting: Customer Journey & Experience Design | User wants to fix journey friction | Hub-and-spoke | From insight CTA: "If your journey has friction, our CX design capability..." |
| Insight: cx-check | Execution: Performance Marketing | User wants to fix conversion leakage | Cross-section link | From insight body: "Performance marketing can recover leakage at campaign touchpoints" |
| Sector: Healthcare | Case: Attractive Smile | User wants healthcare proof | Contextual proof | From sector plate: "Healthcare case: 12 consecutive days of bookings" |
| Sector: FMCG | Case: Bloom | User wants FMCG proof | Contextual proof | From sector plate: "FMCG case: AED 18K to AED 65K/month" |
| Sector: Hospitality | Case: Patchouli | User wants hospitality proof | Contextual proof | From sector plate: "Hospitality case: 11 franchise branches" |
| Sector: Retail & Distribution | Case: Bin Ablan | User wants distribution proof | Contextual proof | From sector plate: "Retail case: five-country distribution expansion" |
| Sector: E-commerce | Execution: Performance Marketing | User wants e-commerce growth | Hub-and-spoke | From sector plate: "E-commerce growth through performance marketing" |
| Sector: Education | Consulting: Growth & Business Development | User wants education sector growth | Hub-and-spoke | From sector plate: "Education growth strategy" |
| Case: Attractive Smile | Sector: Healthcare | User wants healthcare context | Backlink for context | From case detail: "Healthcare sector" |
| Case: Bloom | Sector: FMCG | User wants FMCG context | Backlink for context | From case detail: "FMCG sector" |
| Case: Patchouli | Sector: Hospitality | User wants hospitality context | Backlink for context | From case detail: "Hospitality sector" |
| Case: Bin Ablan | Sector: Retail & Distribution | User wants retail context | Backlink for context | From case detail: "Retail & Distribution sector" |
| Case: AI Brains | Insight: ai-insight | User wants AI insight | Contextual content | From case detail: "Read our insight on AI operational value" |
| Consulting: Growth | Insight: growth-guide | User wants growth thinking | Thought leadership link | From consulting canvas: "Our thinking on growth roadmaps" |
| Consulting: Sales | Insight: sales-article | User wants sales thinking | Thought leadership link | From consulting canvas: "Our thinking on sales-revenue leakage" |
| Consulting: Market Expansion | Insight: expansion-brief | User wants expansion thinking | Thought leadership link | From consulting canvas: "Our thinking on GCC market entry" |
| Consulting: Customer Journey | Insight: cx-check | User wants CX thinking | Thought leadership link | From consulting canvas: "Our thinking on customer journey friction" |
| Execution: Automation & AI | Insight: ai-insight | User wants AI thinking | Thought leadership link | From execution module: "Our thinking on AI operational value" |
| Home -> Insight: growth-guide | Featured insight | User wants latest thinking | Content discovery | From home insight section |
| Cases -> Insight: sales-article | Sales relevance | User wants sales insight after case | Cross-section | From cases page related section |
| Insights -> Case: Patchouli | Featured case | User wants proof after insight | Proof discovery | From insights page featured section |

---

## 4. Link Priority Matrix

| Link | Priority | Effort | Expected Benefit |
|------|----------|--------|------------------|
| Insight -> relevant Consulting | P1 | Low (copy change) | High — connects thinking to capability |
| Insight -> relevant Case | P1 | Low (copy change) | High — connects thinking to proof |
| Sector -> relevant Case | P1 | Low (copy change) | High — connects sector to proof |
| Case -> relevant Sector | P1 | Low (copy change) | Medium — backlink context |
| Case -> relevant Insight | P2 | Low (copy change) | Medium — connects proof to thinking |
| Consulting -> supporting Insight | P2 | Low (copy change) | Medium — thought leadership depth |
| Execution -> supporting Case | P2 | Low (copy change) | Medium — execution proof |
| Home -> featured Insight | P2 | Low (component change) | Medium — content discovery |
| Insights -> featured Case | P3 | Low (component change) | Low-Medium — proof discovery |

---

## 5. Evidence Classification

| Finding | Evidence Type |
|---------|--------------|
| Existing internal links | VERIFIED LOCAL TECHNICAL EVIDENCE |
| Proposed contextual links | INFERENCE |
| Link priority ratings | INFERENCE |
