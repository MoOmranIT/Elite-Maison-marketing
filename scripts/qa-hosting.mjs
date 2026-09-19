#!/usr/bin/env node
import { existsSync } from "node:fs";
import { request as httpRequest } from "node:http";
import { spawn } from "node:child_process";
import { join } from "node:path";

const ROOT = process.cwd();
const DIST = join(ROOT, "dist");
const PORT = 4176;
const LOCAL_BASE = `http://127.0.0.1:${PORT}`;
const requestedHost = process.argv.find((arg) => arg.startsWith("--host="))?.slice(7)
  || (process.argv.includes("--host") ? process.argv[process.argv.indexOf("--host") + 1] : null);
const external = requestedHost ? new URL(requestedHost) : null;
const BASE = external ? external.toString().replace(/\/$/, "") : LOCAL_BASE;

function requestLocal(path, options = {}) {
  return new Promise((resolve, reject) => {
    const target = new URL(`${LOCAL_BASE}${path}`);
    const request = httpRequest(target, {
      method: options.method || "GET",
      headers: options.headers,
    }, (response) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => resolve(new Response(Buffer.concat(chunks), {
        status: response.statusCode,
        headers: response.headers,
      })));
    });
    request.on("error", reject);
    request.end();
  });
}

const child = external ? null : spawn(process.execPath, [join(ROOT, "server.mjs")], {
  cwd: ROOT,
  env: { ...process.env, PORT: String(PORT) },
  stdio: "inherit",
  shell: false
});

const check = (condition, message) => {
  if (!condition) throw new Error(message);
  console.log(`PASS ${message}`);
};
const request = (path, options = {}) => external
  ? fetch(`${BASE}${path}`, { redirect: "manual", ...options })
  : requestLocal(path, options);
const locationPath = (response) => new URL(response.headers.get("location") || "http://invalid", BASE).pathname;

async function waitForServer() {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    try {
      const response = await request("/");
      if (response.status > 0) return;
    } catch { /* process is starting */ }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Node production server did not start on ${BASE}`);
}

async function expect200(path) {
  const response = await request(path);
  check(response.status === 200, `${path} returns 200`);
  return response;
}

async function expectRedirect(path, target, headers = {}) {
  const response = await request(path, { headers });
  check(response.status === 301, `${path} returns one-hop 301`);
  check(locationPath(response) === target, `${path} redirects to ${target}`);
  return response;
}

try {
  check(existsSync(DIST), "dist exists");
  await waitForServer();

  for (const path of ["/ar", "/en", "/ar/about", "/en/consulting", "/ar/cases/patchouli", "/en/insights/ai-insight", "/ar/contact"]) {
    await expect200(path);
  }

  for (const [path, type] of [["/assets/images/elite-architecture.avif", "image/avif"], ["/assets/images/favicon-32.png", "image/png"]]) {
    const response = await expect200(path);
    check(response.headers.get("content-type")?.startsWith(type), `${path} has ${type} content type`);
  }

  await expectRedirect("/ar/about/", "/ar/about");
  await expect200("/ar/about");
  await expectRedirect("/about.html", "/ar/about");
  await expectRedirect("/case.html?id=patchouli", "/ar/cases/patchouli");
  await expectRedirect("/insight.html?id=ai-insight", "/ar/insights/ai-insight");

  const notFound = await request("/__node-hosting-404-test__");
  check(notFound.status === 404, "unknown page returns real 404");
  check((await notFound.text()).includes("noindex") && (await request("/__node-hosting-404-test__")).status === 404, "404 serves branded noindex document");

  for (const path of ["/package.json", "/%2e%2e/package.json", "/%2e%2e%2fpackage.json", "/server.mjs"]) {
    const response = await request(path);
    check(response.status === 404, `${path} cannot expose source files`);
  }

  const headHtml = await request("/ar", { method: "HEAD" });
  check(headHtml.status === 200 && !(await headHtml.text()), "HEAD HTML returns 200 with no body");
  const headAsset = await request("/assets/images/favicon-32.png", { method: "HEAD" });
  check(headAsset.status === 200 && !(await headAsset.text()), "HEAD asset returns 200 with no body");
  const post = await request("/ar", { method: "POST" });
  check(post.status === 405 && post.headers.get("allow") === "GET, HEAD", "unsupported methods return 405");

  if (!external) {
    const apex = await request("/ar/about?from=qa", { headers: { Host: "elitemaisonmarketing.com" } });
    check(apex.status === 301, "production apex returns one-hop 301");
    check(apex.headers.get("location") === "https://www.elitemaisonmarketing.com/ar/about?from=qa", "production apex redirects to canonical HTTPS www");
    const preview = await request("/ar", { headers: { Host: "preview.godaddy.example" } });
    check(preview.status === 200 && !preview.headers.has("location"), "preview host is not forced to production");
    const www = await request("/ar", { headers: { Host: "www.elitemaisonmarketing.com", "X-Forwarded-Proto": "https" } });
    check(www.status === 200 && !www.headers.has("location"), "canonical HTTPS www has no host redirect");
  } else {
    console.log(`INFO external host mode: ${BASE}; host-header simulation is local-only`);
  }

  /* ----------------------------------------------------------- redirect security */
  const securityPaths = [
    "/%0dfoo",
    "/%0afoo",
    "/%09foo",
    "/%E2%9C%93",
    "/%D9%85%D8%B1%D8%AD%D8%A8%D8%A7",
    "/%E0%A4%A"
  ];
  let securityCrashes = 0;
  let securityInjection = 0;
  for (const p of securityPaths) {
    try {
      const res = await request(p);
      const location = res.headers.get("location") || "";
      if (location.includes("\r") || location.includes("\n") || location.includes("\t")) {
        securityInjection += 1;
      }
      if (res.status >= 500) securityCrashes += 1;
    } catch {
      securityCrashes += 1;
    }
  }
  check(securityCrashes === 0, `redirect-security: no process crashes (crashes=${securityCrashes})`);
  check(securityInjection === 0, `redirect-security: no header injection (injection=${securityInjection})`);

  console.log(`qa:hosting: PASS (${external ? "external" : "local Node server"})`);
} catch (error) {
  console.error(`qa:hosting: FAIL — ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
} finally {
  if (child) child.kill();
}
