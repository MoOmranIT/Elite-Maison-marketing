import { chromium } from "playwright";
import { join } from "node:path";
import { mkdirSync, statSync } from "node:fs";

const BASE = process.env.QA_BASE || "http://127.0.0.1:5176";
const out = join(process.cwd(), ".qa", "polish");
mkdirSync(out, { recursive: true });

const png = join(process.cwd(), "public/assets/images/og-share.png");
console.log("OG_PNG_BYTES", statSync(png).size);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.route("**/*fonts.googleapis.com/**", (route) => route.abort());
await page.route("**/*fonts.gstatic.com/**", (route) => route.abort());
page.on("pageerror", (err) => console.log("PAGEERROR", err.message));

async function go(path) {
  await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("h1", { timeout: 12000 });
  await page.waitForTimeout(400);
}

await page.setViewportSize({ width: 1440, height: 900 });
await go("/en/execution");
const titleBox = await page.locator("h1").evaluate((el) => ({
  w: Math.round(el.getBoundingClientRect().width),
  h: Math.round(el.getBoundingClientRect().height),
  text: el.textContent
}));
console.log("EXEC_EN_H1", JSON.stringify(titleBox));
await page.screenshot({ path: join(out, "execution-en-1440.png") });

await go("/ar/contact?step=2");
await page.locator(".timing-step").scrollIntoViewIfNeeded();
await page.waitForTimeout(200);
await page.screenshot({ path: join(out, "contact-step2-form-ar-1440.png") });
const og = await page.evaluate(() => document.querySelector('meta[property="og:image"]')?.getAttribute("content"));
console.log("OG_IMAGE", og);

await page.setViewportSize({ width: 390, height: 844 });
await go("/ar/contact");
await page.screenshot({ path: join(out, "contact-ar-390.png") });

await page.setViewportSize({ width: 1440, height: 900 });
await go("/ar/cases/patchouli");
await page.locator(".result-statement").scrollIntoViewIfNeeded();
await page.waitForTimeout(200);
await page.screenshot({ path: join(out, "patchouli-result-ar-1440.png") });
const jsonOk = await page.evaluate(() => {
  try {
    JSON.parse(document.getElementById("em-jsonld")?.textContent || "null");
    return true;
  } catch {
    return false;
  }
});
console.log("JSONLD", jsonOk);

await go("/ar/insights");
const goldInk = await page.evaluate(() => {
  const el = document.querySelector(".editorial-row .num");
  return el ? getComputedStyle(el).color : null;
});
console.log("GOLD_INK_SAMPLE", goldInk);

await browser.close();
