#!/usr/bin/env node
/**
 * Fail if a static copy("group","key") is missing, or if a required key is empty.
 * Optional keys are an explicit allowlist of copy that components already hide when blank.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(process.cwd());
const SOURCE = join(ROOT, "src");
const CALL = /\bcopy\(\s*["']([A-Za-z][A-Za-z0-9_]*)["']\s*,\s*["']([A-Za-z][A-Za-z0-9_]*)["']\s*\)/g;

const OPTIONAL = new Set([
  "home.ledgerAnon",
  "home.ledgerCta",
  "home.fourEyebrow",
  "home.fourHint",
  "home.fourOrder",
  "home.methodRailLabel",
  "home.methodChip",
  "home.methodLine",
  "home.pathsEyebrow",
  "home.pathsConsultKicker",
  "home.pathsExecKicker",
  "home.capText",
  "home.sectorsText",
  "home.sectorsCta",
  "home.closeNote",
  "home.statementText",
  "home.closeSecondary",
  "home.closeChannels",
  "contact.directText",
  "about.heroDeck",
  "about.heroDesc1",
  "about.heroDesc2",
  "about.pillarsIntro",
  "about.engageIntro",
  "about.ctaCloseTitle",
  "about.ctaCloseText",
  "about.ctaCloseLabel",
  "about.faqEyebrow",
  "about.faqTitle",
  "consulting.audienceTitle",
  "consulting.audienceText",
  "consulting.gridLead",
  "consulting.detailWhatYouGet",
  "consulting.detailBestFor",
  "consulting.deliveryEyebrow",
  "consulting.deliveryTitle",
  "consulting.deliveryText",
  "consulting.faqEyebrow",
  "consulting.faqTitle",
  "execution.lead",
  "execution.heroDeck",
  "execution.heroDesc1",
  "execution.heroDesc2",
  "execution.heroPrimaryCta",
  "execution.heroSecondaryCta",
  "execution.heroImageAlt",
  "execution.definitionTitle",
  "execution.definitionText",
  "execution.differenceTitle",
  "execution.differenceText",
  "execution.servicesIntroTitle",
  "execution.servicesIntroText",
  "execution.galleryGridLead",
  "execution.detailWhatYouGet",
  "execution.detailSuccessMetrics",
  "execution.detailBestFor",
  "execution.detailRelatedConsulting",
  "execution.deliveryEyebrow",
  "execution.deliveryTitle",
  "execution.deliveryDescription",
  "execution.ctaLabel",
  "execution.faqEyebrow",
  "execution.faqTitle",
  "execution.answer",
  "sectors.heroDeck",
  "sectors.heroDesc1",
  "sectors.heroDesc2",
  "sectors.heroPrimaryCta",
  "sectors.heroSecondaryCta",
  "sectors.lead",
  "sectors.meaningEyebrow",
  "sectors.meaningTitle",
  "sectors.meaningText",
  "sectors.selectedEyebrow",
  "sectors.selectedTitle",
  "sectors.selectedText",
  "sectors.heroImageAlt",
  "sectors.ctaLabel",
  "sectors.faqEyebrow",
  "sectors.faqTitle"
]);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if ([".ts", ".tsx", ".js", ".jsx"].includes(extname(entry))) out.push(full);
  }
  return out;
}

function textOf(value, lang) {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  return String(value[lang] ?? "").trim();
}

const { EM } = await import(pathToFileURL(join(ROOT, "src", "data", "em.js")).href);
const uses = new Map();

for (const file of walk(SOURCE)) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(CALL)) {
    const id = `${match[1]}.${match[2]}`;
    const rel = relative(ROOT, file).replaceAll("\\", "/");
    if (!uses.has(id)) uses.set(id, { group: match[1], key: match[2], files: new Set() });
    uses.get(id).files.add(rel);
  }
}

const required = [];
const optional = [];
const missing = [];
const emptyRequired = [];

for (const [id, item] of [...uses.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  const group = EM.COPY?.[item.group];
  const value = group ? group[item.key] : undefined;
  const present = value !== undefined;
  const ar = textOf(value, "ar");
  const en = textOf(value, "en");
  const row = { id, files: [...item.files], ar: Boolean(ar), en: Boolean(en) };
  if (OPTIONAL.has(id)) {
    optional.push(row);
    continue;
  }
  required.push(row);
  if (!present) missing.push({ ...row, reason: "required key is not defined" });
  else if (!ar || !en) emptyRequired.push(row);
}

console.log(`qa:copy-contract used=${uses.size} required=${required.length} optional=${optional.length} missing=${missing.length} emptyRequired=${emptyRequired.length}`);
for (const item of missing) console.log(`MISSING ${item.id} — ${item.reason} — ${item.files.join(", ")}`);
for (const item of emptyRequired) console.log(`EMPTY ${item.id} ar=${item.ar} en=${item.en} — ${item.files.join(", ")}`);
if (missing.length || emptyRequired.length) process.exit(1);
