import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export function CTASection() {
  return (
    <section className="py-24 bg-deep-navy relative overflow-hidden">
      {/* Background pattern removed */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Text */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
              Ready to Streamline Your Cold Chain?
            </h2>
            <p className="text-xl text-ice-blue/80 mb-8 text-pretty">
              Contact us today to discuss your cold storage requirements. 
              Our team is ready to create a tailored solution for your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white font-semibold text-lg px-8 py-6 bg-transparent"
              >
                <a href="tel:+441234567890">
                  <Phone className="mr-2 h-5 w-5" />
                  01234 567 890
                </a>
              </Button>
            </div>

            <p className="text-ice-blue/60 text-sm">
              24/7 Operations | BRC Accredited | Serving the East Midlands &amp; Beyond
            </p>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6">Send Us a Message</h3>
            <ContactForm variant="compact" />
          </div>
        </div>
      </div>
    </section>
  )
}
