import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL(".", import.meta.url));
const DIST = resolve(ROOT, "dist");
const HOST = "0.0.0.0";
const PRODUCTION_APEX = "elitemaisonmarketing.com";
const PRODUCTION_WWW = "www.elitemaisonmarketing.com";
const CASE_IDS = new Set(["attractive-smile", "bloom", "bin-ablan", "patchouli", "ai-brains"]);
const INSIGHT_IDS = new Set(["growth-guide", "sales-article", "expansion-brief", "ai-insight", "cx-check", "gcc-market-entry-readiness"]);
const MIME = {
  ".avif": "image/avif", ".css": "text/css; charset=utf-8", ".gif": "image/gif",
  ".html": "text/html; charset=utf-8", ".ico": "image/x-icon", ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8", ".webp": "image/webp", ".woff": "font/woff",
  ".woff2": "font/woff2", ".xml": "application/xml; charset=utf-8"
};

function parsePort(value) {
  const port = value === undefined || value === "" ? 3000 : Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error(`Invalid PORT: ${String(value)}`);
  return port;
}

function requestHost(req) {
  return String(req.headers.host || "").toLowerCase().split(":")[0];
}

function forwardedProto(req) {
  const value = String(req.headers["x-forwarded-proto"] || "").split(",")[0].trim().toLowerCase();
  return value === "https" || value === "http" ? value : "";
}

function redirect(res, location) {
  // Safety: never place decoded control characters into Location header.
  // Re-encode to prevent header injection via double-decoded paths.
  const safeLocation = String(location).replace(/[\u0000-\u001F\u007F]/g, "");
  res.statusCode = 301;
  res.setHeader("Location", safeLocation);
  res.setHeader("Cache-Control", "no-store");
  res.end();
}

function productionHostRedirect(req, res, target) {
  const host = requestHost(req);
  if (host === PRODUCTION_APEX || (host === PRODUCTION_WWW && forwardedProto(req) === "http")) {
    redirect(res, `https://${PRODUCTION_WWW}${target}`);
    return true;
  }
  return false;
}

function legacyTarget(url) {
  const path = url.pathname.toLowerCase();
  const simple = {
    "/index.html": "/ar", "/about.html": "/ar/about", "/consulting.html": "/ar/consulting",
    "/execution.html": "/ar/execution", "/sectors.html": "/ar/sectors", "/cases.html": "/ar/cases",
    "/insights.html": "/ar/insights", "/contact.html": "/ar/contact"
  };
  if (simple[path]) return simple[path];
  if (path === "/case.html") {
    const id = url.searchParams.get("id");
    return id ? (CASE_IDS.has(id) ? `/ar/cases/${id}` : null) : "/ar/cases";
  }
  if (path === "/insight.html") {
    const id = url.searchParams.get("id");
    return id ? (INSIGHT_IDS.has(id) ? `/ar/insights/${id}` : null) : "/ar/insights";
  }
  return undefined;
}

function decodePath(rawPath) {
  try {
    const decoded = decodeURIComponent(rawPath);
    // Reject paths containing decoded ASCII control characters
    if (/[\u0000-\u001F\u007F]/.test(decoded)) return null;
    return decoded;
  } catch {
    return null;
  }
}

function isInsideDist(file) {
  const relativePath = relative(resolve(DIST), resolve(file));
  return relativePath !== "" && !relativePath.startsWith("..") && !relativePath.startsWith("/") && !relativePath.startsWith("\\");
}

function fileTarget(decodedPath) {
  const pathname = decodedPath === "/" ? "/index.html" : decodedPath;
  const candidate = resolve(join(DIST, `.${pathname}`));
  if (!isInsideDist(candidate)) return null;
  try {
    if (statSync(candidate).isFile()) return candidate;
  } catch { /* try route index below */ }
  if (!pathname.includes(".")) {
    const routeFile = resolve(join(DIST, `.${pathname}`, "index.html"));
    if (!isInsideDist(routeFile)) return null;
    try {
      if (statSync(routeFile).isFile()) return routeFile;
    } catch { /* missing route */ }
  }
  return null;
}

function cacheControl(file) {
  const relativeFile = relative(DIST, file).replaceAll("\\", "/");
  if (relativeFile === "robots.txt" || relativeFile === "sitemap.xml" || relativeFile === "404.html" || extname(file) === ".html") {
    return "no-cache, max-age=0, must-revalidate";
  }
  return /-[A-Za-z0-9]{8,}\.[^/]+$/.test(relativeFile)
    ? "public, max-age=31536000, immutable"
    : "public, max-age=300, must-revalidate";
}

function headersFor(file) {
  return {
    "Cache-Control": cacheControl(file),
    "Content-Type": MIME[extname(file).toLowerCase()] || "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  };
}

function sendFile(req, res, file, statusCode = 200) {
  res.statusCode = statusCode;
  for (const [key, value] of Object.entries(headersFor(file))) res.setHeader(key, value);
  if (req.method === "HEAD") {
    res.end();
    return;
  }
  createReadStream(file).on("error", () => {
    if (!res.headersSent) res.statusCode = 500;
    res.end();
  }).pipe(res);
}

function sendNotFound(req, res) {
  const file = resolve(DIST, "404.html");
  if (existsSync(file) && isInsideDist(file)) {
    sendFile(req, res, file, 404);
    return;
  }
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate");
  res.end(req.method === "HEAD" ? undefined : "Not found");
}

function handle(req, res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end(req.method === "HEAD" ? undefined : "Method Not Allowed");
    return;
  }

  const rawTarget = String(req.url || "/");
  let url;
  try {
    url = new URL(rawTarget, "http://localhost");
  } catch {
    sendNotFound(req, res);
    return;
  }
  // url.pathname is decoded once by URL constructor; do NOT decode again.
  const decodedPath = decodePath(url.pathname);
  if (decodedPath === null || decodedPath.includes("..")) {
    sendNotFound(req, res);
    return;
  }
  const target = `${decodedPath}${url.search}`;
  if (productionHostRedirect(req, res, target)) return;

  const legacy = legacyTarget(url);
  if (legacy !== undefined) {
    if (legacy === null) {
      sendNotFound(req, res);
      return;
    }
    const context = [...url.searchParams]
      .filter(([key]) => key !== "id")
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");
    redirect(res, `${legacy}${context ? `?${context}` : ""}`);
    return;
  }

  if (decodedPath !== "/" && decodedPath.endsWith("/")) {
    const canonicalPath = decodedPath.slice(0, -1) || "/";
    if (fileTarget(canonicalPath)) {
      redirect(res, `${canonicalPath}${url.search}`);
      return;
    }
    sendNotFound(req, res);
    return;
  }

  const file = fileTarget(decodedPath);
  if (!file) {
    sendNotFound(req, res);
    return;
  }
  sendFile(req, res, file);
}

const PORT = parsePort(process.env.PORT);
if (!existsSync(DIST)) {
  console.error(`[server] dist directory not found: ${DIST}`);
  process.exitCode = 1;
} else {
  const server = createServer(handle);
  server.on("error", (error) => {
    console.error(`[server] ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
  server.listen(PORT, HOST, () => console.log(`[server] serving ${DIST} on http://${HOST}:${PORT}`));
}

export { handle };
