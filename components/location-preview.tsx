"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, ArrowRight, Globe } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FacilityMap } from "@/components/facility-map"

const areasServed = [
  "Local",
  "UK",
  "European",
  "Worldwide",
]

export function LocationPreview() {
  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Map Preview */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] lg:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl bg-card border-8 border-card"
          >
            <FacilityMap className="absolute inset-0" />
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 text-electric-blue text-xs font-black uppercase tracking-widest mb-8">
                <Globe className="w-4 h-4" />
                Strategic Location
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-foreground mt-3 mb-8 tracking-tight leading-[1.1]">
                Positioned for <br />
                <span className="text-electric-blue">Optimal Distribution</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-medium">
                Our facility is located directly adjacent to the A1, five miles north of Grantham. 
                This central position provides unmatched access to the East Midlands and the wider UK road network.
              </p>
            </motion.div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 gap-6 mb-12">
              {[
                { icon: MapPin, title: "Headquarters", text: "2 Toll Bar Road, Marston, Grantham, NG32 2HT", href: null as string | null },
                { icon: Phone, title: "Direct Line", text: "01400 259300", href: "tel:+441400259300" },
                { icon: Mail, title: "Email", text: "enquiries@qkcoldstores.co.uk", href: "mailto:enquiries@qkcoldstores.co.uk" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex items-center gap-6 p-6 rounded-[2rem] bg-card border border-border shadow-sm hover:shadow-xl transition-all group hover:border-electric-blue/30"
                >
                  <div className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-electric-blue group-hover:text-white group-hover:rotate-6 shadow-sm border border-border">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{item.title}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-lg font-bold text-foreground hover:text-electric-blue transition-colors break-all"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-lg font-bold text-foreground">{item.text}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-12"
            >
              <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">
                Areas we serve
              </p>
              <div className="flex flex-wrap gap-3">
                {areasServed.map((area) => (
                  <span
                    key={area}
                    className="px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-bold border border-border"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button asChild size="lg" className="bg-deep-navy text-white hover:bg-black font-black px-10 py-8 rounded-2xl shadow-2xl transition-all hover:-translate-y-1">
                <Link href="/location">
                  Get Directions
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
