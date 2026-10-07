import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const BASE = process.env.EM_DEV_URL || "http://127.0.0.1:5174";
mkdirSync(DIR, { recursive: true });

const VIEWPORTS = [1440, 1280, 1024, 820, 768, 390];
const SHOT_SECTORS = ["healthcare", "hospitality", "retail", "education"];
const MOBILE_SHOT = ["healthcare", "retail", "education"];

const LINKS = [
  ["healthcare", "Growth & Business Development", "/en/consulting#growth"],
  ["healthcare", "Campaign & Digital Channel Management", "/en/execution#campaigns"],
  ["healthcare", "Customer Journey & Experience", "/en/consulting#journey"],
  ["fmcg", "Growth & Business Development", "/en/consulting#growth"],
  ["fmcg", "Private Label Development", "/en/consulting#private-label"],
  ["fmcg", "Performance Marketing", "/en/execution#performance"],
  ["hospitality", "Franchise Systems Development", "/en/consulting#franchise"],
  ["hospitality", "Customer Journey & Experience", "/en/consulting#journey"],
  ["hospitality", "Marketing Activation & Performance Optimization", "/en/execution#activation"],
  ["retail", "Market Expansion & Entry", "/en/consulting#expansion"],
  ["retail", "Sales & Revenue Development", "/en/consulting#sales"],
  ["retail", "Business Systems & Marketing Operations", "/en/execution#systems"],
  ["ecommerce", "Customer Journey & Experience", "/en/consulting#journey"],
  ["ecommerce", "Performance Marketing", "/en/execution#performance"],
  ["ecommerce", "Automation & AI Solutions", "/en/execution#automation"],
  ["education", "Product & Business Model Development", "/en/consulting#product"],
  ["education", "Sales & Revenue Development", "/en/consulting#sales"],
  ["education", "Campaign & Digital Channel Management", "/en/execution#campaigns"]
];

const browser = await chromium.launch({ headless: true });
const report = { metrics: [], linkQa: [], regression: {}, screenshots: [] };

async function stageMetrics(page) {
  return page.evaluate(() => {
    const stage = document.querySelector(".sectors-navigator__stage");
    const surface = document.querySelector(".sectors-navigator__detail-surface");
    const r = stage?.getBoundingClientRect();
    const sr = surface?.getBoundingClientRect();
    const cs = surface ? getComputedStyle(surface) : null;
    return {
      stageW: r ? Math.round(r.width) : null,
      stageH: r ? Math.round(r.height) : null,
      overflowY: cs?.overflowY,
      scrollH: surface?.scrollHeight,
      clientH: surface?.clientHeight,
      bodyOverflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
}

for (const w of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(`${BASE}/en/sectors#hospitality`, { waitUntil: "networkidle" });
  await page.locator(".sectors-navigator").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const m = await stageMetrics(page);
  report.metrics.push({
    viewport: w,
    ...m,
    overflow: m.overflowY !== "visible" && m.overflowY !== "hidden" ? "scroll" : m.overflowY,
    result: m.scrollH <= m.clientH + 2 && !m.bodyOverflowX ? "PASS" : "CHECK"
  });
  if (w === 1440) {
    for (const id of SHOT_SECTORS) {
      await page.goto(`${BASE}/en/sectors#${id}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(350);
      const path = join(DIR, `detail-${id}-1440.png`);
      await page.screenshot({ path, fullPage: false });
      report.screenshots.push(path);
    }
  }
  await page.close();
}

const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
for (const id of MOBILE_SHOT) {
  await mob.goto(`${BASE}/en/sectors#${id}`, { waitUntil: "networkidle" });
  await mob.waitForTimeout(350);
  const path = join(DIR, `detail-${id}-390.png`);
  await mob.screenshot({ path, fullPage: false });
  report.screenshots.push(path);
}
await mob.close();

const linkPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const [sector, label, expectPath] of LINKS) {
  await linkPage.goto(`${BASE}/en/sectors#${sector}`, { waitUntil: "networkidle" });
  const link = linkPage.locator(".sectors-navigator__related-link", { hasText: label });
  const href = await link.getAttribute("href");
  await link.click();
  await linkPage.waitForLoadState("networkidle");
  const url = new URL(linkPage.url());
  const got = url.pathname + url.hash;
  report.linkQa.push({
    sector,
    label,
    expectPath,
    href,
    got,
    result: got === expectPath ? "PASS" : "FAIL"
  });
}
await linkPage.goto(`${BASE}/en/sectors#retail`, { waitUntil: "networkidle" });
const insight = linkPage.locator(".sectors-navigator__insight-link");
await insight.click();
await linkPage.waitForLoadState("networkidle");
const insightUrl = linkPage.url();
report.retailInsight = {
  got: insightUrl,
  expectIncludes: "/en/insights/gcc-market-entry-readiness",
  result: insightUrl.includes("/en/insights/gcc-market-entry-readiness") ? "PASS" : "FAIL"
};

const reg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await reg.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle" });
await reg.waitForFunction(() => matchMedia("(hover: hover) and (pointer: fine)").matches);
await reg.locator(".sectors-navigator").scrollIntoViewIfNeeded();
await reg.evaluate(() => window.scrollBy(0, 120));
const y0 = await reg.evaluate(() => window.scrollY);
await reg.locator(".sectors-navigator__row").nth(0).click();
await reg.waitForTimeout(400);
const y1 = await reg.evaluate(() => window.scrollY);
report.regression.scrollPreserve = Math.abs(y1 - y0) <= 2 ? "PASS" : "FAIL";
report.regression.hint = await reg.locator(".sectors-navigator__brand-hint").textContent();
await reg.close();

const ar = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await ar.goto(`${BASE}/ar/sectors#healthcare`, { waitUntil: "networkidle" });
await ar.waitForTimeout(500);
report.regression.arHealthcare = await ar.evaluate(() => {
  const plate = document.getElementById("healthcare");
  return Boolean(plate && plate.getBoundingClientRect().top < 200);
});
await ar.close();

writeFileSync(join(DIR, "detail-content-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
