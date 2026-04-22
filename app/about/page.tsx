import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, ChevronRight, Award, Users, Clock, Shield } from "lucide-react"

export const metadata = {
  title: "About Us | QK Coldstores",
  description: "Learn about QK Coldstores - 25+ years of cold storage excellence in Grantham and the East Midlands. Family values, modern facilities.",
}

const values = [
  {
    icon: Award,
    title: "Quality First",
    description: "BRC accredited facilities maintaining the highest standards in food safety and storage.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Dedicated account managers ensuring personalised service for every client.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "24/7 operations with consistent, dependable service you can count on.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Transparent operations and real-time visibility into your inventory.",
  },
]

const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "30K+", label: "Pallet Capacity" },
  { value: "100+", label: "Active Clients" },
  { value: "24/7", label: "Operations" },
]

export default function AboutPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-deep-navy to-deep-navy/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
            About QK Coldstores
          </h1>
          <p className="text-xl text-ice-blue/80 max-w-2xl mx-auto text-pretty">
            A family-run business with over 25 years of cold storage expertise in the heart of Lincolnshire
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in Marston, near Grantham, QK Coldstores has grown from a small family operation 
                  into one of the East Midlands&apos; most trusted cold storage providers.
                </p>
                <p>
                  Our journey began with a simple mission: to provide reliable, high-quality 
                  temperature-controlled storage that businesses could depend on. Over 25 years later, 
                  that mission remains at the heart of everything we do.
                </p>
                <p>
                  Today, we operate state-of-the-art facilities with over 30,000 pallet spaces, 
                  serving clients ranging from local producers to major national retailers. 
                  Despite our growth, we&apos;ve never lost the personal touch that defines a family business.
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {["BRC Accredited Storage", "HACCP Certified", "Organic Certified", "Red Tractor Approved"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-electric-blue" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div 
                className="aspect-[4/3] rounded-2xl bg-cover bg-center shadow-2xl"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1935')",
                }}
              />
              {/* Stats overlay */}
              <div className="absolute -bottom-8 left-8 right-8 bg-card rounded-xl shadow-xl p-6 border border-border">
                <div className="grid grid-cols-4 gap-4 text-center">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-bold text-electric-blue">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The principles that guide everything we do at QK Coldstores
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-card rounded-xl p-6 text-center shadow-lg border border-border">
                <div className="w-12 h-12 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-electric-blue" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Want to learn more?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Get in touch with our team to discuss how we can support your cold storage needs.
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
