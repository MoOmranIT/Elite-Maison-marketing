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
import { Go, GoldRule } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";

export type ExecutionServiceItem = {
  id: string;
  title: { ar: string; en: string };
  objective: { ar: string; en: string };
  scope: { ar: string; en: string };
  impact: { ar: string; en: string };
  metrics: { ar: string; en: string };
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

function enGallery(id: string) {
  return (EM.EXECUTION_EN_GALLERY as Record<string, { cardGoal: string; cardService: string }>)[id] ?? {};
}

type ExecutionEnDetail = {
  detailTitle: string;
  detailQuestion: string;
  description: string;
  whatYouGet: string[];
  successMetrics: string;
  bestFor: string;
  related: { label: string; text: string; href: string };
};

function enDetail(id: string): Partial<ExecutionEnDetail> {
  return (EM.EXECUTION_EN_DETAIL as Record<string, Partial<ExecutionEnDetail>>)[id] ?? {};
}

type Props = {
  items: ExecutionServiceItem[];
  activeId: string;
  onSelect: (id: string) => void;
  serviceIds: string[];
  gridLead: string;
};

export function ExecutionCasesLightbox({ items, activeId, onSelect, serviceIds, gridLead }: Props) {
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

  const activeIndex = Math.max(0, items.findIndex((item) => item.id === viewId));
  const total = items.length;
  const item = items[activeIndex] ?? items[0];
  const detail = enDetail(item.id) as ExecutionEnDetail;
  const modalTitle = detail.detailTitle ?? loc(item.title);
  const describedById = `${item.id}-lightbox-description`;

  const cardLabel = (entry: ExecutionServiceItem) => {
    const en = enGallery(entry.id);
    if (en.cardGoal && en.cardService) return `${en.cardGoal} — ${en.cardService}`;
    return loc(entry.title);
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
      if (!dialog.open) dialog.showModal();
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
    if (prefersReducedMotion()) finishClose();
    else closeTimerRef.current = window.setTimeout(finishClose, ANIM_MS);
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

  return (
    <section className="section section--veiled section--geom consulting-gallery execution-gallery">
      <div className="shell">
        {gridLead ? <p className="consulting-gallery__grid-lead">{gridLead}</p> : null}
        <div className="consulting-gallery__grid" role="list">
          {items.map((entry, index) => {
            const en = enGallery(entry.id);
            const goal = en.cardGoal ?? loc(entry.objective);
            const service = en.cardService ?? loc(entry.title);
            return (
              <button
                type="button"
                key={entry.id}
                data-service-id={entry.id}
                role="listitem"
                className="consulting-gallery__card"
                aria-haspopup="dialog"
                aria-label={cardLabel(entry)}
                ref={(node) => {
                  triggerRefs.current[entry.id] = node;
                }}
                onClick={(e) => openFromCard(entry.id, e.currentTarget)}
              >
                <span className="consulting-gallery__card-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="consulting-gallery__card-question">{goal}</span>
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
            <h2 id={`${item.id}-lightbox-title`} className="consulting-lightbox__title">{modalTitle}</h2>
            <GoldRule long />
            <h3 className="consulting-lightbox__question">{detail.detailQuestion}</h3>
            <p id={describedById} className="consulting-lightbox__description">{detail.description}</p>
            <div className="consulting-lightbox__block">
              <p className="consulting-lightbox__label">{copy("execution", "detailWhatYouGet")}</p>
              <ul className="consulting-lightbox__list">
                {(detail.whatYouGet ?? []).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="consulting-lightbox__block">
              <p className="consulting-lightbox__label">{copy("execution", "detailSuccessMetrics")}</p>
              <p className="consulting-lightbox__best">{detail.successMetrics}</p>
            </div>
            <div className="consulting-lightbox__block consulting-lightbox__block--best">
              <p className="consulting-lightbox__label">{copy("execution", "detailBestFor")}</p>
              <p className="consulting-lightbox__best">{detail.bestFor}</p>
            </div>
            {detail.related ? (
              <div className="consulting-lightbox__related">
                <p className="kicker consulting-lightbox__related-kicker">{copy("execution", "detailRelatedConsulting")}</p>
                <Go href={detail.related.href} label={detail.related.text} />
              </div>
            ) : null}
          </div>
          <div className="consulting-lightbox__nav">
            <button
              type="button"
              className="consulting-lightbox__nav-btn consulting-lightbox__nav-btn--prev"
              onClick={goPrev}
              aria-label={t("prevPage")}
            >
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
                    aria-label={`${index + 1} — ${enGallery(entry.id).cardService ?? loc(entry.title)}`}
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
            <button
              type="button"
              className="consulting-lightbox__nav-btn consulting-lightbox__nav-btn--next"
              onClick={goNext}
              aria-label={t("nextPage")}
            >
              <Icon name="arrow" rtl={lang === "ar"} className="consulting-lightbox__nav-icon" />
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
