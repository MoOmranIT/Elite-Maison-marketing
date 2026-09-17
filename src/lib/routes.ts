import type { Lang } from "@/context/language";
import { parsePath, withLang } from "@/lib/i18n-path";

export function mapHref(href: string): string {
  if (!href) return "/";
  if (/^(mailto:|tel:|https?:)/.test(href)) return href;
  if (href.startsWith("#")) return href;
  const [filePart, hashPart] = href.split("#");
  const hash = hashPart ? `#${hashPart}` : "";
  const raw = filePart.startsWith("/") ? filePart.slice(1) : filePart;
  const [file, query = ""] = raw.split("?");
  const params = new URLSearchParams(query);
  const id = params.get("id");
  params.delete("id");
  const remainingQuery = params.toString() ? `?${params.toString()}` : "";
  const map: Record<string, string> = {
    "": "/",
    "index.html": "/",
    "about.html": "/about",
    "consulting.html": "/consulting",
    "execution.html": "/execution",
    "sectors.html": "/sectors",
    "cases.html": "/cases",
    "insights.html": "/insights",
    "contact.html": "/contact",
    "case.html": id ? `/cases/${id}` : "/cases",
    "insight.html": id ? `/insights/${id}` : "/insights"
  };
  if (map[file]) {
    return map[file] + remainingQuery + hash;
  }
  if (file.startsWith("cases/") || file.startsWith("insights/") || file.startsWith("about") || file.startsWith("consulting") || file.startsWith("execution") || file.startsWith("sectors") || file.startsWith("contact")) {
    return `/${file}${remainingQuery}${hash}`;
  }
  if (href.startsWith("/")) {
    const pathOnly = href.split("#")[0].split("?")[0];
    return pathOnly + remainingQuery + hash;
  }
  return "/" + hash;
}

export function toRoute(href: string, lang: Lang = "ar"): string {
  if (!href) return withLang("/", lang);
  if (/^(mailto:|tel:|https?:)/.test(href)) return href;
  if (href.startsWith("#")) return href;
  const mapped = mapHref(href);
  return withLang(mapped, lang);
}
