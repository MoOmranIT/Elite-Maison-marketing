import { useEffect, useMemo } from "react";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, GeoAnswer, GoldRule, PageHero, SectionIntro } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { RelatedPath } from "@/components/folio/RelatedPath";
import { useHashSelect } from "@/hooks/useHashSelect";

const SECTOR_IDS = (EM.SECTORS as { id: string }[]).map((item) => item.id);
const SECTOR_ICONS: Record<string, string> = { healthcare: "healthcare", fmcg: "fmcg", hospitality: "hospitality", retail: "retail", ecommerce: "ecommerce", education: "education" };

type SectorItem = {
  id: string;
  title: { ar: string; en: string };
  context: { ar: string; en: string };
  challenges: { ar: string; en: string };
  priorities: { ar: string; en: string };
  journey: { ar: string; en: string };
};

function Plate({ item, index }: { item: SectorItem; index: number }) {
  const { loc, lang, copy } = useI18n();
  useEffect(() => {
    const root = document.getElementById(item.id);
    root?.classList.add("is-visible");
    root?.querySelectorAll(".gold-rule").forEach((node) => node.classList.add("is-draw"));
  }, [item.id]);
  return (
    <article className="sector-plate sector-plate--canonical" id={item.id} data-motif={item.id} data-reveal="rise" aria-labelledby={`${item.id}-title`}>
      <p className="kicker kicker-row"><span className="icon-well icon-well--sm"><Icon name={SECTOR_ICONS[item.id] || "sector"} rtl={lang === "ar"} /></span>{String(index + 1).padStart(2, "0")}</p>
      <h2 id={`${item.id}-title`}>{loc(item.title)}</h2>
      <GoldRule long />
      <p className="sector-plate__context">{loc(item.context)}</p>
      <p className="sector-plate__q">{loc(item.challenges)}</p>
      <p className="sector-plate__body"><span className="kicker">{copy("sectors", "priorityLabel")}</span>{loc(item.priorities)}</p>
      <p className="sector-plate__body"><span className="kicker">{copy("sectors", "journeyLabel")}</span>{loc(item.journey)}</p>
      <div className="sector-proof"><RelatedPath id={item.id} kind="sector" /></div>
    </article>
  );
}

export function SectorsPage() {
  const { t, loc, copy, lang } = useI18n();
  const list = EM.SECTORS as SectorItem[];
  const ids = useMemo(() => SECTOR_IDS, []);
  const [activeId] = useHashSelect(ids, list[0].id);
  return (
    <>
      <PageHero variant="service" visual="atlas" iconName="sector" kicker={copy("sectors", "eyebrow")} title={copy("sectors", "title")} lead={copy("sectors", "lead")} />
      <GeoAnswer label={copy("sectors", "answerLabel")} text={copy("sectors", "answer")} />
      <section className="section section--veiled">
        <div className="shell">
          <SectionIntro kicker={copy("sectors", "selectEyebrow")} title={copy("sectors", "selectTitle")} text={copy("sectors", "selectNote")} />
          <div className="folio-split folio-split--canonical">
            <nav className="folio-index folio-index--sector" aria-label={t("sectorNav")}>
              <span className="folio-index__mark" aria-hidden="true" />
              {list.map((item, i) => <a key={item.id} href={`#${item.id}`} className={item.id === activeId ? "is-active" : undefined} aria-current={item.id === activeId ? "true" : undefined}><span className="icon-well icon-well--sm"><Icon name={SECTOR_ICONS[item.id] || "sector"} rtl={lang === "ar"} /></span><span className="num">{String(i + 1).padStart(2, "0")}</span><span>{loc(item.title)}</span></a>)}
            </nav>
            <div className="folio-canonical-list">
              {list.map((item, index) => <Plate key={item.id} item={item} index={index} />)}
            </div>
          </div>
        </div>
      </section>
      <CtaBand tone="sand" kicker={copy("sectors", "ctaEyebrow")} title={copy("sectors", "ctaTitle")} text={copy("sectors", "ctaText")} href="contact.html?source=page:sectors" label={t("bookCta")} />
    </>
  );
}
