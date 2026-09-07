import { chromium } from "playwright";
import { readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const svg = readFileSync(join(process.cwd(), "public/assets/images/og-share.svg"), "utf8");
const out = join(process.cwd(), "public/assets/images/og-share.png");
mkdirSync(join(process.cwd(), "public/assets/images"), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(`<!doctype html><html><head><style>
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #06182D; }
  svg { display: block; width: 1200px; height: 630px; }
</style></head><body>${svg}</body></html>`);
await page.locator("svg").screenshot({ path: out, type: "png" });
await browser.close();
console.log("wrote", out);
