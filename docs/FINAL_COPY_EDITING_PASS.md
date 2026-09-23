# Elite Maison — Final Copy Editing Pass

**Date:** 2026-09-22  
**Scope:** Public-facing AR/EN copy in `src/data/em.js` (runtime authority)  
**Mode:** Editorial review and exact revision proposals only — no implementation  
**Skill applied:** copy-editing (Seven Sweeps + bilingual glossary + evidence register)

---

## 1. Executive editorial assessment

The site has moved past generic agency language. The strongest material is short, specific, and decision-led: the locked Home hero, the Home method headline, the Four I's heading, case proof lines, and several insight titles. Voice is calm, commercial, and evidence-aware — appropriate for GCC decision-makers.

The main remaining issues are not factual gaps. They are editorial:

1. **Over-explanation after strong headlines.** The Home lead, method supporting copy, and several page `answer` blocks restate the same idea three times (diagnosis → strategy → execution → measurement) before the reader has chosen to stay.
2. **Repetition across the journey.** “Start with the question,” “what needs to change,” and “connect diagnosis to execution” recur on Home, About, Consulting, Cases, Insights, and footer — often with only minor wording shifts.
3. **Service-catalog rhythm.** Consulting and Execution `answer` paragraphs read like capability lists. That pattern feels machine-assembled and could belong to any consultancy.
4. **Arabic/English independence breaks in one visible place.** About method copy embeds English stage names inside Arabic body text.
5. **Contact language drift.** Runtime contact copy is inquiry-first (good), but SEO titles still say “consultation/book,” and one H1 uses “Let’s…” — both work against the no-booking architecture.
6. **Insight detail duplication.** Five insights repeat the same text in `summary` and `answer`, which adds length without adding decision value.

Overall: **strong foundation, needs a tightening pass** — not a rewrite. Priority is cut repetition, sharpen rhythm, and restore ATTRACT > OVER-EXPLAIN without touching owner-locked Home lines or approved proof.

---

## 2. Keep unchanged

Do **not** edit these in the implementation pass:

| Location | Key / element | Why keep |
|---|---|---|
| Home hero | `home.title`, `home.accent` | Owner-approved exact wording |
| Home hero secondary CTA | `I18N.heroInquiry` — تواصل معنا / Contact us | Owner-approved; opens Contact Dock |
| Home method headline | `home.methodTitle` | Owner-approved exact wording |
| Four I's heading | `home.trustLabel` | Owner-approved exact wording |
| Home path CTAs | `home.consultingCta`, `home.executionCta` | Approved labels; behavior correct |
| Home cap lines | `home.capTitle`, `home.capText` | Strong, distinct, already tight |
| About lead | `about.lead` (override) | Matches approved two-line principle; do not re-expand |
| Consulting page title | `consulting.title` (override) | Strong page headline |
| Execution page title | `execution.title` (override) | Strong page headline |
| Cases index lead | `cases.lead` (override) | Evidence discipline is clear and credible |
| GCC insight | Title, summary, body, CTA, SEO | Phase 3C.1 approved content — editorial tweaks only if owner reopens |
| All approved proof facts | 18+, GCC, case metrics, award line | Locked per evidence register |
| Global inquiry CTAs | `bookCta`, `bookShort`, `submitInquiryCta` | Inquiry architecture; no calendar implied |
| Footer statement | `I18N.footerText` (override) | Deck-aligned; concise |
| `statementTitle` in `EM.COPY.home` | Deck-required string | Not rendered in UI today; keep for copy-contract parity unless deck is updated separately |

---

## 3. High-priority revisions

### 3.1 Home lead — over-explains before proof

| | |
|---|---|
| **Page** | Home |
| **Location / key** | `EM.COPY.home.lead` |

**Current AR**  
Elite Maison بيت استشاري للنمو والتسويق يعمل مع الشركات في أسواق الخليج على الأسئلة التي تسبق مزيدًا من النشاط: أين يتعطل النمو؟ أين يضيع الطلب؟ وما الذي يستحق الأولوية؟ نصل التشخيص بالاستراتيجية والتنفيذ والقياس حتى يتحول القرار إلى تقدم يمكن متابعته.

