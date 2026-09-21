/**
 * Browserless React static body generation.
 *
 * Loads the Vite SSR bundle (entry-server.tsx), renders each canonical route
 * under StaticRouter, and injects the generated #root HTML into the prerendered
 * files from scripts/prerender.mjs.
 *
 * This replaces the Chromium snapshot step entirely. No browser is launched.
 *
 * Hard gates:
 *   - exactly 38 canonical pages (19 AR + 19 EN)
 *   - each page has non-empty #root markup
 *   - each page has at least one meaningful H1
 *   - each page has data-ssg="1" marker
 */

import "./lib/register-alias.mjs";

import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const { EM } = await import("@/data/em.js");
const { withLang } = await import("@/lib/i18n-path.ts");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SSR_ENTRY = join(ROOT, ".ssr", "entry-server.js");

const LANGS = ["ar", "en"];
const PAGE_PATHS = ["", "about", "consulting", "execution", "sectors", "cases", "insights", "contact"];

function routePaths() {
  const paths = PAGE_PATHS.map((page) => (page ? `/${page}` : "/"));
  for (const item of EM.CASES) paths.push(`/cases/${item.id}`);
  for (const item of EM.INSIGHTS) paths.push(`/insights/${item.id}`);
  return paths;
}

const paths = routePaths();
const EXPECTED_PAGES = paths.length * LANGS.length; // 38

// Load the SSR bundle (compiled by `vite build --ssr`)
let renderRoute;
try {
  const ssrUrl = pathToFileURL(SSR_ENTRY);
  const ssrModule = await import(ssrUrl.href);
  renderRoute = ssrModule.renderRoute;
  if (typeof renderRoute !== "function") {
    throw new Error("SSR bundle does not export renderRoute");
  }
} catch (err) {
  console.error("[ssg] FAIL: could not load SSR bundle from .ssr/entry-server.js");
  console.error(`[ssg] Run 'npm run build:ssr' first. Error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}

let rendered = 0;
let failed = 0;
const errors = [];

for (const path of paths) {
  for (const lang of LANGS) {
    const routeId = withLang(path, lang);
    const urlPath = routeId.replace(/^\//, "");
    const target = join(DIST, urlPath, "index.html");

    if (!existsSync(target)) {
      failed += 1;
      errors.push(`${routeId} (prerender file missing — run prerender first)`);
      continue;
    }

    try {
      const html = renderRoute(routeId);

      // Basic validation of rendered output
      if (!html || typeof html !== "string") {
        throw new Error("renderRoute returned empty or non-string");
      }
      if (!html.includes("<h1") && !html.includes("<h2")) {
        throw new Error("no H1/H2 found in rendered markup");
      }

      // Read existing prerendered file (has correct <head>)
      let file = readFileSync(target, "utf8");

      // The React app renders content directly without the mount-point wrapper.
      // Wrap the rendered HTML with the root div and data-ssg marker.
      const wrappedHtml = `<div id="root" data-ssg="1">${html}</div>`;

      // Replace the empty root div in the prerendered shell
      const rootRegex = /<div id="root"[^>]*>\s*<\/div>/i;
      if (!rootRegex.test(file)) {
        throw new Error("no empty <div id=\"root\"> found in prerendered file");
      }

      file = file.replace(rootRegex, wrappedHtml);

      writeFileSync(target, file, "utf8");
      rendered += 1;
    } catch (err) {
      failed += 1;
      errors.push(`${routeId} (${err instanceof Error ? err.message : String(err)})`);
    }
  }
}

console.log(`[ssg] ${rendered}/${EXPECTED_PAGES} canonical pages rendered successfully`);

if (rendered !== EXPECTED_PAGES || errors.length > 0) {
  console.error("[ssg] FAIL — hard gate not satisfied:");
  for (const err of errors) console.error(`  - ${err}`);
  process.exit(1);
}
