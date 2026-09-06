import { useParams } from "react-router-dom";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, Crumbs, Frame, PageHero } from "@/components/ui-kit";
import { capabilityLabel, caseName, featuredCase } from "@/lib/em";

export function CasesPage() {
  const { t, loc, copy } = useI18n();
  const featured = featuredCase();
  const rest = EM.CASES.filter((c: { id: string }) => c.id !== featured.id);
  return (
    <>
      <PageHero iconName="proof" variant="story" kicker={copy("cases", "eyebrow")} title={copy("cases", "title")} lead={copy("cases", "lead")} />
      <section className="section">
        <div className="shell">
          <div className="feature">
            <div>
              <p className="kicker">{t("featured")}</p>
              <hr className="gold-rule" />
              <h2>{caseName(featured, loc)}</h2>
              <p className="intro">{loc(featured.challenge)}</p>
            </div>
            <div>
              <dl className="beats">
                <dt>{t("result")}</dt><dd>{loc(featured.result)}</dd>
                <dt>{t("proof")}</dt><dd>{loc(featured.proof)}</dd>
              </dl>
              <Frame href={`case.html?id=${featured.id}`} iconName="proof" title={t("viewCase")} />
            </div>
          </div>
          <div className="stack" style={{ marginTop: "2rem" }}>
            {rest.map((item: any) => (
              <Frame key={item.id} href={`case.html?id=${item.id}`} iconName="proof" title={caseName(item, loc)} text={loc(item.result)} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={copy("cases", "ctaTitle")} href="/insights" label={t("exploreInsights")} />
    </>
  );
}

export function CaseDetailPage() {
  const { id } = useParams();
  const { t, loc } = useI18n();
  const item = EM.CASES.find((c: { id: string }) => c.id === id);
  if (!item) {
    return (
      <div className="not-found shell">
        <h1>{t("notFound")}</h1>
        <div className="related"><Frame href="/" iconName="home" title={t("backHome")} /></div>
      </div>
    );
  }
  const idx = EM.CASES.indexOf(item);
  const next = EM.CASES[(idx + 1) % EM.CASES.length];
  const sector = EM.SECTORS.find((s: { id: string }) => s.id === item.sector);
  return (
    <>
      <Crumbs items={[
        { href: "/", label: t("homeCrumb"), icon: "home" },
        { href: "/cases", label: loc({ ar: "قصص النجاح", en: "Case studies" }), icon: "proof" },
        { label: caseName(item, loc) }
      ]} />
      <PageHero iconName="proof" variant="story" kicker={sector ? loc(sector.title) : t("challenge")} title={caseName(item, loc)} lead={loc(item.challenge)} />
      <section className="section story">
        <div className="shell">
          {([["challenge", item.challenge], ["strategy", item.strategy], ["execution", item.execution], ["result", item.result], ["proof", item.proof]] as const).map(([k, v]) => (
            <article key={k}><h2>{t(k)}</h2><hr className="gold-rule" /><p>{loc(v)}</p></article>
          ))}
          <div className="related">
            {item.related.map((href: string) => (
              <Frame key={href} href={href} iconName={href.includes("execution") ? "execute" : "consult"} title={capabilityLabel(href, loc, t("relatedCapabilities"))} />
            ))}
            <Frame href={`case.html?id=${next.id}`} iconName="proof" title={`${t("nextCase")}: ${caseName(next, loc)}`} />
          </div>
        </div>
      </section>
      <CtaBand title={t("startConversation")} href="/contact" label={t("bookCta")} tone="strong" />
    </>
  );
}
