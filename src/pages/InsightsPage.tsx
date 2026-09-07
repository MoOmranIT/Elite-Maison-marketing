import { Link, useParams } from "react-router-dom";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, Crumbs, Go, GoldRule, PageHero, SectionIntro } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { QuietVisual } from "@/components/folio/HeroVisual";
import { RelatedPath } from "@/components/folio/RelatedPath";
import { toRoute } from "@/lib/routes";

type InsightItem = {
  id: string;
  topic: { ar: string; en: string };
  format: { ar: string; en: string };
  title: { ar: string; en: string };
  summary: { ar: string; en: string };
  answer?: { ar: string; en: string };
  relatedCase?: string;
  cta?: string;
  sections: { heading: { ar: string; en: string }; text: { ar: string; en: string } }[];
};

export function InsightsPage() {
  const { t, loc, copy, lang } = useI18n();
  const list = EM.INSIGHTS as InsightItem[];
  const featured = list[0];
  const rest = list.slice(1);
  return (
    <>
      <PageHero
        variant="editorial"
        visual="quiet"
        iconName="insight"
        kicker={copy("insights", "eyebrow")}
        title={copy("insights", "title")}
        lead={copy("insights", "lead")}
      />

      <section className="section section--veiled">
        <div className="shell insight-feature" data-reveal="clip">
          <p className="kicker kicker-row">
            <span className="icon-well icon-well--sm"><Icon name="insight" rtl={lang === "ar"} /></span>
            {copy("insights", "featuredLabel")} · {loc(featured.topic)}
          </p>
          <GoldRule long />
          <h2>{loc(featured.title)}</h2>
          <p className="insight-feature__sum">{loc(featured.summary)}</p>
          <Go href={`insight.html?id=${featured.id}`} label={t("readInsight")} />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionIntro kicker={copy("insights", "listLabel")} title={copy("insights", "listLabel")} />
          <ol className="editorial-list">
            {rest.map((item, i) => (
              <li key={item.id}>
                <Link className="editorial-row" to={toRoute(`insight.html?id=${item.id}`, lang)}>
                  <span className="num">{String(i + 2).padStart(2, "0")}</span>
                  <span className="editorial-row__body">
                    <span className="kicker">{loc(item.topic)}</span>
                    <strong>{loc(item.title)}</strong>
                    <span className="editorial-row__q">{loc(item.summary)}</span>
                  </span>
                  <Icon name="arrow" rtl={lang === "ar"} />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        tone="sand"
        kicker={copy("insights", "ctaEyebrow")}
        title={copy("insights", "ctaTitle")}
        text={copy("insights", "ctaText")}
        href="/contact"
        label={t("bookCta")}
      />
    </>
  );
}

export function InsightDetailPage() {
  const { id } = useParams();
  const { t, loc, copy, lang } = useI18n();
  const list = EM.INSIGHTS as InsightItem[];
  const item = list.find((entry) => entry.id === id);
  if (!item) {
    return (
      <div className="not-found shell">
        <h1>{t("notFound")}</h1>
        <Go href="/" label={t("backHome")} iconName="home" />
      </div>
    );
  }
  const next = list[(list.indexOf(item) + 1) % list.length];
  const why = item.sections[0];
  const frame = item.sections[1];
  return (
    <>
      <Crumbs items={[
        { href: "/", label: t("homeCrumb"), icon: "home" },
        { href: "/insights", label: loc({ ar: "الرؤى", en: "Insights" }), icon: "insight" },
        { label: loc(item.title) }
      ]} />

      <header className="hero hero-editorial insight-hero">
        <div className="shell hero__grid">
          <div className="hero-seq">
            <p className="kicker kicker-row">
              <span className="icon-well icon-well--sm"><Icon name="insight" rtl={lang === "ar"} /></span>
              {loc(item.topic)}
            </p>
            <GoldRule />
            <h1 className="hero__title"><span className="hero__ink">{loc(item.title)}</span></h1>
            <p className="lead">{loc(item.summary)}</p>
          </div>
          <div className="hero-media">
            <QuietVisual />
          </div>
        </div>
      </header>

      <section className="section section--plate">
        <div className="shell story-col">
          <article className="exec-answer" data-reveal="clip">
            <p className="kicker">{copy("insights", "answerLabel")}</p>
            <GoldRule />
            <p className="exec-answer__text">{loc(item.answer || item.summary)}</p>
          </article>
        </div>
      </section>

      {why ? (
        <section className="section">
          <div className="shell story-col">
            <p className="kicker">{copy("insights", "whyLabel")}</p>
            <h2>{loc(why.heading)}</h2>
            <GoldRule />
            <p>{loc(why.text)}</p>
          </div>
        </section>
      ) : null}

      {frame ? (
        <section className="section section--veiled">
          <div className="shell story-col">
            <p className="kicker">{copy("insights", "frameLabel")}</p>
            <h2>{loc(frame.heading)}</h2>
            <GoldRule />
            <p>{loc(frame.text)}</p>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="shell story-col">
          <RelatedPath id={item.id} kind="insight" />
          <Go href={`insight.html?id=${next.id}`} label={`${t("anotherInsight")}: ${loc(next.title)}`} />
        </div>
      </section>

      <CtaBand
        tone="strong"
        kicker={copy("insights", "ctaEyebrow")}
        title={copy("insights", "ctaTitle")}
        href="/contact"
        label={t("bookCta")}
      />
    </>
  );
}
