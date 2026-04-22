"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Warehouse, Snowflake, Truck, ClipboardList, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const services = [
  {
    icon: Warehouse,
    title: "Bulk Cold Storage",
    description: "State-of-the-art temperature-controlled warehousing with capacity for over 50,000 pallets across multiple temperature zones.",
  },
  {
    icon: Snowflake,
    title: "Blast Freezing",
    description: "Rapid blast freezing services to preserve product quality and extend shelf life for fresh produce and prepared foods.",
  },
  {
    icon: Truck,
    title: "Distribution",
    description: "Comprehensive cold chain logistics covering the East Midlands with temperature-controlled fleet and GPS tracking.",
  },
  {
    icon: ClipboardList,
    title: "Inventory Management",
    description: "Advanced Emperica stock management system providing real-time visibility and comprehensive reporting.",
  },
]

export function ServicesPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-electric-blue font-semibold text-sm uppercase tracking-wider">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-navy mt-3 mb-6 text-balance">
            Comprehensive Cold Chain Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            From storage to distribution, we provide end-to-end temperature-controlled logistics 
            tailored to your business needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`group relative overflow-hidden border-border/50 transition-all duration-300 ${
                hoveredIndex === index 
                  ? "shadow-xl border-electric-blue/50 -translate-y-1" 
                  : "hover:shadow-lg"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background gradient on hover removed */}
              <div className={`absolute inset-0 bg-electric-blue/5 transition-opacity duration-300 ${
                hoveredIndex === index ? "opacity-100" : "opacity-0"
              }`} />
              
              <CardHeader className="relative pb-2">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                  hoveredIndex === index 
                    ? "bg-electric-blue text-white" 
                    : "bg-ice-blue/50 text-deep-navy"
                }`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-bold text-deep-navy group-hover:text-electric-blue transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative pt-0">
                <CardDescription className="text-muted-foreground text-sm">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-electric-blue hover:bg-electric-blue/90 text-white">
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
