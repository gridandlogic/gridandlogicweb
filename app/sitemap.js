import { siteUrl } from "@/app/lib/site-url";
import { servicePages } from "@/app/data/agency";
import { projects } from "@/app/data/search-content";
export default function sitemap() {
  return [
    "/",
    "/services/",
    "/about/",
    "/work/",
    "/configurators/",
    ...projects.map((p) => `/work/${p.slug}/`),
    ...servicePages.map((s) => `/services/${s.slug}/`),
    "/privacy/",
  ].map((path) => ({
    url: siteUrl + path,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/privacy/" ? 0.2 : 0.8,
  }));
}
