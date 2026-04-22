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
            About <span className="text-electric-blue">QK Coldstores</span>
          </h1>
          <p className="text-xl md:text-2xl text-ice-blue/90 max-w-3xl mx-auto font-medium leading-relaxed">
            A family-run business with over 25 years of cold storage expertise in the heart of Lincolnshire.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Our History</span>
              <h2 className="text-4xl md:text-6xl font-black text-deep-navy mb-8 tracking-tight leading-[1.1]">
                Our <span className="text-electric-blue">Story</span>
              </h2>
              <div className="space-y-6 text-xl text-slate-600 font-medium leading-relaxed">
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
              <div className="grid sm:grid-cols-2 gap-6 mt-12">
                {["BRC Accredited Storage", "HACCP Certified", "Organic Certified", "Red Tractor Approved"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-4 w-4 text-electric-blue" />
                    </div>
                    <span className="text-deep-navy font-bold text-sm uppercase tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
                <img 
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1935"
                  alt="QK Coldstores Facility"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Stats overlay */}
              <div className="absolute -bottom-10 -left-10 bg-white rounded-[2rem] shadow-2xl p-10 hidden sm:block border border-slate-100">
                <div className="grid grid-cols-2 gap-10">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl font-black text-deep-navy mb-1">{stat.value}</div>
                      <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Core Principles</span>
            <h2 className="text-4xl md:text-5xl font-black text-deep-navy mb-6 tracking-tight">Our Values</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              The principles that guide everything we do at QK Coldstores.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-electric-blue/30 hover:shadow-2xl transition-all duration-300 group text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-deep-navy group-hover:bg-electric-blue group-hover:text-white transition-all duration-300 shadow-sm mx-auto mb-6">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black text-deep-navy mb-4 tracking-tight uppercase group-hover:text-electric-blue transition-colors">{value.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-deep-navy mb-8 tracking-tight leading-[1.1]">
            Want to <span className="text-electric-blue">Learn More?</span>
          </h2>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
            Get in touch with our team to discuss how we can support your cold storage needs.
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
