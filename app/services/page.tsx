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
      "30,000+ pallet capacity",
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
      <section className="relative min-h-[40svh] flex items-center justify-center overflow-hidden bg-deep-navy">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-30"
            style={{
              backgroundImage: "url('/landscape.png')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-deep-navy/90 via-deep-navy/80 to-deep-navy/70 pointer-events-none" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            What We <span className="text-electric-blue">Offer</span>
          </h1>
          <p className="text-xl md:text-2xl text-ice-blue/90 max-w-3xl mx-auto font-medium leading-relaxed">
            Comprehensive cold storage and logistics solutions tailored to your business needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-electric-blue/30 hover:bg-white hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-deep-navy group-hover:bg-electric-blue group-hover:text-white transition-all duration-300 shadow-sm mb-6">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black text-deep-navy mb-4 tracking-tight uppercase group-hover:text-electric-blue transition-colors">{service.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-deep-navy font-bold text-sm">
                      <div className="w-5 h-5 rounded-full bg-electric-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-electric-blue" />
                      </div>
                      <span className="uppercase tracking-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-deep-navy mb-8 tracking-tight leading-[1.1]">
            Ready to <span className="text-electric-blue text-glow">Discuss Requirements?</span>
          </h2>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
            Contact our team today for a tailored quote and discover how we can support your cold chain needs.
          </p>
          <Button asChild size="lg" className="bg-deep-navy text-white hover:bg-black font-bold px-10 py-8 rounded-2xl shadow-xl">
            <Link href="/contact">
              Get in Touch
              <ChevronRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
