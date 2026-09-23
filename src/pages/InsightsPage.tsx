import { Link, useParams } from "react-router-dom";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, Crumbs, Go, GoldRule, PageHero, SectionIntro } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { QuietVisual } from "@/components/folio/HeroVisual";
import { RelatedPath } from "@/components/folio/RelatedPath";
import { caseName } from "@/lib/em";
import { toRoute } from "@/lib/routes";

type InsightItem = {
  id: string;
  topic: { ar: string; en: string };
  format: { ar: string; en: string };
  title: { ar: string; en: string };
  summary: { ar: string; en: string };
  answer?: { ar: string; en: string };
  relatedCase?: string;
  cta?: string;
  sections?: { heading: { ar: string; en: string }; text: { ar: string; en: string } }[];
  body?: {
    heading?: { ar: string; en: string };
    paragraphs: { ar: string; en: string }[];
  }[];
  seo?: {
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    ogTitle?: { ar: string; en: string };
    ogDescription?: { ar: string; en: string };
  };
};

function shouldShowInsightAnswer(item: InsightItem, lang: "ar" | "en"): boolean {
  if (!item.answer) return false;
  const answer = item.answer[lang]?.trim();
  const summary = item.summary[lang]?.trim();
  return Boolean(answer && answer !== summary);
}

