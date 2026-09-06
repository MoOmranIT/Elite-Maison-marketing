import { createContext, useContext } from "react";

export type Lang = "ar" | "en";

export type LocaleValue = string | { ar?: string; en?: string } | null | undefined;

export interface I18n {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  loc: (value: LocaleValue) => string;
  copy: (group: string, key: string) => string;
}

export const LanguageContext = createContext<I18n | null>(null);

export function useI18n(): I18n {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
