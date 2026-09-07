import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { ServicesSections } from "@/components/services-sections"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { WebPageSchema } from "@/components/webpage-schema"
import { breadcrumbsFor } from "@/lib/breadcrumbs"

import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "Services | QK Cold Stores",
  description:
    "QK Cold Stores services in Grantham: large-scale cold storage, blast freezing and tempering, fresh packing and cold store handling.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <>
      <WebPageSchema
        path="/services"
        name="Services | QK Cold Stores"
        description={metadata.description as string}
      />
      <BreadcrumbSchema items={breadcrumbsFor("/services", "Services")} />
      <main>
      <Header />

      <PageHero
        title={<>Our <span className="text-electric-blue">Services</span></>}
        subtitle="Large-scale cold storage, blast freezing and tempering, fresh packing and cold store handling - all from our Grantham facility."
      />

      <ServicesSections />

      <Footer />
    </main>
    </>
  )
}
