#!/usr/bin/env node
/**
 * Phase 3C.1 acceptance audit — GCC Market Entry Readiness insight.
 *
 * Runs against the prerendered `dist/` output and verifies exact approved
 * metadata, schema constraints, canonical/hreflang, link resolution, and
 * absence of superseded or legacy content.
 *
 * Usage: npm run qa:phase3c1   (run `npm run build` first)
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const DIST = join(ROOT, "dist");
const LANGS = ["en", "ar"];

const INSIGHT_ID = "gcc-market-entry-readiness";

const APPROVED = {
  headline: {
    ar: "السوق يفتح أبوابه. النجاح لا يفعل.",
    en: "The market opens. Success still has to be earned."
  },
  cta: {
    ar: "قبل دخول السوق، نصور لكم النتائج بمنطق الأرقام والخبرة.",
    en: "Before market entry, we bring the outcomes into focus through numbers and experience."
  },
  seoTitle: {
    ar: "الجاهزية التجارية لدخول أسواق الخليج | Elite Maison",
    en: "GCC Market Entry Readiness | Elite Maison"
  },
  metaDescription: {
    ar: "قبل دخول أسواق الخليج، اختبروا منطق العرض والطلب والقناة والثقة لتعرفوا إن كان قرار التوسع جاهزًا تجاريًا، لا تشغيليًا فقط.",
    en: "Before entering GCC markets, test the offer, demand, channel, and trust logic to see whether the expansion decision is commercially ready."
  },
  ogTitle: {
    ar: "السوق يفتح أبوابه. النجاح لا يفعل. | Elite Maison",
    en: "The Market Opens. Success Still Has to Be Earned. | Elite Maison"
  },
  ogDescription: {
    ar: "دخول السوق قرار تجاري قبل أن يكون خطوة تشغيلية. أربعة أسئلة تساعد على اختبار الجاهزية قبل الالتزام.",
    en: "Market entry is a commercial decision before it becomes an operational move. Four questions help test readiness before commitment."
  },
  author: "Elite Maison Organization",
  byline: { ar: "بقلم Elite Maison", en: "By Elite Maison" },
  canonical: {
    ar: "https://www.elitemaisonmarketing.com/ar/insights/gcc-market-entry-readiness",
    en: "https://www.elitemaisonmarketing.com/en/insights/gcc-market-entry-readiness"
  },
  binAblanName: "Bin Ablan",
  consultingLabel: {
    ar: "التوسع ودخول الأسواق",
    en: "Market Expansion & Entry"
  }
};

const SUPERSEDED = [
  "السوق جذاب. لكن هل أنتم جاهزون لدخوله؟",
  "The market is attractive. But are you ready to enter it?",
  "أسئلة الجاهزية قبل دخول سوق جديد",
  "Readiness questions before a new market"
];

const REMOVED_PHRASES = [
  "consulting.html#expansion"
];

let passes = 0;
let failures = 0;
const check = (label, condition) => {
  if (condition) passes += 1;
  else {
    failures += 1;
    console.log(`FAIL  ${label}`);
  }
};

const pagePath = (lang) => join(DIST, lang, "insights", INSIGHT_ID, "index.html");

const readPage = (lang, section, id) => {
  if (section && id) {
    const file = join(DIST, lang, section, id, "index.html");
    try {
      if (!statSync(file).isFile()) return null;
    } catch {
      return null;
    }
    return readFileSync(file, "utf8");
  }
  if (section && !id) {
    const file = join(DIST, lang, section, "index.html");
    try {
      if (!statSync(file).isFile()) return null;
    } catch {
      return null;
    }
    return readFileSync(file, "utf8");
  }
  const file = pagePath(lang);
  try {
    if (!statSync(file).isFile()) return null;
  } catch {
    return null;
  }
  return readFileSync(file, "utf8");
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

// Verify both locales exist
check("en page exists", !!readPage("en"));
check("ar page exists", !!readPage("ar"));

for (const lang of LANGS) {
  const html = readPage(lang);
  const scope = `insight ${INSIGHT_ID} (${lang})`;
  check(`${scope}: page exists`, !!html);
  if (!html) continue;

  const doc = jsonLd(html);
  const article = nodeOf(doc, "Article");

  // Exact approved headline
  check(`${scope}: approved headline`, html.includes(APPROVED.headline[lang]));

  // Exact approved CTA
  check(`${scope}: approved CTA`, html.includes(APPROVED.cta[lang]));

  // Exact SEO title
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  check(`${scope}: exact SEO title`, titleMatch && titleMatch[1].trim() === APPROVED.seoTitle[lang]);

  // Exact meta description
  check(`${scope}: exact meta description`, html.includes(`name="description" content="${APPROVED.metaDescription[lang]}"`));

  // Exact OG title
  check(`${scope}: exact OG title`, html.includes(`property="og:title" content="${APPROVED.ogTitle[lang]}"`));

  // Exact OG description
  check(`${scope}: exact OG description`, html.includes(`property="og:description" content="${APPROVED.ogDescription[lang]}"`));

  // Author = Organization, no Person
  check(`${scope}: author is Organization #org`, article?.author?.["@id"] === ORG_ID);
  check(`${scope}: no Person author`, !JSON.stringify(doc || {}).includes('"@type":"Person"'));

  // No dates
  check(`${scope}: no datePublished`, !("datePublished" in (article || {})));
  check(`${scope}: no dateModified`, !("dateModified" in (article || {})));
  check(`${scope}: no dateCreated`, !("dateCreated" in (article || {})));

  // No articleBody
  check(`${scope}: no articleBody`, !("articleBody" in (article || {})));

  // No sameAs
  check(`${scope}: no sameAs`, !("sameAs" in (nodeOf(doc, "Organization") || {})));

  // No SearchAction
  check(`${scope}: no SearchAction`, !JSON.stringify(doc || {}).includes("SearchAction"));

  // Correct canonical
  check(`${scope}: correct canonical`, html.includes(`rel="canonical" href="${APPROVED.canonical[lang]}"`));

  // Correct hreflang pair
  const otherLang = lang === "ar" ? "en" : "ar";
  check(`${scope}: hreflang ${lang}`, html.includes(`hreflang="${lang}"`));
  check(`${scope}: hreflang ${otherLang}`, html.includes(`hreflang="${otherLang}"`));
  check(`${scope}: hreflang x-default`, html.includes('hreflang="x-default"'));

  // Bin Ablan link resolves
  const binAblanHtml = readPage(lang, "cases", "bin-ablan");
  check(`${scope}: Bin Ablan link resolves`, !!binAblanHtml);

  // Consulting #expansion link resolves
  const consultingHtml = readPage(lang, "consulting");
  check(`${scope}: Consulting #expansion link resolves`, !!consultingHtml && consultingHtml.includes(`id="expansion"`));

    // Approved contact/inquiry behavior (URL-encoded in href: %3A for colon)
  check(`${scope}: approved contact CTA`, html.includes(`/contact?source=insight%3A${INSIGHT_ID}`));

  // Superseded headline absent
  for (const phrase of SUPERSEDED) {
    check(`${scope}: superseded headline absent`, !html.includes(phrase));
  }

  // Removed unsupported legacy phrases absent
  for (const phrase of REMOVED_PHRASES) {
    check(`${scope}: legacy phrase "${phrase}" absent`, !html.includes(phrase));
  }
}

console.log(`[qa:phase3c1] assertions: ${passes} passes, ${failures} failures`);
if (failures > 0) {
  console.log("[qa:phase3c1] FAIL — Phase 3C.1 decisions are not reflected in dist.");
  process.exit(1);
}
console.log("[qa:phase3c1] PASS — Phase 3C.1 decisions verified.");

