import { type RefObject, useLayoutEffect, useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { parsePath } from "@/lib/i18n-path";

const positions = new Map<string, number>();
let last = { pathname: "", search: "", hash: "", key: "" };
let pending = 0;
const retries: number[] = [];
let ignoring = false;

function disableBrowserRestoration() {
  try {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  } catch {
    /* ignore */
  }
}

function lockInstant() {
  document.documentElement.style.scrollBehavior = "auto";
  document.body.style.scrollBehavior = "auto";
  document.documentElement.style.overflowAnchor = "none";
}

function unlockInstant() {
  document.documentElement.style.scrollBehavior = "";
  document.body.style.scrollBehavior = "";
  document.documentElement.style.overflowAnchor = "";
  ignoring = false;
}

function setY(y: number) {
  ignoring = true;
  lockInstant();
  const top = Math.max(0, y);
  const html = document.documentElement;
  const body = document.body;
  const se = document.scrollingElement;
  html.scrollTop = top;
  body.scrollTop = top;
  if (se && se !== html && se !== body) se.scrollTop = top;
  window.scrollTo(0, top);
}

function clearScheduled() {
  retries.forEach((id) => window.clearTimeout(id));
  retries.length = 0;
  window.clearTimeout(pending);
}

function applyY(y: number, persist = false) {
  clearScheduled();
  const run = () => setY(y);
  run();
  requestAnimationFrame(() => {
    run();
    requestAnimationFrame(run);
  });
  if (persist) {
    for (const ms of [50, 150, 280]) retries.push(window.setTimeout(run, ms));
    pending = window.setTimeout(unlockInstant, 320);
    return;
  }
  pending = window.setTimeout(unlockInstant, 48);
}

function decodeHash(hash: string) {
  const raw = hash.replace(/^#/, "");
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function scrollToHash(hash: string) {
  clearScheduled();
  const id = decodeHash(hash);
  if (!id) {
    applyY(0);
    return;
  }
  let tries = 0;
  const jump = () => {
    const el = document.getElementById(id);
    if (!el) return false;
    ignoring = true;
    lockInstant();
    el.scrollIntoView({ block: "start", behavior: "auto" });
    return true;
  };
  if (jump()) {
    pending = window.setTimeout(unlockInstant, 80);
    return;
  }
  const tick = () => {
    if (jump()) {
      pending = window.setTimeout(unlockInstant, 80);
      return;
    }
    if (tries++ > 24) {
      applyY(0);
      return;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function isLangSwap(prevPath: string, nextPath: string) {
  const prev = parsePath(prevPath);
  const next = parsePath(nextPath);
  return Boolean(prev.lang && next.lang && prev.lang !== next.lang && prev.path === next.path);
}

export function useRouteScroll(mainRef?: RefObject<HTMLElement | null>) {
  const location = useLocation();
  const navType = useNavigationType();

  useLayoutEffect(() => {
    disableBrowserRestoration();
  }, []);

  useEffect(() => {
    const save = () => {
      if (ignoring) return;
      positions.set(location.key, window.scrollY);
    };
    save();
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, [location.key]);

  useLayoutEffect(() => {
    disableBrowserRestoration();
    const prev = last;
    const current = {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      key: location.key
    };

    if (prev.key && prev.key !== current.key) {
      positions.set(prev.key, window.scrollY);
    }

    const langSwap = Boolean(prev.pathname)
      && isLangSwap(prev.pathname, current.pathname)
      && prev.search === current.search
      && prev.hash === current.hash;

    const sameLocation = Boolean(prev.pathname)
      && prev.pathname === current.pathname
      && prev.search === current.search
      && prev.hash === current.hash
      && prev.key === current.key;

    last = current;

    if (sameLocation) return;

    if (langSwap) {
      applyY(positions.get(prev.key) ?? window.scrollY, true);
      return;
    }

    if (location.hash) {
      scrollToHash(location.hash);
      return;
    }

    if (navType === "POP") {
      const saved = positions.get(location.key);
      if (saved != null) {
        applyY(saved, true);
        return;
      }
    }

    applyY(0);
    mainRef?.current?.focus({ preventScroll: true });
  }, [location.hash, location.key, location.pathname, location.search, mainRef, navType]);
}
