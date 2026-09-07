import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { Go } from "@/components/ui-kit";
import { capabilityLabel, caseName } from "@/lib/em";

export function RelatedPath({
  id,
  kind
}: {
  id: string;
  kind: "consult" | "exec" | "sector" | "case" | "insight";
}) {
  const { t, loc } = useI18n();
  const cases = ((EM.CASE_LINKS && EM.CASE_LINKS[id]) || [])
    .map((cid: string) => EM.CASES.find((c: { id: string }) => c.id === cid))
    .filter(Boolean);
  const path = kind === "sector" || kind === "case" || kind === "insight"
    ? null
    : EM.RELATED_PATHS && EM.RELATED_PATHS[id];
  const sectorCaps = kind === "sector"
    ? (EM.SECTORS.find((s: { id: string }) => s.id === id)?.capabilities || []).slice(0, 2)
    : [];
  const caseCaps = kind === "case"
    ? (EM.CASES.find((c: { id: string }) => c.id === id)?.related || []).slice(0, 2)
    : [];
  const insight = kind === "insight"
    ? EM.INSIGHTS.find((item: { id: string }) => item.id === id)
    : null;
  const insightCase = insight?.relatedCase
    ? EM.CASES.find((c: { id: string }) => c.id === insight.relatedCase)
    : null;

  if (!path && !cases.length && !sectorCaps.length && !caseCaps.length && !insight?.cta && !insightCase) {
    return null;
  }

  return (
    <div className="next-steps">
      {path ? (
        <Go
          href={path}
          label={`${kind === "consult" ? t("relatedExecution") : t("relatedConsulting")}: ${capabilityLabel(path, loc, t("relatedCapabilities"))}`}
        />
      ) : null}
      {sectorCaps.map((href: string) => (
        <Go
          key={href}
          href={href}
          label={capabilityLabel(href, loc, t("relatedCapabilities"))}
        />
      ))}
      {caseCaps.map((href: string) => (
        <Go
          key={href}
          href={href}
          label={capabilityLabel(href, loc, t("relatedCapabilities"))}
        />
      ))}
      {insight?.cta ? (
        <Go
          href={insight.cta}
          label={`${String(insight.cta).includes("execution") ? t("relatedExecution") : t("relatedConsulting")}: ${capabilityLabel(insight.cta, loc, t("relatedCapabilities"))}`}
        />
      ) : null}
      {insightCase ? (
        <Go
          href={`case.html?id=${insightCase.id}`}
          label={`${t("relatedCase")}: ${caseName(insightCase, loc)}`}
        />
      ) : null}
      {kind !== "insight" && kind !== "case"
        ? cases.slice(0, 1).map((item: { id: string; publicName?: { ar: string; en: string }; anonymousName?: { ar: string; en: string } }) => (
          <Go
            key={item.id}
            href={`case.html?id=${item.id}`}
            label={`${t("relatedCase")}: ${caseName(item, loc)}`}
          />
        ))
        : null}
    </div>
  );
}
