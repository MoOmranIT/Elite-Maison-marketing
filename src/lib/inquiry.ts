import { EM } from "@/data/em.js";

export type InquiryPayload = {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
};

/* Limits only — no secrets. */
export const INQUIRY_LIMITS = Object.freeze({
  name: 120,
  email: 254,
  message: 4000,
  company: 160,
  phone: 40
});

const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().normalize("NFC").slice(0, max);
}

export function formsubmitUrl(): string {
  const env = String((import.meta as any).env?.VITE_FORMSUBMIT_URL || "").trim();
  if (env) return env;
  return String((EM.CONFIG.contact as any)?.formsubmitUrl || "").trim();
}

export type InquiryCheck =
  | { ok: true; value: Required<Pick<InquiryPayload, "name" | "email" | "message">> & { company: string; phone: string } }
  | { ok: false; errors: Partial<Record<"name" | "email" | "message" | "company" | "phone", string>> };

export function validateInquiry(input: InquiryPayload & { website?: string }): InquiryCheck {
  const errors: Partial<Record<"name" | "email" | "message" | "company" | "phone", string>> = {};
  if (typeof input.website === "string" && input.website) {
    return { ok: false, errors: { name: "invalid" } };
  }
  const rawName = typeof input.name === "string" ? input.name.trim().normalize("NFC") : "";
  const rawEmail = typeof input.email === "string" ? input.email.trim() : "";
  const rawMessage = typeof input.message === "string" ? input.message.trim().normalize("NFC") : "";
  const rawCompany = typeof input.company === "string" ? input.company.trim().normalize("NFC") : "";
  const rawPhone = typeof input.phone === "string" ? input.phone.trim() : "";
  const name = clean(rawName, INQUIRY_LIMITS.name);
  const email = clean(rawEmail, INQUIRY_LIMITS.email);
  const message = clean(rawMessage, INQUIRY_LIMITS.message);
  const company = clean(rawCompany, INQUIRY_LIMITS.company);
  const phone = clean(rawPhone, INQUIRY_LIMITS.phone);
  if (!name) errors.name = "required";
  if (!email || !EMAIL.test(email)) errors.email = "invalid";
  if (!message) errors.message = "required";
  for (const [k, v] of Object.entries({ name: rawName, email: rawEmail, message: rawMessage, company: rawCompany, phone: rawPhone }) as [keyof typeof INQUIRY_LIMITS, string][]) {
    if (CONTROL.test(v)) errors[k] = "invalid";
    if (v.length > INQUIRY_LIMITS[k]) errors[k] = "too_long";
  }
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { name, email, message, company, phone } };
}

export type InquiryResult =
  | { ok: true }
  | { ok: false; reason: "validation" | "not-configured" | "network" | "rejected" | "timeout" | "offline" };

const REQUEST_TIMEOUT = 10000;

export async function submitInquiry(
  payload: InquiryPayload & { website?: string },
  fetchImpl: typeof fetch = fetch,
  timeoutMs = REQUEST_TIMEOUT
): Promise<InquiryResult> {
  const checked = validateInquiry(payload);
  if (!checked.ok) return { ok: false, reason: "validation" };
  const endpoint = formsubmitUrl();
  if (!endpoint) return { ok: false, reason: "not-configured" };
  if (typeof navigator !== "undefined" && navigator && (navigator as any).onLine === false) {
    return { ok: false, reason: "offline" };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const body = {
      name: checked.value.name,
      email: checked.value.email,
      message: checked.value.message,
      company: checked.value.company || undefined,
      phone: checked.value.phone || undefined,
      _subject: "Elite Maison website — Initial inquiry",
      _template: "table",
      _captcha: "true",
      _honey: payload.website || ""
    };
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "omit",
      body: JSON.stringify(body),
      signal: controller.signal
    });
    if (!response.ok) return { ok: false, reason: "rejected" };
    const data = await response.json();
    if (data && (data.success === true || data.success === "true")) return { ok: true };
    return { ok: false, reason: "rejected" };
  } catch (error: any) {
    if (error && (error.name === "AbortError" || error.name === "TimeoutError")) {
      return { ok: false, reason: "timeout" };
    }
    return { ok: false, reason: "network" };
  } finally {
    clearTimeout(timer);
  }
}
