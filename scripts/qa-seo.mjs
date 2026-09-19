/**
 * SEO / discoverability audit (Phase 5, §63). Dev-only, zero dependencies.
 *
 * Static checks over dist/ (no server needed):
 *   titles, descriptions (+lengths, +duplicates), canonical, hreflang
 *   reciprocity, robots meta, H1/heading order, JSON-LD parse + type rules,
 *   sitemap↔file consistency, 404/shell head, entity consistency, OG/Twitter.
 *
 * Served checks (--serve): status codes with multiple user agents against a
 * plain static server (no SPA fallback), proving 200 canonicals, real 404s
 * and identical treatment for Googlebot/Bingbot/OAI-SearchBot.
 *
 * Usage: node scripts/qa-seo.mjs [--serve]
 */
import { readFileSync, existsSync, createReadStream, statSync } from "node:fs";
import { join, dirname, extname, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const ORIGIN = "https://www.elitemaisonmarketing.com";

let fails = 0;
let passes = 0;
function ok(cond, label, extra = "") {
  if (cond) {
    passes += 1;
  } else {
    fails += 1;
    console.log(`FAIL ${label}${extra ? " :: " + extra : ""}`);
  }
}

const fileFor = (loc) => {
  const rel = loc.replace(ORIGIN, "").replace(/^\//, "");
  return join(DIST, rel === "" ? "index.html" : rel, "index.html");
};

/* ------------------------------------------------------------ sitemap map */

const sitemap = readFileSync(join(DIST, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
ok(locs.length === 36, "sitemap-url-count", `found=${locs.length}`);
ok(new Set(locs).size === locs.length, "sitemap-no-duplicates");
ok(!locs.some((u) => /\.html|404|\?|#|preview|localhost|127\.0\.0\.1/i.test(u)), "sitemap-canonical-only");
const arCount = locs.filter((u) => /\/ar(\/|$)/.test(u)).length;
const enCount = locs.filter((u) => /\/en(\/|$)/.test(u)).length;
ok(arCount === 18 && enCount === 18, "sitemap-lang-split", `ar=${arCount} en=${enCount}`);
for (const u of locs) ok(existsSync(fileFor(u)), "sitemap-file-exists", u);

/* ---------------------------------------------------------- per-page head */

const tag = (html, re) => html.match(re)?.[1] || "";
const titles = new Map();
const descs = new Map();
const FORBIDDEN_TYPES = ["Review", "AggregateRating", "FAQPage", "HowTo", "SpeakableSpecification", "Product", "Event", "Course", "JobPosting", "NewsArticle", "LocalBusiness"];

for (const u of locs) {
  const html = readFileSync(fileFor(u), "utf8");
  const lang = /\/ar(\/|$)/.test(u) ? "ar" : "en";
  const scope = u.replace(ORIGIN, "");

  const title = tag(html, /<title>([\s\S]*?)<\/title>/i);
  ok(title.length > 10, `title-present ${scope}`);
  titles.set(title, [...(titles.get(title) || []), scope]);

  const desc = tag(html, /<meta name="description" content="([^"]*)"/i);
  ok(desc.length > 30, `desc-present ${scope}`);
  ok(desc.length <= 165, `desc-length ${scope}`, `len=${desc.length}`);
  descs.set(desc, [...(descs.get(desc) || []), scope]);

  const canonical = tag(html, /<link rel="canonical" href="([^"]*)"/i);
  ok(canonical === u, `canonical-self ${scope}`, `got=${canonical}`);
  ok(!/localhost|127\.0\.0\.1|\?|#/.test(canonical), `canonical-clean ${scope}`);

  const htmlTag = html.match(/<html lang="([^"]*)" dir="([^"]*)">/i);
  ok(htmlTag?.[1] === lang, `html-lang ${scope}`, `got=${htmlTag?.[1]}`);
  ok(htmlTag?.[2] === (lang === "ar" ? "rtl" : "ltr"), `html-dir ${scope}`);

  const robots = tag(html, /<meta name="robots" content="([^"]*)"/i);
  ok(robots === "index, follow", `robots-meta ${scope}`, `got=${robots}`);

  const href = (h) => tag(html, new RegExp(`<link rel="alternate" hreflang="${h}" href="([^"]*)"`, "i"));
  const other = lang === "ar" ? "en" : "ar";
  const selfAlt = href(lang);
  const otherAlt = href(other);
  const xdef = href("x-default");
  ok(selfAlt === u, `hreflang-self ${scope}`);
  ok(otherAlt.startsWith(ORIGIN), `hreflang-other-absolute ${scope}`);
  ok(xdef === href("ar"), `hreflang-xdefault-ar ${scope}`, `got=${xdef}`);
  // Reciprocity: the alternate file must point back.
  if (existsSync(fileFor(otherAlt))) {
    const otherHtml = readFileSync(fileFor(otherAlt), "utf8");
    const back = tag(otherHtml, new RegExp(`<link rel="alternate" hreflang="${lang}" href="([^"]*)"`, "i"));
    ok(back === u, `hreflang-reciprocal ${scope}`);
  } else {
    ok(false, `hreflang-target-exists ${scope}`, otherAlt);
  }

  // Headings in static HTML.
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] || "";
  ok((main.match(/<h1[\s>]/g) || []).length === 1, `h1-once ${scope}`);
  const headOrder = [...main.matchAll(/<(h[1-3])[\s>]/g)].map((m) => m[1]);
  let orderBad = headOrder[0] !== "h1";
  for (let i = 1; i < headOrder.length && !orderBad; i += 1) {
    if (Number(headOrder[i][1]) - Number(headOrder[i - 1][1]) > 1) orderBad = true;
  }
  ok(!orderBad, `heading-order ${scope}`, headOrder.slice(0, 6).join(","));

  // JSON-LD.
  const rawLd = tag(html, /<script type="application\/ld\+json" id="em-jsonld">([\s\S]*?)<\/script>/i);
  let ld = null;
  try {
    ld = JSON.parse(rawLd);
  } catch {
    ok(false, `jsonld-parse ${scope}`);
  }
  if (ld) {
    ok(ld["@context"] === "https://schema.org", `jsonld-context ${scope}`);
    const graph = Array.isArray(ld["@graph"]) ? ld["@graph"] : [];
    ok(graph.length > 0, `jsonld-graph ${scope}`);
    const types = graph.map((n) => n["@type"]);
    ok(!types.some((t) => FORBIDDEN_TYPES.includes(t)), `jsonld-no-forbidden ${scope}`, types.join(","));
    for (const node of graph) {
      if (node["@type"] === "Article") {
        ok(!!(node.headline && node.description && node.mainEntityOfPage && node.publisher), `article-fields ${scope}`);
        ok(node.inLanguage === lang, `article-lang ${scope}`);
        ok(!node.datePublished && !node.author?.name, `article-no-invented ${scope}`);
      }
      if (node["@type"] === "BreadcrumbList") {
        const items = node.itemListElement || [];
        ok(items.length >= 2 && items.every((it, i) => it.position === i + 1), `crumb-positions ${scope}`);
        ok(items.every((it) => String(it.item || "").startsWith(ORIGIN)), `crumb-absolute ${scope}`);
      }
      if (node["@type"] === "Organization") {
        ok(node.name === "Elite Maison Marketing Consultancies", `org-name ${scope}`);
      }
      if (node["@type"] === "WebSite") {
        ok(node.name === "Elite Maison" && !!node["@id"], `website-entity ${scope}`);
      }
    }
  }

  // OG / Twitter.
  const ogUrl = tag(html, /<meta property="og:url" content="([^"]*)"/i);
  ok(ogUrl === u, `og-url-self ${scope}`);
  ok(!!tag(html, /<meta property="og:title" content="([^"]*)"/i), `og-title ${scope}`);
  ok(!!tag(html, /<meta property="og:description" content="([^"]*)"/i), `og-desc ${scope}`);
  ok(tag(html, /<meta property="og:type" content="([^"]*)"/i) === (scope.includes("/cases/") || scope.includes("/insights/") ? "article" : "website"), `og-type ${scope}`);
  const ogImage = tag(html, /<meta property="og:image" content="([^"]*)"/i);
  ok(ogImage === `${ORIGIN}/assets/images/og-share.png`, `og-image ${scope}`);
  ok(!!tag(html, /<meta name="twitter:card" content="([^"]*)"/i), `twitter-card ${scope}`);
  ok(tag(html, /<meta property="og:site_name" content="([^"]*)"/i) === "Elite Maison", `site-name ${scope}`);
}

const dupTitles = [...titles.entries()].filter(([, v]) => v.length > 1);
ok(dupTitles.length === 0, "duplicate-titles", JSON.stringify(dupTitles.slice(0, 3)));
const dupDescs = [...descs.entries()].filter(([, v]) => v.length > 1);
ok(dupDescs.length === 0, "duplicate-descriptions", JSON.stringify(dupDescs.map(([k, v]) => [k.slice(0, 40), v]).slice(0, 3)));

/* ------------------------------------------------- 404 / shell / robots */

const notfound = readFileSync(join(DIST, "404.html"), "utf8");
ok(notfound.includes("noindex"), "404-noindex");
ok(!notfound.includes('rel="canonical"'), "404-no-canonical");
ok(notfound.includes("الصفحة التي تبحث عنها غير موجودة.") && notfound.includes("The page you are looking for does not exist."), "404-approved-wording");
ok(!locs.some((u) => /404/.test(u)), "404-not-in-sitemap");

const shell = readFileSync(join(DIST, "index.html"), "utf8");
ok(shell.includes(`rel="canonical" href="${ORIGIN}/ar"`), "shell-canonical-ar");

const robotsTxt = readFileSync(join(DIST, "robots.txt"), "utf8");
const closed = /Disallow: \//.test(robotsTxt) && !/Sitemap:/.test(robotsTxt);
console.log(`INFO robots-mode=${closed ? "PRE-RELEASE-closed" : "production-open"}`);

/* ------------------------------------------------------------- og asset */

const ogPath = join(DIST, "assets", "images", "og-share.png");
ok(existsSync(ogPath), "og-file-exists");
ok(existsSync(join(DIST, "assets", "images", "favicon.png")), "favicon-file-exists");

console.log(`\nSTATIC passes=${passes} fails=${fails}`);

/* ------------------------------------------------------ served checks */

if (process.argv.includes("--serve")) {
  const MIME = { ".html": "text/html", ".xml": "application/xml", ".txt": "text/plain", ".png": "image/png" };
  const server = createServer((req, res) => {
    const raw = decodeURIComponent((req.url || "/").split("?")[0]);
    if (raw.includes("..")) {
      res.statusCode = 400;
      res.end();
      return;
    }
    let file = normalize(join(DIST, raw));
    let okFile = false;
    try {
      const st = statSync(file);
      if (st.isDirectory()) file = join(file, "index.html");
      okFile = statSync(file).isFile();
    } catch {
      okFile = false;
    }
    if (!okFile) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(readFileSync(join(DIST, "404.html")));
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", `${MIME[extname(file)] || "application/octet-stream"}; charset=utf-8`);
    createReadStream(file).pipe(res);
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const port = server.address().port;
  const agents = {
    browser: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/152",
    googlebot: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    bingbot: "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
    oai: "OAI-SearchBot/1.0; +https://openai.com/searchbot"
  };
  const fetchAs = async (path, ua) => {
    const res = await fetch(`http://127.0.0.1:${port}${path}`, { headers: { "user-agent": agents[ua] } });
    const body = await res.text();
    return { status: res.status, body };
  };
  // Canonicals 200 + identical across agents (no UA discrimination).
  for (const sample of [`/ar`, `/en`, `/ar/consulting`, `/en/cases/bloom`, `/ar/insights/cx-check`, `/en/contact`]) {
    const ref = await fetchAs(sample, "browser");
    ok(ref.status === 200, `serve-200 ${sample}`, `got=${ref.status}`);
    for (const ua of ["googlebot", "bingbot", "oai"]) {
      const alt = await fetchAs(sample, ua);
      ok(alt.status === 200 && alt.body === ref.body, `serve-same-${ua} ${sample}`, `status=${alt.status}`);
    }
  }
  // Unknown + legacy aliases 404 (no soft-404 duplicates).
  for (const bad of [`/ar/nope`, `/consulting.html`, `/about.html`, `/en/case.html`]) {
    const ref = await fetchAs(bad, "browser");
    ok(ref.status === 404, `serve-404 ${bad}`, `got=${ref.status}`);
    const g = await fetchAs(bad, "googlebot");
    ok(g.status === 404 && g.body === ref.body, `serve-404-same-googlebot ${bad}`);
  }
  ok((await fetchAs("/robots.txt", "browser")).status === 200, "serve-robots");
  ok((await fetchAs("/sitemap.xml", "browser")).status === 200, "serve-sitemap");
  server.close();
  console.log(`SERVED passes=${passes} fails=${fails}`);
}

if (fails > 0) {
  console.error(`\nqa-seo: ${fails} FAILURES`);
  process.exit(1);
}
console.log("qa-seo: ALL CHECKS PASS");
