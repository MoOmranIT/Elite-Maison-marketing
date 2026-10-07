import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const BASE = process.env.EM_DEV_URL || "http://127.0.0.1:5174";
mkdirSync(DIR, { recursive: true });

const SECTORS = ["healthcare", "fmcg", "hospitality", "retail", "ecommerce", "education"];
const DESKTOP = [1440, 1280, 1024, 820];
const report = { maxPerSector: {}, stability: {}, overflow: {}, hoverStability: null, regression: {} };

const browser = await chromium.launch({ headless: true });
const cdp = await browser.newContext();

async function stageH(page) {
  return page.evaluate(() => {
    const s = document.querySelector(".sectors-navigator__stage");
    const r = s?.getBoundingClientRect();
    return r ? Math.round(r.height) : null;
  });
}

async function clipCheck(page) {
  return page.evaluate(() => {
    const stage = document.querySelector(".sectors-navigator__stage");
    const inner = document.querySelector(".sectors-navigator__detail-inner");
    if (!stage || !inner) return { ok: true };
    const sr = stage.getBoundingClientRect();
    const ir = inner.getBoundingClientRect();
    const clipped = ir.bottom > sr.bottom + 1;
    return { ok: !clipped, innerBottom: Math.round(ir.bottom), stageBottom: Math.round(sr.bottom) };
  });
}

for (const w of DESKTOP) {
  const page = await cdp.newPage({ viewport: { width: w, height: 1400 } });
  report.maxPerSector[w] = {};
  const heights = {};
  for (const id of SECTORS) {
    await page.goto(`${BASE}/en/sectors#${id}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(200);
    const h = await stageH(page);
    const clip = await clipCheck(page);
    report.maxPerSector[w][id] = { stageH: h, clip };
    heights[id] = h;
  }
  await page.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle" });
  heights.idle = await stageH(page);
  await page.goto(`${BASE}/en/sectors#healthcare`, { waitUntil: "networkidle" });
  heights.healthcare = await stageH(page);
  await page.goto(`${BASE}/en/sectors#hospitality`, { waitUntil: "networkidle" });
  heights.hospitality = await stageH(page);
  await page.goto(`${BASE}/en/sectors#retail`, { waitUntil: "networkidle" });
  heights.retail = await stageH(page);
  await page.goto(`${BASE}/en/sectors#education`, { waitUntil: "networkidle" });
  heights.education = await stageH(page);
  const vals = Object.values(heights).filter((v) => typeof v === "number");
  const maxDelta = Math.max(...vals) - Math.min(...vals);
  report.stability[w] = { ...heights, maxDelta, pass: maxDelta <= 1 };
  await page.close();
}

const hoverPage = await cdp.newPage({ viewport: { width: 1440, height: 1400 } });
await hoverPage.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle" });
await hoverPage.waitForFunction(() => matchMedia("(hover: hover) and (pointer: fine)").matches);
await hoverPage.locator(".sectors-navigator").scrollIntoViewIfNeeded();
const rows = hoverPage.locator(".sectors-navigator__row");
const nextTop = async () =>
  hoverPage.evaluate(() => {
    const nav = document.querySelector(".sectors-navigator");
    const section = document.getElementById("sectors");
    const cta = document.querySelector(".cta-band");
    const el = cta || section?.nextElementSibling;
    const after = nav?.parentElement?.nextElementSibling;
    const target = after || el;
    return target ? Math.round(target.getBoundingClientRect().top + window.scrollY) : null;
  });
const hoverStates = [];
const record = async (name, fn) => {
  const stageH = await hoverPage.evaluate(() =>
    Math.round(document.querySelector(".sectors-navigator__stage")?.getBoundingClientRect().height ?? 0)
  );
  const next = await nextTop();
  hoverStates.push({ state: name, stageH, nextSectionTop: next });
  if (fn) await fn();
  await hoverPage.waitForTimeout(450);
};
await record("idle");
await record("hover-healthcare", () => rows.nth(0).hover());
await record("hover-hospitality", () => rows.nth(2).hover());
await record("hover-retail", () => rows.nth(3).hover());
await record("leave-idle", () => hoverPage.mouse.move(8, 8));
const tops = hoverStates.map((s) => s.nextSectionTop);
const topDelta = Math.max(...tops) - Math.min(...tops);
report.hoverStability = { rows: hoverStates, topDelta, pass: topDelta <= 1 };
await hoverPage.close();

for (const w of [1440, 1280, 1024, 820, 768, 390]) {
  const page = await cdp.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(`${BASE}/en/sectors#retail`, { waitUntil: "networkidle" });
  report.overflow[w] = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    delta: document.documentElement.scrollWidth - document.documentElement.clientWidth
  }));
  await page.close();
}

const reg = await cdp.newPage({ viewport: { width: 1440, height: 900 } });
await reg.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle" });
await reg.locator(".sectors-navigator").scrollIntoViewIfNeeded();
await reg.evaluate(() => window.scrollBy(0, 120));
const y0 = await reg.evaluate(() => window.scrollY);
await reg.locator(".sectors-navigator__row").nth(0).click();
await reg.waitForTimeout(400);
report.regression.scroll = Math.abs((await reg.evaluate(() => window.scrollY)) - y0) <= 2 ? "PASS" : "FAIL";
report.regression.hint = await reg.locator(".sectors-navigator__brand-hint").textContent();
await reg.close();

writeFileSync(join(DIR, "stabilization-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

const shotCtx = await browser.newContext({ viewport: { width: 1440, height: 1400 } });
const shotPage = await shotCtx.newPage();
const cdpS = await shotCtx.newCDPSession(shotPage);
const clipNav = async (name) => {
  const box = await shotPage.locator(".sectors-navigator").boundingBox();
  if (!box) return;
  const { data } = await cdpS.send("Page.captureScreenshot", {
    format: "png",
    clip: { x: box.x, y: box.y, width: box.width, height: box.height, scale: 1 }
  });
  writeFileSync(join(DIR, name), Buffer.from(data, "base64"));
};
await shotPage.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle" });
await shotPage.waitForFunction(() => matchMedia("(hover: hover) and (pointer: fine)").matches);
await clipNav("stabilize-1440-idle.png");
for (const [i, id] of [[0, "healthcare"], [2, "hospitality"], [3, "retail"]]) {
  await shotPage.locator(".sectors-navigator__row").nth(i).hover();
  await shotPage.waitForTimeout(500);
  await clipNav(`stabilize-1440-hover-${id}.png`);
}
await shotCtx.close();

const w820 = await browser.newPage({ viewport: { width: 820, height: 1400 } });
await w820.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle" });
await w820.screenshot({ path: join(DIR, "stabilize-820-idle.png") });
await w820.goto(`${BASE}/en/sectors#hospitality`, { waitUntil: "networkidle" });
await w820.screenshot({ path: join(DIR, "stabilize-820-hospitality.png") });
await w820.close();

const m390 = await browser.newPage({ viewport: { width: 390, height: 1200 } });
await m390.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle" });
await m390.screenshot({ path: join(DIR, "stabilize-390-idle.png") });
await m390.goto(`${BASE}/en/sectors#retail`, { waitUntil: "networkidle" });
await m390.screenshot({ path: join(DIR, "stabilize-390-retail.png") });
await m390.close();

await browser.close();
