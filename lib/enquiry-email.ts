import { Resend } from "resend"
import { SITE_URL } from "@/lib/site-config"
import type { EnquiryInput } from "@/lib/enquiries"

const PUBLIC_ENQUIRIES_EMAIL = "enquiries@qkcoldstores.co.uk"
const PUBLIC_PHONE = "01400 259300"

function parseEmailList(raw: string | undefined): string[] {
  if (!raw) return []
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

function getFromAddress(): { apiKey: string; from: string; fromEmail: string } {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() || "donotreply@qkcoldstores.co.uk"
  const fromName = process.env.RESEND_FROM_NAME?.trim() || "QK Cold Stores Website"

  if (!apiKey) {
    throw new Error("Resend is not configured (missing RESEND_API_KEY)")
  }

  return { apiKey, fromEmail, from: `${fromName} <${fromEmail}>` }
}

async function sendAdminAlert(
  resend: Resend,
  from: string,
  data: EnquiryInput
): Promise<void> {
  const recipients = parseEmailList(
    process.env.ENQUIRY_NOTIFY_EMAILS ?? PUBLIC_ENQUIRIES_EMAIL
  )
  if (recipients.length === 0) {
    throw new Error("No ENQUIRY_NOTIFY_EMAILS configured")
  }

  const bcc = parseEmailList(process.env.ENQUIRY_BCC_EMAILS)
  const adminUrl = `${SITE_URL.replace(/\/$/, "")}/admin`
  const name = data.name.trim()
  const email = data.email.trim()
  const company = data.company?.trim() || "Not provided"
  const phone = data.phone?.trim() || "Not provided"
  const service = data.service?.trim() || "Not specified"
  const message = data.message.trim()

  const text = [
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

  const html = `
    <p>A new enquiry was submitted on the QK Cold Stores website.</p>
    <p><strong>Name:</strong> ${escapeHtml(name)}<br />
    <strong>Email:</strong> ${escapeHtml(email)}<br />
    <strong>Company:</strong> ${escapeHtml(company)}<br />
    <strong>Phone:</strong> ${escapeHtml(phone)}<br />
    <strong>Service:</strong> ${escapeHtml(service)}</p>
    <p><strong>Message:</strong><br />${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    <p><a href="${escapeHtml(adminUrl)}">Open the admin area</a> to review and reply.</p>
  `

  const { data: sent, error } = await resend.emails.send({
    from,
    to: recipients,
    ...(bcc.length > 0 ? { bcc } : {}),
    replyTo: email,
    subject: "New website enquiry - please check admin",
    text,
    html,
  })

  if (error) {
    throw new Error(`Resend admin alert failed: ${error.message}`)
  }

  console.info(
    `Enquiry admin alert sent via Resend to ${recipients.join(", ")}${
      bcc.length ? ` (bcc: ${bcc.join(", ")})` : ""
    } (id: ${sent?.id ?? "n/a"})`
  )
}

async function sendSubmitterConfirmation(
  resend: Resend,
  from: string,
  data: EnquiryInput
): Promise<void> {
  const name = data.name.trim()
  const email = data.email.trim()
  const service = data.service?.trim()
  const message = data.message.trim()
  const siteUrl = SITE_URL.replace(/\/$/, "")

  const text = [
    `Hi ${name},`,
    "",
    "Thank you for contacting QK Cold Stores. We have received your enquiry and will get back to you within 24 hours.",
    "",
    "Here is a copy of what you sent:",
    service ? `Service: ${service}` : null,
    "",
    "Message:",
    message,
    "",
    `If you need to reach us sooner, call ${PUBLIC_PHONE} or email ${PUBLIC_ENQUIRIES_EMAIL}.`,
    "",
    `Website: ${siteUrl}`,
    "",
    "Kind regards,",
    "QK Cold Stores",
  ]
    .filter((line) => line !== null)
    .join("\n")

  const html = `
    <p>Hi ${escapeHtml(name)},</p>
    <p>Thank you for contacting QK Cold Stores. We have received your enquiry and will get back to you within 24 hours.</p>
    <p><strong>Here is a copy of what you sent:</strong></p>
    ${service ? `<p><strong>Service:</strong> ${escapeHtml(service)}</p>` : ""}
    <p><strong>Message:</strong><br />${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    <p>If you need to reach us sooner, call ${escapeHtml(PUBLIC_PHONE)} or email
      <a href="mailto:${escapeHtml(PUBLIC_ENQUIRIES_EMAIL)}">${escapeHtml(PUBLIC_ENQUIRIES_EMAIL)}</a>.
    </p>
    <p><a href="${escapeHtml(siteUrl)}">${escapeHtml(siteUrl)}</a></p>
    <p>Kind regards,<br />QK Cold Stores</p>
  `

  const { data: sent, error } = await resend.emails.send({
    from,
    to: [email],
    replyTo: PUBLIC_ENQUIRIES_EMAIL,
    subject: "We have received your enquiry - QK Cold Stores",
    text,
    html,
  })

  if (error) {
    throw new Error(`Resend confirmation failed: ${error.message}`)
  }

  console.info(
    `Enquiry confirmation sent via Resend to ${email} (id: ${sent?.id ?? "n/a"})`
  )
}

export async function sendEnquiryNotification(data: EnquiryInput): Promise<void> {
  const { apiKey, from } = getFromAddress()
  const resend = new Resend(apiKey)

  await sendAdminAlert(resend, from, data)

  try {
    await sendSubmitterConfirmation(resend, from, data)
  } catch (confirmationError) {
    const detail =
      confirmationError instanceof Error
        ? confirmationError.message
        : "Confirmation email failed"
    console.error("Enquiry saved and admin alerted, but confirmation email failed:", detail)
  }
}
