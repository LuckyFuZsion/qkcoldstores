"use client"

import { Analytics } from "@vercel/analytics/next"
import { FirebaseAnalytics } from "@/components/firebase-analytics"
import { useCookieConsent } from "@/components/cookie-consent-banner"

export function ConsentGatedAnalytics() {
  const consent = useCookieConsent()

  if (consent !== "accepted") return null

  return (
    <>
      <FirebaseAnalytics />
      {process.env.NODE_ENV === "production" ? <Analytics /> : null}
    </>
  )
}
