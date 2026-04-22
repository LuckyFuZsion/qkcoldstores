import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

const areasServed = [
  "Grantham",
  "Newark",
  "Nottingham",
  "Lincoln",
  "Leicester",
  "Peterborough",
]

export function LocationPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Preview */}
          <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-xl bg-secondary order-2 lg:order-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2402.5!2d-0.6936068!3d52.9659668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879dd0a5f3d5555%3A0x2b7a28f0c7a7e4c5!2sQK%20Cold%20Stores%20(Marston)%20Ltd!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="QK Cold Stores (Marston) Ltd Location"
              className="absolute inset-0"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/20 to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-electric-blue font-semibold text-sm uppercase tracking-wider">Location</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-deep-navy mt-3 mb-6 text-balance">
              Strategically Located in the East Midlands
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our facility in Marston, Grantham offers excellent transport links via A1 and A52, 
              providing efficient cold chain logistics across the region and nationwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-ice-blue/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-deep-navy" />
                </div>
                <span className="text-foreground">2 Toll Bar Road, Marston, Grantham, NG32 2HT</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-ice-blue/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-deep-navy" />
                </div>
                <a href="tel:+441234567890" className="text-foreground hover:text-electric-blue transition-colors">
                  01234 567 890
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-ice-blue/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-deep-navy" />
                </div>
                <a href="mailto:info@qkcoldstores.co.uk" className="text-foreground hover:text-electric-blue transition-colors">
                  info@qkcoldstores.co.uk
                </a>
              </div>
            </div>

            {/* Areas Served Tags */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-3">Areas we serve:</p>
              <div className="flex flex-wrap gap-2">
                {areasServed.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 bg-ice-blue/20 text-deep-navy rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
                <span className="px-3 py-1 bg-electric-blue/10 text-electric-blue rounded-full text-sm font-medium">
                  + More
                </span>
              </div>
            </div>

            {/* CTA */}
            <Button asChild size="lg" className="bg-electric-blue hover:bg-electric-blue/90 text-white">
              <Link href="/location">
                Get Directions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
