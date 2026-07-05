"use client"

import { useEffect, useState } from "react"
import { getActiveVacancies, type Vacancy } from "@/lib/vacancies"
import { buildJobPostingJsonLd } from "@/lib/json-ld"
import { JsonLdScript } from "@/components/json-ld-script"

export function VacancyJobPostingSchema() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])

  useEffect(() => {
    getActiveVacancies()
      .then(setVacancies)
      .catch(console.error)
  }, [])

  if (vacancies.length === 0) return null

  return (
    <JsonLdScript data={vacancies.map((vacancy) => buildJobPostingJsonLd(vacancy))} />
  )
}
