# PHASE 4 AUDIT REPORT — UI/UX Refinement & Visual Systems Polish

> النطاق: refinement فقط. لا redesign، لا تغيير IA، لا تغيير هوية، لا تعديل Approved Copy.
> البيئة: Windows + Chrome 152 عبر Playwright channel (بدون downloads).
> التاريخ: 2026-09-16.

---

## A. Initial UX / Visual Problems Found (قبل التعديل — مثبتة بالأدلة)

### hierarchy
1. **Home v2 template يستدعي مفاتيح copy غير موجودة** (`ledgerTitle`, `fourTitle`, `ledgerCta`, `sectorsCta`, `closeSecondary`…). النتيجة: عناوين `h2` فارغة (`#hv-ledger-title`, `#hv-four-title` — مثبتة بـ axe `empty-heading`) وروابط CTA بلا نص (مثبتة بـ axe `link-name` جدّي ×3 على Home AR/EN).
2. **Consulting capability panels**: خمسة labels (`Challenge/Objective/Scope/Role/Measure`) بنفس الوزن — `Scope/Role` كنص متصل بعد `span.kicker` inline، و`Measure` بلا تمييز.
3. **Execution capability**: `Impact` و`Metrics` كنص متصل بعد `span.kicker` inline — لا فرق بصري بين "ما الذي يتغير" و"ما الذي يُتابَع".
4. **Case detail**: أقسام `Strategy/Execution/Result/Proof` بدون أي heading (فقرات `p.kicker`) — غير قابلة للتنقل بقارئ الشاشة.
5. **Insight detail**: يعرض `sections[0]` و`sections[1]` فقط — القسم الثالث (و3–5 في `cx-check`) من الـapproved copy **لا يُعرض أبدًا**.
6. **Cases/Insights index**: `SectionIntro` يمرر نفس السلسلة `kicker` و`title` (`otherLabel`, `listLabel`) — عنوان مكرر فوق نفسه.
7. **About Four I's**: المصطلحات الأربعة بنمط `kicker` صغير (0.75rem) — غير قابلة للمسح البصري السريع.

### spacing
8. **Result → Proof** في Case detail متلاصقان بلا أي فاصل (توصية Phase 3 Q2).
9. **Sector proof** بلا أي تمييز (`div.sector-proof` بلا تنسيق — توصية Phase 3 Q3).
10. **Insight measure**: `story-col` بعرض 42rem مع `exec-answer__text` بعرض 28rem فقط (توصية Phase 3 Q1).

### typography
11. عناوين `h2` بنفس المقياس في كل السياقات تقريبًا (`clamp(2rem,4.4vw,3.2rem)`).
12. `AboutPage` و`Frame` يستخدمان `<span><h3>` — تعشيش غير صالح (heading داخل phrasing).

### responsive
13. **Horizontal overflow حقيقي على مستوى المستند** (`scrollWidth > innerWidth`): كل الصفحات ≤768px (بسبب `.hero-seq::before` الممتد -14%) + صفحات `about/404` (بسبب `.logo-chamber__bloom`).
14. تعارض breakpoints للـheader: `site.css` يخفي الـprimary nav عند 1024px بينما `round4.css` يعيده حتى 900px (قواعد متصارعة، الفائز يعتمد على ترتيب التحميل).

### interaction
15. روابط `Go` فارغة النص (انظر 1) — غير مسماة لقارئ الشاشة وغير مرئية بصريًا (سهم فقط).
16. `.exec-chain .num` الذهبي على خلفية فاتحة يفشل contrast (مثبت بـ axe، mobile).
17. `.hv-four__dot` بارتفاع ~42px (دون حد 44px).

### accessibility
18. `empty-heading` ×2 و`link-name` ×3 على Home (axe).
19. `heading-order` على 404 (h1→h3 مباشرة).
20. `color-contrast` ×3 على Execution mobile (axe).
21. بنية عناوين ناقصة في Case/Insight detail (انظر 4).

### RTL
22. لم تُكتشف عيوب RTL جوهرية: الخصائص منطقية، الأسهم تنقلب (`arrowRtl`)، الـbreadcrumbs مرتبة RTL، الأرقام اللاتينية داخل `dir="ltr"`، EN تُعرض `dir="ltr" lang="en"` (مُتحقق برمجيًا).

---

