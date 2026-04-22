import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Car, Truck, Building2 } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Location | QK Coldstores",
  description: "Find QK Coldstores in Marston, Grantham. Strategically located for easy access across the East Midlands with excellent transport links.",
}

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "QK Cold Stores (Marston) Ltd\n2 Toll Bar Road\nMarston, Grantham\nNG32 2HT",
    href: "https://maps.google.com/?q=QK+Cold+Stores+(Marston)+Ltd,+2+Toll+Bar+Road,+Marston,+Grantham+NG32+2HT",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "01234 567 890",
    href: "tel:+441234567890",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@qkcoldstores.co.uk",
    href: "mailto:info@qkcoldstores.co.uk",
  },
  {
    icon: Clock,
    label: "Operations",
    value: "24/7 Operations\nOffice: Mon-Fri 8am-6pm",
    href: null,
  },
]

const transportLinks = [
  {
    icon: Car,
    title: "By Car",
    description: "Easy access from A1 and A52. Ample parking available for visitors.",
  },
  {
    icon: Truck,
    title: "HGV Access",
    description: "Purpose-built loading bays with 24/7 access for deliveries and collections.",
  },
  {
    icon: Building2,
    title: "Central Location",
    description: "Strategically positioned in the heart of the East Midlands logistics corridor.",
  },
]

const areasServed = [
  "Grantham",
  "Marston",
  "Newark",
  "Sleaford",
  "Stamford",
  "Melton Mowbray",
  "Bourne",
  "Oakham",
  "Nottingham",
  "Lincoln",
  "Leicester",
  "Peterborough",
]

export default function LocationPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-deep-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Our Location
          </h1>
          <p className="text-xl text-ice-blue/80 max-w-2xl mx-auto text-pretty">
            Located directly adjacent to the A1, five miles north of Grantham in Lincolnshire
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="relative h-[400px] lg:h-full min-h-[400px] rounded-xl overflow-hidden shadow-xl bg-secondary">
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
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              
              {contactInfo.map((item) => (
                <Card key={item.label} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-6 w-6 text-electric-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-muted-foreground hover:text-electric-blue transition-colors whitespace-pre-line"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground whitespace-pre-line">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button asChild size="lg" className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=QK+Cold+Stores+(Marston)+Ltd,+2+Toll+Bar+Road,+Marston,+Grantham+NG32+2HT"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Transport Links */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Getting Here</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our facility is designed for easy access by all vehicle types
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {transportLinks.map((link) => (
              <Card key={link.title} className="text-center border-border/50">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-deep-navy/10 flex items-center justify-center mx-auto mb-6">
                    <link.icon className="h-8 w-8 text-deep-navy" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{link.title}</h3>
                  <p className="text-muted-foreground">{link.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Areas We Serve</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Providing cold storage and logistics services across the East Midlands and beyond
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {areasServed.map((area) => (
              <span
                key={area}
                className="px-4 py-2 bg-ice-blue/20 text-deep-navy rounded-full font-medium text-sm"
              >
                {area}
              </span>
            ))}
            <span className="px-4 py-2 bg-electric-blue text-white rounded-full font-medium text-sm">
              + Nationwide Distribution
            </span>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/services">
                View Our Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
