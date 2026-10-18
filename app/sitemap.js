import { siteUrl } from "@/app/lib/site-url";
import { servicePages } from "@/app/data/agency";
export default function sitemap() {
  return [
    "/",
    "/services/",
    ...servicePages.map((s) => `/services/${s.slug}/`),
    "/privacy/",
  ].map((path) => ({
    url: siteUrl + path,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/privacy/" ? 0.2 : 0.8,
  }));
}
