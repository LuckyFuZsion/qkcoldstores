"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function FAQCta() {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tight leading-[1.1]">
          Still Have <span className="text-electric-blue text-glow">Questions?</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
          Our team is happy to answer any questions you may have about our services.
        </p>
        <Button asChild size="lg" className="bg-deep-navy text-white hover:bg-black font-bold px-10 py-8 rounded-2xl shadow-xl">
          <Link href="/contact">
            Contact Us
            <ChevronRight className="ml-2 h-6 w-6" />
          </Link>
        </Button>
      </motion.div>
    </section>
  )
}
