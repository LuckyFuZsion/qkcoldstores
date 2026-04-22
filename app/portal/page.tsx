import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClientPortalSection } from "@/components/client-portal-section"

export const metadata = {
  title: "Customer Portal | QK Coldstores",
  description: "Access the QK Coldstores Emperica stock system for real-time inventory management and reporting.",
}

export default function PortalPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-deep-navy to-deep-navy/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
            Customer Portal
          </h1>
          <p className="text-xl text-ice-blue/80 max-w-2xl mx-auto text-pretty">
            Access your inventory and manage your stock through our Emperica system
          </p>
        </div>
      </section>

      {/* Portal Section */}
      <ClientPortalSection />

      <Footer />
    </main>
  )
}
