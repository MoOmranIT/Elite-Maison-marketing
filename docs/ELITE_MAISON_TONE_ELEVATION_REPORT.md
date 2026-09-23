# Elite Maison — Tone Elevation Report

**Date:** 22 September 2026  
**Skill:** MarketingSkills copy-editing (consultancy-voice cleanup)  
**Scope:** Targeted copy only — no redesign, CSS, routes, commit, push, or deploy

---

## A. Exact owner-approved replacements

### 1. Consulting decision text

| | Copy |
|---|---|
| **Before AR** | اختاروا السؤال التجاري الأقرب إلى واقعكم. القدرة تأتي بعد فهم المشكلة. |
| **After AR** | اختاروا السؤال التجاري الأقرب إلى واقعكم. طريقة العمل تبدأ من فهم ما يحتاج إلى التغيير. |
| **Before EN** | Choose the business question closest to your reality. The capability follows the problem. |
| **After EN** | Choose the business question closest to your reality. How we work starts with understanding what needs to change. |

**Location:** `EM.COPY.consulting.decisionText` (`src/data/em.js`)

### 2. Consulting CTA text

| | Copy |
|---|---|
| **Before AR** | نبدأ من المسألة كما هي، لا من خدمة نحاول تكييفها معها. |
| **After AR** | نبدأ من المسألة كما هي. ومنها تتحدد طريقة العمل. |
| **Before EN** | We start with the issue as it stands, not with a service we try to fit around it. |
| **After EN** | We start with the issue as it stands. The way we work takes shape from there. |

**Location:** `EM.COPY.consulting.ctaText` — **CTA title unchanged:** إذا بقي السؤال غير واضح، فهنا نبدأ. / If the question is still unclear, that is where we start.

### 3. Cases CTA ending

| | Copy |
|---|---|
| **Before AR** | …ثم الاستفادة من الخبرة ذات الصلة من دون فرض وصفة جاهزة. |
| **After AR** | …ثم نضع الخبرة ذات الصلة في سياق الحالة نفسها. |
| **Before EN** | …then drawing on relevant experience without imposing a ready-made formula. |
| **After EN** | …then we bring relevant experience into the context of the case itself. |

**Location:** `EM.COPY.cases.ctaText` (full sentence preserved; ending only changed)

**Deck sync:** All three mandatory replacements mirrored in `docs/approved-copy/elite_maison_editorial_copy_deck_v2.md`.

---

## B. Additional weak expressions found and corrected

### 4. About — Ways to work together title

| Field | Detail |
|---|---|
| **Page/key** | About / `engageTitle` |
| **Before AR/EN** | شكل التعاون يتبع المشكلة، لا الباقة. / The engagement follows the problem, not a package. |
| **Why it lowers the brand** | Defines Elite Maison against packages rather than stating how engagement takes shape. |
| **Replacement AR/EN** | يتغير شكل التعاون بحسب ما يحتاجه التحدي. / The shape of the engagement depends on what the challenge requires. |

### 5. About — Scope frame (EM.ABOUT[3])

| Field | Detail |
|---|---|
| **Page/key** | About editorial frames / `EM.ABOUT[3].text` |
| **Before AR/EN** | لا نبدأ بحزمة خدمات جاهزة. نحدد ما يحتاج إلى أن يتغيّر… / We do not start with a preset package. We define what needs to change… |
| **Why it lowers the brand** | Opens with agency/package denial instead of method. |
| **Replacement AR/EN** | نحدد ما يحتاج إلى أن يتغيّر، ثم نبني نطاق العمل حول القرار والتنفيذ اللذين يخدمانه. / We define what needs to change, then shape the work around the decision and execution it requires. |

### 6. Consulting — Flow section title

| Field | Detail |
|---|---|
| **Page/key** | Consulting / `engageTitle` |
| **Before AR/EN** | لا نبدأ بالمخرجات. نبدأ بالقرار… / We do not start with deliverables. We start with the decision… |
| **Why it lowers the brand** | Defensive framing against deliverable lists; second half already states the positive method. |
| **Replacement AR/EN** | نبدأ بالقرار الذي يجب أن يصبح ممكنًا. / We start with the decision the work needs to make possible. |

### 7. Consulting — Decision section eyebrow

| Field | Detail |
|---|---|
| **Page/key** | Consulting / `decisionEyebrow` |
| **Before AR/EN** | كيف تختارون القدرة / How to choose a capability |
| **Why it lowers the brand** | Service-menu / capability-catalog language. |
| **Replacement AR/EN** | ابدؤوا بالسؤال التجاري / Start with the commercial question |

