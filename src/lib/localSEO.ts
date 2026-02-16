import { BASE_URL } from "@/config/nav";

/**
 * Local SEO helpers — structured data builders for city-specific landing pages.
 */

export interface CityData {
    /** City name, e.g. "Eindhoven" */
    name: string;
    /** URL slug, e.g. "eindhoven" */
    slug: string;
    /** Region/province, e.g. "Noord-Brabant" */
    region: string;
    /** Postal code (optional, for schema) */
    postalCode?: string;
    /** Province short, e.g. "Brabant" */
    provinceShort: string;
}

/** All cities for local SEO pages */
export const LOCAL_CITIES: CityData[] = [
    { name: "Eindhoven", slug: "eindhoven", region: "Noord-Brabant", provinceShort: "Brabant", postalCode: "5600" },
    { name: "Helmond", slug: "helmond", region: "Noord-Brabant", provinceShort: "Brabant", postalCode: "5700" },
    { name: "Roosendaal", slug: "roosendaal", region: "Noord-Brabant", provinceShort: "Brabant", postalCode: "4700" },
    { name: "Tilburg", slug: "tilburg", region: "Noord-Brabant", provinceShort: "Brabant", postalCode: "5000" },
    { name: "Utrecht", slug: "utrecht", region: "Utrecht", provinceShort: "Utrecht", postalCode: "3500" },
    { name: "Veldhoven", slug: "veldhoven", region: "Noord-Brabant", provinceShort: "Brabant", postalCode: "5500" },
    { name: "Weert", slug: "weert", region: "Limburg", provinceShort: "Limburg", postalCode: "6000" },
    { name: "Limburg", slug: "limburg", region: "Limburg", provinceShort: "Limburg" },
    { name: "Nijmegen", slug: "nijmegen", region: "Gelderland", provinceShort: "Gelderland", postalCode: "6500" },
    { name: "Oss", slug: "oss", region: "Noord-Brabant", provinceShort: "Brabant", postalCode: "5340" },
];

/** Build LocalBusiness + Service structured data for a city page */
export function buildLocalServiceSchema(city: CityData): Record<string, unknown>[] {
    const pageUrl = `${BASE_URL}/diensten/keuken-wrapping/${city.slug}`;

    return [
        {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${BASE_URL}/#organization`,
            name: "Renovawrap",
            url: BASE_URL,
            telephone: "+31 (0)6 12345678",
            image: `${BASE_URL}/og-image.png`,
            priceRange: "€€",
            areaServed: {
                "@type": city.slug === "limburg" ? "State" : "City",
                name: city.name,
                ...(city.postalCode ? { postalCode: city.postalCode } : {}),
            },
            address: {
                "@type": "PostalAddress",
                addressLocality: "Helmond",
                addressRegion: "Noord-Brabant",
                addressCountry: "NL",
            },
            geo: {
                "@type": "GeoCoordinates",
                latitude: 51.4816,
                longitude: 5.6611,
            },
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "87",
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Keuken Wrapping ${city.name}`,
            description: `Professionele keuken wrapping in ${city.name} en omgeving. Transformeer uw keuken tot 70% goedkoper zonder sloopwerk.`,
            url: pageUrl,
            provider: {
                "@type": "LocalBusiness",
                name: "Renovawrap",
                url: BASE_URL,
            },
            areaServed: {
                "@type": city.slug === "limburg" ? "State" : "City",
                name: city.name,
            },
            serviceType: "Keuken Wrapping",
            offers: {
                "@type": "Offer",
                availability: "https://schema.org/InStock",
                areaServed: {
                    "@type": city.slug === "limburg" ? "State" : "City",
                    name: city.name,
                },
            },
        },
    ];
}

/** Build breadcrumb schema for local page */
export function buildLocalBreadcrumbs(city: CityData): Record<string, unknown>[] {
    return [{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Diensten", item: `${BASE_URL}/diensten` },
            { "@type": "ListItem", position: 3, name: "Keuken Wrapping", item: `${BASE_URL}/diensten/keuken-wrapping` },
            { "@type": "ListItem", position: 4, name: `Keuken Wrapping ${city.name}`, item: `${BASE_URL}/diensten/keuken-wrapping/${city.slug}` },
        ],
    }];
}
