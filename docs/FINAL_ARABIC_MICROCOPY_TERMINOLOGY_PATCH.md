# Elite Maison — Final Arabic Microcopy & Terminology Patch

**Status:** `FINAL MICROCOPY TERMINOLOGY PATCH COMPLETE — COPY FREEZE RESTORED`

| Field | Value |
|---|---|
| Date | 2026-09-23 |
| Branch / commit base | `main` @ `b6700a6` (no fetch, pull, checkout, reset, stash, revert) |
| Skill used | MarketingSkills `copy-editing` — used in **closed exact-replacement mode** only |
| Humanizer | **not run** |
| Scope | exact owner-approved string replacements only — no copy audit, no redesign, no refactor |
| Commits / push / deploy | **none** |
| Indexing | closed (`dist/robots.txt` → `User-agent: * / Disallow: /`) |
| `EM_RELEASE_APPROVED` | **unset** (unchanged) |

Guardrails honoured: no project-wide substitutions of `قدرة / خدمة / حل / قصة / قصص / capability / service / solution / story`; no edits to CSS, layout, components, routing, hash behaviour, canonicals, hreflang, sitemap, robots, schema, FormSubmit, `server.mjs`, or release governance.

---

## A. Exact replacements

All twenty approved AR/EN slots were located, verified as the **runtime-rendered** value, and replaced exactly.

### 1. `EM.COPY.sectors.ctaEyebrow`

```text
Key        EM.COPY.sectors.ctaEyebrow
CURRENT AR قطاعكم هو السياق، لا كيف تختارون القدرة الوحيدة
NEW AR     ابدؤوا من سؤال القطاع، لا من اسمه.
CURRENT EN Your sector is context, not the only starting point
NEW EN     Start with the question inside your sector, not the sector name.
```

`ctaTitle` and `ctaText` of the sector CTA band were deliberately left untouched.

### 2. `EM.COPY.sectors.selectTitle`

```text
Key        EM.COPY.sectors.selectTitle
CURRENT AR ابدؤوا بالسياق الأقرب إلى عملكم. فكل سياق يغيّر ما يجب أن يُحسم.
NEW AR     ابدؤوا بالسياق الأقرب إلى عملكم. فالسياق يحدد أي قرار يأتي أولًا.
CURRENT EN Start with the context closest to your business. Each context changes what needs to be decided.
NEW EN     Start with the context closest to your business. Context determines which decision comes first.
```

`selectEyebrow`, `selectNote`, sector cards, sector body copy and SEO metadata untouched.

### 3. `EM.COPY.cases.ctaText`

```text
Key        EM.COPY.cases.ctaText
CURRENT AR قد يكون السياق مختلفًا تمامًا. المهم هو فهم ما تحاولون تغييره الآن، ثم نضع الخبرة ذات الصلة في سياق الحالة نفسها.
NEW AR     قد يكون السياق مختلفًا تمامًا. المهم هو فهم ما تحاولون تغييره الآن، ثم ربط الخبرة ذات الصلة بواقعكم.
CURRENT EN Your context may be entirely different. What matters is understanding what you are trying to change now, then we bring relevant experience into the context of the case itself.
NEW EN     Your context may be entirely different. What matters is understanding what you are trying to change now, then connecting relevant experience to your situation.
```

`cases.ctaTitle`, metrics, case names, proof/result/challenge/strategy/execution copy, case SEO/schema untouched.

### 4. `EM.COPY.home.capText`

```text
Key        EM.COPY.home.capText
CURRENT AR استراتيجية تستحق التنفيذ، وتنفيذ يبقى تحت عين القرار.
NEW AR     استراتيجية تستحق التنفيذ، وتنفيذ يظل مرتبطًا بالقرار.
CURRENT EN Strategy worth executing. Execution guided by the same discipline.
NEW EN     EN unchanged by owner decision.
```

`capTitle`, Consulting card copy, Execution card copy, Home method/hero untouched.

### 5. `relatedCapabilities`

```text
Key        relatedCapabilities
CURRENT AR قدرات ذات صلة
NEW AR     مسارات ذات صلة
CURRENT EN Related capabilities
NEW EN     Related paths
```

