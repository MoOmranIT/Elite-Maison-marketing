import { useEffect, useState } from "react";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, GeoAnswer, GoldRule, PageHero, SectionIntro } from "@/components/ui-kit";
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

const CHAIN_TARGETS = ["performance", "systems", "campaigns", "activation"];

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
  const [active, setActive] = useState(list[0].id);

  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>(".exec-mod")];
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { threshold: [0.35, 0.55], rootMargin: "-18% 0px -40% 0px" }
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  const chainIndex = Math.max(0, CHAIN_TARGETS.findIndex((id) => {
    if (active === "automation") return id === "systems";
    if (active === "branding") return id === "campaigns";
    return id === active;
  }));

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

      <section className="section section--tight section--plate">
        <div className="shell">
          <SectionIntro
            kicker={copy("execution", "chainLabel")}
            title={copy("execution", "chainTitle")}
            text={copy("execution", "chainText")}
          />
          <ol className="exec-chain" data-active={chainIndex}>
            {EM.EXECUTION_CHAIN.map((step: { ar: string; en: string }, i: number) => (
              <li key={i}>
                <a
                  href={`#${CHAIN_TARGETS[i]}`}
                  className={i === chainIndex ? "is-active" : ""}
                  aria-current={i === chainIndex ? "true" : undefined}
                >
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{loc(step)}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

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
        text={copy("execution", "ctaText")}
        href="contact.html?source=page:execution"
        label={t("bookCta")}
      />
    </>
  );
}
