import { useEffect, useMemo, type KeyboardEvent } from "react";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, GeoAnswer, GoldRule, PageHero, SectionIntro } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { RelatedPath } from "@/components/folio/RelatedPath";
import { useCompact, useHashSelect } from "@/hooks/useHashSelect";

const SECTOR_IDS = (EM.SECTORS as { id: string }[]).map((item) => item.id);

const SECTOR_ICONS: Record<string, string> = {
  healthcare: "healthcare",
  fmcg: "fmcg",
  hospitality: "hospitality",
  retail: "retail",
  ecommerce: "ecommerce",
  education: "education"
};

type SectorItem = {
  id: string;
  title: { ar: string; en: string };
  context: { ar: string; en: string };
  challenges: { ar: string; en: string };
  priorities: { ar: string; en: string };
  journey: { ar: string; en: string };
};

function Plate({ item, showId = true }: { item: SectorItem; showId?: boolean }) {
  const { t, loc, lang, copy } = useI18n();
  useEffect(() => {
    const root = document.querySelector(".sector-plate");
    root?.classList.add("is-visible");
    root?.querySelectorAll(".gold-rule").forEach((node) => node.classList.add("is-draw"));
  }, [item.id]);
  return (
    <article className="sector-plate" id={showId ? item.id : undefined} data-motif={item.id} data-reveal="rise">
      <p className="kicker kicker-row">
        <span className="icon-well icon-well--sm">
          <Icon name={SECTOR_ICONS[item.id] || "sector"} rtl={lang === "ar"} />
        </span>
        {copy("sectors", "selectEyebrow")}
      </p>
      <h2>{loc(item.title)}</h2>
      <GoldRule long />
      <p className="sector-plate__context">{loc(item.context)}</p>
      <p className="sector-plate__q">{loc(item.challenges)}</p>
      <p className="sector-plate__body">
        <span className="kicker">{copy("sectors", "priorityLabel")}</span>
        {loc(item.priorities)}
      </p>
      <p className="sector-plate__body">
        <span className="kicker">{copy("sectors", "journeyLabel")}</span>
        {loc(item.journey)}
      </p>
       <div className="sector-proof">
         <RelatedPath id={item.id} kind="sector" />
       </div>
    </article>
  );
}

/**
 * Crawlable twin of Plate: same approved copy, no anchor id, no effects.
 * See CanvasStatic in ConsultingPage — identical rationale.
 */
function PlateStatic({ item }: { item: SectorItem }) {
  const { loc, copy } = useI18n();
  return (
    <article className="sector-plate">
      <p className="kicker">{copy("sectors", "selectEyebrow")}</p>
      <h2>{loc(item.title)}</h2>
      <p className="sector-plate__context">{loc(item.context)}</p>
      <p className="sector-plate__q">{loc(item.challenges)}</p>
      <p className="sector-plate__body">
        <span className="kicker">{copy("sectors", "priorityLabel")}</span>
        {loc(item.priorities)}
      </p>
      <p className="sector-plate__body">
        <span className="kicker">{copy("sectors", "journeyLabel")}</span>
        {loc(item.journey)}
      </p>
      <div className="sector-proof">
        <RelatedPath id={item.id} kind="sector" />
      </div>
    </article>
  );
}

export function SectorsPage() {
  const { t, loc, copy, lang } = useI18n();
  const list = EM.SECTORS as SectorItem[];
  const ids = useMemo(() => SECTOR_IDS, []);
  const [id, select] = useHashSelect(ids, list[0].id);
  const compact = useCompact();
  const index = Math.max(0, list.findIndex((item) => item.id === id));
  const current = list[index] || list[0];

  function onIndexKey(event: KeyboardEvent<HTMLButtonElement>, i: number) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const next = event.key === "ArrowDown" ? Math.min(list.length - 1, i + 1) : Math.max(0, i - 1);
    select(list[next].id);
    document.getElementById(`sector-index-${list[next].id}`)?.focus();
  }

  return (
    <>
      <PageHero
        variant="service"
        visual="atlas"
        iconName="sector"
        kicker={copy("sectors", "eyebrow")}
        title={copy("sectors", "title")}
        lead={copy("sectors", "lead")}
      />
      <GeoAnswer label={copy("sectors", "answerLabel")} text={copy("sectors", "answer")} />

      <section className="section section--veiled">
        <div className="shell">
          <SectionIntro
            kicker={copy("sectors", "selectEyebrow")}
            title={copy("sectors", "selectTitle")}
            text={copy("sectors", "selectNote")}
          />
          {compact ? (
            <div className="folio-acc">
              {list.map((item) => {
                const open = item.id === current.id;
                return (
                  <div className="folio-acc__item" key={item.id} id={item.id}>
                    <h3>
                      <button
                        type="button"
                        className="folio-acc__btn"
                        aria-expanded={open}
                        aria-controls={`sector-panel-${item.id}`}
                        id={`sector-index-${item.id}`}
                        onClick={() => select(item.id)}
                      >
                        <span className="icon-well icon-well--sm">
                          <Icon name={SECTOR_ICONS[item.id] || "sector"} rtl={lang === "ar"} />
                        </span>
                        <span>{loc(item.title)}</span>
                        <Icon name={open ? "close" : "plus"} rtl={lang === "ar"} />
                      </button>
                    </h3>
                    <div
                      id={`sector-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`sector-index-${item.id}`}
                      hidden={!open}
                    >
                      {open ? <Plate item={item} showId={false} /> : <PlateStatic item={item} />}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="folio-split">
              <nav className="folio-index folio-index--sector" aria-label={t("sectorNav")}>
                <span
                  className="folio-index__mark"
                  style={{ transform: `translateY(${index * 100}%)` }}
                  aria-hidden="true"
                />
                {list.map((item, i) => (
                  <button
                    type="button"
                    key={item.id}
                    id={`sector-index-${item.id}`}
                    className={item.id === current.id ? "is-active" : ""}
                    aria-current={item.id === current.id ? "true" : undefined}
                    tabIndex={item.id === current.id ? 0 : -1}
                    onClick={() => select(item.id)}
                    onKeyDown={(event) => onIndexKey(event, i)}
                  >
                    <span className="icon-well icon-well--sm">
                      <Icon name={SECTOR_ICONS[item.id] || "sector"} rtl={lang === "ar"} />
                    </span>
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{loc(item.title)}</span>
                  </button>
                ))}
              </nav>
              <Plate item={current} />
              <div hidden>
                {list.filter((item) => item.id !== current.id).map((item) => (
                  <PlateStatic key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        tone="sand"
        kicker={copy("sectors", "ctaEyebrow")}
        title={copy("sectors", "ctaTitle")}
        text={copy("sectors", "ctaText")}
        href="contact.html?source=page:sectors"
        label={t("bookCta")}
      />
    </>
  );
}
