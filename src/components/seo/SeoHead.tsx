import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "@/context/language";
import { parsePath, withLang } from "@/lib/i18n-path";
import { absUrl, buildSeo, siteUrl } from "@/lib/seo";
import { buildJsonLd } from "@/lib/schema";

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el?.setAttribute(key, value));
}

function upsertLink(rel: string, hreflang: string | null, href: string) {
  const sel = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(sel) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function SeoHead() {
  const { lang } = useI18n();
  const location = useLocation();
  const { path } = parsePath(location.pathname);
  const seo = buildSeo(path, lang, location.search);
  const origin = siteUrl();
  const canonical = origin ? absUrl(seo.canonicalPath) : seo.canonicalPath;
  const ogImage = origin ? absUrl(seo.ogImage) : seo.ogImage;
  const json = JSON.stringify(buildJsonLd(path, lang));
  const arHref = origin ? absUrl(withLang(path, "ar")) : withLang(path, "ar");
  const enHref = origin ? absUrl(withLang(path, "en")) : withLang(path, "en");

  useEffect(() => {
    document.title = seo.title;
    upsertMeta('meta[name="description"]', { name: "description", content: seo.description });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: seo.noindex ? "noindex, nofollow" : "index, follow"
    });
    upsertLink("canonical", null, canonical);
    upsertLink("alternate", "ar", arHref);
    upsertLink("alternate", "en", enHref);
    upsertLink("alternate", "x-default", enHref);
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo.ogTitle || seo.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: seo.ogDescription || seo.description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: seo.ogType });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: ogImage });
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: seo.ogImageAlt });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: lang === "ar" ? "ar_AE" : "en_GB" });
    upsertMeta('meta[property="og:locale:alternate"]', { property: "og:locale:alternate", content: lang === "ar" ? "en_GB" : "ar_AE" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Elite Maison" });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: ogImage });

    let script = document.getElementById("em-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "em-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = json;
  }, [arHref, canonical, enHref, json, lang, ogImage, seo.description, seo.noindex, seo.ogImageAlt, seo.ogType, seo.ogTitle, seo.ogDescription, seo.title]);

  return null;
}