### 6. `relatedConsulting`

```text
Key        relatedConsulting
CURRENT AR قدرة استشارية مرتبطة
NEW AR     استشارة ذات صلة
CURRENT EN Related consulting capability
NEW EN     Related consulting
```

### 7. `relatedExecution`

```text
Key        relatedExecution
CURRENT AR حل تنفيذي مرتبط
NEW AR     مسار تنفيذي ذو صلة
CURRENT EN Related execution solution
NEW EN     Related execution path
```

Link targets, related-path resolution logic, execution page titles, anchors and routing unchanged.

### 8. `serviceNav`

```text
Key        serviceNav
CURRENT AR فهرس الخدمات
NEW AR     فهرس المسارات
CURRENT EN Service index
NEW EN     Path index
```

Interface/ARIA terminology only. Selection component, accordion behaviour, hash navigation and IDs unchanged.

### 9. `measure`

```text
Key        measure
CURRENT AR مفهوم القياس
NEW AR     ما الذي نتابعه
CURRENT EN Measurement concept
NEW EN     What we track
```

Measurement copy/data records were not modified.

### 10. Cases terminology — `caseIndex`, `prevCase`, `nextCase`, `relatedCase`

```text
Key        caseIndex
CURRENT AR فهرس القصص
NEW AR     فهرس الحالات
CURRENT EN Case index
NEW EN     EN unchanged by owner decision.

Key        prevCase
CURRENT AR القصة السابقة
NEW AR     الحالة السابقة
CURRENT EN Previous case
NEW EN     EN unchanged by owner decision.

Key        nextCase
CURRENT AR القصة التالية
NEW AR     الحالة التالية
CURRENT EN Next case
NEW EN     EN unchanged by owner decision.

Key        relatedCase
CURRENT AR قصة ذات صلة
NEW AR     حالة ذات صلة
CURRENT EN Related case
NEW EN     EN unchanged by owner decision.
```

No route, ID, data-structure, schema-type, CSS-class, filename or internal developer terminology was renamed.

---

## B. Files changed

| File | Change | Count |
|---|---|---|
| `src/data/em.js` | Runtime content source: `EM.I18N.ar` (9 labels), `EM.I18N.en` (5 labels), `EM.COPY.sectors` base (`ctaEyebrow`, `selectTitle`), `EM.COPY.cases` base (`ctaText`), `EM.COPY.home` runtime override (`capText`), `EM.COPY.sectors` runtime override (`selectTitle`), `EM.COPY.cases` runtime override (`ctaText`) | 20 lines |
| `docs/approved-copy/elite_maison_editorial_copy_deck_v2.md` | Approved-copy lines in `qa:copy` parity: L221 (`capText` AR), L638–639 (`selectTitle` AR/EN), L714–715 (`cases.ctaText` AR/EN) | 5 lines |
| `scripts/qa-phase3b.mjs` | ARCH-01 assertion label parity: `RELATED_LABEL.ar` → `حالة ذات صلة` (EN assertion string unchanged) | 1 line |
| `docs/FINAL_ARABIC_MICROCOPY_TERMINOLOGY_PATCH.md` | This report (new, untracked) | new |

`git diff --stat` (tracked files only):

```text
 .../elite_maison_editorial_copy_deck_v2.md         | 10 +++---
 scripts/qa-phase3b.mjs                             |  2 +-
 src/data/em.js                                     | 40 +++++++++++-----------
 3 files changed, 26 insertions(+), 26 deletions(-)
```

No CSS, component, route, SEO, schema, hosting or governance file appears in the diff.

### Source-of-truth handling (`em.js` seed + runtime overrides)

- `sectors.ctaEyebrow` exists only in the seed block → the seed value is the rendered value; changed once.
- `sectors.selectTitle` and `cases.ctaText` exist twice: seed **and** a later `Object.assign(EM.COPY.sectors, …)` / `Object.assign(EM.COPY.cases, …)` runtime override. Both copies were updated so the duplicate source entries stay in parity; override ordering is unchanged, so the override remains the winning value.
- `home.capText` exists only in the runtime `Object.assign(EM.COPY.home, …)` block → AR replaced, EN kept.
- No unrelated shadowed or stale strings were cleaned, and no opportunistic refactoring was performed.

