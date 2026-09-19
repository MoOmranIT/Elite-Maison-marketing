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

console.log("[qa:release] governance: separate check; EM_RELEASE_APPROVED must remain unset until successful GoDaddy live QA");
const governanceCode = await run("npm", ["run", "check:release"]);
console.log(`[qa:release] governance: ${governanceCode === 0 ? "PASS" : "OPEN (not a technical QA failure)"}`);

if (technicalFailure) process.exitCode = 1;
