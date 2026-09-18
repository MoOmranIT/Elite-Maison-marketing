import assert from "node:assert/strict";
import { validateInquiry, submitInquiry, INQUIRY_LIMITS, formsubmitUrl } from "../src/lib/inquiry.ts";

const ok = (input) => {
  const r = validateInquiry(input);
  assert.equal(r.ok, true, JSON.stringify(r));
  return r.value;
};

const bad = (input, expected) => {
  const r = validateInquiry(input);
  assert.equal(r.ok, false, JSON.stringify(r));
  for (const [k, v] of Object.entries(expected)) {
    assert.equal(r.errors[k], v, `field ${k}`);
  }
};

ok({ name: "A", email: "a@b.com", message: "Hi", company: "X", phone: "+1 555 0100" });
ok({ name: "A", email: "a@b.com", message: "Hi" });
bad({}, { name: "required", email: "invalid", message: "required" });
bad({ name: "A", email: "a@b.com", message: "Hi", website: "bot" }, { name: "invalid" });
bad({ name: "A", email: "a@b.com", message: "Hi", name: "a\u0000b" }, { name: "invalid" });
bad({ name: "A", email: "a@b.com", message: "Hi", email: "a@b.com ".repeat(100) }, { email: "too_long" });
bad({ name: "A", email: "a@b.com", message: "Hi", message: "x".repeat(INQUIRY_LIMITS.message + 1) }, { message: "too_long" });
bad({ name: "A", email: "a@b.com", message: "Hi", email: "bad" }, { email: "invalid" });

const { EM } = await import("../src/data/em.js");
const originalUrl = EM.CONFIG.contact.formsubmitUrl;
EM.CONFIG.contact.formsubmitUrl = "";

const notConfigured = await submitInquiry({ name: "A", email: "a@b.com", message: "Hi" });
assert.equal(notConfigured.ok, false);
assert.equal(notConfigured.reason, "not-configured");

EM.CONFIG.contact.formsubmitUrl = originalUrl;

const originalNavigator = global.navigator;
Object.defineProperty(global, "navigator", { value: { onLine: false }, configurable: true });
const offlineResult = await submitInquiry(
  { name: "A", email: "a@b.com", message: "Hi" },
  async () => {
    throw new Error("should not fetch offline");
  },
  1000
);
Object.defineProperty(global, "navigator", { value: originalNavigator, configurable: true });
assert.equal(offlineResult.ok, false);
assert.equal(offlineResult.reason, "offline");

const timeoutResult = await submitInquiry(
  { name: "A", email: "a@b.com", message: "Hi" },
  async (_url, options) => {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, 2000);
      options?.signal?.addEventListener("abort", () => {
        clearTimeout(timer);
        const err = new Error("aborted");
        err.name = "AbortError";
        reject(err);
      }, { once: true });
    });
    return new Response("{}", { status: 200 });
  },
  50
);
assert.equal(timeoutResult.ok, false);
assert.equal(timeoutResult.reason, "timeout");

const rejectedResult = await submitInquiry(
  { name: "A", email: "a@b.com", message: "Hi" },
  async () => new Response("{}", { status: 500 })
);
assert.equal(rejectedResult.ok, false);
assert.equal(rejectedResult.reason, "rejected");

const successResult = await submitInquiry(
  { name: "A", email: "a@b.com", message: "Hi" },
  async () => new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } })
);
assert.equal(successResult.ok, true);

const truthyResult = await submitInquiry(
  { name: "A", email: "a@b.com", message: "Hi" },
  async () => new Response(JSON.stringify({ success: "true" }), { status: 200, headers: { "Content-Type": "application/json" } })
);
assert.equal(truthyResult.ok, true);

console.log("Inquiry QA: PASS");
