"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, ArrowRight, Globe } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2402.5!2d-0.6936068!3d52.9659668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879dd0a5f3d5555%3A0x2b7a28f0c7a7e4c5!2sQK%20Cold%20Stores%20(Marston)%20Ltd!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="QK Cold Stores (Marston) Ltd Location"
              className="absolute inset-0 grayscale contrast-125"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/40 to-transparent pointer-events-none" />
            
            {/* Floating Map Label */}
            <div className="absolute top-8 left-8 bg-card/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-electric-blue animate-pulse" />
                <span className="font-black text-foreground uppercase tracking-widest text-xs">Live Facility Status</span>
              </div>
            </div>
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
                { icon: MapPin, title: "Headquarters", text: "2 Toll Bar Road, Marston, Grantham, NG32 2HT" },
                { icon: Phone, title: "Direct Line", text: "01246 854999" },
                { icon: Mail, title: "Enquiries", text: "enquiries@qkcoldstores.co.uk" },
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
                    <p className="text-lg font-bold text-foreground">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

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
