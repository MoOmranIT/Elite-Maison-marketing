#!/usr/bin/env node
/**
 * Elite Maison — browser QA gate (`npm run qa`).
 *
 * This is a hard gate: the process exits non-zero when any of these happens.
 *
 *   - Playwright flow/runtime failure
 *   - page navigation failure
 *   - uncaught page error (window `pageerror`)
 *   - unexpected browser `console.error` (see CONSOLE_ALLOW_LIST — narrow, documented)
 *   - real horizontal page overflow
 *   - axe-core cannot load
 *   - axe execution returns an error
 *   - any serious/critical axe violation (narrow documented exceptions: AXE_EXCEPTIONS)
 *   - an expected route/page/H1 cannot be loaded
 *   - any assertion explicitly recorded through `assert()`
 *
 * Evidence is written to `.qa/notes.txt`; the exit code is what a release
 * aggregate must trust.
 *
 * FormSubmit: the AJAX endpoint is intercepted and answered locally, so browser
 * QA never delivers a real email. `src/data/em.js` keeps the real endpoint.
 *
 * Run against a local server first (`npm run dev` on 5173, or QA_BASE pointing
 * at `npm run preview` on 4173).
 */
import { chromium } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const BASE = process.env.QA_BASE && /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?\/?$/.test(process.env.QA_BASE)
  ? process.env.QA_BASE.replace(/\/$/, "")
  : "http://127.0.0.1:5173";
const out = join(process.cwd(), ".qa");
mkdirSync(out, { recursive: true });

/* ------------------------------------------------------------- coverage sets */

/** Required axe coverage — English canonical routes. */
const EN_ROUTES = [
  "/en",
  "/en/about",
  "/en/consulting",
  "/en/execution",
  "/en/sectors",
  "/en/cases",
  "/en/cases/patchouli",
  "/en/cases/ai-brains",
  "/en/insights",
  "/en/insights/gcc-market-entry-readiness",
  "/en/contact"
];

/** Required axe coverage — Arabic canonical routes. */
const AR_ROUTES = [
  "/ar",
  "/ar/about",
  "/ar/consulting",
  "/ar/execution",
  "/ar/sectors",
  "/ar/cases",
  "/ar/cases/ai-brains",
  "/ar/insights",
  "/ar/insights/gcc-market-entry-readiness",
  "/ar/contact"
];

const ROUTES = [
  ...EN_ROUTES.map((path) => ({ path, lang: "en" })),
  ...AR_ROUTES.map((path) => ({ path, lang: "ar" }))
];

/** Routes exercised for overflow screenshots across all viewports. */
const OVERFLOW_ROUTES = ["/", ...ROUTES.map((route) => route.path)];

/** Legacy `.html` entry points must land on the canonical localized route. */
const LEGACY_ALIASES = [
  { from: "/", expect: "/en" },
  { from: "/about.html", expect: "/en/about" },
  { from: "/consulting.html", expect: "/en/consulting" },
  { from: "/case.html?id=patchouli", expect: "/en/cases/patchouli" },
  { from: "/insight.html?id=gcc-market-entry-readiness", expect: "/en/insights/gcc-market-entry-readiness" }
];

/** Anchor targets the site actually renders; anything else is a broken hash link. */
const KNOWN_HASHES = [
  "#main",
  "#growth",
  "#sales",
  "#expansion",
  "#product",
  "#franchise",
  "#private-label",
  "#journey",
  "#executive",
  "#healthcare",
  "#fmcg",
  "#hospitality",
  "#retail",
  "#ecommerce",
  "#education",
  "#performance",
  "#campaigns",
  "#systems",
  "#automation",
  "#branding",
  "#activation"
];

const viewports = [
  { name: "1440", width: 1440, height: 900 },
  { name: "1024", width: 1024, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "390", width: 390, height: 844 }
];

/* ------------------------------------------------------- failure accounting */

const notes = [];
const failures = [];
let failCount = 0;

function note(line) {
  notes.push(line);
}

function assert(condition, name, detail) {
  if (condition) return true;
  failCount += 1;
  const line = `FAIL ${name}${detail ? ` — ${detail}` : ""}`;
  failures.push(line);
  notes.push(line);
  return false;
}

/**
 * Narrow, explicit allow-list for browser console errors.
 *
 * Only messages the browser itself emits for a settled observer layout belong
 * here. Anything else fails the gate — arbitrary console errors are never
 * suppressed to make QA pass.
 */
const CONSOLE_ALLOW_LIST = [
  /ResizeObserver loop (limit exceeded|completed with undelivered notifications)/
];

