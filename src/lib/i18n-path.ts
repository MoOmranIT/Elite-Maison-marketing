import type { Lang } from "@/context/language";

export const LANGS = ["ar", "en"] as const;

export function isLang(value: string | undefined | null): value is Lang {
  return value === "ar" || value === "en";
}

export function parsePath(pathname: string): { lang: Lang | null; path: string } {
  const parts = pathname.split("/").filter(Boolean);
  if (isLang(parts[0])) {
    const rest = parts.slice(1).join("/");
    return { lang: parts[0], path: rest ? `/${rest}` : "/" };
  }
  return { lang: null, path: pathname.startsWith("/") ? pathname : `/${pathname}` };
}

export function withLang(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const [pathname, hash = ""] = clean.split("#");
  const [file, query] = pathname.split("?");
  const suffix = (query ? `?${query}` : "") + (hash ? `#${hash}` : "");
  if (!file || file === "/") return `/${lang}${suffix}`;
  return `/${lang}${file}${suffix}`;
}

export function swapLang(pathname: string, search: string, hash: string, next: Lang) {
  const { path } = parsePath(pathname);
  const params = new URLSearchParams(search);
  params.delete("lang");
  const qs = params.toString();
  return withLang(path + (qs ? `?${qs}` : "") + hash, next);
}

export function pageKey(path: string) {
  if (path === "/" || path === "") return "home";
  if (path.startsWith("/cases/") && path.split("/").filter(Boolean).length >= 2) return "case";
  if (path.startsWith("/insights/") && path.split("/").filter(Boolean).length >= 2) return "insight";
  return path.replace(/^\//, "").split("/")[0] || "home";
}

export function pageId(path: string) {
  const parts = path.split("/").filter(Boolean);
  return parts[1] || "";
}

export function savedLang(): Lang | null {
  try {
    const saved = localStorage.getItem("em-lang");
    if (isLang(saved)) return saved;
  } catch {
    /* ignore */
  }
  return null;
}
