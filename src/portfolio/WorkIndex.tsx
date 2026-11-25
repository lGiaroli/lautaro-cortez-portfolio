import { Navbar } from "../components/Navbar";
import { LocalizedLink, useLocale } from "../i18n/locale";
import { caseGroupNames, type CaseStudy } from "./caseTypes";
import { caseGroupNamesEs } from "./cases.es";
import "./portfolio.css";

export type WorkEntry = Pick<CaseStudy, "id" | "group" | "title" | "subtitle" | "summary">;

const workGroups = [
  "lateral",
  "other-works",
] as const;

export function WorkIndex({ entries }: { entries: WorkEntry[] }) {
  const locale = useLocale();
  const groupNames = locale === "es" ? caseGroupNamesEs : caseGroupNames;

  return (
    <main className="case-page">
      <section className="case-heading" aria-labelledby="work-title">
        <Navbar />
        <div className="case-shell case-heading__inner">
          <div className="case-heading__intro">
            <p className="case-kicker">Lautaro Cortez <span>·</span> {locale === "es" ? "Portafolio" : "Portfolio"}</p>
            <h1 id="work-title">{locale === "es" ? "Trabajos seleccionados" : "Selected work"}</h1>
            <p className="case-heading__summary">
              {locale === "es"
                ? "Diseño de producto y desarrollo de software para sistemas de operaciones, productos web y aplicaciones de escritorio."
                : "Product design and software engineering across operational systems, web products, and desktop tools."}
            </p>
          </div>
        </div>
      </section>

      <div className="case-shell">
        <nav className="case-index" aria-label={locale === "es" ? "Colecciones de trabajos" : "Work collections"}>
          {workGroups.map((id) => <LocalizedLink key={id} to={`#${id}`}>{groupNames[id]}</LocalizedLink>)}
        </nav>
        {workGroups.map((id) => (
          <section className="case-chapter work-collection" id={id} key={id} aria-labelledby={`${id}-collection`}>
            <h2 id={`${id}-collection`}>{groupNames[id]}</h2>
            <ul className="work-collection__list">
              {entries.filter((entry) => entry.group === id).map((entry) => (
                <li key={entry.id}>
                  <LocalizedLink className="work-collection__item" to={`/projects/${entry.id}`}>
                    <span>
                      <strong>{entry.title}</strong>
                      <span className="work-collection__subtitle">{entry.subtitle}</span>
                    </span>
                    <span className="work-collection__summary">{entry.summary}</span>
                    <span className="work-collection__arrow" aria-hidden="true">↗</span>
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
