import { useRef, useState, type FormEvent } from "react";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { GoldRule, PageHero } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { FormField } from "@/components/folio/FormField";
import { formsubmitUrl, INQUIRY_LIMITS, submitInquiry, validateInquiry, type InquiryPayload } from "@/lib/inquiry";

type FieldId = "name" | "email" | "company" | "phone" | "message";

const REQUIRED_FIELDS: FieldId[] = ["name", "email", "message"];

export function ContactPage() {
  const { t, copy, lang } = useI18n();
  const c = EM.CONFIG.contact as { email: string; phone: string; phoneHref: string; whatsappHref: string };
  const [values, setValues] = useState<Record<FieldId, string>>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState<Partial<Record<FieldId, string>>>({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const submitErrorRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  function setField(id: FieldId, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: undefined }));
    if (submitError) setSubmitError(false);
  }

  function validate() {
    const checked = validateInquiry({ ...values, website: honeypot });
    if (checked.ok) return {};
    const next: Partial<Record<FieldId, string>> = {};
    for (const [id, code] of Object.entries(checked.errors) as [FieldId, string][]) {
      if (code === "required") next[id] = t("contactRequired");
      else if (id === "email" && code === "invalid") next[id] = t("contactInvalidEmail");
      else next[id] = t("contactErrorSummary");
    }
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const next = validate();
    setErrors(next);
    const invalid = Object.keys(next) as FieldId[];
    if (invalid.length) {
      requestAnimationFrame(() => {
        document.getElementById(invalid[0])?.focus();
        if (invalid.length > 2) summaryRef.current?.focus();
      });
      return;
    }

    setSubmitError(false);
    setSending(true);
    const payload: InquiryPayload & { website?: string } = {
      name: values.name,
      email: values.email,
      message: values.message,
      company: values.company,
      phone: values.phone,
      website: honeypot
    };
    const result = await submitInquiry(payload);
    setSending(false);
    if (!result.ok) {
      setSubmitError(true);
      requestAnimationFrame(() => submitErrorRef.current?.focus());
      return;
    }
    setDone(true);
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const summary = Object.entries(errors).filter(([, message]) => message) as [FieldId, string][];

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
            <p className="hint">{copy("contact", "directText")}</p>
            <ul className="contact-direct">
              <li><a href={`mailto:${c.email}`}><Icon name="mail" rtl={lang === "ar"} />{t("emailChannelLabel")} <span dir="ltr">{c.email}</span></a></li>
              <li><a href={c.phoneHref} dir="ltr"><Icon name="phone" rtl={lang === "ar"} />{t("phoneChannelLabel")} <span>{c.phone}</span></a></li>
              <li><a href={c.whatsappHref} target="_blank" rel="noopener noreferrer" dir="ltr"><Icon name="whatsapp" rtl={lang === "ar"} />{t("whatsappChannelLabel")} <span>{c.phone}</span></a></li>
            </ul>
          </aside>

          <div className="contact-options">
            {done ? (
              <div className="form-success" tabIndex={-1} ref={statusRef} role="status">
                <GoldRule />
                <h2>{copy("contact", "successTitle")}</h2>
                <p>{copy("contact", "successText")}</p>
              </div>
            ) : (
              <form className="contact-form" noValidate onSubmit={onSubmit} aria-busy={sending}>
                <div className="contact-honeypot" inert>
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
                </div>

                <fieldset aria-labelledby="inquiry-title">
                  <legend className="sr-only">{copy("contact", "inquiryLabel")}</legend>
                  <h2 id="inquiry-title" className="form-step-title">{copy("contact", "inquiryTitle")}</h2>
                  <p className="hint">{copy("contact", "inquiryText")}</p>
                  <div
                    id="errorSummary"
                    className="error-summary"
                    role="alert"
                    tabIndex={-1}
                    hidden={summary.length === 0}
                    ref={summaryRef}
                  >
                    <h2>{t("contactErrorSummary")}</h2>
                    <ul>
                      {summary.map(([id, message]) => (
                        <li key={id}><a href={`#${id}`}>{message}</a></li>
                      ))}
                    </ul>
                  </div>

                  <div className="form-grid">
                    <FormField id="name" label={t("nameLabel")} error={errors.name} required>
                      <input value={values.name} maxLength={INQUIRY_LIMITS.name} autoComplete="name" onChange={(event) => setField("name", event.target.value)} />
                    </FormField>
                    <FormField id="email" label={t("emailLabel")} error={errors.email} required>
                      <input type="email" inputMode="email" value={values.email} maxLength={INQUIRY_LIMITS.email} autoComplete="email" onChange={(event) => setField("email", event.target.value)} />
                    </FormField>
                    <FormField id="company" label={t("companyLabel")} optional={t("optional")}>
                      <input value={values.company} maxLength={INQUIRY_LIMITS.company} autoComplete="organization" onChange={(event) => setField("company", event.target.value)} />
                    </FormField>
                    <FormField id="phone" label={t("phoneLabel")} optional={t("optional")}>
                      <input type="tel" inputMode="tel" value={values.phone} maxLength={INQUIRY_LIMITS.phone} autoComplete="tel" onChange={(event) => setField("phone", event.target.value)} />
                    </FormField>
                    <FormField id="message" label={t("messageLabel")} error={errors.message} required>
                      <textarea rows={5} maxLength={INQUIRY_LIMITS.message} value={values.message} onChange={(event) => setField("message", event.target.value)} />
                    </FormField>
                  </div>
                  <div className="form-actions">
                    <button className="btn btn--gold" type="submit" disabled={sending}>
                      {sending ? t("sending") : t("submitInquiryCta")} {!sending ? <Icon name="arrow" rtl={lang === "ar"} /> : null}
                    </button>
                  </div>
                </fieldset>
                {submitError ? (
                  <div className="form-error" role="alert" tabIndex={-1} ref={submitErrorRef}>
                    <h2>{copy("contact", "errorTitle")}</h2>
                    <p>{copy("contact", "errorText")}</p>
                  </div>
                ) : null}
                {formsubmitUrl() ? <p className="privacy-note">{copy("contact", "privacyNote")}</p> : null}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
