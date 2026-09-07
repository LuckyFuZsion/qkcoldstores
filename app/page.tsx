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
import { buildHomePageJsonLd } from "@/lib/json-ld"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "QK Cold Stores | Cold Storage and Logistics in Grantham",
  description:
    "QK Cold Stores provides premium temperature-controlled warehousing, blast freezing, and distribution services in Grantham, Marston and the East Midlands.",
  path: "/",
})

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={buildHomePageJsonLd()} />
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
