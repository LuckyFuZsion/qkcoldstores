import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { ServicesSections } from "@/components/services-sections"

export const metadata = {
  title: "Services | QK Coldstores",
  description:
    "QK Coldstores services in Grantham: large-scale cold storage, blast freezing and tempering, fresh packing and cold store handling.",
}

export default function ServicesPage() {
  return (
    <main>
      <Header />

      <PageHero
        title={<>Our <span className="text-electric-blue">Services</span></>}
        subtitle="Large-scale cold storage, blast freezing and tempering, fresh packing and cold store handling - all from our Grantham facility."
      />

      <ServicesSections />

      <Footer />
    </main>
  )
}
