import { useCallback, useLayoutEffect, useMemo, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EM } from "@/data/em.js";
import { LanguageContext, type Lang, type LocaleValue } from "@/context/language";
import { parsePath, savedLang, swapLang } from "@/lib/i18n-path";

const STORAGE = EM.CONFIG.storageKey as string;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const parsed = parsePath(location.pathname);
  const lang: Lang = parsed.lang || savedLang() || "ar";

  const setLang = useCallback((next: Lang) => {
    try {
      localStorage.setItem(STORAGE, next);
    } catch {
      /* ignore */
    }
    const nextPath = swapLang(location.pathname, location.search, location.hash, next);
    if (nextPath !== location.pathname + location.search + location.hash) {
      navigate(nextPath);
    }
  }, [location.hash, location.pathname, location.search, navigate]);

  useLayoutEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem(STORAGE, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const value = useMemo(() => {
    const loc = (value: LocaleValue) => {
      if (value == null) return "";
      if (typeof value === "string") return value;
      return value[lang] ?? value.en ?? value.ar ?? "";
    };
    const t = (key: string) => (EM.I18N[lang] && EM.I18N[lang][key]) || key;
    const copy = (group: string, key: string) => {
      const src = EM.COPY[group];
      return src && src[key] ? loc(src[key]) : "";
    };
    return { lang, setLang, t, loc, copy };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
