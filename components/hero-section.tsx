import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100svh-5rem)] pt-20 flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/images/hero-bg.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-deep-navy/90 via-deep-navy/80 to-deep-navy/70 pointer-events-none" />
      </div>

      {/* Animated ice particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight text-balance">
            Precision Cold Storage{" "}
            <span className="text-electric-blue">&amp; Logistics</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl md:text-2xl text-ice-blue/90 mb-10 max-w-2xl mx-auto text-pretty">
            Grantham&apos;s premier temperature-controlled warehousing solution. 
            Trusted by businesses across the East Midlands.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-deep-navy hover:bg-ice-blue font-semibold text-lg px-8 py-6 shadow-xl"
            >
              <Link href="/services">
                What We Offer
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white font-semibold text-lg px-8 py-6 bg-transparent"
            >
              <Link href="/portal">Client Login</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">25+</div>
              <div className="text-ice-blue/70 text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">30K</div>
              <div className="text-ice-blue/70 text-sm">Pallet Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">24/7</div>
              <div className="text-ice-blue/70 text-sm">Operations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
