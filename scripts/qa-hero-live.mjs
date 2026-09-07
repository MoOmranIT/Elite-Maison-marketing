import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.QA_BASE || "http://127.0.0.1:5176";
const out = join(process.cwd(), ".qa", "hero-live");
mkdirSync(out, { recursive: true });
const notes = [];

async function prep(page) {
  await page.route("**/*fonts.googleapis.com/**", (route) => route.abort());
  await page.route("**/*fonts.gstatic.com/**", (route) => route.abort());
}

async function open(page, path) {
  await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("h1", { timeout: 12000 });
}

function sampleMotion() {
  const visual = document.querySelector(".hero-visual");
  const layer = document.querySelector(".hero-visual__layer--path, .hero-visual__layer--frame");
  const node = document.querySelector(".hero-visual__node");
  const arch = document.querySelector(".hero-visual__arch");
  const hero = document.querySelector(".hero:not(.folio-hero)");
  const seq = document.querySelector(".hero-seq");
  const sky = document.querySelector(".skyfield__arch-live");
  const before = seq ? getComputedStyle(seq, "::before").transform : "none";
  return {
    liveVisual: visual?.classList.contains("is-live") || false,
    liveHero: hero?.classList.contains("is-live") || false,
    paused: visual?.classList.contains("is-paused") || hero?.classList.contains("is-paused") || false,
    layer: layer ? getComputedStyle(layer).transform : "missing",
    node: node ? getComputedStyle(node).transform : "missing",
    arch: arch ? getComputedStyle(arch).transform : "missing",
    sky: sky ? getComputedStyle(sky).transform : "missing",
    seqBefore: before,
    dock: Boolean(document.querySelector(".contact-dock__trigger")),
    overflow: [...document.querySelectorAll("body *")].some(
      (el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 2
        && !el.closest(".book, .skyfield")
    )
  };
}

const pages = [
  ["/ar/consulting", "consulting"],
  ["/ar/execution", "execution"],
  ["/ar/sectors", "sectors"],
  ["/ar/cases", "cases"],
  ["/ar/insights", "insights"],
  ["/ar/contact", "contact"],
  ["/ar/cases/patchouli", "case"],
  ["/ar/insights/growth-guide", "insight"],
  ["/ar/about", "about"]
];

const browser = await chromium.launch();
const page = await browser.newPage();
await prep(page);

try {
  const viewports = [
    [1440, 900],
    [1024, 900],
    [768, 1024],
    [390, 844]
  ];
  for (const [width, height] of viewports) {
    await page.setViewportSize({ width, height });
    for (const [path, name] of pages) {
      await open(page, path);
      await page.waitForTimeout(1600);
      const a = await page.evaluate(sampleMotion);
      await page.waitForTimeout(2200);
      const b = await page.evaluate(sampleMotion);
      const moved = a.layer !== b.layer || a.node !== b.node || a.arch !== b.arch || a.seqBefore !== b.seqBefore || a.sky !== b.sky;
      notes.push(
        `${width} ${name} liveV=${a.liveVisual} liveH=${a.liveHero} dock=${a.dock} overflow=${a.overflow} moved=${moved}`
      );
      if (width === 1440 || width === 390) {
        await page.screenshot({ path: join(out, `${name}-${width}.png`) });
      }
      if (a.overflow) notes.push(`OVERFLOW ${width} ${path}`);
    }
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await open(page, "/ar");
  const home = await page.evaluate(() => ({
    live: document.querySelector(".folio-hero")?.classList.contains("is-live") || false,
    visual: Boolean(document.querySelector(".hero-visual")),
    dock: Boolean(document.querySelector(".contact-dock__trigger"))
  }));
  notes.push("HOME live=" + home.live + " visual=" + home.visual + " dock=" + home.dock);

  await open(page, "/ar/consulting");
  await page.waitForTimeout(400);
  await page.locator(".contact-dock__trigger").click();
  await page.waitForSelector(".contact-dock__list");
  notes.push("DOCK open ok");
  await page.locator(".contact-dock__chip").click();
  await page.waitForTimeout(400);
  const closed = await page.evaluate(() => Boolean(document.querySelector(".contact-dock__trigger")));
  notes.push("DOCK close " + closed);

  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, "/ar/execution");
  await page.locator(".contact-dock__trigger").click();
  await page.waitForSelector(".contact-dock__list a");
  notes.push("DOCK mobile open ok");

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page, "/ar/consulting");
  await page.waitForTimeout(1800);
  const reduced = await page.evaluate(sampleMotion);
  await page.waitForTimeout(2000);
  const reduced2 = await page.evaluate(sampleMotion);
  const still = reduced.layer === reduced2.layer && reduced.node === reduced2.node;
  notes.push("REDUCED live=" + reduced.liveVisual + " static=" + still + " layer=" + reduced.layer);
  await page.emulateMedia({ reducedMotion: null });
} catch (err) {
  notes.push("FAIL " + (err && err.message ? err.message : String(err)));
} finally {
  writeFileSync(join(out, "notes.txt"), notes.join("\n") + "\n");
  console.log(notes.join("\n"));
  await browser.close();
}
