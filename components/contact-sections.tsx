"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ContactForm } from "@/components/contact-form"
import { FacilityMap } from "@/components/facility-map"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { OPENING_HOURS_TEXT } from "@/lib/services-content"
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image-config"

const ENQUIRIES_EMAIL = "enquiries@qkcoldstores.co.uk"

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
    title: "Direct Line",
    content: (
      <>
        <a
          href="tel:+441400259300"
          className="text-2xl font-black text-foreground hover:text-electric-blue transition-colors"
        >
          01400 259300
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
          href={`mailto:${ENQUIRIES_EMAIL}`}
          className="block w-full font-black text-foreground hover:text-electric-blue transition-colors leading-tight text-[clamp(0.8rem,2.6vw,1.125rem)] [overflow-wrap:anywhere] [word-break:break-all]"
        >
          {ENQUIRIES_EMAIL}
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
    title: "Opening Hours",
    content: (
      <div className="text-muted-foreground font-medium leading-relaxed space-y-2">
        <p>
          <span className="font-bold text-foreground">{OPENING_HOURS_TEXT.operational}</span>
          <br />
          {OPENING_HOURS_TEXT.operationalNote}
        </p>
        <p>
          <span className="font-bold text-foreground">{OPENING_HOURS_TEXT.office}</span>
        </p>
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
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center gap-4 p-8 rounded-[2rem] bg-card border border-border"
              >
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src="/images/gemma.webp"
                    alt="Member of the QK Cold Stores team"
                    fill
                    sizes={IMAGE_SIZES.avatar}
                    quality={IMAGE_QUALITY.content}
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              </motion.div>

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
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border h-[400px]">
            <FacilityMap className="absolute inset-0" />
          </div>
        </motion.div>
      </section>
    </>
  )
}
