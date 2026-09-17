import { Link, useParams } from "react-router-dom";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, Crumbs, Go, GoldRule, PageHero, SectionIntro } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { RelatedPath } from "@/components/folio/RelatedPath";
import { caseName, casesArePublic, featuredCase } from "@/lib/em";
import { toRoute } from "@/lib/routes";

type CaseItem = {
  id: string;
  sector: string | null;
  related: string[];
  publicName: { ar: string; en: string };
  anonymousName: { ar: string; en: string };
  challenge: { ar: string; en: string };
  strategy: { ar: string; en: string };
  execution: { ar: string; en: string };
  result: { ar: string; en: string };
  proof: { ar: string; en: string };
  metric?: { value: string; unit: { ar: string; en: string }; context?: { ar: string; en: string } };
  beats?: { value: string; label: { ar: string; en: string } }[];
  markets?: { ar: string; en: string }[];
};

function sectorTitle(id: string | null, loc: (v: { ar: string; en: string }) => string) {
  if (!id) return "";
  const sector = EM.SECTORS.find((s: { id: string }) => s.id === id);
  return sector ? loc(sector.title) : "";
}

export function CasesPage() {
  const { t, loc, copy, lang } = useI18n();
  const featured = featuredCase() as CaseItem;
  const rest = (EM.CASES as CaseItem[]).filter((item) => item.id !== featured.id);
  const sector = sectorTitle(featured.sector, loc);
  return (
    <>
      <PageHero
        variant="proof"
        visual="proof"
        iconName="proof"
        kicker={copy("cases", "eyebrow")}
        title={copy("cases", "title")}
        lead={copy("cases", "lead")}
      />

      <section className="section section--ink case-feature">
        <div className="shell case-feature__grid">
          <div data-reveal="clip">
            <p className="kicker kicker-row">
              <span className="icon-well icon-well--sm"><Icon name="proof" rtl={lang === "ar"} /></span>
              {copy("cases", "featuredLabel")}
              {sector ? ` · ${sector}` : ""}
            </p>
            <GoldRule long />
            <h2>{caseName(featured, loc)}</h2>
            <p className="case-feature__challenge">{loc(featured.challenge)}</p>
            <p className="case-feature__result">{loc(featured.result)}</p>
            <Go href={`case.html?id=${featured.id}`} label={t("viewCase")} />
          </div>
          <figure className="case-mono" aria-hidden="true" data-reveal="rise">
            <span className="case-mono__name">{caseName(featured, loc)}</span>
            <span className="case-mono__arch" />
          </figure>
        </div>
      </section>

      <section className="section section--veiled">
        <div className="shell">
          <SectionIntro kicker={copy("cases", "otherLabel")} title={copy("cases", "otherLabel")} />
          <ol className="editorial-list">
            {rest.map((item, i) => (
              <li key={item.id}>
                <Link className="editorial-row" to={toRoute(`case.html?id=${item.id}`, lang)}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="editorial-row__body">
                    <span className="kicker">{sectorTitle(item.sector, loc) || t("proof")}</span>
                    <strong>{caseName(item, loc)}</strong>
                    <span className="editorial-row__q">{loc(item.challenge)}</span>
                     <span className="editorial-row__out">{loc(item.proof)}</span>
                  </span>
                  <Icon name="arrow" rtl={lang === "ar"} />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        tone="ink"
        kicker={copy("cases", "ctaEyebrow")}
        title={copy("cases", "ctaTitle")}
        text={copy("cases", "ctaText")}
        href="/contact"
        label={t("bookCta")}
      />
    </>
  );
}

export function CaseDetailPage() {
  const { id } = useParams();
  const { t, loc, lang } = useI18n();
  const list = EM.CASES as CaseItem[];
  const item = list.find((c) => c.id === id);
  if (!item) {
    return (
      <div className="not-found shell">
        <h1>{t("notFound")}</h1>
        <Go href="/" label={t("backHome")} iconName="home" />
      </div>
    );
  }
  const sequence = (EM.CASE_SEQUENCE as string[])
    .map((caseId) => list.find((entry) => entry.id === caseId))
    .filter(Boolean) as CaseItem[];
  const currentIndex = Math.max(0, sequence.findIndex((entry) => entry.id === item.id));
  const prev = sequence[currentIndex - 1];
  const next = sequence[currentIndex + 1];
  const sector = sectorTitle(item.sector, loc);
  return (
    <>
      <Crumbs items={[
        { href: "/", label: t("homeCrumb"), icon: "home" },
        { href: "/cases", label: loc({ ar: "الدليل", en: "Proof" }), icon: "proof" },
        { label: caseName(item, loc) }
      ]} />

      <header className="hero hero-proof hero--proof case-hero">
        <div className="shell case-hero__grid">
          <div className="hero-seq">
            <p className="kicker kicker-row">
              <span className="icon-well icon-well--sm"><Icon name="proof" rtl={lang === "ar"} /></span>
              {sector || t("proof")}
            </p>
            <GoldRule />
            <h1 className="hero__title"><span className="hero__ink">{caseName(item, loc)}</span></h1>
            <p className="lead">{loc(item.challenge)}</p>
          </div>
          <p className="case-hero__proof" data-reveal="rise">
            <span className="kicker">{t("proof")}</span>
            {loc(item.proof)}
          </p>
        </div>
      </header>

      <section className="section section--ink">
        <div className="shell story-col">
          <article data-reveal="clip">
            <h2 className="kicker kicker-row">
              <span className="icon-well icon-well--sm"><Icon name="consult" rtl={lang === "ar"} /></span>
              {t("strategy")}
            </h2>
            <GoldRule />
            <p className="story-col__lead">{loc(item.strategy)}</p>
          </article>
        </div>
      </section>

      <section className="section section--plate">
        <div className="shell story-col">
          <article data-reveal="rise">
            <h2 className="kicker kicker-row">
              <span className="icon-well icon-well--sm"><Icon name="execute" rtl={lang === "ar"} /></span>
              {t("execution")}
            </h2>
            <GoldRule />
            <p>{loc(item.execution)}</p>
            {item.markets ? (
              <ul className="market-set" aria-label={t("marketsEntered")}>
                {item.markets.map((market) => (
                  <li key={market.en}>{loc(market)}</li>
                ))}
              </ul>
            ) : null}
          </article>
        </div>
      </section>

      <section className="section section--plum">
        <div className="shell story-col">
          <article data-reveal="rise">
            <h2 className="kicker">{t("result")}</h2>
            <GoldRule />
            <p className="result-statement">{loc(item.result)}</p>
            {casesArePublic() && item.beats ? (
              <ol className="result-beats">
                {item.beats.map((beat) => (
                  <li key={beat.value}>
                    <strong>{beat.value}</strong>
                    <span>{loc(beat.label)}</span>
                  </li>
                ))}
              </ol>
            ) : null}
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell story-col">
          <article className="proof-block" data-reveal="clip">
            <h2 className="kicker kicker-row">
              <span className="icon-well icon-well--sm"><Icon name="proof" rtl={lang === "ar"} /></span>
              {item.id === "ai-brains" ? t("awardProof") : t("proof")}
            </h2>
            <GoldRule />
            <p>{loc(item.proof)}</p>
          </article>
          <RelatedPath id={item.id} kind="case" />
          <nav className="case-pager" aria-label={t("caseIndex")}>
            {prev ? <Go href={`case.html?id=${prev.id}`} label={`${t("prevCase")}: ${caseName(prev, loc)}`} /> : <span />}
            {next ? <Go href={`case.html?id=${next.id}`} label={`${t("nextCase")}: ${caseName(next, loc)}`} /> : <span />}
          </nav>
        </div>
      </section>

      <CtaBand
        tone="strong"
        kicker={t("similarChallenge")}
        title={t("startConversation")}
        href={`contact.html?source=case:${item.id}`}
        label={t("bookCta")}
      />
    </>
  );
}
