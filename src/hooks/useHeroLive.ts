import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageKey, parsePath } from "@/lib/i18n-path";

const INTRO_MS = 1250;

export function useHeroLive() {
  const location = useLocation();

  useEffect(() => {
    const page = pageKey(parsePath(location.pathname).path);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (page === "home" || reduce.matches) return;

    const roots = [...document.querySelectorAll<HTMLElement>(".hero-visual, .hero:not(.folio-hero)")];
    if (!roots.length) return;

    const fine = window.matchMedia("(pointer: fine)");
    const timers: number[] = [];

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          el.classList.toggle("is-paused", !entry.isIntersecting);
        }
      },
      { threshold: 0.12, rootMargin: "8% 0px" }
    );

    roots.forEach((el) => {
      io.observe(el);
      timers.push(window.setTimeout(() => el.classList.add("is-live"), INTRO_MS));
    });

    function onMove(event: PointerEvent) {
      if (!fine.matches) return;
      const host = (event.currentTarget as HTMLElement);
      const box = host.getBoundingClientRect();
      const x = ((event.clientX - box.left) / Math.max(box.width, 1) - 0.5) * 2;
      const y = ((event.clientY - box.top) / Math.max(box.height, 1) - 0.5) * 2;
      host.style.setProperty("--tilt-x", `${(x * 5).toFixed(2)}px`);
      host.style.setProperty("--tilt-y", `${(y * 4).toFixed(2)}px`);
    }

    function onLeave(event: PointerEvent) {
      const host = event.currentTarget as HTMLElement;
      host.style.setProperty("--tilt-x", "0px");
      host.style.setProperty("--tilt-y", "0px");
    }

    const visuals = roots.filter((el) => el.classList.contains("hero-visual"));
    visuals.forEach((el) => {
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
    });

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      io.disconnect();
      visuals.forEach((el) => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        el.style.removeProperty("--tilt-x");
        el.style.removeProperty("--tilt-y");
        el.classList.remove("is-live", "is-paused");
      });
      roots.forEach((el) => el.classList.remove("is-live", "is-paused"));
    };
  }, [location.pathname]);
}
