import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { PageHero } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { ContactInquiryForm } from "@/components/contact/ContactInquiryForm";
import { ContactEnPage } from "@/components/contact/ContactEnPage";

export function ContactPage() {
  const { t, copy, lang } = useI18n();

  if (lang === "en") {
    return <ContactEnPage />;
  }

  const c = EM.CONFIG.contact as { email: string; phone: string; phoneHref: string; whatsappHref: string };

  return (
    <>
      <PageHero
        variant="conversion"
        visual="quiet"
        iconName="contact"
        kicker={copy("contact", "eyebrow")}
        title={copy("contact", "title")}
        lead={copy("contact", "lead")}
      />

      <section className="section section--sand contact-stage">
        <div className="shell contact-layout">
          <aside className="contact-aside">
            <h2>{copy("contact", "directTitle")}</h2>
            {copy("contact", "directText") ? <p className="hint">{copy("contact", "directText")}</p> : null}
            <ul className="contact-direct">
              <li>
                <a href={`mailto:${c.email}`}>
                  <Icon name="mail" rtl={lang === "ar"} />
                  {t("emailChannelLabel")} <span dir="ltr">{c.email}</span>
                </a>
              </li>
              <li>
                <a href={c.phoneHref} dir="ltr">
                  <Icon name="phone" rtl={lang === "ar"} />
                  {t("phoneChannelLabel")} <span>{c.phone}</span>
                </a>
              </li>
              <li>
                <a href={c.whatsappHref} target="_blank" rel="noopener noreferrer" dir="ltr">
                  <Icon name="whatsapp" rtl={lang === "ar"} />
                  {t("whatsappChannelLabel")} <span>{c.phone}</span>
                </a>
              </li>
            </ul>
          </aside>

          <div className="contact-options">
            <ContactInquiryForm
              labels={{
                formTitle: copy("contact", "inquiryTitle"),
                formHint: copy("contact", "inquiryText"),
                submitLabel: t("submitInquiryCta"),
                sendingLabel: t("sending"),
                successTitle: copy("contact", "successTitle"),
                successText: copy("contact", "successText"),
                errorTitle: copy("contact", "errorTitle"),
                errorText: copy("contact", "errorText"),
                privacyNote: copy("contact", "privacyNote"),
                inquiryLegend: copy("contact", "inquiryLabel")
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
