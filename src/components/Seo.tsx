import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { localizedPath, useLocale } from "../i18n/locale";
import {
  ABOUT_SEO,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_PATH,
  HOME_SEO,
  PERSON_NAME,
  SEO_KEYWORDS,
  SITE_URL,
  SPANISH_ABOUT_SEO,
  SPANISH_HOME_SEO,
  SPANISH_OG_IMAGE_ALT,
  createAboutPageSchema,
  createHomePageSchema,
} from "../seo";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, hrefLang?: string) {
  const languageSelector = hrefLang ? `[hreflang="${hrefLang}"]` : "";
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]${languageSelector}`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    if (hrefLang) element.setAttribute("hreflang", hrefLang);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: unknown) {
  let element = document.head.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.dataset.seoId = id;
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

function toAbsoluteUrl(origin: string, path: string) {
  return new URL(path, origin).toString();
}

type WorkSeoEntry = { id: string; title: string; summary: string };

const WORK_SEO = {
  title: "Selected work | Lautaro Cortez",
  description: "Software engineering and product design case studies by Lautaro Cortez, including work at Lateral and other projects.",
  path: "/work",
  type: "website",
};
const SPANISH_WORK_SEO = {
  ...WORK_SEO,
  title: "Proyectos seleccionados | Lautaro Cortez",
  description: "Casos de ingeniería de software y diseño de producto de Lautaro Cortez, con trabajos en Lateral y otros proyectos.",
};

export function SeoManager({ workEntries }: { workEntries: WorkSeoEntry[] }) {
  const location = useLocation();
  const locale = useLocale();

  useEffect(() => {
    const pathname = localizedPath(location.pathname, "en");
    const isAboutPage = pathname === ABOUT_SEO.path;
    const homeSeo = locale === "es" ? SPANISH_HOME_SEO : HOME_SEO;
    const aboutSeo = locale === "es" ? SPANISH_ABOUT_SEO : ABOUT_SEO;
    const indexSeo = locale === "es" ? SPANISH_WORK_SEO : WORK_SEO;
    const work = workEntries.find(({ id }) => pathname === `/projects/${id}`);
    const workSeo = work && {
      title: `${work.title} | Lautaro Cortez`,
      description: work.summary,
      path: pathname,
      type: "article",
    };
    const activeSeo = isAboutPage ? aboutSeo : workSeo ?? (pathname === "/work" ? indexSeo : homeSeo);
    const canonicalUrl = toAbsoluteUrl(SITE_URL, localizedPath(activeSeo.path, locale));
    const imageUrl = toAbsoluteUrl(SITE_URL, DEFAULT_OG_IMAGE_PATH);
    const schema = isAboutPage ? createAboutPageSchema(SITE_URL, locale)
      : workSeo || pathname === "/work"
        ? {
          "@context": "https://schema.org",
          "@type": workSeo ? "WebPage" : "CollectionPage",
          name: activeSeo.title,
          description: activeSeo.description,
          url: canonicalUrl,
          inLanguage: locale,
        }
        : createHomePageSchema(SITE_URL, locale);

    document.title = activeSeo.title;
    document.documentElement.lang = locale;

    upsertMeta("name", "description", activeSeo.description);
    upsertMeta("name", "keywords", SEO_KEYWORDS.join(", "));
    upsertMeta("name", "author", PERSON_NAME);
    upsertMeta(
      "name",
      "robots",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );
    upsertMeta("name", "theme-color", "#050807");
    upsertMeta("property", "og:locale", locale === "es" ? "es_AR" : "en_US");
    upsertMeta("property", "og:locale:alternate", locale === "es" ? "en_US" : "es_AR");
    upsertMeta("property", "og:type", activeSeo.type);
    upsertMeta("property", "og:site_name", PERSON_NAME);
    upsertMeta("property", "og:title", activeSeo.title);
    upsertMeta("property", "og:description", activeSeo.description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:image:alt", locale === "es" ? SPANISH_OG_IMAGE_ALT : DEFAULT_OG_IMAGE_ALT);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", activeSeo.title);
    upsertMeta("name", "twitter:description", activeSeo.description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertLink("canonical", canonicalUrl);
    const englishUrl = toAbsoluteUrl(SITE_URL, localizedPath(activeSeo.path, "en"));
    upsertLink("alternate", englishUrl, "en");
    upsertLink("alternate", toAbsoluteUrl(SITE_URL, localizedPath(activeSeo.path, "es")), "es");
    upsertLink("alternate", englishUrl, "x-default");
    upsertJsonLd("route-schema", schema);
  }, [location.pathname, locale, workEntries]);

  return null;
}
