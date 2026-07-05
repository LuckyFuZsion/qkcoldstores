export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://qkcoldstores.co.uk"

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
  process.env.NEXT_PUBLIC_EMPERICA_PORTAL_URL ?? ""

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
  "/vacancies",
  "/contact",
  "/portal",
  "/privacy",
  "/cookies",
] as const