**Proposed AR**  
Elite Maison بيت استشاري للنمو والتسويق في أسواق الخليج. نعمل على الأسئلة التي تسبق مزيدًا من النشاط: أين يتعطل النمو؟ أين يضيع الطلب؟ وما الذي يستحق الأولوية؟

**Why**  
The method chain belongs in the method rail below. Here it slows the hero and repeats the locked method headline’s premise.

**Current EN**  
Elite Maison is a growth and marketing consultancy working across GCC markets on the questions that come before more activity: where is growth stalling, where is demand being lost, and what deserves priority? We connect diagnosis, strategy, execution and measurement so decisions become progress that can be tracked.

**Proposed EN**  
Elite Maison is a growth and marketing consultancy in GCC markets. We work on the questions that come before more activity: where growth stalls, where demand is lost, and what deserves priority.

**Why**  
Same issue: attract with questions; let the method section carry the how.

---

### 3.2 Home method supporting copy — repeats locked headline

| | |
|---|---|
| **Page** | Home |
| **Location / key** | `EM.COPY.home.methodText` |

**Current AR**  
نقرأ العمل والسوق ورحلة العميل، نفصل العرض عن السبب، ونرتب الأولويات قبل إضافة أي نشاط. بعدها يتحول القرار إلى تنفيذ له مسؤولية وإيقاع ومؤشر، ثم نراجع ما تغيّر ونحسّن بناءً على الدليل.

**Proposed AR**  
نقرأ العمل والسوق ورحلة العميل، نفصل العرض عن السبب، ونرتب الأولويات قبل إضافة أي نشاط. ثم نتابع ما تغيّر ونحسّن بناءً على الدليل.

**Why**  
Headline already states the starting principle. Body should support the four stages, not re-argue the headline.

**Current EN**  
We read the business, market and customer journey, separate symptoms from causes, and set priorities before adding activity. The decision then becomes work with ownership, rhythm and an indicator — followed by review and improvement based on evidence.

**Proposed EN**  
We read the business, market and customer journey, separate symptoms from causes, and set priorities before adding activity. Then we review what changed and improve based on evidence.

**Why**  
Shorter rhythm; stage titles in the rail carry ownership/rhythm detail.

---

### 3.3 Consulting answer block — service-catalog tone

| | |
|---|---|
| **Page** | Consulting |
| **Location / key** | `EM.COPY.consulting.answer` (override) |

**Current AR**  
تساعد استشارات Elite Maison الشركات في أسواق الخليج على تشخيص عوائق النمو، ترتيب الأولويات، وتحويل أسئلة المبيعات والتوسع والمنتج وتجربة العميل إلى قرارات وخارطة عمل قابلة للاستخدام.

**Proposed AR**  
نساعدكم على تشخيص ما يعيق النمو، ترتيب الأولويات، وتحويل السؤال التجاري إلى قرار وخارطة يستطيع الفريق استخدامها — قبل توسيع النشاط.

**Why**  
Removes stacked capability nouns; keeps GCC and decision outcome without reading like a service menu.

**Current EN**  
Elite Maison helps companies in GCC markets diagnose growth constraints, set priorities and turn questions around sales, expansion, product and customer experience into decisions and a usable roadmap.

**Proposed EN**  
We help you diagnose what is constraining growth, set priorities, and turn the commercial question into a decision and roadmap the team can use — before activity expands.

**Why**  
Less catalog, more conversation; matches page lead without duplicating it verbatim.

---

### 3.4 Execution answer block — service-catalog tone

| | |
|---|---|
| **Page** | Execution |
| **Location / key** | `EM.COPY.execution.answer` (override) |

**Current AR**  
تنفيذ Elite Maison يربط الاستراتيجية بالتسويق القائم على الأداء، إدارة الحملات والقنوات، أنظمة التشغيل التسويقي، الأتمتة والذكاء الاصطناعي، الهوية، والتفعيل المستمر مع القياس والتحسين.

