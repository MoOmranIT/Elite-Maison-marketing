import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { useI18n } from "@/context/language";
import { toRoute } from "@/lib/routes";
import { Dots, Icon } from "@/components/Icon";
import { LogoChamber } from "@/components/LogoChamber";

export function hrefIcon(href: string) {
  const path = href.toLowerCase();
  if (path.includes("contact") || path.startsWith("mailto:") || path.startsWith("tel:")) return "contact";
  if (path.includes("consulting") || path.includes("consult")) return "consult";
  if (path.includes("execut")) return "execute";
  if (path.includes("case")) return "proof";
  if (path.includes("insight")) return "insight";
  if (path.includes("sector")) return "sector";
  if (path.includes("about")) return "about";
  if (path === "/" || path.includes("index")) return "home";
  return "contact";
}

export function Frame({
  href,
  iconName,
  title,
  text,
  kicker
}: {
  href?: string;
  iconName: string;
  title: string;
  text?: string;
  kicker?: string;
}) {
  const { lang } = useI18n();
  const inner = (
    <>
      <span className="icon-well"><Icon name={iconName} rtl={lang === "ar"} /></span>
      <span>
        {kicker ? <small className="kicker">{kicker}</small> : null}
        <h3>{title}</h3>
        {text ? <p>{text}</p> : null}
      </span>
      {href ? <Icon name="arrow" className="icon icon-go" rtl={lang === "ar"} /> : <span className="icon-go" aria-hidden="true" />}
    </>
  );
  if (href) return <Link className="frame" to={toRoute(href)}>{inner}</Link>;
  return <div className="frame">{inner}</div>;
}

export function DoorLink({
  to,
  iconName,
  children,
  end,
  variant = "nav"
}: {
  to: string;
  iconName: string;
  children: ReactNode;
  end?: boolean;
  variant?: "nav" | "drawer" | "footer" | "crumb";
}) {
  const { lang } = useI18n();
  return (
    <NavLink
      to={toRoute(to)}
      end={end}
      className={`door door--${variant}`}
      aria-label={typeof children === "string" ? children : undefined}
    >
      <span className="icon-well icon-well--sm">
        <Icon name={iconName} rtl={lang === "ar"} />
      </span>
      <span>{children}</span>
    </NavLink>
  );
}

export function Go({ href, label, iconName }: { href: string; label: string; iconName?: string }) {
  const { lang } = useI18n();
  return (
    <Link className="go" to={toRoute(href)}>
      {iconName ? (
        <span className="icon-well icon-well--sm"><Icon name={iconName} rtl={lang === "ar"} /></span>
      ) : null}
      <span>{label}</span>
      <Icon name="arrow" rtl={lang === "ar"} />
    </Link>
  );
}

export function CtaBand({
  title,
  href,
  label,
  kicker,
  tone
}: {
  title: string;
  href: string;
  label: string;
  kicker?: string;
  tone?: "strong" | "sand";
}) {
  const { lang } = useI18n();
  const cls = tone === "strong" ? "section section--plum" : "section section--sand";
  return (
    <section className={cls}>
      <div className="shell cta-band">
        <div className="head">
          <p className="kicker kicker-row">
            <span className="icon-well icon-well--sm"><Icon name={hrefIcon(href)} rtl={lang === "ar"} /></span>
            {kicker}
          </p>
          <hr className="gold-rule" />
          <h2>{title}</h2>
        </div>
        <Link className="btn btn--gold" to={toRoute(href)}>
          <Icon name={hrefIcon(href)} rtl={lang === "ar"} />
          {label} <Icon name="arrow" rtl={lang === "ar"} />
        </Link>
      </div>
    </section>
  );
}

export function PageHero({
  kicker,
  title,
  lead,
  variant = "quiet",
  iconName
}: {
  kicker: string;
  title: string;
  lead: string;
  variant?: "quiet" | "system" | "story" | "hush";
  iconName?: string;
}) {
  const { lang } = useI18n();
  return (
    <header className={`hero hero-${variant}`}>
      <div className="shell hero__grid">
        <div className="hero-seq">
          <p className="kicker kicker-row">
            {iconName ? (
              <span className="icon-well icon-well--sm"><Icon name={iconName} rtl={lang === "ar"} /></span>
            ) : null}
            {kicker}
          </p>
          <hr className="gold-rule" />
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
        </div>
        <div className="hero-media">
          <LogoChamber compact />
        </div>
      </div>
    </header>
  );
}

export function Crumbs({
  items
}: {
  items: { href?: string; label: string; icon?: string }[];
}) {
  const { lang } = useI18n();
  return (
    <div className="crumb">
      <div className="shell">
        {items.map((item, i) => (
          <span className="crumb__item" key={`${item.label}-${i}`}>
            {i > 0 ? <span className="crumb__sep" aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link className="crumb__link" to={toRoute(item.href)}>
                {item.icon ? <Icon name={item.icon} rtl={lang === "ar"} /> : null}
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export { Dots };
