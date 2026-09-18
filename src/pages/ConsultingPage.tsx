import { useEffect, useMemo } from "react";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, GeoAnswer, GoldRule, PageHero, SectionIntro } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { RelatedPath } from "@/components/folio/RelatedPath";
import { useHashSelect } from "@/hooks/useHashSelect";

const CONSULT_IDS = (EM.CONSULTING as { id: string }[]).map((item) => item.id);
const CONSULT_ICONS: Record<string, string> = {
  growth: "direction", sales: "revenue", expansion: "expansion", product: "product",
  franchise: "franchise", "private-label": "brand", journey: "journey", executive: "executive"
};

type ConsultItem = {
  id: string;
  title: { ar: string; en: string };
  challenge: { ar: string; en: string };
  objective: { ar: string; en: string };
  scope: { ar: string; en: string };
  role: { ar: string; en: string };
  measure: { ar: string; en: string };
};

function Canvas({ item, index }: { item: ConsultItem; index: number }) {
  const { loc, lang, copy } = useI18n();
  useEffect(() => {
    const root = document.getElementById(item.id);
    root?.classList.add("is-visible");
    root?.querySelectorAll(".gold-rule").forEach((node) => node.classList.add("is-draw"));
  }, [item.id]);
  return (
    <article className="service-canvas service-canvas--canonical" id={item.id} data-reveal="clip" aria-labelledby={`${item.id}-title`}>
      <p className="kicker kicker-row">
        <span className="icon-well icon-well--sm"><Icon name={CONSULT_ICONS[item.id] || "consult"} rtl={lang === "ar"} /></span>
        {String(index + 1).padStart(2, "0")}
      </p>
      <h2 id={`${item.id}-title`}>{loc(item.title)}</h2>
      <GoldRule long />
      <p className="service-canvas__challenge">{loc(item.challenge)}</p>
      <p className="service-canvas__body">{loc(item.objective)}</p>
      <div className="service-canvas__details">
        <p><span className="kicker">{copy("consulting", "scopeLabel")}</span>{loc(item.scope)}</p>
        <p><span className="kicker">{copy("consulting", "roleLabel")}</span>{loc(item.role)}</p>
      </div>
      <p className="service-canvas__out"><span className="kicker">{copy("consulting", "outLabel")}</span>{loc(item.measure)}</p>
      <RelatedPath id={item.id} kind="consult" />
    </article>
  );
}

export function ConsultingPage() {
  const { t, loc, copy, lang } = useI18n();
  const list = EM.CONSULTING as ConsultItem[];
  const ids = useMemo(() => CONSULT_IDS, []);
  const [activeId] = useHashSelect(ids, list[0].id);

  return (
    <>
      <PageHero variant="service" visual="route" iconName="consult" kicker={copy("consulting", "eyebrow")} title={copy("consulting", "title")} lead={copy("consulting", "lead")} />
      <GeoAnswer label={copy("consulting", "answerLabel")} text={copy("consulting", "answer")} />
      <section className="section section--veiled section--geom">
        <div className="shell">
          <SectionIntro kicker={copy("consulting", "decisionEyebrow")} title={copy("consulting", "decisionTitle")} text={copy("consulting", "decisionText")} />
          <div className="folio-split folio-split--canonical">
            <nav className="folio-index" aria-label={t("serviceNav")}>
              <span className="folio-index__mark" aria-hidden="true" />
              {list.map((item, i) => (
                <a key={item.id} href={`#${item.id}`} className={item.id === activeId ? "is-active" : undefined} aria-current={item.id === activeId ? "true" : undefined}>
                  <span className="icon-well icon-well--sm"><Icon name={CONSULT_ICONS[item.id] || "consult"} rtl={lang === "ar"} /></span>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{loc(item.challenge)}</span>
                </a>
              ))}
            </nav>
            <div className="folio-canonical-list">
              {list.map((item, index) => <Canvas key={item.id} item={item} index={index} />)}
            </div>
          </div>
        </div>
      </section>
      <section className="section section--plate">
        <div className="shell">
          <SectionIntro kicker={copy("consulting", "flowLabel")} title={copy("consulting", "engageTitle")} text={copy("consulting", "engageText")} />
          <ol className="engage-rail">
            {EM.CONSULTING_FLOW.map((step: { ar: string; en: string }, i: number) => <li key={i}><span className="num">{String(i + 1).padStart(2, "0")}</span><span>{loc(step)}</span></li>)}
          </ol>
        </div>
      </section>
      <CtaBand tone="ink" kicker={copy("consulting", "ctaEyebrow")} title={copy("consulting", "ctaTitle")} text={copy("consulting", "ctaText")} href="contact.html?source=page:consulting" label={t("bookCta")} />
    </>
  );
}
