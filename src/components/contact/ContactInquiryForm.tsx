import { useRef, useState, type FormEvent } from "react";
import { useI18n } from "@/context/language";
import { GoldRule } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { FormField } from "@/components/folio/FormField";
import { formsubmitUrl, INQUIRY_LIMITS, submitInquiry, validateInquiry, type InquiryPayload } from "@/lib/inquiry";

type FieldId = "name" | "email" | "company" | "phone" | "message";

export type ContactFormLabels = {
  formTitle: string;
  formHint?: string;
  submitLabel: string;
  sendingLabel: string;
  successTitle?: string;
  successText: string;
  errorTitle: string;
  errorText: string;
  privacyNote: string;
  inquiryLegend?: string;
};

type ContactInquiryFormProps = {
  labels: ContactFormLabels;
  sectionId?: string;
  className?: string;
};

export function ContactInquiryForm({ labels, sectionId = "contact-form", className }: ContactInquiryFormProps) {
  const { t, lang } = useI18n();
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
    <div id={sectionId} className={className} tabIndex={-1}>
      {done ? (
        <div className="form-success" tabIndex={-1} ref={statusRef} role="status">
          <GoldRule />
          {labels.successTitle ? <h2>{labels.successTitle}</h2> : <h2 className="form-success__lead">{labels.successText}</h2>}
          {labels.successTitle ? <p>{labels.successText}</p> : null}
        </div>
      ) : (
        <form className="contact-form" noValidate onSubmit={onSubmit} aria-busy={sending}>
          <div className="contact-honeypot" inert>
            <label htmlFor="website">Website</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
          </div>

          <fieldset aria-labelledby="contact-form-heading">
            <legend className="sr-only">{labels.inquiryLegend || labels.formTitle}</legend>
            <h2 id="contact-form-heading" className="form-step-title">{labels.formTitle}</h2>
            {labels.formHint ? <p className="hint">{labels.formHint}</p> : null}
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
                  <li key={id}>
                    <a href={`#${id}`}>{message}</a>
                  </li>
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
                {sending ? labels.sendingLabel : labels.submitLabel} {!sending ? <Icon name="arrow" rtl={lang === "ar"} /> : null}
              </button>
            </div>
          </fieldset>
          {submitError ? (
            <div className="form-error" role="alert" tabIndex={-1} ref={submitErrorRef}>
              <h2>{labels.errorTitle}</h2>
              <p>{labels.errorText}</p>
            </div>
          ) : null}
          {formsubmitUrl() ? <p className="privacy-note">{labels.privacyNote}</p> : null}
        </form>
      )}
    </div>
  );
}
