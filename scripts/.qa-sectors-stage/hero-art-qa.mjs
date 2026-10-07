import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const BASE = process.env.EM_DEV_URL || "http://127.0.0.1:5173";
const WIDTHS = [1440, 1280, 1024, 820, 768, 390];

const browser = await chromium.launch({ headless: true });
const report = { en: {}, ar: {} };

function measure(page) {
  return page.evaluate(() => {
    const media = document.querySelector(".hero-media");
    const figure = document.querySelector(".sectors-hero-art, .hero-visual--atlas");
    const img = document.querySelector(".sectors-hero-art__img, .hero-visual--atlas");
    const mr = media?.getBoundingClientRect();
    const fr = figure?.getBoundingClientRect();
    const ir = img?.getBoundingClientRect();
    const bottomGap =
      media && figure ? Math.round(media.getBoundingClientRect().bottom - figure.getBoundingClientRect().bottom) : null;
    const imgGap =
      figure && ir ? Math.round(figure.getBoundingClientRect().bottom - ir.bottom) : null;
    const natural = img instanceof HTMLImageElement
      ? { w: img.naturalWidth, h: img.naturalHeight, currentSrc: img.currentSrc }
      : null;
    const doc = document.documentElement;
    return {
      hasSectorsArt: !!document.querySelector(".sectors-hero-art"),
      hasAtlas: !!document.querySelector(".hero-visual--atlas"),
      media: mr ? { w: Math.round(mr.width), h: Math.round(mr.height) } : null,
      figure: fr ? { w: Math.round(fr.width), h: Math.round(fr.height) } : null,
      img: ir ? { w: Math.round(ir.width), h: Math.round(ir.height) } : null,
      bottomGapMediaFigure: bottomGap,
      bottomGapFigureImg: imgGap,
      natural,
      overflow: doc.scrollWidth - doc.clientWidth,
      aspectOk: ir && natural
        ? Math.abs(ir.width / ir.height - natural.w / natural.h) < 0.02
        : null
    };
  });
}

for (const w of WIDTHS) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForFunction(() => {
    const img = document.querySelector(".sectors-hero-art__img");
    return img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0;
  });
  await page.waitForTimeout(500);
  report.en[w] = await measure(page);
  await page.close();
}

const arPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await arPage.goto(`${BASE}/ar/sectors`, { waitUntil: "networkidle", timeout: 30000 });
report.ar[1440] = await measure(arPage);
await arPage.close();

await browser.close();
writeFileSync(join(DIR, "hero-art-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