## B. Design System Changes (توحيد — بدون إعادة كتابة CSS)

| المجال | قبل | بعد |
|---|---|---|
| Nav collapse | تعارض 1024 مقابل 900 | الـcollapse مملوك لـ`round4` (900px)؛ `site.css` للـgrids فقط + تعليق توثيقي |
| Reading measure | `story-col` 42rem / answer 28rem | `story-col` 46rem / `exec-answer__text` و`service-canvas__body` و`sector-plate__context` 38rem |
| Capability rhythm | labels متصلة inline | `details` شبكية (2col ≥720px)، kickers كتلية، `Measure` بخط فاصل، `Impact` بحد ذهبي جانبي |
| Result→Proof | متلاصقان | `proof-block` بحد علوي هادئ داخل نفس القسم (متميزان دون انفصال) |
| Sector proof | بلا تمييز | إزاحة + حد ذهبي جانبي، بدون نص جديد وبدون metric-card |
| Contrast numerals | ذهبي على فاتح (يفشل) | `gold-ink` على الفاتح؛ الذهبي الأصلي محفوظ على الداكن والحالة النشطة |
| Eyebrow headings | `p.kicker` فقط | نظام `h2.kicker` (نفس الشكل، دلالة صحيحة) |
| Tap targets | dots ~42px | `min-height:44px` + fieldset `min-inline-size:0` بلا حدود افتراضية |
| About Four I's | مصطلحات 0.75rem | مصطلحات serif ذهبية 1.3rem (نفس النص المعتمد) |
| Overflow | bleed يتمدد للمستند | `overflow-x:clip` على `.hero` و`.logo-chamber` (المحور الرأسي visible) |

ملف جديد واحد: `assets/css/phase4.css` (طبقة مركزة، محمّلة أخيرًا في `main.tsx`). لا مكتبات جديدة، لا خطوط جديدة، لا ألوان جديدة.

### Home copy-wiring (إعادة ربط بمفاتيح معتمدة موجودة — صفر نص جديد)
- `ImpactLedger`: eyebrow ← `proofEyebrow`، title ← `casesTitle`، intro المحذوفة/الفارغة مخفية، زر `ledgerCta` مخفي (لا مفتاح مطابق؛ الصفوف نفسها روابط).
- `FourIsSection`: title ← `trustLabel` ("What we bring to the work")، `mark-note`/`order`/`hint` مخفية عند الفراغ (بدون `role=group` بلا label).
- `TwoPaths`/`DeliveryPath`/`SectorsSection`: kickers/intros/CTAs تُخفى عند الفراغ بدل عرض عناصر فارغة.
- `ClosingSection`: note ← `closeNote || statementText` (معتمدة، نفس الصفحة)، زر inquiry والقنوات تُخفى عند الفراغ.
- `Go` الآن تُرجع `null` عند label فارغ (حارس على مستوى النظام).
- `SectionIntro` يتجاهل kicker فارغًا أو مساويًا للـtitle (يصلح تكرار Cases/Insights index).

---

## C. Files / Components Changed (جلسة Phase 4 فقط)

- `assets/css/phase4.css` — **جديد**: الطبقة الموحدة أعلاه.
- `assets/css/site.css` — إزالة قواعد الـnav من استعلام 1024px (التعارض) + تعليق.
- `src/main.tsx` — استيراد `phase4.css`.
- `src/components/ui-kit.tsx` — حارس `Go`، خاصية `Frame level` + `div.frame__body` صالح، إزالة تكرار `SectionIntro`، `GeoAnswer` بـ`h2.kicker`.
- `src/components/home/sections.tsx` — إعادة الربط والإخفاء المشروط أعلاه.
- `src/pages/CasesPage.tsx` — عناوين `h2.kicker` للأقسام الأربعة (نفس النص والشكل).
- `src/pages/InsightsPage.tsx` — `h2` للإجابة + **عرض كل الأقسام** (`slice(2)` بلا kicker مخترع، تناوب نغمات).
- `src/pages/AboutPage.tsx` — `div` بدل `span` حول `h3`.
- `src/pages/NotFoundPage.tsx` — `Frame level={2}`.
- `scripts/qa-playwright.mjs` — الإطلاق عبر `channel:"chrome"` أولًا (إغلاق دين Playwright؛ dev-only).
- **صفر تغيير** في `src/data/em.js` (مثبت بالتجزئة أدناه).

