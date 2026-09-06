import { useParams, useSearchParams } from "react-router-dom";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, Crumbs, Frame, PageHero, hrefIcon } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { capabilityLabel } from "@/lib/em";

export function InsightsPage() {
  const { t, loc, copy } = useI18n();
  const [params, setParams] = useSearchParams();
  const topic = params.get("topic") || "all";
  const topics: { id: string; label: string }[] = [];
  EM.INSIGHTS.forEach((item: { topic: { ar: string; en: string } }) => {
    const label = loc(item.topic);
    if (!topics.some((x) => x.id === item.topic.en)) topics.push({ id: item.topic.en, label });
  });
  const items = topic === "all" ? EM.INSIGHTS : EM.INSIGHTS.filter((i: { topic: { en: string } }) => i.topic.en === topic);
  return (
    <>
      <PageHero iconName="insight" kicker={copy("insights", "eyebrow")} title={copy("insights", "title")} lead={copy("insights", "lead")} />
      <section className="section">
        <div className="shell library">
          <aside className="rail" role="toolbar" aria-label={t("insightTopics")}>
            <button type="button" className="filter" aria-pressed={topic === "all"} onClick={() => setParams({})}>
              <span className="icon-well icon-well--sm"><Icon name="insight" /></span>
              {t("filterAll")}
            </button>
            {topics.map((tp) => (
              <button key={tp.id} type="button" className="filter" aria-pressed={topic === tp.id} onClick={() => setParams({ topic: tp.id })}>
                <span className="icon-well icon-well--sm"><Icon name="insight" /></span>
                {tp.label}
              </button>
            ))}
          </aside>
          <div className="stack">
            {items.length ? items.map((item: any, i: number) => (
              <Frame key={item.id} href={`insight.html?id=${item.id}`} iconName="insight" kicker={loc(item.format)} title={loc(item.title)} text={i === 0 ? loc(item.summary) : ""} />
            )) : <p>{t("noInsights")}</p>}
          </div>
        </div>
      </section>
      <CtaBand title={copy("insights", "ctaTitle")} href="/contact" label={t("bookCta")} tone="strong" />
    </>
  );
}

export function InsightDetailPage() {
  const { id } = useParams();
  const { t, loc } = useI18n();
  const item = EM.INSIGHTS.find((i: { id: string }) => i.id === id);
  if (!item) {
    return (
      <div className="not-found shell">
        <h1>{t("notFound")}</h1>
        <div className="related"><Frame href="/" iconName="home" title={t("backHome")} /></div>
      </div>
    );
  }
  return (
    <>
      <Crumbs items={[
        { href: "/", label: t("homeCrumb"), icon: "home" },
        { href: "/insights", label: loc({ ar: "الرؤى", en: "Insights" }), icon: "insight" },
        { label: loc(item.title) }
      ]} />
      <PageHero iconName="insight" kicker={`${loc(item.format)} · ${loc(item.topic)}`} title={loc(item.title)} lead={loc(item.summary)} />
      <section className="section story">
        <div className="shell">
          {item.sections.map((sec: { heading: { ar: string; en: string }; text: { ar: string; en: string } }, i: number) => (
            <article key={i}><h2>{loc(sec.heading)}</h2><hr className="gold-rule" /><p>{loc(sec.text)}</p></article>
          ))}
          <div className="related">
            {item.cta ? <Frame href={item.cta} iconName={hrefIcon(item.cta)} title={`${t("relatedConsulting")}: ${capabilityLabel(item.cta, loc, t("relatedCapabilities"))}`} /> : null}
            <Frame href="/contact" iconName="contact" title={t("bookCta")} />
          </div>
        </div>
      </section>
    </>
  );
}
