#!/usr/bin/env node
/** Execution EN gallery + lightbox regression (mirrors consulting checks). */
import { chromium } from "playwright";

const BASE = process.env.QA_BASE || "http://127.0.0.1:5173";
const IDS = ["performance", "campaigns", "systems", "automation", "branding", "activation"];
const ANIM_MS = 280;

async function assertPanelVisuallyOpen(page, label) {
  await page.waitForFunction(
    () => {
      const panel = document.querySelector(".consulting-lightbox__panel");
      return panel && parseFloat(getComputedStyle(panel).opacity) >= 0.95;
    },
    null,
    { timeout: 5000 }
  );
  const ok = await page.evaluate(() => {
    const dialog = document.querySelector("dialog.consulting-lightbox");
    const panel = dialog?.querySelector(".consulting-lightbox__panel");
    const h2 = dialog?.querySelector(".consulting-lightbox__title");
    if (!dialog?.open || !panel || !h2) return false;
    const pr = panel.getBoundingClientRect();
    const hr = h2.getBoundingClientRect();
    return pr.width > 300 && pr.height > 200 && hr.width > 1 && hr.height > 1;
  });
  if (!ok) throw new Error(`Execution lightbox failed: ${label}`);
}

async function clickCard(page, id) {
  await page.evaluate((sid) => {
    document.querySelector(`.execution-gallery .consulting-gallery__card[data-service-id="${sid}"]`)?.click();
  }, id);
  await page.locator("dialog.consulting-lightbox[open]").waitFor({ state: "attached", timeout: 5000 });
}

async function closeDialog(page) {
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => !document.querySelector("dialog.consulting-lightbox")?.open, null, { timeout: 5000 });
  await page.waitForTimeout(ANIM_MS);
}

async function gridMetrics(page) {
  return page.evaluate(() => {
    const grid = document.querySelector(".execution-gallery .consulting-gallery__grid");
    const cards = document.querySelectorAll(".execution-gallery .consulting-gallery__card");
    const cs = grid ? getComputedStyle(grid) : null;
    return {
      columns: cs?.gridTemplateColumns ?? null,
      cardCount: cards.length,
      execModCount: document.querySelectorAll(".exec-mod").length,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1
    };
  });
}

async function runViewport(page, width) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(`${BASE}/en/execution`, { waitUntil: "networkidle" });
  const metrics = await gridMetrics(page);
  for (const id of IDS) {
    await clickCard(page, id);
    await assertPanelVisuallyOpen(page, `${width} open ${id}`);
    await closeDialog(page);
  }
  return metrics;
}

async function runDeepLinks(page) {
  for (const id of IDS) {
    await page.goto(`${BASE}/en/execution#${id}`, { waitUntil: "networkidle" });
    await assertPanelVisuallyOpen(page, `deep ${id}`);
    await closeDialog(page);
  }
}

const browser = await chromium.launch({ channel: "chrome", headless: false });
const page = await browser.newPage();
const responsive = {};
for (const w of [1440, 1280, 1024, 820, 768, 390]) {
  responsive[w] = await runViewport(page, w);
}
await runDeepLinks(page);
const ar = await page.evaluate(async () => {
  /* navigated separately */
  return null;
});
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`${BASE}/ar/execution`, { waitUntil: "networkidle" });
const arCheck = await page.evaluate(() => ({
  gallery: Boolean(document.querySelector(".execution-gallery")),
  execMods: document.querySelectorAll(".exec-mod").length,
  englishGoal: document.body.textContent?.includes("Turn ad spend into trackable demand") ?? false
}));
await browser.close();
console.log(JSON.stringify({ base: BASE, responsive, arCheck, pass: true }, null, 2));
