import { useMemo } from "react";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, GeoAnswer, GoldRule, PageHero } from "@/components/ui-kit";
import { ConsultingCasesLightbox, type ConsultServiceItem } from "@/components/folio/ConsultingCasesLightbox";
import { useHashSelect } from "@/hooks/useHashSelect";

const CONSULT_IDS = (EM.CONSULTING as { id: string }[]).map((item) => item.id);

export function ConsultingPage() {
  const { t, copy, lang } = useI18n();
  const list = EM.CONSULTING as ConsultServiceItem[];
  const ids = useMemo(() => CONSULT_IDS, []);
  const [activeId, selectId] = useHashSelect(ids, list[0].id);

  return (
    <>
      <PageHero variant="service" visual="route" iconName="consult" kicker={copy("consulting", "eyebrow")} title={copy("consulting", "title")} lead={copy("consulting", "lead")} />
      {lang === "en" ? (
        <section className="section section--tight consulting-definition" aria-labelledby="consulting-definition-title">
          <div className="shell consulting-definition__grid">
            <div className="consulting-definition__primary">
              <h2 id="consulting-definition-title" className="consulting-definition__title">{copy("consulting", "answerLabel")}</h2>
              <GoldRule />
              <p className="consulting-definition__text">{copy("consulting", "answer")}</p>
            </div>
            <aside className="consulting-definition__audience" aria-labelledby="consulting-definition-audience">
              <h3 id="consulting-definition-audience" className="consulting-definition__audience-title">{copy("consulting", "audienceTitle")}</h3>
              <p className="consulting-definition__audience-text">{copy("consulting", "audienceText")}</p>
            </aside>
          </div>
        </section>
      ) : (
        <GeoAnswer label={copy("consulting", "answerLabel")} text={copy("consulting", "answer")} />
      )}
      <ConsultingCasesLightbox
        items={list}
        activeId={activeId}
        onSelect={selectId}
        serviceIds={ids}
        intro={{
          kicker: copy("consulting", "decisionEyebrow"),
          title: copy("consulting", "decisionTitle"),
          text: copy("consulting", "decisionText")
        }}
      />
      <CtaBand
        tone="ink"
        kicker={copy("consulting", "ctaEyebrow")}
        title={copy("consulting", "ctaTitle")}
        text={copy("consulting", "ctaText")}
        href="contact.html?source=page:consulting"
        label={t("bookCta")}
      />
      {lang === "en" ? (
        <section className="section about-faq">
          <div className="shell">
            <p className="kicker">{copy("consulting", "faqEyebrow")}</p>
            <hr className="gold-rule" />
            <h2 className="about-faq__title">{copy("consulting", "faqTitle")}</h2>
            <div className="about-faq__list">
              {(EM.CONSULTING_FAQ as { id: string; question: { en: string }; answer: { en: string } }[]).map((item) => (
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
