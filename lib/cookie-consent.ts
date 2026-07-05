export type CookieConsentStatus = "accepted" | "rejected"

export const COOKIE_CONSENT_KEY = "qk-cookie-consent"
export const COOKIE_CONSENT_EVENT = "cookie-consent-change"

export function getStoredConsent(): CookieConsentStatus | null {
  if (typeof window === "undefined") return null
  const value = localStorage.getItem(COOKIE_CONSENT_KEY)
  if (value === "accepted" || value === "rejected") return value
  return null
}

export function setStoredConsent(status: CookieConsentStatus) {
  localStorage.setItem(COOKIE_CONSENT_KEY, status)
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: status }))
}

export function hasAnalyticsConsent(): boolean {
  return getStoredConsent() === "accepted"
}