---

## C. Runtime verification

Verified against the freshly prerendered `dist/` output (38 canonical pages, 19 AR + 19 EN) after `npm run build`, by scanning each page for the new strings and confirming every retired string is gone.

| Key | Rendered by (component) | Where it renders | Verified in dist |
|---|---|---|---|
| `EM.COPY.sectors.ctaEyebrow` | `SectorsPage.tsx:65` → `CtaBand kicker` | sector CTA band | `ar/sectors`, `en/sectors` — new AR/EN present, old absent |
| `EM.COPY.sectors.selectTitle` | `SectorsPage.tsx:53` → `SectionIntro title` | sector selection heading | `ar/sectors`, `en/sectors` |
| `EM.COPY.cases.ctaText` | `CasesPage.tsx` (cases index) → `CtaBand text` | cases index closing CTA | `ar/cases/index.html`, `en/cases/index.html` |
| `EM.COPY.home.capText` | `components/home/sections.tsx:310-312` (`TwoPaths`, `<p class="intro">`) | home, under the two commercial paths | `ar/index.html`; EN unchanged → `en/index.html` |
| `relatedCapabilities` | `components/folio/RelatedPath.tsx:49,56,63,69` | `Go` link label / fallback label | see note 1 |
| `relatedConsulting` | `components/folio/RelatedPath.tsx:49,69` | execution page path links + insight CTAs | `ar/execution`, `en/execution`, 5 insight pages per language |
| `relatedExecution` | `components/folio/RelatedPath.tsx:49,69` | consulting page path links + insight CTAs | `ar/consulting`, `ar/insights/ai-insight` (+ EN mirrors) |
| `serviceNav` | `ConsultingPage.tsx:66` → `nav.folio-index aria-label` | consulting path index (interface/ARIA) | `ar/consulting` → `aria-label="فهرس المسارات"`; `en/consulting` → `aria-label="Path index"` |
| `measure` | *no component references the key today* | — | see note 2 |
| `caseIndex` | `CasesPage.tsx:213` → `nav.case-pager aria-label` | all 5 case-detail pagers | `ar/cases/*` → `aria-label="فهرس الحالات"` (5 pages); EN unchanged (`Case index`) |
| `prevCase` | `CasesPage.tsx:214` → `Go` label (visible text) | case-detail pager | 4 AR pages (`ai-brains`, `attractive-smile`, `bin-ablan`, `bloom`) — `patchouli` has no previous case |
| `nextCase` | `CasesPage.tsx:215` → `Go` label (visible text) | case-detail pager | 4 AR pages (`attractive-smile`, `bin-ablan`, `bloom`, `patchouli`) — `ai-brains` has no next case |
| `relatedCase` | `InsightsPage.tsx:248` → `Go` label (visible text) | insight → case contextual link | 5 AR insight pages → `حالة ذات صلة: <case name>`; `cx-check` has no related case (by design) |

An automated scan of all 40 `dist` HTML documents confirmed **0 occurrences** of every retired string, including: `قطاعكم هو السياق…`, `فكل سياق يغيّر…`, `في سياق الحالة نفسها`, `وتنفيذ يبقى تحت عين القرار`, `مفهوم القياس`, `فهرس الخدمات`, `فهرس القصص`, `القصة السابقة`, `القصة التالية`, `قصة ذات صلة`, `حل تنفيذي مرتبط`, `قدرة استشارية مرتبطة`, `قدرات ذات صلة`, `Related capabilities`, `Related execution solution`, `Related consulting capability`, `Service index`, `Measurement concept`, `Your sector is context…`, `Each context changes what needs to be decided.`, `into the context of the case itself`.

### Honest rendering notes (reported, not guessed at, not "fixed")

