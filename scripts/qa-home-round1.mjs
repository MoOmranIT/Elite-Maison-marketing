import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.QA_BASE && /:(5173|4173)\b/.test(process.env.QA_BASE)
  ? process.env.QA_BASE
  : "http://127.0.0.1:5173";
const out = join(process.cwd(), ".qa", "round1");
mkdirSync(out, { recursive: true });

const viewports = [
  { name: "1440", width: 1440, height: 900 },
  { name: "1024", width: 1024, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "430", width: 430, height: 932 },
  { name: "390", width: 390, height: 844 },
  { name: "360", width: 360, height: 800 }
];

const notes = [];

async function prep(page) {
  await page.route("**/*fonts.googleapis.com/**", (route) => route.abort());
  await page.route("**/*fonts.gstatic.com/**", (route) => route.abort());
}

async function openHome(page, lang) {
  const res = await page.goto(`${BASE}/?lang=${lang}`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("h1", { timeout: 10000 });
  await page.waitForTimeout(400);
  return res;
}

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
await prep(page);

page.on("pageerror", (err) => notes.push("PAGEERROR " + err.message));
page.on("console", (msg) => {
  if (msg.type() === "error") notes.push("CONSOLE " + msg.text());
});

try {
  for (const lang of ["ar", "en"]) {
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      const res = await openHome(page, lang);
      notes.push(`HTTP ${res?.status()} home?lang=${lang} ${vp.name}`);
      const h1 = (await page.locator("h1").innerText()).replace(/\s+/g, " ").trim();
      notes.push(`H1 ${lang} ${vp.name}: ${h1}`);
      const primaryCtas = await page.locator(".folio-hero .btn--gold").count();
      const heroGoes = await page.locator(".folio-hero .go").count();
      notes.push(`HERO CTA ${lang} ${vp.name} primary=${primaryCtas} secondary=${heroGoes}`);
      const navDoors = await page.locator(".nav__primary > a.door").count();
      notes.push(`NAV primary links ${lang} ${vp.name}: ${navDoors}`);
      const homeDoor = await page.locator('.nav a[href="/"]').filter({ hasText: /الرئيسية|Home/ }).count();
      notes.push(`NAV home text link ${lang} ${vp.name}: ${homeDoor}`);
      await page.screenshot({ path: join(out, `home-${lang}-${vp.name}.png`), fullPage: false });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(250);
      await page.screenshot({ path: join(out, `home-${lang}-${vp.name}-mid.png`), fullPage: false });
    }
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await openHome(page, "ar");
  await page.locator('a[href="/consulting"]').first().click();
  await page.waitForURL("**/consulting**");
  notes.push("FLOW home→consulting " + page.url());
  await page.locator('a[href="/contact"]').first().click();
  await page.waitForURL("**/contact**");
  notes.push("FLOW consulting→contact " + page.url());

  await openHome(page, "en");
  await page.locator('a[href="/cases/patchouli"]').first().click();
  await page.waitForURL("**/cases/patchouli**");
  notes.push("FLOW home→patchouli " + page.url());
  await page.locator('a.btn--gold[href="/contact"], a[href="/contact"].btn').first().click();
  await page.waitForURL("**/contact**");
  notes.push("FLOW patchouli→contact " + page.url());

  await page.setViewportSize({ width: 390, height: 844 });
  await openHome(page, "ar");
  await page.locator(".nav__menu").click();
  await page.waitForSelector("dialog.drawer[open]", { timeout: 4000 });
  const closeVisible = await page.locator(".drawer__close").isVisible();
  const drawerCta = await page.locator("dialog.drawer a.btn--gold").count();
  const drawerLang = await page.locator("dialog.drawer .lang-switch").count();
  notes.push(`MOBILE NAV open close=${closeVisible} cta=${drawerCta} lang=${drawerLang}`);
  await page.screenshot({ path: join(out, "mobile-nav-ar-390.png"), fullPage: false });
  await page.locator(".drawer__close").click();
  await page.waitForFunction(() => !document.querySelector("dialog.drawer")?.open);
  notes.push("MOBILE NAV closed");

  await page.setViewportSize({ width: 1440, height: 900 });
  await openHome(page, "ar");
  const goldBody = await page.evaluate(() => {
    const bad = [];
    const gold = "rgb(217, 165, 55)";
    document.querySelectorAll("h1, h2, .lead, .intro, .challenge-row strong, .cred-strip span").forEach((el) => {
      const color = getComputedStyle(el).color;
      const bgWalk = (node) => {
        let n = node;
        while (n && n !== document.body) {
          const bg = getComputedStyle(n).backgroundColor;
          if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
          n = n.parentElement;
        }
        return getComputedStyle(document.body).backgroundColor;
      };
      const bg = bgWalk(el);
      const light = !bg.includes("50, 16, 46") && !bg.includes("6, 24, 45");
      if (light && color === gold && (el.textContent || "").trim().length > 24) {
        bad.push(el.tagName + ":" + (el.textContent || "").slice(0, 40));
      }
    });
    return bad;
  });
  if (goldBody.length) notes.push("CONTRAST gold-on-light " + goldBody.join(" | "));
  else notes.push("CONTRAST gold-on-light none on sampled text");
} catch (err) {
  notes.push("FAIL " + (err && err.message ? err.message : String(err)));
} finally {
  writeFileSync(join(out, "notes.txt"), notes.join("\n") + "\n");
  console.log(notes.join("\n"));
  await browser.close();
}
