# Elite Maison — Final Tone Correction Patch

**Date:** 22 September 2026  
**Skill:** MarketingSkills copy-editing  
**Scope:** Exactly three AR/EN copy corrections — no other changes

---

## Replacements (before → after)

### 1. About — engagement title (`EM.COPY.about.engageTitle`)

| Lang | Before | After |
|---|---|---|
| **AR** | يتغير شكل التعاون بحسب ما يحتاجه التحدي. | التحدي أولًا. ثم نحدد طريقة العمل. |
| **EN** | The shape of the engagement depends on what the challenge requires. | The challenge comes first. Then we define how we work. |

### 2. Sectors — selection title (`EM.COPY.sectors.selectTitle`)

| Lang | Before | After |
|---|---|---|
| **AR** | اختاروا السياق الأقرب إلى عملكم لقراءة ما يتغير في القرار داخله. | ابدؤوا بالسياق الأقرب إلى عملكم. فكل سياق يغيّر ما يجب أن يُحسم. |
| **EN** | Choose the context closest to your business to read what changes in the decision inside it. | Start with the context closest to your business. Each context changes what needs to be decided. |

### 3. Consulting — flow title (`EM.COPY.consulting.engageTitle`)

| Lang | Before | After |
|---|---|---|
| **AR** | نبدأ بالقرار الذي يجب أن يصبح ممكنًا. | نبدأ بالقرار الذي سيحدد ما يأتي بعده. |
| **EN** | We start with the decision the work needs to make possible. | We start with the decision that will shape what comes next. |

---

## Files changed (this patch)

| File | Change |
|---|---|
| `src/data/em.js` | Updated the three runtime copy keys above (duplicate seed entries for the same keys synced for parity). |
| `docs/approved-copy/elite_maison_editorial_copy_deck_v2.md` | Updated the three corresponding AR/EN deck strings for `qa:copy` contract parity. |

No CSS, layout, routes, SEO, claims, metrics, or release/indexing configuration was modified.

---

## Confirmation — no other copy modified

This patch touched **only** the six strings above (three AR + three EN) in `em.js` and the approved copy deck. All other copy — including Home hero, method headline, Four I's heading, Consulting decision text, Consulting CTA title/text, Cases CTA, About scope frame, and Consulting decision eyebrow — was left unchanged.

---

## QA results

| Command | Result |
|---|---|
| `npm run typecheck` | **PASS** |
| `npm run qa:i18n` | **PASS** — keys=58 missing=0 |
| `npm run qa:copy-contract` | **PASS** — used=129 required=110 missing=0 emptyRequired=0 |
| `npm run qa:copy` | **PASS** — 360/360 exact matches, 100% coverage |
| `npm run build` | **PASS** — 38/38 pages |
| `npm run verify:ssg` | **PASS** — 38/38 verified |
| `git diff --check` | **PASS** (LF/CRLF line-ending warnings only) |

No commit, push, deploy, or indexing activation. `EM_RELEASE_APPROVED` remains unset.

---

## Final status

**FINAL TONE CORRECTION COMPLETE — COPY READY TO FREEZE**
