"use client"

import { CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image-config"

export function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Choice Partner</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tight leading-[1.1]">
              Cold Storage for the <br />
              <span className="text-electric-blue">Food Manufacturing Sector</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
              For over 40 years, we have been a trusted leader in temperature-controlled
              storage solutions across the East Midlands. We help our food partners
              not only fulfil their storage needs but also alleviate complexity in the cold chain.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "BRC and Soil Association certified facilities",
                "Members of the British Frozen Food Federation",
                "Advanced stock management system",
                "Strategically located adjacent to the A1",
                "Red Tractor Approved",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-bold">
                  <CheckCircle2 className="w-6 h-6 text-electric-blue shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="bg-deep-navy text-white hover:bg-black font-bold px-8 py-7 rounded-2xl shadow-xl">
              <Link href="/contact">Make an Enquiry</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-card">
              <Image
                src="/images/qk-coldstores-2.webp"
                alt="Temperature Controlled Cold Store Facility"
                fill
                sizes={IMAGE_SIZES.contentHalf}
                quality={IMAGE_QUALITY.content}
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-electric-blue p-8 rounded-[2rem] shadow-2xl text-white max-w-[200px]">
              <div className="text-4xl font-black mb-1">50,000+</div>
              <div className="text-sm font-bold uppercase tracking-wider opacity-80 leading-tight">Pallet Positions Available</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
