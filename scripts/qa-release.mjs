import { spawn } from "node:child_process";

const technicalChecks = [
  ["typecheck", "npm", ["run", "typecheck"]],
  ["copy integrity", "npm", ["run", "qa:copy"]],
  ["inquiry contract", "npm", ["run", "qa:inquiry"]],
  ["production build", "npm", ["run", "build"]],
  ["SEO audit", "npm", ["run", "qa:seo"]],
  ["browser/accessibility QA", "npm", ["run", "qa"]],
  ["Node hosting HTTP QA", "npm", ["run", "qa:hosting"]],
  ["dependency audit", "npm", ["audit", "--omit=optional", "--audit-level=high"]]
];

function run(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, { stdio: "inherit", shell: process.platform === "win32" });
    child.on("close", (code) => resolve(code ?? 1));
  });
}

let technicalFailure = false;
for (const [label, command, args] of technicalChecks) {
  const code = await run(command, args);
  console.log(`[qa:release] ${label}: ${code === 0 ? "PASS" : "FAIL"}`);
  if (code !== 0) technicalFailure = true;
}

console.log("[qa:release] governance: check:release sees the approved production environment");
const governanceCode = await run("npm", ["run", "check:release"]);

if (governanceCode === 0) {
  console.log("[qa:release] governance: PASS (release gate satisfied)");
} else if (governanceCode === 2) {
  console.log("[qa:release] governance: OPEN (EM_RELEASE_APPROVED not set in this environment)");
} else {
  console.log(`[qa:release] governance: FAIL (unexpected check:release failure — exit ${governanceCode})`);
  technicalFailure = true;
}

if (technicalFailure) {
  console.error("\n[qa:release] FAIL — one or more checks failed.");
  process.exitCode = 1;
} else {
  console.log("\n[qa:release] PASS — all technical checks passed.");
}
