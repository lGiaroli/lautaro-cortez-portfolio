import type { CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { LocalizedLink, localizedPath, useLocale } from "../i18n/locale";

const navItems = [
  { to: "/about", en: "ABOUT", es: "SOBRE MÍ" },
  { to: "/work", en: "WORKS", es: "PROYECTOS" },
  { to: "/#expertise", en: "EXPERTISE", es: "ESPECIALIDAD" },
  { to: "/#contact", en: "CONTACT", es: "CONTACTO" },
];

function AnimatedLabel({ label }: { label: string }) {
  return (
    <>
      <span className="sr-only">{label}</span>
      <span className="nav-link__label" aria-hidden="true">
        {[...label].map((character, index) => {
          if (character === " ") {
            return (
              <span className="nav-link__space" key={`space-${index}`}>
                &nbsp;
              </span>
            );
          }

          const style = {
            "--char-index": index,
            "--char-shift": index % 2 === 0 ? 1 : -1,
          } as CSSProperties;

          return (
            <span className="nav-link__char" key={`${character}-${index}`} style={style}>
              <span className="nav-link__glyph" data-char={character}>
                {character}
              </span>
            </span>
          );
        })}
      </span>
    </>
  );
}

export function Navbar() {
  const locale = useLocale();
  const { pathname, search, hash } = useLocation();
  const otherLocale = locale === "en" ? "es" : "en";
  const switchLabel = otherLocale === "es" ? "Leer en español" : "Read in English";

  return (
    <header className="site-header">
      <LocalizedLink className="nav-link brand" to="/">
        <AnimatedLabel label="CORTEZ" />
      </LocalizedLink>

      <nav className="site-nav" aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}>
        {navItems.map((item) => (
          <LocalizedLink className="nav-link" to={item.to} key={item.to}>
            <AnimatedLabel label={item[locale]} />
          </LocalizedLink>
        ))}
      </nav>

      <Link
        className="nav-link nav-language"
        to={localizedPath(pathname + search + hash, otherLocale)}
        lang={otherLocale}
        hrefLang={otherLocale}
        aria-label={switchLabel}
        title={switchLabel}
      >
        {otherLocale.toUpperCase()}
      </Link>
    </header>
  );
}
