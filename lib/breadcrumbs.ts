import { SITE_URL } from "@/lib/site-config"

export type BreadcrumbItem = {
  name: string
  path: string
}

export function breadcrumbsFor(path: string, pageName: string): BreadcrumbItem[] {
  return [
    { name: "Home", path: "/" },
    { name: pageName, path },
  ]
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  }
}
