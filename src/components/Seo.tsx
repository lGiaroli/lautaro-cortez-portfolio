import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ABOUT_SEO,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_PATH,
  HOME_SEO,
  PERSON_NAME,
  SEO_KEYWORDS,
  SITE_URL,
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

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
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

export function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const isAboutPage = location.pathname === ABOUT_SEO.path;
    const activeSeo = isAboutPage ? ABOUT_SEO : HOME_SEO;
    const canonicalUrl = toAbsoluteUrl(SITE_URL, activeSeo.path);
    const imageUrl = toAbsoluteUrl(SITE_URL, DEFAULT_OG_IMAGE_PATH);
    const schema = isAboutPage
      ? createAboutPageSchema(SITE_URL)
      : createHomePageSchema(SITE_URL);

    document.title = activeSeo.title;
    document.documentElement.lang = "en";

    upsertMeta("name", "description", activeSeo.description);
    upsertMeta("name", "keywords", SEO_KEYWORDS.join(", "));
    upsertMeta("name", "author", PERSON_NAME);
    upsertMeta(
      "name",
      "robots",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );
    upsertMeta("name", "theme-color", "#050807");
    upsertMeta("property", "og:locale", "en_US");
    upsertMeta("property", "og:type", activeSeo.type);
    upsertMeta("property", "og:site_name", PERSON_NAME);
    upsertMeta("property", "og:title", activeSeo.title);
    upsertMeta("property", "og:description", activeSeo.description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:image:alt", DEFAULT_OG_IMAGE_ALT);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", activeSeo.title);
    upsertMeta("name", "twitter:description", activeSeo.description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertLink("canonical", canonicalUrl);
    upsertJsonLd("route-schema", schema);
  }, [location.pathname]);

  return null;
}
