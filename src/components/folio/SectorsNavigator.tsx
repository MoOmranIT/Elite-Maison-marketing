import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { EM } from "@/data/em.js";

import { useI18n } from "@/context/language";

import { Icon } from "@/components/Icon";

import { GoldRule } from "@/components/ui-kit";

import { useCompact } from "@/hooks/useHashSelect";

import { toRoute } from "@/lib/routes";

const SECTOR_IDS = (EM.SECTORS as { id: string }[]).map((item) => item.id);

const LOGO_MARK = "/assets/images/logo-mark.png";

type SectorItem = {
  id: string;
  title: { ar: string; en: string };
};

type NavigatorMeta = {
  navigatorQuestion: string;
};

type RelatedLink = { text: string; href: string };

type EnSectorDetail = {
  title: string;
  detailQuestion: string;
  lead: string;
  context: string;
  focusLabel: string;
  focus: string;
  journeyLabel: string;
  journey: string;
  relatedServicesLabel: string;
  relatedServices: RelatedLink[];
  relatedInsightLabel?: string;
  relatedInsight?: RelatedLink;
};

function safeHash(hash: string) {
  const raw = hash.replace(/^#/, "");
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function navigatorMeta(id: string): NavigatorMeta {
  const map = EM.SECTORS_EN_NAVIGATOR as Record<string, NavigatorMeta>;
  return map[id] ?? { navigatorQuestion: "" };
}

function sectorDetail(id: string): EnSectorDetail | null {
  const map = EM.SECTORS_EN_DETAIL as Record<string, EnSectorDetail>;
  return map[id] ?? null;
}

function sectorById(list: SectorItem[], id: string | null) {
  if (!id) return null;
  return list.find((item) => item.id === id) ?? null;
}

function SectorDetailBody({
  sectorId,
  index,
  lang
}: {
  sectorId: string;
  index: number;
  lang: "ar" | "en";
}) {
  const detail = sectorDetail(sectorId);
  if (!detail) return null;

  return (
    <div className="sectors-navigator__detail-inner" key={sectorId}>
      <p className="sectors-navigator__detail-num">{String(index + 1).padStart(2, "0")}</p>

      <h2 className="sectors-navigator__detail-title" id="sectors-navigator-detail-title">
        {detail.title}
      </h2>

      <h3 className="sectors-navigator__detail-question">{detail.detailQuestion}</h3>

      <GoldRule long />

      <p className="sectors-navigator__lead">{detail.lead}</p>

      <p className="sectors-navigator__context">{detail.context}</p>

      <div className="sectors-navigator__facts">
        <div className="sectors-navigator__fact">
          <p className="sectors-navigator__fact-label">{detail.focusLabel}</p>
          <p className="sectors-navigator__fact-body">{detail.focus}</p>
        </div>
        <div className="sectors-navigator__fact">
          <p className="sectors-navigator__fact-label">{detail.journeyLabel}</p>
          <p className="sectors-navigator__fact-body">{detail.journey}</p>
        </div>
      </div>

      <div className="sectors-navigator__related">
        <p className="sectors-navigator__related-label">{detail.relatedServicesLabel}</p>
        <ul className="sectors-navigator__related-list">
          {detail.relatedServices.map((item) => (
            <li key={item.href}>
              <Link className="sectors-navigator__related-link" to={toRoute(item.href, lang)}>
                <span>{item.text}</span>
                <Icon name="arrow" className="sectors-navigator__related-link-icon" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {detail.relatedInsight ? (
        <div className="sectors-navigator__insight">
          <p className="sectors-navigator__insight-label">{detail.relatedInsightLabel}</p>
          <Link className="sectors-navigator__insight-link" to={toRoute(detail.relatedInsight.href, lang)}>
            <span>{detail.relatedInsight.text}</span>
            <Icon name="arrow" className="sectors-navigator__insight-link-icon" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

/** EN-only interactive sector index + detail stage. */
export function SectorsNavigator() {
  const { t, loc, lang } = useI18n();

  const list = EM.SECTORS as SectorItem[];

  const ids = useMemo(() => SECTOR_IDS, []);

  const location = useLocation();

  const navigate = useNavigate();

  const compact = useCompact("(max-width: 768px)");

  const stageRef = useRef<HTMLElement>(null);

  const [committedId, setCommittedId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;

    const hash = safeHash(window.location.hash);

    return ids.includes(hash) ? hash : null;
  });

  const [previewId, setPreviewId] = useState<string | null>(null);

  const [canHoverPreview, setCanHoverPreview] = useState(false);

  useEffect(() => {
    const hash = safeHash(location.hash);

    setCommittedId(ids.includes(hash) ? hash : null);
  }, [location.hash, ids]);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");

    const sync = () => setCanHoverPreview(mq.matches);

    sync();

    mq.addEventListener("change", sync);

    return () => mq.removeEventListener("change", sync);
  }, []);

  const displayId = previewId ?? committedId;

  const displayItem = sectorById(list, displayId);

  const displayIndex = displayItem ? list.findIndex((item) => item.id === displayItem.id) : -1;

  const isIdle = displayId === null;

  useEffect(() => {
    if (!displayId) return;

    const root = stageRef.current;

    root?.classList.add("is-visible");

    root?.querySelectorAll(".gold-rule").forEach((node) => node.classList.add("is-draw"));
  }, [displayId]);

  const commit = useCallback(
    (id: string) => {
      setPreviewId(null);

      setCommittedId(id);

      navigate(
        {
          pathname: location.pathname,
          search: location.search,
          hash: `#${id}`
        },
        { replace: true }
      );
    },
    [location.pathname, location.search, navigate]
  );

  function handleCommit(id: string) {
    commit(id);

    if (compact) {
      requestAnimationFrame(() => {
        stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function handleRowPointerEnter(id: string) {
    if (!canHoverPreview) return;
    setPreviewId(id);
  }

  function handleRowFocus(id: string) {
    setPreviewId(id);
  }

  function clearPreview() {
    setPreviewId(null);
  }

  function handleNavPointerLeave() {
    if (canHoverPreview) clearPreview();
  }

  function handleNavFocusOut(event: React.FocusEvent<HTMLElement>) {
    const next = event.relatedTarget;

    if (next instanceof Node && event.currentTarget.contains(next)) return;

    clearPreview();
  }

  return (
    <div className="sectors-navigator">
      <nav
        className="sectors-navigator__index"
        aria-label={t("sectorNav")}
        onMouseLeave={handleNavPointerLeave}
        onBlurCapture={handleNavFocusOut}
      >
        <ul className="sectors-navigator__list">
          {list.map((item, index) => {
            const isCommitted = item.id === committedId;

            const isPreview = item.id === previewId && item.id !== committedId;

            const rowQuestion = navigatorMeta(item.id).navigatorQuestion;

            return (
              <li key={item.id} className="sectors-navigator__item">
                <button
                  type="button"
                  className={[
                    "sectors-navigator__row",
                    isCommitted ? " is-active" : "",
                    isPreview ? " is-preview" : ""
                  ].join("")}
                  onClick={() => handleCommit(item.id)}
                  onMouseEnter={() => handleRowPointerEnter(item.id)}
                  onFocus={() => handleRowFocus(item.id)}
                  aria-pressed={isCommitted}
                >
                  <span className="sectors-navigator__num">{String(index + 1).padStart(2, "0")}</span>

                  <span className="sectors-navigator__copy">
                    <span className="sectors-navigator__name">{loc(item.title)}</span>
                    <span className="sectors-navigator__question">{rowQuestion}</span>
                  </span>

                  <span className="sectors-navigator__trail" aria-hidden="true">
                    {isCommitted ? (
                      <Icon name="check" className="sectors-navigator__committed-mark" />
                    ) : (
                      <span className="sectors-navigator__arrow">→</span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <article
        ref={stageRef}
        className={["sectors-navigator__stage", isIdle ? " is-idle" : " is-revealed"].join("")}
        data-motif={displayId ?? undefined}
        aria-labelledby={isIdle ? undefined : "sectors-navigator-detail-title"}
      >
        <div className="sectors-navigator__brand-state" aria-hidden="true">
          <div className="sectors-navigator__medallion">
            <span className="sectors-navigator__medallion-ring" aria-hidden="true" />

            <span className="sectors-navigator__medallion-orbit" aria-hidden="true" />

            <img className="sectors-navigator__medallion-mark" src={LOGO_MARK} width={72} height={72} alt="" />
          </div>

          <p className="sectors-navigator__brand-wordmark">Elite Maison</p>
          <p className="sectors-navigator__brand-hint">Hover to preview. Click to keep a sector open.</p>
        </div>

        <div className="sectors-navigator__detail-surface" aria-hidden={isIdle}>
          {displayId && displayIndex >= 0 ? (
            <SectorDetailBody sectorId={displayId} index={displayIndex} lang={lang} />
          ) : null}
        </div>
      </article>
    </div>
  );
}
