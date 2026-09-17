import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { Go } from "@/components/ui-kit";
import { capabilityLabel } from "@/lib/em";

export function RelatedPath({
  id,
  kind
}: {
  id: string;
  kind: "consult" | "exec" | "sector" | "case" | "insight";
}) {
  const { t, loc } = useI18n();
  const path = kind === "consult" || kind === "exec"
    ? EM.CONTEXTUAL_PATHS && EM.CONTEXTUAL_PATHS[id]
    : null;
  const sectorCaps = kind === "sector"
    ? (EM.SECTORS.find((s: { id: string }) => s.id === id)?.capabilities || [])
    : [];
  const caseCaps = kind === "case"
    ? (EM.CASES.find((c: { id: string }) => c.id === id)?.related || [])
    : [];
  const insight = kind === "insight"
    ? EM.INSIGHTS.find((item: { id: string }) => item.id === id)
    : null;
  const caseSector = kind === "case"
    ? EM.SECTORS.find((sector: { id: string }) => sector.id === EM.CASES.find((item: { id: string }) => item.id === id)?.sector)
    : null;

  if (!path && !sectorCaps.length && !caseCaps.length && !insight?.cta && !caseSector) {
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
      {caseSector ? (
        <Go href={`sectors.html#${caseSector.id}`} label={`${t("relatedSector")}: ${loc(caseSector.title)}`} />
      ) : null}
    </div>
  );
}
