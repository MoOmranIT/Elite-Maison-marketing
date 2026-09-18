import { chromium } from "playwright";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let axeSource = "";
try {
  axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
} catch {
  axeSource = "";
}

const BASE = process.env.QA_BASE || "http://127.0.0.1:5176";
const out = join(process.cwd(), ".qa", "polish");
mkdirSync(out, { recursive: true });
const notes = [];

async function prep(page) {
  await page.route("**/*fonts.googleapis.com/**", (route) => route.abort());
  await page.route("**/*fonts.gstatic.com/**", (route) => route.abort());
}

async function open(page, path) {
  const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("h1", { timeout: 12000 });
  await page.waitForTimeout(360);
  return res;
}

function overflowCheck() {
  return [...document.querySelectorAll("body *")]
    .filter((el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 2)
    .filter((el) => !el.closest(".book, .book__strip, .skyfield"))
    .slice(0, 8)
    .map((el) => el.tagName + "." + String(el.className).split(" ")[0]);
}

function contrastRatio(fg, bg) {
  function lum(c) {
    const n = c.match(/[\d.]+/g).map(Number);
    const [r, g, b] = n.slice(0, 3).map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  const L1 = lum(fg);
  const L2 = lum(bg);
  const light = Math.max(L1, L2);
  const dark = Math.min(L1, L2);
  return ((light + 0.05) / (dark + 0.05)).toFixed(2);
}

const shots = [
  ["", "ar", 1440, 900],
  ["", "ar", 1280, 800],
  ["", "ar", 1024, 800],
  ["", "ar", 820, 1180],
  ["", "ar", 768, 1024],
  ["", "ar", 430, 932],
  ["", "ar", 390, 844],
  ["", "ar", 360, 800],
  ["", "en", 1440, 900],
  ["", "en", 1024, 800],
  ["", "en", 820, 1180],
  ["consulting", "ar", 1440, 900],
  ["consulting", "ar", 1024, 800],
  ["consulting", "ar", 390, 844],
  ["consulting", "en", 1440, 900],
  ["consulting", "en", 390, 844],
  ["execution", "ar", 1440, 900],
  ["execution", "ar", 1024, 800],
  ["execution", "ar", 390, 844],
  ["execution", "en", 1440, 900],
  ["execution", "en", 390, 844],
  ["execution", "en", 390, 844],
  ["sectors", "ar", 1440, 900],
  ["sectors", "ar", 768, 1024],
  ["sectors", "ar", 390, 844],
  ["sectors", "en", 1440, 900],
  ["cases", "ar", 1440, 900],
  ["cases", "ar", 390, 844],
  ["cases/patchouli", "ar", 1440, 900],
  ["cases/patchouli", "ar", 390, 844],
  ["cases/bloom", "en", 1440, 900],
  ["cases/bloom", "en", 390, 844],
  ["insights", "ar", 1440, 900],
  ["insights", "ar", 390, 844],
  ["insights/growth-guide", "ar", 1440, 900],
  ["insights/growth-guide", "ar", 390, 844],
  ["insights/growth-guide", "en", 1440, 900],
  ["contact", "ar", 1440, 900],
  ["contact", "ar", 1024, 800],
  ["contact", "ar", 768, 1024],
  ["contact", "ar", 430, 932],
  ["contact", "ar", 390, 844],
  ["contact", "ar", 360, 800],
  ["contact", "en", 1440, 900],
  ["contact", "en", 390, 844],
  ["contact?step=2", "ar", 1440, 900],
  ["contact?step=2", "ar", 390, 844],
  ["about", "ar", 1440, 900]
];

const axePages = ["/ar", "/ar/consulting", "/ar/cases/patchouli", "/ar/insights/growth-guide", "/ar/contact"];

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
await prep(page);
page.on("pageerror", (err) => notes.push("PAGEERROR " + err.message));
page.on("console", (msg) => {
  if (msg.type() === "error" && !msg.text().includes("ERR_FAILED")) notes.push("CONSOLE " + msg.text());
});

try {
  for (const [slug, lang, w, h] of shots) {
    await page.setViewportSize({ width: w, height: h });
    const path = `/${lang}${slug ? `/${slug}` : ""}`;
    const res = await open(page, path);
    const ov = await page.evaluate(overflowCheck);
    if (ov.length) notes.push(`OVERFLOW ${path} ${w} ${ov.join(" | ")}`);
    const chrome = await page.evaluate(() => {
      const primary = document.querySelector(".nav__primary");
      const menu = document.querySelector(".nav__menu");
      const cs = (el) => (el ? getComputedStyle(el).display : "missing");
      return { primary: cs(primary), menu: cs(menu), h1: document.querySelectorAll("h1").length, lang: document.documentElement.lang, dir: document.documentElement.dir };
    });
    notes.push(`HTTP ${res?.status()} ${path} ${w} nav=${chrome.primary} burger=${chrome.menu} h1=${chrome.h1}`);
    await page.screenshot({ path: join(out, `${(slug || "home").replaceAll("/", "-").replaceAll("?", "-")}-${lang}-${w}.png`), fullPage: false });
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await open(page, "/ar");
  const contrast = await page.evaluate((fn) => {
    const samples = [];
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return;
      const s = getComputedStyle(el);
      let bg = s.backgroundColor;
      let node = el;
      while (node && (bg === "rgba(0, 0, 0, 0)" || bg === "transparent")) {
        node = node.parentElement;
        bg = node ? getComputedStyle(node).backgroundColor : bg;
      }
      samples.push({ sel, color: s.color, bg, size: s.fontSize, weight: s.fontWeight });
    };
    [".lead", ".kicker", ".crumb", ".footer p", ".footer-meta", ".hint", ".exec-answer__text", ".cred-strip span", ".door--footer", ".proof-metric__unit"].forEach(pick);
    return samples;
  });
  notes.push("CONTRAST_SAMPLES " + JSON.stringify(contrast));

  await page.setViewportSize({ width: 1440, height: 900 });
  await open(page, "/ar");
  await page.locator('.nav__primary a[href="/ar/consulting"]').click();
  await page.waitForURL("**/ar/consulting**");
  await page.locator(".next-steps a[href*='/ar/cases/']").first().click();
  await page.waitForURL("**/ar/cases/**");
  await page.locator("main .cta-band a.btn--gold[href='/ar/contact']").click();
  await page.waitForURL("**/ar/contact**");
  await page.locator("#name").fill("Haidara Test");
  await page.locator("#email").fill("haidara@example.com");
  await page.locator("#company").fill("Elite Maison QA");
  await page.locator("#message").fill("Need a clearer growth decision.");
  await page.locator("button[type='submit']").first().click();
  await page.waitForSelector(".timing-step");
  await page.locator("button[type='submit']").first().click();
  await page.waitForSelector(".form-success");
  notes.push("JOURNEY1 ok");

  await open(page, "/en");
  await page.locator('.paths-split a[href="/en/execution"]').click();
  await page.waitForURL("**/en/execution**");
  await page.locator(".exec-mod a[href*='/en/cases/']").first().click();
  await page.waitForURL("**/en/cases/**");
  await page.locator("main .cta-band a.btn--gold[href='/en/contact']").click();
  await page.waitForURL("**/en/contact**");
  notes.push("JOURNEY2 ok " + page.url());

  await open(page, "/ar");
  await page.locator(".nav__more button").click();
  await page.locator('.more-panel a[href="/ar/sectors"]').click();
  await page.waitForURL("**/ar/sectors**");
  await page.locator(".next-steps a").first().click();
  await page.locator("main .cta-band a.btn--gold").first().click();
  await page.waitForURL("**/contact**");
  notes.push("JOURNEY3 ok " + page.url());

  await open(page, "/ar/insights");
  await page.locator('a[href="/ar/insights/growth-guide"]').first().click();
  await page.waitForURL("**/ar/insights/growth-guide**");
  await page.locator(".next-steps a").first().click();
  await page.locator("main .cta-band a.btn--gold").first().click();
  await page.waitForURL("**/contact**");
  notes.push("JOURNEY4 ok " + page.url());

  await open(page, "/ar/cases/patchouli");
  await page.locator(".nav__tools .lang-switch").click();
  await page.waitForURL("**/en/cases/patchouli");
  await page.locator(".nav__tools .lang-switch").click();
  await page.waitForURL("**/ar/cases/patchouli");
  notes.push("LANG switch ok");

  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, "/ar");
  await page.locator(".nav__menu").click();
  await page.locator('.drawer a[href="/ar/cases"]').click();
  await page.waitForURL("**/ar/cases**");
  await page.locator('a[href="/ar/cases/patchouli"]').first().click();
  await page.waitForURL("**/ar/cases/patchouli**");
  await page.locator("main .cta-band a.btn--gold[href='/ar/contact']").click();
  await page.waitForURL("**/ar/contact**");
  notes.push("MOBILE journey ok");

  await page.setViewportSize({ width: 1440, height: 900 });
  await open(page, "/en/cases");
  await page.locator('a[href="/en/cases/patchouli"]').first().click();
  await page.waitForURL("**/en/cases/patchouli**");
  await page.goBack();
  await page.goForward();
  notes.push("BACK/FORWARD " + page.url());

  await page.setViewportSize({ width: 1440, height: 900 });
  await open(page, "/ar");
  await page.keyboard.press("Tab");
  const skip = await page.evaluate(() => document.activeElement?.className || document.activeElement?.id || document.activeElement?.tagName);
  notes.push("FOCUS first-tab " + skip);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const navFocus = await page.evaluate(() => ({
    tag: document.activeElement?.tagName,
    text: (document.activeElement?.textContent || "").trim().slice(0, 48),
    outline: getComputedStyle(document.activeElement).outline
  }));
  notes.push("FOCUS later-tab " + JSON.stringify(navFocus));

  await open(page, "/ar/contact");
  await page.locator("#name").focus();
  await page.keyboard.press("Tab");
  const fieldFocus = await page.evaluate(() => document.activeElement?.id);
  notes.push("FOCUS contact-tab " + fieldFocus);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page, "/ar");
  const reduced = await page.evaluate(() => document.querySelector(".gold-rule")?.classList.contains("is-draw"));
  notes.push("REDUCED gold-rule drawn " + reduced);
  await page.emulateMedia({ reducedMotion: null });

  if (axeSource) {
    for (const path of axePages) {
      await open(page, path);
      await page.addScriptTag({ content: axeSource });
      const results = await page.evaluate(async () => {
        const r = await window.axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] }
        });
        return r.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.length,
          help: v.help,
          target: v.nodes.slice(0, 3).map((n) => n.target.join(" "))
        }));
      });
      notes.push(`AXE ${path} ${results.length} ${JSON.stringify(results)}`);
    }
  } else {
    notes.push("AXE skipped — axe-core not installed");
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  for (const path of ["/ar", "/ar/consulting", "/ar/cases/patchouli", "/ar/insights/growth-guide", "/ar/contact?step=2"]) {
    await open(page, path);
    await page.waitForFunction(() => document.querySelector('link[rel="canonical"]'));
    const seo = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelectorAll("h1").length,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
      lang: document.documentElement.lang,
      dir: document.documentElement.dir,
      hreflang: document.querySelectorAll('link[rel="alternate"][hreflang]').length,
      json: Boolean(document.getElementById("em-jsonld")?.textContent)
    }));
    notes.push(`SEO ${path} ${JSON.stringify(seo)}`);
  }
} catch (err) {
  notes.push("FAIL " + (err && err.message ? err.message : String(err)));
} finally {
  writeFileSync(join(out, "notes.txt"), notes.join("\n") + "\n");
  console.log(notes.join("\n"));
  await browser.close();
}
