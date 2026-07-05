"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Leaf, ArrowRight } from "lucide-react"
import { SERVICE_SLUGS, serviceHref } from "@/lib/services-content"

export function EnvironmentPreview() {
  return (
    <section className="py-24 md:py-32 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-electric-blue/10 flex items-center justify-center text-electric-blue border border-border">
              <Leaf className="h-8 w-8" />
            </div>
            <div>
              <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] block">Our Commitment</span>
              <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">Environment & Sustainability</h2>
            </div>
          </div>
          <div className="space-y-6 text-lg text-muted-foreground font-medium leading-relaxed">
            <p>
              QK Cold Stores (Marston) are committed to operating our cold storage facility in a responsible and environmentally conscious manner.
            </p>
            <p>
              Recent investments in on-site solar energy generation have helped reduce our reliance on grid electricity, supporting a more sustainable operation. We are also exploring opportunities to further enhance waste management and recycling practices across the site, with a focus on reducing waste and improving resource efficiency.
            </p>
            <p>
              Through ongoing investment, innovation, and responsible business practices, we aim to minimise our environmental impact while continuing to provide safe, reliable, and efficient cold storage services for our customers.
            </p>
          </div>
          <Link
            href={serviceHref(SERVICE_SLUGS.environment)}
            className="inline-flex items-center gap-2 mt-10 text-electric-blue font-bold text-sm uppercase tracking-wide hover:gap-3 transition-all"
          >
            View all services <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