function consoleAllowed(text) {
  return CONSOLE_ALLOW_LIST.some((pattern) => pattern.test(text));
}

/**
 * Owner-approved axe exceptions — narrow, documented, single-selector.
 *
 * 2026-09-24 — Homepage hero outcome line ("نمو محقق" / "Achieved growth") is
 * rendered in brand gold `--gold` (#D9A537) by explicit owner decision. Its
 * contrast on the light hero background is ≈1.6:1 — below WCAG AA — so axe
 * color-contrast flags it. The exception is limited to this selector and to
 * the color-contrast rule; every other axe check stays fully enforced.
 */
const AXE_EXCEPTIONS = [
  {
    rule: "color-contrast",
    selector: ".hero__ink--outcome",
    reason: "owner-approved brand gold on the homepage hero outcome line"
  }
];

/* ---------------------------------------------------------------- axe engine */

const AXE_SCRIPT = `() => new Promise((resolve) => {
  if (typeof window.axe === 'undefined' || typeof window.axe.run !== 'function') {
    resolve({ violations: [], error: 'axe-core not present after injection' });
    return;
  }
  window.axe.run(document, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
    rules: { "color-contrast": { enabled: true } }
  })
    .then((res) => resolve({ violations: res.violations || [] }))
    .catch((err) => resolve({ violations: [], error: err && err.message ? err.message : String(err) }));
})`;

const axeResults = [];
let axeExecutionErrors = 0;
let axeExcludedNodes = 0;

async function runAxe(page, path, lang) {
  try {
    await page.addScriptTag({ path: require.resolve("axe-core") });
  } catch (err) {
    axeExecutionErrors += 1;
    axeResults.push({ path, lang, violations: 0, serious: 0, critical: 0, error: `load: ${err.message}` });
    assert(false, `axe-load ${path}`, `load: ${err.message}`);
    return;
  }
  const result = await page.evaluate(AXE_SCRIPT);
  if (result?.error) {
    axeExecutionErrors += 1;
    axeResults.push({ path, lang, violations: 0, serious: 0, critical: 0, error: `run: ${result.error}` });
    assert(false, `axe-run ${path}`, `run: ${result.error}`);
    return;
  }
  const raw = result?.violations || [];
  const violations = [];
  let excludedNodes = 0;
  for (const violation of raw) {
    const exception = AXE_EXCEPTIONS.find((entry) => entry.rule === violation.id);
    if (!exception) {
      violations.push(violation);
      continue;
    }
    const nodes = (violation.nodes || []).filter((node) => {
      const target = Array.isArray(node.target) ? node.target.join(" ") : String(node.target || "");
      const excluded = target.includes(exception.selector);
      if (excluded) excludedNodes += 1;
      return !excluded;
    });
    if (nodes.length) violations.push({ ...violation, nodes });
    else note(`AXE-EXCEPTION ${path} (${lang}) ${violation.id} — ${(violation.nodes || []).length} node(s) excluded at ${exception.selector} (${exception.reason})`);
  }
  axeExcludedNodes += excludedNodes;
  const serious = violations.filter((v) => v.impact === "serious");
  const critical = violations.filter((v) => v.impact === "critical");
  axeResults.push({ path, lang, violations: violations.length, serious: serious.length, critical: critical.length, error: null });
  note(`AXE ${path} (${lang}) violations=${violations.length} serious=${serious.length} critical=${critical.length}${excludedNodes ? ` exceptions=${excludedNodes}` : ""}`);
  for (const v of [...critical, ...serious].slice(0, 5)) {
    note(`AXE ${path} (${lang}) ${v.id}: ${v.impact} — ${v.nodes.length} nodes`);
  }
  assert(
    serious.length === 0 && critical.length === 0,
    `axe-serious-critical ${path}`,
    [...critical, ...serious].slice(0, 5).map((v) => `${v.id}:${v.impact}`).join(",") || "none"
  );
}
/* ------------------------------------------------------------ page helpers */

async function open(page, path) {
  const res = await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("main h1", { timeout: 20000 });
  return res;
}

function overflowCheck() {
  return [...document.querySelectorAll("body *")]
    .filter((el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 2)
    .filter((el) => !el.closest(".book, .book__strip"))
    .slice(0, 8)
    .map((el) => el.tagName + "." + String(el.className).split(" ")[0]);
}

function brokenHashes() {
  const allowed = ["#main", ...KNOWN_HASHES.filter((h) => h !== "#main")];
  return [...document.querySelectorAll("a[href^='#']")]
    .map((a) => a.getAttribute("href") || "")
    .filter((href) => href !== "#" && !href.startsWith("#challenge") && !allowed.includes(href));
}

/* --------------------------------------------------------------- test target */

let base = BASE;
let server = null;

async function reachable(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(1500) });
    return res.status < 500;
  } catch {
    return false;
  }
}

