# Elite Maison — Final Copy Implementation & Humanizer Report

**Date:** 22 September 2026  
**Scope:** Owner-approved copy implementation + approved Humanizer handoff only  
**Status:** COPY IMPLEMENTATION + HUMANIZER PASS COMPLETE — BRAND VOICE PRESERVED — LOCAL BUILD READY

---

## A. Implemented approved copy edits

| Decision | Key / location | Change |
|---|---|---|
| **4.1 Home lead — ACCEPT** | `EM.COPY.home.lead` | Replaced with owner-approved AR/EN lead. Removed diagnosis→execution chain from hero lead. |
| **4.2 Home method supporting copy — ACCEPT** | `EM.COPY.home.methodText` | Updated to approved AR/EN; ends with evidence-based review, no mid-chain “decision becomes work” sentence. |
| **4.3 Consulting answer — APPROVED WITH MODIFICATION** | `EM.COPY.consulting.answer` | Replaced capability-list rhythm with approved GEO-aware answer (GCC markets, commercial question → decision + roadmap). |
| **4.4 Execution answer — ACCEPT** | `EM.COPY.execution.answer` | Replaced list-style answer with approved direction → campaigns/channels/systems + measurement tied to commercial outcome. |
| **4.5 About method Arabic — ACCEPT** | `EM.COPY.about.methodText` (AR) | Visible stage chain now `نشخّص → نرتّب → ننفّذ → نقيس ونحسّن` with approved Arabic body. EN unchanged. |
| **4.6 Contact SEO title — ACCEPT WITH ARABIC CORRECTION** | `EM.PAGES.contact.title` | AR: `تواصلوا مع Elite Maison \| أرسلوا استفسارًا` · EN: `Contact Elite Maison \| Send an inquiry`. No booking language. |
| **4.7 Contact H1 — REJECT REPORT CHANGE** | `EM.COPY.contact.title` | **Not changed.** Current H1 preserved. |
| **4.8 Patchouli Arabic proof — MODIFY** | `caseCopy.patchouli.proof`, `EM.CASES` base proof | AR: `11 فرعًا بنظام الامتياز التجاري.` · EN: `11 franchise branches.` |
| **4.9 Insight summary/answer duplication — ACCEPT OPTION A** | `src/pages/InsightsPage.tsx` | Answer block hidden when `answer === summary` for current language. GCC Market Entry insight unchanged (distinct answer). |
| **5.2 About whoText opening — ACCEPT** | `EM.COPY.about.whoText` | Removed repeated firm-definition opening; direct opening from diagnosis/strategy through execution oversight. |
| **5.3 Consulting decision text — ACCEPT** | `EM.COPY.consulting.decisionText` | Approved AR/EN exact wording applied. |
| **5.4 Closing CTA duplicates — SOURCE CLEANUP** | `EM.I18N` | Removed unused `submitCta` and `contactTime` (no `t()` consumers; no visible copy change). |
| **5.7 submitCta / contactTime — ACCEPT** | `EM.I18N.ar/en` | Both keys removed — dead at runtime. |
| **5.8 Contact success message — ACCEPT** | `EM.COPY.contact.successText` | Removed FormSubmit/delivery-service wording; inquiry success copy applied. |
| **5.9 Stale About base title — CLEANUP** | `EM.COPY.about.title` (base layer) | Aligned shadowed base title with runtime override (no rendered title change). |
| **Deck parity** | `docs/approved-copy/elite_maison_editorial_copy_deck_v2.md` | Updated extracted strings to match shipped approved copy for `qa:copy` integrity. |

---

## B. Rejected report proposals (NOT implemented)

