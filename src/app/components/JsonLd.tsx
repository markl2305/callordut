import { siteConfig } from "../../config/site";

/**
 * Site-wide structured data (schema.org JSON-LD). Rendered once in the root
 * layout so every page carries the organization/entity graph — this is what
 * search rich-results and AI answer engines read to identify and cite CalLord.
 */
export function JsonLd() {
  const base = siteConfig.website.replace(/\/$/, "");

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${base}/#org`,
        name: siteConfig.shortName,
        legalName: siteConfig.legalName,
        url: base,
        telephone: "+1-866-657-2383",
        email: siteConfig.email,
        slogan: siteConfig.tagline,
        description:
          "CalLord Unified Technologies designs, installs, and supports commercial security systems and audiovisual integration — two disciplines, one accountable partner, and an exclusive Forge platform partner.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "13170 Central Ave SE Suite B537",
          addressLocality: "Albuquerque",
          addressRegion: "NM",
          postalCode: "87123",
          addressCountry: "US",
        },
        areaServed: { "@type": "Country", name: "United States" },
        knowsAbout: [
          "commercial security systems",
          "access control",
          "video surveillance",
          "audiovisual integration",
          "smart conference rooms",
          "AV design and installation",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Security Integration" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Audiovisual Integration" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Smart Room Design" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Project Management" } },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: siteConfig.shortName,
        publisher: { "@id": `${base}/#org` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