/**
 * Resolve the server under test without assuming the caller started one:
 * explicit QA_BASE, then start the real production Node server on a
 * dedicated QA port.
 */
async function resolveTarget() {
  if (process.env.QA_BASE) return { base: BASE, label: "QA_BASE" };
  const QA_PORT = Number(process.env.QA_PORT || 4183);
  const url = `http://127.0.0.1:${QA_PORT}`;
  if (!existsSync(join(process.cwd(), "dist", "index.html"))) {
    console.error("[qa] FAIL: no dist/ build. Run `npm run build` first.");
    process.exit(1);
  }
  server = spawn(process.execPath, ["server.mjs"], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      PORT: String(QA_PORT)
    },
    stdio: "inherit",
    shell: false
  });
  for (let i = 0; i < 60; i += 1) {
    if (await reachable(url)) return { base: url, label: `production Node server ${QA_PORT} (started by qa)` };
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  console.error(`[qa] FAIL: server.mjs did not become reachable on port ${QA_PORT}.`);
  process.exit(1);
}

const target = await resolveTarget();
base = target.base;
note(`TARGET ${target.label} ${base}`);

/* ------------------------------------------------------------------ browser */

// Prefer the installed system Chrome so QA does not depend on a
// version-pinned Playwright download; fall back to the default bundle.
let browser;
try {
  browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
} catch (err) {
  console.error("[qa] FAIL: no browser available for browser QA.");
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
}

const context = await browser.newContext();
const page = await context.newPage();

page.on("pageerror", (err) => {
  assert(false, `pageerror ${page.url().replace(base, "")}`, err.message);
});
page.on("console", (msg) => {
  if (msg.type() !== "error") return;
  const text = msg.text();
  if (consoleAllowed(text)) {
    note(`CONSOLE-ALLOWED ${text.slice(0, 120)}`);
    return;
  }
  assert(false, `console-error ${page.url().replace(base, "")}`, text.slice(0, 240));
});

/**
 * FormSubmit must never be reached with a real request during browser QA.
 * The mock answers the CORS preflight and the JSON POST so the real success
 * path in `src/lib/inquiry.ts` is exercised without any delivery.
 * `src/data/em.js` keeps pointing at the production AJAX endpoint.
 */
let formsubmitAttempts = 0;
let formsubmitPosts = 0;
await context.route(/formsubmit\.co/i, async (route) => {
  formsubmitAttempts += 1;
  const request = route.request();
  if (request.method().toUpperCase() === "OPTIONS") {
    await route.fulfill({
      status: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "content-type, accept"
      },
      body: ""
    });
    return;
  }
  formsubmitPosts += 1;
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    headers: { "access-control-allow-origin": "*" },
    body: JSON.stringify({ success: "true", message: "QA mock — no email delivered" })
  });
});


/* -------------------------------------------------------------- assertions */

