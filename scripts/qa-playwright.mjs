import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.QA_BASE && /:(5173|4173)\b/.test(process.env.QA_BASE)
  ? process.env.QA_BASE
  : "http://127.0.0.1:5173";
const out = join(process.cwd(), ".qa");
mkdirSync(out, { recursive: true });

const pages = [
  "/",
  "/about",
  "/consulting",
  "/execution",
  "/sectors",
  "/cases",
  "/cases/patchouli",
  "/insights",
  "/contact",
  "/about.html"
];

const viewports = [
  { name: "1440", width: 1440, height: 900 },
  { name: "1024", width: 1024, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "390", width: 390, height: 844 }
];

const notes = [];

function overflowCheck() {
  return [...document.querySelectorAll("body *")]
    .filter((el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 2)
    .filter((el) => !el.closest(".book, .book__strip"))
    .slice(0, 8)
    .map((el) => el.tagName + "." + String(el.className).split(" ")[0]);
}

async function open(page, path) {
  const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("h1", { timeout: 20000 });
  return res;
}

// Prefer the installed system Chrome so QA does not depend on a
// version-pinned Playwright download; fall back to the default bundle.
const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
const context = await browser.newContext();
const page = await context.newPage();
page.on("pageerror", (err) => notes.push("PAGEERROR " + err.message));
page.on("console", (msg) => {
  if (msg.type() === "error") notes.push("CONSOLE " + msg.text());
});

try {
  for (const path of pages) {
    const res = await open(page, path);
    notes.push(`HTTP ${res?.status()} ${path}`);
    await page.waitForTimeout(200);
    const broken = await page.$$eval("a[href]", (as) =>
      as.filter((a) => {
        const href = a.getAttribute("href") || "";
        return href.startsWith("#") && !["#main", "#growth", "#sales", "#expansion", "#product", "#franchise", "#private-label", "#journey", "#executive", "#performance", "#campaigns", "#systems", "#automation", "#branding", "#activation"].includes(href) && !href.startsWith("#challenge") && href !== "#";
      }).map((a) => a.getAttribute("href"))
    );
    if (broken.length) notes.push(`HASH ${path} ${broken.join(",")}`);
  }

  await open(page, "/");
  notes.push("LOGO " + (await page.locator(".logo-chamber img").count()));
  await page.locator('a[href*="/consulting"]').first().click();
  await page.waitForURL("**/consulting");
  await page.waitForSelector("main h2:not(.sr-only)", { timeout: 20000 });
  notes.push("FLOW home→consulting " + page.url());
  const caseFrame = page.locator('a[href*="contact"]').first();
  await caseFrame.waitFor({ timeout: 5000 });
  await caseFrame.click();
  await page.waitForURL("**/contact**");
  notes.push("FLOW consulting→contact " + page.url());
  await open(page, "/contact");
  notes.push("FLOW contact " + page.url());
  await page.waitForTimeout(200);
  await page.locator("#name").fill("QA");
  await page.locator("#email").fill("qa@example.com");
  await page.locator("#company").fill("QA");
  await page.locator("#challenge").fill("QA challenge");
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(200);
  notes.push("FORM summary " + (await page.locator("#errorSummary").isVisible()));

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    for (const path of ["/", "/consulting", "/contact", "/cases"]) {
      await open(page, path);
      await page.waitForTimeout(200);
      const ov = await page.evaluate(overflowCheck);
      if (ov.length) notes.push(`OVERFLOW ${vp.name} ${path} ${ov.join(" | ")}`);
      const slug = path === "/" ? "home" : path.replace(/[/?=.]/g, "_");
      await page.screenshot({ path: join(out, `${slug}-${vp.name}.png`), fullPage: false });
    }
  }
} catch (err) {
  notes.push("FAIL " + err.message);
} finally {
  writeFileSync(join(out, "notes.txt"), notes.join("\n") + "\n");
  console.log(notes.join("\n"));
  await browser.close();
}
