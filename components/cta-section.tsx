"use client"

import { Button } from "@/components/ui/button"
import { Phone, ArrowRight, MessageSquare } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { motion } from "framer-motion"

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Column - Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 text-electric-blue text-xs font-black uppercase tracking-widest mb-8">
              <MessageSquare className="w-4 h-4" />
              Contact Us
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tight leading-[1.1]">
              Contact Us to <br />
              <span className="text-electric-blue text-glow">Discuss Your Requirements</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-medium max-w-xl">
              Our team of specialists is ready to create a tailored cold chain solution 
              for your business. Reach out today for a consultation or a quote.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-[1.25rem] bg-card flex items-center justify-center text-electric-blue shadow-sm border border-border">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Call Our Team</p>
                  <a href="tel:+441234567890" className="text-2xl font-black text-foreground hover:text-electric-blue transition-colors">01246 854999</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card rounded-[3rem] p-10 md:p-16 border border-border shadow-2xl relative"
          >
            <h3 className="text-3xl font-black text-foreground mb-8 tracking-tight">Submit an Enquiry</h3>
            <ContactForm variant="compact" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
