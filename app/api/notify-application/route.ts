import { NextResponse } from "next/server"
import {
  sendApplicationNotification,
  type ApplicationNotifyInput,
} from "@/lib/application-email"

export const runtime = "nodejs"

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ApplicationNotifyInput> & {
      website?: string
    }

    if (String(body.website ?? "").trim()) {
      return NextResponse.json({ ok: true })
    }

    const firstName = String(body.firstName ?? "").trim()
    const lastName = String(body.lastName ?? "").trim()
    const email = String(body.email ?? "").trim()
    const cvFileName = String(body.cvFileName ?? "").trim()

    if (!firstName || !lastName || !email || !cvFileName || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid application payload" }, { status: 400 })
    }

    await sendApplicationNotification({
      firstName: firstName.slice(0, 100),
      lastName: lastName.slice(0, 100),
      email: email.slice(0, 200),
      phone: body.phone ? String(body.phone).slice(0, 50) : undefined,
      message: body.message ? String(body.message).slice(0, 5000) : undefined,
      vacancyId: body.vacancyId ?? null,
      vacancyTitle: body.vacancyTitle
        ? String(body.vacancyTitle).slice(0, 200)
        : null,
      cvFileName: cvFileName.slice(0, 260),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Notification failed"
    console.error("Application notification failed:", detail)
    return NextResponse.json({ error: detail }, { status: 500 })
  }
}
