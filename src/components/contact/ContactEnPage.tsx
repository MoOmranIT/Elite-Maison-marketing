import { Link } from "react-router-dom";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { Icon } from "@/components/Icon";
import { ContactInquiryForm } from "@/components/contact/ContactInquiryForm";
import { toRoute } from "@/lib/routes";
import { CONTACT_EN as COPY } from "@/data/contact-en.js";

export function ContactEnPage() {
  const { t, lang } = useI18n();
  const c = EM.CONFIG.contact as { email: string; phone: string; phoneHref: string; whatsappHref: string };
  const method = EM.METHOD as { en: { title: string } }[];

  return (
    <div className="contact-en">
      <section className="contact-en__desk contact-en__open" aria-labelledby="contact-en-title">
        <div className="contact-en__frame contact-en__open-grid">
          <div className="contact-en__intro">
            <p className="kicker">{COPY.hero.eyebrow}</p>
            <hr className="gold-rule" />
            <h1 id="contact-en-title" className="contact-en__title">{COPY.hero.title}</h1>
            <p className="contact-en__copy">{COPY.hero.intro}</p>
          </div>
          <aside className="contact-en__panel" aria-labelledby="contact-direct-title">
            <h2 id="contact-direct-title">{COPY.direct.title}</h2>
            <p>{COPY.direct.text}</p>
            <ul className="contact-en__channels">
              <li>
                <a href={`mailto:${c.email}`}>
                  <span className="contact-en__channel-label">{t("emailChannelLabel")}</span>
                  <span className="contact-en__channel-value" dir="ltr">
                    <Icon name="mail" rtl={false} />
                    {c.email}
                  </span>
                </a>
              </li>
              <li>
                <a href={c.phoneHref}>
                  <span className="contact-en__channel-label">{t("phoneChannelLabel")}</span>
                  <span className="contact-en__channel-value" dir="ltr">
                    <Icon name="phone" rtl={false} />
                    {c.phone}
                  </span>
                </a>
              </li>
              <li>
                <a href={c.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <span className="contact-en__channel-label">{t("whatsappChannelLabel")}</span>
                  <span className="contact-en__channel-value" dir="ltr">
                    <Icon name="whatsapp" rtl={false} />
                    {c.phone}
                  </span>
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="contact-en__desk contact-en__pair" aria-labelledby="contact-process-title">
        <div className="contact-en__frame contact-en__pair-grid">
          <div className="contact-en__process">
            <h2 id="contact-process-title">{COPY.process.title}</h2>
            <p className="contact-en__copy">{COPY.process.text}</p>
            <p className="contact-en__process-lead">{COPY.process.lead}</p>
            <ol className="contact-en__steps">
              {COPY.process.steps.map((step) => (
                <li key={step.id}>
                  <span className="contact-en__step-num">{step.num}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="contact-en__diagnostic" aria-labelledby="contact-diagnostic-title">
            <h2 id="contact-diagnostic-title">{COPY.diagnostic.title}</h2>
            <p>{COPY.diagnostic.text1}</p>
            <p className="contact-en__diagnostic-note">{COPY.diagnostic.text2}</p>
            <div className="contact-en__method" aria-label="Growth diagnostic process">
              {method.map((step, index) => (
                <span key={step.en.title} className="contact-en__method-step">
                  {index > 0 ? <span className="contact-en__method-arrow" aria-hidden="true">→</span> : null}
                  <span>{step.en.title}</span>
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="contact-en__desk contact-en__directory" aria-labelledby="contact-audience-title">
        <div className="contact-en__frame">
          <h2 id="contact-audience-title">{COPY.audience.title}</h2>
          <p className="contact-en__copy">{COPY.audience.text}</p>
          <ul className="contact-en__industries">
            {COPY.audience.industries.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact-en__desk contact-en__convert" aria-labelledby="contact-checklist-title">
        <div className="contact-en__frame contact-en__convert-grid">
          <div className="contact-en__guide">
            <h2 id="contact-checklist-title">{COPY.checklist.title}</h2>
            <p className="contact-en__copy">{COPY.checklist.text}</p>
            <ul className="contact-en__checklist-list">
              {COPY.checklist.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <ContactInquiryForm
            sectionId="contact-form"
            className="contact-en__form"
            labels={{
              formTitle: COPY.form.title,
              submitLabel: COPY.form.submit,
              sendingLabel: t("sending"),
              successText: COPY.form.success,
              errorTitle: EM.COPY.contact.errorTitle.en,
              errorText: EM.COPY.contact.errorText.en,
              privacyNote: COPY.form.privacy,
              inquiryLegend: COPY.form.title
            }}
          />
        </div>
      </section>

      <section className="contact-en__faq" aria-labelledby="contact-faq-title">
        <div className="contact-en__faq-frame">
          <p className="kicker">{COPY.faq.eyebrow}</p>
          <hr className="gold-rule" />
          <h2 id="contact-faq-title" className="about-faq__title">{COPY.faq.title}</h2>
          <div className="about-faq__list">
            {COPY.faq.items.map((item) => (
              <details key={item.id} className="about-faq__item">
                <summary className="about-faq__question">{item.question}</summary>
                <p className="about-faq__answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-en__close" aria-labelledby="contact-close-title">
        <div className="contact-en__frame contact-en__close-grid">
          <div>
            <p className="kicker">{COPY.cta.eyebrow}</p>
            <hr className="gold-rule" />
            <h2 id="contact-close-title">{COPY.cta.title}</h2>
            <p>{COPY.cta.text}</p>
          </div>
          <Link className="btn btn--gold" to={toRoute("/contact#contact-form", lang)}>
            {COPY.cta.button} <Icon name="arrow" rtl={false} />
          </Link>
        </div>
      </section>
    </div>
  );
}
