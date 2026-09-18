import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.QA_BASE && /:(5173|4173)\b/.test(process.env.QA_BASE)
  ? process.env.QA_BASE
  : "http://127.0.0.1:5173";
const out = join(process.cwd(), ".qa", "round3");
mkdirSync(out, { recursive: true });
const notes = [];

async function prep(page) {
  await page.route("**/*fonts.googleapis.com/**", (route) => route.abort());
  await page.route("**/*fonts.gstatic.com/**", (route) => route.abort());
}

async function open(page, path) {
  const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("h1", { timeout: 10000 });
  await page.waitForTimeout(280);
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
page.on("pageerror", (err) => {
  if (err.message.includes("ViewTransition")) notes.push("PAGEERROR(browser) " + err.message);
  else notes.push("PAGEERROR " + err.message);
});
page.on("console", (msg) => {
  if (msg.type() === "error" && !msg.text().includes("ERR_FAILED")) notes.push("CONSOLE " + msg.text());
});

const shots = [
  ["cases", "ar", 1440, 900],
  ["cases", "ar", 1280, 800],
  ["cases", "ar", 768, 1024],
  ["cases", "ar", 390, 844],
  ["cases", "en", 1440, 900],
  ["cases/patchouli", "ar", 1440, 900],
  ["cases/patchouli", "ar", 768, 1024],
  ["cases/patchouli", "ar", 390, 844],
  ["cases/bloom", "en", 1440, 900],
  ["cases/bloom", "en", 390, 844],
  ["insights", "ar", 1440, 900],
  ["insights", "ar", 768, 1024],
  ["insights", "ar", 390, 844],
  ["insights", "en", 1440, 900],
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
  ["", "ar", 1440, 900],
  ["", "ar", 390, 844],
  ["consulting", "ar", 1440, 900],
  ["execution", "ar", 1440, 900],
  ["sectors", "ar", 1440, 900]
];

try {
  for (const [slug, lang, w, h] of shots) {
    await page.setViewportSize({ width: w, height: h });
    const path = `/${slug}?lang=${lang}`.replace(/^\/\?/, "/?");
    const res = await open(page, slug ? `/${slug}?lang=${lang}` : `/?lang=${lang}`);
    notes.push(`HTTP ${res?.status()} ${slug || "home"} ${lang} ${w}`);
    const ov = await page.evaluate(overflowCheck);
    if (ov.length) notes.push(`OVERFLOW ${slug || "home"} ${lang} ${w} ${ov.join(" | ")}`);
    const name = `${(slug || "home").replace("/", "-")}-${lang}-${w}.png`;
    await page.screenshot({ path: join(out, name), fullPage: false });
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await open(page, "/?lang=ar");
  await page.locator('a[href="/consulting"]').first().click();
  await page.waitForURL("**/consulting**");
  notes.push("FLOW1 home→consulting");
  await page.locator(".next-steps a[href*='/cases/'], .service-canvas a[href*='/cases/']").first().click();
  await page.waitForURL("**/cases/**");
  notes.push("FLOW1 consulting→case " + page.url());
  await page.locator('a.btn--gold[href="/contact"]').first().click();
  await page.waitForURL("**/contact**");
  notes.push("FLOW1 case→contact");
  await page.locator("#name").fill("Haidara Test");
  await page.locator("#email").fill("haidara@example.com");
  await page.locator("#company").fill("Elite Maison QA");
  await page.locator("#message").fill("Need a clearer growth decision.");
  await page.locator('button[type="submit"]').first().click();
  await page.waitForSelector(".timing-step, .step-meter__bar[data-step='2']");
  notes.push("FLOW1 contact step2 " + (await page.locator(".timing-step").count()));
  await page.locator('button[type="submit"]').first().click();
  await page.waitForSelector(".form-success");
  notes.push("FLOW1 form success " + (await page.locator(".form-success").count()));

  await open(page, "/?lang=en");
  await page.locator('.paths-split a[href="/execution"]').click();
  await page.waitForURL("**/execution**");
  notes.push("FLOW2 home→execution");
  await page.waitForSelector(".exec-mod");
  await page.locator(".exec-mod a[href*='/cases/']").first().scrollIntoViewIfNeeded();
  await page.locator(".exec-mod a[href*='/cases/']").first().click();
  await page.waitForURL("**/cases/**");
  notes.push("FLOW2 execution→case " + page.url());
  await page.locator('a.btn--gold[href="/contact"]').first().click();
  await page.waitForURL("**/contact**");
  notes.push("FLOW2 case→contact");

  await open(page, "/insights?lang=ar");
  await page.locator('a[href="/insights/growth-guide"]').first().click();
  await page.waitForURL("**/insights/growth-guide**");
  notes.push("FLOW3 insights→detail");
  await page.locator(".next-steps a").first().click();
  notes.push("FLOW3 detail→capability " + page.url());
  await page.locator('a.btn--gold[href="/contact"]').first().click();
  await page.waitForURL("**/contact**");
  notes.push("FLOW3 capability→contact");

  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, "/?lang=ar");
  await page.locator(".nav__menu").click();
  await page.locator('.drawer a[href="/cases"]').click();
  await page.waitForURL("**/cases**");
  notes.push("FLOW4 menu→cases");
  await page.locator('a[href="/cases/patchouli"]').first().click();
  await page.waitForURL("**/cases/patchouli**");
  notes.push("FLOW4 cases→patchouli");
  await page.waitForSelector("main .cta-band a.btn--gold[href='/contact']");
  await page.locator("main .cta-band a.btn--gold[href='/contact']").click();
  await page.waitForURL("**/contact**");
  notes.push("FLOW4 patchouli→contact");

  await page.setViewportSize({ width: 1440, height: 900 });
  await open(page, "/cases?lang=en");
  await page.locator('a[href="/cases/patchouli"]').first().click();
  await page.waitForURL("**/cases/patchouli**");
  await page.goBack();
  notes.push("BACK from patchouli " + page.url());
  await page.goForward();
  notes.push("FORWARD to " + page.url());

  await open(page, "/contact?lang=en");
  await page.locator('button.path-btn').nth(1).click();
  notes.push("PATH inquiry " + page.url());
  await page.locator("#name").fill("A");
  await page.locator('button[type="submit"]').click();
  const invalid = await page.locator("[aria-invalid='true']").count();
  notes.push("VALIDATION inquiry invalid " + invalid);

  await open(page, "/cases?lang=en");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  notes.push("KEYBOARD focus " + (await page.evaluate(() => document.activeElement?.tagName + " " + (document.activeElement?.getAttribute("href") || document.activeElement?.className || ""))));

  const cards = await page.locator(".frame, .door-card, .swipe-card").count();
  notes.push("CARDS on cases " + cards);

  await open(page, "/contact?lang=ar");
  await page.locator(".contact-form").scrollIntoViewIfNeeded();
  await page.screenshot({ path: join(out, "contact-form-ar-1440.png") });
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, "/contact?lang=ar");
  await page.locator(".contact-form").scrollIntoViewIfNeeded();
  await page.screenshot({ path: join(out, "contact-form-ar-390.png") });
  await page.setViewportSize({ width: 1440, height: 900 });
  await open(page, "/cases/patchouli?lang=ar");
  await page.screenshot({ path: join(out, "case-patchouli-hero-ar-1440.png") });

  await open(page, "/contact?lang=ar");
  notes.push("DOCK on contact " + (await page.locator(".contact-dock").count()));
} catch (err) {
  notes.push("FAIL " + (err && err.message ? err.message : String(err)));
} finally {
  writeFileSync(join(out, "notes.txt"), notes.join("\n") + "\n");
  console.log(notes.join("\n"));
  await browser.close();
}
