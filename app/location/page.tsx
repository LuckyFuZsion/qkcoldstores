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
            Our <span className="text-electric-blue">Location</span>
          </h1>
          <p className="text-xl md:text-2xl text-ice-blue/90 max-w-3xl mx-auto font-medium leading-relaxed">
            Located directly adjacent to the A1, five miles north of Grantham in Lincolnshire.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Map */}
            <div className="relative h-[500px] lg:h-auto rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
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
            <div className="space-y-8">
              <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Get in Touch</span>
              <h2 className="text-4xl md:text-5xl font-black text-deep-navy mb-8 tracking-tight">Contact Information</h2>
              
              <div className="grid gap-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-electric-blue/30 hover:bg-white hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-deep-navy group-hover:bg-electric-blue group-hover:text-white transition-all duration-300 shadow-sm flex-shrink-0">
                        <item.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-deep-navy mb-2 tracking-tight uppercase group-hover:text-electric-blue transition-colors">{item.label}</h3>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-slate-500 font-medium hover:text-electric-blue transition-colors whitespace-pre-line leading-relaxed"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-slate-500 font-medium whitespace-pre-line leading-relaxed">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild size="lg" className="w-full bg-deep-navy text-white hover:bg-black font-bold px-10 py-8 rounded-2xl shadow-xl">
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
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Accessibility</span>
            <h2 className="text-4xl md:text-5xl font-black text-deep-navy mb-6 tracking-tight">Getting Here</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Our facility is designed for easy access by all vehicle types.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {transportLinks.map((link) => (
              <div key={link.title} className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-electric-blue/30 hover:shadow-2xl transition-all duration-300 group text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-deep-navy group-hover:bg-electric-blue group-hover:text-white transition-all duration-300 shadow-sm mx-auto mb-6">
                  <link.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black text-deep-navy mb-4 tracking-tight uppercase group-hover:text-electric-blue transition-colors">{link.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{link.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Service Area</span>
            <h2 className="text-4xl md:text-5xl font-black text-deep-navy mb-6 tracking-tight">Areas We Serve</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Providing cold storage and logistics services across the East Midlands and beyond.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {areasServed.map((area) => (
              <span
                key={area}
                className="px-6 py-3 bg-slate-50 text-deep-navy border border-slate-100 rounded-2xl font-bold text-sm uppercase tracking-widest hover:border-electric-blue/30 transition-all"
              >
                {area}
              </span>
            ))}
            <span className="px-6 py-3 bg-electric-blue text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-electric-blue/20">
              + Nationwide Distribution
            </span>
          </div>

          <div className="text-center mt-16">
            <Button asChild variant="outline" size="lg" className="border-2 border-deep-navy text-deep-navy hover:bg-deep-navy hover:text-white font-bold px-10 py-8 rounded-2xl transition-all">
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