---

## D. Page-by-Page Changes

- **Home**: عناوين وأقسام حقيقية بدل الفراغ (`From the work / What changed…`، `What we bring to the work`)؛ ledger يقرأ كدليل؛ Four I's تفاعلية بلا عناصر فارغة؛ المساران متكافئان بصريًا؛ الختام بزر واحد + قنوات (ملاحظة `statementText` المعتمدة).
- **About**: Four I's قابلة للمسح (مصطلحات كبيرة)؛ `Ways to Engage` بقيت قائمة frames بلا طابع pricing؛ hero هادئ كما كان.
- **Consulting**: نفس الحقول الخمسة — `Challenge` عرض، `Objective` مقدمة، `Scope/Role` شبكية بملصقات كتلية، `Measure` مميزة بخط؛ anchor/index وaccordion كما هما.
- **Execution**: `Objective` مقدمة، `Scope` نص، `Impact` بحد جانبي، `Metrics` كتلة لاحقة؛ `Performance/Campaigns/Activation` بقيت متميزة (خلفيات alt متناوبة + chain).
- **Sectors**: `Context/Challenge/Priority/Journey/Capabilities` كما هي + `Proof` بإزاحة هادئة؛ لا proof فارغ لـE-commerce/Education (المنطق الشرطي محفوظ).
- **Cases**: الفهرس يمسح (sector + اسم + challenge + proof)؛ الـdetail: `Challenge→Strategy→Execution→Result→Proof` بعناوين `h2` حقيقية وفاصل هادئ بين Result وProof.
- **Insights**: المقالات كاملة الآن (حتى 5 أقسام في `cx-check`)؛ `story-col` أوسع؛ `h1→h2` سليم؛ related links والـCTA كما هما.
- **Contact**: بلا تغيير نصي؛ fieldset بلا حدود groove وبلا overflow؛ تبويب المسارين وstep-meter والتحقق كما هي؛ حالة النجاح موسومة prototype (`prototypeOk`).
- **404**: عنوان `h2` للرابط (بدل h3)؛ overflow مُصلح.
- **Header/Footer/Mobile nav**: الـprimary الكامل ظاهر حتى 900px (مُتحقق `navFit=true` عند 1000px AR و1280px EN)؛ الـdrawer بـ11 عنصرًا قابلًا للنقر مع CTA ولغة واضحة؛ لا More فارغة (`NAV_MORE=[]`)؛ الـdock مخفي في Contact/القائمة/الطباعة مع safe-area.

---

## E. Approved Copy Integrity

- `src/data/em.js` غير ملموس في Phase 4. تجزئة SHA-256 (مقتطعة) قبل/بعد:

| Group | Before | After | Diff |
|---|---|---|---|
| COPY / I18N / CONSULTING / EXECUTION / SECTORS / CASES / INSIGHTS / PILLARS / METHOD / ABOUT / ENGAGE / HOME_NEEDLES / NAV | مطابقة | مطابقة | **0** |

- Phase 2 Copy Differences: `0 / number` (لا فروقات — كل المعروض من مفاتيح معتمدة قائمة).
- Phase 3 Copy Differences: `0 / number` (القطاعات/القضايا/الرؤى كما اعتمدت، بما فيها عرض الأقسام الإضافية سابقًا المحجوبة).
- أي فرق غير مقصود = FAIL — **لا يوجد**.

---

## F. Typography Audit

| البند | الحالة |
|---|---|
| hierarchy (Hero > section > card > body > meta) | **PASS** — `h2.kicker` + `frame__title` + مصطلحات About |
| line length (measure) | **PASS** — 46/38rem موحدة |
| Arabic wrapping | **PASS** — مراجعة لقطات AR (consulting/case/sector/about/contact) |
| English wrapping | **PASS** — لقطات EN (ledger/four/cx-check) |
| mobile sizing | **PASS** — `clamp` + لقطات 390px |
| readability | **PASS** |

---

## G. Spacing & Rhythm Audit — **PASS**

- `eyebrow→heading→intro→cards→next` بإيقاع موحد عبر `head` + `GoldRule`.
- الم⁶شكلة السابقة (خمسة labels متساوية في Consulting) أُصلحت بشبكة + فواصل.
- `Result→Proof` بحد علوي داخل نفس القسم؛ `sector-proof` بإزاحة؛ مقالات الرؤى بتناوب نغمات.

