import type { MetadataRoute } from "next"
import { PUBLIC_ROUTES, SITE_URL } from "@/lib/site-config"

const SITEMAP_ROUTES = PUBLIC_ROUTES.filter((path) => path !== "/portal")

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return SITEMAP_ROUTES.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }))
}