1. **`relatedCapabilities` fallback is not visible in the current content set.** The key is consumed by `RelatedPath.tsx` as the fallback `Go` label used only when `capabilityLabel()` cannot resolve a linked path to a titled consulting/execution item. Every related path in the current data resolves to a real title, so neither the old nor the new fallback string appears in the prerendered HTML. The label remains the value the component renders the moment a path cannot be resolved, and it is the value asserted by the component contract.
2. **`measure` has no static `t("measure")` consumer in the current runtime.** The key is defined in `EM.I18N.ar` / `EM.I18N.en` and was updated exactly as instructed, but no component currently reads it (`qa:i18n` reports 58 statically used keys; `measure` is not among them). The consulting page renders the *data field* `item.measure` under the label `EM.COPY.consulting.outLabel`, which was **not** touched. This is a pre-existing condition of the codebase, not an effect of this patch, and it was not "fixed" here because that would exceed the closed patch scope.

---

## D. Case terminology policy

Policy applied exactly as specified:

```text
Section / category = الدليل
Individual item    = الحالة
```

Visible labels changed to implement the policy:

| Key | Surface | OLD AR | NEW AR | EN |
|---|---|---|---|---|
| `caseIndex` | case-detail pager `nav` accessible name | فهرس القصص | فهرس الحالات | `Case index` — EN unchanged by owner decision. |
| `prevCase` | case-detail pager previous link (visible text) | القصة السابقة | الحالة السابقة | `Previous case` — EN unchanged by owner decision. |
| `nextCase` | case-detail pager next link (visible text) | القصة التالية | الحالة التالية | `Next case` — EN unchanged by owner decision. |
| `relatedCase` | insight → case contextual link (visible text) | قصة ذات صلة | حالة ذات صلة | `Related case` — EN unchanged by owner decision. |

Related wording decision inside the same policy (item 3 of this patch): `EM.COPY.cases.ctaText` no longer places experience "in the context of the case" — AR now ends `… ثم ربط الخبرة ذات الصلة بواقعكم.` and EN `… then connecting relevant experience to your situation.`

**Explicitly not renamed** (policy applies to visible labels only): route paths (`/cases/*`, legacy `case.html?id=…` aliases), DOM IDs and anchors, `EM.CASES` data structure, the `relatedCase` slug field, schema `@type` values, CSS classes (`.case-pager`, `.case-feature`, `.case-hero`, `.story-col`), filenames, and internal developer terminology.

---

## E. Explicit non-changes

Confirmed untouched in this patch:

- **About engageTitle** unchanged — `التحدي أولًا. ثم نحدد طريقة العمل.` / `The challenge comes first. Then we define how we work.`
- **Home hero** locked copy unchanged — `وضوح أكبر. / قرارات أفضل. نمو أقوى.` and `Greater clarity. / Better decisions. Stronger growth.`
- **Home method headline** unchanged — `نبدأ بما يجب أن يتغيّر، لا بما تفعلونه.` / `We start with what needs to change, not with what you do.`
- **Four I's** brand device unchanged (`EM.PILLARS`, `home.eyebrow`, `home.trustLabel`, about `pillarsTitle`).
- **Cases CTA title** unchanged — `إذا ذكّرتكم إحدى الحالات بسؤال لديكم، فلنبدأ من السؤال لا من الحل.` / `If one of these cases feels familiar, start with the question — not the solution.`
- **Sector CTA title** unchanged — `لا تبدأوا باسم القطاع. ابدأوا بالسؤال داخله.` / `Do not start with the sector label. Start with the question inside it.`
- **`exploreCases` runtime unchanged** — the rendered value remains `شاهدوا ما تغيّر في العمل` / `See what changed in the work` (the `EM.I18N` runtime override still wins over the seed string, which was left as-is).
- **`viewCase` unchanged** — `اقرأوا الحالة` / `Read the case`.
- **Contact** unchanged — lead, inquiry copy, success/error copy, field labels, validation messages, privacy note, FormSubmit endpoint and behaviour.
- **Footer** unchanged — footer lead text, `footerContact`, `footerText`, footer nav labels.
- **`photoNote` untouched** — source line 80 (AR `مساحة تصوير معتمدة — … بانتظار أصول معتمدة.`) and line 186 (EN) are byte-identical to before this patch. Per section 12 it was left out of scope. **Reported finding:** `photoNote` is **not** rendered publicly — no component in `src/` references the key, and it does not appear in any of the 40 prerendered `dist` HTML documents. No replacement copy was invented.
- **Case metrics, case names, proof/result/challenge/strategy/execution copy, case SEO/schema** unchanged.
- **SEO / schema / sitemap / robots** unchanged (files untouched; regenerated output identical apart from the approved copy deltas): 38 sitemap URLs, `robots.txt` still `User-agent: * / Disallow: /`.
- **No global word replacement** was run for `قدرة`, `خدمة`, `حل`, `قصة`, `قصص`, `capability`, `service`, `solution`, `story`; unrelated sentences containing `قصة` or `حل` (e.g. the cases lead body, seed strings outside the patch scope) were left untouched.

