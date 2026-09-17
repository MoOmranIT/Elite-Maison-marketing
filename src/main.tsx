import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "@/App";
import "@/index.css";
import "../assets/css/folio.css";
import "../assets/css/round2.css";
import "../assets/css/round3.css";
import "../assets/css/round4.css";
import "../assets/css/hero-live.css";
import "../assets/css/home.css";
import "../assets/css/phase4.css";

document.documentElement.classList.add("js");
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
