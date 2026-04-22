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
import { Send, CheckCircle } from "lucide-react"

interface ContactFormProps {
  variant?: "default" | "compact"
}

export function ContactForm({ variant = "default" }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Mock submission delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
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

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name-compact">Name</Label>
            <Input
              id="name-compact"
              name="name"
              placeholder="Your name"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-electric-blue"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-compact">Email</Label>
            <Input
              id="email-compact"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-electric-blue"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message-compact">Message</Label>
          <Textarea
            id="message-compact"
            name="message"
            placeholder="Tell us about your cold storage needs..."
            rows={3}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-electric-blue resize-none"
          />
        </div>
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
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Smith"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            name="company"
            placeholder="Your company"
          />
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@company.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="01234 567 890"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">Service Interest</Label>
        <Select name="service">
          <SelectTrigger>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cold-storage">Bulk Cold Storage</SelectItem>
            <SelectItem value="blast-freezing">Blast Freezing</SelectItem>
            <SelectItem value="distribution">Distribution</SelectItem>
            <SelectItem value="inventory">Inventory Management</SelectItem>
            <SelectItem value="cross-docking">Cross-Docking</SelectItem>
            <SelectItem value="order-fulfilment">Order Fulfilment</SelectItem>
            <SelectItem value="other">Other / General Enquiry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Your Message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your cold storage requirements, volume expectations, or any questions you have..."
          rows={5}
          required
          className="resize-none"
        />
      </div>

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
