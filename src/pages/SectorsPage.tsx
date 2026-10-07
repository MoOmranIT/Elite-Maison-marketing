import { useEffect, useMemo } from "react";

import { EM } from "@/data/em.js";

import { useI18n } from "@/context/language";

import { CtaBand, GeoAnswer, GoldRule, PageHero, SectionIntro } from "@/components/ui-kit";

import { Icon } from "@/components/Icon";

import { RelatedPath } from "@/components/folio/RelatedPath";

import { SectorsDefinition } from "@/components/folio/SectorsIntro";

import { SectorsNavigator } from "@/components/folio/SectorsNavigator";

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



  const heroDeck = lang === "en" ? copy("sectors", "heroDeck") : undefined;

  const heroBody =

    lang === "en"

      ? [copy("sectors", "heroDesc1"), copy("sectors", "heroDesc2")].filter(Boolean)

      : undefined;

  const heroActions =

    lang === "en"

      ? [

          {

            label: copy("sectors", "heroPrimaryCta"),

            href: "contact.html?source=page:sectors",

            variant: "primary" as const

          },

          {

            label: copy("sectors", "heroSecondaryCta"),

            href: "#sectors",

            variant: "secondary" as const

          }

        ]

      : undefined;



  return (

    <>

      <PageHero

        variant="service"

        visual={lang === "en" ? "sectorsArt" : "atlas"}

        imageAlt={lang === "en" ? copy("sectors", "heroImageAlt") : undefined}

        iconName="sector"

        kicker={copy("sectors", "eyebrow")}

        title={copy("sectors", "title")}

        deck={heroDeck || undefined}

        lead={lang === "ar" ? copy("sectors", "lead") : undefined}

        body={heroBody?.length ? heroBody : undefined}

        actions={heroActions}

      />

      {lang === "ar" ? <GeoAnswer label={copy("sectors", "answerLabel")} text={copy("sectors", "answer")} /> : null}

      {lang === "en" ? <SectorsDefinition /> : null}

      <section className="section section--veiled" id="sectors">

        <div className="shell">

          {lang === "ar" ? (

            <SectionIntro kicker={copy("sectors", "selectEyebrow")} title={copy("sectors", "selectTitle")} text={copy("sectors", "selectNote")} />

          ) : null}

          {lang === "en" ? (

            <SectorsNavigator />

          ) : (

            <div className="folio-split folio-split--canonical">

              <nav className="folio-index folio-index--sector" aria-label={t("sectorNav")}>

                <span className="folio-index__mark" aria-hidden="true" />

                {list.map((item, i) => (

                  <a

                    key={item.id}

                    href={`#${item.id}`}

                    className={item.id === activeId ? "is-active" : undefined}

                    aria-current={item.id === activeId ? "true" : undefined}

                  >

                    <span className="icon-well icon-well--sm">

                      <Icon name={SECTOR_ICONS[item.id] || "sector"} rtl={lang === "ar"} />

                    </span>

                    <span className="num">{String(i + 1).padStart(2, "0")}</span>

                    <span>{loc(item.title)}</span>

                  </a>

                ))}

              </nav>

              <div className="folio-canonical-list">

                {list.map((item, index) => <Plate key={item.id} item={item} index={index} />)}

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
        label={lang === "en" ? copy("sectors", "ctaLabel") : t("bookCta")}
      />

      {lang === "en" ? (
        <section className="section about-faq">
          <div className="shell">
            <p className="kicker">{copy("sectors", "faqEyebrow")}</p>
            <hr className="gold-rule" />
            <h2 className="about-faq__title">{copy("sectors", "faqTitle")}</h2>
            <div className="about-faq__list">
              {(EM.SECTORS_FAQ as { id: string; question: { en: string }; answer: { en: string } }[]).map((item) => (
                <details key={item.id} className="about-faq__item">
                  <summary className="about-faq__question">{item.question.en}</summary>
                  <p className="about-faq__answer">{item.answer.en}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

    </>

  );

}


