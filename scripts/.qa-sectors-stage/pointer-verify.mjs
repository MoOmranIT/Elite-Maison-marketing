import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const BASE = process.env.EM_DEV_URL || "http://127.0.0.1:5174";
const WAIT_MS = 420;

mkdirSync(DIR, { recursive: true });

const report = { scenarios: {}, rowSweep: null };

const browser = await chromium.launch({
  headless: false
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  hasTouch: false
});
const page = await context.newPage();

async function snap(name) {
  await page.screenshot({ path: join(DIR, name), fullPage: false });
}

async function hash() {
  return page.evaluate(() => ({ hash: location.hash, href: location.href }));
}

async function stageMetrics() {
  return page.evaluate(() => {
    const stage = document.querySelector(".sectors-navigator__stage");
    const title = document.getElementById("sectors-navigator-detail-title");
    const idle = stage?.classList.contains("is-idle");
    const r = stage?.getBoundingClientRect();
    const preview = document.querySelector(".sectors-navigator__row.is-preview");
    const active = document.querySelector(".sectors-navigator__row.is-active");
    return {
      idle,
      stage: r ? { w: Math.round(r.width), h: Math.round(r.height) } : null,
      detailTitle: title?.textContent?.trim() || null,
      previewRow: preview?.querySelector(".sectors-navigator__name")?.textContent?.trim() || null,
      committedRow: active?.querySelector(".sectors-navigator__name")?.textContent?.trim() || null
    };
  });
}

await page.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle" });
await page.waitForSelector(".sectors-navigator__stage.is-idle");
await page.locator(".sectors-navigator").scrollIntoViewIfNeeded();
report.scenarios.A = { ...(await hash()), ...(await stageMetrics()) };
await snap("1440-idle.png");

const rows = page.locator(".sectors-navigator__row");
const healthcare = rows.nth(0);
const fmcg = rows.nth(1);
const hospitality = rows.nth(2);
const retail = rows.nth(3);

await healthcare.hover();
await page.waitForTimeout(WAIT_MS);
report.scenarios.B = { ...(await hash()), ...(await stageMetrics()) };
await snap("1440-healthcare-hover.png");

await page.mouse.move(8, 8);
await page.waitForTimeout(WAIT_MS);
report.scenarios.C = { ...(await hash()), ...(await stageMetrics()) };
await snap("1440-after-hover-leave.png");

await healthcare.click();
await page.waitForTimeout(WAIT_MS);
report.scenarios.D = { ...(await hash()), ...(await stageMetrics()) };
await snap("1440-healthcare-committed.png");

await retail.hover();
await page.waitForTimeout(WAIT_MS);
report.scenarios.E = { ...(await hash()), ...(await stageMetrics()) };
await snap("1440-retail-preview-over-healthcare.png");

await page.mouse.move(8, 8);
await page.waitForTimeout(WAIT_MS);
report.scenarios.F = { ...(await hash()), ...(await stageMetrics()) };
await snap("1440-return-to-healthcare.png");

await retail.hover();
await page.waitForTimeout(200);
await retail.click();
await page.waitForTimeout(WAIT_MS);
report.scenarios.G = { ...(await hash()), ...(await stageMetrics()) };
await snap("1440-retail-committed.png");

const sweep = [];
for (let i = 0; i < 4; i++) {
  await rows.nth(i).hover();
  await page.waitForTimeout(280);
  sweep.push({ i, ...(await stageMetrics()), ...(await hash()) });
}
report.rowSweep = sweep;

writeFileSync(join(DIR, "pointer-verify-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

await browser.close();
