import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { caseGroupNames, type CaseStudy } from "./caseTypes";
import { LateralEvidence } from "./LateralEvidence";
import { PortfolioGallery } from "./PortfolioGallery";
import { V6Evidence } from "./V6Evidence";
import "./portfolio.css";

export function PortfolioCasePage({ study }: { study: CaseStudy }) {
  return (
    <main className="case-page">
      <section className="case-heading" aria-labelledby="case-title">
        <Navbar />
        <div className="case-shell case-heading__inner">
          <Link className="case-back" to="/work">← All work</Link>
          <div className="case-heading__intro">
            <p className="case-kicker">{caseGroupNames[study.group]} <span>·</span> {study.status}</p>
            <h1 id="case-title">{study.title}</h1>
            <p className="case-heading__subtitle">{study.subtitle}</p>
            <p className="case-heading__summary">{study.summary}</p>
          </div>
          <div className="case-heading__details">
            <p><strong>Role</strong> {study.role}</p>
            {study.stack?.length ? <p><strong>Tools</strong> {study.stack.join(" · ")}</p> : null}
          </div>
          {study.links?.length ? (
            <div className="case-heading__links">
              {study.links.map(({ href, label }) => <a className="case-back" href={href} key={href}>{label} ↗</a>)}
            </div>
          ) : null}
        </div>
      </section>

      <div className="case-shell case-body">
        <nav className="case-index" aria-label="On this page">
          {study.gallery?.length ? <Link to="#product-gallery">Product gallery</Link> : null}
          {study.sections.map((section) => (
            <Link key={section.id} to={`#${section.id}`}>{section.title}</Link>
          ))}
        </nav>

        {study.gallery?.length ? <PortfolioGallery captures={study.gallery} /> : null}

        {study.sections.map((section) => (
          <section className="case-chapter" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
            <div className="case-chapter__intro">
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              <div className="case-chapter__copy">
                {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            {section.media && (
              <figure className="case-image">
                <img src={section.media.src} alt={section.media.alt} loading="lazy" decoding="async" />
                {section.media.caption && <figcaption>{section.media.caption}</figcaption>}
              </figure>
            )}
            {study.id === "lateral-v6" && <V6Evidence section={section.id} />}
            <LateralEvidence studyId={study.id} sectionId={section.id} />
            {section.points?.length ? <ul className="case-points">{section.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
          </section>
        ))}

        <footer className="case-footer">
          <Link className="case-back" to="/work">← All work</Link>
        </footer>
      </div>
    </main>
  );
}
