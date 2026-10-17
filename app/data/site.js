/**
 * Every piece of site copy, contact detail, and project reference lives here so
 * sections stay presentational and content edits happen in one place.
 */

const CALL_SUBJECT = encodeURIComponent("Project enquiry — Grid & Logic");

export const site = {
  name: "Grid & Logic",
  shortDescription:
    "A digital product studio building 3D websites, product configurators, and ecommerce stores for growing brands.",
  email: "info@gridandlogic.com",
  emailHref: `mailto:info@gridandlogic.com?subject=${CALL_SUBJECT}`,
  phone: "0337 499 2211",
  phoneHref: "tel:+923374992211",
  whatsapp: "0337 499 2211",
  whatsappHref: "https://wa.me/923374992211",
  logo: "/Grid%20%26%20Logic%20(LOGO).svg",
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export const heroStats = [
  { value: "16+", label: "Years of combined experience" },
  { value: "3D", label: "Real-time configurators in production" },
  { value: "Global", label: "Remote-first, client work worldwide" },
];

export const capabilities = [
  "Real-time 3D",
  "Product configurators",
  "Headless ecommerce",
  "Next.js engineering",
  "Conversion design",
  "Brand systems",
  "Performance audits",
  "Motion design",
];

export const services = [
  {
    id: "configurators",
    index: "01",
    title: "3D Configurators",
    summary:
      "Real-time product configurators that let customers choose materials, see the result instantly, and buy with confidence.",
    points: ["WebGL / Three.js", "Variant & pricing logic", "Mobile-first performance"],
    image: "/images/sofa-configrator.png",
    imageAlt: "Sofa configurator interface with material options",
  },
  {
    id: "ecommerce",
    index: "02",
    title: "Web & Ecommerce",
    summary:
      "Marketing sites and online stores engineered around one number: how many visitors turn into customers.",
    points: ["Storefront build", "Checkout optimisation", "Analytics & tracking"],
    image: "/images/ecomerce%20website.png",
    imageAlt: "Ecommerce storefront layout",
  },
  {
    id: "brand",
    index: "03",
    title: "Brand & Content",
    summary:
      "Identity systems, social content, and campaign creative that make the product feel like it belongs to a real company.",
    points: ["Visual identity", "Social content", "Launch campaigns"],
    image: "/images/image-36.png",
    imageAlt: "Brand and content design samples",
  },
];

export const projects = [
  {
    title: "Sofa Configurator",
    category: "Product configurator",
    result: "Real-time material and colour switching in the browser",
    image: "/images/sofa-configrator.png",
    href: "https://abdulahad2468.github.io/sofa-configrator/",
    year: "2026",
    featured: true,
  },
  {
    title: "Pixel Nest Agency",
    category: "Agency website",
    result: "Full brand site with motion-led storytelling",
    image: "/images/pixelnest.png",
    href: "https://pixelnestagy.vercel.app",
    year: "2026",
  },
  {
    title: "Clothing Store",
    category: "Ecommerce",
    result: "Catalogue, cart, and checkout for an apparel brand",
    image: "/images/clothing%20store.png",
    href: "https://clothing-lovat.vercel.app/",
    year: "2026",
  },
  {
    title: "Multi-brand Storefront",
    category: "Ecommerce",
    result: "Product discovery and checkout built to scale",
    image: "/images/ecomerce%20website.png",
    href: "https://e-commerce-chi-eight-35.vercel.app/",
    year: "2026",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We dig into your business, customers, and numbers to find where the real opportunity is.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "We agree the solution, the scope, and a plan with dates — before any design work starts.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "We design the interface and the interactions, working in the browser as early as possible.",
  },
  {
    number: "04",
    title: "Develop",
    description:
      "We build, test, and launch it, then measure how it performs and iterate on what we learn.",
  },
];

export const testimonial = {
  quote: "Creative, reliable, and always one step ahead.",
  body:
    "Working with Grid & Logic transformed our online presence. They built our website, grew our social channels, and delivered design we're genuinely proud of.",
  name: "Ammar",
  role: "CEO, Pixel Nest",
  avatar: "/images/ammar.png",
};

export const posts = [
  {
    date: "2026-08-07",
    dateLabel: "7 Aug 2026",
    category: "Projects",
    title: "Shipping a web configurator that actually converts",
    excerpt:
      "What we changed in the buying journey to turn a 3D toy into a tool that closes sales.",
    image: "/images/image-34.png",
  },
  {
    date: "2026-08-07",
    dateLabel: "7 Aug 2026",
    category: "Social",
    title: "Social content patterns that keep working",
    excerpt:
      "The handful of post formats we return to for clients, and why they hold attention.",
    image: "/images/image-35.png",
  },
  {
    date: "2026-08-07",
    dateLabel: "7 Aug 2026",
    category: "Design",
    title: "Building a brand system a small team can run",
    excerpt:
      "How we scope identity work so it survives contact with a real marketing calendar.",
    image: "/images/image-36.png",
  },
];

export const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/gridandlogic/",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61592258005096",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@gridandlogic",
  },
];
