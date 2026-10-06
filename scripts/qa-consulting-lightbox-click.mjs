#!/usr/bin/env node
/**
 * Regression: Consulting gallery clicks must show a visibly rendered lightbox panel.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE = process.env.QA_BASE || "http://127.0.0.1:5174";
const SHOT_DIR = path.join(process.cwd(), "scripts", ".qa-lightbox-capture");
const ANIM_MS = 280;
const SCROLL_TOLERANCE = 28;

async function assertPanelVisuallyOpen(page, label) {
  await page.waitForFunction(
    () => {
      const panel = document.querySelector(".consulting-lightbox__panel");
      if (!panel) return false;
      return parseFloat(getComputedStyle(panel).opacity) >= 0.95;
    },
    null,
    { timeout: 5000 }
  );
  const result = await page.evaluate(() => {
    const dialog = document.querySelector("dialog.consulting-lightbox");
    const panel = dialog?.querySelector(".consulting-lightbox__panel");
    const h2 = dialog?.querySelector(".consulting-lightbox__title");
    const close = dialog?.querySelector(".consulting-lightbox__close");
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const fail = (reason, extra = {}) => ({ ok: false, reason, ...extra });

    if (!dialog?.open) return fail("dialog.open false");
    if (!panel) return fail("panel missing");

    const dcs = getComputedStyle(dialog);
    const pcs = getComputedStyle(panel);
    const pr = panel.getBoundingClientRect();
    const hr = h2?.getBoundingClientRect();
    const cr = close?.getBoundingClientRect();

    const inViewport =
      pr.width > 0 &&
      pr.height > 0 &&
      pr.bottom > 0 &&
      pr.top < vh &&
      pr.right > 0 &&
      pr.left < vw;

    const probeX = cr ? cr.left + cr.width / 2 : pr.left + Math.min(80, pr.width / 2);
    const probeY = cr ? cr.top + cr.height / 2 : pr.top + 40;
    const hit = document.elementFromPoint(probeX, probeY);
    const hitInPanel = Boolean(hit && panel.contains(hit));

    const backdrop = getComputedStyle(dialog, "::backdrop");
    const panelBg = pcs.backgroundColor;
    const backdropBg = backdrop.backgroundColor;

    if (pr.width < 300) return fail("panel width < 300", { w: pr.width });
    if (pr.height < 200) return fail("panel height < 200", { h: pr.height });
    if (!inViewport) return fail("panel outside viewport", { pr: { top: pr.top, left: pr.left } });
    if (pcs.display === "none") return fail("panel display none");
    if (pcs.visibility !== "visible") return fail("panel visibility not visible", { visibility: pcs.visibility });
    if (parseFloat(pcs.opacity) < 0.95) return fail("panel opacity too low", { opacity: pcs.opacity });
    if (!h2 || !hr || hr.width < 1 || hr.height < 1) return fail("h2 missing or zero box");
    if (hr.top < pr.top || hr.bottom > pr.bottom) return fail("h2 outside panel");
    if (!close || !cr || cr.width < 1 || cr.height < 1) return fail("close missing or zero box");
    if (cr.top < pr.top || cr.bottom > pr.bottom) return fail("close outside panel");
    if (hit && !hitInPanel) {
      return fail("elementFromPoint probe outside panel", {
        hit: `${hit.tagName}.${hit.className}`
      });
    }
    if (panelBg === backdropBg && panelBg !== "rgba(0, 0, 0, 0)") {
      return fail("panel indistinguishable from backdrop bg");
    }

    return {
      ok: true,
      title: h2.textContent?.trim() ?? "",
      dialogTop: pr.top,
      panelOpacity: pcs.opacity,
      scrollY: window.scrollY
    };
  });

  if (!result.ok) {
    throw new Error(`${label}: ${result.reason} ${JSON.stringify(result)}`);
  }
  return result;
}

async function snapshotHistoryState(page) {
  return page.evaluate(() => {
    const dialog = document.querySelector("dialog.consulting-lightbox");
    return {
      url: location.href,
      hash: location.hash,
      dialogOpen: Boolean(dialog?.open),
      isVisible: Boolean(dialog?.classList.contains("is-visible")),
      scrollY: window.scrollY
    };
  });
}

function assertHistoryCoherent(label, state, expectOpen) {
  if (state.dialogOpen && !state.isVisible) {
    throw new Error(`${label}: dialog.open without .is-visible`);
  }
  if (expectOpen === false && state.dialogOpen) {
    throw new Error(`${label}: expected dialog closed, got open url=${state.url}`);
  }
  if (expectOpen === true && !state.dialogOpen) {
    throw new Error(`${label}: expected dialog open url=${state.url}`);
  }
}

async function waitModalClosed(page) {
  await page.waitForFunction(() => !document.querySelector("dialog.consulting-lightbox")?.open, null, {
    timeout: 5000
  });
  await page.waitForTimeout(ANIM_MS);
}

async function closeDialog(page) {
  await page.keyboard.press("Escape");
  await waitModalClosed(page);
}

async function scrollGalleryIntoView(page) {
  await page.locator(".consulting-gallery__grid").scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    const grid = document.querySelector(".consulting-gallery__grid");
    if (!grid) return;
    const top = grid.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo(0, Math.max(0, top));
  });
  await page.waitForTimeout(120);
}

async function assertAfterClose(page, label, beforeY, serviceId) {
  const after = await page.evaluate((id) => {
    const trigger = document.querySelector(`.consulting-gallery__card[data-service-id="${id}"]`);
    const tr = trigger?.getBoundingClientRect();
    const vh = window.innerHeight;
    return {
      scrollY: window.scrollY,
      hash: location.hash,
      dialogOpen: Boolean(document.querySelector("dialog.consulting-lightbox")?.open),
      focusIsTrigger: trigger === document.activeElement,
      triggerInViewport: Boolean(
        tr && tr.width > 0 && tr.height > 0 && tr.bottom > 0 && tr.top < vh && tr.right > 0 && tr.left < window.innerWidth
      )
    };
  }, serviceId);

  if (after.dialogOpen) throw new Error(`${label}: dialog still open`);
  if (after.hash) throw new Error(`${label}: hash not cleared`);
  if (Math.abs(after.scrollY - beforeY) > SCROLL_TOLERANCE) {
    throw new Error(`${label}: scroll jumped ${beforeY} -> ${after.scrollY}`);
  }
  if (!after.focusIsTrigger) throw new Error(`${label}: focus not on originating card`);
  if (!after.triggerInViewport) throw new Error(`${label}: originating card not in viewport`);
  return { beforeY, afterY: after.scrollY, delta: after.scrollY - beforeY };
}

async function closeModalByMethod(page, method) {
  if (method === "close") {
    const box = await page.locator(".consulting-lightbox__close").boundingBox();
    if (!box) throw new Error("close button has no bounding box");
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  } else if (method === "escape") {
    await page.keyboard.press("Escape");
  } else if (method === "backdrop") {
    await page.mouse.click(10, 10);
  } else {
    throw new Error(`unknown close method ${method}`);
  }
  await waitModalClosed(page);
}

async function runScrollPreservation(lang, viewport) {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport })).newPage();
  await page.goto(`${BASE}/${lang}/consulting`, { waitUntil: "networkidle" });
  await scrollGalleryIntoView(page);

  const results = {};
  for (const method of ["close", "escape", "backdrop"]) {
    await scrollGalleryIntoView(page);
    const beforeY = await page.evaluate(() => window.scrollY);
    await clickCardByServiceId(page, "growth");
    await assertPanelVisuallyOpen(page, `${lang} scroll-open ${method}`);
    await closeModalByMethod(page, method);
    results[method] = await assertAfterClose(page, `${lang} ${method}`, beforeY, "growth");
  }

  await scrollGalleryIntoView(page);
  const beforeNav = await page.evaluate(() => window.scrollY);
  await clickCardByServiceId(page, "growth");
  for (let i = 0; i < 4; i++) {
    await page.locator(".consulting-lightbox__nav-btn--next").click();
    await page.waitForTimeout(50);
  }
  await closeModalByMethod(page, "close");
  results.afterNavClose = await assertAfterClose(page, `${lang} after-nav close`, beforeNav, "growth");

  await browser.close();
  return results;
}

async function clickCardByServiceId(page, id) {
  await page.evaluate((sid) => {
    document.querySelector(`.consulting-gallery__card[data-service-id="${sid}"]`)?.click();
  }, id);
  await page.locator("dialog.consulting-lightbox[open]").waitFor({ state: "attached", timeout: 5000 });
}

async function runUserFlow(page, lang, viewport) {
  await page.setViewportSize(viewport);
  await page.goto(`${BASE}/${lang}/consulting`, { waitUntil: "networkidle" });
  fs.mkdirSync(SHOT_DIR, { recursive: true });
  await page.screenshot({ path: path.join(SHOT_DIR, `${lang}-${viewport.width}-A-gallery.png`) });

  const sequence = ["growth", "product", "executive", "growth"];
  for (const [idx, id] of sequence.entries()) {
    await clickCardByServiceId(page, id);
    await assertPanelVisuallyOpen(page, `${lang} ${viewport.width} open ${id}`);
    const shot = idx === 0 ? "B-growth" : id === "product" ? "C-product" : id === "executive" ? "D-executive" : "B-growth-again";
    await page.screenshot({ path: path.join(SHOT_DIR, `${lang}-${viewport.width}-${shot}.png`) });
    await closeDialog(page);
  }
  await page.screenshot({ path: path.join(SHOT_DIR, `${lang}-${viewport.width}-E-after-close.png`) });

  await clickCardByServiceId(page, "growth");
  await assertPanelVisuallyOpen(page, `${lang} nav open`);
  for (let n = 0; n < 4; n++) {
    await page.locator(".consulting-lightbox__nav-btn--next").click();
    await page.waitForTimeout(60);
    await assertPanelVisuallyOpen(page, `${lang} after next ${n + 1}`);
  }
  await page.locator(".consulting-lightbox__dot").nth(2).click();
  await assertPanelVisuallyOpen(page, `${lang} after dot`);
  await closeDialog(page);
  await clickCardByServiceId(page, "sales");
  await assertPanelVisuallyOpen(page, `${lang} immediate reopen`);

  const overflow = await page.evaluate(() => ({
    doc: document.documentElement.scrollWidth > window.innerWidth + 1,
    scrollY: window.scrollY
  }));

  return { overflow: overflow.doc, scrollY: overflow.scrollY };
}

async function runDeepLinks(page) {
  const ids = ["growth", "product", "executive"];
  for (const id of ids) {
    await page.goto(`${BASE}/en/consulting#${id}`, { waitUntil: "networkidle" });
    await assertPanelVisuallyOpen(page, `deep link ${id}`);
    await closeDialog(page);
  }
}

async function runHistoryEn() {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto(`${BASE}/en/consulting`, { waitUntil: "networkidle" });
  await clickCardByServiceId(page, "growth");
  await assertPanelVisuallyOpen(page, "history growth");
  await page.locator(".consulting-lightbox__nav-btn--next").click();
  await page.waitForTimeout(80);
  await page.locator(".consulting-lightbox__nav-btn--next").click();
  await assertPanelVisuallyOpen(page, "history expansion");
  await closeDialog(page);
  await page.goBack();
  const back = await snapshotHistoryState(page);
  assertHistoryCoherent("EN Back", back, false);
  await page.goForward();
  const forward = await snapshotHistoryState(page);
  assertHistoryCoherent("EN Forward", forward, false);
  await browser.close();
  return { back, forward };
}

async function runStress(path, lang) {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
  let stressOk = 0;
  for (let n = 0; n < 20; n++) {
    const i = n % 8;
    await page.locator(".consulting-gallery__card").nth(i).click();
    try {
      await assertPanelVisuallyOpen(page, `${lang} stress ${n}`);
      stressOk += 1;
    } catch {
      /* fail */
    }
    if (await page.evaluate(() => document.querySelector("dialog.consulting-lightbox")?.open)) {
      await closeDialog(page);
    }
  }
  await browser.close();
  return { lang, errors, stressOk };
}

