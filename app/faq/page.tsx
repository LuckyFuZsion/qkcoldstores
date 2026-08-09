import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/faq-section"
import { PageHero } from "@/components/page-hero"
import { FAQCta } from "@/components/faq-cta"

import { JsonLdScript } from "@/components/json-ld-script"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { breadcrumbsFor } from "@/lib/breadcrumbs"
import { buildFAQPageJsonLd } from "@/lib/json-ld"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "FAQ | QK Cold Stores",
  description:
    "Frequently asked questions about QK Cold Stores cold storage services, facilities, and capabilities in Grantham.",
  path: "/faq",
})

export default function FAQPage() {
  return (
    <>
      <JsonLdScript data={buildFAQPageJsonLd()} />
      <BreadcrumbSchema items={breadcrumbsFor("/faq", "FAQ")} />
      <main>
      <Header />

      <PageHero
        title={<>Frequently Asked <span className="text-electric-blue">Questions</span></>}
        subtitle="Find answers to common questions about our cold storage services and facilities."
      />

      <div className="bg-background">
        <FAQSection />
      </div>

      <FAQCta />

      <Footer />
      </main>
    </>
  )
}
