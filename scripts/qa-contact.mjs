import assert from "node:assert/strict";
import { CONTACT_LIMITS, validateContactPayload } from "../src/lib/contact-contract.js";

const valid = {
  lead: "consultation",
  locale: "en",
  name: "A decision maker",
  email: "person@example.com",
  phone: "+971 55 540 0705",
  company: "Example Company",
  industry: "Retail & Distribution",
  market: "United Arab Emirates",
  challenge: "We need clarity on the next commercial decision.",
  inquiry: "",
  outcome: "A clearer next step",
  timeline: "soon",
  source: "case:patchouli",
  website: ""
};

function expectInvalid(patch, label) {
  const result = validateContactPayload({ ...valid, ...patch });
  assert.equal(result.ok, false, label);
}

assert.equal(validateContactPayload(valid).ok, true, "valid consultation payload");
assert.equal(validateContactPayload({ ...valid, lead: "inquiry", challenge: "", inquiry: "A first question" }).ok, true, "valid inquiry payload");
expectInvalid({ name: "" }, "required name");
expectInvalid({ email: "not-an-email" }, "invalid email");
expectInvalid({ email: "person\nBcc: attacker@example.com" }, "header newline");
expectInvalid({ website: "bot" }, "honeypot");
expectInvalid({ timeline: "tomorrow" }, "unexpected timing enum");
expectInvalid({ lead: "other" }, "unexpected lead enum");
expectInvalid({ locale: "fr" }, "unexpected locale");
expectInvalid({ source: "<script>alert(1)</script>" }, "unsafe source");
expectInvalid({ challenge: "x".repeat(CONTACT_LIMITS.challenge + 1) }, "oversized challenge");
expectInvalid({ unexpected: "field" }, "unexpected field");
expectInvalid({ phone: "line\u0000break" }, "control character");

console.log("Contact contract QA: PASS (valid paths, required fields, enums, limits, honeypot, controls, and unexpected fields)");
