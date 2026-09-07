import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { VacanciesSections } from "@/components/vacancies-sections"
import { VacancyJobPostingSchema } from "@/components/vacancy-job-posting-schema"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { breadcrumbsFor } from "@/lib/breadcrumbs"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "Careers | QK Cold Stores",
  description:
    "Explore careers at QK Cold Stores in Grantham, Lincolnshire. See employee benefits and current openings in cold chain logistics.",
  path: "/careers",
})

export default function CareersPage() {
  return (
    <>
      <VacancyJobPostingSchema />
      <BreadcrumbSchema items={breadcrumbsFor("/careers", "Careers")} />
      <main>
        <Header />

        <PageHero
          title={
            <>
              Join Our <span className="text-electric-blue">Team</span>
            </>
          }
          subtitle="Explore career opportunities and benefits at QK Cold Stores."
        />

        <VacanciesSections />

        <Footer />
      </main>
    </>
  )
}
