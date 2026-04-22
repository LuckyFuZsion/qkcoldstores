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
      <section className="relative min-h-[40svh] flex items-center justify-center overflow-hidden bg-deep-navy">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-30"
            style={{
              backgroundImage: "url('/landscape.png')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-deep-navy/90 via-deep-navy/80 to-deep-navy/70 pointer-events-none" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            Contact <span className="text-electric-blue">Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-ice-blue/90 max-w-3xl mx-auto font-medium leading-relaxed">
            Have a question or need a quote? We&apos;d love to hear from you. 
            Our team is ready to help with all your cold storage needs.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-20">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-slate-50 rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-2xl relative">
                <h2 className="text-3xl font-black text-deep-navy mb-8 tracking-tight">
                  Send Us a Message
                </h2>
                <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Address */}
              <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-electric-blue/30 hover:bg-white hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-deep-navy group-hover:bg-electric-blue group-hover:text-white transition-all duration-300 shadow-sm flex-shrink-0">
                    <MapPin className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-deep-navy mb-2 tracking-tight uppercase group-hover:text-electric-blue transition-colors">Our Location</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      QK Cold Stores (Marston) Ltd<br />
                      2 Toll Bar Road<br />
                      Marston, Grantham<br />
                      NG32 2HT
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-electric-blue/30 hover:bg-white hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-deep-navy group-hover:bg-electric-blue group-hover:text-white transition-all duration-300 shadow-sm flex-shrink-0">
                    <Phone className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-deep-navy mb-2 tracking-tight uppercase group-hover:text-electric-blue transition-colors">Phone</h3>
                    <a 
                      href="tel:+441234567890" 
                      className="text-2xl font-black text-deep-navy hover:text-electric-blue transition-colors"
                    >
                      01246 854999
                    </a>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">
                      Available 24/7 for enquiries
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-electric-blue/30 hover:bg-white hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-deep-navy group-hover:bg-electric-blue group-hover:text-white transition-all duration-300 shadow-sm flex-shrink-0">
                    <Mail className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-deep-navy mb-2 tracking-tight uppercase group-hover:text-electric-blue transition-colors">Email</h3>
                    <a 
                      href="mailto:info@qkcoldstores.co.uk" 
                      className="text-lg font-black text-deep-navy hover:text-electric-blue transition-colors break-all"
                    >
                      enquiries@qkcoldstores.co.uk
                    </a>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-electric-blue/30 hover:bg-white hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-deep-navy group-hover:bg-electric-blue group-hover:text-white transition-all duration-300 shadow-sm flex-shrink-0">
                    <Clock className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-deep-navy mb-2 tracking-tight uppercase group-hover:text-electric-blue transition-colors">Operating Hours</h3>
                    <div className="text-slate-500 font-medium leading-relaxed">
                      <div className="flex justify-between gap-4">
                        <span className="font-bold text-deep-navy">Warehouse:</span>
                        <span>24/7</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="font-bold text-deep-navy">Office:</span>
                        <span>Mon-Fri 8am-6pm</span>
                      </div>
                    </div>
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
