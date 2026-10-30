/** Responsive slot `sizes` for EN Proof case study images. */

export type EnCaseMediaFrame = "square" | "portrait" | "landscape";

export type EnCaseImageConfig = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  mediaFrame: EnCaseMediaFrame;
  objectPosition?: string;
};

export const EN_CASE_PREVIEW_SIZES =
  "(max-width: 820px) min(92vw, 20rem), (max-width: 1024px) min(32vw, 14rem), 16rem";

export const EN_CASE_DETAIL_SIZES =
  "(max-width: 900px) min(92vw, 20rem), (min-width: 901px) min(38vw, 400px)";
