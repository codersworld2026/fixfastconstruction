import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description: string;
  /** Absolute canonical URL, e.g. https://fixfastconstruction.com/contact */
  canonical: string;
}

/**
 * Per-route SEO. Updates the document <title>, the meta description and the
 * canonical <link> on mount and whenever the values change. This keeps each
 * route's canonical pointing at its own URL instead of the homepage.
 */
export function useSeo({ title, description, canonical }: SeoOptions) {
  useEffect(() => {
    document.title = title;
    setMetaByName("description", description);
    setCanonical(canonical);
  }, [title, description, canonical]);
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
