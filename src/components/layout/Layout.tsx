import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { Footer, Header } from "@/components/layout/Chrome";
import { Icon } from "@/components/Icon";

export function Layout() {
  const { t, loc, lang } = useI18n();
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = location.pathname.replace(/^\//, "") || "home";
    const key = location.pathname.startsWith("/cases/") ? "case"
      : location.pathname.startsWith("/insights/") ? "insight"
      : id || "home";
    document.body.dataset.page = key;
    const meta = EM.PAGES[key] || EM.PAGES.home;
    document.title = loc(meta.title);
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", loc(meta.description));
  }, [location.pathname, lang, loc]);

  useEffect(() => {
    document.querySelectorAll(".gold-rule").forEach((n) => n.classList.add("is-draw"));
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
      return;
    }
    window.scrollTo(0, 0);
    mainRef.current?.focus();
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const bar = document.querySelector(".topbar");
    const progress = progressRef.current;
    let solid = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (!solid && y > 32) {
        solid = true;
        bar?.classList.add("is-solid");
      } else if (solid && y < 8) {
        solid = false;
        bar?.classList.remove("is-solid");
      }
      if (!progress) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main"><Icon name="direction" rtl={lang === "ar"} />{t("skip")}</a>
      <div className="progress" ref={progressRef} aria-hidden="true" />
      <Header />
      <main id="main" className="page" tabIndex={-1} ref={mainRef}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
