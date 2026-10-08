import { NextResponse } from "next/server"
import { sendEnquiryNotification } from "@/lib/enquiry-email"
import type { EnquiryInput } from "@/lib/enquiries"
import { getClientIp, isRateLimited } from "@/lib/rate-limit"
import { verifyTurnstile } from "@/lib/turnstile"

export const runtime = "nodejs"

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  if (isRateLimited(`enquiry:ip:${getClientIp(request)}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  try {
    const body = (await request.json()) as Partial<EnquiryInput> & { website?: string; turnstileToken?: string }

    // Honeypot filled - pretend success so bots learn nothing
    if (String(body.website ?? "").trim()) {
      return NextResponse.json({ ok: true })
    }

    if (!(await verifyTurnstile(body.turnstileToken, getClientIp(request)))) {
      return NextResponse.json({ error: "CAPTCHA check failed" }, { status: 400 })
    }

    const name = String(body.name ?? "").trim()
    const email = String(body.email ?? "").trim()
    const message = String(body.message ?? "").trim()

    if (!name || !email || !message || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid enquiry payload" }, { status: 400 })
    }

    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: "Enquiry payload too long" }, { status: 400 })
    }

    if (isRateLimited(`enquiry:email:${email.toLowerCase()}`, 2, 60 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    await sendEnquiryNotification({
      name,
      email,
      company: body.company ? String(body.company).slice(0, 200) : undefined,
      phone: body.phone ? String(body.phone).slice(0, 50) : undefined,
      service: body.service ? String(body.service).slice(0, 200) : undefined,
      message,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Notification failed"
    console.error("Enquiry notification failed:", detail)
    return NextResponse.json({ error: "Notification failed" }, { status: 500 })
  }
}
