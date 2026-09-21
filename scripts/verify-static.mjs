/**
 * Browserless static output verification.
 *
 * After prerender + SSG, verifies all 38 canonical pages without launching
 * a browser. Checks file existence, root markup, H1, lang/dir, SEO head,
 * JSON-LD, links, and absence of Google Fonts origins.
 */

import "./lib/register-alias.mjs";

import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const { EM } = await import("@/data/em.js");
const { withLang } = await import("@/lib/i18n-path.ts");
const { buildSeo } = await import("@/lib/seo.ts");
const { buildJsonLd } = await import("@/lib/schema.ts");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const LANGS = ["ar", "en"];
const PAGE_PATHS = ["", "about", "consulting", "execution", "sectors", "cases", "insights", "contact"];

function routePaths() {
  const paths = PAGE_PATHS.map((page) => (page ? `/${page}` : "/"));
  for (const item of EM.CASES) paths.push(`/cases/${item.id}`);
  for (const item of EM.INSIGHTS) paths.push(`/insights/${item.id}`);
  return paths;
}

const paths = routePaths();
const EXPECTED_PAGES = paths.length * LANGS.length;

const errors = [];
let checked = 0;

for (const path of paths) {
  for (const lang of LANGS) {
    const routeId = withLang(path, lang);
    const urlPath = routeId.replace(/^\//, "");
    const target = join(DIST, urlPath, "index.html");

    checked += 1;

    if (!existsSync(target)) {
      errors.push(`${routeId}: file missing`);
      continue;
    }

    const html = readFileSync(target, "utf8");

    // Root exists and is non-empty
    const rootMatch = html.match(/<div id="root"[^>]*>([\s\S]*?)<\/div>/);
    if (!rootMatch) {
      errors.push(`${routeId}: no #root div`);
      continue;
    }
    const rootContent = rootMatch[1].trim();
    if (!rootContent) {
      errors.push(`${routeId}: empty #root`);
      continue;
    }

    // data-ssg marker
    if (!rootMatch[0].includes('data-ssg="1"')) {
      errors.push(`${routeId}: missing data-ssg="1"`);
    }

    // H1 presence
    const h1Count = (html.match(/<h1[^>]*>/g) || []).length;
    if (h1Count < 1) {
      errors.push(`${routeId}: no H1`);
    }

    // lang/dir
    const langMatch = html.match(/<html[^>]*lang="([^"]*)"[^>]*>/);
    const dirMatch = html.match(/<html[^>]*dir="([^"]*)"[^>]*>/);
    if (!langMatch || langMatch[1] !== lang) {
      errors.push(`${routeId}: wrong <html lang> (expected ${lang}, got ${langMatch?.[1] || "missing"})`);
    }
    const expectedDir = lang === "ar" ? "rtl" : "ltr";
    if (!dirMatch || dirMatch[1] !== expectedDir) {
      errors.push(`${routeId}: wrong <html dir> (expected ${expectedDir}, got ${dirMatch?.[1] || "missing"})`);
    }

    // Title
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      errors.push(`${routeId}: missing <title>`);
    }

    // Description
    if (!html.includes('name="description"')) {
      errors.push(`${routeId}: missing meta[name=description]`);
    }

    // Canonical
    if (!html.includes('rel="canonical"')) {
      errors.push(`${routeId}: missing canonical link`);
    }

    // Hreflang
    if (!html.includes('hreflang="ar"') || !html.includes('hreflang="en"')) {
      errors.push(`${routeId}: missing hreflang alternates`);
    }

    // x-default hreflang
    if (!html.includes('hreflang="x-default"')) {
      errors.push(`${routeId}: missing x-default hreflang`);
    }

    // JSON-LD valid JSON
    const jsonLdMatch = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
    if (!jsonLdMatch) {
      errors.push(`${routeId}: missing JSON-LD`);
    } else {
      try {
        JSON.parse(jsonLdMatch[1].trim());
      } catch {
        errors.push(`${routeId}: invalid JSON-LD`);
      }
    }

    // Main content has links
    if (!html.includes("<main") || !html.includes("<a href")) {
      errors.push(`${routeId}: missing main content or links`);
    }

    // No Google Fonts origins
    if (html.includes("fonts.googleapis.com") || html.includes("fonts.gstatic.com")) {
      errors.push(`${routeId}: contains Google Fonts origin`);
    }

    // No duplicate root
    const rootCount = (html.match(/<div id="root"/g) || []).length;
    if (rootCount !== 1) {
      errors.push(`${routeId}: ${rootCount} #root divs (expected 1)`);
    }
  }
}

console.log(`[verify:ssg] checked ${checked}/${EXPECTED_PAGES} pages`);

if (checked !== EXPECTED_PAGES) {
  errors.push(`checked ${checked} pages, expected ${EXPECTED_PAGES}`);
}

if (errors.length > 0) {
  console.error("[verify:ssg] FAIL — verification errors:");
  for (const err of errors) console.error(`  - ${err}`);
  process.exit(1);
}

console.log("[verify:ssg] PASS — all 38 canonical pages verified (browserless)");
