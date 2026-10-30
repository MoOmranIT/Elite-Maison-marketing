import { EM } from "@/data/em.js";
import { EN_CASE_STUDY_IDS } from "@/data/cases-en-study.js";

export type EnCaseStudyRecord = {
  context: { en: string };
  previewTitle: { en: string };
  previewDescription: { en: string };
  proofHighlight?: { en: string };
  detailTitle: { en: string };
  intro: { en: string };
  challenge: { en: string };
  strategy: { en: string };
  execution: { en: string };
  result: { en: string };
  serviceItems?: { en: { label: string; href?: string }[] };
  image?: {
    en: {
      src: string;
      srcSet: string;
      width: number;
      height: number;
      alt: string;
      mediaFrame: "square" | "portrait" | "landscape";
    };
  };
};

export function enCaseStudyIds(): string[] {
  return EN_CASE_STUDY_IDS;
}

export function isEnCaseStudyId(id: string): boolean {
  return EN_CASE_STUDY_IDS.includes(id);
}

export function getEnCaseStudy(id: string): EnCaseStudyRecord | undefined {
  const map = (EM.COPY as { casesEnStudy?: Record<string, EnCaseStudyRecord> }).casesEnStudy;
  return map?.[id];
}

type EnStudyTextKey =
  | "context"
  | "previewTitle"
  | "previewDescription"
  | "proofHighlight"
  | "detailTitle"
  | "intro"
  | "challenge"
  | "strategy"
  | "execution"
  | "result";

export function enStudyField(id: string, key: EnStudyTextKey): string {
  const study = getEnCaseStudy(id);
  const value = study?.[key];
  if (value && typeof value === "object" && "en" in value) return value.en;
  return "";
}
