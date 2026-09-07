import { Resend } from "resend"
import { SITE_URL } from "@/lib/site-config"

export type ApplicationNotifyInput = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  message?: string
  vacancyId?: string | null
  vacancyTitle?: string | null
  cvFileName: string
}

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

function formatSubmittedAt(date = new Date()): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    dateStyle: "full",
    timeStyle: "short",
  }).format(date)
}

export async function sendApplicationNotification(
  data: ApplicationNotifyInput
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() || "donotreply@qkcoldstores.co.uk"
  const fromName = process.env.RESEND_FROM_NAME?.trim() || "QK Cold Stores Website"

  if (!apiKey) {
    throw new Error("Resend is not configured (missing RESEND_API_KEY)")
  }

  const recipients = parseEmailList(
    process.env.APPLICATION_NOTIFY_EMAILS ?? "careers@qkcoldstores.co.uk"
  )
  if (recipients.length === 0) {
    throw new Error("No APPLICATION_NOTIFY_EMAILS configured")
  }

  const bcc = parseEmailList(process.env.APPLICATION_BCC_EMAILS)
  const siteUrl = SITE_URL.replace(/\/$/, "")
  const adminUrl = `${siteUrl}/admin/vacancies`
  const firstName = data.firstName.trim()
  const lastName = data.lastName.trim()
  const fullName = `${firstName} ${lastName}`.trim()
  const email = data.email.trim()
  const phone = data.phone?.trim() || "Not provided"
  const coverNote = data.message?.trim() || "No cover note provided"
  const hasSpecificRole = Boolean(data.vacancyTitle?.trim())
  const role = data.vacancyTitle?.trim() || "General CV / speculative application"
  const applicationType = hasSpecificRole
    ? "Application for a listed role"
    : "Speculative CV submission"
  const cvFileName = data.cvFileName.trim() || "CV uploaded"
  const submittedAt = formatSubmittedAt()

  const text = [
    "A new careers application was submitted on the QK Cold Stores website.",
    "",
    "Applicant details",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    "",
    "Application details",
    `Type: ${applicationType}`,
    `Role / interest: ${role}`,
    `CV file name: ${cvFileName}`,
    `Submitted: ${submittedAt}`,
    "",
    "Cover note:",
    coverNote,
    "",
    "Next steps",
    "1. Sign in to the admin area.",
    "2. Open the Applications tab.",
    "3. Review the application and download the CV from there.",
    "",
    `Admin area: ${adminUrl}`,
    "",
    "Reply to this email to contact the applicant directly.",
    "Applications are retained for up to 6 months for recruitment purposes.",
  ].join("\n")

  const html = `
    <p>A new careers application was submitted on the QK Cold Stores website.</p>

    <h3 style="margin: 24px 0 8px; font-size: 16px;">Applicant details</h3>
    <p style="margin: 0 0 16px;">
      <strong>Name:</strong> ${escapeHtml(fullName)}<br />
      <strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br />
      <strong>Phone:</strong> ${escapeHtml(phone)}
    </p>

    <h3 style="margin: 24px 0 8px; font-size: 16px;">Application details</h3>
    <p style="margin: 0 0 16px;">
      <strong>Type:</strong> ${escapeHtml(applicationType)}<br />
      <strong>Role / interest:</strong> ${escapeHtml(role)}<br />
      <strong>CV file name:</strong> ${escapeHtml(cvFileName)}<br />
      <strong>Submitted:</strong> ${escapeHtml(submittedAt)}
    </p>

    <h3 style="margin: 24px 0 8px; font-size: 16px;">Cover note</h3>
    <p style="margin: 0 0 16px;">${escapeHtml(coverNote).replace(/\n/g, "<br />")}</p>

    <h3 style="margin: 24px 0 8px; font-size: 16px;">Next steps</h3>
    <ol style="margin: 0 0 16px; padding-left: 20px;">
      <li>Sign in to the admin area.</li>
      <li>Open the <strong>Applications</strong> tab.</li>
      <li>Review the application and download the CV from there.</li>
    </ol>
    <p style="margin: 0 0 16px;">
      <a href="${escapeHtml(adminUrl)}">Open admin Applications</a>
    </p>

    <p style="margin: 0; color: #555; font-size: 13px;">
      Reply to this email to contact the applicant directly.<br />
      Applications are retained for up to 6 months for recruitment purposes.
    </p>
  `

  const resend = new Resend(apiKey)
  const { data: sent, error } = await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to: recipients,
    ...(bcc.length > 0 ? { bcc } : {}),
    replyTo: email,
    subject: `New careers application - ${fullName}${hasSpecificRole ? ` (${role})` : ""}`,
    text,
    html,
  })

  if (error) {
    throw new Error(`Resend application alert failed: ${error.message}`)
  }

  console.info(
    `Application alert sent via Resend to ${recipients.join(", ")}${
      bcc.length ? ` (bcc: ${bcc.join(", ")})` : ""
    } (id: ${sent?.id ?? "n/a"})`
  )
}
