"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { submitEnquiry } from "@/lib/enquiries"

interface ContactFormProps {
  variant?: "default" | "compact"
}

export function ContactForm({ variant = "default" }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [service, setService] = useState<string>("")
  const fieldClassName =
    "bg-white text-deep-navy border-slate-200 placeholder:text-slate-400 focus-visible:border-electric-blue dark:bg-white dark:text-deep-navy dark:border-slate-200 dark:placeholder:text-slate-400"
  const labelClassName = "text-deep-navy dark:text-deep-navy"
  const compactFieldClassName =
    "bg-white text-deep-navy border-slate-200 placeholder:text-slate-400 focus-visible:border-electric-blue dark:bg-white/10 dark:border-white/20 dark:text-white dark:placeholder:text-white/50"
  const compactLabelClassName = "text-deep-navy dark:text-white"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      await submitEnquiry({
        name: String(formData.get("name") ?? ""),
        company: String(formData.get("company") ?? "") || undefined,
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? "") || undefined,
        service: service || undefined,
        message: String(formData.get("message") ?? ""),
      })
      form.reset()
      setService("")
      setIsSubmitted(true)
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again or call us on 01400 259300.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
        <p className="text-muted-foreground max-w-sm">
          Thank you for contacting us. Our team will get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  const errorBanner = error ? (
    <div className="flex items-center gap-2 text-destructive text-sm font-medium p-3 rounded-xl bg-destructive/10">
      <AlertCircle className="w-4 h-4 shrink-0" />
      {error}
    </div>
  ) : null

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name-compact" className={compactLabelClassName}>Name</Label>
            <Input
              id="name-compact"
              name="name"
              placeholder="Your name"
              required
              className={compactFieldClassName}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-compact" className={compactLabelClassName}>Email</Label>
            <Input
              id="email-compact"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              className={compactFieldClassName}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message-compact" className={compactLabelClassName}>Message</Label>
          <Textarea
            id="message-compact"
            name="message"
            placeholder="Tell us about your cold storage needs..."
            rows={3}
            required
            className={`${compactFieldClassName} resize-none`}
          />
        </div>
        {errorBanner}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white font-semibold"
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className={labelClassName}>Full Name *</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Smith"
            required
            className={fieldClassName}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company" className={labelClassName}>Company Name</Label>
          <Input
            id="company"
            name="company"
            placeholder="Your company"
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email" className={labelClassName}>Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@company.com"
            required
            className={fieldClassName}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className={labelClassName}>Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="01400 259300"
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="service" className={labelClassName}>Service Interest</Label>
        <Select value={service} onValueChange={setService}>
          <SelectTrigger className={fieldClassName}>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Storage">Storage</SelectItem>
            <SelectItem value="Blast Freezing">Blast Freezing</SelectItem>
            <SelectItem value="Tempering">Tempering</SelectItem>
            <SelectItem value="Container Loading and Unloading">Container Loading and Unloading</SelectItem>
            <SelectItem value="Fresh Packing">Fresh Packing</SelectItem>
            <SelectItem value="Handling">Handling</SelectItem>
            <SelectItem value="Other / General Enquiry">Other / General Enquiry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className={labelClassName}>Your Message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your cold storage requirements, volume expectations, or any questions you have..."
          rows={5}
          required
          className={`${fieldClassName} resize-none`}
        />
      </div>

      {errorBanner}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto bg-electric-blue hover:bg-electric-blue/90 text-white font-semibold"
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            Send Message
            <Send className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>

      <p className="text-sm text-muted-foreground">
        * Required fields. We typically respond within 24 hours.
      </p>
    </form>
  )
}
