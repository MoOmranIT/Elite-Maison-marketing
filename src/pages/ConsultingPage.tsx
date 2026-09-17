import { useEffect, useMemo, type KeyboardEvent } from "react";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, GeoAnswer, GoldRule, PageHero, SectionIntro } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { RelatedPath } from "@/components/folio/RelatedPath";
import { useCompact, useHashSelect } from "@/hooks/useHashSelect";

const CONSULT_IDS = (EM.CONSULTING as { id: string }[]).map((item) => item.id);

const CONSULT_ICONS: Record<string, string> = {
  growth: "direction",
  sales: "revenue",
  expansion: "expansion",
  product: "product",
  franchise: "franchise",
  "private-label": "brand",
  journey: "journey",
  executive: "executive"
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

function Canvas({ item, index, showId = true }: { item: ConsultItem; index: number; showId?: boolean }) {
  useEffect(() => {
    const root = document.querySelector(".service-canvas");
    root?.classList.add("is-visible");
    root?.querySelectorAll(".gold-rule").forEach((node) => node.classList.add("is-draw"));
    root?.querySelectorAll(".dots").forEach((node) => node.classList.add("is-play"));
  }, [item.id]);
  const { t, loc, lang, copy } = useI18n();
  return (
    <article className="service-canvas" id={showId ? item.id : undefined} data-reveal="clip">
      <p className="kicker kicker-row">
        <span className="icon-well icon-well--sm">
          <Icon name={CONSULT_ICONS[item.id] || "consult"} rtl={lang === "ar"} />
        </span>
        {String(index + 1).padStart(2, "0")}
      </p>
      <h2>{loc(item.title)}</h2>
      <GoldRule long />
       <p className="service-canvas__challenge">{loc(item.challenge)}</p>
       <p className="service-canvas__body">{loc(item.objective)}</p>
       <div className="service-canvas__details">
         <p><span className="kicker">{copy("consulting", "scopeLabel")}</span>{loc(item.scope)}</p>
         <p><span className="kicker">{copy("consulting", "roleLabel")}</span>{loc(item.role)}</p>
       </div>
       <p className="service-canvas__out">
         <span className="kicker">{copy("consulting", "outLabel")}</span>
         {loc(item.measure)}
       </p>
       <RelatedPath id={item.id} kind="consult" />
    </article>
  );
}

/**
 * Crawlable twin of Canvas: same approved copy, no anchor id, no effects.
 * Rendered inside `hidden` containers so every capability's text is in the
 * DOM for crawlers and no-JS readers, while sighted users keep the single
 * interactive panel (progressive disclosure, identical content — no cloaking).
 */
function CanvasStatic({ item, index }: { item: ConsultItem; index: number }) {
  const { loc, copy } = useI18n();
  return (
    <article className="service-canvas">
      <p className="kicker">{String(index + 1).padStart(2, "0")}</p>
      <h2>{loc(item.title)}</h2>
      <p className="service-canvas__challenge">{loc(item.challenge)}</p>
      <p className="service-canvas__body">{loc(item.objective)}</p>
      <div className="service-canvas__details">
        <p><span className="kicker">{copy("consulting", "scopeLabel")}</span>{loc(item.scope)}</p>
        <p><span className="kicker">{copy("consulting", "roleLabel")}</span>{loc(item.role)}</p>
      </div>
      <p className="service-canvas__out">
        <span className="kicker">{copy("consulting", "outLabel")}</span>
        {loc(item.measure)}
      </p>
      <RelatedPath id={item.id} kind="consult" />
    </article>
  );
}

export function ConsultingPage() {
  const { t, loc, copy, lang } = useI18n();
  const list = EM.CONSULTING as ConsultItem[];
  const ids = useMemo(() => CONSULT_IDS, []);
  const [openId, select] = useHashSelect(ids, list[0].id);
  const compact = useCompact();
  const index = Math.max(0, list.findIndex((item) => item.id === openId));
  const current = list[index] || list[0];

  function onIndexKey(event: KeyboardEvent<HTMLButtonElement>, i: number) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const next = event.key === "ArrowDown" ? Math.min(list.length - 1, i + 1) : Math.max(0, i - 1);
    select(list[next].id);
    document.getElementById(`consult-index-${list[next].id}`)?.focus();
  }

  return (
    <>
      <PageHero
        variant="service"
        visual="route"
        iconName="consult"
        kicker={copy("consulting", "eyebrow")}
        title={copy("consulting", "title")}
        lead={copy("consulting", "lead")}
      />
      <GeoAnswer label={copy("consulting", "answerLabel")} text={copy("consulting", "answer")} />

      <section className="section section--veiled section--geom">
        <div className="shell">
          <SectionIntro
            kicker={copy("consulting", "decisionEyebrow")}
            title={copy("consulting", "decisionTitle")}
            text={copy("consulting", "decisionText")}
          />
          {compact ? (
            <div className="folio-acc">
              {list.map((item, i) => {
                const open = item.id === current.id;
                return (
                  <div className="folio-acc__item" key={item.id} id={item.id}>
                    <h3>
                      <button
                        type="button"
                        className="folio-acc__btn"
                        aria-expanded={open}
                        aria-controls={`consult-panel-${item.id}`}
                        id={`consult-index-${item.id}`}
                        onClick={() => select(item.id)}
                      >
                        <span className="num">{String(i + 1).padStart(2, "0")}</span>
                        <span>{loc(item.challenge)}</span>
                        <Icon name={open ? "close" : "plus"} rtl={lang === "ar"} />
                      </button>
                    </h3>
                    <div
                      id={`consult-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`consult-index-${item.id}`}
                      hidden={!open}
                    >
                      {open ? <Canvas item={item} index={i} showId={false} /> : <CanvasStatic item={item} index={i} />}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="folio-split">
              <nav className="folio-index" aria-label={t("serviceNav")}>
                <span
                  className="folio-index__mark"
                  style={{ transform: `translateY(${index * 100}%)` }}
                  aria-hidden="true"
                />
                {list.map((item, i) => (
                  <button
                    type="button"
                    key={item.id}
                    id={`consult-index-${item.id}`}
                    className={item.id === current.id ? "is-active" : ""}
                    aria-current={item.id === current.id ? "true" : undefined}
                    tabIndex={item.id === current.id ? 0 : -1}
                    onClick={() => select(item.id)}
                    onKeyDown={(event) => onIndexKey(event, i)}
                  >
                    <span className="icon-well icon-well--sm">
                      <Icon name={CONSULT_ICONS[item.id] || "consult"} rtl={lang === "ar"} />
                    </span>
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{loc(item.challenge)}</span>
                  </button>
                ))}
              </nav>
              <Canvas item={current} index={index} />
              <div hidden>
                {list.filter((item) => item.id !== current.id).map((item) => (
                  <CanvasStatic key={item.id} item={item} index={list.findIndex((entry) => entry.id === item.id)} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section section--plate">
        <div className="shell">
          <SectionIntro
            kicker={copy("consulting", "flowLabel")}
            title={copy("consulting", "engageTitle")}
            text={copy("consulting", "engageText")}
          />
          <ol className="engage-rail">
            {EM.CONSULTING_FLOW.map((step: { ar: string; en: string }, i: number) => (
              <li key={i}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span>{loc(step)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        tone="ink"
        kicker={copy("consulting", "ctaEyebrow")}
        title={copy("consulting", "ctaTitle")}
        text={copy("consulting", "ctaText")}
        href="contact.html?source=page:consulting"
        label={t("bookCta")}
      />
    </>
  );
}
