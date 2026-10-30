import type { InsightArticleSectionEn } from "@/components/insights/InsightArticleEn";
import { insightSectionDomId, insightSubsectionDomId } from "@/lib/insight-section-id";

function PlainList({ bullets, className }: { bullets: string[]; className?: string }) {
  return (
    <ul className={className ?? "insight-article-en__list"}>
      {bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
    </ul>
  );
}

function StepSequence({ bullets }: { bullets: string[] }) {
  return (
    <ol className="insight-article-en__sequence insight-article-en__sequence--steps">
      {bullets.map((bullet, index) => (
        <li key={bullet}>
          <span className="insight-article-en__sequence-marker" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="insight-article-en__sequence-copy">{bullet}</span>
        </li>
      ))}
    </ol>
  );
}

function ReadinessMatrix({ bullets }: { bullets: string[] }) {
  return (
    <ul className="insight-article-en__matrix">
      {bullets.map((bullet, index) => (
        <li key={bullet}>
          <span className="insight-article-en__matrix-num" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

function DiagnosticPath({ steps }: { steps: string[] }) {
  return (
    <ol className="insight-article-en__path">
      {steps.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ol>
  );
}

function WorkflowList({ bullets, followUp }: { bullets: string[]; followUp?: string }) {
  return (
    <>
      <ol className="insight-article-en__workflow">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ol>
      {followUp ? <p>{followUp}</p> : null}
    </>
  );
}

function SectionContent({
  articleId,
  sectionIndex,
  section
}: {
  articleId: string;
  sectionIndex: number;
  section: InsightArticleSectionEn;
}) {
  const bullets = section.bullets ?? [];

  if (articleId === "growth-guide" && sectionIndex === 1 && bullets.length) {
    return <StepSequence bullets={bullets} />;
  }

  if (articleId === "sales-article" && sectionIndex === 0 && bullets.length) {
    return <DiagnosticPath steps={bullets} />;
  }
  if (articleId === "sales-article" && sectionIndex === 1 && bullets.length) {
    return <DiagnosticPath steps={bullets} />;
  }

  if (articleId === "expansion-brief" && sectionIndex === 1 && bullets.length) {
    return <ReadinessMatrix bullets={bullets} />;
  }

  if (articleId === "ai-insight" && sectionIndex === 1 && bullets.length) {
    return <WorkflowList bullets={bullets} followUp={section.paragraphs?.[0]} />;
  }

  return (
    <>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {bullets.length ? (
        <PlainList
          bullets={bullets}
          className={
            articleId === "growth-guide" || articleId === "sales-article" || articleId === "expansion-brief"
              ? "insight-article-en__list insight-article-en__list--check"
              : "insight-article-en__list"
          }
        />
      ) : null}
    </>
  );
}

export function InsightArticleBody({
  articleId,
  sections,
  numbered
}: {
  articleId: string;
  sections: InsightArticleSectionEn[];
  numbered?: boolean;
}) {
  if (numbered) {
    return (
      <ol className="insight-article-en__signs insight-article-en__signs--progression">
        {sections.map((section, sectionIndex) => (
          <li key={section.heading} id={insightSectionDomId(articleId, sectionIndex)}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div className="insight-article-en__sections">
      {sections.map((section, sectionIndex) => (
        <section
          className="insight-article-en__section"
          id={insightSectionDomId(articleId, sectionIndex)}
          key={section.heading}
        >
          <h2>{section.heading}</h2>
          {articleId === "gcc-market-entry-readiness" && section.subsections?.length ? (
            <nav className="insight-article-en__question-overview" aria-label="Four questions in this section">
              <ul>
                {section.subsections.map((subsection, subIndex) => (
                  <li key={subsection.heading}>
                    <a href={`#${insightSubsectionDomId(articleId, sectionIndex, subIndex)}`}>
                      {subsection.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          <SectionContent articleId={articleId} sectionIndex={sectionIndex} section={section} />
          {section.subsections?.map((subsection, subIndex) => (
            <div
              className="insight-article-en__subsection"
              id={insightSubsectionDomId(articleId, sectionIndex, subIndex)}
              key={subsection.heading}
            >
              <h3>{subsection.heading}</h3>
              {subsection.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
