import { CheckCircle2, Award, Users, Clock } from "lucide-react"

const stats = [
  { icon: Clock, value: "25+", label: "Years in Business" },
  { icon: Users, value: "200+", label: "Active Clients" },
  { icon: Award, value: "BRC", label: "Accredited" },
]

const features = [
  "BRC Storage & Distribution accredited facility",
  "HACCP certified temperature management",
  "24/7 security and monitoring systems",
  "Dedicated account management team",
  "Flexible contract arrangements",
  "Sustainable and energy-efficient operations",
]

export function AboutSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1935"
                alt="Modern cold storage warehouse facility"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/50 to-transparent" />
            </div>
            
            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 hidden sm:block">
              <div className="flex items-center gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="h-6 w-6 text-electric-blue mx-auto mb-2" />
                    <div className="text-2xl font-bold text-deep-navy">{stat.value}</div>
                    <div className="text-muted-foreground text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-ice-blue/30 rounded-full blur-2xl" />
          </div>

          {/* Content side */}
          <div>
            <span className="text-electric-blue font-semibold text-sm uppercase tracking-wider">About QK Coldstores</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-navy mt-3 mb-6 text-balance">
              Your Trusted Cold Chain Partner Since 1998
            </h2>
            
            <p className="text-muted-foreground text-lg mb-6 text-pretty">
              Based in Grantham, Lincolnshire, QK Coldstores has been at the forefront of 
              temperature-controlled logistics for over two decades. Our state-of-the-art 
              facility in Marston serves businesses across the East Midlands and beyond.
            </p>
            
            <p className="text-muted-foreground mb-8">
              We combine cutting-edge technology with hands-on expertise to deliver 
              reliable cold chain solutions. From blast freezing to nationwide distribution, 
              our team ensures your products maintain optimal temperature throughout the supply chain.
            </p>

            {/* Features list */}
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-electric-blue flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
