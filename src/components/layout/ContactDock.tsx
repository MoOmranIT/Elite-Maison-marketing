import { useLocation } from "react-router-dom";
import { parsePath } from "@/lib/i18n-path";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { FloatingDisclosure } from "@/components/ui/floating-disclosure";

export function ContactDock() {
  const { t } = useI18n();
  const location = useLocation();
  const c = EM.CONFIG.contact as {
    email: string;
    phone: string;
    phoneHref: string;
    whatsappHref: string;
  };

  if (parsePath(location.pathname).path === "/contact") return null;

  return (
    <FloatingDisclosure
      logoSrc="/assets/images/logo-mark.png"
      label={t("dockOpen")}
      closeLabel={t("dockClose")}
      panelLabel={t("dockPanel")}
      items={[
        {
          id: "whatsapp",
          title: t("dockWhatsapp"),
          description: c.phone,
          href: c.whatsappHref,
          iconName: "whatsapp"
        },
        {
          id: "email",
          title: t("dockEmail"),
          description: c.email,
          href: `mailto:${c.email}`,
          iconName: "mail"
        },
        {
          id: "phone",
          title: t("dockPhone"),
          description: c.phone,
          href: c.phoneHref,
          iconName: "phone"
        }
      ]}
    />
  );
}
