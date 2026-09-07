import { JsonLdScript } from "@/components/json-ld-script"
import { buildWebPageJsonLd } from "@/lib/json-ld"

type WebPageSchemaProps = {
  path: string
  name: string
  description: string
}

export function WebPageSchema({ path, name, description }: WebPageSchemaProps) {
  return <JsonLdScript data={buildWebPageJsonLd({ path, name, description })} />
}
