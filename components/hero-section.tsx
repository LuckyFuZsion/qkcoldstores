"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, ShieldCheck, Zap, Warehouse } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative min-h-[90svh] flex items-stretch overflow-hidden bg-deep-navy pt-14 lg:pt-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-navy via-deep-navy/95 to-deep-navy/85 pointer-events-none" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col xl:flex-row xl:items-stretch gap-0 min-h-0 xl:min-h-[calc(90svh-4rem)]">
        {/* Logo partition - top on tablet/mobile, right on xl+ */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-10 flex w-full shrink-0 xl:order-2 xl:z-0 xl:w-[min(38vw,420px)] xl:border-l border-white/10"
        >
          <Link
            href="/"
            className="flex w-full flex-col items-center justify-center bg-white shadow-2xl px-6 py-10 sm:py-12 xl:py-16 xl:min-h-full transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <Image
              src="/images/qk-logo.png"
              alt="QK Coldstores"
              width={480}
              height={240}
              className="w-full max-w-[280px] sm:max-w-[320px] xl:max-w-[360px] h-auto object-contain"
              priority
            />
            <p className="mt-6 text-center text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">
              Cold Stores (Marston) Ltd
            </p>
          </Link>
        </motion.div>

        {/* Content partition - below logo until xl, left on xl+ */}
        <div className="relative z-20 flex min-w-0 flex-1 flex-col justify-center py-10 sm:py-12 xl:order-1 xl:py-16 xl:pr-8 2xl:pr-12">
          <div className="max-w-3xl text-center mx-auto xl:text-left xl:mx-0">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white mb-6 xl:mb-8 tracking-tight leading-[0.95]"
            >
              Temperature-Controlled <br />
              <span className="text-electric-blue">Storage Solutions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-ice-blue/90 mb-10 xl:mb-12 font-medium leading-relaxed"
            >
              Grantham&apos;s premier BRC-accredited facility providing 50,000+ pallet locations,
              rapid blast freezing, and storage and logistics for the food sector.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start mb-12 xl:mb-16"
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-deep-navy hover:bg-ice-blue font-bold text-lg sm:text-xl px-8 sm:px-10 py-7 sm:py-8 rounded-2xl shadow-2xl transition-all hover:-translate-y-1"
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
                className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white font-bold text-lg sm:text-xl px-8 sm:px-10 py-7 sm:py-8 rounded-2xl transition-all hover:-translate-y-1 bg-transparent"
              >
                <Link href="/services">View Our Services</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.75 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 xl:gap-8 border-t border-white/10 pt-10 xl:pt-12"
            >
              {[
                { icon: ShieldCheck, title: "BRC-Approved", desc: "AA Standard Accredited" },
                { icon: Warehouse, title: "50,000+ Pallets", desc: "Cold Storage Capacity" },
                { icon: Zap, title: "Storage and Logistics", desc: "Blast Freezing & More" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-4 text-left group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-electric-blue transition-all duration-300 shrink-0">
                    <badge.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <div className="font-black text-white text-base sm:text-lg uppercase tracking-tight">{badge.title}</div>
                    <div className="text-ice-blue/60 text-xs sm:text-sm font-medium">{badge.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