---

## H. Responsive Audit (مُتحقق بالمتصفح، AR+EN)

| Page | Desktop 1440 | Laptop 1280 | Tablet 768 | Mobile 390 |
|---|---|---|---|---|
| Home | PASS | PASS | PASS | PASS |
| About | PASS | PASS | PASS | PASS |
| Consulting | PASS | PASS | PASS | PASS |
| Execution | PASS | PASS | PASS | PASS |
| Sectors | PASS | PASS | PASS | PASS |
| Cases | PASS | PASS | PASS | PASS |
| Case Detail (×5) | PASS | PASS | PASS | PASS |
| Insights | PASS | PASS | PASS | PASS |
| Insight Detail (×5) | PASS | PASS | PASS | PASS |
| Contact | PASS | PASS | PASS | PASS |
| 404 | PASS | PASS | PASS | PASS |

المعيار: `status 200` + `h1==1` + `scrollWidth<=innerWidth` + بلا أخطاء console — على 152 تحميلًا (19 مسارًا × لغتين × 4 viewports).

---

## I. RTL Audit — **PASS**

- `dir/lang` صحيحان لكل مسار (`rtl/ar` و`ltr/en` مُتحقق برمجيًا).
- خصائص منطقية في كل الطبقات؛ أسهم `arrowRtl`؛ breadcrumbs بترتيب RTL وأيقونة البداية يمينًا (لقطات).
- أرقام لاتينية وقيم AED داخل `dir="ltr"`؛ علامات الدرهم كلمات عربية ضمن النص المعتمد (لا تغيير).
- الـdrawer والنماذج والأزرار محاذاة RTL (لقطة contact mobile).
- لا عكس لأيقونات غير اتجاهية.

---

## J. Accessibility Audit

| البند | الحالة |
|---|---|
| semantic headings (h1 واحد، بلا قفزات) | **PASS** — 152/152 `h1==1`، بلا `SKIP` |
| keyboard navigation (nav/drawer/accordion/tabs/dock/form) | **PASS** — roving tabindex، `aria-expanded/controls`، إدارة تركيز الـdock والـdrawer |
| focus states | **PASS** — `:focus-visible` ذهبي عام + ink في النماذج |
| contrast | **PASS** — axe صفر بعد إصلاح `exec-chain` (gold-ink على الفاتح، ذهبي على الداكن) |
| alt text (ذو معنى مقابل زخرفي) | **PASS** — الشعار lockup ذو معنى، الزخارف `aria-hidden`/`alt=""` |
| forms (labels/errors/required) | **PASS** — ربط `label/error`، `role=alert` للملخص، تركيز أول خطأ |
| landmarks (header/nav/main/footer/article) | **PASS** |
| reduced motion | **PASS** — كتل CSS في كل الطبقات + `useReducedMotion` (Reveal/CountUp/DrawRule/Skyfield/hero-live/dock/switch) |
| tap targets ≥44px | **PASS** |

**axe-core 4.13 (متصفح حقيقي): 0 انتهاكات في 24 فحصًا** (12 قالبًا × desktop/mobile، AR + عينة EN). قبل الإصلاح: `empty-heading`×2 و`link-name`×3 (الرئيسية)، `color-contrast`×3 (Execution mobile)، `heading-order` (404).

---

## K. Interaction Audit — **PASS** (كلها مُتحقق بتدفقات آلية)

- header links (تشمل active underline) ✓ · mobile navigation (11 عنصرًا، Escape، استعادة التركيز) ✓
- language switch (يحفظ المسار `ar/consulting→en/consulting`) ✓ · capability anchors (`sectors#retail` تُفعّل التبويب) ✓
- case/insight links + deep links (`/en/cases/bloom` → H1 صحيح) ✓ · CTAs (بلا روابط فارغة بعد الحراس) ✓
- floating dock (يظهر ما عدا Contact، safe-area، `aria-expanded/controls`) ✓ · form controls (تحقق + خطوات + prototype) ✓
- header بعرض 1000px: `navFit=true` والقائمة الكاملة ظاهرة ✓

---

## L. Motion Audit

