import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { ClientApp } from "@/App";
import "@/index.css";
import "../assets/css/folio.css";
import "../assets/css/round2.css";
import "../assets/css/round3.css";
import "../assets/css/round4.css";
import "../assets/css/hero-live.css";
import "../assets/css/home.css";
import "../assets/css/phase4.css";
import "../assets/css/atelier-pass.css";

document.documentElement.classList.add("js");
document.documentElement.classList.add("atelier-pass");
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const rootEl = document.getElementById("root");
const app = (
  <StrictMode>
    <ClientApp />
  </StrictMode>
);

// Canonical SSG pages are marked with data-ssg="1" on the root div.
// Hydrate those; use createRoot for dev / empty shell / root redirect.
if (rootEl?.hasAttribute("data-ssg")) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl!).render(app);
}
