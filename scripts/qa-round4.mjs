import { chromium } from "playwright";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.QA_BASE && /:(5173|4173)\b/.test(process.env.QA_BASE)
  ? process.env.QA_BASE
  : "http://127.0.0.1:5173";
const out = join(process.cwd(), ".qa", "round4");
mkdirSync(out, { recursive: true });
const notes = [];

async function prep(page) {
  await page.route("**/*fonts.googleapis.com/**", (route) => route.abort());
  await page.route("**/*fonts.gstatic.com/**", (route) => route.abort());
}

async function open(page, path) {
  const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("h1", { timeout: 20000 });
  await page.waitForTimeout(320);
  return res;
}

async function seoSnap(page) {
  await page.waitForFunction(() => {
    return Boolean(document.querySelector('link[rel="canonical"]') && document.getElementById("em-jsonld"));
  }, { timeout: 8000 });
  return page.evaluate(() => {
    let json = null;
    try {
      json = JSON.parse(document.getElementById("em-jsonld")?.textContent || "null");
    } catch {
      json = "PARSE_ERROR";
    }
    const types = Array.isArray(json?.["@graph"])
      ? json["@graph"].map((n) => n["@type"])
      : [];
    return {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") || "",
      canonical: document.querySelector('link[rel="canonical"]:not([hreflang])')?.getAttribute("href") || "",
      hreflang: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map(
        (el) => `${el.getAttribute("hreflang")}=${el.getAttribute("href")}`
      ),
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content") || "",
      ogType: document.querySelector('meta[property="og:type"]')?.getAttribute("content") || "",
      jsonTypes: types,
      lang: document.documentElement.lang,
      dir: document.documentElement.dir,
      h1: document.querySelectorAll("h1").length
    };
  });
}

