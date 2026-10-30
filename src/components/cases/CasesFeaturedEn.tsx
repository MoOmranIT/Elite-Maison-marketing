import { useI18n } from "@/context/language";
import { Go } from "@/components/ui-kit";
import { featuredCase } from "@/lib/em";
import { LePatchouliCaseArt, lePatchouliImageSizes } from "@/components/cases/LePatchouliCaseArt";

export function CasesFeaturedEn() {
  const { t, copy } = useI18n();
  const featured = featuredCase();

  return (
    <div className="case-feature-en case-feature-en--preview">
      <div className="case-feature-en__lead">
        <p className="case-feature-en__eyebrow">{copy("casesFeatured", "eyebrow")}</p>
        <h2 className="case-feature-en__title">{copy("casesFeatured", "title")}</h2>
        <p className="case-feature-en__preview">{copy("casesFeatured", "preview")}</p>
      </div>
      <LePatchouliCaseArt
        className="case-feature-en__visual le-patchouli-art"
        sizes={lePatchouliImageSizes("preview")}
        loading="eager"
        fetchPriority="high"
      />
      <div className="case-feature-en__actions">
        <Go href={`case.html?id=${featured.id}`} label={t("viewCase")} />
      </div>
    </div>
  );
}
