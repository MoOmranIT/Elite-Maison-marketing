#!/usr/bin/env node
/**
 * Copy integrity audit — `elite_maison_editorial_copy_deck_v2.md`.
 *
 * Verifies that every approved copy string extracted from the deck appears
 * verbatim (whitespace-collapsed) in the shipped source, so approved copy
 * can never drift silently.
 *
 * Exits non-zero when an approved string is missing.
 *
 *   node scripts/qa-copy.mjs            # human report
 *   node scripts/qa-copy.mjs --json     # machine report
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const DECK = process.env.EM_COPY_DECK || join(ROOT, "docs", "approved-copy", "elite_maison_editorial_copy_deck_v2.md");
const SOURCE_ROOT = join(ROOT, "src");
const SOURCE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".html"]);
const EXTRA_SOURCES = [join(ROOT, "index.html")];
const AS_JSON = process.argv.includes("--json");
const SELF_CHECK = process.argv.includes("--self-check");

function collapse(text) {
  return String(text).replace(/\s+/g, " ").trim();
}

/** Heuristic for unstructured deck prose — not applied to labelled AR/EN copy fields. */
function isInstruction(text) {
  return [
    /^do not\b/i, /^don't\b/i, /^never\b/i, /^keep\b/i, /^use\b/i, /^avoid\b/i,
    /^replace\b/i, /^preserve\b/i, /^implement\b/i, /^remove\b/i, /^only\b/i,
    /^report\b/i, /^open\b/i, /^hide\b/i, /^submit\b/i, /^add\b/i, /^no\b/i,
    /^if\b/i, /^when\b/i, /^must\b/i, /^note\b/i,
    /^preferred\b/i, /^current\b/i, /^requirement\b/i, /^labels\b/i,
    /^field\b/i
  ].some((re) => re.test(text));
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (SOURCE_EXT.has(extname(entry))) out.push(full);
  }
  return out;
}

const sourceFiles = [
  ...walk(SOURCE_ROOT),
  ...EXTRA_SOURCES.filter((file) => {
    try {
      return statSync(file).isFile();
    } catch {
      return false;
    }
  })
];
const haystack = collapse(sourceFiles.map((file) => readFileSync(file, "utf8")).join(" \u0000 "));
const deckText = collapse(readFileSync(DECK, "utf8"));