function overflowCheck() {
  return [...document.querySelectorAll("body *")]
    .filter((el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 2)
    .filter((el) => !el.closest(".book, .book__strip, .skyfield"))
    .slice(0, 8)
    .map((el) => el.tagName + "." + String(el.className).split(" ")[0]);
}

const visual = [
  ["", "ar", 1440, 900],
  ["", "ar", 390, 844],
  ["about", "ar", 1440, 900],
  ["about", "ar", 390, 844],
  ["consulting", "ar", 1440, 900],
  ["consulting", "ar", 390, 844],
  ["execution", "ar", 1440, 900],
  ["execution", "ar", 390, 844],
  ["sectors", "ar", 1440, 900],
  ["sectors", "ar", 390, 844],
  ["cases", "ar", 1440, 900],
  ["cases", "ar", 390, 844],
  ["cases/patchouli", "ar", 1440, 900],
  ["cases/patchouli", "ar", 390, 844],
  ["insights", "ar", 1440, 900],
  ["insights", "ar", 390, 844],
  ["insights/growth-guide", "ar", 1440, 900],
  ["insights/growth-guide", "ar", 390, 844],
  ["contact", "ar", 1440, 900],
  ["contact", "ar", 390, 844],
  ["", "en", 1440, 900],
  ["consulting", "en", 1280, 800],
  ["execution", "en", 1024, 800],
  ["sectors", "ar", 768, 1024],
  ["cases/bloom", "en", 430, 932],
  ["insights/growth-guide", "en", 360, 800],
  ["contact", "en", 1440, 900]
];

const seoPages = [
  "/ar",
  "/ar/consulting",
  "/ar/cases/patchouli",
  "/ar/insights/growth-guide",
  "/ar/contact",
  "/en/cases/patchouli",
  "/en/insights/growth-guide"
];

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
await prep(page);
page.on("pageerror", (err) => {
  if (err.message.includes("ViewTransition")) notes.push("PAGEERROR(browser) " + err.message);
  else notes.push("PAGEERROR " + err.message);
});
page.on("console", (msg) => {
  if (msg.type() === "error" && !msg.text().includes("ERR_FAILED")) notes.push("CONSOLE " + msg.text());
});

try {
  for (const [slug, lang, w, h] of visual) {
    await page.setViewportSize({ width: w, height: h });
    const path = `/${lang}${slug ? `/${slug}` : ""}`;
    const res = await open(page, path);
    notes.push(`HTTP ${res?.status()} ${path} ${w}`);
    const ov = await page.evaluate(overflowCheck);
    if (ov.length) notes.push(`OVERFLOW ${path} ${w} ${ov.join(" | ")}`);
    const name = `${(slug || "home").replaceAll("/", "-")}-${lang}-${w}.png`;
    await page.screenshot({ path: join(out, name), fullPage: false });
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  for (const path of seoPages) {
    await open(page, path);
    const seo = await seoSnap(page);
    notes.push(`SEO ${path} title=${seo.title}`);
    notes.push(`SEO ${path} desc=${seo.desc.slice(0, 120)}`);
    notes.push(`SEO ${path} canonical=${seo.canonical}`);
    notes.push(`SEO ${path} hreflang=${seo.hreflang.join(" | ")}`);
    notes.push(`SEO ${path} og=${seo.ogTitle} type=${seo.ogType}`);
    notes.push(`SEO ${path} json=${seo.jsonTypes.join(",")} lang=${seo.lang} dir=${seo.dir} h1=${seo.h1} robots=${seo.robots}`);
    if (seo.h1 !== 1) notes.push(`H1_FAIL ${path} ${seo.h1}`);
    if (!seo.canonical.includes(path.replace(/\/$/, ""))) notes.push(`CANONICAL_MISMATCH ${path} ${seo.canonical}`);
    if (!seo.hreflang.some((h) => h.startsWith("ar=")) || !seo.hreflang.some((h) => h.startsWith("en="))) {
      notes.push(`HREFLANG_FAIL ${path}`);
    }
  }

   await open(page, "/ar/contact?step=2");
  const stepSeo = await seoSnap(page);
  notes.push(`NOINDEX step ${stepSeo.robots}`);

  const sitemap = await page.goto(BASE + "/sitemap.xml", { waitUntil: "domcontentloaded" });
  notes.push(`SITEMAP ${sitemap?.status()} ${(await page.content()).includes("/ar/cases/patchouli")}`);
  const robots = await page.goto(BASE + "/robots.txt", { waitUntil: "domcontentloaded" });
  notes.push(`ROBOTS ${robots?.status()} ${(await page.content()).includes("Sitemap:")}`);

  const sitemapXml = readFileSync(join(process.cwd(), "public", "sitemap.xml"), "utf8");
  const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace("https://www.elitemaisonmarketing.com", ""));
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const loc of locs) {
    const res = await page.goto(BASE + loc, { waitUntil: "domcontentloaded" });
    const ok = res?.status();
    if (ok !== 200) notes.push(`SITEMAP_HTTP ${ok} ${loc}`);
    const h1 = await page.locator("h1").count();
    if (!h1) notes.push(`SITEMAP_NO_H1 ${loc}`);
  }
  notes.push(`SITEMAP_CHECKED ${locs.length}`);

  await page.setViewportSize({ width: 1440, height: 900 });
  await open(page, "/ar");
  await page.locator('.nav__primary a[href="/ar/consulting"]').click();
  await page.waitForURL("**/ar/consulting**");
  notes.push("JOURNEY1 home→consulting");
  await page.locator('.cta-band a.btn--gold[href*="/ar/contact"]').first().click({ timeout: 60000 });
  await page.waitForURL("**/ar/contact**", { timeout: 60000 });
  notes.push("JOURNEY1 consulting→contact");
  await page.locator("#name").fill("Haidara Test");
  await page.locator("#email").fill("haidara@example.com");
   await page.locator("#company").fill("Elite Maison QA");
   await page.locator("#message").fill("Need a clearer growth decision.");
   await page.locator("button[type='submit']").first().click();
   await page.waitForSelector(".timing-step, .step-meter__bar[data-step='2']");
   notes.push("JOURNEY1 contact step2");
   await page.locator("button[type='submit']").first().click();
   await page.waitForSelector(".form-error");
   notes.push("JOURNEY1 form failure is truthful " + (await page.locator(".form-success").count() === 0));

  await open(page, "/en");
  await page.locator('.nav__primary a[href="/en/execution"]').click();
  await page.waitForURL("**/en/execution**");
  notes.push("JOURNEY2 home→execution");
  await page.locator('.cta-band a.btn--gold[href*="/en/contact"]').first().click({ timeout: 60000 });
  await page.waitForURL("**/en/contact**", { timeout: 60000 });
  notes.push("JOURNEY2 execution→contact");

  await open(page, "/ar");
  await page.locator('.nav__primary a[href="/ar/sectors"]').click();
  await page.waitForURL("**/ar/sectors**", { timeout: 60000 });
  notes.push("JOURNEY3 home→sectors");
  await page.locator('.cta-band a.btn--gold[href*="contact"]').first().click({ timeout: 60000 });
  await page.waitForURL("**/contact**", { timeout: 60000 });
  notes.push("JOURNEY3 sectors→contact " + page.url());

  await open(page, "/ar/insights");
  await page.locator('.cta-band a.btn--gold[href*="/ar/contact"]').first().click({ timeout: 60000 });
  await page.waitForURL("**/ar/contact**", { timeout: 60000 });
  notes.push("JOURNEY4 insights→contact");

  await open(page, "/ar/cases/patchouli");
  await page.locator(".nav__tools .lang-switch").first().click();
  await page.waitForURL("**/en/cases/patchouli");
  notes.push("LANG ar→en same case " + page.url());
  await page.locator(".nav__tools .lang-switch").first().click();
  await page.waitForURL("**/ar/cases/patchouli");
  notes.push("LANG en→ar same case " + page.url());

  await open(page, "/en/insights/growth-guide");
  await page.locator(".nav__tools .lang-switch").first().click();
  await page.waitForURL("**/ar/insights/growth-guide");
  notes.push("LANG en insight→ar " + page.url());

  const directCase = await open(page, "/ar/cases/bloom");
  notes.push("DIRECT case " + directCase?.status() + " " + page.url());
  const directInsight = await open(page, "/en/insights/cx-check");
  notes.push("DIRECT insight " + directInsight?.status() + " " + page.url());

  const legacy = await page.goto(BASE + "/consulting.html", { waitUntil: "domcontentloaded" });
  await page.waitForURL(/\/(ar|en)\/consulting$/);
  notes.push("LEGACY consulting.html → " + page.url() + " http=" + legacy?.status());

  await page.goto(BASE + "/cases/patchouli", { waitUntil: "domcontentloaded" });
  await page.waitForURL(/\/(ar|en)\/cases\/patchouli/);
  notes.push("COMPAT /cases/patchouli → " + page.url());

  await open(page, "/en/cases");
  await page.locator('a[href="/en/cases/patchouli"]').first().click();
  await page.waitForURL("**/en/cases/patchouli**");
  await page.goBack();
  notes.push("BACK " + page.url());
  await page.goForward();
  notes.push("FORWARD " + page.url());

  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, "/ar");
  await page.locator(".nav__menu").click();
  await page.locator('.drawer a[href="/ar/cases"]').click();
  await page.waitForURL("**/ar/cases**");
  notes.push("MOBILE menu→cases");
  await page.locator('a[href="/ar/cases/patchouli"]').first().click();
  await page.waitForURL("**/ar/cases/patchouli**");
  notes.push("MOBILE cases→patchouli");
  await page.locator("main .cta-band a.btn--gold[href*='/ar/contact']").first().click({ timeout: 60000 });
  await page.waitForURL("**/ar/contact**", { timeout: 60000 });
  notes.push("MOBILE patchouli→contact");

  await page.setViewportSize({ width: 1440, height: 900 });
  await open(page, "/ar/consulting");
  notes.push("GEO consulting answer " + (await page.locator(".exec-answer__text").count()));
  await open(page, "/ar/execution");
  notes.push("GEO execution answer " + (await page.locator(".exec-answer__text").count()));
  await open(page, "/ar/sectors");
  notes.push("GEO sectors answer " + (await page.locator(".exec-answer__text").count()));
  await open(page, "/ar/insights/growth-guide");
  notes.push("GEO insight answer " + (await page.locator(".exec-answer__text").first().innerText()).slice(0, 80));

  await open(page, "/ar/contact");
  notes.push("DOCK on contact " + (await page.locator(".contact-dock, [data-floating-disclosure]").count()));
} catch (err) {
  notes.push("FAIL " + (err && err.message ? err.message : String(err)));
} finally {
  writeFileSync(join(out, "notes.txt"), notes.join("\n") + "\n");
  console.log(notes.join("\n"));
  await browser.close();
}
