import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesPreview } from "@/components/services-preview"
import { EnvironmentPreview } from "@/components/environment-preview"
import { WhyChooseUs } from "@/components/why-choose-us"
import { LocationPreview } from "@/components/location-preview"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { JsonLdScript } from "@/components/json-ld-script"
import { buildLocalBusinessJsonLd } from "@/lib/json-ld"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "QK Coldstores | Cold Storage and Logistics in Grantham",
  description:
    "QK Coldstores provides premium temperature-controlled warehousing, blast freezing, and distribution services in Grantham, Marston and the East Midlands.",
  path: "/",
})

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={buildLocalBusinessJsonLd()} />
      <main>
        <Header />
        <HeroSection />
        <AboutSection />
        <ServicesPreview />
        <EnvironmentPreview />
        <WhyChooseUs />
        <LocationPreview />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
