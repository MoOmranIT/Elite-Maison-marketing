# Phase 2A — CRO Messaging Findings

**Document version:** v1  
**Last updated:** 2026-09-20  
**Purpose:** Heuristic CRO findings based on messaging analysis. NOT data-validated. No live conversion analytics exist.

> **LABEL:** HEURISTIC CRO FINDING — NOT DATA-VALIDATED

---

## Finding 1: Missing Post-Inquiry Expectation

| Field | Value |
|---|---|
| Page | Contact |
| Evidence | No copy describes what happens after form submission. EM.COPY.contact.lead mentions further detail is requested after first contact but does not set a timeline. |
| User friction | Uncertainty about next steps increases form abandonment. Visitor wonders: Will anyone respond? How long? What happens next? |
| Suggested response | Add a 1-line next-step description: We respond within [X] with a clear next step. |
| Data needed later | Form completion rate, time-to-response, inquiry quality score. |

---

## Finding 2: Hero CTA vs. Two Paths Confusion

| Field | Value |
|---|---|
| Page | Home |
| Evidence | Hero CTA says "Have a question?" (لديك استفسار؟) and opens Contact Dock. Two paths section says Explore consulting and Explore execution with equal visual weight. *(Note: Previous CTA "Send a consultation inquiry" was superseded by owner-approved hero patch 2026-09-20)* |
| User friction | Visitor may wonder: Should I click the hero CTA or choose a path? Are these the same action? |
| Suggested response | Make the hero CTA and path CTAs consistent: both lead to the same contact flow, or clearly differentiate them (e.g., hero = general inquiry, paths = capability-specific inquiry). |
| Data needed later | Click-through rate on hero CTA vs. path CTAs; form source tracking. |

---

## Finding 3: Proof Placement Sequence

| Field | Value |
|---|---|
| Page | Home |
| Evidence | Credential proof (18+ years, GCC focus) appears before outcome proof (case metrics). The cases ledger appears after the Four I's and delivery path. |
| User friction | Visitor may not trust the firm enough to read the method sections; outcome proof is more decision-relevant than credential proof. |
| Suggested response | Reorder proof sequence: lead with case metrics, follow with method, end with credentials. |
| Data needed later | Scroll depth on proof sections; time spent on case metrics vs. credential proof. |

---

## Finding 4: Generic CTA Language

| Field | Value |
|---|---|
| Page | Multiple |
| Evidence | Start a conversation, Contact us, Explore consulting, Read the insight — generic CTAs appear across multiple pages. |
| User friction | Generic CTAs do not communicate what the visitor gets or why they should act now. |
| Suggested response | Use outcome-specific CTAs: Discuss your challenge, Start with the challenge, See how this case applies to your context. |
| Data needed later | CTA click-through rate by wording variant. |

---

## Finding 5: Missing Situation-Matching

| Field | Value |
|---|---|
| Page | Home, About |
| Evidence | No explicit if this is you or if this is your situation framing. The visitor must infer whether the firm is relevant. |
| User friction | Wrong-audience visitors bounce; right-audience visitors may not self-identify quickly. |
| Suggested response | Add a 3-4 line situation matcher on the homepage or about page: If your growth is stalled because... / If your revenue leaks between interest and sale... / If you are entering a new market but readiness is unproven... |
| Data needed later | Bounce rate by traffic source; inquiry quality score by situation match. |

---

## Finding 6: Mobile Conversion Clarity

| Field | Value |
|---|---|
| Page | All |
| Evidence | No mobile-specific audit available; site uses responsive design with floating Contact Dock. |
| User friction | On mobile, the hero CTA, path CTAs, and floating dock may compete for attention. The visitor may not know which action to take first. |
| Suggested response | Conduct a mobile-specific message audit: verify CTA hierarchy, proof readability, and form field usability on small screens. |
| Data needed later | Mobile form completion rate, mobile bounce rate, mobile CTA click map. |

---

## Finding 7: Case Study Usefulness

| Field | Value |
|---|---|
| Page | Cases |
| Evidence | Case studies show challenge -> decision -> execution -> result, but lack a what this means for you bridge. |
| User friction | Visitor may read the case but not connect it to their own context. |
| Suggested response | Add a 1-line bridge at the end of each case: If this sounds like your situation, discuss your challenge. |
| Data needed later | Case page to inquiry conversion rate; time on case page. |

---

## Finding 8: Navigation-to-Conversion Flow

| Field | Value |
|---|---|
| Page | All |
| Evidence | Primary nav includes Home, About, Consulting, Execution, Sectors, Proof, Insights, Contact. Secondary paths are discoverable. |
| User friction | Visitor may browse multiple pages without a clear conversion path. No breadcrumb-to-inquiry logic is visible. |
| Suggested response | Add contextual CTAs on each page that link back to the most relevant inquiry path (e.g., sector page -> discuss your sector challenge). |
| Data needed later | Page-to-inquiry funnel; most common navigation paths before inquiry. |

---

## Finding 9: Contact Friction

| Field | Value |
|---|---|
| Page | Contact |
| Evidence | Form requires name, email, company, phone, message. Validation is present. Multiple channels (FormSubmit, WhatsApp, email, phone) reduce friction. |
| User friction | Long form may increase abandonment. Visitor may prefer WhatsApp or phone but not see the dock immediately. |
| Suggested response | Consider reducing form fields to 3 required fields (name, email, message) and making company/phone optional. Ensure Contact Dock is visible on scroll. |
| Data needed later | Form field completion rate; channel preference by visitor type. |

---

## Finding 10: Message Match

| Field | Value |
|---|---|
| Page | All |
| Evidence | No traffic-source-specific landing pages exist. All pages serve multiple audiences and entry points. |
| User friction | Visitor from a sector-specific ad or insight may land on the homepage and need to navigate to relevant content. |
| Suggested response | Create sector-specific or insight-specific landing page variants when traffic sources justify them. For now, ensure homepage and nav are clear enough for self-selection. |
| Data needed later | Landing page conversion rate by traffic source; most common entry pages. |

---

## Prioritization

| Priority | Finding | Rationale |
|---|---|---|
| P0 | Missing post-inquiry expectation | Blocks comprehension of what happens next; reduces form completion. |
| P1 | Hero CTA vs. two paths confusion | Material conversion friction; visitor unsure which action to take. |
| P1 | Proof placement sequence | Material trust friction; outcome proof should precede credential proof. |
| P2 | Generic CTA language | Optimization opportunity; stronger CTAs improve click-through. |
| P2 | Missing situation-matching | Optimization opportunity; improves audience self-selection. |
| P3 | Mobile conversion clarity | Polish; requires mobile-specific audit. |
| P3 | Case study usefulness | Polish; adds bridge copy to existing cases. |
| P3 | Navigation-to-conversion flow | Polish; contextual CTAs improve flow but not blocking. |
| P3 | Contact friction | Polish; form is already short; channel options are present. |
| P3 | Message match | Long-term optimization; requires traffic data. |