const viewports = [
  { lang: "en", size: { width: 1440, height: 900 } },
  { lang: "en", size: { width: 1024, height: 768 } },
  { lang: "en", size: { width: 390, height: 844 } },
  { lang: "ar", size: { width: 1440, height: 900 } },
  { lang: "ar", size: { width: 390, height: 844 } }
];

const browser = await chromium.launch();
const context = await browser.newContext();
const flowPage = await context.newPage();
const responsive = {};
for (const vp of viewports) {
  responsive[`${vp.lang}-${vp.size.width}`] = await runUserFlow(flowPage, vp.lang, vp.size);
}
await runDeepLinks(flowPage);
await browser.close();

const historyEn = await runHistoryEn();
const scrollEn = await runScrollPreservation("en", { width: 1440, height: 900 });
const scrollAr = await runScrollPreservation("ar", { width: 390, height: 844 });
const en = await runStress("/en/consulting", "EN");
const ar = await runStress("/ar/consulting", "AR");

const pass = en.stressOk === 20 && ar.stressOk === 20 && en.errors.length === 0 && ar.errors.length === 0;
console.log(
  JSON.stringify({ base: BASE, responsive, scrollPreservation: { en: scrollEn, ar: scrollAr }, historyEn, en, ar, pass, shots: SHOT_DIR }, null, 2)
);
if (!pass) process.exit(1);
