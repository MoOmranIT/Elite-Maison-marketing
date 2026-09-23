#!/usr/bin/env node
/**
 * Elite Maison — resilience + accessibility hardening gate (`npm run qa:harden`).
 *
 * Regression coverage for:
 *   - gold-filled controls use ink/navy focus outline (not gold-on-gold)
 *   - reveal content stays visible without JS / when observer init fails
 *   - reduced-motion users never receive hidden reveal content
 */

import { chromium } from "playwright";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const PORT = 4178;
const BASE = `http://127.0.0.1:${PORT}`;
const out = join(ROOT, ".qa");
mkdirSync(out, { recursive: true });

const HARDEN_ROUTES = [
  { path: "/ar", lang: "ar" },
  { path: "/en", lang: "en" },
  { path: "/ar/consulting", lang: "ar" },
  { path: "/en/consulting", lang: "en" },
  { path: "/ar/contact", lang: "ar" },
  { path: "/en/contact", lang: "en" }
];

const notes = [];
const failures = [];
let failCount = 0;

function note(line) { notes.push(line); }
function assert(condition, name, detail) {
  if (condition) return true;
  failCount += 1;
  const line = `FAIL ${name}${detail ? ` — ${detail}` : ""}`;
  failures.push(line);
  notes.push(line);
  return false;
}

