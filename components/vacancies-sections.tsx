"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { VacancyList } from "./vacancy-list"
import { CVSubmissionForm } from "./cv-submission-form"

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
      {/* Job Listings */}
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
                Explore our current vacancies and find the right role for you.
              </p>
            </motion.div>

            <VacancyList onApply={handleApply} />
          </div>
        </div>
      </section>

      {/* CV Submission Section */}
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
                Not seeing the right role? Send us your CV and we will keep it on file for 6 months.
                We are always keen to hear from talented people.
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
