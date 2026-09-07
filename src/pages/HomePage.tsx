import { Link } from "react-router-dom";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, Dots, Go, GoldRule, SectionIntro } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { toRoute } from "@/lib/routes";
import { caseName, featuredCase } from "@/lib/em";

const CHALLENGE_ICONS = ["direction", "revenue", "expansion", "execute"];

const CONSULT_NEEDLES = [
  { ar: "قرارات", en: "Decisions" },
  { ar: "تشخيص", en: "Diagnosis" },
  { ar: "استراتيجية", en: "Strategy" },
  { ar: "خارطة نمو", en: "A growth map" }
];

const EXEC_NEEDLES = [
  { ar: "أنظمة", en: "Systems" },
  { ar: "مبادرات", en: "Initiatives" },
  { ar: "تفعيل", en: "Activation" },
  { ar: "قياس", en: "Measurement" }
];

export function HomePage() {
  const { t, loc, copy, lang } = useI18n();
  const proof = featuredCase();
  const challenges = EM.CHALLENGES.slice(0, 4);

  return (
    <>
      <header className="hero folio-hero">
        <div className="shell folio-hero__grid">
          <div className="folio-hero__copy">
            <p className="kicker" data-hero="kicker" dir="ltr">{copy("home", "eyebrow")}</p>
            <Dots />
            <h1 className="hero__title" data-hero="title">
              <span className="hero__ink">{copy("home", "title")}</span>
              <span className="hero__gold">{copy("home", "accent")}</span>
            </h1>
            <p className="lead" data-hero="lead">{copy("home", "lead")}</p>
            <div className="hero-actions" data-hero="actions">
              <Link className="btn btn--gold" to={toRoute("/contact", lang)}>
                {t("bookCta")} <Icon name="arrow" rtl={lang === "ar"} />
              </Link>
              <Go href="/cases/patchouli" label={t("viewCase")} />
            </div>
            <div className="cred-strip" aria-label={t("proofBar")}>
              <span className="cred-strip__item">
                <strong>18+</strong>
                <span>{copy("home", "years")}</span>
              </span>
              <span className="cred-strip__rule" aria-hidden="true" />
              <span className="cred-strip__item">
                <strong>GCC</strong>
                <span>{copy("home", "markets")}</span>
              </span>
            </div>
          </div>
          <figure className="loggia">
            <img
              className="loggia__img"
              src="/assets/images/elite-architecture.png"
              width={1600}
              height={2000}
              fetchPriority="high"
              decoding="async"
              alt={copy("home", "photoAlt")}
            />
            <span className="loggia__veil" aria-hidden="true" />
            <span className="loggia__arch" aria-hidden="true" />
            <img
              className="loggia__mark"
              src="/assets/images/logo-lockup.png"
              width={1085}
              height={685}
              alt="Elite Maison Marketing Consultancies"
            />
          </figure>
        </div>
      </header>

      <section className="section section--veiled section--geom">
        <div className="shell">
          <SectionIntro
            kicker={copy("home", "challengesEyebrow")}
            title={copy("home", "challengesTitle")}
            text={copy("home", "challengesText")}
          />
          <div className="challenge-index">
            {challenges.map((item: { href: string; ar: string; en: string; dest: { ar: string; en: string } }, i: number) => (
              <Link className="challenge-row" key={item.href} to={toRoute(item.href, lang)}>
                <span className="challenge-row__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="challenge-row__body">
                  <strong>{loc({ ar: item.ar, en: item.en })}</strong>
                  <span>{loc(item.dest)}</span>
                </span>
                <span className="challenge-row__icon" aria-hidden="true">
                  <Icon name={CHALLENGE_ICONS[i] || "direction"} rtl={lang === "ar"} />
                </span>
                <span className="challenge-row__go" aria-hidden="true">
                  <Icon name="arrow" rtl={lang === "ar"} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--plum">
        <div className="shell">
          <SectionIntro
            kicker={copy("home", "methodEyebrow")}
            title={copy("home", "methodTitle")}
            text={copy("home", "methodText")}
          />
          <div className="method-rail" data-reveal="line">
            {EM.METHOD.map((step: { ar: { title: string; text: string }; en: { title: string; text: string } }, i: number) => {
              const copyStep = lang === "ar" ? step.ar : step.en;
              return (
                <article key={copyStep.title}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{copyStep.title}</h3>
                  <p>{copyStep.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="paths-split" aria-label={copy("home", "capTitle")}>
        <article className="paths-split__consult" data-reveal="clip">
          <p className="kicker">{loc({ ar: "الاستشارات", en: "Consulting" })}</p>
          <GoldRule />
          <h2>{copy("home", "consultingTitle")}</h2>
          <p>{copy("home", "consultingPreview")}</p>
          <div className="needles">
            {CONSULT_NEEDLES.map((item) => <span key={item.en}>{loc(item)}</span>)}
          </div>
          <Go href="/consulting" label={copy("home", "consultingCta")} />
        </article>
        <article className="paths-split__exec" data-reveal="rise">
          <p className="kicker">{loc({ ar: "الحلول التنفيذية", en: "Execution" })}</p>
          <GoldRule />
          <h2>{copy("home", "executionTitle")}</h2>
          <p>{copy("home", "executionPreview")}</p>
          <div className="needles">
            {EXEC_NEEDLES.map((item) => <span key={item.en}>{loc(item)}</span>)}
          </div>
          <Go href="/execution" label={copy("home", "executionCta")} />
        </article>
      </section>

      <section className="section section--plate" id="proof">
        <div className="shell">
          <div className="proof-stage" data-reveal="rise">
            <div>
              <p className="kicker">{copy("home", "proofEyebrow")}</p>
              <GoldRule />
              <p className="proof-stage__metric">{copy("home", "proofMetric")}</p>
              <p className="proof-stage__label">{copy("home", "proofMetricLabel")}</p>
              <h2>{caseName(proof, loc)}</h2>
              <p className="intro">{copy("home", "proofContext")}</p>
              <Go href={`/cases/${proof.id}`} label={t("viewCase")} />
            </div>
            <figure className="proof-stage__visual">
              <img
                src="/assets/images/elite-architecture.png"
                width={1600}
                height={2000}
                loading="lazy"
                decoding="async"
                alt=""
              />
            </figure>
          </div>
        </div>
      </section>

      <CtaBand
        tone="strong"
        kicker={copy("home", "closeEyebrow")}
        title={copy("home", "closeTitle")}
        text={copy("home", "closeText")}
        href="/contact"
        label={t("bookCta")}
      />
    </>
  );
}
