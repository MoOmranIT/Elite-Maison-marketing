/**
 * Release gate for the publication decision.
 *
 * `src/data/em.js` carries two switches that decide whether real client names
 * and standalone commercial figures are shown:
 *
 *   EM.CONFIG.publicationApproved  — legal/commercial sign-off is final
 *   EM.CONFIG.anonymizeCases       — force anonymous names + hide metrics
 *
 * The owner granted publication approval on 2026-09-18. This script remains a
 * separate crawler/indexing activation checkpoint: it prints exactly what would
 * become public and exits non-zero while EM_RELEASE_APPROVED is intentionally
 * unset before successful GoDaddy live QA.
 *
 * Usage
 *   npm run check:release                     # governance checkpoint; remains open before live QA
 *   EM_RELEASE_APPROVED=1 npm run check:release   # explicit crawler/indexing activation
 *
 * It is intentionally NOT wired into `npm run build`: the prototype must keep
 * building for internal client review with named cases visible.
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
  "\nOPEN — human publication approval is GRANTED (2026-09-18), but EM_RELEASE_APPROVED is intentionally unset.\n" +
  "  · Complete GoDaddy live QA first.\n" +
  "  · Then, only with the owner's release decision, re-run with EM_RELEASE_APPROVED=1 to open crawler/indexing access.\n" +
  "  · Do not change publicationApproved or anonymizeCases as an automation shortcut."
);
process.exit(1);
