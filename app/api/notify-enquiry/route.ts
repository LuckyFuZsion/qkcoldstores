import { NextResponse } from "next/server"
import { sendEnquiryNotification } from "@/lib/mailjet"
import type { EnquiryInput } from "@/lib/enquiries"

export const runtime = "nodejs"

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<EnquiryInput>
    const name = String(body.name ?? "").trim()
    const email = String(body.email ?? "").trim()
    const message = String(body.message ?? "").trim()

    if (!name || !email || !message || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid enquiry payload" }, { status: 400 })
    }

    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: "Enquiry payload too long" }, { status: 400 })
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
    return NextResponse.json({ error: detail }, { status: 500 })
  }
}
