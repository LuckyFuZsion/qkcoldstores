import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { LocationSections } from "@/components/location-sections"

export const metadata: Metadata = {
  title: "Location | QK Coldstores",
  description: "Find QK Coldstores in Marston, Grantham. Strategically located for easy access across the East Midlands with excellent transport links.",
}

export default function LocationPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <PageHero
        title={<>Our <span className="text-electric-blue">Location</span></>}
        subtitle="Located directly adjacent to the A1, five miles north of Grantham in Lincolnshire."
      />

      <LocationSections />

      <Footer />
    </main>
  )
}