---

## F. QA — exact results

```text
npm run typecheck
  → exit 0   (tsc --noEmit && tsc --noEmit -p tsconfig.node.json — no diagnostics)

npm run qa:i18n
  → exit 0   qa:i18n keys=58 missing=0

npm run qa:copy-contract
  → exit 0   qa:copy-contract used=129 required=110 optional=19 missing=0 emptyRequired=0

npm run qa:copy
  → exit 0   status: PASS · expected strings: 360 · exact matches: 360 · exceptions: 0 · coverage: 100%

npm run qa:inquiry
  → exit 0   Inquiry QA: PASS

npm run build
  → exit 0   [build] client build: OK
             [build] SSR bundle: OK
             [prerender] robots.txt: PRE-RELEASE (crawling closed)
             [prerender] 38 static pages across 19 routes × 2 languages
             [prerender] wrote dist/404.html and dist/sitemap.xml (38 URLs)
             [ssg] 38/38 canonical pages rendered successfully
             [verify:ssg] checked 38/38 pages — PASS (browserless)
             [build] Production build complete — 38/38 canonical pages rendered (browserless)

npm run verify:ssg
  → exit 0   [verify:ssg] checked 38/38 pages · PASS — all 38 canonical pages verified (browserless)

npm run qa:seo
  → exit 0   INFO robots-mode=PRE-RELEASE-closed · STATIC passes=1083 fails=0 · qa-seo: ALL CHECKS PASS

npm run qa:phase3b
  → exit 0   insights audited: 6 (EN + AR) · cases audited: 5 (EN + AR)
             assertions: 190 passes, 0 failures · PASS

npm run qa:phase3c1
  → exit 0   assertions: 56 passes, 0 failures · PASS

npm run qa:nojs
  → exit 0   routes tested: 10 · javascript disabled: true · assertion failures: 0 · result: PASS

npm run qa:harden
  → exit 0   assertion failures: 0 · result: PASS

npm run qa:typeset
  → exit 0   assertion failures: 0 · result: PASS

npm run qa:hosting
  → exit 0   qa:hosting: PASS (local Node server)

npm run qa
  → exit 0   target: production Node server 4183 (started by qa)
             axe serious: 0 · critical: 0 · axe execution errors: 0
             assertion failures: 0
             formsubmit mocked: 1 POST, 1 request intercepted — no email delivered
             result: PASS

npm audit --omit=optional --audit-level=high
  → exit 0   found 0 vulnerabilities

git diff --check
  → exit 0   (no whitespace errors; only pre-existing LF→CRLF autocrlf notices on stderr)
```

Architecture expectation confirmed after the patch:

```text
38/38 canonical pages      → dist/ar = 19 pages, dist/en = 19 pages, dist/sitemap.xml = 38 <loc> URLs
19 Arabic / 19 English     → confirmed
indexing closed            → dist/robots.txt = "User-agent: *" + "Disallow: /" (PRE-RELEASE)
EM_RELEASE_APPROVED unset  → confirmed (.env.production contains a comment only; shell env unset)
```

---

## G. Ancillary parity updates (required, minimal, non-weakening)

Two files outside `src/` had to stay in parity with the approved copy. Neither is a copy source, a component, or a gate-threshold change.

