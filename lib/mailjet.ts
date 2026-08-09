import { SITE_URL } from "@/lib/site-config"
import type { EnquiryInput } from "@/lib/enquiries"

const MAILJET_SEND_URL = "https://api.mailjet.com/v3.1/send"

function getNotifyEmails(): string[] {
  const raw =
    process.env.ENQUIRY_NOTIFY_EMAILS ??
    "lrichardson-whalley@qkcoldstores.co.uk,lhornsby@qkcoldstores.co.uk"
  return raw
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

type MailjetSendResponse = {
  Messages?: Array<{
    Status?: string
    Errors?: Array<{ ErrorMessage?: string; ErrorCode?: string }>
    To?: Array<{ Email?: string; MessageID?: number }>
  }>
}

export async function sendEnquiryNotification(data: EnquiryInput): Promise<void> {
  const apiKey = process.env.MAILJET_API_KEY?.trim()
  const secretKey = process.env.MAILJET_SECRET_KEY?.trim()
  const fromEmail =
    process.env.MAILJET_FROM_EMAIL?.trim() || "info@webfuzsion.co.uk"
  const fromName = process.env.MAILJET_FROM_NAME?.trim() || "QK Cold Stores Website"

  if (!apiKey || !secretKey) {
    throw new Error("Mailjet is not configured (missing MAILJET_API_KEY or MAILJET_SECRET_KEY)")
  }

  const recipients = getNotifyEmails()
  if (recipients.length === 0) {
    throw new Error("No ENQUIRY_NOTIFY_EMAILS configured")
  }

  const adminUrl = `${SITE_URL.replace(/\/$/, "")}/admin`
  const name = data.name.trim()
  const email = data.email.trim()
  const company = data.company?.trim() || "Not provided"
  const phone = data.phone?.trim() || "Not provided"
  const service = data.service?.trim() || "Not specified"
  const message = data.message.trim()

  const textPart = [
    "A new enquiry was submitted on the QK Cold Stores website.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    "",
    "Message:",
    message,
    "",
    `Please sign in to the admin area to manage it: ${adminUrl}`,
  ].join("\n")

  const htmlPart = `
    <p>A new enquiry was submitted on the QK Cold Stores website.</p>
    <p><strong>Name:</strong> ${escapeHtml(name)}<br />
    <strong>Email:</strong> ${escapeHtml(email)}<br />
    <strong>Company:</strong> ${escapeHtml(company)}<br />
    <strong>Phone:</strong> ${escapeHtml(phone)}<br />
    <strong>Service:</strong> ${escapeHtml(service)}</p>
    <p><strong>Message:</strong><br />${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    <p><a href="${escapeHtml(adminUrl)}">Open the admin area</a> to review and reply.</p>
  `

  const auth = Buffer.from(`${apiKey}:${secretKey}`).toString("base64")

  const response = await fetch(MAILJET_SEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      Messages: [
        {
          From: { Email: fromEmail, Name: fromName },
          To: recipients.map((Email) => ({ Email })),
          ReplyTo: { Email: email, Name: name },
          Subject: "New website enquiry - please check admin",
          TextPart: textPart,
          HTMLPart: htmlPart,
        },
      ],
    }),
  })

  const bodyText = await response.text().catch(() => "")
  let parsed: MailjetSendResponse | null = null
  try {
    parsed = bodyText ? (JSON.parse(bodyText) as MailjetSendResponse) : null
  } catch {
    parsed = null
  }

  if (!response.ok) {
    throw new Error(`Mailjet send failed (${response.status}): ${bodyText.slice(0, 300)}`)
  }

  const messageResult = parsed?.Messages?.[0]
  if (!messageResult || messageResult.Status !== "success") {
    const errorDetail =
      messageResult?.Errors?.map((e) => e.ErrorMessage || e.ErrorCode).filter(Boolean).join("; ") ||
      bodyText.slice(0, 300) ||
      "Unknown Mailjet response"
    throw new Error(`Mailjet did not accept the message: ${errorDetail}`)
  }

  console.info(
    `Enquiry notification sent via Mailjet to ${recipients.join(", ")} (MessageID: ${
      messageResult.To?.[0]?.MessageID ?? "n/a"
    })`
  )
}
