import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata = {
  title: "Contact Us | QK Coldstores",
  description: "Get in touch with QK Coldstores for all your cold storage and logistics needs. Located in Grantham, serving the East Midlands.",
}

export default function ContactPage() {
  return (
    <main>
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 bg-deep-navy">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-electric-blue rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
              Contact Us
            </h1>
            <p className="text-xl text-ice-blue/80 text-pretty">
              Have a question or need a quote? We&apos;d love to hear from you. 
              Our team is ready to help with all your cold storage needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Address */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Our Location</h3>
                    <p className="text-muted-foreground">
                      QK Cold Stores (Marston) Ltd<br />
                      2 Toll Bar Road<br />
                      Marston, Grantham<br />
                      NG32 2HT
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                    <a 
                      href="tel:+441234567890" 
                      className="text-electric-blue hover:underline font-medium"
                    >
                      01234 567 890
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Available 24/7 for enquiries
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Email</h3>
                    <a 
                      href="mailto:info@qkcoldstores.co.uk" 
                      className="text-electric-blue hover:underline font-medium"
                    >
                      info@qkcoldstores.co.uk
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Operating Hours</h3>
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">Warehouse:</span> 24/7<br />
                      <span className="font-medium text-foreground">Office:</span> Mon-Fri 8am-6pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Find Us
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-border h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2402.5!2d-0.6936068!3d52.9659668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879dd0a5f3d5555%3A0x2b7a28f0c7a7e4c5!2sQK%20Cold%20Stores%20(Marston)%20Ltd!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="QK Cold Stores (Marston) Ltd Location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