**Proposed AR**  
نحوّل الاتجاه إلى حملات وقنوات وأنظمة يمكن تشغيلها ومتابعتها — مع قياس يبقى مرتبطًا بالنتيجة التجارية التي بدأ منها القرار.

**Proposed EN**  
We turn direction into campaigns, channels and systems that can be run and followed — with measurement tied to the commercial outcome behind the decision.

**Why**  
The current line lists six solution types in one breath (AI-sounding enumeration). Proposed line matches `execution.lead` tension without repeating the whole lead.

**Current EN**  
Elite Maison connects strategy to performance marketing, campaign and channel management, marketing operations systems, automation and AI, brand execution and ongoing activation with measurement and improvement.

**Why (EN)**  
Same as Arabic: cut enumeration; keep outcome link.

---

### 3.5 About method body — English stage names inside Arabic

| | |
|---|---|
| **Page** | About |
| **Location / key** | `EM.COPY.about.methodText` (override) |

**Current AR**  
Diagnose → Prioritize → Execute → Measure & Improve. أربع مراحل تمنع التفكير من الانفصال عن العمل: نفهم أين تبدأ المشكلة، نختار ما يستحق الآن، نشغّل القرار، ثم نراجع ما حدث.

**Proposed AR**  
نشخّص → نرتّب → ننفّذ → نقيس ونحسّن. أربع مراحل تبقي التفكير والتنفيذ في المسار نفسه: نفهم أين تبدأ المشكلة، نختار ما يستحق الآن، نشغّل القرار، ثم نراجع ما حدث.

**Why**  
Arabic page should not lead with English method labels; Home rail already fixed Arabic titles.

**Current EN**  
(No change proposed — English stage names are correct on `/en/about`.)

---

### 3.6 Contact SEO titles — booking implication

| | |
|---|---|
| **Page** | Contact (metadata) |
| **Location / key** | `EM.PAGES.contact.title` |

**Current AR**  
تواصل وابدأ استشارة \| Elite Maison

**Proposed AR**  
تواصل مع Elite Maison \| أرسلوا استفسارًا

**Why**  
“ابدأ استشارة” reads like booking. Runtime is inquiry + direct channels.

**Current EN**  
Contact Elite Maison for a Consultation

**Proposed EN**  
Contact Elite Maison \| Send an inquiry

**Why**  
Aligns metadata with FormSubmit inquiry architecture; no Cal.com/calendar implication.

---

### 3.7 Contact page H1 — “Let’s” + slight stiffness

| | |
|---|---|
| **Page** | Contact |
| **Location / key** | `EM.COPY.contact.title` (override) |

**Current AR**  
سؤال، تحدٍ، أو قرار لم يُحسم بعد؟ لنتحدث عنه.

**Proposed AR**  
سؤال أو قرار لم يُحسم بعد؟ تواصلوا معنا.

**Why**  
Shorter; more direct; avoids rhetorical triple stack.

**Current EN**  
A question, a challenge, or a decision still unresolved? Let’s talk it through.

**Proposed EN**  
A question or decision still open? Contact us.

**Why**  
Removes “Let’s” (off-brand casual); matches dock label family without duplicating hero secondary CTA wording on the same page flow.

---

### 3.8 Patchouli proof line — mixed language

| | |
|---|---|
| **Page** | Case detail — Patchouli |
| **Location / key** | `EM.CASES` base `proof.ar` (before/after caseCopy merge — verify rendered source) |

**Current AR**  
11 فرع Franchise.

**Proposed AR**  
11 فرع امتياز تجاري.

**Why**  
Arabic should not embed English mid-line; aligns with home proof-stage label already corrected in UI.

**Current EN**  
11 franchise branches. (no change)

---

### 3.9 Insight detail — duplicate summary/answer

| | |
|---|---|
| **Page** | Insight detail (5 legacy insights) |
| **Location / key** | `insightCopy[*].answer` for `growth-guide`, `sales-article`, `expansion-brief`, `ai-insight`, `cx-check` |

