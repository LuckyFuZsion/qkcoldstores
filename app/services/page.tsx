import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Warehouse, 
  Snowflake, 
  Truck, 
  ClipboardList, 
  ArrowLeftRight, 
  Package,
  CheckCircle,
  ChevronRight
} from "lucide-react"

export const metadata = {
  title: "What We Offer | QK Coldstores",
  description: "Comprehensive cold storage services including bulk storage, blast freezing, distribution, and inventory management in Grantham and the East Midlands.",
}

const services = [
  {
    icon: Warehouse,
    title: "Bulk Cold Storage",
    description: "Large-scale temperature-controlled warehousing with state-of-the-art monitoring systems maintaining optimal conditions 24/7.",
    features: [
      "Multi-temperature zones (-25°C to +15°C)",
      "50,000+ pallet capacity",
      "Real-time temperature monitoring",
      "BRC accredited facilities",
    ],
  },
  {
    icon: Snowflake,
    title: "Blast Freezing",
    description: "Rapid freezing services that preserve product quality and extend shelf life using advanced blast freezing technology.",
    features: [
      "Rapid core temperature reduction",
      "Preserve texture and nutrients",
      "Multiple blast freezer chambers",
      "Suitable for all product types",
    ],
  },
  {
    icon: Truck,
    title: "Distribution Services",
    description: "Reliable temperature-controlled distribution across the UK with our modern fleet of refrigerated vehicles.",
    features: [
      "UK-wide delivery network",
      "GPS-tracked vehicles",
      "Temperature-monitored transport",
      "Flexible delivery schedules",
    ],
  },
  {
    icon: ClipboardList,
    title: "Inventory Management",
    description: "Advanced WMS providing complete visibility and control of your inventory through our Emperica stock system.",
    features: [
      "Real-time stock visibility",
      "Batch and date tracking",
      "Custom reporting",
      "Client portal access",
    ],
  },
  {
    icon: ArrowLeftRight,
    title: "Cross-Docking",
    description: "Efficient cross-docking services to streamline your supply chain and reduce handling costs.",
    features: [
      "Minimised storage time",
      "Rapid turnaround",
      "Cost-effective solution",
      "Flexible scheduling",
    ],
  },
  {
    icon: Package,
    title: "Order Fulfilment",
    description: "Complete pick and pack services tailored to your requirements, from single units to full pallets.",
    features: [
      "Accurate order picking",
      "Custom packaging options",
      "Retail-ready preparation",
      "EDI integration available",
    ],
  },
]

export default function ServicesPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-deep-navy to-deep-navy/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
            What We Offer
          </h1>
          <p className="text-xl text-ice-blue/80 max-w-2xl mx-auto text-pretty">
            Comprehensive cold storage and logistics solutions tailored to your business needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-card rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-electric-blue/10 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="h-7 w-7 text-electric-blue" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle className="h-5 w-5 text-electric-blue flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
            Ready to discuss your requirements?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact our team today for a tailored quote and discover how we can support your cold chain needs.
          </p>
          <Button asChild size="lg" className="bg-electric-blue hover:bg-electric-blue/90 text-white">
            <Link href="/location">
              Get in Touch
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
