import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { ContactSections } from "@/components/contact-sections"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { breadcrumbsFor } from "@/lib/breadcrumbs"

import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "Contact Us | QK Cold Stores",
  description:
    "Get in touch with QK Cold Stores for all your cold storage and logistics needs. Located in Grantham, serving the East Midlands.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbsFor("/contact", "Contact")} />
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
    </>
  )
}