- **بقي**: hero entrances (`riseSoft`)، `clip/shift` reveals، أقواس `archIn`، حركة hero-live المحيطة (تُفعّل بعد 1250ms وتتوقف خارج الشاشة)، Skyfield (CSS timeline أو motion fallback)، عدّادات ledger، انتقالات المسار.
- **تغيّر**: لا شيء يُذكر — توقيتات Identity محفوظة (`--t-*` و`--ease` الأصلية).
- **أُزيل**: لا شيء (لم توجد حركة تسبب UX problem بعد الإصلاحات).
- **reduced motion**: مدعوم بالكامل (يوقف ambient/reveals/countup/parallax ويُظهر المحتوى فورًا).

---

## M. Browser QA Environment

- المتصفح: **Google Chrome 152.0.7977.84** (نظام، موجود مسبقًا — لا downloads).
- Playwright: `1.63.0` عبر `channel:"chrome"` (يعمل)؛ الحزمة الافتراضية `chromium_headless_shell-1243` **غير مخزنة** (المخزن: 1234 فقط) — لذا رُقّع `scripts/qa-playwright.mjs` ليفضّل قناة النظام مع fallback (dev-only).
- **ليس** executable path داخل production source — التراجع داخل سكربت QA فقط.
- دين Phase 2/3 (فشل download) **مُغلق**: الـQA البصري تم بمتصفح حقيقي.

---

## N. Visual QA Evidence

- **152** تحميل صفحة مُدقق (19 مسارًا × لغتين × 4 viewports) + **24** فحص axe + **10** تدفقات + فحص `npm run qa` (HTTP 200 لعشرة مسارات بما فيها `about.html` التوافقي).
- اللقطات: **10** مطلوبة (§30) + **15** مقربة للأقسام — كلها في `.qa/phase4/` (مُتجاهلة من git، خارج الحزمة):
  `home-en-desktop`, `home-ar-mobile`, `consulting-ar-desktop`, `execution-ar-mobile`, `sectors-ar-desktop`, `case-detail-ar-desktop`, `insight-detail-ar-desktop`, `contact-ar-mobile`, `case-detail-en-mobile`, `insight-detail-en-laptop` + مقربات (ledger/four/two/close/canvas/accordion/chain/mod/pillars/sector-plate/result/cx-full/form/layout).
- رُوجعت بصريًا: hero ثنائي اللغة، ledger، Four I's، consulting canvas، sector proof، result/proof، مقال 5-أقسام، نموذج mobile.
- أخطاء console/pageerror: **صفر** في كل التحميلات.
- إخفاقات اكتُشفت وأُصلحت: روابط CTA فارغة، أقسام رؤى محجوبة، تباين chain، ترتيب 404، overflow المستند (×2)، انحدار `landmark-unique` و`contrast-active` أثناء العمل (رُصدا بإعادة الفحص وعُولجا).

---

## O. Horizontal Overflow Audit

- **English Mobile: PASS** — كل الصفحات `scrollWidth<=innerWidth` (مُتحقق عند 390px).
- **Arabic Mobile: PASS** — كذلك (390px) + Tablet/Laptop/Desktop.
- الصفحات المسببة سابقًا: كل service/proof heroes ≤768px (أصلها `hero-seq::before`) وصفحات `about/404` (أصلها `logo-chamber__bloom`) — أُصلحت بـ`overflow-x:clip` على `.hero` و`.logo-chamber`.
- ملاحظة: راصد صارم على مستوى العنصر ما زال يرى bleed زخرفيًا مقصوصًا للـbloom (لا أثر على المستند) — مُبقى عمدًا حفاظًا على الهوية.

---

## P. Regression Check — **PASS** (10/10)

Navigation ✓ · Language routing ✓ · Hash navigation ✓ · Scroll-to-top (route scroll) ✓ · Deep links ✓ · Contextual links ✓ · Contact source context (`source=case:patchouli` يظهر) ✓ · Breadcrumbs ✓ · Floating dock ✓ · Case data & Insight relationships (الأزواج المعتمدة + CTA الخامس) ✓ — plus `npm run prerender`: 36 صفحة ثابتة.

---

## Q. Performance / Stability Check

- لا CLS جديد: كل الصور بأبعاد، الـvisuals بـviewBox/min-height، الخطوط `display=swap` مع preload ضمني (`preconnect`).
- لا jank: الـambient متوقف خارج الشاشة (`is-paused`)، والـparallax إما CSS timeline أو springs مخففة.
- لا اعتماديات جديدة (صفر إضافات لـ`package.json`)؛ CSS الجديد ~4KB.
- ملاحظة: حزم `motion`/`react-vendor` (~232KB لكل) كما كانت — خارج نطاق Phase 4 (لا overhaul).

