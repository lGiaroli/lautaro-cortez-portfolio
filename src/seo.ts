import { localizedPath, type Locale } from "./i18n/locale";

export const PERSON_NAME = "Lautaro Cortez";
export const SITE_URL = "https://lautarocortez.com";
export const DEFAULT_OG_IMAGE_PATH = "/og-portrait.jfif";
export const DEFAULT_OG_IMAGE_ALT =
  "Portrait of Lautaro Cortez, software engineer and backend engineer";
export const SPANISH_OG_IMAGE_ALT = "Retrato de Lautaro Cortez, ingeniero de software";

export const SEO_KEYWORDS = [
  "Lautaro Cortez",
  "Lautaro Cortez software engineer",
  "Lautaro Cortez backend engineer",
  "software engineer portfolio",
  "backend engineer portfolio",
  "backend developer",
  "software developer",
  "Java developer",
  "Spring Boot developer",
  "API design",
  "clean architecture",
  "scalable systems",
  "PostgreSQL",
  "Docker",
] as const;

export const HOME_SEO = {
  title: "Lautaro Cortez | Software Engineer & Backend Engineer",
  description:
    "Lautaro Cortez is a software engineer and backend engineer building scalable APIs, clean architecture, and robust backend systems.",
  path: "/",
  type: "website",
} as const;

export const ABOUT_SEO = {
  title: "About Lautaro Cortez | Software Engineer Experience",
  description:
    "Explore the background of Lautaro Cortez, a software engineer focused on backend development, software quality, API design, and scalable systems.",
  path: "/about",
  type: "profile",
} as const;

export const SPANISH_HOME_SEO = {
  ...HOME_SEO,
  title: "Lautaro Cortez | Ingeniero de software y backend",
  description: "Portfolio de Lautaro Cortez, ingeniero de software especializado en sistemas backend, diseño de API y arquitectura de producto.",
};

export const SPANISH_ABOUT_SEO = {
  ...ABOUT_SEO,
  title: "Sobre Lautaro Cortez | Trayectoria profesional",
  description: "Conocé la formación y experiencia de Lautaro Cortez en ingeniería de software, calidad, desarrollo backend y diseño de API.",
};

function toAbsoluteUrl(origin: string, path: string) {
  return new URL(path, origin).toString();
}

export function createHomePageSchema(origin: string, locale: Locale) {
  const siteUrl = toAbsoluteUrl(origin, "/");
  const pageUrl = toAbsoluteUrl(origin, localizedPath("/", locale));
  const imageUrl = toAbsoluteUrl(origin, DEFAULT_OG_IMAGE_PATH);
  const seo = locale === "es" ? SPANISH_HOME_SEO : HOME_SEO;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": `${siteUrl}#website` },
        about: { "@id": `${siteUrl}#person` },
        primaryImageOfPage: { "@id": `${siteUrl}#primaryimage` },
        inLanguage: locale,
      },
      {
        "@type": "ImageObject",
        "@id": `${siteUrl}#primaryimage`,
        url: imageUrl,
        width: 1024,
        height: 1024,
        caption: locale === "es" ? SPANISH_OG_IMAGE_ALT : DEFAULT_OG_IMAGE_ALT,
      },
    ],
  };
}

export function createAboutPageSchema(origin: string, locale: Locale) {
  const siteUrl = toAbsoluteUrl(origin, "/");
  const homeUrl = toAbsoluteUrl(origin, localizedPath("/", locale));
  const aboutUrl = toAbsoluteUrl(origin, localizedPath(ABOUT_SEO.path, locale));
  const seo = locale === "es" ? SPANISH_ABOUT_SEO : ABOUT_SEO;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${aboutUrl}#webpage`,
        url: aboutUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": `${siteUrl}#website` },
        mainEntity: { "@id": `${siteUrl}#person` },
        inLanguage: locale,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${aboutUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "es" ? "Inicio" : "Home",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "es" ? "Sobre mí" : "About",
            item: aboutUrl,
          },
        ],
      },
    ],
  };
}
