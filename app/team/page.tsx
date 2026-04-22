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
      <section className="pt-32 pb-16 bg-deep-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Meet the Team
          </h1>
          <p className="text-xl text-ice-blue/80 max-w-2xl mx-auto text-pretty">
            The dedicated professionals who keep your supply chain running smoothly
          </p>
        </div>
      </section>

      <TeamSection />
      
      <Footer />
    </main>
  )
}
