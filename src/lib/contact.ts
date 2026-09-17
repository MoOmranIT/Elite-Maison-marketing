import { normalizeSource } from "@/lib/contact-contract.js";

export type ContactLead = "consultation" | "inquiry";

export interface ContactPayload {
  lead: ContactLead;
  locale: "ar" | "en";
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  market: string;
  challenge: string;
  inquiry: string;
  outcome: string;
  timeline: string;
  source: string;
  website: string;
}

type ContactResult = { ok: true } | { ok: false; reason: "not-configured" | "network" | "rejected" };

const ENDPOINT = String(import.meta.env.VITE_CONTACT_ENDPOINT || "").trim();
const REQUEST_TIMEOUT = 10000;

export function contactEndpointConfigured() {
  return Boolean(ENDPOINT);
}

export function buildContactPayload(payload: Omit<ContactPayload, "source"> & { source?: string | null }): ContactPayload {
  return { ...payload, source: normalizeSource(payload.source) };
}

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  if (!ENDPOINT) return { ok: false, reason: "not-configured" };
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "omit",
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    return response.ok ? { ok: true } : { ok: false, reason: "rejected" };
  } catch {
    return { ok: false, reason: "network" };
  } finally {
    window.clearTimeout(timeout);
  }
}
