export function insightSectionDomId(articleId: string, sectionIndex: number): string {
  return `insight-${articleId}-section-${sectionIndex}`;
}

export function insightSubsectionDomId(articleId: string, sectionIndex: number, subIndex: number): string {
  return `insight-${articleId}-section-${sectionIndex}-sub-${subIndex}`;
}

export type InsightNavItem = {
  id: string;
  label: string;
  level: 2 | 3;
};

export function buildInsightNavItems(
  articleId: string,
  sections: { heading: string; subsections?: { heading: string }[] }[]
): InsightNavItem[] {
  const items: InsightNavItem[] = [];
  sections.forEach((section, sectionIndex) => {
    items.push({
      id: insightSectionDomId(articleId, sectionIndex),
      label: section.heading,
      level: 2
    });
    section.subsections?.forEach((_sub, subIndex) => {
      items.push({
        id: insightSubsectionDomId(articleId, sectionIndex, subIndex),
        label: section.subsections![subIndex].heading,
        level: 3
      });
    });
  });
  return items;
}
