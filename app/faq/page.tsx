import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/faq-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata = {
  title: "FAQ | QK Coldstores",
  description: "Frequently asked questions about QK Coldstores cold storage services, facilities, and capabilities in Grantham.",
}

export default function FAQPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-deep-navy to-deep-navy/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-ice-blue/80 max-w-2xl mx-auto text-pretty">
            Find answers to common questions about our cold storage services and facilities
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
            Still have questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Our team is happy to answer any questions you may have about our services.
          </p>
          <Button asChild size="lg" className="bg-electric-blue hover:bg-electric-blue/90 text-white">
            <Link href="/location">
              Contact Us
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
