# Phase 2A — Offer Clarity

**Document version:** v1  
**Last updated:** 2026-09-20  
**Purpose:** Audit what exactly is being offered at each CTA, what happens after inquiry, and what value the visitor expects before contacting. No invented packages, prices, guarantees, or service tiers.

---

## Verified Offer Structure

| Element | Current state | Evidence | Confidence |
|---|---|---|---|
| Primary offer | Consultation inquiry (FormSubmit form) | EM.CONFIG.contact.formsubmitUrl, src/pages/ContactPage.tsx | HIGH |
| Secondary offers | Direct channels: WhatsApp, email, phone | EM.CONFIG.contact, src/components/layout/ContactDock.tsx | HIGH |
| Consulting path | Advisory sessions: focused diagnosis + options + roadmap | EM.CONSULTING[], EM.ENGAGE[] | HIGH |
| Execution path | Scoped execution: campaigns, channels, systems, automation, branding | EM.EXECUTION[] | HIGH |
| Entry-level offer scope | Advisory sessions (focused diagnosis + options) or scoped execution pilots | .agents/product-marketing.md v2 | MEDIUM (owner input required) |
| Engagement model | Project-based and advisory, scoped to client stage, sector, and problem | EM.COPY.home.lead, EM.COPY.consulting.lead | HIGH |
| Next step after inquiry | Not described on site | Contact page copy | HIGH (absence confirmed) |
| Commercial terms | Not present in worktree | .agents/product-marketing.md | HIGH (absence confirmed) |

---

## Unclear Offer Structure

| Element | Question | Why it matters | Evidence |
|---|---|---|---|
| Minimum engagement | What is the smallest scope the firm will accept? | Visitor needs to know if their budget and problem size fit. | .agents/product-marketing.md — UNKNOWN |
| Pricing model | Retainer, project, daily rate, success fee, or hybrid? | Value proposition and objection handling depend on pricing context. | .agents/product-marketing.md — UNKNOWN |
| Inquiry outcome | What does the visitor receive after submitting the form? | Uncertainty about next steps reduces form completion. | EM.COPY.contact.lead |
| Consulting vs. Execution boundary | When does consulting end and execution begin? Can a client do one without the other? | Visitor may not understand the relationship between the two paths. | EM.COPY.home.capTitle |
| Scope definition | What is included in a scoped execution pilot vs. a full engagement? | Visitor needs to understand what they are committing to. | EM.EXECUTION[] |
| Timeline | How long does a typical engagement take? | Visitor needs to plan resources and budget. | Not present in worktree |

---

## Owner Input Required

| Question | Why it matters | Category |
|---|---|---|
| What is the minimum engagement size (budget, duration, scope)? | Sets visitor expectation and filters unqualified inquiries. | Commercial model |
| What is the pricing model (retainer, project, daily rate, success fee, hybrid)? | Shapes value proposition and objection handling. | Commercial model |
| What does the visitor receive after submitting an inquiry? | Reduces commitment friction and improves form completion. | Inquiry process |
| What is the typical timeline from inquiry to first meaningful conversation? | Sets expectation and reduces follow-up uncertainty. | Inquiry process |
| What is the boundary between consulting and execution? Can a client engage in one without the other? | Clarifies the two-paths relationship and reduces confusion. | Engagement model |
| What does a scoped execution pilot include (deliverables, duration, cost range)? | Helps visitor self-qualify and reduces sales friction. | Offer structure |
| What kind of client should NOT contact Elite Maison? | Sets expectations and reduces wrong-audience inquiries. | Positioning |

---

## CTA-by-CTA Offer Audit

| CTA | What is offered | What happens next | Value expected before contact | Clarity |
|---|---|---|---|---|
| Have a question? / لديك استفسار؟ (hero) | Opens Contact Dock for direct conversation | Contact Dock opens with WhatsApp, email, phone, and inquiry form | Diagnosis of their specific situation | MEDIUM — action is clear, outcome is not *(owner-approved 2026-09-20)* |
| Explore consulting (path) | Consulting capabilities and frameworks | Not described | Understanding of how diagnosis works | MEDIUM — path is clear, next step is not |
| Explore execution (path) | Execution capabilities and measurable operations | Not described | Understanding of how execution works | MEDIUM — path is clear, next step is not |
| Read the case (cases) | Detailed case study | Not described | Outcome proof and context | MEDIUM — exploration is clear, inquiry link is implicit |
| Read the insight (insights) | Analytical article | Not described | Practical thinking on a relevant topic | MEDIUM — exploration is clear, inquiry link is implicit |
| Start a conversation (about) | General inquiry | Not described | Firm identity and method | MEDIUM — action is clear, outcome is not |
| Send inquiry (contact) | Form submission + direct channels | Not described | Direct communication with the team | MEDIUM — channels are clear, next step is not |

---

## Engagement Boundary Understanding

| Question | Current state | Issue |
|---|---|---|
| Is consulting framed clearly? | Yes — diagnosis, strategy, prioritization, roadmap, KPIs, executive support. | Retain. |
| Is execution framed clearly? | Yes — campaigns, channels, systems, automation, branding, activation. | Retain. |
| Are engagement boundaries understandable? | Partial — the two paths are presented as linked but not as sequential. Visitor may not know if they need one, both, or which first. | Add a decision aid or boundary description. |
| Is the next step clear? | No — no timeline, no process description, no what to expect copy. | Add next-step description to contact page and CTA context. |
