"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Car, Truck, Building2 } from "lucide-react"
import { OPENING_HOURS_TEXT } from "@/lib/services-content"
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image-config"
import { FacilityMap } from "@/components/facility-map"

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "QK Cold Stores (Marston) Ltd\n2 Toll Bar Road\nMarston, Grantham\nNG32 2HT",
    href: "https://maps.google.com/?q=QK+Cold+Stores+(Marston)+Ltd,+2+Toll+Bar+Road,+Marston,+Grantham+NG32+2HT",
  },
  {
    icon: Phone,
    label: "Direct Line",
    value: "01400 259300",
    href: "tel:+441400259300",
  },
  {
    icon: Mail,
    label: "Email",
    value: "enquiries@qkcoldstores.co.uk",
    href: "mailto:enquiries@qkcoldstores.co.uk",
  },
  {
    icon: Clock,
    label: "Opening Hours",
    value: `${OPENING_HOURS_TEXT.operational}\n${OPENING_HOURS_TEXT.operationalNote}\n${OPENING_HOURS_TEXT.office}`,
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
  "Local",
  "UK",
  "European",
  "Worldwide",
]

export function LocationSections() {
  return (
    <>
      {/* Map Section */}
      <section className="py-24 md:py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[500px] lg:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-card bg-card"
            >
              <FacilityMap className="absolute inset-0" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[500px] lg:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-card bg-card"
            >
              <div className="relative w-full h-full bg-white p-4">
                <Image
                  src="/images/site-map.webp"
                  alt="QK Cold Stores site map"
                  fill
                  sizes={IMAGE_SIZES.siteMap}
                  quality={IMAGE_QUALITY.content}
                  loading="lazy"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 mt-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Get in Touch</span>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8 tracking-tight">Contact Information</h2>
            </motion.div>

            <div className="space-y-8">
              <div className="grid gap-6">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-8 rounded-[2rem] bg-card border border-border hover:border-electric-blue/30 hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center text-foreground group-hover:bg-electric-blue group-hover:text-white transition-all duration-300 shadow-sm flex-shrink-0 border border-border">
                        <item.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-foreground mb-2 tracking-tight uppercase group-hover:text-electric-blue transition-colors">{item.label}</h3>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-muted-foreground font-medium hover:text-electric-blue transition-colors whitespace-pre-line leading-relaxed"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground font-medium whitespace-pre-line leading-relaxed">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
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
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Accessibility</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tight">Getting Here</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Our facility is designed for easy access by all vehicle types.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {transportLinks.map((link, i) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-card border border-border hover:border-electric-blue/30 hover:shadow-2xl transition-all duration-300 group text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center text-foreground group-hover:bg-electric-blue group-hover:text-white transition-all duration-300 shadow-sm mx-auto mb-6 border border-border">
                  <link.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black text-foreground mb-4 tracking-tight uppercase group-hover:text-electric-blue transition-colors">{link.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{link.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Service Area</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tight">Areas We Serve</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Providing cold storage and logistics services across the East Midlands and beyond.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.04 } },
            }}
            className="flex flex-wrap justify-center gap-4"
          >
            {areasServed.map((area) => (
              <motion.span
                key={area}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
                className="px-6 py-3 bg-card text-foreground border border-border rounded-2xl font-bold text-sm uppercase tracking-widest hover:border-electric-blue/30 transition-all"
              >
                {area}
              </motion.span>
            ))}
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
              className="px-6 py-3 bg-electric-blue text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-electric-blue/20"
            >
              + Nationwide Distribution
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16"
          >
            <Button asChild variant="outline" size="lg" className="border-2 border-deep-navy text-foreground hover:bg-deep-navy hover:text-white font-bold px-10 py-8 rounded-2xl transition-all">
              <Link href="/services">
                View Our Services
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
