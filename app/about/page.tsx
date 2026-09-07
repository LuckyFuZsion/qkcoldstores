import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { AboutSections } from "@/components/about-sections"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { WebPageSchema } from "@/components/webpage-schema"
import { breadcrumbsFor } from "@/lib/breadcrumbs"

import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "About Us | QK Cold Stores",
  description:
    "Learn about QK Cold Stores - 40+ years of cold storage excellence in Grantham and the East Midlands. Family values, modern facilities.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <WebPageSchema
        path="/about"
        name="About Us | QK Cold Stores"
        description={metadata.description as string}
      />
      <BreadcrumbSchema items={breadcrumbsFor("/about", "About Us")} />
      <main>
      <Header />

      <PageHero
        title={<>About <span className="text-electric-blue">QK Cold Stores</span></>}
        subtitle="Providers of temperature-controlled storage services for an ever-growing food industry, with over 40 years of experience."
      />

      <AboutSections />

      <Footer />
    </main>
    </>
  )
}
