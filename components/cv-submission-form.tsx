"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Upload, CheckCircle2, AlertCircle, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getActiveVacancies, submitApplication, type Vacancy } from "@/lib/vacancies"

const GENERAL_APPLICATION_VALUE = "__general__"

interface CVSubmissionFormProps {
  vacancyId?: string | null
  vacancyTitle?: string | null
  onClose?: () => void
}

export function CVSubmissionForm({
  vacancyId = null,
  vacancyTitle = null,
  onClose,
}: CVSubmissionFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [selectedVacancyId, setSelectedVacancyId] = useState<string>(
    vacancyId || GENERAL_APPLICATION_VALUE
  )
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getActiveVacancies()
      .then(setVacancies)
      .catch(console.error)
  }, [])

  useEffect(() => {
    setSelectedVacancyId(vacancyId || GENERAL_APPLICATION_VALUE)
  }, [vacancyId])

  const selectedVacancyTitle =
    selectedVacancyId === GENERAL_APPLICATION_VALUE
      ? null
      : vacancies.find((v) => v.id === selectedVacancyId)?.title ??
        (vacancyId && selectedVacancyId === vacancyId ? vacancyTitle : null)

  const handleVacancyChange = (value: string) => {
    setSelectedVacancyId(value)
    if (value === GENERAL_APPLICATION_VALUE && onClose) {
      onClose()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!cvFile) {
      setError("Please upload your CV.")
      return
    }
    if (!consent) {
      setError("Please agree to the data retention policy.")
      return
    }

    const applyingVacancyId =
      selectedVacancyId === GENERAL_APPLICATION_VALUE ? null : selectedVacancyId
    const applyingVacancyTitle =
      selectedVacancyId === GENERAL_APPLICATION_VALUE ? null : selectedVacancyTitle

    setSubmitting(true)
    try {
      const saved = await submitApplication(
        {
          ...formData,
          vacancyId: applyingVacancyId,
          vacancyTitle: applyingVacancyTitle,
        },
        cvFile
      )

      try {
        const notifyResponse = await fetch("/api/notify-application", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            vacancyId: applyingVacancyId,
            vacancyTitle: applyingVacancyTitle,
            cvFileName: saved.cvFileName,
          }),
        })
        if (!notifyResponse.ok) {
          const detail = await notifyResponse.text().catch(() => "")
          console.error(
            `Application saved, but careers email notification failed (${notifyResponse.status}):`,
            detail
          )
        }
      } catch (notifyError) {
        console.error(
          "Application saved, but careers email notification failed:",
          notifyError
        )
      }

      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError(
        "Something went wrong. Please try again or email us directly at careers@qkcoldstores.co.uk."
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-8"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-black text-foreground mb-4">Application Submitted</h3>
        <p className="text-muted-foreground font-medium max-w-md mx-auto">
          Thank you for your interest in joining QK Cold Stores. We will review your application and
          be in touch if a suitable opportunity arises.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="vacancy" className="font-bold text-sm uppercase tracking-wider">
          Job applying for (if advertised)
        </Label>
        <Select value={selectedVacancyId} onValueChange={handleVacancyChange}>
          <SelectTrigger id="vacancy" className="rounded-xl border-border h-12">
            <SelectValue placeholder="Select a role (optional)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={GENERAL_APPLICATION_VALUE}>
              Not applying for a specific role
            </SelectItem>
            {vacancies.map((vacancy) => (
              <SelectItem key={vacancy.id} value={vacancy.id}>
                {vacancy.title}
              </SelectItem>
            ))}
            {vacancyId &&
              vacancyTitle &&
              !vacancies.some((v) => v.id === vacancyId) && (
                <SelectItem value={vacancyId}>{vacancyTitle}</SelectItem>
              )}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground font-medium">
          Optional - leave as &quot;Not applying for a specific role&quot; to send a general CV.
        </p>
      </div>

      {selectedVacancyTitle && (
        <div className="flex items-center justify-between bg-electric-blue/5 border border-electric-blue/20 rounded-xl px-4 py-3">
          <p className="text-sm font-bold text-foreground">
            Applying for: <span className="text-electric-blue">{selectedVacancyTitle}</span>
          </p>
          <button
            type="button"
            onClick={() => handleVacancyChange(GENERAL_APPLICATION_VALUE)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Clear selected role"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="font-bold text-sm uppercase tracking-wider">
            First Name *
          </Label>
          <Input
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
            className="rounded-xl border-border h-12"
            placeholder="John"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="font-bold text-sm uppercase tracking-wider">
            Last Name *
          </Label>
          <Input
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
            className="rounded-xl border-border h-12"
            placeholder="Smith"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="font-bold text-sm uppercase tracking-wider">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
            className="rounded-xl border-border h-12"
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="font-bold text-sm uppercase tracking-wider">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
            className="rounded-xl border-border h-12"
            placeholder="07700 900000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="font-bold text-sm uppercase tracking-wider">
          Cover Note
        </Label>
        <Textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
          className="rounded-xl border-border resize-none"
          placeholder="Tell us a bit about yourself and why you'd like to work at QK Cold Stores..."
        />
      </div>

      <div className="space-y-2">
        <Label className="font-bold text-sm uppercase tracking-wider">Upload CV *</Label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-electric-blue/50 hover:bg-electric-blue/5 transition-all"
        >
          {cvFile ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="w-8 h-8 text-electric-blue" />
              <div className="text-left">
                <p className="font-bold text-foreground">{cvFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setCvFile(null)
                }}
                className="ml-4 text-muted-foreground hover:text-destructive"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="font-bold text-foreground mb-1">Click to upload your CV</p>
              <p className="text-sm text-muted-foreground">PDF, DOC or DOCX (max 10MB)</p>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file && file.size <= 10 * 1024 * 1024) {
              setCvFile(file)
              setError(null)
            } else if (file) {
              setError("File size must be under 10MB.")
            }
          }}
        />
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked === true)}
          className="mt-0.5"
        />
        <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
          I consent to QK Cold Stores storing my personal information and CV for up to 6 months for
          recruitment purposes. My data will be automatically deleted after this period. See our{" "}
          <a href="/privacy" className="text-electric-blue font-bold hover:underline">
            Privacy Policy
          </a>{" "}
          for details.
        </Label>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm font-medium p-3 rounded-xl bg-destructive/10">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-deep-navy text-white hover:bg-black font-bold py-7 rounded-2xl shadow-xl text-lg"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  )
}
