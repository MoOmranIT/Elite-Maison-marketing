import { useEffect } from "react";
import { Link } from "react-router-dom";
import { EM } from "@/data/em.js";
import { useI18n } from "@/context/language";
import { CtaBand, Crumbs, Go } from "@/components/ui-kit";
import { RelatedPath } from "@/components/folio/RelatedPath";
import { caseName } from "@/lib/em";
import { toRoute } from "@/lib/routes";
import { LePatchouliCaseArt, lePatchouliImageSizes } from "@/components/cases/LePatchouliCaseArt";

type CaseItem = {
  id: string;
  sector: string | null;
  publicName: { ar: string; en: string };
  anonymousName: { ar: string; en: string };
};

type RowKey = "challenge" | "strategy" | "execution" | "result";

const LEDGER: { key: RowKey; num: string }[] = [
  { key: "challenge", num: "01" },
  { key: "strategy", num: "02" },
  { key: "execution", num: "03" },
  { key: "result", num: "04" },
];

type ServiceLink = { label: string; href?: string };

type Props = {
  item: CaseItem;
  prev?: CaseItem;
  next?: CaseItem;
};

export function PatchouliCaseDetailEn({ item, prev, next }: Props) {
  const { t, copy, loc, lang } = useI18n();
  const serviceItems = (EM.COPY.casesFeatured?.serviceItems?.en ?? []) as ServiceLink[];

  useEffect(() => {
    document.body.classList.add("page-patchouli-en");
    return () => document.body.classList.remove("page-patchouli-en");
  }, []);

  return (
    <>
      <Crumbs
        items={[
          { href: "/", label: t("homeCrumb"), icon: "home" },
          { href: "/cases", label: loc({ ar: "الدليل", en: "Proof" }), icon: "proof" },
          { label: caseName(item, loc) },
        ]}
      />

      <article className="patchouli-case-en">
        <header className="patchouli-case-en__masthead">
          <div className="shell patchouli-case-en__masthead__grid">
            <div className="patchouli-case-en__masthead__copy">
              <p className="patchouli-case-en__context">{copy("casesFeatured", "context")}</p>
              <h1 className="patchouli-case-en__title">{copy("casesFeatured", "title")}</h1>
              <p className="patchouli-case-en__intro">{copy("casesFeatured", "intro")}</p>
            </div>
            <div className="patchouli-case-en__visual-frame">
              <LePatchouliCaseArt
                className="patchouli-case-en__visual le-patchouli-art"
                sizes={lePatchouliImageSizes("detail")}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </header>

        <section className="patchouli-case-en__evidence" aria-labelledby="patchouli-evidence-heading">
          <div className="shell patchouli-case-en__evidence__inner">
            <h2 id="patchouli-evidence-heading" className="sr-only">
              Case evidence
            </h2>
            <table className="patchouli-case-en__ledger">
              <caption className="sr-only">
                {copy("casesFeatured", "title")} — case evidence
              </caption>
              <tbody>
                {LEDGER.map(({ key, num }) => (
                  <tr
                    key={key}
                    className={key === "result" ? "patchouli-case-en__ledger__row--result" : undefined}
                  >
                    <th scope="row">
                      <span className="patchouli-case-en__ledger__num">{num}</span>
                      <span className="patchouli-case-en__ledger__label">{copy("casesFeatured", `${key}Label`)}</span>
                    </th>
                    <td>{copy("casesFeatured", key)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="patchouli-case-en__closing">
          <div className="shell patchouli-case-en__closing__inner">
            <div className="patchouli-case-en__services">
              <p className="patchouli-case-en__services__label">{copy("casesFeatured", "servicesLabel")}</p>
              <p className="patchouli-case-en__services__list">
                {serviceItems.map((entry, i) => (
                  <span key={entry.label}>
                    {entry.href ? (
                      <Link className="patchouli-case-en__service-link" to={toRoute(entry.href, lang)}>
                        {entry.label}
                      </Link>
                    ) : (
                      entry.label
                    )}
                    {i < serviceItems.length - 1 ? (
                      <span className="patchouli-case-en__services__sep" aria-hidden="true"> · </span>
                    ) : null}
                  </span>
                ))}
              </p>
            </div>

            <div className="patchouli-case-en__utilities">
              <RelatedPath id={item.id} kind="case" />
              <nav className="case-pager patchouli-case-en__pager" aria-label={t("caseIndex")}>
                {prev ? <Go href={`case.html?id=${prev.id}`} label={`${t("prevCase")}: ${caseName(prev, loc)}`} /> : <span />}
                {next ? <Go href={`case.html?id=${next.id}`} label={`${t("nextCase")}: ${caseName(next, loc)}`} /> : <span />}
              </nav>
            </div>
          </div>
        </footer>
      </article>

      <CtaBand
        tone="strong"
        kicker={t("similarChallenge")}
        title={t("startConversation")}
        href={`contact.html?source=case:${item.id}`}
        label={t("bookCta")}
      />
    </>
  );
}
