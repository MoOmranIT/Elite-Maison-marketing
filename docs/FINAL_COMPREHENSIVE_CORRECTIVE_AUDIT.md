# Final comprehensive corrective audit

Baseline reviewed: `0dce6a1` (`0dce6a13a77dab82b66105a07f198b7764dbc4fe`) on the local worktree. No commit, push, deploy, or `EM_RELEASE_APPROVED=1`.

Deployment status:

```text
LOCAL BUILD READY FOR GODADDY LIVE QA — INDEXING STILL CLOSED
```

## I18N contract

`scripts/qa-i18n-contract.mjs` (`npm run qa:i18n`) scans static `t("...")` calls and requires a non-empty value in both `EM.I18N.ar` and `EM.I18N.en`.

Result: `keys=58 missing=0`.

Keys added in both languages:

| Key | Arabic | English |
| --- | --- | --- |
| `heroInquiry` | تواصل معنا | Contact us |
| `contactRequired` | يرجى تعبئة هذا الحقل. | Please complete this field. |
| `contactInvalidEmail` | أدخلوا بريدًا إلكترونيًا صالحًا. | Enter a valid email address. |
| `contactErrorSummary` | هناك حقول تحتاج إلى مراجعة. | Some fields need your attention. |
| `sending` | جارٍ الإرسال… | Sending… |
| `marketsEntered` | الأسواق التي تم دخولها | Markets entered |
| `awardProof` | دليل الجائزة | Award proof |
| `prevCase` | القصة السابقة | Previous case |
| `similarChallenge` | لديكم تحدٍ مشابه؟ | Facing a similar challenge? |

`t()` still falls through when a key is missing. Browser QA asserts those raw camelCase keys are absent from visible text on every scanned route.

## Copy contract

`scripts/qa-copy-contract.mjs` (`npm run qa:copy-contract`) scans `copy("group", "key")`.

Result: `used=129 required=110 optional=19 missing=0 emptyRequired=0`.

Category A keys must exist and be non-empty in Arabic and English. Category B may be absent or empty, and was not invented to satisfy the gate. Optional allowlist: `home.ledgerAnon`, `ledgerCta`, `fourEyebrow`, `fourHint`, `fourOrder`, `methodRailLabel`, `methodChip`, `methodLine`, `pathsEyebrow`, `pathsConsultKicker`, `pathsExecKicker`, `capText`, `sectorsText`, `sectorsCta`, `closeNote`, `statementText`, `closeSecondary`, `closeChannels`, `contact.directText`.

`LogoChamber` renders `methodChip` and `methodLine` only when the string is non-empty.

`npm run qa:copy`: PASS `360/360`. The editorial deck remains the verbatim source. `statementTitle` stays in the home copy object because the deck still requires “خبرة تعرف الفرق بين الانشغال والتقدم.” and “Experience that knows the difference between busyness and progress.” The visible Four I's heading is `trustLabel`.

### EM.COPY override

`EM.COPY.home` is created empty and later replaced by `Object.assign(EM.COPY.home, { ... })` near the end of `src/data/em.js`. That assign is the home copy the UI reads. `EM.METHOD` is also assigned twice; the later assignment is the one `DeliveryPath` renders. Arabic stage titles were set there. Stage body copy was left as it was. `em.js` was not broadly refactored.

## Home hero hierarchy

Wording unchanged:

- AR: وضوح أكبر. / قرارات أفضل. نمو أقوى.
- EN: Greater clarity. / Better decisions. Stronger growth.

Both lines use `.hero__ink` (`color: var(--ink)`, `#06182D`, `font-style: normal`, weight 700). Computed color on the title span in browser QA: `rgb(6, 24, 45)`. No English italic decoration and no glow, blur, or neon.

Size: `.folio-hero .hero__title` is `clamp(2.28rem, 5.6vw, 4.05rem)`; at `≤700px` it is `clamp(1.9rem, 8vw, 2.3rem)`.

Gold accent: the existing Four I's dots, plus one short `.hero__rule` (`2.75rem` × `1px`, `aria-hidden="true"`, a non-focusable span). The architecture photo, lockup, and loggia composition were not changed.

Secondary CTA label is `t("heroInquiry")`: تواصل معنا / Contact us. The button still dispatches `open-contact-dock`. Browser QA clicks it, waits for `#contact-dock-panel`, then closes it with Escape. It is not a booking control, modal, or new route.

### photoAlt

The architecture photograph is meaningful content, and the lockup already names the brand, so the photo alt is not empty and is not keyword-stuffed.

- AR: فضاء معماري هادئ يحتضن علامة Elite Maison.
- EN: A quiet architectural space holding the Elite Maison mark.

Lockup alt remains `Elite Maison Marketing Consultancies`.

## Home section order

1. Hero
2. Credibility strip (`18+` / `GCC`) inside `.shell`, quiet padding and a hairline, not a large section
3. Impact ledger
4. Four I's
5. Method rail
6. Consulting / Execution
7. Sectors
8. Closing

Browser QA asserts `.folio-hero` precedes `.cred-strip` precedes `.hv-ledger` on `/ar` and `/en`.

Strip labels, with the number or acronym in `strong` and the phrase in `span`:

- AR: `18+` سنة خبرة · `GCC` خبرة في أسواق الخليج
- EN: `18+` years of experience · `GCC` market experience

No client counts, country counts, campaign counts, or team size were added.

## Method rail

Arabic titles: نشخّص / نرتّب / ننفّذ / نقيس ونحسّن.

English titles: Diagnose / Prioritize / Execute / Measure & Improve.

Home headline:

- AR: نبدأ بما يجب أن يتغيّر، لا بما تفعلونه.
- EN: We start with what needs to change, not with what you do.