### 8. Sectors — Selection title

| Field | Detail |
|---|---|
| **Page/key** | Sectors / `selectTitle` |
| **Before AR/EN** | اختاروا السياق الأقرب إلى عملكم، لا القالب الأقرب إلى خدمة. / Choose the context closest to your business, not the template closest to a service. |
| **Why it lowers the brand** | Compares against service templates rather than guiding sector reading. |
| **Replacement AR/EN** | اختاروا السياق الأقرب إلى عملكم لقراءة ما يتغير في القرار داخله. / Choose the context closest to your business to read what changes in the decision inside it. |

---

## C. Sentences reviewed but intentionally kept

| Location | Wording | Reason kept |
|---|---|---|
| Home | `methodTitle` — نبدأ بما يجب أن يتغيّر، لا بما تفعلونه. | Locked strategic contrast; not agency-defensive. |
| About | `lead` — لا نبدأ بما تفعلونه. نبدأ بما يجب أن يتغيّر. | Same locked pattern; decision-led, not package comparison. |
| Cases | `ctaTitle` — …فلنبدأ من السؤال لا من الحل. | Strategic question-before-solution contrast; not service-menu framing. |
| Consulting | `ctaText` (legacy block, superseded) | Superseded by runtime Object.assign; not rendered. |
| Contact | `inquiryTitle` — …لا نحتاج إلى نموذج تأهيل طويل. | Debatable; reduces friction without comparing to agencies — left unchanged. |
| Sectors | `lead` — …من دون نقل إجابة جاهزة من سوق إلى آخر. | Market-discipline statement, not agency positioning; stylistically acceptable. |
| Execution | `answer` — …is not a task list detached from strategy. | Defines execution positively in second clause; contrast is operational, not defensive. |
| Cases / SEO | …not a gallery of logos. | Factual editorial boundary, not service-package comparison. |
| Home | `challengesText` — لا نفترض الحل من البداية | Diagnostic method statement; kept. |
| Insight articles | Various “not X” teaching contrasts | Editorial insight voice; not brand positioning against agencies. |

---

## D. Locked copy integrity

Confirmed unchanged in runtime copy:

| Locked item | Status |
|---|---|
| Home hero — وضوح أكبر. / Greater clarity. | ✓ |
| Home hero accent — قرارات أفضل. نمو أقوى. / Better decisions. Stronger growth. | ✓ |
| Home method headline — نبدأ بما يجب أن يتغيّر، لا بما تفعلونه. | ✓ |
| Home trust / Four I's heading — خبرة تقرأ العمل بعين النجاح. | ✓ |
| Hero secondary CTA — تواصل معنا / Contact us | ✓ |
| Consulting CTA title — إذا بقي السؤال غير واضح، فهنا نبدأ. | ✓ |
| Contact H1 — سؤال، تحدٍ، أو قرار لم يُحسم بعد؟ | ✓ |
| Home cases headline — نتائج تتكلم، والحكم للأرقام. | ✓ |
| Execution chain headline — اتجاه واضح. تشغيل منضبط. تعلّم مستمر. | ✓ |
| All case metrics, 18+ years, GCC positioning, AI Brains award, GCC insight content | ✓ |

---

## E. Claim integrity

No new metrics, clients, markets, capabilities, guarantees, pricing, packages, team size, certifications, or booking language introduced. All changes are tonal reframes only; factual meaning preserved.

---

## F. QA results

| Command | Result |
|---|---|
| `npm run typecheck` | **PASS** |
| `npm run qa:i18n` | **PASS** — keys=58 missing=0 |
| `npm run qa:copy-contract` | **PASS** — used=129 required=110 missing=0 emptyRequired=0 |
| `npm run qa:copy` | **PASS** — 360/360 exact matches, 100% coverage |
| `npm run build` | **PASS** — 38/38 pages |
| `npm run verify:ssg` | **PASS** — 38/38 verified |
| `npm run qa:seo` | **PASS** — passes=1083 fails=0 |
| `npm run qa` | **PASS** — axe 21 routes, 0 violations; assertion failures 0 |
| `git diff --check` | **PASS** (LF/CRLF warnings only) |

Release/indexing governance unchanged. `EM_RELEASE_APPROVED` remains unset.

---

## Final status

**TONE ELEVATION PASS COMPLETE — CONSULTANCY VOICE PRESERVED**

---

*Hard stop observed: no redesign, CSS, commit, push, deploy, or indexing activation.*
