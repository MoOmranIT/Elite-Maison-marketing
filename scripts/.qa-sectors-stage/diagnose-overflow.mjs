import { chromium } from "playwright";

const BASE = process.env.EM_DEV_URL || "http://127.0.0.1:5174";
const WIDTHS = [1440, 1280, 1024, 820, 768, 390];

function offenders(page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const offenders = [];
    const walk = (el) => {
      if (!(el instanceof Element)) return;
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) {
        for (const c of el.children) walk(c);
        return;
      }
      const right = r.right;
      const left = r.left;
      if (right > vw + 0.5 || left < -0.5) {
        const sel =
          el.id ? `#${el.id}` : el.className && typeof el.className === "string"
            ? `${el.tagName.toLowerCase()}.${el.className.trim().split(/\s+/).slice(0, 2).join(".")}`
            : el.tagName.toLowerCase();
        offenders.push({
          sel,
          right: Math.round(right),
          left: Math.round(left),
          vw
        });
      }
      for (const c of el.children) walk(c);
    };
    walk(document.body);
    offenders.sort((a, b) => b.right - a.right);
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      delta: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      top: offenders.slice(0, 8)
    };
  });
}

const browser = await chromium.launch({ headless: true });
const report = {};

for (const w of WIDTHS) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(`${BASE}/en/sectors#hospitality`, { waitUntil: "networkidle" });
  report[`sectors-${w}`] = await offenders(page);
  await page.close();
}

const home = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await home.goto(`${BASE}/en/sectors`, { waitUntil: "networkidle" });
report.beforeSectorsIdle = await offenders(home);
await home.close();

console.log(JSON.stringify(report, null, 2));
await browser.close();
