import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { Icon } from "@/components/Icon";
import { DoorLink, Dots, hrefIcon } from "@/components/ui-kit";
import { toRoute as hrefTo } from "@/lib/routes";
import { SwitchMode } from "@/components/ui/switch-mode";
import { parsePath } from "@/lib/i18n-path";

type NavItem = { id: string; href: string; ar: string; en: string };

function isItemCurrent(pathname: string, id: string) {
  const { path } = parsePath(pathname);
  if (id === "home") return path === "/";
  return (
    path === `/${id}` ||
    (id === "cases" && path.startsWith("/cases")) ||
    (id === "insights" && path.startsWith("/insights"))
  );
}

export function Header() {
  const { lang, t, loc } = useI18n();
  const location = useLocation();
  const drawerRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const page = location.pathname;
  const primary = EM.NAV_PRIMARY as NavItem[];
  const more = EM.NAV_MORE as NavItem[];
  const moreCurrent = more.some((item) => isItemCurrent(page, item.id));

  function closeDrawer() {
    drawerRef.current?.close();
  }

  function toggleMenu() {
    const drawer = drawerRef.current;
    if (!drawer) return;
    if (drawer.open) {
      drawer.close();
      return;
    }
    lastFocus.current = document.activeElement as HTMLElement;
    drawer.showModal();
    setOpen(true);
  }

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
    drawerRef.current?.close();
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    if (open) closeRef.current?.focus();
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    if (!moreOpen) return;
    function onPointer(event: MouseEvent) {
      if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMoreOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  return (
    <>
      <header className="topbar">
        <div className="shell nav">
          <Link className="brand" to={hrefTo("/", lang)} aria-label="Elite Maison">
            <span className="brand__well">
              <img src="/assets/images/logo-mark.png" alt="" />
            </span>
            <span className="brand__name">Elite Maison</span>
          </Link>
          <nav className="nav__primary" aria-label={t("navLabel")}>
            {primary.map((item) => (
              <NavLink
                key={item.id}
                to={hrefTo(item.href, lang)}
                end={item.id === "home"}
                className="door door--nav"
                aria-current={isItemCurrent(page, item.id) ? "page" : undefined}
              >
                <span>{loc(item)}</span>
              </NavLink>
            ))}
            {more.length ? (
              <div className="nav__more" ref={moreRef}>
                <button
                  type="button"
                  className={`door door--more${moreOpen ? " is-open" : ""}${moreCurrent ? " is-current" : ""}`}
                  aria-expanded={moreOpen}
                  aria-controls="more-panel"
                  aria-haspopup="true"
                  onClick={() => setMoreOpen((value) => !value)}
                >
                  {t("moreLabel")}
                </button>
                {moreOpen ? (
                  <div className="more-panel" id="more-panel" role="menu">
                    {more.map((item) => (
                      <NavLink
                        key={item.id}
                        role="menuitem"
                        to={hrefTo(item.href, lang)}
                        aria-current={isItemCurrent(page, item.id) ? "page" : undefined}
                        onClick={() => setMoreOpen(false)}
                      >
                        {loc(item)}
                      </NavLink>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </nav>
          <div className="nav__tools">
            <SwitchMode />
            <Link className="btn btn--gold" to={hrefTo("/contact", lang)}>
              {t("bookShort")}
            </Link>
            <button
              type="button"
              className="nav__menu"
              aria-expanded={open}
              aria-controls="drawer"
              aria-label={t(open ? "menuClose" : "menuOpen")}
              onClick={toggleMenu}
            >
              <span className="menu-icon" aria-hidden="true"><span /><span /><span /></span>
            </button>
          </div>
        </div>
      </header>
      <dialog
        className="drawer"
        id="drawer"
        ref={drawerRef}
        aria-labelledby="drawerTitle"
        onClose={() => {
          setOpen(false);
          lastFocus.current?.focus();
        }}
      >
        <div className="drawer__bar">
          <Link className="brand" to={hrefTo("/", lang)} aria-label="Elite Maison" onClick={closeDrawer}>
            <span className="brand__well">
              <img src="/assets/images/logo-mark.png" alt="" />
            </span>
            <span className="brand__name">Elite Maison</span>
          </Link>
          <button
            ref={closeRef}
            type="button"
            className="drawer__close"
            aria-label={t("menuClose")}
            onClick={closeDrawer}
          >
            <Icon name="close" rtl={lang === "ar"} />
          </button>
        </div>
        <div className="drawer__body">
          <h2 id="drawerTitle" className="sr-only">{t("navLabel")}</h2>
          <nav aria-label={t("navLabel")}>
            <p className="drawer__label">{t("navLabel")}</p>
            {primary.map((item) => (
              <DoorLink key={item.id} to={item.href} iconName={hrefIcon(item.href)} variant="drawer" end={item.id === "home"}>
                {loc(item)}
              </DoorLink>
            ))}
          </nav>
          {more.length ? (
            <nav aria-label={t("moreLabel")}>
              <p className="drawer__label">{t("moreLabel")}</p>
              {more.map((item) => (
                <DoorLink key={item.id} to={item.href} iconName={hrefIcon(item.href)} variant="drawer">
                  {loc(item)}
                </DoorLink>
              ))}
            </nav>
          ) : null}
          <div className="drawer__lang">
            <span className="drawer__label">{t("langTo")}</span>
            <SwitchMode />
          </div>
          <Link className="btn btn--gold drawer__cta" to={hrefTo("/contact", lang)} onClick={closeDrawer}>
            {t("bookCta")} <Icon name="arrow" rtl={lang === "ar"} />
          </Link>
        </div>
      </dialog>
    </>
  );
}

export function Footer() {
  const { t, loc, lang } = useI18n();
  const c = EM.CONFIG.contact;
  const items = EM.NAV as NavItem[];
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div>
            <div className="footer__lockup">
              <img className="footer__mark" src="/assets/images/logo-lockup.png" alt="Elite Maison Marketing Consultancies" />
            </div>
            <Dots />
            <p>{t("footerText")}</p>
          </div>
          <nav className="footer-nav" aria-label={t("footerNav")}>
            {items.map((item) => (
              <DoorLink key={item.id} to={item.href} iconName={hrefIcon(item.href)} variant="footer">
                {loc(item)}
              </DoorLink>
            ))}
            <DoorLink to="/contact" iconName="contact" variant="footer">{t("bookShort")}</DoorLink>
          </nav>
        </div>
        <div className="footer-meta">
          <span>© 2026 Elite Maison</span>
          <a href={`mailto:${c.email}`} className="footer-meta__link">
            <Icon name="mail" rtl={lang === "ar"} /><span>{c.email}</span>
          </a>
          <a href={c.phoneHref} className="footer-meta__link">
            <Icon name="phone" rtl={lang === "ar"} /><span>{c.phone}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
