import { useEffect, useState } from "react";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, Frame, PageHero } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { CardSwipe } from "@/components/ui/card-swipe";
import { capabilityLabel, caseName } from "@/lib/em";

const CONSULT_ICONS: Record<string, string> = {
  growth: "direction",
  sales: "revenue",
  expansion: "expansion",
  product: "execute",
  franchise: "sector",
  "private-label": "proof",
  journey: "insight",
  executive: "consult"
};

function Related({ id, kind }: { id: string; kind: "consult" | "exec" }) {
  const { t, loc } = useI18n();
  const cases = ((EM.CASE_LINKS && EM.CASE_LINKS[id]) || [])
    .map((cid: string) => EM.CASES.find((c: { id: string }) => c.id === cid))
    .filter(Boolean);
  const path = EM.RELATED_PATHS && EM.RELATED_PATHS[id];
  if (!path && !cases.length) return null;
  return (
    <div className="related">
      {path ? (
        <Frame
          href={path}
          iconName={kind === "consult" ? "execute" : "consult"}
          title={`${kind === "consult" ? t("relatedExecution") : t("relatedConsulting")}: ${capabilityLabel(path, loc, t("relatedCapabilities"))}`}
        />
      ) : null}
      {cases.map((item: { id: string; publicName: { ar: string; en: string } }) => (
        <Frame key={item.id} href={`case.html?id=${item.id}`} iconName="proof" title={`${t("relatedCase")}: ${caseName(item, loc)}`} />
      ))}
    </div>
  );
}

export function ConsultingPage() {
  const { t, loc, copy, lang } = useI18n();
  const [openId, setOpenId] = useState(() => window.location.hash.slice(1) || EM.CONSULTING[0].id);
  const list = EM.CONSULTING as { id: string; title: { ar: string; en: string }; challenge: { ar: string; en: string } }[];
  const index = Math.max(0, list.findIndex((item) => item.id === openId));
  const current = list[index] || list[0];

  function select(id: string) {
    setOpenId(id);
    history.replaceState({}, "", `#${id}`);
  }

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && list.some((item) => item.id === hash)) setOpenId(hash);
  }, [lang]);

  return (
    <>
      <PageHero iconName="consult" variant="system" kicker={copy("consulting", "eyebrow")} title={copy("consulting", "title")} lead={copy("consulting", "lead")} />
      <section className="section section--tight">
        <div className="shell">
          <p className="kicker">{copy("consulting", "flowLabel")}</p>
          <hr className="gold-rule" />
          <div className="flow">
            {EM.CONSULTING_FLOW.map((step: { ar: string; en: string }, i: number) => (
              <article key={i}>
                <span className="icon-well icon-well--sm"><Icon name="consult" /></span>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{loc(step)}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell split">
          <nav className="index" aria-label={t("serviceNav")}>
            {list.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={item.id === current.id ? "is-active" : ""}
                aria-current={item.id === current.id ? "true" : undefined}
                onClick={(ev) => {
                  ev.preventDefault();
                  select(item.id);
                }}
              >
                <span className="icon-well icon-well--sm"><Icon name={CONSULT_ICONS[item.id] || "consult"} /></span>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span>{loc(item.title)}</span>
              </a>
            ))}
          </nav>
          <div>
            <CardSwipe
              items={list.map((item, i) => ({
                id: item.id,
                kicker: String(i + 1).padStart(2, "0"),
                title: loc(item.title),
                description: loc(item.challenge),
                iconName: CONSULT_ICONS[item.id] || "consult"
              }))}
              index={index}
              onIndexChange={(i) => select(list[i].id)}
              ctaLabel={t("bookCta")}
              ctaHref="/contact"
              rtl={lang === "ar"}
              dotsLabel={t("serviceNav")}
            />
            <div id={current.id} className="block" style={{ border: 0, paddingTop: "1.5rem" }}>
              <Related id={current.id} kind="consult" />
            </div>
          </div>
        </div>
      </section>
      <CtaBand title={copy("consulting", "ctaTitle")} href="/execution" label={t("exploreExecution")} />
    </>
  );
}

export { Related };
