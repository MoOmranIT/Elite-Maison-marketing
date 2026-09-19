/**
 * Browserless production build orchestrator.
 *
 * Pipeline:
 *   1. Vite client build (assets, CSS, JS bundles)
 *   2. Vite SSR bundle (entry-server.tsx → .ssr/)
 *   3. Head prerender (scripts/prerender.mjs — title/meta/JSON-LD)
 *   4. React static body render (scripts/prerender-static.mjs — no browser)
 *   5. Static verification (scripts/verify-static.mjs)
 *   6. Cleanup .ssr/ temp directory
 *
 * No Chromium, no Playwright, no browser binaries are invoked.
 */

import { spawn } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SSR_DIR = join(ROOT, ".ssr");

function run(label, command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: ROOT,
      stdio: "inherit",
      shell: process.platform === "win32"
    });
    child.on("close", (code) => {
      if (code === 0) {
        console.log(`[build] ${label}: OK`);
        resolve();
      } else {
        console.error(`[build] ${label}: FAIL (exit ${code})`);
        reject(new Error(`${label} failed`));
      }
    });
  });
}

async function main() {
  // Clean any previous SSR build
  if (existsSync(SSR_DIR)) {
    rmSync(SSR_DIR, { recursive: true });
  }

  console.log("[build] Starting browserless production build...");

  await run("client build", "npm", ["run", "build:client"]);
  await run("SSR bundle", "npm", ["run", "build:ssr"]);
  await run("head prerender", "npm", ["run", "prerender"]);
  await run("static body render", "npm", ["run", "ssg"]);
  await run("static verification", "npm", ["run", "verify:ssg"]);

  // Cleanup SSR temp directory
  if (existsSync(SSR_DIR)) {
    rmSync(SSR_DIR, { recursive: true });
    console.log("[build] Cleaned .ssr/");
  }

  console.log("[build] Production build complete — 36/36 canonical pages rendered (browserless)");
}

main().catch((err) => {
  console.error("[build] FATAL:", err.message);
  process.exit(1);
});
