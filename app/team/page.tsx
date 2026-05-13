import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "Meet the Team | QK Coldstores",
  description: "Meet the dedicated team behind QK Coldstores. Our experienced professionals ensure your products are stored safely and delivered on time.",
}

export default function TeamPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <PageHero
        title={<>Meet the <span className="text-electric-blue">Team</span></>}
        subtitle="The dedicated professionals who keep your supply chain running smoothly."
      />

      <TeamSection />

      <Footer />
    </main>
  )
}
