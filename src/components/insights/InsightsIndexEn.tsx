import { Link } from "react-router-dom";
import { EM } from "@/data/em.js";
import { INSIGHTS_EN, INSIGHTS_EN_INDEX } from "@/data/insights-en.js";
import { useI18n } from "@/context/language";
import { Go } from "@/components/ui-kit";
import { Icon } from "@/components/Icon";
import { toRoute } from "@/lib/routes";

export function InsightsIndexEn() {
  const { loc, lang } = useI18n();
  const list = EM.INSIGHTS as { id: string; topic: { en: string; ar: string }; title: { en: string; ar: string }; summary: { en: string; ar: string } }[];
  const rest = list.slice(1);
  const featured = INSIGHTS_EN_INDEX.featured;
  const enArticles = INSIGHTS_EN as Record<string, { h1: string }>;
  const eyebrowParts = featured.eyebrow.split(" · ");
  const startLabel = eyebrowParts[0] || "Start here";
  const topicLabel = eyebrowParts.slice(1).join(" · ") || eyebrowParts[0];

  return (
    <div className="insights-en-index">
      <section className="insights-en-index__featured" aria-labelledby="insights-en-featured-title">
        <div className="shell">
          <article className="insights-en-index__cover">
            <div className="insights-en-index__cover-main">
              <div className="insights-en-index__cover-meta">
                <span className="insights-en-index__start">{startLabel}</span>
                <span className="insights-en-index__index-mark" aria-hidden="true">01 / 06</span>
              </div>
              <p className="insights-en-index__topic">{topicLabel}</p>
              <span className="insights-en-index__rail-rule" aria-hidden="true" />
              <h2 id="insights-en-featured-title">{featured.title}</h2>
            </div>
            <aside className="insights-en-index__cover-aside">
              <p className="insights-en-index__featured-preview">{featured.preview}</p>
              <Go href={featured.href} label={featured.action} />
            </aside>
          </article>
        </div>
      </section>

      <section className="insights-en-index__catalog" aria-labelledby="insights-en-catalog-title">
        <div className="shell insights-en-index__catalog-shell">
          <header className="insights-en-index__catalog-head">
            <h2 id="insights-en-catalog-title">{INSIGHTS_EN_INDEX.listTitle}</h2>
          </header>
          <ol className="insights-en-index__list">
            {rest.map((item, i) => (
              <li key={item.id}>
                <Link className="insights-en-index__row" to={toRoute(`insight.html?id=${item.id}`, lang)}>
                  <span className="insights-en-index__num">{String(i + 2).padStart(2, "0")}</span>
                  <span className="insights-en-index__row-topic">{loc(item.topic)}</span>
                  <span className="insights-en-index__row-title">
                    {enArticles[item.id]?.h1 || loc(item.title)}
                  </span>
                  <span className="insights-en-index__row-deck">{loc(item.summary)}</span>
                  <span className="insights-en-index__row-go" aria-hidden="true">
                    <Icon name="arrow" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
