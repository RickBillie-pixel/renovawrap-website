import { useEffect } from "react";

export interface SEOProps {
    title: string;
    description: string;
    canonical: string;
    ogImage?: string;
    ogType?: string;
    robots?: string;
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = "https://renovawrap.nl";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

// ── SSR data collection ────────────────────────────────────────
// During renderToString, useEffect doesn't fire.
// Instead we capture SEO data synchronously during render.
let _ssrCollector: SEOProps | null = null;

/** Call before each renderToString to reset the collector */
export function startSSRCollection() {
    _ssrCollector = null;
}

/** Call after renderToString to retrieve collected SEO data */
export function getSSRSeoData(): SEOProps | null {
    return _ssrCollector;
}
// ───────────────────────────────────────────────────────────────

function setMetaTag(attr: string, key: string, content: string) {
    let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

function setLinkTag(rel: string, href: string, extraAttrs?: Record<string, string>): HTMLLinkElement {
    // Build a selector that includes extra attrs for uniqueness
    let selector = `link[rel="${rel}"]`;
    if (extraAttrs) {
        for (const [k, v] of Object.entries(extraAttrs)) {
            selector += `[${k}="${v}"]`;
        }
    }
    let el = document.querySelector(selector) as HTMLLinkElement | null;
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        if (extraAttrs) {
            for (const [k, v] of Object.entries(extraAttrs)) {
                el.setAttribute(k, v);
            }
        }
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
    return el;
}

export function useSEO({
    title,
    description,
    canonical,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
    robots = "index, follow",
    jsonLd,
}: SEOProps) {
    // SSR path: collect data synchronously during render
    if (typeof window === 'undefined') {
        _ssrCollector = { title, description, canonical, ogImage, ogType, robots, jsonLd };
    }

    useEffect(() => {
        // Title
        document.title = title;

        // Meta description
        setMetaTag("name", "description", description);

        // Robots
        setMetaTag("name", "robots", robots);

        // Canonical
        setLinkTag("canonical", canonical);

        // Open Graph
        setMetaTag("property", "og:title", title);
        setMetaTag("property", "og:description", description);
        setMetaTag("property", "og:url", canonical);
        setMetaTag("property", "og:image", ogImage);
        setMetaTag("property", "og:type", ogType);
        setMetaTag("property", "og:locale", "nl_NL");
        setMetaTag("property", "og:site_name", "Renovawrap");

        // Twitter
        setMetaTag("name", "twitter:card", "summary_large_image");
        setMetaTag("name", "twitter:title", title);
        setMetaTag("name", "twitter:description", description);
        setMetaTag("name", "twitter:image", ogImage);

        // JSON-LD structured data
        let scriptEl: HTMLScriptElement | null = null;
        if (jsonLd) {
            // Remove any previous useSEO JSON-LD
            const prev = document.querySelector('script[data-seo-jsonld]');
            if (prev) prev.remove();

            scriptEl = document.createElement("script");
            scriptEl.type = "application/ld+json";
            scriptEl.setAttribute("data-seo-jsonld", "true");
            scriptEl.textContent = JSON.stringify(jsonLd);
            document.head.appendChild(scriptEl);
        }

        return () => {
            // Clean up JSON-LD on unmount
            if (scriptEl && scriptEl.parentNode) {
                scriptEl.parentNode.removeChild(scriptEl);
            }
        };
    }, [title, description, canonical, ogImage, ogType, robots, jsonLd]);
}

// Helper to build BreadcrumbList JSON-LD (returns array for spread usage)
export function buildBreadcrumbs(
    items: Array<{ name: string; url: string }>
): Record<string, unknown>[] {
    return [{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }];
}

// Helper to build Service JSON-LD (returns array for spread usage)
export function buildServiceSchema(service: {
    name: string;
    description: string;
    url: string;
}): Record<string, unknown>[] {
    return [{
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: service.url,
        provider: {
            "@type": "LocalBusiness",
            name: "Renovawrap",
            url: "https://renovawrap.nl",
        },
        areaServed: {
            "@type": "Country",
            name: "NL",
        },
    }];
}

// Convenience shorthand: buildService(name, desc) auto-generates URL from name
export function buildService(name: string, description: string): Record<string, unknown>[] {
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    return buildServiceSchema({
        name,
        description,
        url: `https://renovawrap.nl/diensten/${slug}`,
    });
}

