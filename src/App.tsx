import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageProvider";
import { Layout } from "@/components/layout/Layout";
import { mapHref, toRoute } from "@/lib/routes";
import { isLang, parsePath, savedLang } from "@/lib/i18n-path";
import type { Lang } from "@/context/language";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { ConsultingPage } from "@/pages/ConsultingPage";
import { ExecutionPage } from "@/pages/ExecutionPage";
import { SectorsPage } from "@/pages/SectorsPage";
import { CasesPage, CaseDetailPage } from "@/pages/CasesPage";
import { InsightsPage, InsightDetailPage } from "@/pages/InsightsPage";
import { ContactPage } from "@/pages/ContactPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

function preferredLang() {
  const query = new URLSearchParams(window.location.search).get("lang");
  if (query === "en" || query === "ar") return query;
  return savedLang() || "ar";
}

export function localize(pathname: string, search: string, hash: string, urlLang?: Lang | null) {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const qLang = params.get("lang");
  params.delete("lang");
  const lang: Lang = qLang === "en" || qLang === "ar"
    ? qLang
    : (isLang(urlLang) ? urlLang : preferredLang());
  const file = pathname.replace(/^\//, "") || "index.html";
  const id = params.get("id");
  const mappedInput = (file === "case.html" || file === "insight.html") && id
    ? `${file}?id=${id}`
    : file;
  if (file === "case.html" || file === "insight.html") params.delete("id");
  const mapped = mapHref(mappedInput);
  const qs = params.toString();
  return toRoute(mapped + (qs ? `?${qs}` : "") + hash, lang);
}

function RootRedirect() {
  const location = useLocation();
  return <Navigate to={localize("/", location.search, location.hash)} replace />;
}

function CompatRedirect() {
  const location = useLocation();
  const { lang } = useParams();
  const parsed = parsePath(location.pathname);
  if (parsed.path.endsWith(".html")) {
    return <Navigate to={localize(parsed.path, location.search, location.hash, parsed.lang)} replace />;
  }
  if (isLang(lang)) return <NotFoundPage />;
  return <Navigate to={localize(location.pathname, location.search, location.hash)} replace />;
}

function LangLayout() {
  const { lang } = useParams();
  const location = useLocation();
  if (!isLang(lang)) {
    return <Navigate to={localize(location.pathname, location.search, location.hash)} replace />;
  }
  return <Layout />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/:lang" element={<LangLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="consulting" element={<ConsultingPage />} />
        <Route path="execution" element={<ExecutionPage />} />
        <Route path="sectors" element={<SectorsPage />} />
        <Route path="cases" element={<CasesPage />} />
        <Route path="cases/:id" element={<CaseDetailPage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="insights/:id" element={<InsightDetailPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<CompatRedirect />} />
      </Route>
    </Routes>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  );
}
