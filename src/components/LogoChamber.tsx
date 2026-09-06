import { Dots } from "@/components/Icon";
import { useI18n } from "@/context/language";

export function LogoChamber({ compact = false }: { compact?: boolean }) {
  const { copy } = useI18n();
  return (
    <figure className={`logo-chamber${compact ? " logo-chamber--page" : ""}`}>
      <span className="logo-chamber__bloom" aria-hidden="true" />
      <span className="logo-chamber__wash" aria-hidden="true" />
      <span className="logo-chamber__arch" aria-hidden="true" />
      <img
        src="/assets/images/logo-lockup.png"
        width={1085}
        height={685}
        alt="Elite Maison Marketing Consultancies"
      />
      <div className="logo-chamber__base">
        <Dots />
        <p className="kicker">{copy("home", "methodChip")}</p>
        <p>{copy("home", "methodLine")}</p>
      </div>
    </figure>
  );
}
