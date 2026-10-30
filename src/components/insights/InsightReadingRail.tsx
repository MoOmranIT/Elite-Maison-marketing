import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { InsightNavItem } from "@/lib/insight-section-id";

export function InsightReadingRail({
  items,
  articleId
}: {
  items: InsightNavItem[];
  articleId: string;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!items.length) return;
    const ids = items.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-96px 0px -55% 0px",
        threshold: [0, 0.12, 0.35, 0.6]
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [items, articleId]);

  if (items.length < 2) return null;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    setActiveId(id);
    target.scrollIntoView({
      behavior: prefersReducedMotion.current ? "auto" : "smooth",
      block: "start"
    });
  };

  return (
    <nav className="insight-article-en__rail" aria-label="In this article">
      <p className="insight-article-en__rail-label">In this article</p>
      <ul className="insight-article-en__rail-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "insight-article-en__rail-item insight-article-en__rail-item--sub" : "insight-article-en__rail-item"}
          >
            <a
              className={activeId === item.id ? "is-active" : undefined}
              href={`#${item.id}`}
              onClick={(event) => handleClick(event, item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function InsightReadingRailMobile({ items }: { items: InsightNavItem[] }) {
  if (items.length < 2) return null;
  return (
    <details className="insight-article-en__toc-mobile">
      <summary>In this article</summary>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "is-sub" : undefined}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ul>
    </details>
  );
}
