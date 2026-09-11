/**
 * Import this module before dynamically importing any "@/…" module.
 * It registers the resolve hook that understands the Vite "@/" alias.
 */
import { register } from "node:module";

register(new URL("./resolve-alias-hooks.mjs", import.meta.url));