function extractFromDeck(markdown) {
  const lines = markdown.split(/\r?\n/);
  const found = [];
  /**
   * @param {boolean} structured — true when text came from an explicit AR/EN field, inline pair, or table cell
   */
  const push = (lang, text, where, structured = false) => {
    const clean = collapse(text);
    if (!clean) return;
    if (/^[\u2014\u2013-]+$/.test(clean)) return;
    if (/^(yes|no|required|optional)$/i.test(clean)) return;
    if (!structured && isInstruction(clean)) return;
    found.push({ lang, text: clean, where });
  };

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    if (!raw.trim()) continue;

    if (/^\s*\|/.test(raw)) {
      const body = raw.split("|").map((cell) => cell.trim()).slice(1, -1);
      if ((body.length === 3 || body.length === 4) && /^`/.test(body[0]) && !/^-+$/.test(body[1])) {
        push("ar", body[1], `${i + 1} · table`, true);
        push("en", body[2], `${i + 1} · table`, true);
      }
      continue;
    }

    let m = raw.match(/^\s*(?:[-*]\s+)?\*\*[^*]+\*\*\s*\u2014\s*AR:\s*(.+?)\s*\/\s*EN:\s*(.+)$/);
    if (m) {
      push("ar", m[1], `${i + 1} · inline AR/EN`, true);
      push("en", m[2], `${i + 1} · inline AR/EN`, true);
      continue;
    }

    m = raw.match(/^\s*(?:[-*]\s+)?(?:\*\*)?([A-Za-z][A-Za-z &'/]*?)\s+(AR|EN):(\*\*)?\s*(.+)$/);
    if (m) {
      push(m[2].toLowerCase(), m[4], `${i + 1} · ${m[1].trim()} ${m[2]}`, true);
      continue;
    }

    m = raw.match(/^\s*(?:\*\*)?(AR|EN):(\*\*)?\s*(.+)$/);
    if (m) {
      push(m[1].toLowerCase(), m[3], `${i + 1} · ${m[1]}`, true);
      continue;
    }

    m = raw.match(/^\s*(?:\*\*)?(AR|EN)\s+([A-Za-z/ ]+?)(?:\*\*)?:\s*(.+)$/);
    if (m) {
      push(m[1].toLowerCase(), m[3], `${i + 1} · ${m[2].trim()}`, true);
      continue;
    }
  }
  return found;
}

const SELF_CHECK_FIXTURE = `
EN: The first approved sentence for regression.
AR: جملة عربية
EN: This second line is approved marketing copy.
EN: One more approved line in the deck.
The homepage must not be extracted because it is unstructured prose.
Do not treat this line as runtime copy either.
`;

function runCopyAuditorSelfCheck() {
  const found = extractFromDeck(SELF_CHECK_FIXTURE);
  const enTexts = new Set(found.filter((item) => item.lang === "en").map((item) => item.text));
  const required = [
    "The first approved sentence for regression.",
    "This second line is approved marketing copy.",
    "One more approved line in the deck."
  ];
  const missing = required.filter((text) => !enTexts.has(text));
  const leaked = [...enTexts].filter((text) => /homepage must not|Do not treat this line/i.test(text));
  if (missing.length) {
    console.error("qa-copy self-check FAIL: structured copy not extracted:");
    for (const text of missing) console.error(`  - ${text}`);
    process.exit(1);
  }
  if (leaked.length) {
    console.error("qa-copy self-check FAIL: unstructured instructions leaked into expected:");
    for (const text of leaked) console.error(`  - ${text}`);
    process.exit(1);
  }
  console.log("qa-copy self-check PASS (structured The/This/One; unstructured prose excluded)");
  process.exit(0);
}

if (SELF_CHECK) {
  runCopyAuditorSelfCheck();
}

const markdown = readFileSync(DECK, "utf8");
const retiredCopy = new Set([
  "احجزوا استشارة",
  "Book a consultation",
  "احجزوا وقتًا للاستشارة",
  "Book time for a consultation",
  "اختاروا وقتًا يناسبكم، وابدأوا بالسؤال نفسه.",
  "Choose a time that works, and start with the question itself.",
  "الحجز مخصص عندما يكون لديكم تحدٍ أو قرار يستحق نقاشًا مباشرًا. لا تحتاجون إلى تجهيز عرض أو اختيار خدمة قبل الموعد.",
  "Booking is for a challenge or decision that deserves a direct conversation. You do not need to prepare a deck or choose a service before the meeting.",
  "عرض المواعيد المتاحة",
  "View available times",
  "جارٍ تحميل المواعيد…",
  "Loading availability…",
  "يمكنكم حجز وقت للاستشارة إذا كان السؤال يحتاج إلى نقاش، أو إرسال استفسار مختصر إذا كنتم تريدون مشاركة السياق أولًا. وإن كان الطريق المباشر أنسب، فواتساب والبريد والهاتف موجودة هنا أيضًا.",
  "Book time for a consultation if the question needs a conversation, or send a short inquiry if you want to share the context first. If a direct route is easier, WhatsApp, email and phone are here too.",
  "احجزوا وقتًا للاستشارة إذا كان السؤال يحتاج إلى نقاش، أو أرسلوا استفسارًا إذا كنتم تريدون اختبار ملاءمة الحوار أولًا. لا تحتاجون إلى اختيار خدمة قبل أن نفهم السياق.",
  "Book time for a consultation if the question needs a conversation, or send an inquiry if you want to test whether the dialogue makes sense first. You do not need to choose a service before we understand the context."
]);
const expected = [];
const retired = [];
const seen = new Set();
for (const item of extractFromDeck(markdown)) {
  const needle = collapse(item.text);
  const key = `${item.lang}\u0000${needle}`;
  if (seen.has(key)) continue;
  seen.add(key);
  if (retiredCopy.has(needle)) {
    retired.push({ ...item, text: needle });
    continue;
  }
  expected.push({ ...item, text: needle });
}

const matches = [];
const exceptions = [];
for (const item of expected) {
  if (haystack.includes(item.text)) matches.push(item);
  else exceptions.push(item);
}

const coverage = Number(((matches.length / (expected.length || 1)) * 100).toFixed(2));
const status = exceptions.length ? "FAIL" : "PASS";

if (AS_JSON) {
  const payload = JSON.stringify({
    deck: DECK,
    status,
    expectedStrings: expected.length,
    exactMatches: matches.length,
    exceptions,
    retiredCopy,
    coveragePercent: coverage
  }, null, 2);
  const outArg = process.argv.indexOf("--out");
  if (outArg > -1 && process.argv[outArg + 1]) {
    writeFileSync(resolve(process.argv[outArg + 1]), payload + "\n", "utf8");
  } else {
    process.stdout.write(payload + "\n");
  }
  process.exit(exceptions.length ? 1 : 0);
}

console.log("Copy integrity audit — elite_maison_editorial_copy_deck_v2.md");
console.log(`deck:             ${DECK}`);
console.log(`status:           ${status}`);
console.log(`expected strings: ${expected.length}`);
console.log(`exact matches:    ${matches.length}`);
console.log(`exceptions:       ${exceptions.length}`);
console.log(`coverage:         ${coverage}%`);
console.log(`retired booking strings: ${retired.length}`);
if (exceptions.length) {
  console.log("\nEXCEPTIONS (approved in deck, not found verbatim in shipped source):");
  for (const item of exceptions) {
    console.log(`  [${item.lang}] ${item.where} :: ${item.text.slice(0, 150)}`);
  }
}

process.exit(exceptions.length ? 1 : 0);
