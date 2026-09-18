import { EM } from "@/data/em.js";
import type { Lang } from "@/context/language";
import { absUrl, siteUrl } from "@/lib/seo";
import { withLang } from "@/lib/i18n-path";
import { caseName } from "@/lib/em";
import { pageId, pageKey } from "@/lib/i18n-path";

function loc(value: { ar?: string; en?: string } | string | undefined, lang: Lang) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.en || value.ar || "";
}

function org(lang: Lang) {
  const origin = siteUrl();
  const graph: Record<string, unknown> = {
    "@type": "Organization",
    "@id": origin ? `${origin}/#org` : "#org",
    name: "Elite Maison Marketing Consultancies",
    alternateName: "Elite Maison",
    description: loc(EM.COPY?.home?.lead, lang) || loc(EM.PAGES?.home?.description, lang),
    email: EM.CONFIG.contact.email,
    telephone: EM.CONFIG.contact.phone,
    url: origin || undefined,
    logo: origin ? `${origin}/assets/images/logo-lockup.png` : "/assets/images/logo-lockup.png",
    image: origin ? `${origin}/assets/images/elite-architecture.webp` : "/assets/images/elite-architecture.webp",
    areaServed: {
      "@type": "AdministrativeArea",
      name: lang === "ar" ? "أسواق الخليج" : "GCC markets"
    }
  };
  return graph;
}

function crumbs(items: { name: string; path: string }[], lang: Lang) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(withLang(item.path, lang))
    }))
  };
}

export function buildJsonLd(path: string, lang: Lang) {
  const key = pageKey(path);
  const id = pageId(path);
  const origin = siteUrl();
  const pageUrl = absUrl(withLang(path, lang));
  const nodes: Record<string, unknown>[] = [org(lang)];

  if (key === "consulting" || key === "execution") {
    const list = key === "consulting" ? EM.CONSULTING : EM.EXECUTION;
    nodes.push({
      "@type": "Service",
      name: key === "consulting"
        ? (lang === "ar" ? "الاستشارات" : "Consulting")
        : (lang === "ar" ? "الحلول التنفيذية" : "Execution solutions"),
      provider: { "@id": origin ? `${origin}/#org` : "#org" },
      description: loc(EM.COPY?.[key]?.lead, lang),
      url: pageUrl,
      serviceType: list.map((item: { title: { ar: string; en: string } }) => loc(item.title, lang))
    });
  }

  if (key === "insight" && id) {
    const item = EM.INSIGHTS.find((entry: { id: string }) => entry.id === id);
    if (item) {
      nodes.push({
        "@type": "Article",
        headline: loc(item.title, lang),
        description: loc(item.answer || item.summary, lang),
        abstract: loc(item.answer || item.summary, lang),
        inLanguage: lang === "ar" ? "ar" : "en",
        mainEntityOfPage: pageUrl,
        publisher: { "@id": origin ? `${origin}/#org` : "#org" },
        author: { "@id": origin ? `${origin}/#org` : "#org" }
      });
      nodes.push(crumbs([
        { name: lang === "ar" ? "الرئيسية" : "Home", path: "/" },
        { name: lang === "ar" ? "الرؤى" : "Insights", path: "/insights" },
        { name: loc(item.title, lang), path }
      ], lang));
    }
  }

  if (key === "case" && id) {
    const item = EM.CASES.find((entry: { id: string }) => entry.id === id);
    if (item) {
      const name = caseName(item, (v) => loc(v as { ar: string; en: string }, lang));
      nodes.push({
        "@type": "CreativeWork",
        headline: name,
        name,
        description: loc(item.challenge, lang),
        abstract: loc(item.result, lang),
        inLanguage: lang === "ar" ? "ar" : "en",
        mainEntityOfPage: pageUrl,
        publisher: { "@id": origin ? `${origin}/#org` : "#org" },
        about: loc(item.challenge, lang),
        text: [loc(item.challenge, lang), loc(item.strategy, lang), loc(item.execution, lang), loc(item.result, lang), loc(item.proof, lang)].filter(Boolean).join(" ")
      });
      nodes.push(crumbs([
        { name: lang === "ar" ? "الرئيسية" : "Home", path: "/" },
        { name: lang === "ar" ? "الدليل" : "Proof", path: "/cases" },
        { name, path }
      ], lang));
    }
  }

  if (key === "home") {
    nodes.push({
      "@type": "WebSite",
      "@id": origin ? `${origin}/#website` : "#website",
      name: "Elite Maison",
      url: origin || undefined,
      inLanguage: [ "ar", "en" ],
      publisher: { "@id": origin ? `${origin}/#org` : "#org" }
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": nodes
  };
}
