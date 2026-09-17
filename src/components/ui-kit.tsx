import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { useI18n } from "@/context/language";
import { toRoute } from "@/lib/routes";
import { Dots, Icon } from "@/components/Icon";
import { LogoChamber } from "@/components/LogoChamber";
import { AtlasVisual, ProofVisual, QuietVisual, RouteVisual, SystemVisual } from "@/components/folio/HeroVisual";

export function hrefIcon(href: string) {
  const path = href.toLowerCase();
  if (path.includes("contact") || path.startsWith("mailto:") || path.startsWith("tel:")) return "contact";
  if (path.includes("consulting") || path.startsWith("/consult")) return "consult";
  if (path.includes("execut")) return "execute";
  if (path.includes("case")) return "proof";
  if (path.includes("insight")) return "insight";
  if (path.includes("sector")) return "sector";
  if (path.includes("about")) return "about";
  if (path === "/" || path.includes("index")) return "home";
  return "contact";
}

const HERO_VARIANT: Record<string, string> = {
  quiet: "editorial",
  system: "service",
  story: "proof",
  hush: "conversion",
  editorial: "editorial",
  service: "service",
  proof: "proof",
  conversion: "conversion",
  home: "home"
};

export function GoldRule({ long = false }: { long?: boolean }) {
  return <hr className={`gold-rule${long ? " gold-rule--long" : ""}`} />;
}

export function Frame({
  href,
  iconName,
  title,
  text,
  kicker,
  level = 3
}: {
  href?: string;
  iconName: string;
  title: string;
  text?: string;
  kicker?: string;
  level?: 2 | 3;
}) {
  const { lang } = useI18n();
  const Heading = level === 2 ? "h2" : "h3";
  const inner = (
    <>
      <span className="icon-well"><Icon name={iconName} rtl={lang === "ar"} /></span>
      <div className="frame__body">
        {kicker ? <small className="kicker">{kicker}</small> : null}
        <Heading className="frame__title">{title}</Heading>
        {text ? <p>{text}</p> : null}
      </div>
      {href ? <Icon name="arrow" className="icon icon-go" rtl={lang === "ar"} /> : <span className="icon-go" aria-hidden="true" />}
    </>
  );
  if (href) return <Link className="frame" to={toRoute(href, lang)}>{inner}</Link>;
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
  const hideIcon = variant === "footer" || variant === "drawer";
  const home = to === "/" || to === "index.html";
  return (
    <NavLink
      to={toRoute(to, lang)}
      end={end ?? home}
      className={`door door--${variant}`}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {hideIcon ? null : (
        <span className="icon-well icon-well--sm">
          <Icon name={iconName} rtl={lang === "ar"} />
        </span>
      )}
      <span>{children}</span>
    </NavLink>
  );
}

export function Go({ href, label, iconName }: { href: string; label: string; iconName?: string }) {
  const { lang } = useI18n();
  if (!label || !label.trim()) return null;
  return (
    <Link className="go" to={toRoute(href, lang)}>
      {iconName ? (
        <span className="icon-well icon-well--sm"><Icon name={iconName} rtl={lang === "ar"} /></span>
      ) : null}
      <span>{label}</span>
      <Icon name="arrow" rtl={lang === "ar"} />
    </Link>
  );
}

export function SectionIntro({
  kicker,
  title,
  text,
  wide = false
}: {
  kicker?: string;
  title: string;
  text?: string;
  wide?: boolean;
}) {
  const showKicker = kicker && kicker.trim() && kicker.trim() !== title.trim() ? kicker : null;
  return (
    <header className={`head${wide ? " head--wide" : ""}`} data-reveal="clip">
      {showKicker ? <p className="kicker">{showKicker}</p> : null}
      <GoldRule />
      <h2>{title}</h2>
      {text ? <p className="intro">{text}</p> : null}
    </header>
  );
}

export function CtaBand({
  title,
  href,
  label,
  kicker,
  tone,
  text
}: {
  title: string;
  href: string;
  label: string;
  kicker?: string;
  tone?: "strong" | "sand" | "ink";
  text?: string;
}) {
  const { lang } = useI18n();
  const cls = tone === "strong"
    ? "section section--plum"
    : tone === "ink"
      ? "section section--ink"
      : "section section--sand";
  return (
    <section className={cls}>
      <div className="shell cta-band cta-band--folio">
        <div className="head">
          {kicker ? <p className="kicker">{kicker}</p> : null}
          <GoldRule />
          <h2>{title}</h2>
          {text ? <p className="close-text">{text}</p> : null}
        </div>
        <Link className="btn btn--gold" to={toRoute(href, lang)}>
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
  iconName,
  visual
}: {
  kicker: string;
  title: string;
  lead: string;
  variant?: "quiet" | "system" | "story" | "hush" | "editorial" | "service" | "proof" | "conversion";
  iconName?: string;
  visual?: "none" | "chamber" | "route" | "system" | "atlas" | "proof" | "quiet";
}) {
  const { lang } = useI18n();
  const resolved = HERO_VARIANT[variant] || "editorial";
  const media = visual ?? (resolved === "proof" ? "chamber" : resolved === "service" ? "none" : "none");
  const figure = media === "route" ? <RouteVisual />
    : media === "system" ? <SystemVisual />
    : media === "atlas" ? <AtlasVisual />
    : media === "proof" ? <ProofVisual />
    : media === "quiet" ? <QuietVisual />
    : media === "chamber" ? <LogoChamber compact />
    : null;
  return (
    <header className={`hero hero-${variant} hero-${resolved}${media !== "none" && media !== "chamber" ? ` hero--${media}` : ""}`}>
      <div className={`shell hero__grid${figure ? "" : " hero__grid--solo"}`}>
        <div className="hero-seq">
          <p className="kicker kicker-row">
            {iconName ? (
              <span className="icon-well icon-well--sm"><Icon name={iconName} rtl={lang === "ar"} /></span>
            ) : null}
            {kicker}
          </p>
          <GoldRule />
          <h1 className="hero__title"><span className="hero__ink">{title}</span></h1>
          <p className="lead">{lead}</p>
        </div>
        {figure ? <div className="hero-media">{figure}</div> : null}
      </div>
    </header>
  );
}

export function Crumbs({
  items
}: {
  items: { href?: string; label: string; icon?: string }[];
}) {
  const { lang, t } = useI18n();
  return (
    <nav className="crumb" aria-label={t("breadcrumb")}>
      <div className="shell">
        {items.map((item, i) => (
          <span className="crumb__item" key={`${item.label}-${i}`}>
            {i > 0 ? <span className="crumb__sep" aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link className="crumb__link" to={toRoute(item.href, lang)}>
                {item.icon ? <Icon name={item.icon} rtl={lang === "ar"} /> : null}
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}

export function GeoAnswer({ label, text }: { label: string; text: string }) {
  if (!text) return null;
  return (
    <section className="section section--tight geo-answer">
      <div className="shell story-col">
        <article className="exec-answer" data-reveal="clip">
          {label ? <h2 className="kicker">{label}</h2> : null}
          <GoldRule />
          <p className="exec-answer__text">{text}</p>
        </article>
      </div>
    </section>
  );
}

export { Dots };
