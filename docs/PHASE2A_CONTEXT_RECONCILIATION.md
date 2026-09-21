# Phase 2A — Context Integrity & Owner-Approval Reconciliation

**Document version:** v1  
**Last updated:** 2026-09-20  
**Purpose:** Verify that Phase 2A analysis did not accidentally overwrite owner-approved current truth with older copy, inferred council opinions, or unsupported assumptions.  

---

## A. Canonical Context Path

**Actual authoritative path:** `.agents/product-marketing.md`

**Discrepancy found:** The Phase 2A final report (`docs/PHASE2A_MARKETING_AUDIT.md`) referred to `agents/product-marketing.md` (without leading dot). The actual file was located at `agents/product-marketing.md` and was moved to the canonical location `.agents/product-marketing.md` during this reconciliation. A backup copy exists at `agents/product-marketing-backup.md`.

**Action taken:** Safely moved `agents/product-marketing.md` → `.agents/product-marketing.md`. No content was lost.

---

## B. Hero Baseline

**Current implemented hero (verified from `src/data/em.js`):**
- Arabic: "وضوح أكبر."
- English: "Greater clarity."
- Accent AR: "قرارات أفضل. نمو أقوى."
- Accent EN: "Better decisions. Stronger growth."
- CTA AR: "لديك استفسار؟"
- CTA EN: "Have a question?"
- CTA behavior: Opens Contact Dock (not navigating to contact page)

**Previous hero (superseded):**
- Arabic: "النمو لا يحتاج دائمًا إلى مزيد من التسويق."
- English: "Growth does not always need more marketing."
- Accent AR: "أحيانًا يحتاج إلى قرار أفضل."
- Accent EN: "Sometimes it needs a better decision."

**Status:** Owner-approved latest hero IS implemented in the local worktree. Phase 2A documents were analyzing the previous hero as current; those references have been updated or labeled as historical.

---

## C. Council-Derived Additions

| Addition | Classification | Reason | Action Taken |
|---|---|---|---|
| Named competitive alternative | **REMOVE FROM AUTHORITATIVE CONTEXT** | No named competitor is cited in the local worktree. The Competitive Landscape section explicitly states "Named competitors referenced in the local worktree: None." Council suggestion to position against "activity-first agencies" is a structural alternative, not a named competitor. | Moved to `COMPETITOR RESEARCH CANDIDATE — NOT VALIDATED` in Hypotheses Requiring Validation section. |
| Narrowed audience | **KEEP AS INFERENCE** | The broader audience is verified from case evidence. Narrowing to 1-2 profiles is a council hypothesis, not owner-approved ICP. The Target Audience section lists multiple verified segments. | Added `ICP VALIDATION HYPOTHESIS` section. Narrowing criteria are labeled INFERRED. Broader verified audience retained. |
| Entry-level offer boundary | **MOVE TO HYPOTHESIS** | Not present in local worktree as a factual engagement rule. Mixed with UNKNOWN in Business model section. Council suggested "Advisory sessions or scoped execution pilots, NOT full retainers." | Moved to `OFFER HYPOTHESIS — OWNER APPROVAL REQUIRED` in Hypotheses Requiring Validation section. Current offer structure retained as verified. |
| Distinctiveness goals | **KEEP AS STRATEGIC GOAL** | Legitimate strategic aspirations, not factual claims. Council recommended rebalancing differentiation with distinctiveness (brand recall, visual recognition, shorthand memorability). | Added `Strategic Goals` section with STRATEGIC GOAL label. Current distinctiveness assets (VERIFIED) separated from future goals. |

---

## D. Stale Analysis Corrected

**Files updated to reflect current approved hero baseline:**

| File | Change |
|---|---|
| `docs/phase2-message-hierarchy.md` | Updated Hero title, accent, CTA, and summary table to reflect owner-approved 2026-09-20 patch. Previous hero labeled as historical. |
| `docs/phase2-copy-audit.md` | H-01 labeled as HISTORICAL/OBSOLETE. Proposal noted as no longer applicable. |
| `docs/phase2-copy-proposals.md` | CP-01 (Hero Title Clarification) labeled OBSOLETE. Current/proposed copy marked as historical. Status field added. |
| `docs/phase2-cro-messaging-findings.md` | Finding 2 updated to reflect current CTA "Have a question?" / "لديك استفسار؟". Previous CTA noted as superseded. |
| `docs/phase2-offer-clarity.md` | CTA audit row updated to reflect current hero CTA behavior (opens Contact Dock). |
| `docs/phase2-core-messaging-framework.md` | CTA Message and CTA hierarchy updated to reflect current hero CTA. |
| `docs/PHASE2A_MARKETING_AUDIT.md` | Hero promise noted as historical. Reconciliation note added to files modified table. |
| `.agents/product-marketing.md` | Brand language section updated to label previous hero as historical. Primary conversion action updated to current CTA. Changelog corrected to reflect council recommendations were recorded, not incorporated as verified fact. Strategic Goals and Hypotheses Requiring Validation sections added. |

---

## E. Public Proof Status

**Confirmed:** The authoritative evidence register (`docs/marketing-evidence-register.md`) correctly reflects public approval for already-approved facts.

- E-03 through E-07 (case study metrics): Status is "VERIFIED — APPROVED FOR PUBLIC USE" per owner decision 2026-09-18/19.
- No case facts are labeled "pending launch approval."
- Distinction maintained: CONTENT/PUBLICATION APPROVED (separate from SITE DEPLOYMENT STATUS and LEGAL/PRIVACY OPERATIONS).

---

## F. Phase 2B Decision Sheet

**Deliverable created:** `docs/PHASE2B_OWNER_DECISION_SHEET.md`

- CP-01 through CP-08 presented for owner decision.
- CP-01 is explicitly flagged as OBSOLETE (owner approved new hero).
- Each proposal includes: ID, Page/Section, Current AR, Proposed AR, Current EN, Proposed EN, Why, Risk/Tradeoff, Recommendation, and empty OWNER DECISION checkboxes.
- No proposals implemented.

---

## G. Blocking Owner Questions

**Maximum 5 genuinely blocking questions for Phase 2B:**

1. What is the minimum engagement size (budget range, duration, scope)?
2. What is the pricing model (retainer, project, daily rate, success fee, hybrid)?
3. What exactly happens after a visitor submits the inquiry form? What is the timeline and next step?
4. What is the boundary between consulting and execution? Can a client engage in one without the other?
5. What does a typical consulting engagement look like (duration, deliverables, cost range)?

**Full classification of all 12 questions** is in `docs/PHASE2B_OWNER_DECISION_SHEET.md`.

---

## H. Website Changes

**Expected:** NONE

No website implementation changes were performed during this reconciliation. All work was limited to:
- Moving `agents/product-marketing.md` to canonical `.agents/product-marketing.md`
- Updating analysis documents to reflect current approved baseline
- Creating owner-decision and reconciliation reports

No `src/`, `assets/`, or config files were modified.
