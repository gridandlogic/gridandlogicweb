// Editorial content based on the agency's stated services and project scope.
// Keep prices, dates, client quotes and measured results out until substantiated.
export const serviceAnswers = {
  "web-development": [
    [
      "What does a business website project include?",
      "A website project can include page planning, responsive design, frontend development, enquiry forms, search metadata, and launch checks. Grid & Logic agrees the pages, content responsibilities, integrations, and handover in the proposal.",
    ],
    [
      "Can you redesign an existing website?",
      "Yes. Share your current website and the problems you want to solve. We can scope an update or a rebuild around navigation, mobile usability, content, performance, and the customer journey. Existing URLs and redirects should be planned before launch.",
    ],
    [
      "What should I prepare before a website project?",
      "Prepare your business goals, audience, logo, service or product details, existing domain access, and examples you like. Tell us which pages and integrations you need and who will maintain the site after handover.",
    ],
  ],
  ecommerce: [
    [
      "How is an ecommerce website different from a catalogue?",
      "An ecommerce website lets customers add products to a cart and complete a purchase. A catalogue focuses on browsing products and sending an enquiry. The right approach depends on how you price, fulfil, and sell your products.",
    ],
    [
      "What do you need to scope an online store?",
      "Share the approximate product count, variants, target markets, payment and shipping requirements, and how you manage stock. These details determine the storefront structure and the integrations needed.",
    ],
    [
      "Can customers shop on mobile?",
      "We plan responsive product, cart, and checkout journeys. The agreed payment providers and shipping rules still need to be configured and tested for the markets you serve before launch.",
    ],
  ],
  "3d-configurators": [
    [
      "What is a 3D product configurator?",
      "A 3D product configurator is an interactive website experience where customers explore a product and change available options, such as colours, materials, or components. Product rules determine which combinations are possible.",
    ],
    [
      "What is needed to build a 3D configurator?",
      "We need product dimensions, available options, reference images or suitable 3D models, and the rules for valid combinations. Pricing, quote requests, ecommerce connections, and model preparation are scoped separately for each project.",
    ],
    [
      "Will a browser-based 3D experience work on phones?",
      "Browser-based 3D can run on compatible mobile devices. Model complexity, texture sizes, lighting, and device capability affect performance. We agree target devices and plan optimisation and fallback presentation during scoping.",
    ],
  ],
  "digital-marketing": [
    [
      "What digital marketing work does Grid & Logic offer?",
      "Our stated digital marketing scope covers social content planning, branded creatives, campaign messaging, launch assets, and campaign landing pages. We agree the channels, asset formats, approval process, and publishing responsibilities before work begins.",
    ],
    [
      "Can you create content that matches our brand?",
      "Yes. We use your existing identity and messaging or scope a brand identity project alongside the content. Providing brand guidelines, product information, and approved imagery helps keep the work consistent.",
    ],
    [
      "How should campaign success be measured?",
      "Choose measures that match the goal: qualified enquiries for lead generation, purchases for ecommerce, or relevant audience engagement for content. Agree the baseline, tracking access, and reporting scope before the campaign launches.",
    ],
  ],
  branding: [
    [
      "What is included in a brand identity?",
      "A brand identity can include logo direction, colour and typography systems, digital guidelines, and reusable social templates. Grid & Logic defines the exact assets, file formats, and usage guidance in the project scope.",
    ],
    [
      "Can you work with an existing logo?",
      "Yes. Share the original logo files and any current guidelines. We can scope a visual refresh, a supporting design system, or a website and content direction around your existing identity.",
    ],
    [
      "Can branding and website development be one project?",
      "Yes. Combining the work helps connect the identity with page design, messaging, and launch content. The proposal sets the deliverables and approval milestones for each stage.",
    ],
  ],
  "seo-performance": [
    [
      "What is the difference between SEO, AEO, and GEO?",
      "SEO helps search engines discover and understand useful website pages. AEO focuses on clear answers to user questions. GEO focuses on content and business information that generative search systems can understand and cite. These approaches share the need for crawlable, accurate, useful content.",
    ],
    [
      "Does structured data guarantee rankings or AI citations?",
      "No. Structured data describes visible content and relationships. Search engines decide whether to crawl, index, rank, or cite a page. Relevant content, technical quality, reputation, competition, and ongoing improvement all matter.",
    ],
    [
      "What is included in a technical SEO review?",
      "A review can cover crawl access, indexable pages, canonical URLs, metadata, heading structure, internal links, sitemap coverage, structured data, and loading performance. Search Console and Bing Webmaster Tools access helps confirm how search engines see the site.",
    ],
  ],
};

export const projects = [
  {
    slug: "pixel-nest",
    name: "Pixel Nest",
    category: "Agency website & sprint board",
    description:
      "Grid & Logic’s work with Pixel Nest: an agency website and a sprint board to support the team’s workflow.",
    image: "pixelnest-current.webp",
    external: "https://pixelnestagy.vercel.app/",
    intro:
      "A website introduces an agency to prospective clients. A sprint board supports the work behind that public presence. Our collaboration with Pixel Nest covered both parts of that experience.",
    scope: [
      "Agency website design and development",
      "Sprint board for organising the team’s workflow",
    ],
    sections: [
      [
        "A public presence for the agency",
        "The website gives Pixel Nest a place to present its agency online. This part of the collaboration covered website design and development, bringing the public-facing experience into one digital destination.",
      ],
      [
        "A workspace for delivery",
        "The sprint board supports the team’s workflow alongside the website work. It addresses a different need: keeping project work organised while the public website introduces the agency.",
      ],
    ],
    services: ["web-development", "branding"],
  },
  {
    slug: "zaka-engineering",
    name: "Zaka Engineering",
    category: "Website update & product catalogue",
    description:
      "Grid & Logic’s work for Zaka Engineering: an updated website and a product catalogue for a container engineering business.",
    image: "zaka.webp",
    external: "https://zakaengineeringcontainers.vercel.app/",
    intro:
      "For a container engineering business, the website and catalogue help prospective customers understand the offering before starting a conversation. Our work with Zaka Engineering covered a website update and catalogue.",
    scope: [
      "Website update for the engineering business",
      "Product catalogue presentation",
    ],
    sections: [
      [
        "An updated digital presence",
        "The website update brings Zaka Engineering’s business presentation into a dedicated online experience. The work focuses on communicating the business and giving prospective customers a place to explore it.",
      ],
      [
        "Product information in one place",
        "The catalogue supports product discovery alongside the company website. Together, the website and catalogue provide a clearer starting point for customers researching the business’s container offering.",
      ],
    ],
    services: ["web-development", "ecommerce"],
  },
];
