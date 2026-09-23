import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useI18n } from "@/context/language";
import { Footer, Header } from "@/components/layout/Chrome";
import { ContactDock } from "@/components/layout/ContactDock";
import { Skyfield } from "@/components/Skyfield";
import { Icon } from "@/components/Icon";
import { SeoHead } from "@/components/seo/SeoHead";
import { pageKey, parsePath } from "@/lib/i18n-path";
import { useHeroLive } from "@/hooks/useHeroLive";
import { useRouteScroll } from "@/hooks/useRouteScroll";

function markRevealed(el: Element) {
  if (el.classList.contains("gold-rule")) el.classList.add("is-draw");
  if (el.classList.contains("dots")) el.classList.add("is-play");
  el.classList.add("is-visible");
}

function primeInView(nodes: NodeListOf<Element>) {
  const viewportFloor = window.innerHeight * 0.92;
  nodes.forEach((node) => {
    const rect = node.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < viewportFloor) markRevealed(node);
  });
}

function observeReveals() {
  const root = document.documentElement;
  const nodes = document.querySelectorAll(".gold-rule, .dots, [data-reveal], .proof-stage");
  const revealAll = () => {
    nodes.forEach((node) => markRevealed(node));
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealAll();
    return () => undefined;
  }

  if (typeof IntersectionObserver !== "function") {
    revealAll();
    return () => undefined;
  }

  try {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          markRevealed(entry.target);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.28, rootMargin: "0px 0px -8% 0px" }
    );

    primeInView(nodes);
    root.classList.add("reveal-ready");

    nodes.forEach((node) => {
      if (!node.classList.contains("is-visible")) io.observe(node);
    });

    return () => {
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  } catch {
    root.classList.remove("reveal-ready");
    revealAll();
    return () => undefined;
  }
}

export function Layout() {
  const { t, lang } = useI18n();
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  useHeroLive();
  useRouteScroll(mainRef);

  useEffect(() => {
    const { path } = parsePath(location.pathname);
    document.body.dataset.page = pageKey(path);
  }, [location.pathname]);

  useEffect(() => {
    let stop = () => undefined as void;
    const frame = window.setTimeout(() => {
      stop = observeReveals();
    }, 40);
    return () => {
      window.clearTimeout(frame);
      stop();
    };
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
      <SeoHead />
      <a className="skip-link" href="#main"><Icon name="direction" rtl={lang === "ar"} />{t("skip")}</a>
      <Skyfield />
      <div className="progress" ref={progressRef} aria-hidden="true" />
      <Header />
      <ContactDock />
      <main id="main" className="page" tabIndex={-1} ref={mainRef}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