---

## R. Release Gate

```
npm run check:release → BLOCKED — Awaiting explicit legal/commercial publication approval.
(publicationApproved:true, anonymizeCases:false → 5 أسماء عملاء ومقاييس PUBLIC عند النشر)
```

لم يُضبط `EM_RELEASE_APPROVED=1` ولم تُمس `publicationApproved/anonymizeCases`. الـgate يعمل كما صُمم. البناء الداخلي (`build`/`prerender`) يعمل للمراجعة. **الموقع غير جاهز للإطلاق العام حتى موافقة صريحة.**

---

## S. Remaining Issues (بصراحة)

1. مفاتيح home-v2 المفقودة أصلًا (`ledgerCta`, `sectorsCta`, `closeSecondary`, `sectorsText`…) تحتاج **قرار copy معتمد** مستقبلًا — Phase 4 ربطت البدائل المعتمدة وأخفت الفراغ بدل اختراع نص.
2. نموذج Contact **نموذج أولي**: نجاح محلي فقط + وسم prototype عند الإنجاز، لكن لا يوجد تنبيه مسبق قبل الإرسال — يحتاج نص تنبيه معتمد (خارج Phase 4).
3. سكربت `npm run qa` فيه افتراضان قديمان (`LOGO 0` على home loggia، وسيليكتور `/consulting` غير المُسبوق باللغة) — ليسا عيوب منتج؛ مُقترح تحديثهما لاحقًا.
4. `ProofMetric.tsx` وCSS (`.proof-metric`, `.swipe*`, `.chain/.flow`, `.contact-grid`) ميتة لكن محفوظة عمدًا (تنظيف واسع خارج النطاق؛ tree-shaken ولا أثر).
5. لا اختبار بأجهزة حقيقية ولا جولة قارئ شاشة — المحاكاة + axe فقط.
6. مفاتيح home قديمة غير مستخدمة بالقالب (`methodLink`, `challenges*`…) باقية في البيانات بلا ضرر.

---

## T. Recommendations for Phase 5 (SEO + GEO + Semantic Discoverability — للملاحظة فقط)

1. الأساس جاهز: `SeoHead` يضبط canonical/hreflang (ar/en/x-default)/OG/Twitter/JSON-LD؛ والـprerender ينتج 36 صفحة + `sitemap.xml`.
2. بنية العناوين الآن سليمة (`h1→h2` في القضايا والرؤى) — مؤهلة لـ`Article` structured data للمقالات الخمسة.
3. مقترح: `FAQPage`/`HowTo` للأسئلة الاستشارية، و` speakable` أو مقتطفات GEO للإجابات (`GeoAnswer`/`exec-answer` نصوص مرشحة طبيعية).
4. مقترح: مراجعة `ogImage` لكل insight/case (صورة واحدة عامة حاليًا على الأرجح).
5. مقترح: `robots`/noindex لمسارات prototype إن بقيت قبل الإطلاق (مرتبط بقرار R).
6. قابلية الزحف ممتازة (روابط حقيقية + hash anchors + sitemap) — حافظ عليها عند أي تغيير router مستقبلي.

---

## U. Final Phase Score

| Criterion | Score |
|---|---|
| Visual Hierarchy | 92 |
| Typography | 93 |
| Spacing / Rhythm | 92 |
| Responsive Quality | 94 |
| Mobile UX | 93 |
| RTL Quality | 95 |
| Accessibility | 96 |
| Interaction Clarity | 93 |
| Motion Quality | 92 |
| Design Consistency | 90 |
| Approved Copy Preservation | **100** |
| Regression Safety | 95 |

### Overall Phase 4 Score: **94/100**

- `Approved Copy Preservation = 100` ✓ (المرحلة مكتملة بهذا الشرط).
- Browser QA تم بمتصفح حقيقي (غير BLOCKED) ✓.
- لا FAIL جوهري في Accessibility (axe صفر) ✓.
- `npm run check:release` يبقى **BLOCKED — Awaiting explicit legal/commercial publication approval** (لا يمنع Phase 4 محليًا، ويمنع الإطلاق العام).
