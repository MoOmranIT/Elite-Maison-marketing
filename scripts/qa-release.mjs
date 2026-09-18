import { spawn } from "node:child_process";

const checks = [
  ["typecheck", "npm", ["run", "typecheck"]],
  ["contact contract", "npm", ["run", "qa:inquiry"]],
  ["production build", "npm", ["run", "build"]],
  ["SEO audit", "npm", ["run", "qa:seo"]],
  ["dependency audit", "npm", ["audit", "--omit=optional", "--audit-level=high"]],
  ["release gate", "npm", ["run", "check:release"]]
];

function run(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, { stdio: "inherit", shell: process.platform === "win32" });
    child.on("close", (code) => resolve(code ?? 1));
  });
}

let failed = false;
for (const [label, command, args] of checks) {
  const code = await run(command, args);
  const gateBlocked = label === "release gate" && code !== 0;
  console.log(`[qa:release] ${label}: ${gateBlocked ? "BLOCKED as expected" : code === 0 ? "PASS" : "FAIL"}`);
  if (code !== 0 && !gateBlocked) failed = true;
}

if (failed) process.exitCode = 1;
