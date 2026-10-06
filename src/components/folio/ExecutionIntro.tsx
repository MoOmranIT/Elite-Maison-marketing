import { useI18n } from "@/context/language";

/** First-word lead typography; full `title` string stays the accessible heading text. */
function DefinitionTitle({ title }: { title: string }) {
  const space = title.indexOf(" ");
  if (space <= 0) {
    return <h2 className="execution-definition__title">{title}</h2>;
  }
  const lead = title.slice(0, space);
  const rest = title.slice(space);
  return (
    <h2 className="execution-definition__title">
      <span className="execution-definition__title-lead">{lead}</span>
      <span className="execution-definition__title-rest">{rest}</span>
    </h2>
  );
}

/** EN-only dual editorial field below the Execution hero. */
export function ExecutionDefinition() {
  const { copy } = useI18n();
  return (
    <section className="execution-definition" aria-label="Marketing execution defined">
      <div className="shell">
        <div className="execution-definition__frame" data-reveal="clip">
          <div className="execution-definition__grid">
            <article className="execution-definition__item">
              <DefinitionTitle title={copy("execution", "definitionTitle")} />
              <p className="execution-definition__body">{copy("execution", "definitionText")}</p>
            </article>
            <div className="execution-definition__divider" aria-hidden="true" />
            <article className="execution-definition__item execution-definition__item--contrast">
              <DefinitionTitle title={copy("execution", "differenceTitle")} />
              <p className="execution-definition__body">{copy("execution", "differenceText")}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

/** EN-only compact chapter opener before execution service modules. */
export function ExecutionServicesIntro() {
  const { copy } = useI18n();
  return (
    <section className="execution-services-intro" aria-labelledby="execution-services-intro-title">
      <div className="shell execution-services-intro__inner">
        <div className="execution-services-intro__copy">
          <h2 className="execution-services-intro__title" id="execution-services-intro-title">
            {copy("execution", "servicesIntroTitle")}
          </h2>
          <span className="execution-services-intro__rule" aria-hidden="true" />
          <p className="execution-services-intro__body">{copy("execution", "servicesIntroText")}</p>
        </div>
        <div className="execution-services-intro__accent" aria-hidden="true" />
      </div>
    </section>
  );
}
