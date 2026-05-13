import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/faq-section"
import { PageHero } from "@/components/page-hero"
import { FAQCta } from "@/components/faq-cta"

export const metadata = {
  title: "FAQ | QK Coldstores",
  description: "Frequently asked questions about QK Coldstores cold storage services, facilities, and capabilities in Grantham.",
}

export default function FAQPage() {
  return (
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
  )
}
