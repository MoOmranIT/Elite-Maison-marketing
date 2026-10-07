import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const BASE = process.env.EM_DEV_URL || "http://127.0.0.1:5173";
mkdirSync(DIR, { recursive: true });

const WIDTHS = [1440, 1280, 1024, 820, 768, 390];
const report = { responsive: {}, functional: {}, regression: {} };

const browser = await chromium.launch({ headless: true });

for (const w of WIDTHS) {
  const page = await browser.newPage({ viewport: { width: w, height: w === 390 ? 1400 : 1200 } });
  await page.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle", timeout: 30000 });
  report.responsive[w] = await page.evaluate(() => {
    const cta = document.querySelector(".cta-band");
    const faq = document.querySelector(".about-faq");
    const cr = cta?.getBoundingClientRect();
    const fr = faq?.getBoundingClientRect();
    const doc = document.documentElement;
    return {
      ctaH2: document.querySelector(".cta-band h2")?.textContent?.trim(),
      ctaBtn: document.querySelector(".cta-band .btn")?.textContent?.trim(),
      ctaWidth: cr ? Math.round(cr.width) : null,
      faqPresent: !!faq,
      faqTitle: document.querySelector(".about-faq__title")?.textContent?.trim(),
      faqAfterCta: cta && faq ? faq.getBoundingClientRect().top >= cta.getBoundingClientRect().bottom - 2 : null,
      overflow: doc.scrollWidth - doc.clientWidth
    };
  });
  await page.close();
}

const desk = await browser.newPage({ viewport: { width: 1440, height: 1400 } });
await desk.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle" });
await desk.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await desk.waitForTimeout(300);
await desk.screenshot({ path: join(DIR, "sectors-cta-faq-1440-closed.png"), fullPage: false });
const faqItems = desk.locator(".about-faq__item");
await faqItems.nth(0).click();
await desk.waitForTimeout(200);
await desk.screenshot({ path: join(DIR, "sectors-faq-1440-open.png"), fullPage: false });

report.functional.desktop = [];
for (let i = 0; i < 4; i++) {
  await desk.locator(".about-faq__item").nth(i).evaluate((el) => {
    el.open = false;
  });
  const summary = desk.locator(".about-faq__item").nth(i).locator("summary");
  const q = await summary.textContent();
  await summary.click();
  await desk.waitForTimeout(150);
  const open = await desk.locator(".about-faq__item").nth(i).evaluate((el) => el.open);
  const a = await desk.locator(".about-faq__item").nth(i).locator(".about-faq__answer").textContent();
  report.functional.desktop.push({ i, q: q?.trim(), open, a: a?.trim() });
}

await desk.locator(".about-faq__item").first().evaluate((el) => { el.open = false; });
await desk.locator(".about-faq__item summary").first().focus();
await desk.keyboard.press("Enter");
await desk.waitForTimeout(150);
report.functional.keyboardEnter = await desk.locator(".about-faq__item").first().evaluate((el) => el.open);
const focusVisible = await desk.locator(".about-faq__item summary").first().evaluate((el) => {
  const s = getComputedStyle(el);
  return s.outlineStyle !== "none" || s.boxShadow !== "none";
});
report.functional.focusVisible = focusVisible;

const mob = await browser.newPage({ viewport: { width: 390, height: 1600 } });
await mob.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle" });
await mob.evaluate(() => {
  const faq = document.querySelector(".about-faq");
  faq?.scrollIntoView({ block: "start" });
});
await mob.waitForTimeout(200);
await mob.screenshot({ path: join(DIR, "sectors-cta-faq-390-closed.png") });
await mob.locator(".about-faq__item").nth(1).click();
await mob.waitForTimeout(200);
await mob.screenshot({ path: join(DIR, "sectors-faq-390-open.png") });

report.functional.mobile = [];
for (let i = 0; i < 4; i++) {
  await mob.locator(".about-faq__item").nth(i).evaluate((el) => { el.open = false; });
  await mob.locator(".about-faq__item").nth(i).locator("summary").click();
  report.functional.mobile.push(await mob.locator(".about-faq__item").nth(i).evaluate((el) => el.open));
}

const reg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await reg.goto(`${BASE}/en/sectors#retail`, { waitUntil: "networkidle" });
report.regression = await reg.evaluate(() => ({
  stageH: Math.round(document.querySelector(".sectors-navigator__stage")?.getBoundingClientRect().height ?? 0),
  helper: document.querySelector(".sectors-navigator__brand-hint")?.textContent?.trim(),
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
}));
await reg.close();

await desk.close();
await mob.close();
await browser.close();

writeFileSync(join(DIR, "cta-faq-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
