import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, GeoAnswer, GoldRule, PageHero } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { RelatedPath } from "@/components/folio/RelatedPath";

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
  const list = EM.EXECUTION as {
    id: string;
    title: { ar: string; en: string };
    objective: { ar: string; en: string };
    scope: { ar: string; en: string };
   impact: { ar: string; en: string };
     metrics: { ar: string; en: string };
   }[];

  return (
    <>
      <PageHero
        variant="service"
        visual="system"
        iconName="execute"
        kicker={copy("execution", "eyebrow")}
        title={copy("execution", "title")}
        lead={copy("execution", "lead")}
      />
      <GeoAnswer label={copy("execution", "answerLabel")} text={copy("execution", "answer")} />

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

      <CtaBand
        tone="strong"
        kicker={copy("execution", "ctaEyebrow")}
        title={copy("execution", "ctaTitle")}
        href="contact.html?source=page:execution"
        label={t("bookCta")}
      />
    </>
  );
}
