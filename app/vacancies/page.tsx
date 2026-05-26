import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { VacanciesSections } from "@/components/vacancies-sections"

export const metadata = {
  title: "Vacancies | QK Cold Stores",
  description: "View current job vacancies at QK Cold Stores in Grantham, Lincolnshire. Join our team and build a career in cold chain logistics.",
}

export default function VacanciesPage() {
  return (
    <main>
      <Header />

      <PageHero
        title={<>Join Our <span className="text-electric-blue">Team</span></>}
        subtitle="Explore current vacancies and career opportunities at QK Cold Stores."
      />

      <VacanciesSections />

      <Footer />
    </main>
  )
}
