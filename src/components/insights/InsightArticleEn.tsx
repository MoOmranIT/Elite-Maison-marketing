import { Link } from "react-router-dom";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, Crumbs, Go, GoldRule } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { RelatedPath } from "@/components/folio/RelatedPath";
import { caseName } from "@/lib/em";
import { toRoute } from "@/lib/routes";

export type InsightArticleSectionEn = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: {
    heading: string;
    paragraphs?: string[];
  }[];
};

export type InsightArticleEn = {
  h1: string;
  quickAnswer?: string;
  deck?: string;
  introParagraphs?: string[];
  numbered?: boolean;
  sections: InsightArticleSectionEn[];
  closingParagraphs?: string[];
  supportingLinks?: { href: string; label: string }[];
  faq: { question: string; answer: string }[];
};

type InsightItemEn = {
  id: string;
  topic: { ar: string; en: string };
  format: { ar: string; en: string };
  title: { ar: string; en: string };
  relatedCase?: string;
};

function SectionBody({ section }: { section: InsightArticleSectionEn }) {
  return (
    <>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.bullets?.length ? (
        <ul>
          {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      ) : null}
      {section.subsections?.map((subsection) => (
        <div className="insight-article-en__subsection" key={subsection.heading}>
          <h3>{subsection.heading}</h3>
          {subsection.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      ))}
    </>
  );
}

export function InsightArticleEnView({
  item,
  article
}: {
  item: InsightItemEn;
  article: InsightArticleEn;
}) {
  const { t, loc, copy, lang } = useI18n();
  const quickAnswerId = `${item.id}-quick-answer`;
  const sections = article.numbered ? (
    <ol className="insight-article-en__signs">
      {article.sections.map((section) => (
        <li key={section.heading}>
          <div className="insight-article-en__section-heading">
            <h2>{section.heading}</h2>
          </div>
          <GoldRule />
          <SectionBody section={section} />
        </li>
      ))}
    </ol>
  ) : (
    <div className="insight-article-en__sections">
      {article.sections.map((section) => (
        <section className="insight-article-en__section" key={section.heading}>
          <div className="insight-article-en__section-heading">
            <h2>{section.heading}</h2>
          </div>
          <GoldRule />
          <SectionBody section={section} />
        </section>
      ))}
    </div>
  );

  return (
    <article className="insight-article-en">
      <Crumbs items={[
        { href: "/", label: t("homeCrumb"), icon: "home" },
        { href: "/insights", label: loc({ ar: "الرؤى", en: "Insights" }), icon: "insight" },
        { label: article.h1 }
      ]} />

      <header className="insight-article-en__masthead">
        <div className="shell insight-article-en__masthead-grid">
          <div className="insight-article-en__masthead-meta">
            <p className="kicker kicker-row">
              <span className="icon-well icon-well--sm"><Icon name="insight" /></span>
              {loc(item.topic)} · {loc(item.format)}
            </p>
            <GoldRule long />
          </div>
          <div className="insight-article-en__masthead-copy">
            <h1>{article.h1}</h1>
            {article.deck ? <p className="insight-article-en__deck">{article.deck}</p> : null}
            <p className="insight-attribution">By Elite Maison</p>
          </div>
        </div>
      </header>

      {article.quickAnswer ? (
        <div className="shell insight-article-en__quick-shell">
          <aside className="insight-article-en__quick-answer" aria-labelledby={quickAnswerId}>
            <p className="kicker" id={quickAnswerId}>Quick answer</p>
            <GoldRule />
            <p>{article.quickAnswer}</p>
          </aside>
        </div>
      ) : null}

      <div className="shell insight-article-en__measure">
        {article.introParagraphs?.length ? (
          <div className="insight-article-en__intro">
            {article.introParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        ) : null}
        {sections}
        {article.closingParagraphs?.length ? (
          <div className="insight-article-en__closing">
            {article.closingParagraphs.map((paragraph) => (
              <p key={paragraph}><strong>{paragraph}</strong></p>
            ))}
          </div>
        ) : null}
      </div>

      {article.supportingLinks?.length ? (
        <nav className="shell insight-article-en__supporting" aria-label="Related reading">
          {article.supportingLinks.map((link) => (
            <Link
              className="insight-article-en__supporting-link"
              to={toRoute(link.href, lang)}
              key={link.href}
            >
              <span>{link.label}</span>
              <Icon name="arrow" />
            </Link>
          ))}
        </nav>
      ) : null}

      <div className="shell insight-article-en__measure insight-article-en__related-paths">
        <RelatedPath id={item.id} kind="insight" />
        {item.relatedCase ? (
          <Go
            href={`case.html?id=${item.relatedCase}`}
            label={`${t("relatedCase")}: ${caseName(EM.CASES.find((entry: { id: string }) => entry.id === item.relatedCase), loc)}`}
          />
        ) : null}
      </div>

      <CtaBand
        tone="strong"
        kicker={copy("insights", "ctaEyebrow")}
        title={copy("insights", "ctaTitle")}
        href={`contact.html?source=insight:${item.id}`}
        label={t("bookCta")}
      />

      {article.faq.length ? (
        <section className="section about-faq">
          <div className="shell">
            <p className="kicker">FAQs</p>
            <hr className="gold-rule" />
            <h2 className="about-faq__title">Common questions about this insight</h2>
            <div className="about-faq__list">
              {article.faq.map((item) => (
                <details key={item.question} className="about-faq__item">
                  <summary className="about-faq__question">{item.question}</summary>
                  <p className="about-faq__answer">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