export function InsightsPage() {
  const { t, loc, copy, lang } = useI18n();
  const list = EM.INSIGHTS as InsightItem[];
  const featured = list[0];
  const rest = list.slice(1);
  return (
    <>
      <PageHero
        variant="editorial"
        visual="quiet"
        iconName="insight"
        kicker={copy("insights", "eyebrow")}
        title={copy("insights", "title")}
        lead={copy("insights", "lead")}
      />

      <section className="section section--veiled">
        <div className="shell insight-feature" data-reveal="clip">
          <p className="kicker kicker-row">
            <span className="icon-well icon-well--sm"><Icon name="insight" rtl={lang === "ar"} /></span>
            {copy("insights", "featuredLabel")} · {loc(featured.topic)}
          </p>
          <GoldRule long />
          <h2>{loc(featured.title)}</h2>
          <p className="insight-feature__sum">{loc(featured.summary)}</p>
          <Go href={`insight.html?id=${featured.id}`} label={t("readInsight")} />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionIntro kicker={copy("insights", "listLabel")} title={copy("insights", "listLabel")} />
          <ol className="editorial-list">
            {rest.map((item, i) => (
              <li key={item.id}>
                <Link className="editorial-row" to={toRoute(`insight.html?id=${item.id}`, lang)}>
                  <span className="num">{String(i + 2).padStart(2, "0")}</span>
                  <span className="editorial-row__body">
                    <span className="kicker">{loc(item.topic)}</span>
                    <strong>{loc(item.title)}</strong>
                    <span className="editorial-row__q">{loc(item.summary)}</span>
                  </span>
                  <Icon name="arrow" rtl={lang === "ar"} />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        tone="sand"
        kicker={copy("insights", "ctaEyebrow")}
        title={copy("insights", "ctaTitle")}
        text={copy("insights", "ctaText")}
        href="/contact"
        label={t("bookCta")}
      />
    </>
  );
}

export function InsightDetailPage() {
  const { id } = useParams();
  const { t, loc, copy, lang } = useI18n();
  const list = EM.INSIGHTS as InsightItem[];
  const item = list.find((entry) => entry.id === id);
  if (!item) {
    return (
      <div className="not-found shell">
        <h1>{t("notFound")}</h1>
        <Go href="/" label={t("backHome")} iconName="home" />
      </div>
    );
  }
  const sequence = (EM.INSIGHT_SEQUENCE as string[])
    .map((insightId) => list.find((entry) => entry.id === insightId))
    .filter(Boolean) as InsightItem[];
  const currentIndex = Math.max(0, sequence.findIndex((entry) => entry.id === item.id));
  const next = sequence[currentIndex + 1];
  const why = item.sections?.[0];
  const frame = item.sections?.[1];
  return (
    <>
      <Crumbs items={[
        { href: "/", label: t("homeCrumb"), icon: "home" },
        { href: "/insights", label: loc({ ar: "الرؤى", en: "Insights" }), icon: "insight" },
        { label: loc(item.title) }
      ]} />

      <header className="hero hero-editorial insight-hero">
        <div className="shell hero__grid">
          <div className="hero-seq">
            <p className="kicker kicker-row">
              <span className="icon-well icon-well--sm"><Icon name="insight" rtl={lang === "ar"} /></span>
              {loc(item.topic)}
            </p>
            <GoldRule />
            <h1 className="hero__title"><span className="hero__ink">{loc(item.title)}</span></h1>
            <p className="lead">{loc(item.summary)}</p>
            <p className="insight-attribution">
              {lang === "ar" ? "بقلم Elite Maison" : "By Elite Maison"}
            </p>
          </div>
          <div className="hero-media">
            <QuietVisual />
          </div>
        </div>
      </header>

      {shouldShowInsightAnswer(item, lang) ? (
      <section className="section section--plate">
        <div className="shell story-col">
          <article className="exec-answer" data-reveal="clip">
            {copy("insights", "answerLabel") ? (
              <h2 className="kicker">{copy("insights", "answerLabel")}</h2>
            ) : null}
            <GoldRule />
            <p className="exec-answer__text">{loc(item.answer!)}</p>
          </article>
        </div>
      </section>
      ) : null}

      {item.body ? (
        item.body.map((block, i) => (
          <section className={`section${i % 2 ? " section--veiled" : ""}`} key={block.heading?.en || block.paragraphs.join(" ")}>
            <div className="shell story-col">
              {block.heading && <h2>{loc(block.heading)}</h2>}
              <GoldRule />
              {block.paragraphs.map((para, j) => {
                const text = loc(para);
                const parts = text.split(/(\*\*[^*]+\*\*)/g);
                return (
                  <p key={j}>
                    {parts.map((part, k) => {
                      if (part.startsWith("**") && part.endsWith("**")) {
                        return <strong key={k}>{part.slice(2, -2)}</strong>;
                      }
                      return <span key={k}>{part}</span>;
                    })}
                  </p>
                );
              })}
            </div>
          </section>
        ))
      ) : (
        <>
          {why ? (
            <section className="section">
              <div className="shell story-col">
                {copy("insights", "whyLabel") ? (
                  <p className="kicker">{copy("insights", "whyLabel")}</p>
                ) : null}
                <h2>{loc(why.heading)}</h2>
                <GoldRule />
                <p>{loc(why.text)}</p>
              </div>
            </section>
          ) : null}

          {frame ? (
            <section className="section section--veiled">
              <div className="shell story-col">
                {copy("insights", "frameLabel") ? (
                  <p className="kicker">{copy("insights", "frameLabel")}</p>
                ) : null}
                <h2>{loc(frame.heading)}</h2>
                <GoldRule />
                <p>{loc(frame.text)}</p>
              </div>
            </section>
          ) : null}

          {item.sections && item.sections.slice(2).map((extra, i) => (
            <section className={`section${i % 2 ? " section--veiled" : ""}`} key={extra.heading.en}>
              <div className="shell story-col">
                <h2>{loc(extra.heading)}</h2>
                <GoldRule />
                <p>{loc(extra.text)}</p>
              </div>
            </section>
          ))}
        </>
      )}

      <section className="section">
          <div className="shell story-col">
            <RelatedPath id={item.id} kind="insight" />
            {item.id === "sales-article" && (
              <Go href={`insight.html?id=cx-check`} label={`${t("relatedInsights")}: ${loc({ ar: "خمس إشارات على وجود احتكاك في رحلة العميل", en: "Five signs there is friction in your customer journey" })}`} />
            )}
            {item.id === "cx-check" && (
              <Go href={`insight.html?id=sales-article`} label={`${t("relatedInsights")}: ${loc({ ar: "الاهتمام موجود. أين يضيع قبل أن يصبح إيرادًا؟", en: "Interest is there. Where does it disappear before becoming revenue?" })}`} />
            )}
            {item.id === "growth-guide" && (
              <Go href={`insight.html?id=expansion-brief`} label={`${t("relatedInsights")}: ${loc({ ar: "السوق جذاب. لكن هل أنتم جاهزون لدخوله؟", en: "The market is attractive. But are you ready to enter it?" })}`} />
            )}
            {item.id === "expansion-brief" && (
              <Go href={`insight.html?id=gcc-market-entry-readiness`} label={`${t("relatedInsights")}: ${loc({ ar: "السوق يفتح أبوابه. النجاح لا يفعل.", en: "The market opens. Success still has to be earned." })}`} />
            )}
            {item.id === "expansion-brief" && (
              <Go href={`insight.html?id=growth-guide`} label={`${t("relatedInsights")}: ${loc({ ar: "متى تصبح خارطة النمو أداة قرار فعلية؟", en: "When does a growth roadmap become a real decision tool?" })}`} />
            )}
            {item.relatedCase && (
              <Go
                href={`case.html?id=${item.relatedCase}`}
                label={`${t("relatedCase")}: ${caseName(EM.CASES.find((c: { id: string }) => c.id === item.relatedCase), loc)}`}
              />
            )}
          </div>
      </section>

        <CtaBand
          tone="strong"
          kicker={copy("insights", "ctaEyebrow")}
          title={copy("insights", "ctaTitle")}
          href={`contact.html?source=insight:${item.id}`}
          label={t("bookCta")}
        />
    </>
  );
}
