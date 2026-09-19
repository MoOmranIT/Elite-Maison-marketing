/**
 * Server-only entry point for browserless static generation.
 *
 * Renders the React app tree under a StaticRouter for a given canonical URL.
 * No browser globals are accessed here.
 */

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { App } from "@/App";

export function renderRoute(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
