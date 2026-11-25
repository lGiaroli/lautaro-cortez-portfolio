import type { CaseMedia } from "./caseTypes";

export function PortfolioGallery({ captures }: { captures: CaseMedia[] }) {
  const portrait = captures.every((capture) => capture.orientation === "portrait");

  return (
    <section className="case-chapter case-gallery" id="product-gallery" aria-labelledby="product-gallery-title">
      <h2 id="product-gallery-title">Product gallery</h2>
      <ul className="case-gallery__grid" data-portrait={portrait}>
        {captures.map(({ src, alt, caption }) => (
          <li key={src}>
            <figure>
              <a href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size capture of ${alt}`}>
                <img src={src} alt={alt} loading="lazy" decoding="async" />
                <span aria-hidden="true">↗</span>
              </a>
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
