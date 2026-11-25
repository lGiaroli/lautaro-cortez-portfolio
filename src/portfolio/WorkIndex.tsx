import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { caseGroupNames, type CaseStudy } from "./caseTypes";
import "./portfolio.css";

export type WorkEntry = Pick<CaseStudy, "id" | "group" | "title" | "subtitle" | "summary">;

const workGroups = [
  "lateral",
  "other-works",
] as const;

export function WorkIndex({ entries }: { entries: WorkEntry[] }) {
  return (
    <main className="case-page">
      <section className="case-heading" aria-labelledby="work-title">
        <Navbar />
        <div className="case-shell case-heading__inner">
          <div className="case-heading__intro">
            <p className="case-kicker">Lautaro Cortez <span>·</span> Portfolio</p>
            <h1 id="work-title">Selected work</h1>
            <p className="case-heading__summary">Product design and software engineering across operational systems, web products, and desktop tools.</p>
          </div>
        </div>
      </section>

      <div className="case-shell">
        <nav className="case-index" aria-label="Work collections">
          {workGroups.map((id) => <Link key={id} to={`#${id}`}>{caseGroupNames[id]}</Link>)}
        </nav>
        {workGroups.map((id) => (
          <section className="case-chapter work-collection" id={id} key={id} aria-labelledby={`${id}-collection`}>
            <h2 id={`${id}-collection`}>{caseGroupNames[id]}</h2>
            <ul className="work-collection__list">
              {entries.filter((entry) => entry.group === id).map((entry) => (
                <li key={entry.id}>
                  <Link className="work-collection__item" to={`/projects/${entry.id}`}>
                    <span>
                      <strong>{entry.title}</strong>
                      <span className="work-collection__subtitle">{entry.subtitle}</span>
                    </span>
                    <span className="work-collection__summary">{entry.summary}</span>
                    <span className="work-collection__arrow" aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
