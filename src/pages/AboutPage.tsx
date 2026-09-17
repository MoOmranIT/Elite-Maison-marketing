import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, Frame, PageHero } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";

export function AboutPage() {
  const { t, loc, copy } = useI18n();
  return (
    <>
      <PageHero iconName="about" visual="chamber" kicker={copy("about", "eyebrow")} title={copy("about", "title")} lead={copy("about", "lead")} />
      <section className="section">
        <div className="shell">
          <p className="kicker">{copy("about", "whoEyebrow")}</p>
          <hr className="gold-rule" />
          <div className="head">
            <h2>{copy("about", "whoTitle")}</h2>
            <p className="intro">{copy("about", "whoText")}</p>
          </div>
          <div className="stack">
            {EM.ABOUT.map((block: { title: { ar: string; en: string }; text: { ar: string; en: string } }, i: number) => (
              <article className="frame" key={i}>
                <span className="icon-well"><Icon name={["about", "consult", "insight"][i] || "about"} /></span>
                <div className="frame__body"><h3 className="frame__title">{loc(block.title)}</h3><p>{loc(block.text)}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--plum">
        <div className="shell">
          <p className="kicker kicker-row" dir="ltr">
            <span className="icon-well icon-well--sm"><Icon name="about" /></span>
            Four I's. One Vision.
          </p>
          <hr className="gold-rule" />
          <h2>{copy("about", "pillarsTitle")}</h2>
          <div className="method" style={{ marginTop: "2rem" }}>
            {EM.PILLARS.map((item: { id: string; ar: string; en: string; text: { ar: string; en: string } }) => (
              <article key={item.id}>
                <p className="kicker">{loc({ ar: item.ar, en: item.en })}</p>
                <hr className="gold-rule" />
                <p>{loc(item.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <p className="kicker">{copy("about", "methodEyebrow")}</p>
          <hr className="gold-rule" />
          <h2>{copy("about", "methodTitle")}</h2>
          <p className="intro">{copy("about", "methodText")}</p>
          <div className="method" style={{ marginTop: "2rem" }}>
            {EM.METHOD.map((step: { ar: { title: string; text: string }; en: { title: string; text: string } }, i: number) => (
              <article key={i}>
                <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{loc({ ar: step.ar.title, en: step.en.title })}</h3>
                <p>{loc({ ar: step.ar.text, en: step.en.text })}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--tight">
        <div className="shell">
          <p className="kicker">{copy("about", "engageEyebrow")}</p>
          <hr className="gold-rule" />
          <h2>{copy("about", "engageTitle")}</h2>
          <div className="stack" style={{ marginTop: "1.5rem" }}>
            {EM.ENGAGE.map((item: { id?: string; kicker?: string; title: { ar: string; en: string }; text: { ar: string; en: string } }, i: number) => (
              <Frame
                key={i}
                href={`/contact?source=engagement:${item.id}`}
                iconName={item.id === "systems" ? "execute" : item.id === "end-to-end" ? "execute" : item.id === "growth" ? "revenue" : "consult"}
                kicker={item.kicker}
                title={loc(item.title)}
                text={loc(item.text)}
              />
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={copy("about", "ctaTitle")} href="/consulting" label={t("exploreCta")} />
    </>
  );
}
