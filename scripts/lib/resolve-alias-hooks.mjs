/**
 * Node ESM resolve hook: maps the Vite "@/" alias onto ./src so build-time
 * scripts can import the real application modules (src/lib/seo.ts, etc.)
 * instead of re-implementing their logic.
 */
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SRC_ROOT = fileURLToPath(new URL("../../src/", import.meta.url));

const EXTENSIONS = [".ts", ".tsx", ".js", ".mjs"];
const INDEXES = EXTENSIONS.map((ext) => `index${ext}`);

function asFile(candidate) {
  try {
    return existsSync(candidate) && statSync(candidate).isFile() ? candidate : null;
  } catch {
    return null;
  }
}

export async function resolve(specifier, context, nextResolve) {
  if (!specifier.startsWith("@/")) return nextResolve(specifier, context);

  const base = join(SRC_ROOT, specifier.slice(2));
  const candidates = [base, ...EXTENSIONS.map((ext) => base + ext), ...INDEXES.map((name) => join(base, name))];

  for (const candidate of candidates) {
    const hit = asFile(candidate);
    if (hit) return { url: pathToFileURL(hit).href, shortCircuit: true };
  }

  throw new Error(`[em-alias] Cannot resolve "${specifier}" from ${SRC_ROOT}`);
}
