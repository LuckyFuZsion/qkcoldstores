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
      <section className="relative min-h-[40svh] flex items-center justify-center overflow-hidden bg-deep-navy">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-30"
            style={{
              backgroundImage: "url('/landscape.png')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-deep-navy/90 via-deep-navy/80 to-deep-navy/70 pointer-events-none" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            Frequently Asked <span className="text-electric-blue">Questions</span>
          </h1>
          <p className="text-xl md:text-2xl text-ice-blue/90 max-w-3xl mx-auto font-medium leading-relaxed">
            Find answers to common questions about our cold storage services and facilities.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="bg-white">
        <FAQSection />
      </div>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-deep-navy mb-8 tracking-tight leading-[1.1]">
            Still Have <span className="text-electric-blue text-glow">Questions?</span>
          </h2>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
            Our team is happy to answer any questions you may have about our services.
          </p>
          <Button asChild size="lg" className="bg-deep-navy text-white hover:bg-black font-bold px-10 py-8 rounded-2xl shadow-xl">
            <Link href="/contact">
              Contact Us
              <ChevronRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
