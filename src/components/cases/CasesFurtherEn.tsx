import { Link } from "react-router-dom";
import { useI18n } from "@/context/language";
import { Icon } from "@/components/Icon";
import { EnCaseStudyArt } from "@/components/cases/EnCaseStudyArt";
import { enStudyField, getEnCaseStudy } from "@/lib/cases-en-study";
import { toRoute } from "@/lib/routes";

type CaseItem = {
  id: string;
  sector: string | null;
};

type Props = {
  items: CaseItem[];
};

export function CasesFurtherEn({ items }: Props) {
  const { lang } = useI18n();

  return (
    <div className="cases-further-en">
      <ol className="cases-further-en__list editorial-list">
        {items.map((item, i) => {
          const study = getEnCaseStudy(item.id);
          const context = study ? enStudyField(item.id, "context") : "";
          const title = study ? enStudyField(item.id, "previewTitle") : "";
          const preview = study ? enStudyField(item.id, "previewDescription") : "";
          const proof = study?.proofHighlight?.en ?? "";
          const image = study?.image?.en;
          const hasMedia = Boolean(image?.src);

          return (
            <li key={item.id}>
              <Link
                className={`cases-further-en__row editorial-row${
                  hasMedia ? " cases-further-en__row--has-media" : ""
                }${image?.mediaFrame === "landscape" ? " cases-further-en__row--landscape" : ""}`}
                to={toRoute(`case.html?id=${item.id}`, lang)}
              >
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span className="cases-further-en__body editorial-row__body">
                  {context ? <span className="kicker">{context}</span> : null}
                  {title ? <h3 className="cases-further-en__title">{title}</h3> : null}
                  {preview ? <span className="cases-further-en__preview">{preview}</span> : null}
                  {proof ? <span className="cases-further-en__proof editorial-row__out">{proof}</span> : null}
                </span>
                {hasMedia && image ? (
                  <span className="cases-further-en__media">
                    <EnCaseStudyArt
                      image={image}
                      variant="preview"
                      className={`cases-further-en__art en-case-study-art cases-further-en__art--${item.id}`}
                    />
                  </span>
                ) : null}
                <Icon name="arrow" rtl={false} />
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
