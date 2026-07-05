import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { ClientPortalSection } from "@/components/client-portal-section"

export const metadata = {
  title: "Customer Portal | QK Coldstores",
  description: "Access the QK Coldstores Emperica stock system for real-time inventory management and reporting.",
}

export default function PortalPage() {
  return (
    <main>
      <Header />

      <PageHero
        title={<>Customer <span className="text-electric-blue">Portal</span></>}
        subtitle="Access your inventory and manage your stock through our Emperica system."
      />

      <ClientPortalSection />

      <Footer />
    </main>
  )
}
