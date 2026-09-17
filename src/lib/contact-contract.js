const SOURCE_PATTERN = /^(page|case|insight|sector|capability|engagement):[a-z0-9-]+$/;
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;

export const CONTACT_LIMITS = Object.freeze({
  name: 120,
  email: 254,
  phone: 40,
  company: 160,
  industry: 100,
  market: 120,
  challenge: 4000,
  inquiry: 4000,
  outcome: 2000,
  timeline: 20,
  source: 100,
  locale: 2
});

export const ALLOWED_TIMELINES = new Set(["", "now", "soon", "explore"]);
export const ALLOWED_LEADS = new Set(["consultation", "inquiry"]);
export const ALLOWED_LOCALES = new Set(["ar", "en"]);

function clean(value, max) {
  if (typeof value !== "string") return "";
  return value.trim().normalize("NFC").slice(0, max);
}

function exceeds(value, max) {
  return typeof value === "string" && value.trim().normalize("NFC").length > max;
}

export function normalizeSource(value) {
  const source = clean(value, CONTACT_LIMITS.source);
  if (!source || exceeds(value, CONTACT_LIMITS.source) || CONTROL_CHARACTERS.test(source) || !SOURCE_PATTERN.test(source)) return "";
  return source;
}

export function validateContactPayload(input) {
  const payload = input && typeof input === "object" ? input : {};
  const errors = {};
  const allowed = new Set(["lead", "locale", "name", "email", "phone", "company", "industry", "market", "challenge", "inquiry", "outcome", "timeline", "source", "website"]);
  for (const key of Object.keys(payload)) if (!allowed.has(key)) errors.unexpected = "invalid";
  const field = (name, max) => clean(payload[name], max);
  const lead = field("lead", 20);
  const locale = field("locale", CONTACT_LIMITS.locale);
  const name = field("name", CONTACT_LIMITS.name);
  const email = field("email", CONTACT_LIMITS.email);
  const company = field("company", CONTACT_LIMITS.company);
  const industry = field("industry", CONTACT_LIMITS.industry);
  const challenge = field("challenge", CONTACT_LIMITS.challenge);
  const inquiry = field("inquiry", CONTACT_LIMITS.inquiry);
  const timeline = field("timeline", CONTACT_LIMITS.timeline);
  const honeypot = typeof payload.website === "string" ? payload.website : "";

  if (!ALLOWED_LEADS.has(lead)) errors.lead = "invalid";
  if (!ALLOWED_LOCALES.has(locale)) errors.locale = "invalid";
  if (!name) errors.name = "required";
  if (!email || email.length > CONTACT_LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "invalid";
  if (lead === "consultation" && !challenge) errors.challenge = "required";
  if (lead === "inquiry" && !inquiry) errors.inquiry = "required";
  if (!ALLOWED_TIMELINES.has(timeline)) errors.timeline = "invalid";
  if (honeypot || CONTROL_CHARACTERS.test(honeypot)) errors.website = "invalid";
  if (payload.source && !normalizeSource(payload.source)) errors.source = "invalid";

  const rawFields = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    company: payload.company,
    industry: payload.industry,
    market: payload.market,
    challenge: payload.challenge,
    inquiry: payload.inquiry,
    outcome: payload.outcome,
    timeline: payload.timeline,
    source: payload.source,
    locale: payload.locale
  };
  for (const [key, value] of Object.entries(rawFields)) {
    if (CONTROL_CHARACTERS.test(typeof value === "string" ? value : "")) errors[key] = "invalid";
    if (exceeds(value, CONTACT_LIMITS[key])) errors[key] = "too_long";
  }

  for (const [key, value] of Object.entries({ name, email, phone: field("phone", CONTACT_LIMITS.phone), company, industry, market: field("market", CONTACT_LIMITS.market), challenge, inquiry, outcome: field("outcome", CONTACT_LIMITS.outcome), timeline })) {
    if (CONTROL_CHARACTERS.test(value)) errors[key] = "invalid";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    value: {
      lead,
      locale,
      name,
      email,
      phone: field("phone", CONTACT_LIMITS.phone),
      company,
      industry,
      market: field("market", CONTACT_LIMITS.market),
      challenge,
      inquiry,
      outcome: field("outcome", CONTACT_LIMITS.outcome),
      timeline,
      source: normalizeSource(payload.source),
      website: ""
    }
  };
}
