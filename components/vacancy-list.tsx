"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, PoundSterling, FileText, Download, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getActiveVacancies, type Vacancy } from "@/lib/vacancies"
import { downloadCloudinaryFile } from "@/lib/cloudinary"

export function VacancyList({ onApply }: { onApply: (vacancyId: string, vacancyTitle: string) => void }) {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    getActiveVacancies()
      .then(setVacancies)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 rounded-[2rem] bg-card border border-border animate-pulse" />
        ))}
      </div>
    )
  }

  if (vacancies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 px-8 rounded-[2rem] bg-card border border-border"
      >
        <Briefcase className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
        <h3 className="text-2xl font-black text-foreground mb-4">No Current Vacancies</h3>
        <p className="text-muted-foreground font-medium max-w-md mx-auto">
          There are no open positions at the moment, but we are always keen to hear from talented people. 
          Submit your CV below and we will keep it on file for 6 months.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {vacancies.map((vacancy, index) => (
        <motion.div
          key={vacancy.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="rounded-[2rem] bg-card border border-border p-8 hover:border-electric-blue/30 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-electric-blue/10 text-electric-blue border-0 font-bold uppercase tracking-wider text-xs">
                  Active
                </Badge>
              </div>
              <h3 className="text-2xl font-black text-foreground tracking-tight">{vacancy.title}</h3>
            </div>
            <div className="flex items-center gap-2 text-foreground font-bold text-lg shrink-0">
              <PoundSterling className="w-5 h-5 text-electric-blue" />
              {vacancy.salary}
            </div>
          </div>

          <button
            onClick={() => setExpandedId(expandedId === vacancy.id ? null : vacancy.id)}
            className="flex items-center gap-2 text-electric-blue font-bold text-sm uppercase tracking-wider mb-4 hover:gap-3 transition-all"
          >
            {expandedId === vacancy.id ? "Hide Details" : "View Details"}
            {expandedId === vacancy.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {expandedId === vacancy.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6"
            >
              <p className="text-muted-foreground font-medium leading-relaxed whitespace-pre-line">
                {vacancy.description}
              </p>
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => onApply(vacancy.id, vacancy.title)}
              className="bg-deep-navy text-white hover:bg-black font-bold rounded-xl shadow-lg"
            >
              Apply Now
            </Button>
            {vacancy.specDocumentUrl && (
              <Button
                variant="outline"
                className="font-bold rounded-xl"
                onClick={async () => {
                  try {
                    await downloadCloudinaryFile(
                      vacancy.specDocumentUrl!,
                      vacancy.specDocumentName ?? "job-specification"
                    )
                  } catch (err) {
                    alert(
                      err instanceof Error
                        ? err.message
                        : "Could not download this file. Please try again."
                    )
                  }
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                <FileText className="w-4 h-4 mr-2" />
                {vacancy.specDocumentName || "Job Specification"}
              </Button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
