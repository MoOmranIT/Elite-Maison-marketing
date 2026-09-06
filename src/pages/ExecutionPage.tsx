import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, PageHero } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { Related } from "@/pages/ConsultingPage";

export function ExecutionPage() {
  const { t, loc, copy } = useI18n();
  return (
    <>
      <PageHero iconName="execute" variant="system" kicker={copy("execution", "eyebrow")} title={copy("execution", "title")} lead={copy("execution", "lead")} />
      <section className="section section--tight">
        <div className="shell">
          <p className="kicker">{copy("execution", "chainLabel")}</p>
          <hr className="gold-rule" />
          <div className="chain">
            {EM.EXECUTION_CHAIN.map((step: { ar: string; en: string }, i: number) => (
              <article key={i}>
                <span className="icon-well icon-well--sm"><Icon name="execute" /></span>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{loc(step)}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      {EM.EXECUTION.map((item: any, i: number) => (
        <section className="exec-mod" id={item.id} key={item.id}>
          <div className="exec-inner shell">
            <div className="exec-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
            <div><h2>{loc(item.title)}</h2></div>
            <dl className="facts">
              {([["bizObjective", item.objective], ["execScope", item.scope], ["impact", item.impact], ["metrics", item.metrics]] as const).map(([k, v]) => (
                <div key={k}><dt>{t(k)}</dt><dd>{loc(v)}</dd></div>
              ))}
            </dl>
          </div>
          <div className="shell"><Related id={item.id} kind="exec" /></div>
        </section>
      ))}
      <CtaBand title={copy("execution", "ctaTitle")} href="/sectors" label={t("exploreSectors")} />
    </>
  );
}
