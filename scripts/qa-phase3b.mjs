#!/usr/bin/env node
/**
 * Phase 3B acceptance audit — schema, attribution and contextual link decisions.
 *
 * Runs against the prerendered `dist/` output and verifies that every Phase 3B
 * owner decision is implemented exactly as decided in
 * `docs/PHASE3B_OWNER_DECISION_SHEET.md`, and that every deferred or rejected
 * change is still absent:
 *
 *   SEO-02  Organization author on Article (insights) and CreativeWork (cases)
 *   AEO-02  Institutional byline on insights only — no byline on cases
 *   ARCH-01 Contextual insight -> case link, resolving to a real case page
 *   SEO-01 / AEO-01 / SCH-02  No dates (datePublished, dateModified, dateCreated)
 *   SCH-03  No articleBody
 *   SEO-03  No sameAs
 *   SCH-01  No SearchAction
 *
 * Usage: npm run qa:phase3b   (run `npm run build` first)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const DIST = join(ROOT, "dist");
const LANGS = ["en", "ar"];

/** Expected related case display name per insight id; null = no contextual case link. */
const RELATED_CASE = {
  "growth-guide": { slug: "bloom", name: "Bloom / Perfect Foodstuff" },
  "sales-article": { slug: "attractive-smile", name: "Attractive Smile Medical Center" },
  "expansion-brief": { slug: "bin-ablan", name: "Bin Ablan" },
  "gcc-market-entry-readiness": { slug: "bin-ablan", name: "Bin Ablan" },
  "ai-insight": { slug: "ai-brains", name: "AI Brains — AI Solutions" },
  "cx-check": null
};

let passes = 0;
let failures = 0;
const check = (label, condition) => {
  if (condition) passes += 1;
  else {
    failures += 1;
    console.log(`FAIL  ${label}`);
  }
};

const pagePath = (lang, section, id) => join(DIST, lang, section, id, "index.html");

const readPage = (lang, section, id) => {
  const file = pagePath(lang, section, id);
  try {
    if (!statSync(file).isFile()) return null;
  } catch {
    return null;
  }
  return readFileSync(file, "utf8");
};

const entries = (lang, section) => {
  try {
    return readdirSync(join(DIST, lang, section), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
  } catch {
    return [];
  }
};

const jsonLd = (html) => {
  const marker = html.indexOf('id="em-jsonld"');
  if (marker === -1) return null;
  const body = html.indexOf(">", marker) + 1;
  const end = html.indexOf("</script>", body);
  if (end === -1) return null;
  try {
    return JSON.parse(html.slice(body, end));
  } catch {
    return null;
  }
};

const nodeOf = (doc, type) => (doc?.["@graph"] || []).find((node) => node["@type"] === type) || null;

const ORG_ID = "https://www.elitemaisonmarketing.com/#org";
const BYLINE = { en: "By Elite Maison", ar: "بقلم Elite Maison" };
const RELATED_LABEL = { en: "Related case", ar: "قصة ذات صلة" };

const insightIds = entries("en", "insights");
const caseIds = entries("en", "cases");

check("prerendered insights discovered", insightIds.length > 0);
check("prerendered cases discovered", caseIds.length > 0);
for (const id of insightIds) {
  check(`expectation map covers insight ${id}`, Object.prototype.hasOwnProperty.call(RELATED_CASE, id));
}

for (const lang of LANGS) {
  check(`case tree exists (${lang})`, caseIds.every((id) => !!readPage(lang, "cases", id)));

  for (const id of insightIds) {
    const scope = `insight ${id} (${lang})`;
    const html = readPage(lang, "insights", id);
    check(`${scope}: page exists`, !!html);
    if (!html) continue;

    const doc = jsonLd(html);
    const article = nodeOf(doc, "Article");

    check(`${scope}: Article schema present`, !!article);
    check(`${scope}: Article author is Organization #org`, article?.author?.["@id"] === ORG_ID);
    check(`${scope}: no datePublished`, !("datePublished" in (article || {})));
    check(`${scope}: no dateModified`, !("dateModified" in (article || {})));
    check(`${scope}: no articleBody`, !("articleBody" in (article || {})));
    check(`${scope}: no SearchAction`, !JSON.stringify(doc || {}).includes("SearchAction"));
    check(`${scope}: no sameAs`, !("sameAs" in (nodeOf(doc, "Organization") || {})));
    check(`${scope}: institutional byline rendered`, html.includes(BYLINE[lang]));

    const expected = RELATED_CASE[id];
    if (expected === null) {
      check(`${scope}: no related case link`, !html.includes(RELATED_LABEL[lang]));
    } else {
      check(`${scope}: related case link rendered`, html.includes(`${RELATED_LABEL[lang]}: ${expected.name}`));
      check(`${scope}: related case target exists`, !!readPage(lang, "cases", expected.slug));
    }
  }

  for (const id of caseIds) {
    const scope = `case ${id} (${lang})`;
    const html = readPage(lang, "cases", id);
    check(`${scope}: page exists`, !!html);
    if (!html) continue;

    const doc = jsonLd(html);
    const work = nodeOf(doc, "CreativeWork");

    check(`${scope}: CreativeWork schema present`, !!work);
    check(`${scope}: CreativeWork author is Organization #org`, work?.author?.["@id"] === ORG_ID);
    check(`${scope}: no dateCreated`, !("dateCreated" in (work || {})));
    check(`${scope}: no author byline`, !html.includes(BYLINE[lang]));
  }
}

console.log("[qa:phase3b] insights audited : " + insightIds.length + " (EN + AR)");
console.log("[qa:phase3b] cases audited    : " + caseIds.length + " (EN + AR)");
console.log("[qa:phase3b] assertions       : " + passes + " passes, " + failures + " failures");
if (failures > 0) {
  console.log("[qa:phase3b] FAIL — Phase 3B decisions are not reflected in dist.");
  process.exit(1);
}
console.log("[qa:phase3b] PASS — Phase 3B decisions verified (SEO-02, AEO-02, ARCH-01; deferrals honoured).");
