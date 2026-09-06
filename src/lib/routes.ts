export function toRoute(href: string): string {
  if (!href) return "/";
  if (/^(mailto:|tel:|https?:)/.test(href)) return href;
  if (href.startsWith("#") || href.startsWith("/")) return href;
  const [filePart, hashPart] = href.split("#");
  const hash = hashPart ? `#${hashPart}` : "";
  const [file, query] = filePart.split("?");
  const params = new URLSearchParams(query || "");
  const id = params.get("id");
  const map: Record<string, string> = {
    "index.html": "/",
    "about.html": "/about",
    "consulting.html": "/consulting",
    "execution.html": "/execution",
    "sectors.html": "/sectors",
    "cases.html": "/cases",
    "insights.html": "/insights",
    "contact.html": "/contact",
    "case.html": id ? `/cases/${id}` : "/cases",
    "insight.html": id ? `/insights/${id}` : "/insights"
  };
  return (map[file] || "/") + hash;
}
