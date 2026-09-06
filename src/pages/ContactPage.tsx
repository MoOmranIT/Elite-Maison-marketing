import { useMemo, useRef, useState, type FormEvent } from "react";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { PageHero } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { CalendarWidget, type CalendarEvent, type EventsData } from "@/components/ui/calendar-widget";

const RANGE_START = "2026-09-06";
const START = "2026-09-07";

function windows(lang: "ar" | "en"): EventsData {
  if (lang === "ar") {
    return {
      "2026-09-07": [
        { title: "جلسة تشخيص", time: "10:00 – 11:00" },
        { title: "محادثة متابعة", time: "14:00 – 14:45" }
      ],
      "2026-09-09": [
        { title: "استفسار أولي", time: "09:30 – 10:00" },
        { title: "مراجعة نمو", time: "16:00 – 17:00" }
      ],
      "2026-09-14": [
        { title: "ورشة استراتيجية", time: "11:00 – 12:30" }
      ]
    };
  }
  return {
    "2026-09-07": [
      { title: "Diagnostic session", time: "10:00 – 11:00" },
      { title: "Follow-up conversation", time: "14:00 – 14:45" }
    ],
    "2026-09-09": [
      { title: "Initial inquiry", time: "09:30 – 10:00" },
      { title: "Growth review", time: "16:00 – 17:00" }
    ],
    "2026-09-14": [
      { title: "Strategy workshop", time: "11:00 – 12:30" }
    ]
  };
}

