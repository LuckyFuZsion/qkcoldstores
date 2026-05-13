import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { AboutSections } from "@/components/about-sections"

export const metadata = {
  title: "About Us | QK Coldstores",
  description: "Learn about QK Coldstores - 25+ years of cold storage excellence in Grantham and the East Midlands. Family values, modern facilities.",
}

export default function AboutPage() {
  return (
    <main>
      <Header />

      <PageHero
        title={<>About <span className="text-electric-blue">QK Coldstores</span></>}
        subtitle="A family-run business with over 25 years of cold storage expertise in the heart of Lincolnshire."
      />

      <AboutSections />

      <Footer />
    </main>
  )
}
