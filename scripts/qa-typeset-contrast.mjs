#!/usr/bin/env node
/**
 * Elite Maison — readable-text contrast gate (`npm run qa:typeset`).
 *
 * Regression coverage for the typeset contrast pass:
 *   - .challenge-grid .go uses readable gold-ink, not decorative gold
 *   - .section--plum .method p uses high-contrast ivory on plum
 */

import { chromium } from "playwright";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const PORT = 4179;
const BASE = `http://127.0.0.1:${PORT}`;
const out = join(ROOT, ".qa");
mkdirSync(out, { recursive: true });

const TYPESET_ROUTES = [
  { path: "/ar", lang: "ar" },
  { path: "/en", lang: "en" },
  { path: "/ar/about", lang: "ar" },
  { path: "/en/about", lang: "en" }
];

const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "768", width: 768, height: 1024 },
  { name: "390", width: 390, height: 844 }
];

const notes = [];
const failures = [];
let failCount = 0;

function note(line) { notes.push(line); }
function assert(condition, name, detail) {
  if (condition) return true;
  failCount += 1;
  const line = `FAIL ${name}${detail ? ` — ${detail}` : ""}`;
  failures.push(line);
  notes.push(line);
  return false;
}

function cssContract() {
  const siteCss = readFileSync(join(ROOT, "assets", "css", "site.css"), "utf8");
  assert(
    /\.challenge-grid\s+\.go\s*\{[^}]*color:\s*var\(--gold-ink\)/.test(siteCss),
    "css-challenge-go",
    ".challenge-grid .go must use var(--gold-ink)"
  );
  assert(
    !/\.challenge-grid\s+\.go\s*\{[^}]*color:\s*var\(--gold\)/.test(siteCss),
    "css-challenge-go-not-gold",
    ".challenge-grid .go must not use pure var(--gold)"
  );
  assert(
    /\.section--plum\s+\.method\s+article\s*>\s*p:not\(\.kicker\)[\s\S]*?color:\s*var\(--ivory\)/.test(siteCss),
    "css-plum-method-body",
    ".section--plum .method body copy must use var(--ivory)"
  );
  assert(
    !/\.section--plum\s+\.method\s+p\s*\{\s*color:\s*var\(--gold\)/.test(siteCss),
    "css-plum-method-p-not-gold",
    ".section--plum .method p must not use pure var(--gold)"
  );
  note("CSS contract checks complete");
}

async function waitForServer() {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${BASE}/en/about`);
      if (res.status > 0) return;
    } catch { /* starting */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Node production server did not start on ${BASE}`);
}

