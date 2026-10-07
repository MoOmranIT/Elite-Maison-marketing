import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const BASE = process.env.EM_DEV_URL || "http://127.0.0.1:5174";
mkdirSync(DIR, { recursive: true });

const SECTORS = [
  "healthcare",
  "fmcg",
  "hospitality",
  "retail",
  "ecommerce",
  "education"
];

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle" });
await page.waitForFunction(() => matchMedia("(hover: hover) and (pointer: fine)").matches);

await page.locator(".sectors-navigator").scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.evaluate(() => window.scrollBy(0, 120));
await page.waitForTimeout(300);

const baselineY = await page.evaluate(() => window.scrollY);
const rows = () => page.locator(".sectors-navigator__row");
const table = [];

for (let i = 0; i < SECTORS.length; i++) {
  const before = await page.evaluate(() => window.scrollY);
  await rows().nth(i).hover();
  await page.waitForTimeout(350);
  await rows().nth(i).click();
  await page.waitForTimeout(400);
  const after = await page.evaluate(() => ({
    y: window.scrollY,
    hash: location.hash
  }));
  table.push({
    sector: SECTORS[i],
    scrollYBefore: before,
    scrollYAfter: after.y,
    delta: Math.abs(after.y - before),
    hash: after.hash,
    result: Math.abs(after.y - before) <= 2 && after.hash === `#${SECTORS[i]}` ? "PASS" : "FAIL"
  });
}

// Preview over committed flow
await page.locator(".sectors-navigator__row").nth(0).click();
await page.waitForTimeout(550);
await page.locator(".sectors-navigator__row").nth(3).hover();
await page.waitForTimeout(600);
const previewOver = await page.evaluate(() => ({
  hash: location.hash,
  title: document.getElementById("sectors-navigator-detail-title")?.textContent?.trim(),
  active: document.querySelector(".sectors-navigator__row.is-active .sectors-navigator__name")?.textContent?.trim(),
  preview: document.querySelector(".sectors-navigator__row.is-preview .sectors-navigator__name")?.textContent?.trim()
}));
await page.mouse.move(8, 8);
await page.waitForTimeout(500);
const afterLeave = await page.evaluate(() => ({
  hash: location.hash,
  title: document.getElementById("sectors-navigator-detail-title")?.textContent?.trim(),
  preview: document.querySelector(".sectors-navigator__row.is-preview")
}));

// History stack (replace)
const historyLenAfterClicks = await page.evaluate(() => window.history.length);

// Arabic anchor
const arPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await arPage.goto(`${BASE}/ar/sectors#healthcare`, { waitUntil: "networkidle" });
await arPage.waitForTimeout(600);
const arHealthcare = await arPage.evaluate(() => {
  const plate = document.getElementById("healthcare");
  if (!plate) return { ok: false, reason: "no plate" };
  const r = plate.getBoundingClientRect();
  return { ok: r.top < 200 && r.top > -50, top: r.top };
});
await arPage.goto(`${BASE}/ar/sectors#retail`, { waitUntil: "networkidle" });
await arPage.waitForTimeout(600);
const arRetail = await arPage.evaluate(() => {
  const plate = document.getElementById("retail");
  if (!plate) return { ok: false };
  const r = plate.getBoundingClientRect();
  return { ok: r.top < 200 && r.top > -80, top: r.top };
});

// Mobile tap
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
await mobile.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle" });
await mobile.evaluate(() => window.scrollTo(0, 500));
await mobile.waitForTimeout(300);
const mobBefore = await mobile.evaluate(() => window.scrollY);
await mobile.locator(".sectors-navigator__row").nth(1).tap();
await mobile.waitForTimeout(500);
const mobAfter = await mobile.evaluate(() => ({ y: window.scrollY, hash: location.hash }));

// Screenshots (EN)
const shotPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const cdp = await shotPage.context().newCDPSession(shotPage);
await shotPage.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle" });
await shotPage.locator(".sectors-navigator").scrollIntoViewIfNeeded();
await shotPage.screenshot({ path: join(DIR, "click-ux-idle-helper.png") });
await shotPage.locator(".sectors-navigator__row").nth(0).click();
await shotPage.waitForTimeout(500);
await shotPage.screenshot({ path: join(DIR, "click-ux-committed-healthcare.png") });
await shotPage.locator(".sectors-navigator__row").nth(3).hover();
await shotPage.waitForTimeout(550);
const { data: eData } = await cdp.send("Page.captureScreenshot", { format: "png" });
writeFileSync(join(DIR, "click-ux-retail-preview-over-healthcare.png"), Buffer.from(eData, "base64"));
await shotPage.locator(".sectors-navigator__row").nth(3).click();
await shotPage.waitForTimeout(500);
await shotPage.screenshot({ path: join(DIR, "click-ux-committed-retail.png") });

const report = {
  baselineScrollY: baselineY,
  sectorTable: table,
  previewOverCommitted: previewOver,
  afterLeaveRetail: afterLeave,
  historyLength: historyLenAfterClicks,
  arabic: { healthcare: arHealthcare, retail: arRetail },
  mobile: { scrollBefore: mobBefore, ...mobAfter, delta: Math.abs(mobAfter.y - mobBefore) }
};
writeFileSync(join(DIR, "scroll-preserve-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

await browser.close();
