import { useI18n } from "@/context/language";

/** First-word lead typography; full `title` string stays the accessible heading text. */
function DefinitionTitle({ title }: { title: string }) {
  const space = title.indexOf(" ");
  if (space <= 0) {
    return <h2 className="sectors-definition__title">{title}</h2>;
  }
  const lead = title.slice(0, space);
  const rest = title.slice(space);
  return (
    <h2 className="sectors-definition__title">
      <span className="sectors-definition__title-lead">{lead}</span>
      <span className="sectors-definition__title-rest">{rest}</span>
    </h2>
  );
}

/** EN-only dual editorial field below the Sectors hero. */
export function SectorsDefinition() {
  const { copy } = useI18n();
  return (
    <section className="sectors-definition" aria-label="Sector experience defined">
      <div className="shell">
        <div className="sectors-definition__frame" data-reveal="clip">
          <div className="sectors-definition__grid">
            <article className="sectors-definition__item">
              <p className="sectors-definition__eyebrow">
                {copy("sectors", "meaningEyebrow")}
                <span className="sectors-definition__eyebrow-rule" aria-hidden="true" />
              </p>
              <DefinitionTitle title={copy("sectors", "meaningTitle")} />
              <p className="sectors-definition__body">{copy("sectors", "meaningText")}</p>
            </article>
            <div className="sectors-definition__divider" aria-hidden="true" />
            <article className="sectors-definition__item sectors-definition__item--contrast">
              <p className="sectors-definition__eyebrow">
                {copy("sectors", "selectedEyebrow")}
                <span className="sectors-definition__eyebrow-rule" aria-hidden="true" />
              </p>
              <DefinitionTitle title={copy("sectors", "selectedTitle")} />
              <p className="sectors-definition__body">{copy("sectors", "selectedText")}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
