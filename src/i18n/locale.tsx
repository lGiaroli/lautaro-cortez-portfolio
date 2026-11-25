import { Link, useLocation, type LinkProps } from "react-router-dom";

export type Locale = "en" | "es";

const spanishPrefix = /^\/es(?=\/|$)/;

export function useLocale(): Locale {
  return spanishPrefix.test(useLocation().pathname) ? "es" : "en";
}

export function useText() {
  const locale = useLocale();
  return (english: string, spanish: string) => locale === "es" ? spanish : english;
}

export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;

  const suffixStart = path.search(/[?#]/);
  const pathname = suffixStart === -1 ? path : path.slice(0, suffixStart);
  const suffix = suffixStart === -1 ? "" : path.slice(suffixStart);
  const base = pathname.replace(spanishPrefix, "").replace(/\/$/, "") || "/";

  if (locale === "en") return base + suffix;
  return `/es${base === "/" ? "" : base}${suffix}`;
}

export function LocalizedLink({ to, ...props }: LinkProps) {
  const locale = useLocale();
  const destination = typeof to === "string"
    ? localizedPath(to, locale)
    : { ...to, pathname: to.pathname && localizedPath(to.pathname, locale) };

  return <Link to={destination} {...props} />;
}
