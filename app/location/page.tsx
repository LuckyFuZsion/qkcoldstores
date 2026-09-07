import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { LocationSections } from "@/components/location-sections"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { WebPageSchema } from "@/components/webpage-schema"
import { breadcrumbsFor } from "@/lib/breadcrumbs"

import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "Location | QK Cold Stores",
  description:
    "Find QK Cold Stores in Marston, Grantham. Strategically located for easy access across the East Midlands with excellent transport links.",
  path: "/location",
})

export default function LocationPage() {
  return (
    <>
      <WebPageSchema
        path="/location"
        name="Location | QK Cold Stores"
        description={metadata.description as string}
      />
      <BreadcrumbSchema items={breadcrumbsFor("/location", "Location")} />
      <main className="min-h-screen">
      <Header />

      <PageHero
        title={<>Our <span className="text-electric-blue">Location</span></>}
        subtitle="Located directly adjacent to the A1, five miles north of Grantham in Lincolnshire."
      />

      <LocationSections />

      <Footer />
    </main>
    </>
  )
}
