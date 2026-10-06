import {

  useCallback,

  useEffect,

  useRef,

  useState,

  type KeyboardEvent as ReactKeyboardEvent,

  type MouseEvent

} from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { EM } from "@/data/em.js";

import { useI18n } from "@/context/language";

import { GoldRule, Go, SectionIntro } from "@/components/ui-kit";

import { Icon } from "@/components/Icon";

import { RelatedPath } from "@/components/folio/RelatedPath";



export type ConsultRelatedLink = {

  label: string;

  text: string;

  href: string;

};



export type ConsultServiceItem = {

  id: string;

  title: { ar: string; en: string };

  challenge: { ar: string; en: string };

  objective: { ar: string; en: string };

  scope: { ar: string; en: string };

  role: { ar: string; en: string };

  measure: { ar: string; en: string };

  cardQuestion?: string;

  cardService?: string;

  detailTitle?: string;

  detailQuestion?: string;

  description?: string;

  whatYouGet?: string[];

  bestFor?: string;

  related?: ConsultRelatedLink;

};



const ANIM_MS = 200;



function prefersReducedMotion() {

  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

}



function safeHash(hash: string) {

  const raw = hash.replace(/^#/, "");

  try {

    return decodeURIComponent(raw);

  } catch {

    return raw;

  }

}



function enDetail(id: string): Partial<ConsultServiceItem> {

  return (EM.CONSULTING_EN_DETAIL as Record<string, Partial<ConsultServiceItem>>)[id] ?? {};

}



type Props = {

  items: ConsultServiceItem[];

  activeId: string;

  onSelect: (id: string) => void;

  serviceIds: string[];

  intro: { kicker: string; title: string; text?: string };

};



export function ConsultingCasesLightbox({ items, activeId, onSelect, serviceIds, intro }: Props) {

  const { t, loc, copy, lang } = useI18n();

  const location = useLocation();

  const navigate = useNavigate();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const closeTimerRef = useRef<number | null>(null);

  const [viewId, setViewId] = useState(activeId);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [deliveryFlipped, setDeliveryFlipped] = useState(false);

  const deliveryTitleFull = copy("consulting", "deliveryTitle");
  const deliveryBrandInTitle = "Elite Maison";
  const deliveryBrandIndex = deliveryTitleFull.indexOf(deliveryBrandInTitle);
  const deliveryTitleLead =
    deliveryBrandIndex >= 0 ? deliveryTitleFull.slice(0, deliveryBrandIndex).trim() : deliveryTitleFull;
  const deliveryTitleTrail =
    deliveryBrandIndex >= 0 ? deliveryTitleFull.slice(deliveryBrandIndex + deliveryBrandInTitle.length).trim() : "";

  const activeIndex = Math.max(0, items.findIndex((item) => item.id === viewId));

  const total = items.length;

  const item = items[activeIndex] ?? items[0];

  const detail = lang === "en" ? { ...enDetail(item.id), ...item } : item;

  const isEnDetail = lang === "en" && Boolean(detail.detailTitle);



  const cardLabel = (entry: ConsultServiceItem, index: number) => {

    const en = enDetail(entry.id);

    if (lang === "en" && en.cardQuestion && en.cardService) {

      return `${en.cardQuestion} — ${en.cardService}`;

    }

    return `${loc(entry.challenge)} — ${loc(entry.title)}`;

  };



  const clearServiceHash = useCallback(() => {

    navigate({ pathname: location.pathname, search: location.search, hash: "" }, { replace: true });

  }, [location.pathname, location.search, navigate]);



  const cancelCloseTimer = useCallback(() => {

    if (closeTimerRef.current !== null) {

      window.clearTimeout(closeTimerRef.current);

      closeTimerRef.current = null;

    }

  }, []);



  const ensureDialogOpen = useCallback(

    (focusClose = true) => {

      const dialog = dialogRef.current;

      if (!dialog) return;

      cancelCloseTimer();

      if (!dialog.open) {

        dialog.showModal();

      }

      setDialogVisible(true);

      if (focusClose) {

        window.setTimeout(() => closeBtnRef.current?.focus({ preventScroll: true }), 0);

      }

    },

    [cancelCloseTimer]

  );



  const finishClose = useCallback(() => {

    closeTimerRef.current = null;

    const el = dialogRef.current;

    setDialogVisible(false);

    if (el?.open) el.close();

    clearServiceHash();

    const trigger = lastTriggerRef.current;

    if (trigger && document.contains(trigger)) trigger.focus({ preventScroll: true });

    else triggerRefs.current[viewId]?.focus({ preventScroll: true });

  }, [viewId, clearServiceHash]);



  const requestClose = useCallback(() => {

    const dialog = dialogRef.current;

    if (!dialog || !dialog.open) return;

    if (closeTimerRef.current !== null) return;

    setDialogVisible(false);

    if (prefersReducedMotion()) {

      finishClose();

    } else {

      closeTimerRef.current = window.setTimeout(finishClose, ANIM_MS);

    }

  }, [finishClose]);



  const selectService = useCallback(

    (id: string) => {

      setViewId(id);

      onSelect(id);

    },

    [onSelect]

  );



  const goToIndex = useCallback(

    (index: number) => {

      const wrapped = ((index % total) + total) % total;

      selectService(items[wrapped].id);

    },

    [items, selectService, total]

  );



  const goPrev = useCallback(() => goToIndex(activeIndex - 1), [activeIndex, goToIndex]);

  const goNext = useCallback(() => goToIndex(activeIndex + 1), [activeIndex, goToIndex]);



  const openFromCard = (id: string, button: HTMLButtonElement) => {

    lastTriggerRef.current = button;

    selectService(id);

    ensureDialogOpen(true);

  };



  useEffect(() => {

    const hashId = safeHash(location.hash);

    if (!serviceIds.includes(hashId)) return;

    setViewId(hashId);

    if (dialogRef.current?.open) return;

    ensureDialogOpen(true);

  }, [location.hash, serviceIds, ensureDialogOpen]);



  useEffect(() => {

    return () => {

      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);

    };

  }, []);



  useEffect(() => {

    const dialog = dialogRef.current;

    if (!dialog) return;

    const onCancel = (event: Event) => {

      event.preventDefault();

      requestClose();

    };

    dialog.addEventListener("cancel", onCancel);

    return () => dialog.removeEventListener("cancel", onCancel);

  }, [requestClose]);



  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {

    const panel = dialogRef.current?.querySelector(".consulting-lightbox__panel");

    if (panel && !panel.contains(event.target as Node)) requestClose();

  };



  const onDialogKeyDown = (event: ReactKeyboardEvent<HTMLDialogElement>) => {

    const rtl = lang === "ar";

    const tag = (event.target as HTMLElement).tagName;

    const inField = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

    if (inField) return;



    if (event.key === "ArrowLeft") {

      event.preventDefault();

      rtl ? goNext() : goPrev();

    } else if (event.key === "ArrowRight") {

      event.preventDefault();

      rtl ? goPrev() : goNext();

    } else if (event.key === "Home") {

      event.preventDefault();

      goToIndex(0);

    } else if (event.key === "End") {

      event.preventDefault();

      goToIndex(total - 1);

    }

  };



  const modalTitle = isEnDetail ? detail.detailTitle! : loc(item.title);

  const describedById = isEnDetail ? `${item.id}-lightbox-description` : `${item.id}-lightbox-challenge`;

  const gridLead = copy("consulting", "gridLead");



  return (

    <section className="section section--veiled section--geom consulting-gallery">

      <div className="shell">

        <div className="consulting-gallery__intro-stage">
          <SectionIntro kicker={intro.kicker} title={intro.title} text={intro.text} />
          {lang === "en" ? (
            <aside
              className={`consulting-delivery${deliveryFlipped ? " is-flipped" : ""}`}
              tabIndex={0}
              role="group"
              aria-labelledby="consulting-delivery-title"
              aria-describedby="consulting-delivery-body"
              onPointerUp={(event) => {
                if (event.pointerType === "touch") setDeliveryFlipped((value) => !value);
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setDeliveryFlipped(false);
                }
              }}
            >
              <h2 id="consulting-delivery-title" className="sr-only">
                {copy("consulting", "deliveryTitle")}
              </h2>
              <p id="consulting-delivery-body" className="sr-only">
                {copy("consulting", "deliveryText")}
              </p>
              <div className="consulting-delivery__shell" aria-hidden="true">
                <div className="consulting-delivery__flip">
                  <div className="consulting-delivery__face consulting-delivery__face--front">
                    <div className="consulting-delivery__frame consulting-delivery__frame--front">
                      <p className="consulting-delivery__eyebrow kicker">{copy("consulting", "deliveryEyebrow")}</p>
                      <p className="consulting-delivery__title">
                        <span className="consulting-delivery__title-line consulting-delivery__title-line--lead">
                          {deliveryTitleLead}
                        </span>
                        {deliveryBrandIndex >= 0 ? (
                          <span className="consulting-delivery__brand">
                            <img
                              className="consulting-delivery__brand-mark"
                              src="/assets/images/logo-mark.png"
                              width={128}
                              height={128}
                              alt=""
                            />
                            <span className="consulting-delivery__brand-name">{deliveryBrandInTitle}</span>
                          </span>
                        ) : null}
                        {deliveryTitleTrail ? (
                          <span className="consulting-delivery__title-line consulting-delivery__title-line--trail">
                            {deliveryTitleTrail}
                          </span>
                        ) : null}
                      </p>
                    </div>
                  </div>
                  <div className="consulting-delivery__face consulting-delivery__face--back" aria-hidden="true">
                    <div className="consulting-delivery__frame consulting-delivery__frame--back">
                      <p className="consulting-delivery__eyebrow kicker consulting-delivery__eyebrow--muted">
                        {copy("consulting", "deliveryEyebrow")}
                      </p>
                      <p className="consulting-delivery__body">{copy("consulting", "deliveryText")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          ) : null}
        </div>

        {lang === "en" && gridLead ? (

          <p className="consulting-gallery__grid-lead">{gridLead}</p>

        ) : null}

        <div className="consulting-gallery__grid" role="list">

          {items.map((entry, index) => {

            const en = enDetail(entry.id);

            const question = lang === "en" && en.cardQuestion ? en.cardQuestion : loc(entry.challenge);

            const service = lang === "en" && en.cardService ? en.cardService : loc(entry.title);

            return (

              <button

                type="button"

                key={entry.id}

                data-service-id={entry.id}

                role="listitem"

                className="consulting-gallery__card"

                aria-haspopup="dialog"

                aria-label={cardLabel(entry, index)}

                ref={(node) => {

                  triggerRefs.current[entry.id] = node;

                }}

                onClick={(e) => openFromCard(entry.id, e.currentTarget)}

              >

                <span className="consulting-gallery__card-num" aria-hidden="true">

                  {String(index + 1).padStart(2, "0")}

                </span>

                <span className="consulting-gallery__card-question">{question}</span>

                <span className="consulting-gallery__card-foot">

                  <span className="consulting-gallery__card-service">{service}</span>

                  <span className="consulting-gallery__card-arrow" aria-hidden="true">

                    <Icon name="arrow" rtl={lang === "ar"} className="consulting-gallery__card-arrow-icon" />

                  </span>

                </span>

              </button>

            );

          })}

        </div>

      </div>



      <dialog

        ref={dialogRef}

        className={`consulting-lightbox${dialogVisible ? " is-visible" : ""}`}

        aria-modal="true"

        aria-labelledby={`${item.id}-lightbox-title`}

        aria-describedby={describedById}

        onClick={onDialogClick}

        onKeyDown={onDialogKeyDown}

      >

        <div className="consulting-lightbox__panel" role="document">

          <header className="consulting-lightbox__header">

            <span className="consulting-lightbox__num" aria-hidden="true">

              {String(activeIndex + 1).padStart(2, "0")}

            </span>

            <button

              type="button"

              ref={closeBtnRef}

              className="consulting-lightbox__close"

              onClick={requestClose}

              aria-label={t("moreClose")}

            >

              <span aria-hidden="true">×</span>

            </button>

          </header>

          <div className="consulting-lightbox__content">

            {isEnDetail ? (

              <>

                <h2 id={`${item.id}-lightbox-title`} className="consulting-lightbox__title">{modalTitle}</h2>

                <GoldRule long />

                <h3 className="consulting-lightbox__question">{detail.detailQuestion}</h3>

                <p id={describedById} className="consulting-lightbox__description">{detail.description}</p>

                <div className="consulting-lightbox__block">

                  <p className="consulting-lightbox__label">{copy("consulting", "detailWhatYouGet")}</p>

                  <ul className="consulting-lightbox__list">

                    {(detail.whatYouGet ?? []).map((line) => (

                      <li key={line}>{line}</li>

                    ))}

                  </ul>

                </div>

                <div className="consulting-lightbox__block consulting-lightbox__block--best">

                  <p className="consulting-lightbox__label">{copy("consulting", "detailBestFor")}</p>

                  <p className="consulting-lightbox__best">{detail.bestFor}</p>

                </div>

                {detail.related ? (

                  <div className="consulting-lightbox__related">

                    <p className="kicker consulting-lightbox__related-kicker">{detail.related.label}</p>

                    <Go href={detail.related.href} label={detail.related.text} />

                  </div>

                ) : null}

              </>

            ) : (

              <>

                <h2 id={`${item.id}-lightbox-title`} className="consulting-lightbox__title">{loc(item.title)}</h2>

                <GoldRule long />

                <p id={describedById} className="consulting-lightbox__challenge">{loc(item.challenge)}</p>

                <p className="consulting-lightbox__body">{loc(item.objective)}</p>

                <div className="consulting-lightbox__details">

                  <p>

                    <span className="kicker">{copy("consulting", "scopeLabel")}</span>

                    {loc(item.scope)}

                  </p>

                  <p>

                    <span className="kicker">{copy("consulting", "roleLabel")}</span>

                    {loc(item.role)}

                  </p>

                </div>

                <p className="consulting-lightbox__out">

                  <span className="kicker">{copy("consulting", "outLabel")}</span>

                  {loc(item.measure)}

                </p>

                <RelatedPath id={item.id} kind="consult" />

              </>

            )}

          </div>

          <div className="consulting-lightbox__nav">

            <button type="button" className="consulting-lightbox__nav-btn consulting-lightbox__nav-btn--prev" onClick={goPrev} aria-label={t("prevPage")}>

              <Icon name="arrow" rtl={lang === "ar"} className="consulting-lightbox__nav-icon consulting-lightbox__nav-icon--prev" />

            </button>

            <div className="consulting-lightbox__pagination">

              <div className="consulting-lightbox__dots" role="tablist" aria-label={t("serviceNav")}>

                {items.map((entry, index) => (

                  <button

                    key={entry.id}

                    type="button"

                    role="tab"

                    className={`consulting-lightbox__dot${index === activeIndex ? " is-active" : ""}`}

                    aria-selected={index === activeIndex}

                    aria-label={`${index + 1} — ${lang === "en" && enDetail(entry.id).cardService ? enDetail(entry.id).cardService! : loc(entry.title)}`}

                    onClick={() => selectService(entry.id)}

                  />

                ))}

              </div>

              <p className="consulting-lightbox__counter" aria-live="polite">

                <span>{activeIndex + 1}</span>

                <span aria-hidden="true"> / </span>

                <span>{total}</span>

              </p>

            </div>

            <button type="button" className="consulting-lightbox__nav-btn consulting-lightbox__nav-btn--next" onClick={goNext} aria-label={t("nextPage")}>

              <Icon name="arrow" rtl={lang === "ar"} className="consulting-lightbox__nav-icon" />

            </button>

          </div>

        </div>

      </dialog>

    </section>

  );

}


