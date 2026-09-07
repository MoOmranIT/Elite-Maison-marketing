import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.QA_BASE && /:(5173|4173)\b/.test(process.env.QA_BASE)
  ? process.env.QA_BASE
  : "http://127.0.0.1:5173";
const out = join(process.cwd(), ".qa", "round2");
mkdirSync(out, { recursive: true });
const notes = [];

async function prep(page) {
  await page.route("**/*fonts.googleapis.com/**", (route) => route.abort());
  await page.route("**/*fonts.gstatic.com/**", (route) => route.abort());
}

async function open(page, path) {
  const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("h1", { timeout: 10000 });
  await page.waitForTimeout(350);
  return res;
}

function overflowCheck() {
  return [...document.querySelectorAll("body *")]
    .filter((el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 2)
    .filter((el) => !el.closest(".book, .book__strip, .skyfield"))
    .slice(0, 8)
    .map((el) => el.tagName + "." + String(el.className).split(" ")[0]);
}

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
await prep(page);
page.on("pageerror", (err) => notes.push("PAGEERROR " + err.message));
page.on("console", (msg) => {
  if (msg.type() === "error" && !msg.text().includes("ERR_FAILED")) notes.push("CONSOLE " + msg.text());
});

const shots = [
  ["consulting", "ar", 1440, 900],
  ["consulting", "ar", 1280, 800],
  ["consulting", "ar", 1024, 800],
  ["consulting", "ar", 768, 1024],
  ["consulting", "ar", 430, 932],
  ["consulting", "ar", 390, 844],
  ["consulting", "ar", 360, 800],
  ["consulting", "en", 1440, 900],
  ["consulting", "en", 390, 844],
  ["execution", "ar", 1440, 900],
  ["execution", "ar", 768, 1024],
  ["execution", "ar", 430, 932],
  ["execution", "ar", 390, 844],
  ["execution", "ar", 360, 800],
  ["execution", "en", 1440, 900],
  ["sectors", "ar", 1440, 900],
  ["sectors", "ar", 768, 1024],
  ["sectors", "ar", 430, 932],
  ["sectors", "ar", 390, 844],
  ["sectors", "ar", 360, 800],
  ["sectors", "en", 1440, 900]
];

try {
  for (const [slug, lang, w, h] of shots) {
    await page.setViewportSize({ width: w, height: h });
    const res = await open(page, `/${slug}?lang=${lang}`);
    notes.push(`HTTP ${res?.status()} /${slug}?lang=${lang} ${w}`);
    const ov = await page.evaluate(overflowCheck);
    if (ov.length) notes.push(`OVERFLOW ${slug} ${lang} ${w} ${ov.join(" | ")}`);
    await page.screenshot({ path: join(out, `${slug}-${lang}-${w}.png`), fullPage: false });
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await open(page, "/?lang=ar");
  await page.locator('a[href="/consulting"]').first().click();
  await page.waitForURL("**/consulting**");
  notes.push("FLOW home→consulting " + page.url());
  await page.locator('a.btn--gold[href="/contact"]').first().click();
  await page.waitForURL("**/contact**");
  notes.push("FLOW consulting→contact " + page.url());

  await open(page, "/?lang=en");
  await page.locator('.paths-split a[href="/execution"]').click();
  await page.waitForURL("**/execution**");
  await page.waitForSelector(".exec-mod");
  notes.push("FLOW home→execution " + page.url());
  const caseLink = page.locator(".exec-mod a[href*='/cases/']").first();
  await caseLink.waitFor({ state: "attached", timeout: 8000 });
  await caseLink.scrollIntoViewIfNeeded();
  await caseLink.click();
  await page.waitForURL("**/cases/**");
  notes.push("FLOW execution→case " + page.url());
  await page.locator('a.btn--gold[href="/contact"]').first().click();
  await page.waitForURL("**/contact**");
  notes.push("FLOW case→contact " + page.url());

  await open(page, "/?lang=ar");
  await page.locator(".nav__more button").click();
  await page.locator('.more-panel a[href="/sectors"]').click();
  await page.waitForURL("**/sectors**");
  notes.push("FLOW home→sectors " + page.url());
  await page.locator(".next-steps a, .sector-plate a.go").first().click();
  notes.push("FLOW sectors→capability " + page.url());
  await page.locator('a.btn--gold[href="/contact"], a[href="/contact"].btn').first().click();
  await page.waitForURL("**/contact**");
  notes.push("FLOW capability→contact " + page.url());

  await page.setViewportSize({ width: 1440, height: 900 });
  await open(page, "/consulting?lang=en");
  await page.locator(".folio-index button").nth(2).focus();
  await page.keyboard.press("ArrowDown");
  const active = await page.locator(".folio-index button.is-active").innerText();
  notes.push("KEYBOARD consulting index → " + active.replace(/\s+/g, " ").trim());

  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, "/consulting?lang=ar");
  const acc = page.locator(".folio-acc__btn");
  notes.push("MOBILE consulting accordion " + (await acc.count()));
  await acc.nth(1).click();
  notes.push("MOBILE accordion expanded " + (await page.locator(".folio-acc__btn[aria-expanded='true']").count()));
  await page.screenshot({ path: join(out, "consulting-mobile-acc.png"), fullPage: false });

  await open(page, "/consulting?lang=ar#franchise");
  notes.push("HASH franchise canvas " + (await page.locator("#franchise").count()));

  const frames = await page.locator(".frame, .door-card, .swipe-card").count();
  notes.push("CARDS on consulting hash page " + frames);
} catch (err) {
  notes.push("FAIL " + (err && err.message ? err.message : String(err)));
} finally {
  writeFileSync(join(out, "notes.txt"), notes.join("\n") + "\n");
  console.log(notes.join("\n"));
  await browser.close();
}
