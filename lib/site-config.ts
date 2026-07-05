export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://qkcoldstores.co.uk"

export const EMPERICA_PORTAL_URL =
  process.env.NEXT_PUBLIC_EMPERICA_PORTAL_URL ?? ""

export const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean)

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  if (ADMIN_EMAILS.length === 0) return true
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
