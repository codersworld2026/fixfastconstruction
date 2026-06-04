import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description: string;
  /** Absolute canonical URL, e.g. https://fixfastconstruction.com/contact */
  canonical: string;
  /** Optional JSON-LD structured data injected into <head> for this route. */
  jsonLd?: object | null;
}

/**
 * Per-route SEO. Updates the document <title>, the meta description, the
 * canonical <link> and optional JSON-LD on mount and whenever the values
 * change. This keeps each route's metadata pointing at its own URL instead
 * of the homepage.
 */
export function useSeo({ title, description, canonical, jsonLd }: SeoOptions) {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    document.title = title;
    setMetaByName("description", description);
    setCanonical(canonical);
    setJsonLd(jsonLdString);
  }, [title, description, canonical, jsonLdString]);
}

function setMetaByName(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[name="${name}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSON_LD_ID = "seo-jsonld";

function setJsonLd(json: string) {
  let el = document.head.querySelector<HTMLScriptElement>(`#${JSON_LD_ID}`);
  if (!json) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = JSON_LD_ID;
    document.head.appendChild(el);
  }
  el.textContent = json;
}
