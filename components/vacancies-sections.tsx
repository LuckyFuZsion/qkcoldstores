"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  Send,
  CalendarDays,
  Landmark,
  Shield,
  HeartHandshake,
  Car,
} from "lucide-react"
import { VacancyList } from "./vacancy-list"
import { CVSubmissionForm } from "./cv-submission-form"

const CAREER_BENEFITS = [
  {
    icon: CalendarDays,
    title: "Enhanced annual leave",
    description: "With long service",
  },
  {
    icon: Landmark,
    title: "Company pension",
    description: "Investing in your future",
  },
  {
    icon: Shield,
    title: "Life assurance",
    description: "Peace of mind for you and your family",
  },
  {
    icon: HeartHandshake,
    title: "Employee Assistance Programme",
    description: "Support when you need it",
  },
  {
    icon: Car,
    title: "Onsite free car parking",
    description: "Convenient parking at our facility",
  },
] as const

export function VacanciesSections() {
  const [applyingFor, setApplyingFor] = useState<{ id: string; title: string } | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const handleApply = (vacancyId: string, vacancyTitle: string) => {
    setApplyingFor({ id: vacancyId, title: vacancyTitle })
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  return (
    <>
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center md:text-left"
            >
              <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block">
                Why work for us?
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
                Benefits for our people
              </h2>
              <p className="text-lg text-muted-foreground font-medium max-w-3xl">
                At QK Cold Stores we like to invest in our people and offer the following benefits
                for all our employees.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CAREER_BENEFITS.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="rounded-[1.5rem] bg-card border border-border p-6 md:p-8"
                >
                  <div className="w-12 h-12 rounded-2xl bg-electric-blue/10 flex items-center justify-center mb-5">
                    <benefit.icon className="w-6 h-6 text-electric-blue" />
                  </div>
                  <h3 className="text-lg font-black text-foreground tracking-tight mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block">
                Current Openings
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
                Open Positions
              </h2>
              <p className="text-lg text-muted-foreground font-medium">
                Explore our current openings and find the right role for you.
              </p>
            </motion.div>

            <VacancyList onApply={handleApply} />
          </div>
        </div>
      </section>

      <section ref={formRef} className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="w-16 h-16 rounded-2xl bg-electric-blue/10 flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-electric-blue" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
                Submit Your CV
              </h2>
              <p className="text-lg text-muted-foreground font-medium">
                Apply for a listed role below, or send a general CV and we will keep it on file for
                6 months. We are always keen to hear from talented people.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-[2rem] border border-border p-8 md:p-10 shadow-xl"
            >
              <CVSubmissionForm
                vacancyId={applyingFor?.id}
                vacancyTitle={applyingFor?.title}
                onClose={() => setApplyingFor(null)}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
