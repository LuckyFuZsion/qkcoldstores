/**
 * Server-side Cloudflare Turnstile check. If TURNSTILE_SECRET_KEY is not set the
 * check is skipped (so the site keeps working until the keys are added in Vercel).
 */
export async function verifyTurnstile(
  token: string | undefined,
  ip?: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim()
  if (!secret) {
    console.warn("TURNSTILE_SECRET_KEY is not set - CAPTCHA check skipped")
    return true
  }
  if (!token) return false

  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip && ip !== "unknown") body.set("remoteip", ip)
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    })
    if (!res.ok) return false
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}
