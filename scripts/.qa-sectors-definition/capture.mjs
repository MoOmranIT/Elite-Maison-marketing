import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const URL = "http://127.0.0.1:5174/en/sectors";
const widths = [1440, 1280, 1024, 820, 768, 390];
const shots = [1440, 820, 390];

const browser = await chromium.launch();
const report = {};

for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForSelector(".sectors-definition__frame");
  if (shots.includes(w)) {
    await page.screenshot({ path: join(DIR, `sectors-intro-${w}.png`), fullPage: false });
  }
  const m = await page.evaluate(() => {
    const frame = document.querySelector(".sectors-definition__frame");
    const grid = document.querySelector(".sectors-definition__grid");
    const items = [...document.querySelectorAll(".sectors-definition__item")];
    const divider = document.querySelector(".sectors-definition__divider");
    const what = document.querySelector(".sectors-definition__title-lead");
    const which = document.querySelectorAll(".sectors-definition__title-lead")[1];
    const rest = document.querySelector(".sectors-definition__title-rest");
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    };
    const cs = (el) => (el ? parseFloat(getComputedStyle(el).fontSize) : null);
    const gridCols = grid ? getComputedStyle(grid).gridTemplateColumns : "";
    const stacked = gridCols === "none" || gridCols.split(" ").length <= 1;
    return {
      frame: rect(frame),
      leftCol: rect(items[0]),
      rightCol: rect(items[1]),
      divider: rect(divider),
      whatFont: cs(what),
      whichFont: cs(which),
      restFont: cs(rest),
      gridTemplateColumns: gridCols,
      docScrollWidth: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
      hasGeoAnswer: !!document.querySelector(".geo-answer"),
      sectionIntro: !!document.querySelector(".section-intro"),
      meaningCount: document.body.innerText.split("Sector experience meaning").length - 1
    };
  });
  report[w] = m;
  await page.close();
}

writeFileSync(join(DIR, "metrics.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
