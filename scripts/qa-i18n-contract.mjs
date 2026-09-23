#!/usr/bin/env node
/**
 * Fail if a static t("key") call has no entry in EM.I18N.ar and EM.I18N.en.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(process.cwd());
const SOURCE = join(ROOT, "src");
const CALL = /\bt\(\s*["']([A-Za-z][A-Za-z0-9_]*)["']\s*\)/g;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if ([".ts", ".tsx", ".js", ".jsx"].includes(extname(entry))) out.push(full);
  }
  return out;
}

const { EM } = await import(pathToFileURL(join(ROOT, "src", "data", "em.js")).href);
const ar = EM.I18N.ar;
const en = EM.I18N.en;
const uses = new Map();

for (const file of walk(SOURCE)) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(CALL)) {
    const key = match[1];
    const rel = relative(ROOT, file).replaceAll("\\", "/");
    if (!uses.has(key)) uses.set(key, new Set());
    uses.get(key).add(rel);
  }
}

const missing = [];
for (const [key, files] of [...uses.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  for (const lang of ["ar", "en"]) {
    const bag = lang === "ar" ? ar : en;
    if (typeof bag[key] !== "string" || !bag[key].trim()) {
      missing.push({ key, lang, files: [...files] });
    }
  }
}

console.log(`qa:i18n keys=${uses.size} missing=${missing.length}`);
if (missing.length) {
  for (const item of missing) {
    console.log(`MISSING ${item.lang} t("${item.key}") in ${item.files.join(", ")}`);
  }
  process.exit(1);
}