1. **`docs/approved-copy/elite_maison_editorial_copy_deck_v2.md` — 5 lines.**
   `npm run qa:copy` extracts every approved string from this deck and requires it to appear verbatim in `src/`. Leaving the superseded lines in place would have produced 5 exceptions and a FAIL. Only the corresponding approved AR/EN lines were updated:
   - L221 `home.capText` AR → new approved AR (the EN line 222 is untouched by owner decision)
   - L638 / L639 `sectors.selectTitle` AR / EN
   - L714 / L715 `cases.ctaText` AR / EN
   Result after update: 360 expected / 360 exact matches / 100% coverage.
   *Not* updated on purpose: `docs/ELITE_MAISON_TONE_ELEVATION_REPORT.md`, `docs/FINAL_COMPREHENSIVE_CORRECTIVE_AUDIT.md`, `docs/FINAL_TONE_CORRECTION_PATCH.md`, `docs/implementation-map.md`, `docs/PHASE2B_*.md`, `docs/PHASE3B_OWNER_DECISION_SHEET.md` — they quote the old strings as historical before/after evidence, and section 14 forbids rewriting historical audit documents.

2. **`scripts/qa-phase3b.mjs` — 1 line.**
   The ARCH-01 check asserts the *rendered* contextual link text, i.e. `<label>: <case display name>` (e.g. `حالة ذات صلة: Bin Ablan`). With the approved AR label change, the expected AR label had to be aligned or the gate would fail for a copy reason. Only the expected AR string changed:
   - `const RELATED_LABEL = { en: "Related case", ar: "قصة ذات صلة" };` → `{ en: "Related case", ar: "حالة ذات صلة" }`
   The EN expectation is unchanged because the EN label did not change. Assertion logic, strictness and coverage are untouched — the gate reports **190 passes, 0 failures**. No assertion was removed, relaxed, skipped or bypassed anywhere.

---

## H. Diff audit before finishing

```bash
git diff --check                          # exit 0
git diff --stat                           # 3 files changed, 26 insertions(+), 26 deletions(-)
git diff -- src/data/em.js                # inspected line by line (20 −/+ pairs, all approved strings)
git diff -- docs/approved-copy scripts    # inspected line by line (5 + 1 approved lines)
```

Proved from the diff:

- only approved copy/microcopy strings changed — 20 lines in `src/data/em.js` (14 I18N label lines + 6 copy-field lines), 5 deck lines, 1 QA expectation line;
- **no CSS changed** — no `*.css` file appears in the diff;
- **no component behaviour changed** — no `.tsx` file was touched;
- **no route / SEO / schema / server changes** — `src/lib/schema.ts`, `src/lib/seo.ts`, `src/lib/routes.ts`, `server.mjs`, `scripts/prerender*.mjs`, `scripts/verify-static.mjs`, `public/*` untouched;
- **no claims, metrics, client names, awards, markets, contact details, or FormSubmit logic changed**;
- **no release / indexing configuration changed** — `EM_RELEASE_APPROVED` still unset, `EM.CONFIG.publicationApproved` / `anonymizeCases` untouched, `robots.txt` still closed;
- `git status --porcelain` lists exactly the three intended modified files plus this new untracked report — nothing else.

Scratch evidence (gitignored, not part of the diff, not shipped): gate logs `tmp/g-*.log`, build log `tmp/build.log`, and the `dist` string-map verifier `tmp/map-render.mjs`.

---

## Source-of-truth contract note

`src/data/em.js` remains the single runtime content source. Every changed value is the value actually rendered (or, for `serviceNav` / `caseIndex`, the value actually exposed as the navigation accessible name) by the corresponding page/component, and both copies of each duplicated key (seed + later `Object.assign` override) were kept in parity.

---

```text
FINAL MICROCOPY TERMINOLOGY PATCH COMPLETE — COPY FREEZE RESTORED
```

Not performed: Humanizer, further copy audit, redesign, component refactor, CSS change, SEO change, sitemap change, robots change, schema change, FormSubmit change, commit, push, deploy, indexing activation.





