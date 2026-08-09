"use client"

import Link from "next/link"
import {
  BookOpen,
  LogIn,
  Briefcase,
  Users,
  Inbox,
  User,
  Globe,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Mail,
  FileText,
  Wrench,
  Code2,
  UserPlus,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ADMIN_EMAILS, EMPERICA_PORTAL_URL, PUBLIC_ROUTES, SITE_URL } from "@/lib/site-config"
import { useAuth } from "@/lib/auth-context"

/** Developer-only guide visibility - not for company site admins */
const DEVELOPER_GUIDE_EMAIL = "info@webfuzsion.co.uk"

function GuideSection({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 rounded-xl bg-card border border-border overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-secondary/30">
        <div className="w-10 h-10 rounded-lg bg-electric-blue/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-electric-blue" />
        </div>
        <h2 className="text-lg font-black text-foreground tracking-tight">{title}</h2>
      </div>
      <div className="p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">{children}</div>
    </section>
  )
}

function GuideCallout({
  variant = "info",
  title,
  children,
}: {
  variant?: "info" | "warning" | "success"
  title: string
  children: React.ReactNode
}) {
  const styles = {
    info: "border-electric-blue/20 bg-electric-blue/5 text-foreground",
    warning: "border-amber-500/30 bg-amber-500/5 text-foreground",
    success: "border-green-500/30 bg-green-500/5 text-foreground",
  }
  const Icon = variant === "warning" ? AlertTriangle : variant === "success" ? CheckCircle2 : BookOpen

  return (
    <div className={`rounded-lg border p-4 ${styles[variant]}`}>
      <div className="flex items-start gap-3">
        <Icon
          className={`w-5 h-5 shrink-0 mt-0.5 ${
            variant === "warning"
              ? "text-amber-600"
              : variant === "success"
                ? "text-green-600"
                : "text-electric-blue"
          }`}
        />
        <div>
          <p className="font-bold text-foreground mb-1">{title}</p>
          <div className="text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  )
}

function GuideList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function GuideTab() {
  const { user } = useAuth()
  const showDeveloperGuide =
    user?.email?.trim().toLowerCase() === DEVELOPER_GUIDE_EMAIL

  const toc = [
    { id: "overview", label: "Overview" },
    { id: "login", label: "Signing in" },
    { id: "adding-admins", label: "Adding colleagues" },
    { id: "vacancies", label: "Job vacancies" },
    { id: "applications", label: "CV applications" },
    { id: "enquiries", label: "Contact messages" },
    { id: "team", label: "Team page" },
    { id: "portal", label: "Customer Portal" },
    { id: "what-you-cannot-change", label: "What needs a developer" },
    { id: "help", label: "If something goes wrong" },
    ...(showDeveloperGuide ? [{ id: "developer", label: "Developer notes" }] : []),
  ]

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-electric-blue" />
          <h1 className="text-2xl font-black text-foreground tracking-tight">How to use this admin area</h1>
        </div>
        <p className="text-muted-foreground text-sm font-medium">
          A plain-English guide for managing jobs, applications, contact messages, and the team
          page on the QK Cold Stores website.
        </p>
      </div>

      <nav className="mb-8 p-4 rounded-xl bg-secondary/40 border border-border">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Jump to
        </p>
        <div className="flex flex-wrap gap-2">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-card border border-border hover:border-electric-blue/40 hover:text-electric-blue transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="space-y-6">
        <GuideSection id="overview" icon={Globe} title="What this area is for">
          <p>
            This is the back office for the company website. From here you can update day-to-day
            content that changes often. Things like page wording, photos of the building, and the
            look of the site are handled by your web developer.
          </p>
          <p className="font-bold text-foreground">You can manage</p>
          <GuideList
            items={[
              "Job vacancies shown on the website",
              "CV applications people have sent in",
              "Messages from the Contact page form",
              "People listed on the Meet the Team page",
            ]}
          />
          <p>
            Open this area at{" "}
            <Link href="/admin" className="text-electric-blue font-bold hover:underline">
              /admin
            </Link>
            . After you sign in, use the tabs along the top to move between sections.
          </p>
        </GuideSection>

        <GuideSection id="login" icon={LogIn} title="Signing in">
          <p>
            You sign in with your work email and password. Only approved QK email addresses can
            use this area.
          </p>
          <GuideCallout variant="success" title="Approved emails right now">
            <p className="font-mono text-xs break-all">{ADMIN_EMAILS.join(", ")}</p>
          </GuideCallout>
          <GuideList
            items={[
              "Always click Sign Out when you finish, especially on a shared computer.",
              "If sign-in fails, check you are using the right email and that Caps Lock is off.",
              "If you forget your password, ask your web developer to reset it for you - you cannot reset it from this website.",
            ]}
          />
        </GuideSection>

        <GuideSection id="adding-admins" icon={UserPlus} title="Giving a colleague access">
          <p>
            New people cannot create their own admin access. Ask your web developer to set them
            up. You will need to give them:
          </p>
          <GuideList
            items={[
              "The colleague's work email address",
              "Confirmation that they should be allowed to manage the website",
            ]}
          />
          <GuideCallout variant="info" title="What your developer will do">
            <p>
              They create a login for that email, add them to the approved list, and make sure
              they can see jobs, applications, messages, and the team list. Until that is fully
              done, the person may sign in but see error messages when opening those tabs.
            </p>
          </GuideCallout>
        </GuideSection>

        <GuideSection id="vacancies" icon={Briefcase} title="Job vacancies">
          <p>
            Vacancies appear on the public{" "}
            <Link href="/vacancies" className="text-electric-blue font-bold hover:underline">
              Vacancies
            </Link>{" "}
            page. Only jobs marked as{" "}
            <Badge className="mx-1 bg-green-100 text-green-800 border-0">active</Badge> are
            visible to visitors.
          </p>
          <p className="font-bold text-foreground">Adding a vacancy</p>
          <GuideList
            items={[
              "Click Add Vacancy.",
              "Fill in the job title, salary, and description (all required).",
              "You can optionally attach a job specification file (PDF, DOC, or DOCX).",
              "New vacancies go live on the website straight away.",
            ]}
          />
          <p className="font-bold text-foreground">Closing vs deleting</p>
          <GuideList
            items={[
              "Close - hides the job from the public website but keeps it here for your records. Use this when the role is filled.",
              "Reopen - puts a closed job back on the website.",
              "Delete - removes the job from this admin area permanently.",
            ]}
          />
          <GuideCallout variant="warning" title="Job specification downloads">
            <p>
              If a PDF will not download, tell your web developer. This is usually a file-storage
              setting, not something wrong with the vacancy itself.
            </p>
          </GuideCallout>
        </GuideSection>

        <GuideSection id="applications" icon={Users} title="CV applications">
          <p>
            When someone applies for a job or sends a general CV through the website, it appears
            in the Applications tab. You will see their name, contact details, message, which job
            they applied for (if any), and their CV to download.
          </p>
          <GuideCallout variant="warning" title="Keeping personal data tidy (6 months)">
            <p>
              Applications should not be kept longer than needed. Each one is marked with a date
              six months after it was sent. When that date passes, a red reminder appears at the
              top of this tab. Use Delete All Expired to clear old applications in one go.
            </p>
          </GuideCallout>
          <GuideList
            items={[
              "Click a row to open the full details and download the CV.",
              "You can view and delete applications, but you cannot edit them.",
              "Applicants must agree to the privacy notice before they can send a CV.",
            ]}
          />
        </GuideSection>

        <GuideSection id="enquiries" icon={Inbox} title="Contact messages">
          <p>
            When someone fills in the form on the{" "}
            <Link href="/contact" className="text-electric-blue font-bold hover:underline">
              Contact
            </Link>{" "}
            page, the message lands here. Please check this tab regularly.
          </p>
          <p>
            The contact email shown on the website is{" "}
            <a
              href="mailto:enquiries@qkcoldstores.co.uk"
              className="text-electric-blue font-bold hover:underline"
            >
              enquiries@qkcoldstores.co.uk
            </a>
            .
          </p>
          <GuideCallout variant="info" title="Email alerts for new messages">
            <p>
              When someone uses the contact form, an alert email is also sent so you know to open
              this Enquiries tab. Those alerts are sent through Mailjet, and they appear to come
              from{" "}
              <a
                href="mailto:info@webfuzsion.co.uk"
                className="text-electric-blue font-bold hover:underline"
              >
                info@webfuzsion.co.uk
              </a>
              . The visitor&apos;s message is still stored here for you to read and reply to - the
              alert is just a prompt to check admin.
            </p>
          </GuideCallout>
          <p className="font-bold text-foreground">Message status</p>
          <GuideList
            items={[
              "New - just arrived. Highlighted so you can spot it. The number of new messages is shown near the tab name.",
              "Read - set automatically the first time you open the message.",
              "Archived - mark messages as archived when you have dealt with them, so the list stays tidy.",
            ]}
          />
          <p className="font-bold text-foreground">What to do</p>
          <GuideList
            items={[
              "The list looks like an email inbox - From, subject, a short preview, and the time received.",
              "Use the search box to find messages by name, email, company, subject, or message text.",
              "Click a column heading (From, Subject, Preview, Received) to sort. Click again to reverse the order.",
              "Click a row to expand the full message.",
              "Press Reply to open your email app with the sender filled in, a Re: subject, and the original enquiry quoted underneath so you can write your response above it.",
              "Use the copy button next to an email address to paste it into your mail app when replying.",
              "Tick one or more messages, then use Delete selected to remove several at once. Select all applies to the filtered list when you are searching.",
              "Archive when finished, or Delete if you no longer need the record.",
            ]}
          />
        </GuideSection>

        <GuideSection id="team" icon={User} title="Team page">
          <p>
            People shown on{" "}
            <Link href="/team" className="text-electric-blue font-bold hover:underline">
              Meet the Team
            </Link>{" "}
            are managed here. They are grouped into Senior Leadership, Operational, and Support
            Services.
          </p>
          <p className="font-bold text-foreground">If the team page is empty</p>
          <GuideList
            items={[
              "Click Import Existing Team to load the starting staff list and photos.",
              "This only works when there are no team members yet.",
            ]}
          />
          <p className="font-bold text-foreground">Adding or editing someone</p>
          <GuideList
            items={[
              "Add Team Member - enter name, role, short bio, which group they belong to, and sort order.",
              "Sort order controls the order within a group (lower numbers appear first).",
              "You can upload a photo when adding or editing.",
              "Changes show on the public team page as soon as you save.",
            ]}
          />
          <GuideCallout variant="info" title="Contact page photo">
            <p>
              Gemma&apos;s photo on the Contact page is part of the fixed page layout (photo only, no name). Ask your
              web developer if that needs changing. It is separate from the Meet the Team list.
            </p>
          </GuideCallout>
        </GuideSection>

        <GuideSection id="portal" icon={ExternalLink} title="Customer Portal">
          <p>
            The Customer Portal button in the website header and footer opens the stock system in
            a new browser tab. Customers sign in there with their own portal details.
          </p>
          <p>
            Link used:{" "}
            <a
              href={EMPERICA_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-blue font-bold hover:underline break-all"
            >
              {EMPERICA_PORTAL_URL}
            </a>
          </p>
          <GuideList
            items={[
              "Portal usernames and passwords are not managed in this admin area.",
              "If the button goes to the wrong place, ask your web developer to update the link.",
            ]}
          />
        </GuideSection>

        <GuideSection id="what-you-cannot-change" icon={FileText} title="What needs a developer">
          <p>
            These parts of the site are not edited from this admin area. Contact your web
            developer if they need updating:
          </p>
          <GuideList
            items={[
              "Homepage wording, hero image, and accreditation logos",
              "About, Services, FAQ, and Location page wording",
              "Contact page layout and the enquiries email address shown there",
              "Opening hours text",
              "Privacy and cookie policy wording",
              "Company logo and main site photos",
              "Maps on the homepage, Contact, and Location pages",
              "The Customer Portal web address",
            ]}
          />
        </GuideSection>

        <GuideSection id="help" icon={Wrench} title="If something goes wrong">
          <p className="font-bold text-foreground">A tab will not load / shows an error</p>
          <GuideList
            items={[
              "Click Try again.",
              "Check you are still signed in and have an internet connection.",
              "If a newly added colleague can sign in but cannot see jobs or messages, their access was not finished - ask your web developer to complete setup.",
            ]}
          />
          <p className="font-bold text-foreground">Someone says the contact form failed</p>
          <GuideList
            items={[
              "Ask them to try again, or to email enquiries@qkcoldstores.co.uk.",
              "If it keeps happening, tell your web developer.",
            ]}
          />
          <p className="font-bold text-foreground">A CV or job PDF will not download</p>
          <GuideList
            items={[
              "Try another browser, or ask your web developer to check the file storage settings.",
            ]}
          />
          <p className="font-bold text-foreground">Photo or file upload fails</p>
          <GuideList
            items={[
              "Check the file is not unusually large and is a normal photo or document type.",
              "If it still fails, contact your web developer.",
            ]}
          />
        </GuideSection>

        {showDeveloperGuide && (
          <GuideSection id="developer" icon={Code2} title="Developer notes (Webfuzsion only)">
            <GuideCallout variant="warning" title="Visible only to info@webfuzsion.co.uk">
              <p>
                Company site admins do not see this section. Keep operational steps above in plain
                language; put technical detail here.
              </p>
            </GuideCallout>

            <p>
              Production:{" "}
              <a
                href={SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-electric-blue font-bold hover:underline"
              >
                {SITE_URL}
              </a>
            </p>

            <p className="font-bold text-foreground">Adding an admin (checklist)</p>
            <GuideList
              items={[
                "Firebase Console - Authentication - Users - create email/password account",
                "Add email to NEXT_PUBLIC_ADMIN_EMAILS on Vercel (Production + Preview), comma-separated, then redeploy",
                "Add the same email to isAdmin() in firestore.rules and publish rules (Console or firebase deploy --only firestore:rules)",
                "Without the rules publish, login can succeed but all admin collection reads fail with permission-denied",
              ]}
            />

            <p className="font-bold text-foreground">Mailjet enquiry alerts</p>
            <GuideList
              items={[
                "Provider: Mailjet API (not SMTP) via lib/mailjet.ts and POST /api/notify-enquiry",
                "From address: info@webfuzsion.co.uk (MAILJET_FROM_EMAIL) - must stay verified in Mailjet Senders",
                "From display name: QK Cold Stores Website (MAILJET_FROM_NAME)",
                "Recipients: ENQUIRY_NOTIFY_EMAILS (comma-separated)",
                "Flow: contact form saves to Firestore enquiries, then notifies; form success does not depend on Mailjet succeeding",
                "Vercel must have MAILJET_API_KEY, MAILJET_SECRET_KEY, MAILJET_FROM_EMAIL, ENQUIRY_NOTIFY_EMAILS (and NEXT_PUBLIC_SITE_URL for the admin link in the email)",
                "CRITICAL: Authenticate webfuzsion.co.uk in Mailjet Account settings - Domain authentication. SPF and DKIM DNS must be OK or Mailjet can return API success while no email is delivered",
                "In DNS for webfuzsion.co.uk: add Mailjet SPF include (spf.mailjet.com) and the mailjet._domainkey TXT (DKIM) from the Mailjet domain screen, then click Validate / Check DNS",
                "Prefer a different From vs To when possible (e.g. noreply@… as From, info@… as recipient) once that sender is verified",
              ]}
            />

            <p className="font-bold text-foreground">Environment variables</p>
            <div className="rounded-lg bg-background border border-border p-4 font-mono text-xs space-y-1 overflow-x-auto">
              <p>NEXT_PUBLIC_FIREBASE_* (7 client config vars)</p>
              <p>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</p>
              <p>NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</p>
              <p>NEXT_PUBLIC_SITE_URL</p>
              <p>NEXT_PUBLIC_EMPERICA_PORTAL_URL (fallback: Empirica webview URL in site-config)</p>
              <p>NEXT_PUBLIC_ADMIN_EMAILS (must stay in sync with firestore.rules)</p>
              <p>MAILJET_API_KEY / MAILJET_SECRET_KEY (server only)</p>
              <p>MAILJET_FROM_EMAIL=info@webfuzsion.co.uk</p>
              <p>MAILJET_FROM_NAME=QK Cold Stores Website</p>
              <p>ENQUIRY_NOTIFY_EMAILS (who receives new-enquiry alerts)</p>
            </div>

            <p className="font-bold text-foreground">Recent product behaviour</p>
            <GuideList
              items={[
                "/portal page removed - header/footer Customer Portal is an external link via EMPERICA_PORTAL_URL",
                "Contact form → Firestore enquiries + Mailjet alert from info@webfuzsion.co.uk",
                "Public contact address shown on site remains enquiries@qkcoldstores.co.uk",
                "Contact page shows photo only in the sidebar (no name label)",
                "Homepage / contact / location maps use Leaflet + Esri tiles (CSP must allow arcgisonline / tile hosts)",
                "Tablet/nav: hamburger menu until xl breakpoint so tablet users get full nav",
                "lib/mailjet.ts + app/api/notify-enquiry/route.ts - enquiry notification emails",
              ]}
            />

            <p className="font-bold text-foreground">Key files</p>
            <GuideList
              items={[
                "firestore.rules - isAdmin() email allowlist",
                "firestore.indexes.json - active vacancies composite index",
                "lib/site-config.ts - ADMIN_EMAILS, EMPERICA_PORTAL_URL, PUBLIC_ROUTES",
                "lib/security-headers.mjs - CSP",
                "lib/enquiries.ts, lib/vacancies.ts, lib/team-members.ts",
                "app/api/download/route.ts - Cloudinary download proxy",
                "components/facility-map.tsx - shared map with permanent pin",
              ]}
            />

            <p className="font-bold text-foreground">Firestore collections</p>
            <GuideList
              items={[
                "vacancies",
                "applications (expiresAt ~ 6 months)",
                "enquiries (status: new | read | archived)",
                "teamMembers",
              ]}
            />

            <GuideCallout variant="info" title="Rules syntax note">
              <p>
                Enquiries field <code className="text-xs bg-background px-1 py-0.5 rounded">service</code>{" "}
                must be referenced as{" "}
                <code className="text-xs bg-background px-1 py-0.5 rounded">
                  request.resource.data[&apos;service&apos;]
                </code>{" "}
                because <code className="text-xs bg-background px-1 py-0.5 rounded">service</code>{" "}
                is reserved in Firestore rules.
              </p>
            </GuideCallout>

            <p className="font-bold text-foreground">Public routes</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {PUBLIC_ROUTES.map((route) => (
                <Link
                  key={route}
                  href={route}
                  target="_blank"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-background border border-border hover:border-electric-blue/40 text-foreground font-medium transition-colors"
                >
                  <span>{route === "/" ? "/" : route}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </GuideSection>
        )}
      </div>

      <div className="mt-8 p-6 rounded-xl bg-deep-navy text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-electric-blue shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Need help?</p>
            <p className="text-ice-blue/80 text-sm mt-1">
              For website changes you cannot make here, contact your web developer.
            </p>
          </div>
        </div>
        <Button asChild variant="secondary" className="font-bold shrink-0">
          <Link href="/">View the live website</Link>
        </Button>
      </div>
    </div>
  )
}
