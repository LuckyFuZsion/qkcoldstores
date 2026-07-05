"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Leaf, CheckCircle, ChevronRight } from "lucide-react"
import { additionalServices, serviceDetailItems } from "@/lib/services-content"

export function ServicesSections() {
  return (
    <>
      <section className="py-24 md:py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {serviceDetailItems.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-card border border-border hover:border-electric-blue/30 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center text-foreground group-hover:bg-electric-blue group-hover:text-white transition-all duration-300 shadow-sm mb-6 border border-border">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black text-foreground mb-4 tracking-tight uppercase group-hover:text-electric-blue transition-colors">{service.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-foreground font-bold text-sm">
                      <div className="w-5 h-5 rounded-full bg-electric-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-electric-blue" />
                      </div>
                      <span className="uppercase tracking-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="md:col-span-2 p-8 rounded-[2rem] bg-card border border-border hover:border-electric-blue/30 hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-xl font-black text-foreground mb-6 tracking-tight uppercase">Additional Services</h3>
              <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {additionalServices.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-foreground font-bold text-sm uppercase tracking-tight px-4 py-3 rounded-xl bg-background border border-border"
                  >
                    <CheckCircle className="h-4 w-4 text-electric-blue shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-electric-blue/10 flex items-center justify-center text-electric-blue border border-border">
                <Leaf className="h-8 w-8" />
              </div>
              <div>
                <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] block">Our Commitment</span>
                <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">Environment & Sustainability</h2>
              </div>
            </div>
            <div className="space-y-6 text-lg text-muted-foreground font-medium leading-relaxed">
              <p>
                QK Cold Stores (Marston) are committed to operating our cold storage facility in a responsible and environmentally conscious manner.
              </p>
              <p>
                Recent investments in on-site solar energy generation have helped reduce our reliance on grid electricity, supporting a more sustainable operation. We are also exploring opportunities to further enhance waste management and recycling practices across the site, with a focus on reducing waste and improving resource efficiency.
              </p>
              <p>
                Through ongoing investment, innovation, and responsible business practices, we aim to minimise our environmental impact while continuing to provide safe, reliable, and efficient cold storage services for our customers.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tight leading-[1.1]">
            Ready to <span className="text-electric-blue text-glow">Discuss Requirements?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
            Contact our team today for a tailored quote and discover how we can support your cold chain needs.
          </p>
          <Button asChild size="lg" className="bg-deep-navy text-white hover:bg-black font-bold px-10 py-8 rounded-2xl shadow-xl">
            <Link href="/contact">
              Get in Touch
              <ChevronRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </>
  )
}
