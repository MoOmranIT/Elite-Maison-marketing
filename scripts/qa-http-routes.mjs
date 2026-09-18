#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const ROOT = process.cwd();
const PORT = 4176;
const BASE = `http://127.0.0.1:${PORT}`;
const DIST = join(ROOT, "dist");
const routes = [
  "/ar", "/en", "/ar/about", "/en/about", "/ar/consulting", "/en/consulting",
  "/ar/execution", "/en/execution", "/ar/sectors", "/en/sectors", "/ar/cases", "/en/cases",
  "/ar/cases/patchouli", "/en/cases/patchouli", "/ar/insights", "/en/insights",
  "/ar/insights/ai-insight", "/en/insights/ai-insight", "/ar/contact", "/en/contact"
];
const legacy = [
  ["/about.html", "/about"],
  ["/case.html?id=patchouli", "/cases/patchouli"],
  ["/insight.html?id=ai-insight", "/insights/ai-insight"]
];
const unknown = "/__technical-closure-404__";
const server = spawn("node", ["node_modules/vite/bin/vite.js", "preview", "--host", "127.0.0.1", "--port", String(PORT), "--strictPort"], { cwd: ROOT, stdio: "ignore", shell: false });

const request = async (url, options = {}) => fetch(BASE + url, { redirect: "manual", ...options });
const fileFor = (route) => join(DIST, route.replace(/^\//, ""), "index.html");
const check = (condition, message) => { if (!condition) throw new Error(message); console.log(`PASS ${message}`); };

try {
  await new Promise((resolve) => setTimeout(resolve, 1800));
  for (const route of routes) {
    const res = await request(route);
    check(res.status === 200, `${route} returns 200`);
    check(await res.text().then((body) => body.includes("<title>")), `${route} contains prerendered head`);
  }
  for (const [from, target] of legacy) {
    const res = await request(from);
    if ([301, 302].includes(res.status)) {
      const location = res.headers.get("location") || "";
      check(location.endsWith(target), `${from} points to ${target} (location=${location})`);
    } else {
      console.log(`SKIP ${from} host redirect (static preview returns ${res.status}; validate .htaccess on Apache)`);
    }
  }
  const unknownResponse = await request(unknown);
  if (unknownResponse.status === 404) {
    const body = await unknownResponse.text();
    check(body.includes("noindex") || body.includes("404"), `${unknown} branded 404 body`);
  } else {
    console.log(`SKIP ${unknown} host 404 (static preview returns ${unknownResponse.status}; validate ErrorDocument on Apache)`);
  }
  for (const route of ["/ar/about", "/en/consulting", "/ar/cases/patchouli"]) {
    const slash = await request(`${route}/`);
    if ([301, 302].includes(slash.status)) {
      const location = slash.headers.get("location") || "";
      check(location.endsWith(route), `${route}/ redirects to ${route}`);
      const final = await request(location.replace(BASE, ""));
      check(final.status === 200, `${route} final response is 200`);
    } else {
      console.log(`SKIP ${route}/ host slash redirect (static preview returns ${slash.status}; validate .htaccess on Apache)`);
    }
  }
  console.log("Apache integration note: static preview route checks passed. Host redirects, ErrorDocument 404, and trailing-slash rules require Apache/GoDaddy validation; .htaccess is included in the release artifact.");
} finally {
  server.kill();
}
