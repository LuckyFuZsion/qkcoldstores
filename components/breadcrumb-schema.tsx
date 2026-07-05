import { JsonLdScript } from "@/components/json-ld-script"
import { buildBreadcrumbJsonLd, type BreadcrumbItem } from "@/lib/breadcrumbs"

type BreadcrumbSchemaProps = {
  items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  return <JsonLdScript data={buildBreadcrumbJsonLd(items)} />
}
