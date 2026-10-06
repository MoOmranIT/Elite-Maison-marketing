import { useMemo } from "react";

import { EM } from "@/data/em.js";

import { useI18n } from "@/context/language";

import { CtaBand, GeoAnswer, GoldRule, PageHero } from "@/components/ui-kit";

import { Icon } from "@/components/Icon";

import { RelatedPath } from "@/components/folio/RelatedPath";

import { ExecutionDefinition, ExecutionServicesIntro } from "@/components/folio/ExecutionIntro";

import { ExecutionCasesLightbox, type ExecutionServiceItem } from "@/components/folio/ExecutionCasesLightbox";
import { ExecutionDeliveryFlip } from "@/components/folio/ExecutionDeliveryFlip";

import { useHashSelect } from "@/hooks/useHashSelect";



const EXEC_ICONS: Record<string, string> = {

  performance: "measure",

  campaigns: "campaign",

  systems: "system",

  automation: "automation",

  branding: "brand",

  activation: "activation"

};



const EXEC_STAGE: Record<string, { ar: string; en: string }> = {

  performance: { ar: "الهدف", en: "Objective" },

  systems: { ar: "النظام", en: "System" },

  automation: { ar: "النظام", en: "System" },

  campaigns: { ar: "التفعيل", en: "Activation" },

  branding: { ar: "التموضع", en: "Positioning" },

  activation: { ar: "القياس", en: "Measurement" }

};



export function ExecutionPage() {

  const { t, loc, copy, lang } = useI18n();

  const heroDeck = lang === "en" ? copy("execution", "heroDeck") : undefined;

  const heroBody =

    lang === "en"

      ? [copy("execution", "heroDesc1"), copy("execution", "heroDesc2")].filter(Boolean)

      : undefined;

  const heroActions =

    lang === "en"

      ? [

          {

            label: copy("execution", "heroPrimaryCta"),

            href: "contact.html?source=page:execution",

            variant: "primary" as const

          },

          {

            label: copy("execution", "heroSecondaryCta"),

            href: "#performance",

            variant: "secondary" as const

          }

        ]

      : undefined;

  const list = EM.EXECUTION as ExecutionServiceItem[];

  const serviceIds = useMemo(() => list.map((item) => item.id), [list]);

  const [activeId, selectId] = useHashSelect(serviceIds, serviceIds[0]);



  return (

    <>

      <PageHero

        variant="service"

        visual="system"

        iconName="execute"

        kicker={copy("execution", "eyebrow")}

        title={copy("execution", "title")}

        deck={heroDeck || undefined}

        lead={lang === "ar" ? copy("execution", "lead") : undefined}

        body={heroBody?.length ? heroBody : undefined}

        actions={heroActions}

      />

      {lang === "ar" ? (

        <GeoAnswer label={copy("execution", "answerLabel")} text={copy("execution", "answer")} />

      ) : (

        <>

          <ExecutionDefinition />

          <ExecutionServicesIntro />

        </>

      )}



      {lang === "en" ? (

        <ExecutionCasesLightbox

          items={list}

          activeId={activeId}

          onSelect={selectId}

          serviceIds={serviceIds}

          gridLead={copy("execution", "galleryGridLead")}

        />

      ) : (

        <div className="exec-track">

          {list.map((item, i) => (

            <section className={`exec-mod${i % 2 ? " exec-mod--alt" : ""}`} id={item.id} key={item.id}>

              <div className="shell exec-mod__inner">

                <p className="kicker kicker-row">

                  <span className="icon-well icon-well--sm icon-well--ink">

                    <Icon name={EXEC_ICONS[item.id] || "execute"} rtl={lang === "ar"} />

                  </span>

                  {loc(EXEC_STAGE[item.id])}

                </p>

                <p className="exec-mod__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</p>

                <h2>{loc(item.title)}</h2>

                <GoldRule />

                <p className="exec-mod__lead">{loc(item.objective)}</p>

                <p className="exec-mod__body">{loc(item.scope)}</p>

                <p className="exec-mod__impact">

                  <span className="kicker">{copy("execution", "impactLabel")}</span>

                  {loc(item.impact)}

                </p>

                <p className="exec-mod__out">

                  <span className="kicker">{t("metrics")}</span>

                  {loc(item.metrics)}

                </p>

                <RelatedPath id={item.id} kind="exec" />

              </div>

            </section>

          ))}

        </div>

      )}

      {lang === "en" ? <ExecutionDeliveryFlip /> : null}

      <CtaBand
        tone="strong"
        kicker={copy("execution", "ctaEyebrow")}
        title={copy("execution", "ctaTitle")}
        text={lang === "en" ? copy("execution", "ctaText") : undefined}
        href="contact.html?source=page:execution"
        label={lang === "en" ? copy("execution", "ctaLabel") : t("bookCta")}
      />

      {lang === "en" ? (
        <section className="section about-faq">
          <div className="shell">
            <p className="kicker">{copy("execution", "faqEyebrow")}</p>
            <hr className="gold-rule" />
            <h2 className="about-faq__title">{copy("execution", "faqTitle")}</h2>
            <div className="about-faq__list">
              {(EM.EXECUTION_FAQ as { id: string; question: { en: string }; answer: { en: string } }[]).map((item) => (
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


