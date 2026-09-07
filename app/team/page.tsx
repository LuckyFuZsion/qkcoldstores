import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"
import { PageHero } from "@/components/page-hero"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { WebPageSchema } from "@/components/webpage-schema"
import { breadcrumbsFor } from "@/lib/breadcrumbs"

import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "Meet the Team | QK Cold Stores",
  description:
    "Meet the dedicated team behind QK Cold Stores. Our experienced professionals ensure your products are stored safely and delivered on time.",
  path: "/team",
})

export default function TeamPage() {
  return (
    <>
      <WebPageSchema
        path="/team"
        name="Meet the Team | QK Cold Stores"
        description={metadata.description as string}
      />
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
