import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { Icon } from "@/components/Icon";
import { DoorLink, Dots } from "@/components/ui-kit";
import { NAV_ICONS } from "@/lib/em";
import { toRoute as hrefTo } from "@/lib/routes";

export function Header() {
  const { lang, setLang, t, loc } = useI18n();
  const location = useLocation();
  const drawerRef = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const page = location.pathname;

  const items = (EM.NAV as { id: string; href: string; ar: string; en: string }[])
    .filter((item) => item.id !== "home" && item.id !== "contact");

  const isCurrent = (id: string) =>
    page === `/${id}` ||
    (id === "cases" && page.startsWith("/cases")) ||
    (id === "insights" && page.startsWith("/insights")) ||
    (id === "about" && page === "/about");

  function toggleMenu() {
    const drawer = drawerRef.current;
    if (!drawer) return;
    if (drawer.open) {
      drawer.close();
    } else {
      lastFocus.current = document.activeElement as HTMLElement;
      drawer.showModal();
      setOpen(true);
    }
  }

  useEffect(() => {
    setOpen(false);
    drawerRef.current?.close();
  }, [location.pathname]);

  return (
    <>
      {page === "/" ? (
        <div className="ambient" aria-hidden="true">
          <div className="drift drift-a" />
          <div className="drift drift-b" />
        </div>
      ) : null}
      <header className="topbar">
        <div className="shell nav">
          <div className="brand-cluster">
            <Link className="brand" to="/" aria-label="Elite Maison">
              <span className="brand__well">
                <img src="/assets/images/logo-mark.png" alt="" />
              </span>
              <span className="brand__name">Elite Maison</span>
            </Link>
            <DoorLink to="/" iconName="home" end>{t("homeCrumb")}</DoorLink>
          </div>
          <nav className="nav__primary" aria-label={t("navLabel")}>
            {items.map((item) => (
              <NavLink
                key={item.id}
                to={hrefTo(item.href)}
                className="door door--nav"
                aria-current={isCurrent(item.id) ? "page" : undefined}
              >
                <span className="icon-well icon-well--sm">
                  <Icon name={NAV_ICONS[item.id] || "about"} rtl={lang === "ar"} />
                </span>
                <span>{loc(item)}</span>
              </NavLink>
            ))}
          </nav>
          <div className="nav__tools">
            <button
              type="button"
              className="lang-btn"
              aria-label={t("langTo")}
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            >
              {t("langBtn")}
            </button>
            <Link className="btn btn--gold" to="/contact">
              <Icon name="contact" rtl={lang === "ar"} />
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
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) drawerRef.current?.close();
        }}
      >
        <h2 id="drawerTitle" className="sr-only">{t("navLabel")}</h2>
        <nav aria-label={t("navLabel")}>
          <DoorLink to="/" iconName="home" end variant="drawer">{t("homeCrumb")}</DoorLink>
          {items.map((item) => (
            <DoorLink key={item.id} to={item.href} iconName={NAV_ICONS[item.id] || "about"} variant="drawer">
              {loc(item)}
            </DoorLink>
          ))}
        </nav>
        <Link className="btn btn--gold" to="/contact">
          <Icon name="contact" rtl={lang === "ar"} />
          {t("bookCta")} <Icon name="arrow" rtl={lang === "ar"} />
        </Link>
      </dialog>
    </>
  );
}

export function Footer() {
  const { t, loc, lang } = useI18n();
  const c = EM.CONFIG.contact;
  const items = (EM.NAV as { id: string; href: string; ar: string; en: string }[])
    .filter((item) => item.id !== "home");
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
              <DoorLink key={item.id} to={item.href} iconName={NAV_ICONS[item.id] || "about"} variant="footer">
                {loc(item)}
              </DoorLink>
            ))}
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
