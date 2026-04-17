export const PERSON_NAME = "Lautaro Cortez";
export const SITE_URL = "https://lautarocortez.com";
export const DEFAULT_OG_IMAGE_PATH = "/og-portrait.jfif";
export const DEFAULT_OG_IMAGE_ALT =
  "Portrait of Lautaro Cortez, software engineer and backend engineer";

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

function toAbsoluteUrl(origin: string, path: string) {
  return new URL(path, origin).toString();
}

export function createHomePageSchema(origin: string) {
  const siteUrl = toAbsoluteUrl(origin, "/");
  const imageUrl = toAbsoluteUrl(origin, DEFAULT_OG_IMAGE_PATH);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}#webpage`,
        url: siteUrl,
        name: HOME_SEO.title,
        description: HOME_SEO.description,
        isPartOf: { "@id": `${siteUrl}#website` },
        about: { "@id": `${siteUrl}#person` },
        primaryImageOfPage: { "@id": `${siteUrl}#primaryimage` },
        inLanguage: "en",
      },
      {
        "@type": "ImageObject",
        "@id": `${siteUrl}#primaryimage`,
        url: imageUrl,
        width: 1024,
        height: 1024,
        caption: DEFAULT_OG_IMAGE_ALT,
      },
    ],
  };
}

export function createAboutPageSchema(origin: string) {
  const siteUrl = toAbsoluteUrl(origin, "/");
  const aboutUrl = toAbsoluteUrl(origin, ABOUT_SEO.path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${aboutUrl}#webpage`,
        url: aboutUrl,
        name: ABOUT_SEO.title,
        description: ABOUT_SEO.description,
        isPartOf: { "@id": `${siteUrl}#website` },
        mainEntity: { "@id": `${siteUrl}#person` },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${aboutUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: aboutUrl,
          },
        ],
      },
    ],
  };
}
