import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"
import { PageHero } from "@/components/page-hero"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { breadcrumbsFor } from "@/lib/breadcrumbs"

import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "Meet the Team | QK Coldstores",
  description:
    "Meet the dedicated team behind QK Coldstores. Our experienced professionals ensure your products are stored safely and delivered on time.",
  path: "/team",
})

export default function TeamPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbsFor("/team", "Meet the Team")} />
      <main className="min-h-screen">
      <Header />

      <PageHero
        title={<>Meet the <span className="text-electric-blue">Team</span></>}
        subtitle="The dedicated professionals who keep your supply chain running smoothly."
      />

      <TeamSection />

      <Footer />
    </main>
    </>
  )
}
