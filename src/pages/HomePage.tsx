import { Link } from "react-router-dom";
import { useI18n } from "@/context/language";
import { Dots, Go } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { toRoute } from "@/lib/routes";
import {
  ClosingSection,
  DeliveryPath,
  EngageSection,
  FourIsSection,
  ImpactLedger,
  InsightsSection,
  SectorsSection,
  TwoPaths
} from "@/components/home/sections";

export function HomePage() {
  const { t, copy, lang } = useI18n();

  return (
    <>
      {/* الهيرو — مقفل كما هو. انظر docs/locked-identity.md */}
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

      {/* ما بعد الهيرو — أُعيد بناؤه بالكامل */}
      <ImpactLedger />
      <FourIsSection />
      <DeliveryPath />
      <TwoPaths />
      <SectorsSection />
      <EngageSection />
      <InsightsSection />
      <ClosingSection />
    </>
  );
}
