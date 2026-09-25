import { Component, type ReactNode } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageProvider";
import { useI18n } from "@/context/language";
import { Layout } from "@/components/layout/Layout";
import { mapHref, toRoute } from "@/lib/routes";
import { isLang, parsePath, savedLang, DEFAULT_LANG } from "@/lib/i18n-path";
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

function fallbackLang(search: string): Lang {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const qLang = params.get("lang");
  if (qLang === "en" || qLang === "ar") return qLang;
  const saved = savedLang();
  if (saved) return saved;
  return DEFAULT_LANG;
}

export function localize(pathname: string, search: string, hash: string, urlLang?: Lang | null) {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  params.delete("lang");
  const lang: Lang = isLang(urlLang) ? urlLang : fallbackLang(search);
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

export function AppRoutes() {
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

function RuntimeFallback() {
  const { lang, t } = useI18n();
  return (
    <main id="main" className="page shell" tabIndex={-1}>
      <section className="section">
        <h1>{t("notFound")}</h1>
        <Link className="btn btn--gold" to={lang === "ar" ? "/ar" : "/en"}>{t("backHome")}</Link>
      </section>
    </main>
  );
}

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Keep diagnostics in the browser's error channel without rendering them to visitors.
    console.error("Elite Maison runtime error", error);
  }

  render() {
    return this.state.hasError ? <RuntimeFallback /> : this.props.children;
  }
}

export function App() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </LanguageProvider>
  );
}

// Client-only wrapper that adds BrowserRouter.
// The server entry renders AppRoutes directly under StaticRouter.
export function ClientApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
