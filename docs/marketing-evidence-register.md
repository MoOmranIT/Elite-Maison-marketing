# Marketing Evidence Register — Elite Maison

**Document version:** v1  
**Last updated:** 2026-09-20  
**Purpose:** Prevent future MarketingSkills from accidentally inventing or overstating facts.

---

| ID | Marketing claim/context | Status | Evidence/source | Allowed use | Validation needed |
|---|---|---|---|---|---|
| E-01 | 18+ years of hands-on experience in GCC | VERIFIED | `docs/source-references.md`, `src/pages/HomePage.tsx` cred-strip | Public use | None |
| E-02 | GCC market focus | VERIFIED | `docs/source-references.md`, `src/lib/schema.ts` (`areaServed`), `EM.PAGES.home.description` | Public use | None |
| E-03 | Attractive Smile: 12 consecutive days of bookings | VERIFIED — APPROVED FOR PUBLIC USE | `EM.CASES[0]`, copy deck rule #3 | Public use | None |
| E-04 | Bloom / Perfect Foodstuff: AED 18K Q1 → AED 40K → avg AED 65K/month | VERIFIED — APPROVED FOR PUBLIC USE | `EM.CASES[1]`, copy deck rule #3, `docs/website-architecture.md` | Public use | None |
| E-05 | Bin Ablan: market entry across 5 countries (Canada, Oman, Kuwait, KSA, Libya) | VERIFIED — APPROVED FOR PUBLIC USE | `EM.CASES[2]`, copy deck rule #3 | Public use | None |
| E-06 | Le Patchouli Café: 11 franchise branches | VERIFIED — APPROVED FOR PUBLIC USE | `EM.CASES[3]`, copy deck rule #3 | Public use | None |
| E-07 | AI Brains: Award for Best AI-Supporting Project | VERIFIED — APPROVED FOR PUBLIC USE | `EM.CASES[4]`, copy deck rule #3 | Public use | Awarding body, year, and rank intentionally withheld |
| E-08 | Six sectors served | VERIFIED | `EM.INDUSTRIES`, `EM.SECTORS`, `docs/website-architecture.md` | Public use | None |

| E-09 | Five case studies across four sectors | VERIFIED | `EM.CASES` | Public use | None |
| E-10 | Four I framework (Insight, Ideas, Influence, Impact) | VERIFIED | `EM.PILLARS`, `docs/source-references.md` | Public use | None |
| E-11 | Method: Diagnose → Prioritize → Execute → Measure & Improve | VERIFIED | `EM.METHOD`, `EM.COPY.about.methodText` | Public use | None |
| E-12 | Consulting + Execution as two linked paths | VERIFIED | `EM.NAV_PRIMARY`, `EM.COPY.home.capTitle`, `EM.COPY.about.whoText` | Public use | None |
| E-13 | Contact channels: FormSubmit, WhatsApp, email, phone | VERIFIED | `EM.CONFIG.contact`, `src/components/layout/ContactDock.tsx`, `src/pages/ContactPage.tsx` | Public use | None |
| E-14 | No analytics, CRM, or backend in current repo | VERIFIED | `docs/prototype-commitments.md`, README | Internal planning | None |
| E-15 | Publication approval gate exists | VERIFIED | `src/data/em.js` (`EM.CONFIG.publicationApproved`, `anonymizeCases`), README | Internal governance | None |
| E-16 | 36 canonical HTML pages, SSG without browser | VERIFIED | README, `docs/implementation-map.md` | Technical reference | None |
| E-17 | Target market: GCC businesses | VERIFIED | `EM.PAGES.home.description`, `EM.COPY.home.lead`, `docs/source-references.md` | Public use | None |
| E-18 | Arabic and English authored independently (not literal translations) | VERIFIED | `docs/content-and-copy.md` rule #1, copy deck rule #1 | Editorial governance | None |
| E-19 | No invented clients, metrics, awards, or capabilities | VERIFIED | `docs/content-and-copy.md` rule #2, copy deck rule #2, `docs/source-references.md` rule #1 | Editorial governance | None |
| E-20 | Brand colours: Ink #06182D, Gold #D9A537, Ivory #F2ECE6, Plum #32102E | VERIFIED | `docs/brand-guidelines.md`, README | Design reference | None |

---

**Status key:**
- **VERIFIED** — directly supported by local source file.
- **VERIFIED — APPROVED FOR PUBLIC USE** — verified and approved for public use per owner decision 2026-09-18/19.
- **INFERRED** — reasonable inference from evidence; needs validation.
- **UNKNOWN** — no evidence in worktree.
- **DO NOT USE PUBLICLY** — approval gate or legal restriction applies.


