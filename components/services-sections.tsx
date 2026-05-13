"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Warehouse,
  Snowflake,
  Package,
  Boxes,
  CheckCircle,
  ChevronRight,
} from "lucide-react"

const services = [
  {
    icon: Warehouse,
    title: "Storage",
    description:
      "QK Cold Stores provides in excess of 250,000 square feet of cold storage capacity for both frozen and chilled goods, with the ability to accommodate over 50,000 pallets simultaneously.",
    features: [
      "250,000+ sq ft of capacity",
      "50,000+ pallet positions",
      "Frozen and chilled storage",
      "24/7 temperature monitoring",
    ],
  },
  {
    icon: Snowflake,
    title: "Blast Freezing & Tempering",
    description:
      "Blast freezing is a crucial process for preserving the quality and freshness of perishable goods. Our facility is equipped with state-of-the-art blast freezing capabilities, handling approximately 800 tonnes per week to ensure efficient, high-quality freezing for large volumes. We also offer controlled tempering services for safe and gradual thawing of frozen goods to optimal temperatures for further processing or distribution.",
    features: [
      "~800 tonnes per week capacity",
      "Rapid core temperature reduction",
      "Controlled tempering services",
      "Quality and freshness preserved",
    ],
  },
  {
    icon: Package,
    title: "Fresh Packing",
    description:
      "Since its inception in 2020, our fresh packing line has steadily grown from 60 tonnes per week to an average of 300 tonnes per week in 2026. Our facility handles a wide variety of protein products, packing to each customer's exact specifications with quality and efficiency at every stage.",
    features: [
      "Operating since 2020",
      "300+ tonnes per week",
      "All protein products handled",
      "Packed to customer specification",
    ],
  },
  {
    icon: Boxes,
    title: "Handling",
    description:
      "Cold store handling requires specialised training and equipment to ensure activities are carried out efficiently and in compliance with food safety regulations, keeping perishable goods at optimal conditions throughout the storage and handling process.",
    features: [
      "Case picking",
      "Handballing",
      "Labelling",
      "De-topping",
    ],
  },
]

export function ServicesSections() {
  return (
    <>
      {/* Services Grid */}
      <section className="py-24 md:py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-card border border-border hover:border-electric-blue/30 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center text-foreground group-hover:bg-electric-blue group-hover:text-white transition-all duration-300 shadow-sm mb-6 border border-border">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black text-foreground mb-4 tracking-tight uppercase group-hover:text-electric-blue transition-colors">{service.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-foreground font-bold text-sm">
                      <div className="w-5 h-5 rounded-full bg-electric-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-electric-blue" />
                      </div>
                      <span className="uppercase tracking-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-secondary">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tight leading-[1.1]">
            Ready to <span className="text-electric-blue text-glow">Discuss Requirements?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
            Contact our team today for a tailored quote and discover how we can support your cold chain needs.
          </p>
          <Button asChild size="lg" className="bg-deep-navy text-white hover:bg-black font-bold px-10 py-8 rounded-2xl shadow-xl">
            <Link href="/contact">
              Get in Touch
              <ChevronRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </>
  )
}
