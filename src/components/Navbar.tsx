import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { to: "/about", label: "ABOUT" },
  { to: "/#works", label: "WORKS" },
  { to: "/#expertise", label: "EXPERTISE" },
  { to: "/#contact", label: "CONTACT" },
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
  return (
    <header className="site-header">
      <Link className="nav-link brand" to="/">
        <AnimatedLabel label="CORTEZ" />
      </Link>

      <nav className="site-nav" aria-label="Principal">
        {navItems.map((item) => (
          <Link className="nav-link" to={item.to} key={item.to}>
            <AnimatedLabel label={item.label} />
          </Link>
        ))}
      </nav>
    </header>
  );
}
