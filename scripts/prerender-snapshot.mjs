/**
 * Snapshot prerender — full crawlable body HTML (Phase 5, §37).
 *
 * scripts/prerender.mjs writes per-route <head> (title/meta/JSON-LD) but the
 * body stays an empty `#root` shell until React boots. Crawlers and readers
 * without JavaScript therefore see no H1, no copy and no links.
 *
 * This script snapshots the real client-rendered DOM (headless Chromium over
 * `vite preview`, which serves the per-route files) and injects `#root`
 * innerHTML back into each dist file. Markup parity is guaranteed by
 * construction: it IS the client markup, not a re-implementation.
 *
 * It also enforces prerender/runtime consistency (§38): the runtime
 * <title>, canonical and JSON-LD must equal the prerendered head values.
 * Any drift fails the build loudly instead of shipping divergence.
 *
 * A browser is required for release-quality snapshots. Missing browser binaries
 * fail the build so a head-only shell cannot be published accidentally.
 */
import "./lib/register-alias.mjs";

import { spawn } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const { EM } = await import("@/data/em.js");
const { withLang } = await import("@/lib/i18n-path.ts");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const PORT = Number(process.env.SNAPSHOT_PORT || 4174);
const BASE = `http://127.0.0.1:${PORT}`;
const LANGS = ["ar", "en"];
const PAGE_PATHS = ["", "about", "consulting", "execution", "sectors", "cases", "insights", "contact"];

function routePaths() {
  const paths = PAGE_PATHS.map((page) => (page ? `/${page}` : "/"));
  for (const item of EM.CASES) paths.push(`/cases/${item.id}`);
  for (const item of EM.INSIGHTS) paths.push(`/insights/${item.id}`);
  return paths;
}

async function launchBrowser() {
  const { chromium } = await import("playwright");
  const attempts = [
    () => chromium.launch({ channel: "chrome" }),
    () => chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" }),
    () => chromium.launch()
  ];
  let last;
  for (const fn of attempts) {
    try {
      return await fn();
    } catch (err) {
      last = err;
    }
  }
  throw last;
}

function startPreview() {
  const child = spawn("node", ["node_modules/vite/bin/vite.js", "preview", "--host", "127.0.0.1", "--port", String(PORT), "--strictPort"], {
    cwd: ROOT,
    stdio: "ignore",
    shell: false
  });
  return child;
}

async function waitForPreview() {
  const deadline = Date.now() + 30000;
  for (;;) {
    try {
      const res = await fetch(`${BASE}/`);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    if (Date.now() > deadline) throw new Error("preview server did not start in 30s");
    await new Promise((r) => setTimeout(r, 500));
  }
}

async function snapshotPage(page, path, lang) {
  const url = `${BASE}${withLang(path, lang)}`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector("main h1, main", { timeout: 15000 });
  // Drive every scroll-triggered reveal/observer to its finished state so the
  // static HTML shows content instead of animation initial states.
  await page.evaluate(async () => {
    const step = Math.max(320, window.innerHeight * 0.7);
    const top = window.scrollY;
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    await new Promise((r) => setTimeout(r, 500));
    window.scrollTo(0, top);
  });
  await page.waitForTimeout(250);
  return page.evaluate(() => ({
    root: document.getElementById("root")?.innerHTML || "",
    title: document.title,
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "",
    jsonld: document.getElementById("em-jsonld")?.textContent || "",
    h1: document.querySelectorAll("main h1").length,
    links: document.querySelectorAll('main a[href]').length
  }));
}

function readFileHead(file) {
  const html = readFileSync(file, "utf8");
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "";
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1] || "";
  const jsonld = html.match(/<script type="application\/ld\+json" id="em-jsonld">([\s\S]*?)<\/script>/i)?.[1] || "";
  return { html, title, canonical, jsonld };
}

function unescapeHtml(value) {
  return String(value).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

// The file stores JSON-LD with <, >, & unicode-escaped (valid JSON escapes);
// the runtime DOM holds the raw text. Compare canonical parsed form.
function sameJson(a, b) {
  try {
    return JSON.stringify(JSON.parse(a)) === JSON.stringify(JSON.parse(b));
  } catch {
    return a === b;
  }
}

let browser;
try {
  browser = await launchBrowser();
} catch (error) {
  console.error("[snapshot] FAIL: no browser available; Chromium/Chrome is required for release snapshots.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

const preview = startPreview();
const drifts = [];
const stats = { pages: 0, h1Missing: [], thinLinks: [], routeMismatch: [], bodyMismatch: [] };
try {
  await waitForPreview();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  // Fonts don't affect captured HTML; abort them for speed/determinism.
  await page.route(/fonts\.googleapis\.com|fonts\.gstatic\.com/, (route) => route.abort());

  for (const path of routePaths()) {
    for (const lang of LANGS) {
      const file = join(DIST, withLang(path, lang).replace(/^\//, ""), "index.html");
      const snap = await snapshotPage(page, path, lang);
      const fileHead = readFileHead(file);
      if (!snap.root || snap.h1 < 1) {
        stats.h1Missing.push(`${withLang(path, lang)}`);
        continue;
      }
      if (snap.links < 3) stats.thinLinks.push(`${withLang(path, lang)}:${snap.links}`);
      if (snap.title !== unescapeHtml(fileHead.title)) drifts.push(`title ${withLang(path, lang)}`);
      if (snap.canonical !== fileHead.canonical) drifts.push(`canonical ${withLang(path, lang)}`);
      if (!sameJson(snap.jsonld, fileHead.jsonld)) drifts.push(`jsonld ${withLang(path, lang)}`);
      const next = fileHead.html.replace(
        /<div id="root"[^>]*>[\s\S]*?<\/div>/,
        () => `<div id="root" data-ssg="1">${snap.root}</div>`
      );
      if (next === fileHead.html) {
        drifts.push(`root-mount ${withLang(path, lang)}`);
        continue;
      }
      writeFileSync(file, next, "utf8");
      stats.pages += 1;
    }
  }
  await context.close();
} finally {
  await browser.close().catch(() => undefined);
  preview.kill();
}

console.log(`[snapshot] ${stats.pages} pages snapshotted with rendered body HTML`);
if (stats.h1Missing.length) console.warn(`[snapshot] WARNING: no H1 captured: ${stats.h1Missing.join(", ")}`);
if (stats.thinLinks.length) console.warn(`[snapshot] WARNING: thin internal links: ${stats.thinLinks.join(", ")}`);
if (drifts.length) {
  console.error(`[snapshot] FAIL: prerender/runtime drift detected:\n  - ${drifts.join("\n  - ")}`);
  process.exit(1);
}
console.log("[snapshot] OK: runtime head matches prerendered head on all pages (no drift)");
