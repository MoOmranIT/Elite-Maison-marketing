import { EM } from "@/data/em.js";
import type { LocaleValue } from "@/context/language";

export function caseName(
  item: { anonymousName?: LocaleValue; publicName?: LocaleValue },
  loc: (value: LocaleValue) => string
) {
  return EM.CONFIG.anonymizeCases ? loc(item.anonymousName) : loc(item.publicName);
}

export function capabilityLabel(
  href: string,
  loc: (value: LocaleValue) => string,
  fallback: string
) {
  const [, hash] = href.split("#");
  const list = href.includes("execution") ? EM.EXECUTION : EM.CONSULTING;
  const item = list.find((entry: { id: string }) => entry.id === hash);
  return item ? loc(item.title) : fallback;
}

export function featuredCase() {
  return EM.CASES.find((item: { id: string }) => item.id === "patchouli") || EM.CASES[0];
}

export const NAV_ICONS: Record<string, string> = {
  home: "home",
  about: "about",
  consulting: "consult",
  execution: "execute",
  sectors: "sector",
  cases: "proof",
  insights: "insight",
  contact: "contact"
};
