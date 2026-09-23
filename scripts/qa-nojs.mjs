#!/usr/bin/env node
/**
 * Elite Maison — No-JavaScript browser QA gate (`npm run qa:nojs`).
 *
 * Runs Playwright with JavaScript disabled against the real production Node
 * server (`server.mjs`) to verify progressive enhancement.
 */

import { chromium } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const PORT = 4177;
const BASE = `http://127.0.0.1:${PORT}`;
const out = join(ROOT, ".qa");
mkdirSync(out, { recursive: true });

const NOJS_ROUTES = [
  { path: "/ar", lang: "ar" },
  { path: "/en", lang: "en" },
  { path: "/ar/consulting", lang: "ar" },
  { path: "/en/consulting", lang: "en" },
  { path: "/ar/contact", lang: "ar" },
  { path: "/en/contact", lang: "en" },
  { path: "/en/execution", lang: "en" },
  { path: "/ar/sectors", lang: "ar" },
  { path: "/en/cases/patchouli", lang: "en" },
  { path: "/ar/insights/ai-insight", lang: "ar" }
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

async function waitForServer() {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${BASE}/ar`);
      if (res.status > 0) return;
    } catch { /* starting */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Node production server did not start on ${BASE}`);
}

async function main() {
  let server = null;
  try {
    assert(existsSync(join(ROOT, "dist", "index.html")), "dist/ exists", "run npm run build first");

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
      console.error("[qa:nojs] FAIL: no browser available for no-JS QA.");
      console.error(err instanceof Error ? err.message : String(err));
      process.exitCode = 1;
      return;
    }

    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    page.on("pageerror", (err) => {
      assert(false, `pageerror ${page.url().replace(BASE, "")}`, err.message);
    });

    for (const route of NOJS_ROUTES) {
      const res = await page.goto(`${BASE}${route.path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.waitForSelector("main", { timeout: 20000 });

      const status = res ? (typeof res.status === "function" ? await res.status() : res.status) : 0;
      assert(status === 200, `nojs-status ${route.path}`, `got=${status}`);

      const info = await page.evaluate((expectedLang) => {
        const docEl = document.documentElement;
        const h1s = [...document.querySelectorAll("main h1")];
        const mainEl = document.querySelector("main");
        const bodyText = (document.body?.textContent || "").trim().length;
        const navLinks = [...document.querySelectorAll("nav a[href]")].length;
        const hiddenH1 = h1s.some((h) => {
          const style = window.getComputedStyle(h);
          return style.opacity === "0" || style.visibility === "hidden";
        });
        const offScreenH1 = h1s.some((h) => h.getBoundingClientRect().bottom < -100);
        const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
        const canonical = [...document.querySelectorAll('link[rel="canonical"]')].map((l) => l.href);
        return {
          hasMain: !!mainEl,
          h1Count: h1s.length,
          h1Text: (h1s[0]?.textContent || "").trim(),
          bodyText,
          navLinks,
          hiddenH1,
          offScreenH1,
          overflow,
          lang: docEl.lang,
          dir: docEl.dir,
          canonical
        };
      }, route.lang);

      assert(info.hasMain, `nojs-main ${route.path}`, "no <main>");
      assert(info.h1Count === 1, `nojs-h1-count ${route.path}`, `count=${info.h1Count}`);
      assert(info.h1Text.length > 0, `nojs-h1-text ${route.path}`, "empty H1");
      assert(info.bodyText > 200, `nojs-body ${route.path}`, `chars=${info.bodyText}`);
      assert(info.navLinks > 0, `nojs-nav ${route.path}`, "no nav links");
      assert(!info.hiddenH1, `nojs-h1-hidden ${route.path}`, "H1 hidden with opacity:0");
      assert(!info.offScreenH1, `nojs-h1-offscreen ${route.path}`, "H1 moved off-screen");
      assert(!info.overflow, `nojs-overflow ${route.path}`, "horizontal overflow detected");
      assert(info.lang === route.lang, `nojs-lang ${route.path}`, `got=${info.lang}`);
      assert(info.dir === (route.lang === "ar" ? "rtl" : "ltr"), `nojs-dir ${route.path}`, `got=${info.dir}`);
      assert(info.canonical.length > 0, `nojs-canonical ${route.path}`, "missing canonical link");

      const revealStuck = await page.evaluate(() =>
        [...document.querySelectorAll("[data-reveal]")].filter((el) => {
          const style = window.getComputedStyle(el);
          return parseFloat(style.opacity) < 0.5 || style.visibility === "hidden";
        }).length
      );
      assert(revealStuck === 0, `nojs-reveal-visible ${route.path}`, `${revealStuck} nodes stuck hidden`);

      note(`NOJS ${route.path} status=${status} h1=${info.h1Count} body=${info.bodyText} lang=${info.lang} dir=${info.dir} canonical=${info.canonical[0] ?? "none"} reveal-stuck=${revealStuck}`);

      if (route.path === "/en/contact") {
        const contactInfo = await page.evaluate(() => {
          const text = document.body?.textContent || "";
          return {
            hasEmail: /[\w.-]+@[\w.-]+\.\w{2,}/.test(text),
            hasPhone: /\+?\d[\d\s\-()]{7,}/.test(text),
            hasWhatsApp: /whatsapp/i.test(text)
          };
        });
        assert(contactInfo.hasEmail, "nojs-contact-email", "no email visible");
        assert(contactInfo.hasPhone, "nojs-contact-phone", "no phone visible");
        assert(contactInfo.hasWhatsApp, "nojs-contact-whatsapp", "no WhatsApp visible");
        note(`NOJS /en/contact contact-channels email=${contactInfo.hasEmail} phone=${contactInfo.hasPhone} whatsApp=${contactInfo.hasWhatsApp}`);
      }
    }

    await browser.close();
  } catch (err) {
    assert(false, "nojs-runtime", err instanceof Error ? err.message : String(err));
  } finally {
    if (server) server.kill();
  }

  note("");
  note("==== NO-JS SUMMARY ====");
  note(`routes tested       : ${NOJS_ROUTES.length}`);
  note(`javascript disabled  : true`);
  note(`assertion failures  : ${failCount}`);
  if (failures.length) {
    note("---- FAILURES ----");
    for (const line of failures) note(line);
  }
  note(`result              : ${failCount === 0 ? "PASS" : "FAIL"}`);

  writeFileSync(join(out, "nojs-notes.txt"), notes.join("\n") + "\n");
  console.log(notes.join("\n"));

  if (failCount > 0) {
    console.error(`\n[qa:nojs] FAIL — ${failCount} assertion failure(s). See .qa/nojs-notes.txt`);
    process.exitCode = 1;
  } else {
    console.log("\n[qa:nojs] PASS — all no-JS routes verified.");
  }
}

main();
