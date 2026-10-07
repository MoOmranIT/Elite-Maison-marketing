import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "../../../dist");
const MIME = { ".html": "text/html", ".js": "application/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".woff2": "font/woff2" };

const server = createServer((req, res) => {
  const path = req.url?.split("?")[0] || "/";
  const file = join(ROOT, path === "/" ? "index.html" : path.replace(/^\//, ""));
  try {
    const data = readFileSync(file);
    res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
    res.end(data);
  } catch {
    const html = join(ROOT, "en", path.replace(/^\//, ""), "index.html");
    try {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(readFileSync(html));
    } catch {
      res.writeHead(404).end("not found");
    }
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;
const BASE = `http://127.0.0.1:${port}`;

const browser = await chromium.launch({ headless: true });
const report = { pages: {}, sectors: {} };

for (const path of ["/en/about/", "/en/consulting/", "/en/execution/", "/en/sectors/"]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 20000 });
  report.pages[path] = res?.status() === 200 ? "OK" : `FAIL ${res?.status()}`;
  await page.close();
}

const sp = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
await sp.goto(`${BASE}/en/sectors/`, { waitUntil: "networkidle" });
report.sectors.heroImg = await sp.evaluate(() => {
  const img = document.querySelector(".sectors-hero-art__img");
  return img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0;
});
report.sectors.definition = !!(await sp.$(".sectors-definition"));
report.sectors.navigator = !!(await sp.$(".sectors-navigator"));
report.sectors.idle = await sp.evaluate(() => document.querySelector(".sectors-navigator__stage")?.classList.contains("is-idle"));
await sp.locator(".sectors-navigator__row").nth(0).hover();
await sp.waitForTimeout(400);
report.sectors.preview = await sp.evaluate(() => !!document.querySelector(".sectors-navigator__row.is-preview"));
await sp.evaluate(() => window.scrollTo(0, 600));
const y0 = await sp.evaluate(() => scrollY);
await sp.locator(".sectors-navigator__row").nth(0).click();
await sp.waitForTimeout(400);
report.sectors.scrollDelta = Math.abs((await sp.evaluate(() => scrollY)) - y0);
report.sectors.relatedLinks = await sp.locator(".sectors-navigator__related-link").count();
report.sectors.cta = !!(await sp.$(".cta-band"));
report.sectors.faq = !!(await sp.$(".about-faq"));
await sp.close();
await browser.close();
server.close();
console.log(JSON.stringify(report, null, 2));
