import { chromium } from "playwright";

const BASE = process.env.EM_DEV_URL || "http://127.0.0.1:5174";
const SECTORS = ["healthcare", "fmcg", "hospitality", "retail", "ecommerce", "education"];
const WIDTHS = [1440, 1280, 1024, 820];

const browser = await chromium.launch({ headless: true });
const out = {};

for (const w of WIDTHS) {
  const page = await browser.newPage({ viewport: { width: w, height: 1200 } });
  out[w] = { sectors: {}, idle: null };
  await page.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle" });
  await page.locator(".sectors-navigator").scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  out[w].idle = await page.evaluate(() => {
    const s = document.querySelector(".sectors-navigator__stage");
    const r = s?.getBoundingClientRect();
    return r ? Math.round(r.height) : null;
  });
  for (const id of SECTORS) {
    await page.goto(`${BASE}/en/sectors#${id}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(250);
    const inner = await page.evaluate(() => {
      const stage = document.querySelector(".sectors-navigator__stage");
      const inner = document.querySelector(".sectors-navigator__detail-inner");
      const sr = stage?.getBoundingClientRect();
      const ir = inner?.getBoundingClientRect();
      const pad = stage
        ? parseFloat(getComputedStyle(stage.querySelector(".sectors-navigator__detail-surface") || stage).paddingTop || 0)
        : 0;
      const surface = document.querySelector(".sectors-navigator__detail-surface");
      const sp = surface ? getComputedStyle(surface) : null;
      const pt = sp ? parseFloat(sp.paddingTop) + parseFloat(sp.paddingBottom) : 0;
      const pl = sp ? parseFloat(sp.paddingLeft) + parseFloat(sp.paddingRight) : 0;
      return {
        stageH: sr ? Math.round(sr.height) : null,
        innerH: ir ? Math.round(ir.height) : null,
        surfacePadV: Math.round(pt),
        surfacePadH: Math.round(pl),
        needed: ir && sp ? Math.round(ir.height + pt) : null
      };
    });
    out[w].sectors[id] = inner;
  }
  await page.close();
}

console.log(JSON.stringify(out, null, 2));
await browser.close();
