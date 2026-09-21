import { EM } from "@/data/em.js";
import type { Lang } from "@/context/language";
import { pageId, pageKey, withLang } from "@/lib/i18n-path";
import { caseName } from "@/lib/em";

interface InsightSeo {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  ogTitle?: { ar: string; en: string };
  ogDescription?: { ar: string; en: string };
}

interface InsightItem {
  id: string;
  seo?: InsightSeo;
}

const KNOWN = new Set([
  "home", "about", "consulting", "execution", "sectors",
  "cases", "case", "insights", "insight", "contact"
]);

export function siteUrl() {
  return String(EM.CONFIG.siteUrl || EM.CONFIG.contact?.website || "").replace(/\/$/, "");
}

export function absUrl(path: string) {
  const origin = siteUrl();
  if (!origin) return path;
  return origin + path;
}

function loc(value: { ar?: string; en?: string } | string | undefined, lang: Lang) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.en || value.ar || "";
}

function clip(text: string, n = 158) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= n) return clean;
  return `${clean.slice(0, n - 1).replace(/\s+\S*$/, "")}…`;
}

export type SeoDoc = {
  title: string;
  description: string;
  canonicalPath: string;
  ogType: "website" | "article";
  noindex: boolean;
  ogImage: string;
  ogImageAlt: string;
  ogTitle?: string;
  ogDescription?: string;
};

export function buildSeo(path: string, lang: Lang, search = ""): SeoDoc {
  const key = pageKey(path);
  const id = pageId(path);
  const pages = EM.PAGES || {};
  const base = pages[key] || pages.home;
  let title = loc(base?.title, lang);
  let description = loc(base?.description, lang);
  const ogType: "website" | "article" = key === "insight" || key === "case" ? "article" : "website";
  let known = KNOWN.has(key);

  if (key === "case" && id) {
    const item = EM.CASES.find((c: { id: string }) => c.id === id);
    if (item) {
      const name = caseName(item, (v) => loc(v as { ar: string; en: string }, lang));
      const proof = loc(item.proof, lang);
      title = lang === "ar" ? `${name} — ${proof} | Elite Maison` : `${name}: ${proof} | Elite Maison`;
      description = clip(`${loc(item.challenge, lang)} ${loc(item.result, lang)}`);
    } else {
      known = false;
    }
  }

  if (key === "insight" && id) {
    const item = EM.INSIGHTS.find((c: { id: string }) => c.id === id);
    if (item) {
      const seoOverride = (item as InsightItem).seo;
      if (seoOverride) {
        title = loc(seoOverride.title, lang);
        description = loc(seoOverride.description, lang);
      } else {
        title = `${loc(item.title, lang)} | Elite Maison`;
        description = clip(loc(item.answer || item.summary, lang));
      }
    } else {
      known = false;
    }
  }

  if (!known) {
    title = lang === "ar" ? "الصفحة غير متاحة | Elite Maison" : "Page not available | Elite Maison";
    description = loc(pages.home?.description, lang);
  }

  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const noindex = !known || params.has("step");
  const canonicalPath = withLang(path, lang);
  const ogImage = "/assets/images/og-share.png";
  const ogImageAlt = lang === "ar"
    ? "Elite Maison — تركيب بصري للهوية المعمارية"
    : "Elite Maison — branded architectural identity mark";

  const ogTitle = key === "insight" && id
    ? (() => {
        const item = EM.INSIGHTS.find((c: { id: string }) => c.id === id);
        return item ? loc((item as InsightItem).seo?.ogTitle, lang) : undefined;
      })()
    : undefined;
  const ogDescription = key === "insight" && id
    ? (() => {
        const item = EM.INSIGHTS.find((c: { id: string }) => c.id === id);
        return item ? loc((item as InsightItem).seo?.ogDescription, lang) : undefined;
      })()
    : undefined;

  return { title, description, canonicalPath, ogType, noindex, ogImage, ogImageAlt, ogTitle, ogDescription };
}
