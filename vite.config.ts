import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { existsSync, statSync, createReadStream } from "node:fs";
import { join, relative, resolve } from "node:path";

/**
 * `vite preview` ships an SPA fallback that answers every unknown path with
 * dist/index.html. That hides the per-route files written by
 * scripts/prerender.mjs, so `npm run preview` would not show what a static host
 * actually serves.
 *
 * This middleware runs before Vite's internal middlewares and resolves
 * /ar/cases/patchouli -> dist/ar/cases/patchouli/index.html when that file
 * exists, falling back to Vite otherwise. Production hosts (Netlify, Vercel,
 * nginx `try_files $uri $uri/ …`, GitHub Pages) already behave this way.
 */
function prerenderedRouteFallback(outDir: string): Plugin {
  const root = resolve(outDir);
  return {
    name: "em-prerendered-route-fallback",
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = (req.url || "/").split("?")[0].split("#")[0];
        let raw = rawUrl;
        try {
          raw = decodeURIComponent(rawUrl);
        } catch {
          return next();
        }
        if (raw.includes(".")) return next(); // real files are handled by Vite

        const target = resolve(join(root, raw, "index.html"));
        const relativeTarget = relative(root, target);
        const insideRoot = relativeTarget.length > 0
          && !relativeTarget.startsWith("..")
          && !relativeTarget.startsWith("/")
          && !relativeTarget.startsWith("\\");
        if (!insideRoot) return next();

        let isFile = false;
        try {
          isFile = existsSync(target) && statSync(target).isFile();
        } catch {
          isFile = false;
        }
        if (!isFile) return next();

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        createReadStream(target).pipe(res);
      });
    }
  };
}

const outDir = fileURLToPath(new URL("./dist", import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderedRouteFallback(outDir)],
  appType: "spa",
  publicDir: "public",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    watch: {
      ignored: ["**/*.zip", "**/tmp/**", "**/.qa/**"]
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-dom") || id.includes("/react/") || id.includes("\\react\\") || id.includes("react-router")) {
            return "react-vendor";
          }
          if (id.includes("motion")) return "motion";
          if (id.includes("lucide-react")) return "icons";
        }
      }
    }
  }
});
