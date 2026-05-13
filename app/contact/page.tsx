import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { ContactSections } from "@/components/contact-sections"

export const metadata = {
  title: "Contact Us | QK Coldstores",
  description: "Get in touch with QK Coldstores for all your cold storage and logistics needs. Located in Grantham, serving the East Midlands.",
}

export default function ContactPage() {
  return (
    <main>
      <Header />

      <PageHero
        title={<>Contact <span className="text-electric-blue">Us</span></>}
        subtitle={
          <>Have a question or need a quote? We&apos;d love to hear from you. Our team is ready to help with all your cold storage needs.</>
        }
      />

      <ContactSections />

      <Footer />
    </main>
  )
}
