import { Link } from "react-router-dom";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, Go } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { LogoChamber } from "@/components/LogoChamber";
import { toRoute } from "@/lib/routes";

export function HomePage() {
  const { t, loc, copy, lang } = useI18n();
  const labels = [
    { ar: "الاتجاه", en: "Direction" },
    { ar: "الإيراد", en: "Revenue" },
    { ar: "التوسع", en: "Expansion" }
  ];

  return (
    <>
      <header className="hero hero-home">
        <div className="shell hero__grid">
          <div className="hero-seq">
            <p className="kicker" dir="ltr">{copy("home", "eyebrow")}</p>
            <h1>
              {copy("home", "title")} <span className="accent">{copy("home", "accent")}</span>
            </h1>
            <p className="lead">{copy("home", "lead")}</p>
            <div className="hero-actions">
              <Link className="btn btn--gold" to="/contact">
                <Icon name="contact" rtl={lang === "ar"} />
                {t("bookCta")} <Icon name="arrow" rtl={lang === "ar"} />
              </Link>
              <Go href="/cases" iconName="proof" label={t("exploreProof")} />
            </div>
            <div className="proof-bar" aria-label={t("proofBar")}>
              <div><strong className="accent">18+</strong><span>{copy("home", "years")}</span></div>
              <div><strong>GCC</strong><span>{copy("home", "markets")}</span></div>
            </div>
          </div>
          <div className="hero-media">
            <LogoChamber />
          </div>
        </div>
      </header>

      <section className="section section--glass">
        <div className="shell">
          <div className="head">
            <p className="kicker">{copy("home", "challengesEyebrow")}</p>
            <h2>{copy("home", "challengesTitle")}</h2>
            <p className="intro">{copy("home", "challengesText")}</p>
          </div>
          <div className="challenge-grid">
            {EM.CHALLENGES.slice(0, 3).map((item: { href: string; ar: string; en: string; dest: { ar: string; en: string } }, i: number) => (
              <Link className="door-card" key={item.href} to={toRoute(item.href)}>
                <span className="icon-well">
                  <Icon name={["direction", "revenue", "expansion"][i]} rtl={lang === "ar"} />
                </span>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{loc(labels[i])}</h3>
                <p>{loc({ ar: item.ar, en: item.en })}</p>
                <span className="go"><span>{loc(item.dest)}</span><Icon name="arrow" rtl={lang === "ar"} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="head">
            <p className="kicker">{copy("home", "capEyebrow")}</p>
            <h2>{copy("home", "capTitle")}</h2>
          </div>
          <div className="paths">
            <Link className="path door-card" to="/consulting">
              <span className="icon-well icon-well--ink"><Icon name="consult" rtl={lang === "ar"} /></span>
              <h3>{loc({ ar: "الاستشارات", en: "Consulting" })}</h3>
              <p>{copy("home", "consultingPreview")}</p>
              <span className="go"><span>{t("exploreCta")}</span><Icon name="arrow" rtl={lang === "ar"} /></span>
            </Link>
            <Link className="path door-card" to="/execution">
              <span className="icon-well icon-well--ink"><Icon name="execute" rtl={lang === "ar"} /></span>
              <h3>{loc({ ar: "الحلول التنفيذية", en: "Execution solutions" })}</h3>
              <p>{copy("home", "executionPreview")}</p>
              <span className="go"><span>{t("exploreExecution")}</span><Icon name="arrow" rtl={lang === "ar"} /></span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        kicker={copy("home", "closeEyebrow")}
        title={copy("home", "closeTitle")}
        href="/contact"
        label={t("bookCta")}
      />
    </>
  );
}