The supporting method paragraph is unchanged. Browser QA confirms the four Arabic titles are visible on `/ar` and that those four English stage titles are not visible on `/ar`.

## Four I's heading

- AR: خبرة تقرأ العمل بعين النجاح.
- EN: Experience that understands the business through the lens of success.

The unfinished “..” form is gone.

## Home path CTAs

- AR: استكشفوا الاستشارات / استكشفوا التنفيذ
- EN: Explore consulting / Explore execution

No booking language on these controls.

## Contact regression

`/ar/contact` and `/en/contact` are in the browser gate: one H1, language correct, no raw keys, axe clean. Validation and sending strings are the I18N values above. FormSubmit remains the existing AJAX path; browser QA intercepted one POST and delivered no email. WhatsApp, email, and phone stay in place.

These sentences are absent from `src`:

- استخدموا القناة الأنسب لكم. جميعها تذهب مباشرة إلى بيانات التواصل المعتمدة للموقع.
- يمكنكم إضافة الشركة أو الهاتف إذا كان ذلك يساعد على فهم السياق أو يجعل التواصل أسهل.

## Cases regression

All five cases remain `attractive-smile`, `bloom`, `bin-ablan`, `patchouli`, and `ai-brains`. Market, award, previous-case, and similar-challenge labels resolve through I18N in both languages. Browser QA loaded `/en/cases/patchouli`, `/en/cases/ai-brains`, and `/ar/cases/ai-brains` with no raw keys and no serious or critical axe violations. No new metrics, clients, certifications, or award body, year, or rank were added.

## Server and legacy parity

`server.mjs` `INSIGHT_IDS` includes `gcc-market-entry-readiness`.

`GET /insight.html?id=gcc-market-entry-readiness` returns `301` to `/ar/insights/gcc-market-entry-readiness`. Confirmed with `curl` against the current `server.mjs` and by `npm run qa:http` and `npm run qa`.

Canonical count remains 38 pages (19 AR + 19 EN). `dist/sitemap.xml` has 38 `<loc>` entries. `verify:ssg` checked 38/38.

## Documentation reconciliation

Stale claims were corrected only where they contradicted the live site:

- `docs/approved-copy/elite_maison_editorial_copy_deck_v2.md`: contact is an inquiry (FormSubmit, WhatsApp, email, phone, human reply), not “Book a consultation” or a calendar. Hero notes describe Ink Navy with a short gold rule. `trustLabel` and the home method headline match the live sentences.
- `docs/design-system.md`: the primary action is the inquiry. The interactive list no longer requires a booking form, contact tabs, or a details dialog.
- `docs/brand-guidelines.md`: fonts are self-hosted Fontsource (Source Serif 4, Work Sans, Noto Naskh Arabic, IBM Plex Sans Arabic).

## SEO, schema, sitemap

`npm run qa:seo`: `robots-mode=PRE-RELEASE-closed`, `STATIC passes=1083 fails=0`.

`dist/robots.txt` is `Disallow: /`. Indexing stays closed.

`npm run qa:phase3b`: 6 insights and 5 cases, EN and AR, 190 passes.

`npm run qa:phase3c1`: 56 passes.

No canonical, schema, or sitemap architecture change beyond the existing gcc insight already counted in the 38 pages.

## Browser QA

Target: production Node server, `QA_BASE=http://127.0.0.1:3000`, current `server.mjs` serving `dist`. System Chrome via the existing Playwright fallback.

Viewports: 1440×900, 1024×800, 768×1024, 390×844.

Routes scanned with axe: `/en`, `/en/about`, `/en/consulting`, `/en/execution`, `/en/sectors`, `/en/cases`, `/en/cases/patchouli`, `/en/cases/ai-brains`, `/en/insights`, `/en/insights/gcc-market-entry-readiness`, `/en/contact`, and the Arabic equivalents of the required set (`/ar` through `/ar/contact`, including `/ar/cases/ai-brains` and `/ar/insights/gcc-market-entry-readiness`).

Axe: executed on every route, `routes scanned=21`, `violations=0`, `serious=0`, `critical=0`, execution errors `0`.

Home contract, legacy redirect, consulting flow, contact flow, and the mocked inquiry POST passed. Assertion failures: 0.

An earlier run against port 3000 failed because a previously started Node process was still serving and returned 404 for the gcc legacy URL. That process was stopped, the current `server.mjs` was started, and the gate was re-run. The passing result above is from that current server.

## Command results

| Command | Result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run qa:i18n` | PASS `keys=58 missing=0` |
| `npm run qa:copy-contract` | PASS `used=129 required=110 optional=19 missing=0 emptyRequired=0` |
| `npm run qa:copy` | PASS `360/360` |
| `npm run qa:inquiry` | PASS |
| `npm run build` | PASS `38/38` canonical pages, robots PRE-RELEASE, crawling closed |
| `npm run verify:ssg` | PASS `38/38` |
| `npm run qa:seo` | PASS `1083` static checks, `fails=0` |
| `npm run qa:phase3b` | PASS `190` assertions |
| `npm run qa:phase3c1` | PASS `56` assertions |
| `npm run qa:http` | PASS, including the gcc insight legacy redirect |
| `npm run qa` | PASS against `http://127.0.0.1:3000`, axe `0` serious / `0` critical |
| `npm audit --omit=optional --audit-level=high` | `found 0 vulnerabilities` |
| `git diff --check` | exit `0` (CRLF warnings only on the copy deck, `package.json`, and `em.js`) |
| `npm run check:release` | exit `2` — `GOVERNANCE OPEN`. `EM_RELEASE_APPROVED` is unset in `.env.production`. Expected governance block, not a technical failure. |
