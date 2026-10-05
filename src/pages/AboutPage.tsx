import { Link } from "react-router-dom";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, Frame, PageHero } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { toRoute } from "@/lib/routes";

export function AboutPage() {
  const { t, loc, copy, lang } = useI18n();
  const fourTexts = (EM.COPY.about as { fourTexts?: Record<string, { ar: string; en: string }> }).fourTexts ?? {};
  const heroDeck = lang === "en" ? copy("about", "heroDeck") : undefined;
  const heroBody =
    lang === "en"
      ? [copy("about", "heroDesc1"), copy("about", "heroDesc2")].filter(Boolean)
      : undefined;
  const pillarsIntro = lang === "en" ? copy("about", "pillarsIntro") : "";
  const engageIntro = lang === "en" ? copy("about", "engageIntro") : "";
  return (
    <>
      <PageHero
        iconName="about"
        visual="image"
        imageAlt={copy("about", "heroImageAlt")}
        kicker={copy("about", "eyebrow")}
        title={copy("about", "title")}
        deck={heroDeck || undefined}
        lead={lang === "ar" ? copy("about", "lead") : undefined}
        body={heroBody?.length ? heroBody : undefined}
      />
      <section className="section about-who">
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
      <section className="section section--plum about-pillars">
        <div className="shell">
          <p className="kicker kicker-row" dir="ltr">
            <span className="icon-well icon-well--sm"><Icon name="about" /></span>
            Four I's. One Vision.
          </p>
          <hr className="gold-rule" />
          <h2>{copy("about", "pillarsTitle")}</h2>
          {pillarsIntro ? <p className="about-pillars__intro">{pillarsIntro}</p> : null}
          <div className="method" style={{ marginTop: "2rem" }}>
            {EM.PILLARS.map((item: { id: string; ar: string; en: string; text: { ar: string; en: string } }) => (
              <article key={item.id}>
                <p className="kicker">{loc({ ar: item.ar, en: item.en })}</p>
                <hr className="gold-rule" />
                <p>{fourTexts[item.id] ? loc(fourTexts[item.id]) : loc(item.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--tight about-engage">
        <div className="shell">
          <p className="kicker">{copy("about", "engageEyebrow")}</p>
          <hr className="gold-rule" />
          <h2>{copy("about", "engageTitle")}</h2>
          {engageIntro ? <p className="about-engage__intro">{engageIntro}</p> : null}
          <div className="stack about-engage__cards">
            {EM.ENGAGE.map((item: { id?: string; kicker?: string | { ar: string; en: string }; title: { ar: string; en: string }; text: { ar: string; en: string } }, i: number) => (
              <Frame
                key={i}
                href={`/contact?source=engagement:${item.id}`}
                iconName={item.id === "systems" ? "execute" : item.id === "end-to-end" ? "execute" : item.id === "growth" ? "revenue" : "consult"}
                kicker={item.kicker ? (typeof item.kicker === "object" ? loc(item.kicker) : item.kicker) : undefined}
                title={loc(item.title)}
                text={loc(item.text)}
              />
            ))}
          </div>
        </div>
      </section>
      {lang === "en" ? (
        <>
          <section className="section section--ink about-close">
            <div className="shell">
              <div className="about-close__frame">
                <hr className="gold-rule about-close__rule" />
                <div className="about-close__copy">
                  <h2 className="about-close__title">{copy("about", "ctaCloseTitle")}</h2>
                  <p className="about-close__text">{copy("about", "ctaCloseText")}</p>
                </div>
                <div className="about-close__action">
                  <Link className="btn btn--gold about-close__btn" to={toRoute("/consulting", lang)}>
                    {copy("about", "ctaCloseLabel")} <Icon name="arrow" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="section about-faq">
            <div className="shell">
              <p className="kicker">{copy("about", "faqEyebrow")}</p>
              <hr className="gold-rule" />
              <h2 className="about-faq__title">{copy("about", "faqTitle")}</h2>
              <div className="about-faq__list">
                {EM.ABOUT_FAQ.map((item: { id: string; question: { en: string }; answer: { en: string } }) => (
                  <details key={item.id} className="about-faq__item">
                    <summary className="about-faq__question">{item.question.en}</summary>
                    <p className="about-faq__answer">{item.answer.en}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <CtaBand title={copy("about", "ctaTitle")} href="/consulting" label={t("exploreCta")} />
      )}
    </>
  );
}
