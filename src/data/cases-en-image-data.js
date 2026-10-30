/** Production WebP paths and metadata for EN case studies (wired into cases-en-study). */

const WIDTHS = [384, 512, 768, 1024];

function srcSetForBase(base) {
  return WIDTHS.map((w) => `/assets/images/cases/${base}-${w}.webp ${w}w`).join(", ");
}

function caseImage(base, width, height, alt, mediaFrame) {
  return {
    en: {
      src: `/assets/images/cases/${base}-1024.webp`,
      srcSet: srcSetForBase(base),
      width,
      height,
      alt,
      mediaFrame
    }
  };
}

/** @type {Record<string, { en: { src: string; srcSet: string; width: number; height: number; alt: string; mediaFrame: string } }>} */
export const EN_CASE_STUDY_IMAGES = {
  "attractive-smile": caseImage(
    "attractive-smile-medical-center",
    1024,
    1024,
    "Attractive Smile Medical Center dental brand logo.",
    "square"
  ),
  bloom: caseImage("bloom-perfect-foodstuff", 1024, 1024, "Bloom brand wordmark.", "square"),
  "bin-ablan": caseImage(
    "bin-ablan",
    1024,
    1205,
    "Bin Ablan exhibition booth at a trade show.",
    "portrait"
  ),
  "ai-brains": caseImage(
    "ai-brains",
    1024,
    384,
    "AI Brains infographic showing Kaveo, AIRIS, HOLORISER and MotorK.",
    "landscape"
  )
};