let runError = null;
try {
  /* ------------------------------------- canonical routes: load, H1, lang, axe */
  for (const route of ROUTES) {
    const res = await open(page, route.path);
    assert(!!res, `route-load ${route.path}`, "no navigation response");
    assert(res?.status() === 200, `route-status ${route.path}`, `got=${res?.status()}`);
    await page.waitForTimeout(200);

    const head = await page.evaluate(() => {
      const nodes = [...document.querySelectorAll("main h1")];
      return {
        count: nodes.length,
        text: (nodes[0]?.textContent || "").trim(),
        lang: document.documentElement.lang,
        hashes: [...document.querySelectorAll("a[href^='#']")]
          .map((a) => a.getAttribute("href") || "")
          .filter((href) => href !== "#" && !href.startsWith("#challenge"))
      };
    });
    assert(head.count === 1, `route-h1-count ${route.path}`, `count=${head.count}`);
    assert(head.text.length > 0, `route-h1-text ${route.path}`, "empty H1");
    assert(head.lang === route.lang, `route-lang ${route.path}`, `got=${head.lang}`);

    const leaked = await page.evaluate(() => {
      const banned = ["contactRequired", "contactInvalidEmail", "contactErrorSummary", "sending", "marketsEntered", "awardProof", "prevCase", "similarChallenge"];
      const text = document.body.innerText;
      return banned.filter((key) => text.includes(key));
    });
    assert(leaked.length === 0, `raw-key ${route.path}`, leaked.join(","));

    const unknownHashes = head.hashes.filter((href) => !KNOWN_HASHES.includes(href));
    assert(unknownHashes.length === 0, `hash-target ${route.path}`, unknownHashes.join(","));

    await runAxe(page, route.path, route.lang);
    note(`ROUTE ${route.path} (${route.lang}) status=${res?.status()} h1=${head.count}`);
  }

  /* ------------------------------------------------- legacy/alias entry points */
  await page.evaluate(() => localStorage.removeItem("em-lang"));
  for (const alias of LEGACY_ALIASES) {
    await open(page, alias.from);
    await page.waitForTimeout(400);
    const landed = new URL(page.url()).pathname;
    assert(landed === alias.expect, `legacy-alias ${alias.from}`, `landed=${landed} expected=${alias.expect}`);
    note(`LEGACY ${alias.from} → ${landed}`);
  }

  /* ----------------------------------------------------------- home contract */
  for (const home of [
    {
      path: "/ar",
      cta: "تواصل معنا",
      years: "سنة خبرة",
      markets: "خبرة في أسواق الخليج",
      consult: "استكشفوا الاستشارات",
      exec: "استكشفوا التنفيذ",
      method: ["نشخّص", "نرتّب", "ننفّذ", "نقيس ونحسّن"],
      forbid: ["Diagnose", "Prioritize", "Execute", "Measure & Improve"]
    },
    {
      path: "/en",
      cta: "Contact us",
      years: "years of experience",
      markets: "market experience",
      consult: "Explore consulting",
      exec: "Explore execution",
      method: ["Diagnose", "Prioritize", "Execute", "Measure & Improve"],
      forbid: []
    }
  ]) {
    await open(page, home.path);
    const homeState = await page.evaluate(() => {
      const hero = document.querySelector(".folio-hero");
      const strip = document.querySelector(".cred-strip");
      const ledger = document.querySelector(".hv-ledger");
      const title = document.querySelector(".folio-hero .hero__title span");
      const ink = title ? getComputedStyle(title).color : "";
      const italic = title ? getComputedStyle(title).fontStyle : "";
      const order = hero && strip && ledger
        ? hero.compareDocumentPosition(strip) & Node.DOCUMENT_POSITION_FOLLOWING
          && strip.compareDocumentPosition(ledger) & Node.DOCUMENT_POSITION_FOLLOWING
        : false;
      return {
        text: document.body.innerText,
        order,
        ink,
        italic,
        dock: document.querySelector(".folio-hero button.go")?.textContent || ""
      };
    });
    assert(homeState.order, `home-order ${home.path}`, "hero, credibility strip, ledger");
    assert(homeState.text.includes(home.cta), `home-cta ${home.path}`, home.cta);
    assert(homeState.text.includes(home.years), `home-years ${home.path}`, home.years);
    assert(homeState.text.includes(home.markets), `home-markets ${home.path}`, home.markets);
    assert(homeState.text.includes(home.consult), `home-consult-cta ${home.path}`, home.consult);
    assert(homeState.text.includes(home.exec), `home-exec-cta ${home.path}`, home.exec);
    assert(homeState.ink === "rgb(6, 24, 45)", `home-ink ${home.path}`, homeState.ink);
    assert(homeState.italic === "normal", `home-italic ${home.path}`, homeState.italic);
    for (const title of home.method) assert(homeState.text.includes(title), `home-method ${home.path}`, title);
    for (const title of home.forbid) assert(!homeState.text.includes(title), `home-method-en ${home.path}`, title);
    await page.locator(".folio-hero button.go").click();
    await page.waitForSelector("#contact-dock-panel", { timeout: 4000 });
    assert(true, `home-dock ${home.path}`, "");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
  }

  /* ----------------------------------------------------------- user journeys */
  await open(page, "/ar");
  note(`LOGO ${await page.locator(".logo-chamber img").count()}`);
  const consultingLink = page.locator('a[href*="/consulting"]').first();
  assert((await consultingLink.count()) > 0, "flow home-consulting-link", "no consulting link on /ar");
  await consultingLink.click();
  await page.waitForURL("**/consulting");
  await page.waitForSelector("main h2:not(.sr-only)", { timeout: 20000 });
  note(`FLOW home→consulting ${page.url()}`);

  const contactLink = page.locator('a[href*="contact"]').first();
  assert((await contactLink.count()) > 0, "flow consulting-contact-link", "no contact link");
  await contactLink.click();
  await page.waitForURL("**/contact**");
  note(`FLOW consulting→contact ${page.url()}`);

  /* ------------------------------------------- contact form (mocked delivery) */
  await open(page, "/ar/contact");
  await page.waitForTimeout(200);
  const postsBefore = formsubmitPosts;
  await page.locator("#name").fill("QA");
  await page.locator("#email").fill("qa@example.com");
  await page.locator("#company").fill("QA");
  await page.locator("#message").fill("QA challenge");
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(900);
  assert(formsubmitPosts > postsBefore, "formsubmit-intercepted", `posts=${formsubmitPosts - postsBefore}`);
  assert(!(await page.locator("#errorSummary").isVisible()), "form-valid-no-errors", "errorSummary shown for valid input");
  const submitErrors = await page.locator(".form-error").count();
  assert(submitErrors === 0, "form-success-path", `submit error panel rendered x${submitErrors}`);
  note(`FORM posts=${formsubmitPosts} (all intercepted, no email delivered)`);

  /* --------------------------------------------------------- overflow sweep */
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    for (const path of OVERFLOW_ROUTES) {
      await open(page, path);
      await page.waitForTimeout(250);
      const ov = await page.evaluate(overflowCheck);
      assert(ov.length === 0, `overflow ${vp.name} ${path}`, ov.join(" | "));
      const slug = path === "/" ? "home" : path.replace(/[/?=.]/g, "_");
      await page.screenshot({ path: join(out, `${slug}-${vp.name}.png`), fullPage: false });
    }
  }
} catch (err) {
  runError = err;
  assert(false, "playwright-runtime", err instanceof Error ? err.message : String(err));
} finally {
  const violationsTotal = axeResults.reduce((sum, r) => sum + (r.violations || 0), 0);
  const seriousTotal = axeResults.reduce((sum, r) => sum + (r.serious || 0), 0);
  const criticalTotal = axeResults.reduce((sum, r) => sum + (r.critical || 0), 0);
  const arAxe = axeResults.filter((r) => r.lang === "ar").length;
  const enAxe = axeResults.filter((r) => r.lang === "en").length;

  assert(axeResults.length === ROUTES.length, "axe-route-coverage", `${axeResults.length}/${ROUTES.length}`);
  assert(enAxe === EN_ROUTES.length, "axe-coverage-en", `${enAxe}/${EN_ROUTES.length}`);
  assert(arAxe === AR_ROUTES.length, "axe-coverage-ar", `${arAxe}/${AR_ROUTES.length}`);
  assert(axeExecutionErrors === 0, "axe-executed", `executionErrors=${axeExecutionErrors}`);
  assert(seriousTotal === 0, "axe-serious-total", `serious=${seriousTotal}`);
  assert(criticalTotal === 0, "axe-critical-total", `critical=${criticalTotal}`);
  assert(formsubmitPosts > 0, "formsubmit-mocked", `posts=${formsubmitPosts}`);

  note("");
  note("==== AXE EVIDENCE ====");
  note("axe executed        : yes (axe-core injected; window.axe.run resolved on every route)");
  note(`routes scanned      : ${axeResults.length} (EN ${enAxe}/${EN_ROUTES.length} · AR ${arAxe}/${AR_ROUTES.length})`);
  note(`total violations    : ${violationsTotal}`);
  note(`serious             : ${seriousTotal}`);
  note(`critical            : ${criticalTotal}`);
  note(`axe execution errors: ${axeExecutionErrors}`);
  note(`axe exceptions      : ${axeExcludedNodes} node(s)${AXE_EXCEPTIONS.length ? ` — ${AXE_EXCEPTIONS.map((e) => `${e.rule} @ ${e.selector}`).join("; ")}` : ""}`);
  note("");
  note("==== SUMMARY ====");
  note(`target              : ${target.label} ${base}`);
  note(`assertion failures  : ${failCount}`);
  note(`formsubmit mocked   : ${formsubmitPosts} POST(s), ${formsubmitAttempts} request(s) intercepted — no email delivered`);
  note(`result              : ${failCount === 0 && !runError ? "PASS" : "FAIL"}`);
  if (failures.length) {
    note("---- FAILURES ----");
    for (const line of failures) note(line);
  }

  writeFileSync(join(out, "notes.txt"), notes.join("\n") + "\n");
  console.log(notes.join("\n"));
  await browser.close().catch(() => undefined);
  if (server) server.kill();

  if (failCount > 0 || runError) {
    console.error(`\n[qa] FAIL — ${failCount} assertion failure(s). See .qa/notes.txt`);
    process.exitCode = 1;
  } else {
    console.log("\n[qa] PASS — browser QA gate satisfied.");
  }
}