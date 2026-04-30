"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight, ShieldCheck, Zap, Warehouse } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden bg-deep-navy">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: "url('/images/hero-bg.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-deep-navy/90 via-deep-navy/80 to-deep-navy/70 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[0.95]"
          >
            Temperature-Controlled <br />
            <span className="text-electric-blue">Storage Solutions</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-ice-blue/90 mb-12 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Grantham&apos;s premier BRC-accredited facility providing 30,000 pallet locations, 
            rapid blast freezing, and integrated logistics for the food sector.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-deep-navy hover:bg-ice-blue font-bold text-xl px-10 py-8 rounded-2xl shadow-2xl transition-all hover:-translate-y-1"
            >
              <Link href="/contact">
                Make an Enquiry
                <ChevronRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white font-bold text-xl px-10 py-8 rounded-2xl transition-all hover:-translate-y-1 bg-transparent"
            >
              <Link href="/services">View Our Services</Link>
            </Button>
          </motion.div>

          {/* Trust Badges - Magnavale Style */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-white/10 pt-12 mt-12 mb-12"
          >
            {[
              { icon: ShieldCheck, title: "BRC-Approved", desc: "AA Standard Accredited" },
              { icon: Warehouse, title: "30K+ Pallets", desc: "System Controlled Locations" },
              { icon: Zap, title: "Integrated Services", desc: "Blast Freezing & Logistics" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-4 text-left group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-electric-blue transition-all duration-300 shadow-sm">
                  <badge.icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-black text-white text-lg uppercase tracking-tight">{badge.title}</div>
                  <div className="text-ice-blue/60 text-sm font-medium">{badge.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
