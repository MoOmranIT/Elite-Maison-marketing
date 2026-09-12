import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { GoldRule, PageHero } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { FormField } from "@/components/folio/FormField";
import { CalendarWidget } from "@/components/ui/calendar-widget";

type Lead = "consultation" | "inquiry";
type FieldId =
  | "name" | "email" | "phone" | "company"
  | "industry" | "market" | "outcome"
  | "challenge" | "inquiry" | "timeline";

/** Qualification fields shared by both paths, per docs/website-architecture.md. */
const REQUIRED_STEP1: FieldId[] = ["name", "email", "company", "industry", "challenge"];
const REQUIRED_INQUIRY: FieldId[] = ["name", "email", "company", "industry", "inquiry"];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function todayIso() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
}

export function ContactPage() {
  const { t, loc, copy, lang } = useI18n();
  const c = EM.CONFIG.contact as { email: string; phone: string; phoneHref: string; whatsappHref: string };
  const [params, setParams] = useSearchParams();
  const lead: Lead = params.get("path") === "inquiry" ? "inquiry" : "consultation";
  const consult = lead === "consultation";
  const step = consult && params.get("step") === "2" ? 2 : 1;
  const start = todayIso();
  const [preferredDate, setPreferredDate] = useState(start);
  const [values, setValues] = useState<Record<FieldId, string>>({
    name: "", email: "", phone: "", company: "",
    industry: "", market: "", outcome: "",
    challenge: "", inquiry: "", timeline: ""
  });
  const [errors, setErrors] = useState<Partial<Record<FieldId, string>>>({});
  const [done, setDone] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (step === 2) stepRef.current?.focus();
  }, [step, consult]);

  function setLead(next: Lead) {
    const nextParams = new URLSearchParams(params);
    if (next === "inquiry") nextParams.set("path", "inquiry");
    else nextParams.delete("path");
    nextParams.delete("step");
    setParams(nextParams, { replace: true });
    setErrors({});
    setDone(false);
  }

  function setStep(next: number) {
    const nextParams = new URLSearchParams(params);
    if (next === 2) nextParams.set("step", "2");
    else nextParams.delete("step");
    setParams(nextParams);
  }

  function setField(id: FieldId, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: undefined }));
  }

  function validate(ids: FieldId[]) {
    const next: Partial<Record<FieldId, string>> = {};
    ids.forEach((id) => {
      if (!values[id].trim()) next[id] = t("required");
      else if (id === "email" && !EMAIL.test(values[id].trim())) next[id] = t("invalidEmail");
    });
    return next;
  }

  function onContinue(event: FormEvent) {
    event.preventDefault();
    const next = validate(REQUIRED_STEP1);
    setErrors(next);
    const keys = Object.keys(next);
    if (keys.length) {
      requestAnimationFrame(() => document.getElementById(keys[0])?.focus());
      if (keys.length > 2) requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStep(2);
  }

  function onFinish(event: FormEvent) {
    event.preventDefault();
    if (consult && step === 1) {
      onContinue(event);
      return;
    }
    const required: FieldId[] = consult ? REQUIRED_STEP1 : REQUIRED_INQUIRY;
    const next = validate(required);
    setErrors(next);
    const keys = Object.keys(next);
    if (keys.length) {
      if (consult && step === 2) setStep(1);
      requestAnimationFrame(() => document.getElementById(keys[0])?.focus());
      return;
    }
    setDone(true);
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const summary = Object.entries(errors).filter(([, msg]) => msg) as [FieldId, string][];

  const fieldsStep1 = (
    <div className="form-grid">
      <FormField id="name" label={t("nameLabel")} error={errors.name}>
        <input value={values.name} autoComplete="name" onChange={(e) => setField("name", e.target.value)} />
      </FormField>
      <FormField id="email" label={t("emailLabel")} error={errors.email}>
        <input type="email" inputMode="email" value={values.email} autoComplete="email" onChange={(e) => setField("email", e.target.value)} />
      </FormField>
      <FormField id="company" label={t("companyLabel")} error={errors.company}>
        <input value={values.company} autoComplete="organization" onChange={(e) => setField("company", e.target.value)} />
      </FormField>
      <FormField id="phone" label={t("phoneLabel")} optional={t("optional")}>
        <input type="tel" inputMode="tel" value={values.phone} autoComplete="tel" onChange={(e) => setField("phone", e.target.value)} />
      </FormField>
      <FormField id="industry" label={t("industryLabel")} error={errors.industry}>
        <select value={values.industry} onChange={(e) => setField("industry", e.target.value)}>
          <option value="">{t("chooseOption")}</option>
          {(EM.INDUSTRIES as { ar: string; en: string }[]).map((item) => (
            <option key={item.en} value={item.en}>{loc(item)}</option>
          ))}
        </select>
      </FormField>
      <FormField id="market" label={t("marketLabel")} optional={t("optional")}>
        <input value={values.market} onChange={(e) => setField("market", e.target.value)} />
      </FormField>
      {consult ? (
        <FormField id="challenge" label={t("challengeLabel")} error={errors.challenge}>
          <textarea rows={4} value={values.challenge} onChange={(e) => setField("challenge", e.target.value)} />
        </FormField>
      ) : (
        <FormField id="inquiry" label={t("inquiryLabel")} error={errors.inquiry}>
          <textarea rows={4} value={values.inquiry} onChange={(e) => setField("inquiry", e.target.value)} />
        </FormField>
      )}
      <FormField id="outcome" label={t("outcomeLabel")} optional={t("optional")}>
        <textarea rows={3} value={values.outcome} onChange={(e) => setField("outcome", e.target.value)} />
      </FormField>
    </div>
  );

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
            <p className="hint">{consult ? copy("contact", "consultHint") : copy("contact", "inquiryHint")}</p>
            <ul className="contact-direct">
              <li><a href={`mailto:${c.email}`}><Icon name="mail" rtl={lang === "ar"} />{c.email}</a></li>
              <li><a href={c.whatsappHref}><Icon name="whatsapp" rtl={lang === "ar"} />{c.phone}</a></li>
            </ul>
          </aside>

          {done ? (
            <div className="form-success" tabIndex={-1} ref={statusRef} role="status">
              <p className="kicker">{t("prototypeOk")}</p>
              <GoldRule />
              <h2>{copy("contact", "successTitle")}</h2>
              <p>{copy("contact", consult ? "successConsult" : "successInquiry")}</p>
            </div>
          ) : (
            <form className="contact-form" noValidate onSubmit={onFinish}>
              <div
                className="path-switch"
                role="radiogroup"
                aria-label={t("pathLabel")}
                onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
                  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
                  event.preventDefault();
                  setLead(consult ? "inquiry" : "consultation");
                }}
              >
                <button type="button" role="radio" className="path-btn" aria-checked={consult} onClick={() => setLead("consultation")}>
                  <span className="icon-well icon-well--sm"><Icon name="contact" rtl={lang === "ar"} /></span>
                  {t("consultationPath")}
                </button>
                <button type="button" role="radio" className="path-btn" aria-checked={!consult} onClick={() => setLead("inquiry")}>
                  <span className="icon-well icon-well--sm"><Icon name="mail" rtl={lang === "ar"} /></span>
                  {t("inquiryPath")}
                </button>
              </div>

              {consult ? (
                <p className="step-meter" aria-live="polite">
                  {t("stepOf")} {step} {t("of")} 2
                  <span className="step-meter__bar" data-step={step} />
                </p>
              ) : null}

              <div
                id="errorSummary"
                className="error-summary"
                role="alert"
                tabIndex={-1}
                hidden={summary.length < 3}
                ref={summaryRef}
              >
                <h2>{t("errorSummary")}</h2>
                <ul>
                  {summary.map(([id, message]) => (
                    <li key={id}><a href={`#${id}`}>{message}</a></li>
                  ))}
                </ul>
              </div>

              {consult && step === 2 ? (
                <fieldset className="timing-step">
                  <legend>
                    <h2 className="form-step-title" tabIndex={-1} ref={stepRef}>{copy("contact", "step2Title")}</h2>
                  </legend>
                  <p className="hint">{copy("contact", "step2Text")}</p>
                  <FormField id="timeline" label={t("startLabel")} optional={t("optional")}>
                    <select value={values.timeline} onChange={(e) => setField("timeline", e.target.value)}>
                      <option value="">{t("chooseOption")}</option>
                      <option value="now">{t("startNow")}</option>
                      <option value="soon">{t("startSoon")}</option>
                      <option value="explore">{t("startExplore")}</option>
                    </select>
                  </FormField>
                  {/* Prototype scheduling: day preference only. Sample windows are not confirmed bookings. */}
                  <p className="kicker">{t("preferredDay")}</p>
                  <CalendarWidget
                    key={lang}
                    events={{}}
                    rangeStart={start}
                    initialSelectedDate={preferredDate}
                    locale={lang}
                    emptyLabel=""
                    dayOnlyLabel={t("preferredDay")}
                    onSelectionChange={({ date }) => setPreferredDate(date)}
                  />
                  <input type="hidden" name="preferredDate" value={preferredDate} />
                  <div className="form-actions">
                    <button className="btn btn--gold" type="submit">
                      {t("submitCta")} <Icon name="arrow" rtl={lang === "ar"} />
                    </button>
                    <button className="btn btn--ghost" type="button" onClick={() => setStep(1)}>{t("backStep")}</button>
                  </div>
                </fieldset>
              ) : (
                <fieldset>
                  <legend>
                    <h2 className="form-step-title">{copy("contact", consult ? "step1Title" : "inquiryTitle")}</h2>
                  </legend>
                  <p className="hint">{copy("contact", consult ? "step1Text" : "inquiryText")}</p>
                  {fieldsStep1}
                  <div className="form-actions">
                    <button className="btn btn--gold" type="submit">
                      {t(consult ? "continueCta" : "submitInquiryCta")} <Icon name="arrow" rtl={lang === "ar"} />
                    </button>
                  </div>
                </fieldset>
              )}
            </form>
          )}
        </div>
      </section>
    </>
  );
}
