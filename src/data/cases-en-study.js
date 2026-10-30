/** English case-study copy for Proof previews and EN detail pages (not shared AR). */
import { EN_CASE_STUDY_IMAGES } from "./cases-en-image-data.js";

export const EN_CASE_STUDY_IDS = ["attractive-smile", "bloom", "bin-ablan", "ai-brains"];

const CASES_EN_STUDY_BASE = {
  "attractive-smile": {
    context: { en: "Healthcare" },
    previewTitle: { en: "Attractive Smile Medical Center: steadier demand and bookings during expansion" },
    previewDescription: {
      en: "How Elite Maison supported a medical centre's expansion with more stable demand and 12 consecutive days of bookings."
    },
    proofHighlight: { en: "12 consecutive days of bookings." },
    detailTitle: { en: "Attractive Smile Medical Center: steadier demand and bookings during expansion" },
    intro: {
      en: "Attractive Smile Medical Center is a healthcare provider that is entering an expansion phase. Elite Maison connected the expansion objective to the demand path, resulting in revenue growth, more stable demand and 12 consecutive days of bookings."
    },
    challenge: {
      en: "The question was not how to add more marketing activity, but how to support expansion with steadier demand and bookings."
    },
    strategy: {
      en: "Connect the expansion objective to the demand path and focus on what could turn interest into bookings more consistently."
    },
    execution: {
      en: "Direct the work toward a steadier flow of demand and bookings during expansion, with follow-up across the path."
    },
    result: { en: "Revenue growth and more stable demand, with 12 consecutive days of bookings." },
    serviceItems: {
      en: [
        { label: "Growth & Business Development", href: "consulting.html#growth" },
        { label: "Campaign & Digital Channel Management", href: "execution.html#campaigns" },
        { label: "Healthcare sector", href: "sectors.html#healthcare" }
      ]
    }
  },
  bloom: {
    context: { en: "FMCG" },
    previewTitle: { en: "Bloom / Perfect Foodstuff: from AED 18K to an AED 65K monthly average" },
    previewDescription: {
      en: "How Elite Maison redesigned the growth model and sales channels for Bloom (Perfect Foodstuff), growing from AED 18K to an AED 65K monthly average."
    },
    proofHighlight: { en: "AED 65K average monthly." },
    detailTitle: { en: "Bloom / Perfect Foodstuff: from AED 18K to an AED 65K monthly average" },
    intro: {
      en: "Bloom, from Perfect Foodstuff, is an FMCG brand whose growth model and sales channels were not capturing its available commercial potential. After Elite Maison redesigned both, it grew from AED 18K in Q1 to AED 40K, then to an average of AED 65K per month."
    },
    challenge: {
      en: "The product and market were already there; the growth model and sales channels were not capturing the available commercial potential strongly enough."
    },
    strategy: {
      en: "Redesign the growth logic around clearer revenue opportunities rather than treating sales as a fixed path."
    },
    execution: {
      en: "Redesign sales channels to support the new model and give the business a clearer commercial path."
    },
    result: { en: "From AED 18K in Q1 to AED 40K, then an average of AED 65K per month." }
  },
  "bin-ablan": {
    context: { en: "Retail & Distribution" },
    previewTitle: { en: "Bin Ablan: market entry across five countries" },
    previewDescription: {
      en: "How Elite Maison built a regional expansion strategy for Bin Ablan, opening markets in Canada, Oman, Kuwait, Saudi Arabia and Libya."
    },
    proofHighlight: { en: "Market entry across five countries." },
    detailTitle: { en: "Bin Ablan: market entry across five countries" },
    intro: {
      en: "Bin Ablan is a retail and distribution business that needed a clearer decision on where and how to expand. Elite Maison developed a regional expansion strategy, and the business opened new markets in Canada, Oman, Kuwait, Saudi Arabia and Libya, alongside new distribution channels."
    },
    challenge: {
      en: "Growth required new markets and distribution channels. Before expanding activity, the business needed a clearer decision on where and how expansion should happen."
    },
    strategy: {
      en: "Develop a regional expansion strategy connecting market choice with route to entry and channel development."
    },
    execution: {
      en: "Open new markets and develop distribution channels that support commercial expansion."
    },
    result: {
      en: "New markets in Canada, Oman, Kuwait, Saudi Arabia and Libya, alongside new distribution channels."
    },
    serviceItems: {
      en: [
        { label: "Market Expansion & Entry", href: "consulting.html#expansion" },
        { label: "Sales & Revenue Development", href: "consulting.html#sales" },
        { label: "Retail & Distribution sector", href: "sectors.html#retail" }
      ]
    }
  },
  "ai-brains": {
    context: { en: "AI Solutions" },
    previewTitle: { en: "AI Brains: from a broad AI concept to an award-winning project" },
    previewDescription: {
      en: "How Elite Maison turned a broad AI concept into a defined, measurable project that won the award for Best AI-Supporting Project."
    },
    proofHighlight: { en: "Award for Best AI-Supporting Project." },
    detailTitle: { en: "AI Brains: from a broad AI concept to an award-winning project" },
    intro: {
      en: "AI Brains is an AI solutions project that received the award for Best AI-Supporting Project. Elite Maison helped define where its value sat and turned a broad concept into a project that could be applied and measured."
    },
    challenge: {
      en: "The idea already existed. What needed clarity was where its value sat and how to turn a broad concept into a project that could be applied and measured."
    },
    strategy: {
      en: "Shape the project around clear value and a use case that could be turned into work, rather than leaving AI as a broad label."
    },
    execution: { en: "Turn the concept into a defined project that could be applied and measured." },
    result: { en: "A clear, applicable and measurable project." },
    serviceItems: {
      en: [
        { label: "Automation & AI Solutions", href: "execution.html#automation" },
        { label: "Product & Business Model Development", href: "consulting.html#product" }
      ]
    }
  }
};

export const CASES_EN_STUDY = Object.fromEntries(
  Object.entries(CASES_EN_STUDY_BASE).map(([id, record]) => [
    id,
    { ...record, image: EN_CASE_STUDY_IMAGES[id] }
  ])
);
