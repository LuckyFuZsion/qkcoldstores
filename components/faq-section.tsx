"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What temperature ranges do you offer for cold storage?",
    answer: "We provide multi-temperature storage zones ranging from -25°C for blast-frozen products to +5°C for chilled goods. Each zone is independently monitored and controlled 24/7 to ensure optimal product preservation.",
  },
  {
    question: "What accreditations and certifications does QK Cold Stores hold?",
    answer: "QK Cold Stores is BRC Storage & Distribution accredited, ensuring the highest standards of food safety and quality. We also maintain HACCP certification and comply with all relevant food safety regulations. We are also accredited to BRCGS Food Safety and START! Standard.",
  },
  {
    question: "How does the Empirica stock management system work?",
    answer: "Empirica is our advanced inventory management platform that provides real-time stock visibility, FIFO/FEFO management, batch tracking, and comprehensive reporting. Clients can access their inventory data 24/7 through our secure online portal.",
  },
  {
    question: "What is your blast freezing capacity?",
    answer: "We have over 50K pallet capacity across our site. Our blast freezing facility can rapidly reduce product temperatures to -25°C or below, preserving quality and extending shelf life. We handle a variety of products including fresh produce, prepared foods and drinks with batch tracking throughout the process, which are validated.",
  },
  {
    question: "How do I become a customer of QK Cold Stores?",
    answer: "Simply contact us through our website or call our commercial team. We'll arrange a facility visit, discuss your specific requirements, and provide a tailored proposal. We offer flexible contract arrangements to suit businesses of all sizes. Please contact info@qkcoldstores.co.uk for further information.",
  },
  {
    question: "Do you offer short-term or seasonal storage options?",
    answer: "Yes, we understand that storage needs can fluctuate. We offer flexible arrangements including short-term contracts and seasonal storage options to accommodate peak periods, product launches, or temporary overflow requirements.",
  },
  {
    question: "What time can we access the site?",
    answer: "We operate 24/7. Intake hours may vary. Office hours are Monday to Friday, 9am - 5pm.",
  },
]

export function FAQSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-electric-blue font-semibold text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6 text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg mb-8 text-pretty">
              Find answers to common questions about our cold storage services,
              facilities, and how we can support your business.
            </p>
            <p className="text-muted-foreground">
              Can&apos;t find what you&apos;re looking for?{" "}
              <a href="/location" className="text-electric-blue font-medium hover:underline">
                Contact our team
              </a>{" "}
              for personalised assistance.
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-card rounded-lg border border-border px-6 shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-electric-blue hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
