import { useState } from "react";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, Frame, PageHero } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { capabilityLabel, caseName } from "@/lib/em";

export function SectorsPage() {
  const { t, loc, copy, lang } = useI18n();
  const [id, setId] = useState(() => {
    const hash = window.location.hash.slice(1);
    return EM.SECTORS.some((s: { id: string }) => s.id === hash) ? hash : EM.SECTORS[0].id;
  });
  const current = EM.SECTORS.find((s: { id: string }) => s.id === id) || EM.SECTORS[0];
  return (
    <>
      <PageHero iconName="sector" variant="system" kicker={copy("sectors", "eyebrow")} title={copy("sectors", "title")} lead={copy("sectors", "lead")} />
      <section className="section">
        <div className="shell split">
          <nav className="index" aria-label={t("sectorNav")}>
            {EM.SECTORS.map((item: { id: string; title: { ar: string; en: string } }, i: number) => (
              <button
                type="button"
                key={item.id}
                className={item.id === current.id ? "is-active" : ""}
                aria-current={item.id === current.id ? "true" : undefined}
                onClick={() => {
                  setId(item.id);
                  history.replaceState({}, "", `#${item.id}`);
                }}
              >
                <span className="icon-well icon-well--sm"><Icon name="sector" /></span>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span>{loc(item.title)}</span>
              </button>
            ))}
          </nav>
          <div>
            <h2>{loc(current.title)}</h2>
            <div className="stack" style={{ marginTop: "1.5rem" }}>
              {[
                { label: t("context"), value: current.context, icon: "sector" },
                { label: lang === "ar" ? "تحديات شائعة" : "Common challenges", value: current.challenges, icon: "direction" },
                { label: lang === "ar" ? "أولويات تجارية" : "Commercial priorities", value: current.priorities, icon: "revenue" }
              ].map((row) => (
                <article className="frame" key={row.label}>
                  <span className="icon-well"><Icon name={row.icon} /></span>
                  <span><h3>{row.label}</h3><p>{loc(row.value)}</p></span>
                </article>
              ))}
            </div>
            <div className="related">
              {current.capabilities.map((href: string) => (
                <Frame key={href} href={href} iconName={href.includes("execution") ? "execute" : "consult"} title={capabilityLabel(href, loc, t("relatedCapabilities"))} />
              ))}
              {((EM.CASE_LINKS[current.id] || []) as string[]).map((cid) => {
                const c = EM.CASES.find((x: { id: string }) => x.id === cid);
                return c ? <Frame key={cid} href={`case.html?id=${c.id}`} iconName="proof" title={caseName(c, loc)} /> : null;
              })}
            </div>
          </div>
        </div>
      </section>
      <CtaBand title={copy("sectors", "ctaTitle")} href="/cases" label={t("exploreCases")} />
    </>
  );
}
