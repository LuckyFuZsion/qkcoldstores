"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Warehouse, Snowflake, Package, Boxes, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

const services = [
  {
    icon: Warehouse,
    title: "Storage",
    description:
      "In excess of 250,000 sq ft of cold storage for frozen and chilled goods, with capacity for over 50,000 pallets.",
  },
  {
    icon: Snowflake,
    title: "Blast Freezing & Tempering",
    description:
      "State-of-the-art blast freezing handling ~800 tonnes per week, plus controlled tempering for safe, gradual thawing.",
  },
  {
    icon: Package,
    title: "Fresh Packing",
    description:
      "A fresh packing line growing from 60 to 300 tonnes per week, handling all protein products to customer specification.",
  },
  {
    icon: Boxes,
    title: "Handling",
    description:
      "Specialised cold store handling including case picking, handballing, labelling and de-topping.",
  },
]

export function ServicesPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-24 md:py-32 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Our Services</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-none">
              Integrated Cold <br />
              <span className="text-electric-blue">Chain Solutions</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Button asChild size="lg" className="bg-deep-navy text-white hover:bg-black font-bold px-8 py-7 rounded-2xl shadow-xl">
              <Link href="/services">View All Services</Link>
            </Button>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`group relative h-full overflow-hidden border border-border rounded-[2.5rem] transition-all duration-500 bg-card ${
                  hoveredIndex === index 
                    ? "shadow-2xl -translate-y-2" 
                    : "shadow-lg"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardHeader className="p-10 pb-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${
                    hoveredIndex === index 
                      ? "bg-electric-blue text-white rotate-6 scale-110" 
                      : "bg-background text-foreground border border-border"
                  }`}>
                    <service.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-black text-foreground group-hover:text-electric-blue transition-colors uppercase tracking-tight leading-tight">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-0">
                  <CardDescription className="text-muted-foreground text-lg font-medium leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <div className="mt-8">
                    <Link href="/services" className="inline-flex items-center gap-2 text-electric-blue font-bold text-sm group-hover:gap-3 transition-all">
                      EXPLORE SERVICE <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