| Proposal | Status | Reason preserved |
|---|---|---|
| Contact H1 rewrite | **NOT implemented** | Current H1 is more human; “Contact us” belongs on CTA, not headline. |
| Home cases headline rewrite | **NOT implemented** | Locked: `نتائج تتكلم، والحكم للأرقام.` / `Results speak. The numbers have the final say.` |
| Sectors answer rewrite | **NOT implemented** | Current strategic wording retained (`customers`, `growth repeatable`). |
| Execution chain title rewrite | **NOT implemented** | Three-beat rhythm preserved: `Clear direction. Disciplined execution. Continuous learning.` |
| About EN meta slogan replacement | **NOT implemented** | Descriptive meta kept for search usefulness. |

---

## C. Humanizer changes accepted

Humanizer applied **only** to the approved handoff list. AR and EN edited independently.

### `EM.COPY.home.lead`
- **Before:** (owner-approved structural text — same as after implementation)
- **Humanized:** No change applied
- **Reason accepted:** Owner prompt §4.1 specifies exact wording; Humanizer would weaken approved editorial precision. Pre-edit version kept.

### `EM.COPY.consulting.ctaTitle`
- **Before AR:** إذا كان السؤال غير واضح، فهذه ليست مشكلة. هذه نقطة البداية.
- **Before EN:** If the question is unclear, that is not a problem. That is the starting point.
- **Humanized AR:** إذا بقي السؤال غير واضح، فهنا نبدأ.
- **Humanized EN:** If the question is still unclear, that is where we start.
- **Reason accepted:** Removes not-X-but-Y staging; keeps calm, decision-led tone.

### `EM.COPY.consulting.ctaText`
- **Before AR:** نبدأ من المسألة كما هي، لا من خدمة نحاول بيعها لها.
- **Before EN:** We start with the issue as it is, not with a service we are trying to fit onto it.
- **Humanized AR:** نبدأ من المسألة كما هي، لا من خدمة نحاول فرضها.
- **Humanized EN:** We start with the issue as it stands, not with a service we try to impose.
- **Reason accepted:** Same commercial meaning; cleaner syntax without sales rhythm.

### `EM.COPY.execution.ctaTitle`
- **Before / after:** Unchanged
- **Reason accepted:** Strong editorial rhythm; Humanizer flattening would weaken brand voice.

### `EM.COPY.execution.ctaText`
- **Before EN:** We define what needs to run, who owns it and what we will watch to know whether execution is moving in the intended direction.
- **Humanized EN:** We define what must run, who owns it, and what we will track to see whether execution is moving as intended.
- **Reason accepted:** Stronger verbs; same measurement intent. AR unchanged (already precise).

### `EM.COPY.insights.lead`
- **Before EN:** …when does a growth roadmap become a decision tool, where does demand disappear before revenue…
- **Humanized EN:** …when a growth roadmap becomes a decision tool, where demand disappears before it becomes revenue…
- **Humanized AR:** `تظهر في العمل` / `يبدو السوق جذابًا` (minor rhythm)
- **Reason accepted:** Less interrogative symmetry; same questions and GCC-relevant scope.

### `EM.COPY.cases.ctaText` — last sentence only
- **Before EN:** …then using relevant experience without forcing a ready-made formula.
- **Humanized EN:** …then drawing on relevant experience without imposing a ready-made formula.
- **Humanized AR:** …ثم الاستفادة من الخبرة ذات الصلة من دون فرض وصفة جاهزة.
- **Reason accepted:** Same meaning; less mechanical phrasing.

### `EM.COPY.contact.successText`
- **Before:** FormSubmit / delivery-service technical wording
- **Humanized AR:** تم إرسال استفساركم بنجاح. يمكنكم أيضًا التواصل مباشرة عبر واتساب أو البريد أو الهاتف أدناه.
- **Humanized EN:** Your inquiry was sent successfully. You can also reach us directly on WhatsApp, email or phone below.
- **Reason accepted:** Human confirmation; no provider/SLA claims.

