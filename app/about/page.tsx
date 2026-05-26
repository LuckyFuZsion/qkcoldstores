import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { AboutSections } from "@/components/about-sections"

export const metadata = {
  title: "About Us | QK Coldstores",
  description: "Learn about QK Cold Stores - 30+ years of cold storage excellence in Grantham and the East Midlands. Family values, modern facilities.",
}

export default function AboutPage() {
  return (
    <main>
      <Header />

      <PageHero
        title={<>About <span className="text-electric-blue">QK Coldstores</span></>}
        subtitle="Providers of temperature-controlled storage services for an ever-growing food industry, with over 30 years of experience."
      />

      <AboutSections />

      <Footer />
    </main>
  )
}