**Current**  
`answer` text is identical to `summary` for all five.

**Proposed**  
Either (a) remove the exec-answer block content duplication in UI by using `summary` only, or (b) rewrite `answer` as one sharper decision line distinct from summary. Example for `sales-article`:

**Proposed AR (answer only)**  
ابدأوا من المسار، لا من الحملة.

**Proposed EN (answer only)**  
Start with the path, not the campaign.

**Why**  
Detail pages currently restate the same paragraph twice — classic over-explain pattern.

---

## 4. Medium-priority revisions

### 4.1 Home cases headline — promotional cliché

| | |
|---|---|
| **Page** | Home (Impact ledger section title) |
| **Location / key** | `EM.COPY.home.casesTitle` |

**Current AR**  
نتائج تتكلم، والحكم للأرقام.

**Proposed AR**  
ما الذي تغيّر — بالأرقام المعتمدة.

**Current EN**  
Results speak. The numbers have the final say.

**Proposed EN**  
What changed — in approved numbers.

**Why**  
Less slogan-like; matches cases index principle (“what changed, not what we made”).

---

### 4.2 About who paragraph — repeats Home lead opening

| | |
|---|---|
| **Page** | About |
| **Location / key** | `EM.COPY.about.whoText` |

**Current opening**  
Elite Maison بيت استشاري للنمو والتسويق. نعمل من التشخيص...

**Proposed AR opening**  
نعمل من التشخيص والاستراتيجية إلى الإشراف على التنفيذ والقياس...

**Proposed EN opening**  
We work from diagnosis and strategy through execution oversight and measurement...

**Why**  
Drop repeated firm descriptor; About page already establishes identity in title/lead.

---

### 4.3 Consulting decision section — instructional redundancy

| | |
|---|---|
| **Page** | Consulting |
| **Location / key** | `EM.COPY.consulting.decisionText` (override) |

**Current EN**  
Start with the business question closest to your reality. The advisory capability follows the problem, not the other way around.

**Proposed EN**  
Choose the business question closest to your reality. The capability follows the problem.

**Why**  
Title already asks “Which decision would change what you do next?” — body should not re-teach navigation.

(Same trim principle for Arabic override.)

---

### 4.4 Repeated closing CTA pattern across Cases / Consulting / Insights

| | |
|---|---|
| **Pages** | Cases index, Cases detail band, Consulting CTA, Insights CTA |
| **Keys** | `cases.ctaTitle`, `consulting.ctaTitle` (older base), `insights.ctaTitle` (base vs override) |

**Issue**  
Multiple variants of “start with the question, not the solution” and “move from idea to business reality.”

**Proposed direction**  
Keep **one** canonical line on Cases (`cases.ctaTitle` override). On Consulting and Insights, shift to page-specific closers already present in overrides:

- Consulting: keep override “If the question is unclear, that is not a problem. That is the starting point.”
- Insights: keep override “When the question becomes practical…”

Remove or shorten any stale base-layer duplicates in `EM.COPY.*` that are shadowed but still confuse future edits.

---

### 4.5 Sectors answer — four-part list rhythm

| | |
|---|---|
| **Page** | Sectors |
| **Location / key** | `EM.COPY.sectors.answer` |

**Current EN**  
…understanding what changes the decision in each context — how customers buy, where trust forms, what slows conversion and what makes growth repeatable.

**Proposed EN**  
…understanding what changes the decision in each context: how people buy, where trust starts, and what slows progress.

**Why**  
Still specific, less symmetrical “four beats” AI cadence.

---

### 4.6 Execution chain headline — triple beat

| | |
|---|---|
| **Page** | Execution |
| **Location / key** | `EM.COPY.execution.chainTitle` |

**Current**  
Clear direction. Disciplined execution. Continuous learning.

**Proposed EN**  
Clear direction, disciplined execution, continuous learning.

**Proposed AR**  
اتجاه واضح، تشغيل منضبط، وتعلّم مستمر.

