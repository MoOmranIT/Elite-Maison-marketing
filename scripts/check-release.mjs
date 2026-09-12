/**
 * Release gate for the publication decision.
 *
 * `src/data/em.js` carries two switches that decide whether real client names
 * and standalone commercial figures are shown:
 *
 *   EM.CONFIG.publicationApproved  — legal/commercial sign-off is final
 *   EM.CONFIG.anonymizeCases       — force anonymous names + hide metrics
 *
 * Both are documented in em.js as needing final approval before a public
 * launch. This script turns that note into a checkpoint: it prints exactly what
 * would become public and exits non-zero unless approval is stated explicitly.
 *
 * Usage
 *   npm run check:release                     # gate — fails if names are public
 *   EM_RELEASE_APPROVED=1 npm run check:release   # explicit sign-off
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
  "\nBLOCKED — legal/commercial approval for client names and figures is not stated.\n" +
  "  · If approval is final:   re-run with EM_RELEASE_APPROVED=1\n" +
  "  · If it is not:           set publicationApproved: false (or anonymizeCases: true) in src/data/em.js\n" +
  "See docs/prototype-commitments.md → متطلبات ما قبل الإنتاج."
);
process.exit(1);
