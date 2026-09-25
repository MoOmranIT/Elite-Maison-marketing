import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/context/language";
import { Dots } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { toRoute } from "@/lib/routes";
import {
  ClosingSection,
  DeliveryPath,
  FourIsSection,
  ImpactLedger,
  SectorsSection,
  TwoPaths
} from "@/components/home/sections";

export function HomePage() {
  const { t, copy, lang } = useI18n();

  const openDock = useCallback(() => {
    window.dispatchEvent(new Event("open-contact-dock"));
  }, []);

  return (
    <>
      <header className="hero folio-hero">
        <div className="shell folio-hero__grid">
          <div className="folio-hero__copy">
            <p className="kicker" data-hero="kicker" dir="ltr">{copy("home", "eyebrow")}</p>
            <p className="kicker kicker--hero-position" data-hero="position">
              {copy("home", "heroPositioning")}
            </p>
            <Dots />
            <h1 className="hero__title" data-hero="title">
              <span className="hero__ink hero__ink--primary">{copy("home", "title")}</span>
              <span className="hero__ink hero__ink--secondary">{copy("home", "accent")}</span>
              <span className="hero__ink hero__ink--outcome">{copy("home", "outcome")}</span>
            </h1>
            <span className="hero__rule" aria-hidden="true" />
            <p className="lead" data-hero="lead">{copy("home", "lead")}</p>
            <div className="hero-actions" data-hero="actions">
              <Link className="btn btn--gold" to={toRoute("/contact", lang)}>
                {t("bookCta")} <Icon name="arrow" rtl={lang === "ar"} />
              </Link>
              <button type="button" className="go" onClick={openDock}>
                <span className="icon-well icon-well--sm"><Icon name="mail" rtl={lang === "ar"} /></span>
                <span>{t("heroInquiry")}</span>
                <Icon name="arrow" rtl={lang === "ar"} />
              </button>
            </div>
          </div>
          <figure className="loggia loggia--four-is">
            <picture>
              <source srcSet="/assets/images/home-hero-four-is.avif" type="image/avif" />
              <source srcSet="/assets/images/home-hero-four-is.webp" type="image/webp" />
              <img
                className="loggia__img"
                src="/assets/images/home-hero-four-is.webp"
                width={935}
                height={1024}
                fetchPriority="high"
                decoding="async"
                alt={copy("home", "photoAlt")}
              />
            </picture>
            <span className="loggia__veil loggia__veil--soft" aria-hidden="true" />
          </figure>
        </div>
      </header>

      <div className="shell">
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
      <ImpactLedger />
      <FourIsSection />
      <DeliveryPath />
      <TwoPaths />
      <SectorsSection />
      <ClosingSection />
    </>
  );
}
