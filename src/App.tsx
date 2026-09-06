import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageProvider";
import { Layout } from "@/components/layout/Layout";
import { toRoute } from "@/lib/routes";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { ConsultingPage } from "@/pages/ConsultingPage";
import { ExecutionPage } from "@/pages/ExecutionPage";
import { SectorsPage } from "@/pages/SectorsPage";
import { CasesPage, CaseDetailPage } from "@/pages/CasesPage";
import { InsightsPage, InsightDetailPage } from "@/pages/InsightsPage";
import { ContactPage } from "@/pages/ContactPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

function LegacyHtmlRedirect() {
  const location = useLocation();
  return <Navigate to={toRoute(location.pathname.replace(/^\//, "") + location.search + location.hash)} replace />;
}

const LEGACY = [
  "index.html",
  "about.html",
  "consulting.html",
  "execution.html",
  "sectors.html",
  "cases.html",
  "insights.html",
  "contact.html",
  "case.html",
  "insight.html"
];

export function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/consulting" element={<ConsultingPage />} />
          <Route path="/execution" element={<ExecutionPage />} />
          <Route path="/sectors" element={<SectorsPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/cases/:id" element={<CaseDetailPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:id" element={<InsightDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {LEGACY.map((file) => (
            <Route key={file} path={`/${file}`} element={<LegacyHtmlRedirect />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </LanguageProvider>
  );
}
