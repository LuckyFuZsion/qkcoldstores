"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const contactCards = [
  {
    icon: MapPin,
    title: "Our Location",
    content: (
      <p className="text-muted-foreground font-medium leading-relaxed">
        QK Cold Stores (Marston) Ltd<br />
        2 Toll Bar Road<br />
        Marston, Grantham<br />
        NG32 2HT
      </p>
    ),
  },
  {
    icon: Phone,
    title: "Phone",
    content: (
      <>
        <a
          href="tel:+441246854999"
          className="text-2xl font-black text-foreground hover:text-electric-blue transition-colors"
        >
          01246 854999
        </a>
        <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-2">
          Available 24/7 for enquiries
        </p>
      </>
    ),
  },
  {
    icon: Mail,
    title: "Email",
    content: (
      <>
        <a
          href="mailto:enquiries@qkcoldstores.co.uk"
          className="block w-full font-black text-foreground hover:text-electric-blue transition-colors leading-tight text-[clamp(0.8rem,2.6vw,1.125rem)] [overflow-wrap:anywhere] [word-break:break-all]"
        >
          enquiries@qkcoldstores.co.uk
        </a>
        <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-2">
          We respond within 24 hours
        </p>
      </>
    ),
    extraCardClass: "overflow-hidden",
    extraTextWrapperClass: "min-w-0 flex-1",
  },
  {
    icon: Clock,
    title: "Operating Hours",
    content: (
      <div className="text-muted-foreground font-medium leading-relaxed">
        <div className="flex justify-between gap-4">
          <span className="font-bold text-foreground">Warehouse:</span>
          <span>24/7</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="font-bold text-foreground">Office:</span>
          <span>Mon-Fri 8am-6pm</span>
        </div>
      </div>
    ),
  },
]

export function ContactSections() {
  return (
    <>
      {/* Contact Content */}
      <section className="py-24 md:py-32 bg-ice-blue/20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
            >
              <div className="bg-slate-50 rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-2xl relative">
                <h2 className="text-3xl font-black text-deep-navy mb-8 tracking-tight">
                  Send Us a Message
                </h2>
                <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-8">
              {contactCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`p-8 rounded-[2rem] bg-card border border-border hover:border-electric-blue/30 hover:shadow-2xl transition-all duration-300 group ${card.extraCardClass ?? ""}`}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center text-foreground group-hover:bg-electric-blue group-hover:text-white transition-all duration-300 shadow-sm flex-shrink-0 border border-border">
                      <card.icon className="h-8 w-8" />
                    </div>
                    <div className={card.extraTextWrapperClass ?? ""}>
                      <h3 className="text-xl font-black text-foreground mb-2 tracking-tight uppercase group-hover:text-electric-blue transition-colors">{card.title}</h3>
                      {card.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-secondary/30">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
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
        </motion.div>
      </section>
    </>
  )
}