**Why**  
One sentence reads more human; three fragments feel like slide bullets.

---

### 4.7 Stale I18N — `submitCta` and `contactTime`

| | |
|---|---|
| **Location / key** | `I18N.submitCta`, `I18N.contactTime` |

**Current `submitCta`**  
AR: ناقش الفرصة مع مستشار / EN: Discuss the opportunity with a consultant

**Issue**  
Unused in ContactPage (form uses `submitInquiryCta`). Wording is salesy and unlike live tone.

**Proposed**  
Align with `submitInquiryCta` or remove from active I18N if dead.

**Current `contactTime`**  
Mentions “expected response time” for production.

**Proposed**  
Remove or replace with neutral copy that does not imply SLA (evidence register forbids response-time claims).

---

### 4.8 Contact success message — technical tone

| | |
|---|---|
| **Page** | Contact |
| **Location / key** | `EM.COPY.contact.successText` |

**Current EN**  
The inquiry was accepted by the delivery service.

**Proposed EN**  
Your inquiry was sent successfully.

**Why**  
“Delivery service” exposes FormSubmit mechanics to the visitor.

---

### 4.9 About page title (base layer vs override)

Runtime uses override (`Marketing does not operate in a vacuum…`) — **keep override**. Base layer `about.title` (“نربط التسويق…”) is stale relative to override; note for future cleanup only, not a visitor-facing fix.

---

### 4.10 SEO meta — About EN description

| | |
|---|---|
| **Location / key** | `EM.PAGES.about.description.en` |

**Current**  
Meet Elite Maison and its approach to connecting marketing with growth, sales, operations and customer experience across GCC markets.

**Proposed**  
We don't start with what you do. We start with what needs to change.

**Why**  
Deck-aligned; stronger snippet; matches About lead (not identical to Home method headline context — About-specific).

---

## 5. Repetition map

| Idea | Strongest occurrence (keep) | Weaker repeats (trim or differentiate) |
|---|---|---|
| Start with what needs to change | `home.methodTitle` (locked) | `about.lead`, `consulting.engageText`, parts of `home.lead` |
| Diagnosis → strategy → execution → measurement | `home.methodText` (after trim) + method rail | `home.lead`, `footerText`, `about.whoText`, `consulting.answer`, `execution.answer` |
| Elite Maison is a growth and marketing consultancy | `home.lead` (shortened firm line) | `about.whoText` opening, `consulting.answer` opening |
| Start with the question, not the solution | `cases.ctaTitle` (override) | `cases.ctaText` closing clause, stale `consulting`/`insights` base CTAs |
| GCC markets context | Home cred strip + About `EM.ABOUT[2]` | Repeated in every page `answer` block — keep once per page max |
| Insight summary text | Insight card / hero summary | `answer` field duplicated verbatim on detail pages |
| “Evidence from the work” | Home ledger eyebrow | `home.proofEyebrow` duplicate key — harmless but redundant in source |
| Four I's pillar one-liners | Home Four I's section | About pillars (different angle — keep both, but don’t add a third variant) |

---

## 6. AI-sounding patterns

| Passage | Location | Why it feels machine-written |
|---|---|---|
| Triple question hero lead | `home.lead` | Perfect parallel questions + trailing method chain |
| Enumeration answer | `consulting.answer`, `execution.answer` | Six capability nouns in one sentence |
| Triple fragment headline | `execution.chainTitle` | Slide-deck cadence |
| Four em-dash beats | `sectors.answer` | Symmetrical list without human break |
| Identical summary and answer | Five insight overrides | Template fill, not authored progression |
| “We connect X to Y so Z” | `home.lead` (EN), footer | Generic consultancy formula |
| “The goal is not X, but Y” | `execution.lead`, multiple consulting challenges | Over-used contrast scaffold (acceptable once per page, not site-wide) |
| Arabic opening with English method chain | `about.methodText` | Translation artifact |
| “If one of these cases feels familiar…” | Cases CTA | Repeated across pages with minor edits — template rotation |
| GCC insight four questions block | Approved body | Intentionally structured; **do not rewrite** unless owner reopens 3C.1 — only note heavy instructional length |

