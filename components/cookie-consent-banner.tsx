"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  COOKIE_CONSENT_EVENT,
  getStoredConsent,
  setStoredConsent,
  type CookieConsentStatus,
} from "@/lib/cookie-consent"

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(getStoredConsent() === null)
  }, [])

  const saveConsent = (status: CookieConsentStatus) => {
    setStoredConsent(status)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
    >
      <div className="container mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <h2 id="cookie-consent-title" className="text-lg font-black text-foreground mb-2">
          Cookie preferences
        </h2>
        <p id="cookie-consent-description" className="text-sm text-muted-foreground leading-relaxed mb-5">
          We use essential cookies to run this site. With your consent, we also use analytics cookies to
          understand how the site is used. You can read more in our{" "}
          <Link href="/cookies" className="text-electric-blue font-bold hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => saveConsent("accepted")}
            className="bg-electric-blue hover:bg-electric-blue/90 text-white font-bold rounded-xl"
          >
            Accept analytics cookies
          </Button>
          <Button
            variant="outline"
            onClick={() => saveConsent("rejected")}
            className="font-bold rounded-xl"
          >
            Reject non-essential cookies
          </Button>
        </div>
      </div>
    </div>
  )
}

export function useCookieConsent(): CookieConsentStatus | null {
  const [consent, setConsent] = useState<CookieConsentStatus | null>(null)

  useEffect(() => {
    setConsent(getStoredConsent())

    const handleChange = () => setConsent(getStoredConsent())
    window.addEventListener(COOKIE_CONSENT_EVENT, handleChange)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleChange)
  }, [])

  return consent
}