### `EM.COPY.contact.errorText`
- **Before EN:** What you entered is still on the page. Try again, or use WhatsApp, email or phone directly.
- **Humanized EN:** What you wrote is still here. Try again, or reach us on WhatsApp, email or phone.
- **Humanized AR:** ما كتبتموه ما زال في الصفحة. أعيدوا المحاولة، أو تواصلوا عبر واتساب أو البريد أو الهاتف.
- **Reason accepted:** Simpler, human recovery path; no technical language.

---

## D. Humanizer suggestions rejected

| Passage | Humanizer direction considered | Decision |
|---|---|---|
| `home.lead` | Rephrase question block / add narrative flow | **Rejected** — owner exact text is stronger |
| `execution.ctaTitle` | Flatten to single sentence | **Rejected** — preserves editorial three-beat rhythm |
| `consulting.ctaTitle` (alternative) | “An unclear question is a starting point, not a problem.” | **Rejected** — still not-X-but-Y pattern |
| `insights.lead` (aggressive trim) | Remove one question for brevity | **Rejected** — would lose approved question scope |

---

## E. Locked copy integrity

Confirmed unchanged:

- Home hero: `home.title`, `home.accent` (AR/EN locked lines)
- Home method headline: `home.methodTitle`
- Experience / Four I's: `home.trustLabel`
- Hero secondary CTA: `I18N.heroInquiry` → `تواصل معنا` / `Contact us`
- Home cap title/support, About lead, Consulting page title, Execution page title, Cases index lead, footer statement
- Home consulting/execution path CTA labels
- Contact H1 (unchanged per §4.7)
- GCC Market Entry insight approved body/title/CTA/SEO
- All approved proof facts, 18+ years, GCC positioning, case metrics, AI Brains award wording

---

## F. Proof integrity

Confirmed unchanged:

- 18+ years experience labels
- GCC market positioning
- Case metrics (Bloom AED figures, Attractive Smile 12-day bookings, Bin Ablan five markets, Patchouli **11 franchise branches** count, AI Brains award wording)
- Patchouli AR proof updated only to approved phrasing: `11 فرعًا بنظام الامتياز التجاري.` — same fact, approved wording
- No new clients, metrics, awards, locations, guarantees, response times, booking, or Cal.com language introduced

---

## G. QA results

| Command | Result |
|---|---|
| `npm run typecheck` | **PASS** |
| `npm run qa:i18n` | **PASS** — keys=58, missing=0 |
| `npm run qa:copy-contract` | **PASS** — used=129, missing=0, emptyRequired=0 |
| `npm run qa:copy` | **PASS** — 360/360 strings, coverage 100% |
| `npm run qa:inquiry` | **PASS** |
| `npm run build` | **PASS** — 38/38 canonical pages |
| `npm run verify:ssg` | **PASS** — 38/38 pages verified |
| `npm run qa:seo` | **PASS** — passes=1083, fails=0 |
| `npm run qa:phase3b` | **PASS** — 190 assertions |
| `npm run qa:phase3c1` | **PASS** — 56 assertions |
| `npm run qa:http` | **PASS** |
| `npm run qa` | **PASS** — 21 routes, axe 0 violations, legacy redirects OK |
| `git diff --check` | **PASS** — no conflict markers (LF/CRLF warnings only) |

### Browser verification notes

Playwright QA (`npm run qa`) covered EN/AR home, about, consulting, execution, sectors, cases, insights (incl. GCC), contact, and legacy redirects on `http://127.0.0.1:3000`.

Spot checks on built output:

- `/en/contact` prerendered title: `Contact Elite Maison | Send an inquiry`
- `/ar/cases/patchouli` proof in title/meta: `11 فرعًا بنظام الامتياز التجاري.`
- Legacy insight pages: duplicated answer block suppressed when answer equals summary (component logic in `InsightsPage.tsx`)

---

## H. Final status

**COPY IMPLEMENTATION + HUMANIZER PASS COMPLETE — BRAND VOICE PRESERVED — LOCAL BUILD READY**

No commit, push, deploy, or `EM_RELEASE_APPROVED` change was made per hard-stop instructions.
