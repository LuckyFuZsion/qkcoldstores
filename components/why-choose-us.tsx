import { Shield, ThermometerSnowflake, Clock, Award } from "lucide-react"

const features = [
  {
    icon: ThermometerSnowflake,
    title: "Precision Temperature Control",
    description: "Multiple temperature zones from -25°C to +5°C with real-time monitoring and alerts.",
  },
  {
    icon: Shield,
    title: "BRC Accredited",
    description: "Full BRC accreditation for storage and distribution, ensuring the highest food safety standards.",
  },
  {
    icon: Clock,
    title: "24/7 Operations",
    description: "Round-the-clock access and support to meet your logistics requirements any time.",
  },
  {
    icon: Award,
    title: "25+ Years Experience",
    description: "Decades of expertise in cold chain logistics serving businesses across the East Midlands.",
  },
]

const stats = [
  { value: "50,000+", label: "Pallet Capacity" },
  { value: "-25°C", label: "Minimum Temp" },
  { value: "100%", label: "Uptime Record" },
  { value: "500+", label: "Clients Served" },
]

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-electric-blue font-semibold text-sm uppercase tracking-wider">Why QK Coldstores</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-navy mt-3 mb-6 text-balance">
            Your Trusted Cold Storage Partner
          </h2>
          <p className="text-muted-foreground text-lg">
            We combine cutting-edge technology with decades of expertise to deliver 
            reliable, efficient cold chain solutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-ice-blue/30 flex items-center justify-center mx-auto mb-6">
                <feature.icon className="h-8 w-8 text-deep-navy" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="bg-deep-navy rounded-2xl p-8 md:p-12 border-none shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-ice-blue/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