function formatDay(iso: string, lang: "ar" | "en") {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${iso}T12:00:00`));
}

type FieldId = "name" | "email" | "phone" | "company" | "industry" | "market" | "challenge" | "outcome" | "timeline" | "inquiry";

export function ContactPage() {
  const { t, loc, copy, lang } = useI18n();
  const c = EM.CONFIG.contact;
  const [lead, setLead] = useState<"consultation" | "inquiry">("consultation");
  const consult = lead === "consultation";
  const events = useMemo(() => windows(lang), [lang]);
  const [preferredDate, setPreferredDate] = useState(START);
  const [slot, setSlot] = useState<CalendarEvent | null>(events[START]?.[0] ?? null);
  const [values, setValues] = useState<Record<FieldId, string>>({
    name: "", email: "", phone: "", company: "", industry: "", market: "", challenge: "", outcome: "", timeline: "", inquiry: ""
  });
  const [errors, setErrors] = useState<Partial<Record<FieldId, string>>>({});
  const [summary, setSummary] = useState<{ id: FieldId; label: string; message: string }[]>([]);
  const [status, setStatus] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const choice = slot
    ? loc({
        ar: `${formatDay(preferredDate, "ar")} · ${slot.title}، ${slot.time}`,
        en: `${formatDay(preferredDate, "en")} · ${slot.title}, ${slot.time}`
      })
    : formatDay(preferredDate, lang);

  function setField(id: FieldId, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Partial<Record<FieldId, string>> = {};
    const rows: { id: FieldId; label: string; message: string }[] = [];
    const required: FieldId[] = consult
      ? ["name", "email", "company", "industry", "market", "challenge", "outcome", "timeline"]
      : ["name", "email", "company", "inquiry"];

    required.forEach((id) => {
      let msg = "";
      if (!values[id].trim()) msg = t("required");
      else if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[id])) msg = t("invalidEmail");
      if (msg) {
        next[id] = msg;
        const lab = document.querySelector(`label[for="${id}"]`);
        rows.push({ id, label: lab ? (lab.textContent || id).trim() : id, message: msg });
      }
    });

    setErrors(next);
    setSummary(rows);
    setStatus("");
    if (rows.length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus(t("prototypeOk"));
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  function field(id: FieldId, label: string, opts: { type?: string; auto?: string; textarea?: boolean; select?: { value: string; label: string }[]; optional?: boolean; hidden?: boolean } = {}) {
    if (opts.hidden) return null;
    const described = `${id}Error`;
    const invalid = Boolean(errors[id]);
    const shared = {
      id,
      name: id,
      value: values[id],
      required: !opts.optional,
      "aria-describedby": described,
      "aria-invalid": invalid ? true : undefined,
      autoComplete: opts.auto,
      onChange: (e: { target: { value: string } }) => setField(id, e.target.value)
    };
    const full = Boolean(opts.textarea || id === "timeline" || id === "inquiry");
    return (
      <div className={full ? "field field--full" : "field"}>
        <label htmlFor={id}>
          {label}{opts.optional ? <span className="optional"> {t("optional")}</span> : null}
        </label>
        {opts.select ? (
          <select {...shared} onChange={(e) => setField(id, e.target.value)}>
            {opts.select.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        ) : opts.textarea ? (
          <textarea {...shared} onChange={(e) => setField(id, e.target.value)} />
        ) : (
          <input {...shared} type={opts.type || "text"} />
        )}
        <p className="error" id={described}>{errors[id] || ""}</p>
      </div>
    );
  }

  return (
    <>
      <PageHero
        variant="hush"
        iconName="contact"
        kicker={copy("contact", "eyebrow")}
        title={copy("contact", "question") || copy("contact", "title")}
        lead={copy("contact", "lead")}
      />
      <section className="section">
        <div className="shell contact-grid">
          <aside>
            <p className="hint" hidden={!consult}>{copy("contact", "consultHint")}</p>
            <p className="hint" hidden={consult}>{copy("contact", "inquiryHint")}</p>
            <p className="hint">{t("contactTime")}</p>
            <div className="meta-list">
              <a className="door-card" href={`mailto:${c.email}`}><span className="icon-well icon-well--sm"><Icon name="mail" /></span><span>{c.email}</span></a>
              <a className="door-card" href={c.phoneHref}><span className="icon-well icon-well--sm"><Icon name="phone" /></span><span>{c.phone}</span></a>
            </div>
          </aside>
          <form id="consultationForm" noValidate onSubmit={onSubmit}>
            <div
              id="errorSummary"
              className="error-summary"
              role="alert"
              tabIndex={-1}
              hidden={!summary.length}
              ref={summaryRef}
            >
              {summary.length ? (
                <>
                  <h2 id="errorSummaryTitle">{t("errorSummary")}</h2>
                  <ul>
                    {summary.map((row) => (
                      <li key={row.id}>
                        <a href={`#${row.id}`} onClick={(ev) => { ev.preventDefault(); document.getElementById(row.id)?.focus(); }}>
                          {row.label}: {row.message}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
            <input type="hidden" name="leadType" value={lead} />
            {consult ? (
              <>
                <input type="hidden" name="preferredDate" value={preferredDate} />
                <input type="hidden" name="preferredWindow" value={slot ? `${slot.title} ${slot.time}` : ""} />
              </>
            ) : null}
            <fieldset>
              <legend>{t("pathLabel")}</legend>
              <div className="path-switch" role="group" aria-label={t("pathLabel")}>
                <button type="button" className="path-btn" aria-pressed={consult} onClick={() => setLead("consultation")}>
                  <span className="icon-well icon-well--sm"><Icon name="contact" rtl={lang === "ar"} /></span>
                  {t("consultationPath")}
                </button>
                <button type="button" className="path-btn" aria-pressed={!consult} onClick={() => setLead("inquiry")}>
                  <span className="icon-well icon-well--sm"><Icon name="mail" rtl={lang === "ar"} /></span>
                  {t("inquiryPath")}
                </button>
              </div>
            </fieldset>
            {consult ? (
              <fieldset className="book" aria-describedby="bookHint">
                <legend>{loc({ ar: "متى يناسبكم الحديث؟", en: "When should we talk?" })}</legend>
                <hr className="gold-rule is-draw" />
                <p className="hint" id="bookHint">
                  {loc({
                    ar: "اختاروا يومًا، ثم نافذة إرشادية إن وُجدت. هذه نوافذ للنموذج الأولي وليست حجوزات مؤكدة.",
                    en: "Choose a day, then a sample window if one is shown. These are prototype windows, not confirmed bookings."
                  })}
                </p>
                <CalendarWidget
                  key={lang}
                  events={events}
                  rangeStart={RANGE_START}
                  initialSelectedDate={START}
                  locale={lang}
                  emptyLabel={loc({ ar: "لا نافذة إرشادية في هذا اليوم — يبقى اليوم مفضّلًا للطلب.", en: "No sample window on this day — the day still goes with the request." })}
                  windowsLabel={loc({ ar: "نافذة مقترحة", en: "Suggested window" })}
                  dayOnlyLabel={loc({ ar: "هذا اليوم دون تحديد نافذة", en: "This day, without a specific window" })}
                  windowMarkLabel={loc({ ar: "يحتوي نافذة إرشادية", en: "Has a sample window" })}
                  onSelectionChange={({ date, slot: next }) => {
                    setPreferredDate(date);
                    setSlot(next);
                  }}
                />
                <p className="book__choice" role="status">
                  {loc({ ar: "سيُرفق مع الطلب:", en: "Included with the request:" })}{" "}
                  <strong>{choice}</strong>
                </p>
              </fieldset>
            ) : null}
            <fieldset className="intake">
              <legend>{consult
                ? loc({ ar: "عن الشركة والتحدي", en: "About the company and the challenge" })
                : loc({ ar: "تفاصيل الاستفسار", en: "Inquiry details" })}</legend>
              <hr className="gold-rule is-draw" />
              <div className="form-grid">
              {field("name", t("nameLabel"), { auto: "name" })}
              {field("email", t("emailLabel"), { type: "email", auto: "email" })}
              {field("phone", t("phoneLabel"), { type: "tel", auto: "tel", optional: true })}
              {field("company", t("companyLabel"), { auto: "organization" })}
              {field("industry", t("industryLabel"), {
                hidden: !consult,
                select: [{ value: "", label: t("chooseOption") }].concat(
                  EM.INDUSTRIES.map((o: { en: string; ar: string }) => ({ value: o.en, label: loc(o) }))
                )
              })}
              {field("market", t("marketLabel"), { hidden: !consult })}
              {field("challenge", t("challengeLabel"), { textarea: true, hidden: !consult })}
              {field("outcome", t("outcomeLabel"), { textarea: true, hidden: !consult })}
              {field("timeline", t("startLabel"), {
                hidden: !consult,
                select: [
                  { value: "", label: t("chooseOption") },
                  { value: "now", label: t("startNow") },
                  { value: "soon", label: t("startSoon") },
                  { value: "explore", label: t("startExplore") }
                ]
              })}
              {field("inquiry", t("inquiryLabel"), { textarea: true, hidden: consult })}
              </div>
            </fieldset>
            <button className="btn btn--gold" type="submit">
              <Icon name={consult ? "contact" : "mail"} rtl={lang === "ar"} />
              {t(consult ? "submitCta" : "submitInquiryCta")} <Icon name="arrow" rtl={lang === "ar"} />
            </button>
            <p className="form-status" role="status" aria-live="polite" tabIndex={-1} hidden={!status} ref={statusRef}>
              {status}
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
