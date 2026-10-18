# Grid & Logic

Next.js 16 agency website with an Elite-inspired opening, Xallama-inspired navigation and footer, interactive Three.js artwork, image galleries, real project work, and separate live samples.

## Run

```sh
npm ci
npm run dev
npm run build
npm start
```

## Email and domain

See [HOSTINGER-SETUP.md](HOSTINGER-SETUP.md) for Hostinger SMTP, domain DNS, environment variables, and search launch instructions. Copy `.env.example` to `.env.local` for local development; add real credentials only in the hosting dashboard or your ignored local file. The endpoint is `/api/send`. No API key is needed for Hostinger SMTP.

## Editing

- `app/components/AgencyHero.jsx`: opening slideshow and floating UI illustrations.
- `app/components/BrandScene.jsx`: interactive Three.js brand mark, on the 3D slide.
- `app/components/AgencyWork.jsx`: portfolio, image-only configurator gallery, and three linked samples.
- `app/data/agency.js`: service content and FAQ copy.
- `app/agency-motion.css`, `app/reference-blend.css`: layout, reference direction, animation, and responsive styles.
- `app/api/send/route.js`: Hostinger SMTP with optional Resend fallback.

No links are published for the sofa or container configurators. Pixel Nest and Zaka link to their supplied websites. The sprint board and catalogue are described as deliverables; no separate URLs were supplied for them.

`npm run build` is the production validation. The visual preview export helper can copy prerendered pages to a static preview; SMTP needs the full Next.js deployment. The site includes metadata, six dedicated service pages, JSON-LD, a sitemap, robots.txt, llms.txt, rounded favicon, and mobile icons. Rankings and AI recommendations cannot be guaranteed.