---

## 7. CTA audit

| Label / key | AR | EN | Behavior | Verdict |
|---|---|---|---|---|
| `heroInquiry` | تواصل معنا | Contact us | Opens Contact Dock | ✅ Keep (locked) |
| `bookCta` | أرسلوا استفسارًا للاستشارة | Send a consultation inquiry | Links to `/contact` | ✅ Inquiry, not booking |
| `bookShort` | أرسلوا استفسارًا | Send an inquiry | Short inquiry | ✅ |
| `submitInquiryCta` | أرسل الاستفسار | Send the inquiry | FormSubmit POST | ✅ |
| `submitCta` | ناقش الفرصة مع مستشار | Discuss the opportunity with a consultant | **Unused** | ⚠️ Align or retire |
| `exploreCta` / `consultingCta` / `executionCta` | استكشفوا… | Explore… | Path exploration | ✅ |
| `footerContact` | ابدأوا حوارًا | Start a conversation | Footer link | ⚠️ Slightly softer than nav “Contact us” — acceptable if intentional |
| `startConversation` | ابدأوا من التحدي | Start with the challenge | Case similar-challenge band | ✅ Semantically correct |
| `dockOpen` | تواصل معنا | Contact us | Opens dock | ✅ |
| Contact page title (H1) | …لنتحدث عنه | Let’s talk it through | Page headline | ⚠️ Revise (§3.7) |
| Contact SEO title | …ابدأ استشارة / for a Consultation | Meta only | ⚠️ Revise (§3.6) |
| Primary hero `bookCta` | Same as global | Same | `/contact` | ✅ Distinct from secondary dock CTA — good pairing |

**No calendar, Cal.com, or timeslot language found in runtime copy.** Deck §Contact SEO still contains retired booking strings — metadata override partially fixed; contact title remains (§3.6).

---

## 8. Humanizer handoff

After owner approval of the structural trims above, run **only these passages** through the Humanizer skill — not the locked Home lines:

1. `EM.COPY.home.lead` (AR + EN) — post-trim version  
2. `EM.COPY.contact.title` + `contact.lead` (AR + EN)  
3. `EM.COPY.consulting.ctaTitle` + `ctaText` (override)  
4. `EM.COPY.execution.ctaTitle` + `ctaText` (override)  
5. `EM.COPY.insights.lead` (override) — strong content, slightly dense list sentence  
6. `EM.COPY.cases.ctaText` (override) — last sentence only  
7. Case challenge openings: `attractive-smile`, `bloom`, `bin-ablan` (AR + EN) — already good; humanizer for rhythm only, not new claims  
8. Contact `successText` / `errorText` (AR + EN) — remove technical tone  

**Do not humanize:** Home hero, `methodTitle`, `trustLabel`, GCC insight body, or any proof/metric lines.

---

## 9. Final recommendation

**COPY EDITING REVIEW COMPLETE — OWNER APPROVAL REQUIRED BEFORE IMPLEMENTATION**

The copy is publishable in structure and evidence discipline, but **not yet at final tighten standard**. Nine high-priority revisions and ten medium-priority revisions will reduce repetition, remove booking-adjacent metadata drift, and restore ATTRACT > OVER-EXPLAIN — without a brand rewrite.

**Suggested implementation order after approval:**

1. Locked-copy safety check (no edits to §2 list)  
2. High-priority §3 items  
3. Insight summary/answer deduplication  
4. Medium-priority §4 items  
5. Humanizer pass §8 only on approved trims  
6. Re-run `npm run qa:copy` and `npm run qa:copy-contract` if deck strings change  

**No code, assets, routes, schema, or commits were modified in this pass.**

---

*Reviewed against: `.agents/product-marketing.md`, `docs/approved-copy/elite_maison_editorial_copy_deck_v2.md`, Phase 2/3 owner sheets, `docs/marketing-evidence-register.md`, runtime `src/data/em.js`.*
