#!/usr/bin/env node
import { spawn, execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const ROOT = process.cwd();
const CONF = "/mnt/c/Users/TECHNO/AppData/Local/Temp/kilo/em-apache.conf";
const runWsl = (args) => execFileSync("wsl", ["bash", "-lc", args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
const shell = (s) => JSON.stringify(s).replace(/^"|"$/g, "'");
const status = (res) => res.status;
const request = async (path) => fetch(`http://127.0.0.1:8088${path}`, { redirect: "manual", headers: { Host: "www.elitemaisonmarketing.com", "X-Forwarded-Proto": "https" } });
const check = (ok, message) => { if (!ok) throw new Error(message); console.log(`PASS ${message}`); };

runWsl("mkdir -p /tmp/em-site && rm -rf /tmp/em-site/* && cp -a /mnt/d/projects/EliteMaison/dist/. /tmp/em-site/ && cp /mnt/d/projects/EliteMaison/public/.htaccess /tmp/em-site/.htaccess && cp /mnt/c/Users/TECHNO/AppData/Local/Temp/kilo/em-apache.conf /tmp/em-apache.conf && apache2 -t -f /tmp/em-apache.conf");
const apache = spawn("wsl", ["bash", "-lc", "apache2 -X -f /tmp/em-apache.conf"], { stdio: "ignore" });
try {
  await delay(1500);
  const canonical = ["/ar", "/en", "/ar/about", "/en/consulting", "/ar/cases/patchouli"];
  for (const path of canonical) {
    const res = await request(path);
    check(status(res) === 200, `${path} HTTP 200 (${res.status})`);
  }
  for (const path of ["/ar/about/", "/en/consulting/", "/ar/cases/patchouli/"]) {
    const res = await request(path);
    check(status(res) === 301, `${path} one-hop 301 (${res.status})`);
    const location = res.headers.get("location") || "";
    check(location.endsWith(path.slice(0, -1)), `${path} location ${location}`);
  }
  const legacy = [
    ["/about.html", "/ar/about"],
    ["/case.html?id=patchouli", "/ar/cases/patchouli"],
    ["/insight.html?id=ai-insight", "/ar/insights/ai-insight"]
  ];
  for (const [from, target] of legacy) {
    const res = await request(from);
    check(status(res) === 301, `${from} HTTP 301 (${res.status})`);
    const location = res.headers.get("location") || "";
    check(location.endsWith(target), `${from} location ${location}`);
  }
  const unknown = await request("/__release-infrastructure-unknown__");
  check(status(unknown) === 404, `unknown HTTP 404 (${unknown.status})`);
  const body = await unknown.text();
  check(body.includes("Elite Maison") && body.includes("noindex"), "unknown branded noindex 404 body");
  console.log("Apache HTTP integration: PASS");
} finally {
  apache.kill();
  try { runWsl("apache2 -k stop -f /tmp/em-apache.conf || true"); } catch { /* server may already be down */ }
}
