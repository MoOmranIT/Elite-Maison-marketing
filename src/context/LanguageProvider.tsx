import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { EM } from "@/data/em.js";
import { LanguageContext, type Lang, type LocaleValue } from "@/context/language";

const STORAGE = EM.CONFIG.storageKey as string;

function readLang(): Lang {
  const urlLang = new URLSearchParams(window.location.search).get("lang");
  if (urlLang === "en" || urlLang === "ar") return urlLang;
  try {
    const saved = localStorage.getItem(STORAGE);
    if (saved === "en" || saved === "ar") return saved;
  } catch {
    /* ignore */
  }
  return "ar";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
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