async function measureContrast(page, selector, label) {
  return page.evaluate((sel) => {
    function parseRgb(color) {
      const modernAlpha = color.match(/color\(srgb\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\s*\/\s*([0-9.]+)/);
      if (modernAlpha) {
        return {
          rgb: modernAlpha.slice(1, 4).map((v) => Math.round(Number(v) * 255)),
          alpha: Number(modernAlpha[4])
        };
      }
      const modern = color.match(/color\(srgb\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)/);
      if (modern) {
        return {
          rgb: modern.slice(1, 4).map((v) => Math.round(Number(v) * 255)),
          alpha: 1
        };
      }
      const rgba = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/);
      if (rgba) {
        return {
          rgb: [Number(rgba[1]), Number(rgba[2]), Number(rgba[3])],
          alpha: Number(rgba[4])
        };
      }
      const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return null;
      return { rgb: [Number(m[1]), Number(m[2]), Number(m[3])], alpha: 1 };
    }

    function luminance(rgb) {
      const parts = rgb.map((c) => {
        const v = c / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * parts[0] + 0.7152 * parts[1] + 0.0722 * parts[2];
    }

    function contrast(fg, bg) {
      const l1 = luminance(fg);
      const l2 = luminance(bg);
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    }

    function effectiveBackground(el) {
      let node = el;
      let rgb = [255, 255, 255];
      while (node && node !== document.documentElement) {
        const cs = getComputedStyle(node);
        const parsed = parseRgb(cs.backgroundColor);
        if (parsed && parsed.alpha > 0) {
          const a = parsed.alpha;
          rgb = parsed.rgb.map((channel, i) => Math.round(channel * a + rgb[i] * (1 - a)));
          if (a >= 0.95) break;
        }
        node = node.parentElement;
      }
      return rgb;
    }

    function effectiveForeground(el) {
      const cs = getComputedStyle(el);
      const parsed = parseRgb(cs.color);
      if (!parsed) return null;
      let rgb = parsed.rgb;
      if (parsed.alpha < 1) {
        const bg = effectiveBackground(el);
        rgb = parsed.rgb.map((channel, i) => Math.round(channel * parsed.alpha + bg[i] * (1 - parsed.alpha)));
      }
      return rgb;
    }

    const el = document.querySelector(sel);
    if (!el) return { missing: true, selector: sel };
    const cs = getComputedStyle(el);
    const fg = effectiveForeground(el);
    const bg = effectiveBackground(el);
    const ratio = fg && bg ? contrast(fg, bg) : 0;
    return {
      missing: false,
      selector: sel,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      effectiveForeground: fg ? `rgb(${fg.join(", ")})` : "unknown",
      effectiveBackground: `rgb(${bg.join(", ")})`,
      ratio: Number(ratio.toFixed(2)),
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight
    };
  }, selector);
}

async function injectChallengeGrid(page) {
  await page.evaluate(() => {
    if (document.getElementById("qa-challenge-grid")) return;
    const host = document.createElement("section");
    host.id = "qa-challenge-grid";
    host.className = "section";
    host.innerHTML = `
      <div class="shell">
        <div class="challenge-grid">
          <article>
            <span class="num">01</span>
            <h3>QA fixture</h3>
            <p>Contrast probe for readable link text.</p>
            <a class="go" href="#qa-challenge-grid"><span>Explore path</span></a>
          </article>
        </div>
      </div>`;
    document.querySelector("main")?.appendChild(host);
  });
}

async function main() {
  cssContract();
  assert(existsSync(join(ROOT, "dist", "index.html")), "dist/ exists", "run npm run build first");

  let server = null;
  try {
    server = spawn(process.execPath, [join(ROOT, "server.mjs")], {
      cwd: ROOT,
      env: { ...process.env, PORT: String(PORT) },
      stdio: "inherit",
      shell: false
    });
    await waitForServer();
    note(`SERVER production Node server running on ${BASE}`);

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    for (const route of TYPESET_ROUTES) {
      for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(`${BASE}${route.path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
        await page.waitForSelector("main", { timeout: 20000 });
        await page.waitForTimeout(500);
        await injectChallengeGrid(page);

        if (route.path.endsWith("/about")) {
          await page.waitForSelector(".section--plum .method article > p:not(.kicker)", { timeout: 20000 });
          const plum = await measureContrast(page, ".section--plum .method article > p:not(.kicker)");
          assert(!plum.missing, `plum-present ${route.path}@${vp.name}`, "missing target");
          assert(plum.ratio >= 4.5, `plum-contrast ${route.path}@${vp.name}`, `ratio=${plum.ratio} fg=${plum.color} bg=${plum.effectiveBackground}`);
          note(`PLUM ${route.path}@${vp.name} fg=${plum.color} bg=${plum.effectiveBackground} ratio=${plum.ratio}`);
        }
        const go = await measureContrast(page, "#qa-challenge-grid .challenge-grid .go");
        assert(!go.missing, `go-present ${route.path}@${vp.name}`, "missing target");
        assert(go.ratio >= 4.5, `go-contrast ${route.path}@${vp.name}`, `ratio=${go.ratio} fg=${go.color} bg=${go.effectiveBackground}`);
        note(`GO ${route.path}@${vp.name} fg=${go.color} bg=${go.effectiveBackground} ratio=${go.ratio}`);

        const goEl = page.locator("#qa-challenge-grid .challenge-grid .go");
        await goEl.focus();
        const focus = await goEl.evaluate((node) => {
          const cs = getComputedStyle(node);
          return { outlineWidth: cs.outlineWidth, outlineStyle: cs.outlineStyle, color: cs.color };
        });
        assert(parseFloat(focus.outlineWidth) >= 1.5, `go-focus ${route.path}@${vp.name}`, `${focus.outlineStyle} ${focus.outlineWidth}`);
        await goEl.hover();
        const hover = await goEl.evaluate((node) => getComputedStyle(node).color);
        note(`GO-STATES ${route.path}@${vp.name} focus=${focus.outlineWidth} hoverColor=${hover}`);
      }
    }

    await browser.close();
  } catch (err) {
    assert(false, "typeset-runtime", err instanceof Error ? err.message : String(err));
  } finally {
    if (server) server.kill();
  }

  note("");
  note("==== TYPESET SUMMARY ====");
  note(`assertion failures  : ${failCount}`);
  if (failures.length) {
    note("---- FAILURES ----");
    for (const line of failures) note(line);
  }
  note(`result              : ${failCount === 0 ? "PASS" : "FAIL"}`);

  writeFileSync(join(out, "typeset-notes.txt"), notes.join("\n") + "\n");
  console.log(notes.join("\n"));

  if (failCount > 0) {
    console.error(`\n[qa:typeset] FAIL — ${failCount} assertion failure(s). See .qa/typeset-notes.txt`);
    process.exitCode = 1;
  } else {
    console.log("\n[qa:typeset] PASS — readable-text contrast verified.");
  }
}

main();
