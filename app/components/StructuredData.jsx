import { siteUrl } from "@/app/lib/site-url";
import { faqs } from "@/app/data/agency";
export function StructuredData({
  faq = false,
  service = null,
  answers = null,
  page = null,
  project = null,
}) {
  const org = {
    "@type": "Organization",
    "@id": siteUrl + "/#organization",
    name: "Grid & Logic",
    alternateName: ["Grid and Logic", "Gridandlogic"],
    url: siteUrl + "/",
    logo: siteUrl + "/icon-512.png",
    email: "info@gridandlogic.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Project enquiries",
      email: "info@gridandlogic.com",
      telephone: "+923374992211",
      availableLanguage: "English",
    },
    telephone: "+923374992211",
    description:
      "An independent digital agency and product studio building websites, ecommerce stores, 3D configurators, brand identities, and digital marketing creative for businesses worldwide.",
    sameAs: [
      "https://www.instagram.com/gridandlogic/",
      "https://www.facebook.com/profile.php?id=61592258005096",
      "https://www.threads.com/@gridandlogic",
    ],
  };
  const graph = [
    org,
    {
      "@type": "WebSite",
      "@id": siteUrl + "/#website",
      name: "Grid & Logic",
      url: siteUrl + "/",
      publisher: { "@id": org["@id"] },
    },
  ];
  if (faq || answers)
    graph.push({
      "@type": "FAQPage",
      mainEntity: (answers || faqs).map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: {
          "@type": "Answer",
          text: a.replaceAll("gridandlogic@gmail.com", "info@gridandlogic.com"),
        },
      })),
    });
  if (service) {
    graph.push({
      "@type": "Service",
      name: service.name,
      description: service.description,
      provider: { "@id": org["@id"] },
      url: siteUrl + `/services/${service.slug}/`,
    });
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: siteUrl + "/services/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.name,
          item: siteUrl + `/services/${service.slug}/`,
        },
      ],
    });
  }
  if (page) {
    graph.push({
      "@type": page.type || "WebPage",
      "@id": siteUrl + page.path + "#webpage",
      url: siteUrl + page.path,
      name: page.name,
      ...(page.description ? { description: page.description } : {}),
      isPartOf: { "@id": siteUrl + "/#website" },
      about: { "@id": org["@id"] },
      inLanguage: "en",
    });
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" },
        ...(page.parent
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: page.parent.name,
                item: siteUrl + page.parent.path,
              },
            ]
          : []),
        {
          "@type": "ListItem",
          position: page.parent ? 3 : 2,
          name: page.name,
          item: siteUrl + page.path,
        },
      ],
    });
  }
  if (project)
    graph.push({
      "@type": "CreativeWork",
      "@id": siteUrl + `/work/${project.slug}/#project`,
      name: `${project.name} — ${project.category}`,
      description: project.description,
      url: siteUrl + `/work/${project.slug}/`,
      image: siteUrl + `/assets/${project.image}`,
      creator: { "@id": org["@id"] },
      mainEntityOfPage: { "@id": siteUrl + `/work/${project.slug}/#webpage` },
    });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
