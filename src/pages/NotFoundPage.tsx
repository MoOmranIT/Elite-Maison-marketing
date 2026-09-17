import { useI18n } from "@/context/language";
import { Frame } from "@/components/ui-kit";
import { LogoChamber } from "@/components/LogoChamber";

export function NotFoundPage() {
  const { t } = useI18n();
  return (
    <header className="hero hero-quiet">
      <div className="shell hero__grid">
        <div className="hero-seq">
          <h1 className="hero__title"><span className="hero__ink">{t("notFound")}</span></h1>
          <div className="related">
            <Frame href="/" iconName="home" title={t("backHome")} level={2} />
          </div>
        </div>
        <div className="hero-media">
          <LogoChamber compact />
        </div>
      </div>
    </header>
  );
}
