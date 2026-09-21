import { useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { Icon } from "@/components/Icon";
import { Go } from "@/components/ui-kit";
import { toRoute } from "@/lib/routes";
import { withLang } from "@/lib/i18n-path";
import { caseName, casesArePublic } from "@/lib/em";
import { CountUp, DrawRule, EASE, Reveal, useRailProgress, useSelection } from "./motion";

type Loc = { ar: string; en: string };

type CaseItem = {
  id: string;
  sector: string | null;
  related: string[];
  publicName: Loc;
  anonymousName: Loc;
  challenge: Loc;
  result: Loc;
  proof: Loc;
  metric?: { value: string; unit: Loc; context?: Loc };
  beats?: { value: string; label: Loc }[];
};

type PillarItem = { id: string; ar: string; en: string; text: Loc; gloss: Loc };
type SectorItem = { id: string; title: Loc; context: Loc; challenges: Loc };

const pad = (n: number) => String(n).padStart(2, "0");

function sectorLabel(id: string | null, loc: (v: Loc) => string) {
  if (!id) return "";
  const sector = (EM.SECTORS as SectorItem[]).find((s) => s.id === id);
  return sector ? loc(sector.title) : "";
}

function Arrow({ rtl }: { rtl: boolean }) {
  return (
    <span className="hv-arrow" aria-hidden="true">
      <Icon name="arrow" rtl={rtl} />
    </span>
  );
}

/* ==========================================================================
 * 1 — سجل الأثر: الثقة أولًا، وبكل الأرقام لا برقم واحد
 * ======================================================================== */
export function ImpactLedger() {
  const { loc, copy, lang } = useI18n();
  const cases = EM.CASES as CaseItem[];
  const public_ = casesArePublic();

  return (
    <section className="section hv-ledger" id="proof" aria-labelledby="hv-ledger-title">
      <div className="shell">
        <Reveal className="hv-head">
          <p className="kicker">{copy("home", "proofEyebrow")}</p>
          <DrawRule long />
          <h2 id="hv-ledger-title">{copy("home", "casesTitle")}</h2>
          {!public_ && copy("home", "ledgerAnon") ? <p className="hv-note">{copy("home", "ledgerAnon")}</p> : null}
        </Reveal>

        <ul className="hv-ledger__list">
          {cases.map((item, i) => (
            <li key={item.id}>
              <Reveal delay={i * 0.06}>
                <Link className="hv-ledger__row" to={toRoute(`/cases/${item.id}`, lang)}>
                  <span className="hv-ledger__idx" aria-hidden="true">{pad(i + 1)}</span>

                  <span className="hv-ledger__metric">
                    {item.metric ? (
                      <>
                        <span className="hv-ledger__value"><CountUp value={item.metric.value} /></span>
                        <span className="hv-ledger__unit">{loc(item.metric.unit)}</span>
                      </>
                    ) : (
                      <span className="hv-ledger__award">{loc(item.proof)}</span>
                    )}
                  </span>

                  <span className="hv-ledger__body">
                    <strong>{caseName(item, loc)}</strong>
                    <span className="hv-ledger__sector">
                      {sectorLabel(item.sector, loc) || loc({ ar: "مشروع مستقل", en: "Standalone project" })}
                    </span>
                    <span className="hv-ledger__q">{loc(item.challenge)}</span>
                    {item.beats ? (
                      <span className="hv-ledger__beats" aria-label={loc({ ar: "تسلسل النتيجة", en: "Result progression" })}>
                        {item.beats.map((beat, bi) => (
                          <span key={beat.value}>
                            {bi > 0 ? <i className="hv-ledger__beats-sep" aria-hidden="true" /> : null}
                            <b dir="ltr">{beat.value}</b>
                            <em>{loc(beat.label)}</em>
                          </span>
                        ))}
                      </span>
                    ) : null}
                  </span>

                  <Arrow rtl={lang === "ar"} />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        {copy("home", "ledgerCta") ? (
          <Reveal delay={0.1}>
            <Go href="/cases" label={copy("home", "ledgerCta")} />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/* ==========================================================================
 * 2 — Four I's: نقاط الشعار الأربع تصبح المعنى نفسه
 * ======================================================================== */
export function FourIsSection() {
  const { loc, copy, lang } = useI18n();
  const pillars = EM.PILLARS as PillarItem[];
  const { index, setIndex, move } = useSelection(pillars.length);
  const active = pillars[index];
  const reduce = useReducedMotion() === true;

  function onKey(event: React.KeyboardEvent<HTMLButtonElement>) {
    const next = lang === "ar"
      ? (event.key === "ArrowLeft" ? 1 : event.key === "ArrowRight" ? -1 : 0)
      : (event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0);
    if (!next) return;
    event.preventDefault();
    move(next);
    const target = (index + next + pillars.length) % pillars.length;
    document.getElementById(`hv-four-btn-${pillars[target].id}`)?.focus();
  }

  return (
    <section className="section hv-four" aria-labelledby="hv-four-title">
      <div className="shell hv-four__grid">
        <Reveal className="hv-four__mark">
          <img
            src="/assets/images/logo-mark.png"
            width={153}
            height={153}
            loading="lazy"
            decoding="async"
            alt=""
          />
          {copy("home", "fourEyebrow") ? (
            <p className="hv-four__mark-note">{copy("home", "fourEyebrow")}</p>
          ) : null}
        </Reveal>

        <div className="hv-four__main">
          <Reveal className="hv-head">
            <p className="kicker" dir="ltr">Four I's. One Vision.</p>
            <DrawRule long />
            <h2 id="hv-four-title">{copy("home", "trustLabel")}</h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className="hv-four__dots"
              role={copy("home", "fourHint") ? "group" : undefined}
              aria-label={copy("home", "fourHint") || undefined}
            >
              <span className="hv-four__wire" aria-hidden="true">
                <span className="hv-four__wire-fill" style={{ ["--active" as string]: index }} />
              </span>
              {pillars.map((item, i) => (
                <button
                  type="button"
                  key={item.id}
                  id={`hv-four-btn-${item.id}`}
                  className="hv-four__dot"
                  aria-pressed={i === index}
                  aria-label={`${i + 1}. ${item.gloss ? loc(item.gloss) : item.en}`}
                  onClick={() => setIndex(i)}
                  onKeyDown={onKey}
                >
                  <i aria-hidden="true" />
                  <span className="hv-four__dot-label" dir="ltr">{item.en}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <div className="hv-four__panel" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                className="hv-four__answer"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="hv-four__term" dir="ltr">{active.en}</p>
                {active.gloss ? <p className="hv-four__gloss">{loc(active.gloss)}</p> : null}
                <p className="hv-four__text">{loc(active.text)}</p>
                {copy("home", "fourOrder") ? (
                  <p className="hv-four__order">
                    {copy("home", "fourOrder")} <b dir="ltr">{pad(index + 1)}</b> / <b dir="ltr">{pad(pillars.length)}</b>
                  </p>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 3 — مسار التسليم: خط ذهبي يمتلئ مع القراءة
 * ======================================================================== */
export function DeliveryPath() {
  const { loc, copy, lang } = useI18n();
  const steps = EM.METHOD as Record<"ar" | "en", { title: string; text: string }>[];
  const ref = useRef<HTMLOListElement>(null);
  const progress = useRailProgress(ref);
  const rtl = lang === "ar";

  return (
    <section className="section hv-path" aria-labelledby="hv-path-title">
      <div className="shell">
        <Reveal className="hv-head">
          {copy("home", "methodRailLabel") ? (
            <p className="kicker">{copy("home", "methodRailLabel")}</p>
          ) : null}
          <DrawRule />
          <h2 id="hv-path-title">{copy("home", "methodTitle")}</h2>
          <p className="intro">{copy("home", "methodText")}</p>
        </Reveal>

        <div className="hv-path__wrap">
          <span className="hv-path__track" aria-hidden="true">
            <motion.span
              className="hv-path__fill"
              style={{ scaleX: progress, transformOrigin: rtl ? "right" : "left" }}
            />
          </span>
          <ol className="hv-path__rail" ref={ref}>
            {steps.map((step, i) => {
              const content = rtl ? step.ar : step.en;
              return (
                <li key={content.title}>
                  <Reveal delay={i * 0.09}>
                    <span className="hv-path__node" aria-hidden="true" />
                    <span className="hv-path__num" dir="ltr">{pad(i + 1)}</span>
                    <h3>{content.title}</h3>
                    <p>{content.text}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 4 — مساران
 * ======================================================================== */
export function TwoPaths() {
  const { loc, copy, lang } = useI18n();
  const consult = (EM.HOME_NEEDLES.consult as Loc[]);
  const exec = (EM.HOME_NEEDLES.exec as Loc[]);

  const panel = (
    kicker: string,
    title: string,
    text: string,
    needles: Loc[],
    href: string,
    cta: string,
    variant: string,
    delay: number
  ) => (
    <Reveal className={`hv-path-card hv-path-card--${variant}`} delay={delay}>
      <span className="hv-path-card__arch" aria-hidden="true" />
      {kicker ? <p className="kicker">{kicker}</p> : null}
      <DrawRule />
      <h3>{title}</h3>
      <p>{text}</p>
      <ul className="hv-needles">
        {needles.map((item) => (
          <li key={item.en}><i aria-hidden="true" />{loc(item)}</li>
        ))}
      </ul>
      <Go href={href} label={cta} />
    </Reveal>
  );

  return (
    <section className="section hv-two" aria-labelledby="hv-two-title">
      <div className="shell">
        <Reveal className="hv-head">
          {copy("home", "pathsEyebrow") ? (
            <p className="kicker">{copy("home", "pathsEyebrow")}</p>
          ) : null}
          <DrawRule />
          <h2 id="hv-two-title">{copy("home", "capTitle")}</h2>
          {copy("home", "capText") ? (
            <p className="intro">{copy("home", "capText")}</p>
          ) : null}
        </Reveal>
        <div className="hv-two__grid">
          {panel(
            copy("home", "pathsConsultKicker"),
            copy("home", "consultingTitle"),
            copy("home", "consultingPreview"),
            consult,
            "/consulting",
            copy("home", "consultingCta"),
            "consult",
            0
          )}
          {panel(
            copy("home", "pathsExecKicker"),
            copy("home", "executionTitle"),
            copy("home", "executionPreview"),
            exec,
            "/execution",
            copy("home", "executionCta"),
            "exec",
            0.09
          )}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
 * 5 — القطاعات
 * ======================================================================== */
export function SectorsSection() {
  const { loc, copy, lang } = useI18n();
  const list = EM.SECTORS as SectorItem[];

  return (
    <section className="section hv-sectors" aria-labelledby="hv-sectors-title">
      <div className="shell">
        <Reveal className="hv-head">
          <p className="kicker">{copy("home", "sectorsEyebrow")}</p>
          <DrawRule />
          <h2 id="hv-sectors-title">{copy("home", "sectorsTitle")}</h2>
          {copy("home", "sectorsText") ? (
            <p className="intro">{copy("home", "sectorsText")}</p>
          ) : null}
        </Reveal>

        <ul className="hv-sectors__grid">
          {list.map((item, i) => (
            <li key={item.id}>
              <Reveal delay={i * 0.05}>
                <Link className="hv-sector" to={toRoute(`/sectors#${item.id}`, lang)}>
                  <span className="hv-sector__idx" aria-hidden="true">{pad(i + 1)}</span>
                  <h3>{loc(item.title)}</h3>
                  <p className="hv-sector__ctx">{loc(item.challenges)}</p>
                  <span className="hv-sector__go" aria-hidden="true"><Icon name="arrow" rtl={lang === "ar"} /></span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        {copy("home", "sectorsCta") ? (
          <Reveal delay={0.08}>
            <Go href="/sectors" label={copy("home", "sectorsCta")} />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/* ==========================================================================
 * 6 — الختام: مساران للتواصل، لا مسار واحد
 * ======================================================================== */
export function ClosingSection() {
  const { t, copy, lang } = useI18n();
  const contact = EM.CONFIG.contact as { email: string; phone: string; whatsappHref: string };
  const inquiryHref = `${withLang("/contact", lang)}?path=inquiry`;

  return (
    <section className="section hv-close" aria-labelledby="hv-close-title">
      <div className="shell hv-close__grid">
        <Reveal className="hv-head">
          <p className="kicker">{copy("home", "closeEyebrow")}</p>
          <DrawRule long />
          <h2 id="hv-close-title">{copy("home", "closeTitle")}</h2>
          <p className="intro">{copy("home", "closeText")}</p>
          {(copy("home", "closeNote") || copy("home", "statementText")) ? (
            <p className="hv-note">{copy("home", "closeNote") || copy("home", "statementText")}</p>
          ) : null}
        </Reveal>

        <Reveal className="hv-close__actions" delay={0.08}>
          <Link className="btn btn--gold" to={withLang("/contact", lang)}>
            {t("bookCta")} <Icon name="arrow" rtl={lang === "ar"} />
          </Link>
          {copy("home", "closeSecondary") ? (
            <Link className="btn btn--ghost" to={inquiryHref}>
              {copy("home", "closeSecondary")} <Icon name="arrow" rtl={lang === "ar"} />
            </Link>
          ) : null}

          {copy("home", "closeChannels") ? (
            <p className="hv-close__chan-label">{copy("home", "closeChannels")}</p>
          ) : null}
          <ul className="hv-close__channels">
            <li>
              <a href={contact.whatsappHref} rel="noreferrer">
                <Icon name="whatsapp" rtl={lang === "ar"} /><span dir="ltr">{contact.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`}>
                <Icon name="mail" rtl={lang === "ar"} /><span dir="ltr">{contact.email}</span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
