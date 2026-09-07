export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://qkcoldstores.co.uk"
).replace(/\/$/, "")

/** Stable first-publish date for schema freshness signals */
export const SITE_DATE_PUBLISHED =
  process.env.NEXT_PUBLIC_SITE_DATE_PUBLISHED?.trim() || "2026-03-01"

/** Override when you ship a major content update; otherwise uses build/deploy date */
export const SITE_DATE_MODIFIED =
  process.env.NEXT_PUBLIC_SITE_DATE_MODIFIED?.trim() ||
  new Date().toISOString().slice(0, 10)

export const SITE_ADDRESS = {
  streetAddress: "2 Toll Bar Road",
  addressLocality: "Marston, Grantham",
  addressRegion: "Lincolnshire",
  postalCode: "NG32 2HT",
  addressCountry: "GB",
  latitude: 52.9659668,
  longitude: -0.6936068,
} as const

export const SOCIAL_PROFILES = [
  process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
  process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
  process.env.NEXT_PUBLIC_SOCIAL_TWITTER,
]
  .map((url) => url?.trim())
  .filter((url): url is string => Boolean(url))

export const EMPERICA_PORTAL_URL =
  process.env.NEXT_PUBLIC_EMPERICA_PORTAL_URL?.trim() ||
  "https://clientportal.qkcoldstores.co.uk/webview/"

export const ADMIN_EMAILS = (
  process.env.NEXT_PUBLIC_ADMIN_EMAILS ??
  "lrichardson-whalley@qkcoldstores.co.uk,info@webfuzsion.co.uk"
)
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean)

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.trim().toLowerCase())
}

export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/team",
  "/location",
  "/services",
  "/faq",
  "/careers",
  "/contact",
  "/privacy",
  "/cookies",
] as const
