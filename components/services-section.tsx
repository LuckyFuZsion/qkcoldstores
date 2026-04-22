"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Warehouse, Snowflake, Truck, ClipboardList, ArrowRight } from "lucide-react"
import { useState } from "react"

const services = [
  {
    icon: Warehouse,
    title: "Bulk Cold Storage",
    description: "State-of-the-art temperature-controlled warehousing with capacity for over 50,000 pallets. Multiple temperature zones from -25°C to +5°C.",
    features: ["Multi-temperature zones", "BRC Accredited", "Real-time monitoring", "Flexible storage options"],
  },
  {
    icon: Snowflake,
    title: "Blast Freezing",
    description: "Rapid blast freezing services to preserve product quality and extend shelf life. Ideal for fresh produce, prepared foods, and more.",
    features: ["Rapid temperature reduction", "Quality preservation", "HACCP compliant", "Batch tracking"],
  },
  {
    icon: Truck,
    title: "Distribution",
    description: "Comprehensive cold chain logistics covering the East Midlands and beyond. Temperature-controlled fleet with GPS tracking.",
    features: ["Temperature-controlled fleet", "GPS tracking", "Next-day delivery", "Cross-docking services"],
  },
  {
    icon: ClipboardList,
    title: "Inventory Management",
    description: "Advanced Emperica stock management system providing real-time visibility, FIFO/FEFO management, and comprehensive reporting.",
    features: ["Real-time stock visibility", "FIFO/FEFO management", "Batch & lot tracking", "Custom reporting"],
  },
]

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-electric-blue font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-navy mt-3 mb-6 text-balance">
            Comprehensive Cold Chain Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            From storage to distribution, we provide end-to-end temperature-controlled logistics 
            tailored to your business needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`group relative overflow-hidden border-border/50 transition-all duration-300 cursor-pointer ${
                hoveredIndex === index 
                  ? "shadow-xl border-electric-blue/50 scale-[1.02]" 
                  : "hover:shadow-lg"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent transition-opacity duration-300 ${
                hoveredIndex === index ? "opacity-100" : "opacity-0"
              }`} />
              
              <CardHeader className="relative">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                  hoveredIndex === index 
                    ? "bg-electric-blue text-white" 
                    : "bg-ice-blue/50 text-deep-navy"
                }`}>
                  <service.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl font-bold text-deep-navy group-hover:text-electric-blue transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="grid grid-cols-2 gap-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className={`mt-6 flex items-center gap-2 text-electric-blue font-medium transition-all duration-300 ${
                  hoveredIndex === index ? "translate-x-2" : ""
                }`}>
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