function cssContract() {
  const siteCss = readFileSync(join(ROOT, "assets", "css", "site.css"), "utf8");
  const round4Css = readFileSync(join(ROOT, "assets", "css", "round4.css"), "utf8");

  assert(
    /\.btn--gold:focus-visible[\s\S]*?outline-color:\s*var\(--ink\)/.test(siteCss),
    "css-gold-btn-focus",
    "btn--gold:focus-visible must set outline-color: var(--ink)"
  );
  assert(
    /\.skip-link:focus-visible[\s\S]*?outline-color:\s*var\(--ink\)/.test(siteCss),
    "css-skip-link-focus",
    "skip-link:focus-visible must set outline-color: var(--ink)"
  );
  assert(
    /\.reveal-ready\s+\[data-reveal\]:not\(\.is-visible\)\s*\{\s*opacity:\s*0/.test(siteCss),
    "css-reveal-hide-ready",
    "reveal hide must require .reveal-ready"
  );
  assert(
    !/\.js\s+\[data-reveal\]:not\(\.is-visible\)\s*\{\s*opacity:\s*0/.test(siteCss),
    "css-no-js-hide",
    "must not hide [data-reveal] under .js alone"
  );
  assert(
    !/\.js\s+\[data-reveal="rise"\]\.is-visible/.test(round4Css),
    "css-round4-js-reveal",
    "round4 reveal animation must use .reveal-ready not .js"
  );
  assert(
    /\.reveal-ready\s+\[data-reveal="rise"\]\.is-visible/.test(round4Css),
    "css-round4-ready-reveal",
    "round4 must animate rise under .reveal-ready"
  );

  note("CSS contract checks complete");
}

async function waitForServer() {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${BASE}/en`);
      if (res.status > 0) return;
    } catch { /* starting */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Node production server did not start on ${BASE}`);
}

function parseRgb(color) {
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function colorDistance(a, b) {
  if (!a || !b) return Infinity;
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

async function focusVisible(page, selector, label) {
  const el = page.locator(selector).first();
  await el.waitFor({ state: "visible", timeout: 15000 });
  await el.focus();
  const colors = await el.evaluate((node) => {
    const cs = getComputedStyle(node);
    return {
      outlineColor: cs.outlineColor,
      outlineWidth: cs.outlineWidth,
      outlineStyle: cs.outlineStyle,
      backgroundColor: cs.backgroundColor
    };
  });

  assert(
    colors.outlineStyle !== "none" && parseFloat(colors.outlineWidth) >= 1.5,
    `focus-outline-visible ${label}`,
    `outline=${colors.outlineStyle} ${colors.outlineWidth}`
  );

  note(`FOCUS ${label} outline=${colors.outlineColor} width=${colors.outlineWidth}`);
}

async function focusContrast(page, selector, label) {
  const el = page.locator(selector).first();
  await el.waitFor({ state: "visible", timeout: 15000 });
  await el.focus();
  const colors = await el.evaluate((node) => {
    const cs = getComputedStyle(node);
    return {
      outlineColor: cs.outlineColor,
      outlineWidth: cs.outlineWidth,
      outlineStyle: cs.outlineStyle,
      backgroundColor: cs.backgroundColor
    };
  });

  assert(
    colors.outlineStyle !== "none" && parseFloat(colors.outlineWidth) >= 1.5,
    `focus-outline-visible ${label}`,
    `outline=${colors.outlineStyle} ${colors.outlineWidth}`
  );

  const outlineRgb = parseRgb(colors.outlineColor);
  const bgRgb = parseRgb(colors.backgroundColor);
  const dist = colorDistance(outlineRgb, bgRgb);
  assert(dist > 35, `focus-contrast ${label}`, `outline=${colors.outlineColor} bg=${colors.backgroundColor} dist=${dist.toFixed(1)}`);

  note(`FOCUS ${label} outline=${colors.outlineColor} bg=${colors.backgroundColor} dist=${dist.toFixed(1)}`);
}

async function hiddenRevealCount(page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    return [...document.querySelectorAll("[data-reveal]")].filter((el) => {
      const style = window.getComputedStyle(el);
      const opacity = parseFloat(style.opacity);
      return opacity < 0.5 || style.visibility === "hidden";
    }).map((el) => ({
      tag: el.tagName,
      reveal: el.getAttribute("data-reveal"),
      opacity: window.getComputedStyle(el).opacity,
      ready: root.classList.contains("reveal-ready")
    }));
  });
}

async function main() {
  cssContract();

  assert(existsSync(join(ROOT, "dist", "index.html")), "dist/ exists", "run npm run build first");

  let server = null;
  try {
    server = spawn(process.execPath, [join(ROOT, "server.mjs")], {
      cwd: ROOT,
      env: { ...process.env, PORT: String(PORT) },
      stdio: "inherit",
      shell: false
    });

    await waitForServer();
    note(`SERVER production Node server running on ${BASE}`);

    let browser;
    try {
      browser = await chromium.launch();
    } catch (err) {
      console.error("[qa:harden] FAIL: no browser available.");
      console.error(err instanceof Error ? err.message : String(err));
      process.exitCode = 1;
      return;
    }

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${BASE}/en`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector("main", { timeout: 20000 });
    await page.waitForTimeout(600);

    await focusContrast(page, ".skip-link", "skip-link");
    await focusContrast(page, ".hero-actions .btn--gold, main .btn--gold", "home-primary-cta");
    await focusVisible(page, ".hero-actions .go", "home-secondary-cta");
    await focusVisible(page, ".nav__primary .door, .nav__primary a", "header-nav");
    await focusVisible(page, ".lang-switch", "lang-switch");
    await focusVisible(page, "footer .footer-meta__link, footer a", "footer-link");

    await page.goto(`${BASE}/en/contact`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector('button.btn--gold[type="submit"]', { timeout: 20000 });
    await focusContrast(page, 'button.btn--gold[type="submit"]', "contact-submit");
    await focusVisible(page, "#name", "contact-name");
    await focusVisible(page, "#email", "contact-email");
    await focusVisible(page, "#message", "contact-message");

    const ioFailContext = await browser.newContext();
    await ioFailContext.addInitScript(() => {
      delete window.IntersectionObserver;
    });
    const ioPage = await ioFailContext.newPage();
    await ioPage.goto(`${BASE}/en/consulting`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await ioPage.waitForSelector("main", { timeout: 20000 });
    await ioPage.waitForTimeout(700);
    const ioHidden = await hiddenRevealCount(ioPage);
    assert(ioHidden.length === 0, "reveal-io-missing", `${ioHidden.length} hidden nodes`);
    const ioReady = await ioPage.evaluate(() => document.documentElement.classList.contains("reveal-ready"));
    assert(!ioReady, "reveal-io-missing-ready", "reveal-ready must not be set when IO is unavailable");
    note(`REVEAL io-missing hidden=${ioHidden.length} reveal-ready=${ioReady}`);

    const reducedContext = await browser.newContext({ reducedMotion: "reduce" });
    const reducedPage = await reducedContext.newPage();
    await reducedPage.goto(`${BASE}/ar`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await reducedPage.waitForSelector("main", { timeout: 20000 });
    await reducedPage.waitForTimeout(700);
    const reducedHidden = await hiddenRevealCount(reducedPage);
    assert(reducedHidden.length === 0, "reveal-reduced-motion", `${reducedHidden.length} hidden nodes`);
    note(`REVEAL reduced-motion hidden=${reducedHidden.length}`);

    const throwContext = await browser.newContext();
    await throwContext.addInitScript(() => {
      window.IntersectionObserver = class {
        constructor() { throw new Error("qa:harden forced observer failure"); }
      };
    });
    const throwPage = await throwContext.newPage();
    await throwPage.goto(`${BASE}/ar/contact`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await throwPage.waitForSelector("main", { timeout: 20000 });
    await throwPage.waitForTimeout(700);
    const throwHidden = await hiddenRevealCount(throwPage);
    assert(throwHidden.length === 0, "reveal-observer-throw", `${throwHidden.length} hidden nodes`);
    note(`REVEAL observer-throw hidden=${throwHidden.length}`);

    const noJsContext = await browser.newContext({ javaScriptEnabled: false });
    const noJsPage = await noJsContext.newPage();
    for (const route of HARDEN_ROUTES) {
      await noJsPage.goto(`${BASE}${route.path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
      await noJsPage.waitForSelector("main", { timeout: 20000 });
      const stuck = await noJsPage.evaluate(() =>
        [...document.querySelectorAll("[data-reveal]")].filter((el) => {
          const style = window.getComputedStyle(el);
          return parseFloat(style.opacity) < 0.5;
        }).length
      );
      assert(stuck === 0, `nojs-reveal ${route.path}`, `${stuck} nodes at opacity<0.5`);
      note(`NOJS-REVEAL ${route.path} stuck=${stuck}`);
    }

    await browser.close();
  } catch (err) {
    assert(false, "harden-runtime", err instanceof Error ? err.message : String(err));
  } finally {
    if (server) server.kill();
  }

  note("");
  note("==== HARDEN SUMMARY ====");
  note(`assertion failures  : ${failCount}`);
  if (failures.length) {
    note("---- FAILURES ----");
    for (const line of failures) note(line);
  }
  note(`result              : ${failCount === 0 ? "PASS" : "FAIL"}`);

  writeFileSync(join(out, "harden-notes.txt"), notes.join("\n") + "\n");
  console.log(notes.join("\n"));

  if (failCount > 0) {
    console.error(`\n[qa:harden] FAIL — ${failCount} assertion failure(s). See .qa/harden-notes.txt`);
    process.exitCode = 1;
  } else {
    console.log("\n[qa:harden] PASS — hardening regressions covered.");
  }
}

main();
