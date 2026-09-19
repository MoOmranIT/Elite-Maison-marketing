/**
 * Release gate for the publication decision.
 *
 * Exit codes:
 *   0 — governance/release gate PASS (EM_RELEASE_APPROVED=1)
 *   1 — actual runtime/configuration/script failure
 *   2 — approval absent / governance OPEN (EM_RELEASE_APPROVED not set)
 *
 * The owner granted publication approval on 2026-09-18 and production
 * release/indexing approval on 2026-09-19. Production builds run with
 * EM_RELEASE_APPROVED=1 via .env.production. This script validates that
 * the explicit approval is present in the current environment.
 *
 * Usage
 *   npm run check:release                     # governance checkpoint
 *   EM_RELEASE_APPROVED=1 npm run check:release   # explicit crawler/indexing activation
 *
 * It is now wired into `npm run build` via .env.production so the standard
 * production environment opens crawler/indexing access automatically.
 */
import "./lib/register-alias.mjs";

const { EM } = await import("@/data/em.js");

const config = EM.CONFIG;
const isPublic = config.publicationApproved !== false && !config.anonymizeCases;

console.log("Elite Maison — publication gate");
console.log(`  publicationApproved : ${config.publicationApproved}`);
console.log(`  anonymizeCases      : ${config.anonymizeCases}`);
console.log(`  siteUrl             : ${config.siteUrl}`);
console.log(`  contact             : ${config.contact.email} · ${config.contact.phone}`);
console.log(`  result              : client names and metrics are ${isPublic ? "PUBLIC" : "hidden"}`);

if (!isPublic) {
  console.log("\nOK — cases render with anonymous names and no standalone metrics.");
  process.exit(0);
}

console.log("\nThe following would be published:");
for (const item of EM.CASES) {
  const name = item.publicName?.en || item.publicName?.ar || item.id;
  const metric = item.metric ? `${item.metric.value} ${item.metric.unit?.en || ""}`.trim() : "—";
  const extras = [
    item.beats ? `beats: ${item.beats.map((b) => b.value).join(" → ")}` : null,
    item.markets ? `markets: ${item.markets.map((m) => m.en).join(", ")}` : null,
    item.proof ? `proof: ${item.proof.en || item.proof.ar}` : null
  ].filter(Boolean).join(" · ");
  console.log(`  • ${name} — metric: ${metric}${extras ? `\n      ${extras}` : ""}`);
}

if (process.env.EM_RELEASE_APPROVED === "1") {
  console.log("\nOK — EM_RELEASE_APPROVED=1 was set; named publication accepted.");
  process.exit(0);
}

console.error(
  "\nGOVERNANCE OPEN — EM_RELEASE_APPROVED is not set in this environment.\n" +
  "  · Production builds should use .env.production with EM_RELEASE_APPROVED=1.\n" +
  "  · Human publication approval: GRANTED — 2026-09-18.\n" +
  "  · Production release/indexing decision: GRANTED — 2026-09-19.\n" +
  "  · Do not change publicationApproved or anonymizeCases as an automation shortcut."
);
process.exit(2);
