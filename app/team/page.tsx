import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"

export const metadata: Metadata = {
  title: "Meet the Team | QK Coldstores",
  description: "Meet the dedicated team behind QK Coldstores. Our experienced professionals ensure your products are stored safely and delivered on time.",
}

export default function TeamPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
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
            Meet the <span className="text-electric-blue">Team</span>
          </h1>
          <p className="text-xl md:text-2xl text-ice-blue/90 max-w-3xl mx-auto font-medium leading-relaxed">
            The dedicated professionals who keep your supply chain running smoothly.
          </p>
        </div>
      </section>

      <TeamSection />
      
      <Footer />
    </main>
  )
}
