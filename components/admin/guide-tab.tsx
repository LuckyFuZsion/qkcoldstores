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
  Shield,
  Cloud,
  Database,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Mail,
  FileText,
  Wrench,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ADMIN_EMAILS, EMPERICA_PORTAL_URL, PUBLIC_ROUTES, SITE_URL } from "@/lib/site-config"

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
        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${variant === "warning" ? "text-amber-600" : variant === "success" ? "text-green-600" : "text-electric-blue"}`} />
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

const toc = [
  { id: "overview", label: "Overview" },
  { id: "login", label: "Signing in" },
  { id: "vacancies", label: "Vacancies" },
  { id: "applications", label: "Applications" },
  { id: "enquiries", label: "Enquiries" },
  { id: "team", label: "Team" },
  { id: "static-content", label: "Static site content" },
  { id: "public-pages", label: "Public pages" },
  { id: "integrations", label: "Integrations" },
  { id: "security", label: "Security" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "developer", label: "Developer notes" },
]

export function GuideTab() {
  const portalConfigured = EMPERICA_PORTAL_URL.length > 0

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-electric-blue" />
          <h1 className="text-2xl font-black text-foreground tracking-tight">Site Admin Guide</h1>
        </div>
        <p className="text-muted-foreground text-sm font-medium">
          Everything you need to manage the QK Coldstores website day to day, including important
          nuances and edge cases.
        </p>
      </div>

      <nav className="mb-8 p-4 rounded-xl bg-secondary/40 border border-border">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          On this page
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
        <GuideSection id="overview" icon={Globe} title="Overview">
          <p>
            The QK Coldstores website is a marketing site with a built-in admin panel. Most
            day-to-day content you can change yourself lives in this panel. Page copy, images,
            services text, and accreditation logos are coded into the site and need a developer to
            update.
          </p>
          <p className="font-bold text-foreground">What you manage here</p>
          <GuideList
            items={[
              "Job vacancies (create, edit, close, delete)",
              "CV applications submitted by candidates",
              "Contact form enquiries",
              "Team member profiles on the /team page",
            ]}
          />
          <p className="font-bold text-foreground">Admin URL</p>
          <p>
            Sign in at{" "}
            <Link href="/admin" className="text-electric-blue font-bold hover:underline">
              /admin
            </Link>
            . After login you land on this dashboard. Use the tabs at the top to switch between
            sections.
          </p>
          <GuideCallout variant="info" title="Legacy /login URL">
            <p>
              Old bookmarks to <code className="text-xs bg-background px-1 py-0.5 rounded">/login</code>{" "}
              redirect to <code className="text-xs bg-background px-1 py-0.5 rounded">/admin</code>.
            </p>
          </GuideCallout>
        </GuideSection>

        <GuideSection id="login" icon={LogIn} title="Signing in">
          <p>
            Admin access uses Firebase Authentication (email and password). Accounts must be created
            in the Firebase Console under Authentication - Users before they can sign in here.
          </p>
          <GuideCallout variant="success" title="Authorized admin accounts">
            <p>
              Only these email addresses can access the admin panel and manage Firestore
              data:{" "}
              <span className="font-mono text-xs">{ADMIN_EMAILS.join(", ")}</span>
            </p>
          </GuideCallout>
          <GuideList
            items={[
              "Use Sign Out when finished on a shared computer.",
              "If login fails, check caps lock and confirm your email is on the authorized list above.",
              "Password resets are done through Firebase Console, not this website.",
              "New admin users must be added in Firebase Authentication and included in firestore.rules by a developer.",
            ]}
          />
        </GuideSection>

        <GuideSection id="vacancies" icon={Briefcase} title="Vacancies">
          <p>
            Vacancies appear on the public{" "}
            <Link href="/vacancies" className="text-electric-blue font-bold hover:underline">
              /vacancies
            </Link>{" "}
            page. Only vacancies with status <Badge className="mx-1 bg-green-100 text-green-800 border-0">active</Badge>{" "}
            are visible to visitors.
          </p>
          <p className="font-bold text-foreground">Creating a vacancy</p>
          <GuideList
            items={[
              "Click Add Vacancy and fill in job title, salary, and description (all required).",
              "Optionally attach a job specification PDF, DOC, or DOCX. This is uploaded to Cloudinary.",
              "New vacancies are created as active and appear on the site immediately.",
            ]}
          />
          <p className="font-bold text-foreground">Closing vs deleting</p>
          <GuideList
            items={[
              "Close - hides the vacancy from the public site but keeps it in admin. Use this when a role is filled.",
              "Reopen - makes a closed vacancy active again.",
              "Delete - permanently removes the vacancy record. The job spec file remains in Cloudinary.",
            ]}
          />
          <GuideCallout variant="warning" title="Job spec downloads">
            <p>
              If PDF downloads fail in admin, Cloudinary may be blocking PDF delivery. In the
              Cloudinary dashboard go to Settings - Security and enable PDF and ZIP file delivery.
            </p>
          </GuideCallout>
        </GuideSection>

        <GuideSection id="applications" icon={Users} title="Applications (CV submissions)">
          <p>
            When someone applies via the vacancies page or general CV form, their application appears
            in the Applications tab. Each record includes name, email, phone, message, linked vacancy
            (if any), and a downloadable CV.
          </p>
          <GuideCallout variant="warning" title="GDPR - 6 month retention">
            <p>
              CVs are automatically tagged with a 6-month expiry date from submission. When
              applications expire, a red banner appears at the top of this tab prompting you to
              delete them. Use Delete All Expired to bulk-remove old records and stay compliant.
            </p>
          </GuideCallout>
          <GuideList
            items={[
              "Expand a row to see full details and download the CV.",
              "Applications cannot be edited - only viewed and deleted.",
              "Deleting an application removes the Firestore record but not the file in Cloudinary.",
              "CV uploads are limited to 10 MB on the public form.",
              "Applicants must tick the privacy consent checkbox before submitting.",
            ]}
          />
        </GuideSection>

        <GuideSection id="enquiries" icon={Inbox} title="Contact enquiries">
          <p>
            Messages from the{" "}
            <Link href="/contact" className="text-electric-blue font-bold hover:underline">
              /contact
            </Link>{" "}
            form are stored here. Email notifications are not yet wired up - you must check this tab
            regularly or rely on someone monitoring enquiries manually.
          </p>
          <p className="font-bold text-foreground">Status workflow</p>
          <GuideList
            items={[
              "New - just submitted. Highlighted with a blue border. Count shown in the tab subtitle.",
              "Read - automatically set when you expand a new enquiry for the first time.",
              "Archived - set manually when handled. Use this to tidy the list without deleting.",
            ]}
          />
          <p className="font-bold text-foreground">Actions</p>
          <GuideList
            items={[
              "Click a row to expand and read the full message.",
              "Reply to the customer via the email address or phone shown - there is no in-panel reply.",
              "Archive when done, or Delete to permanently remove the record.",
            ]}
          />
          <GuideCallout variant="info" title="No email alerts yet">
            <p>
              Enquiries are saved to the database only. Setting up email notifications (e.g. to
              info@qkcoldstores.co.uk) requires additional integration work with your developer.
            </p>
          </GuideCallout>
        </GuideSection>

        <GuideSection id="team" icon={User} title="Team members">
          <p>
            Team profiles on{" "}
            <Link href="/team" className="text-electric-blue font-bold hover:underline">
              /team
            </Link>{" "}
            are managed here. Members are grouped into Senior Leadership, Operational, and Support
            Services sections.
          </p>
          <p className="font-bold text-foreground">First-time setup</p>
          <GuideList
            items={[
              "If the team page is empty, click Import Existing Team to upload default staff photos from the site and populate profiles.",
              "Import only works when no team members exist yet.",
              "Photos are uploaded to Cloudinary folder qk-staff during import.",
            ]}
          />
          <p className="font-bold text-foreground">Adding and editing</p>
          <GuideList
            items={[
              "Add Team Member - enter name, role, bio, group, and sort order. Upload a photo (optional).",
              "Sort order controls display order within each group (lower numbers appear first).",
              "Edit or Delete using the buttons on each member row.",
              "Changes appear on the public team page immediately after saving.",
            ]}
          />
        </GuideSection>

        <GuideSection id="static-content" icon={FileText} title="Static site content (developer updates)">
          <p>
            The following cannot be changed from this admin panel. Contact your developer for
            updates:
          </p>
          <GuideList
            items={[
              "Homepage text, hero, services overview, and accreditation logo carousel",
              "About, Services, FAQ, Location, and Portal page copy",
              "Contact page layout and Gemma contact card",
              "Opening hours text (shared across footer and contact page)",
              "Privacy Policy and Cookie Policy legal text",
              "Logo images, facility photos, and certification logos in /public",
              "Google Maps embed on contact and location pages",
              "Customer portal (Emperica) external link URL - set via environment variable",
            ]}
          />
        </GuideSection>

        <GuideSection id="public-pages" icon={Globe} title="Public pages reference">
          <p>All live public routes on the site:</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {PUBLIC_ROUTES.map((route) => (
              <Link
                key={route}
                href={route}
                target="_blank"
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-background border border-border hover:border-electric-blue/40 text-foreground font-medium transition-colors"
              >
                <span>{route === "/" ? "Homepage" : route}</span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
            ))}
          </div>
          <GuideCallout variant="info" title="Pages that no longer exist">
            <GuideList
              items={[
                "/testimonials - removed from the site",
                "/terms - removed (footer link also removed)",
              ]}
            />
          </GuideCallout>
        </GuideSection>

        <GuideSection id="integrations" icon={Cloud} title="Integrations">
          <p className="font-bold text-foreground">Firebase (database and auth)</p>
          <GuideList
            items={[
              "Stores vacancies, applications, enquiries, and team members.",
              "Project: qk-coldstores. Managed via Firebase Console.",
              "Security rules control who can read and write each collection.",
            ]}
          />
          <p className="font-bold text-foreground">Cloudinary (file storage)</p>
          <GuideList
            items={[
              "qk-cvs - candidate CV uploads",
              "qk-job-specs - vacancy job specification documents",
              "qk-staff - team member photos",
              "Downloads in admin go through the site /api/download proxy.",
            ]}
          />
          <p className="font-bold text-foreground">Emperica customer portal</p>
          {portalConfigured ? (
            <p>
              Portal URL is configured. The{" "}
              <Link href="/portal" className="text-electric-blue font-bold hover:underline">
                /portal
              </Link>{" "}
              page links to:{" "}
              <a
                href={EMPERICA_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-electric-blue font-bold hover:underline break-all"
              >
                {EMPERICA_PORTAL_URL}
              </a>
            </p>
          ) : (
            <GuideCallout variant="warning" title="Portal URL not configured">
              <p>
                The /portal page currently shows a Contact Us button instead of linking to Emperica.
                Ask your developer to set{" "}
                <code className="text-xs bg-background px-1 py-0.5 rounded">NEXT_PUBLIC_EMPERICA_PORTAL_URL</code>{" "}
                in the hosting environment.
              </p>
            </GuideCallout>
          )}
          <p className="font-bold text-foreground">Analytics</p>
          <p>
            Vercel Analytics runs in production. Firebase Analytics is also initialized when supported
            by the browser.
          </p>
        </GuideSection>

        <GuideSection id="security" icon={Shield} title="Security">
          <GuideList
            items={[
              "Admin panel has no public link in the main navigation - only people who know /admin can reach it.",
              "Only authorized admin emails can sign in and perform admin Firestore operations.",
              "Public users can only create applications and enquiries - they cannot read other people's data.",
              "CV and job spec URLs must be on res.cloudinary.com to download through the site.",
              "Do not share admin credentials. Create separate Firebase accounts per admin user.",
            ]}
          />
        </GuideSection>

        <GuideSection id="troubleshooting" icon={Wrench} title="Troubleshooting">
          <p className="font-bold text-foreground">Could not load data / empty tab with error</p>
          <GuideList
            items={[
              "Click Try again on the error banner.",
              "Check your internet connection and that you are still signed in.",
              "If it persists, check Firebase Console for service outages or rule changes.",
              "Vacancies list on the public site needs a Firestore composite index (status + createdAt). Your developer can deploy firestore.indexes.json.",
            ]}
          />
          <p className="font-bold text-foreground">Contact form says something went wrong</p>
          <GuideList
            items={[
              "Usually a Firestore permissions issue - enquiries security rules must allow public create.",
              "Check browser console for details if you are technical.",
            ]}
          />
          <p className="font-bold text-foreground">PDF or CV download fails</p>
          <GuideList
            items={[
              "Enable PDF delivery in Cloudinary Settings - Security.",
              "The file may have been deleted from Cloudinary but the database record remains.",
            ]}
          />
          <p className="font-bold text-foreground">Upload failed when adding vacancy or team photo</p>
          <GuideList
            items={[
              "Check file size and format.",
              "Cloudinary upload preset (qk-uploads) must exist and allow unsigned uploads.",
            ]}
          />
        </GuideSection>

        <GuideSection id="developer" icon={Database} title="Developer notes">
          <p>
            For whoever maintains the codebase. Production site:{" "}
            <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="text-electric-blue font-bold hover:underline">
              {SITE_URL}
            </a>
          </p>
          <p className="font-bold text-foreground">Key environment variables</p>
          <div className="rounded-lg bg-background border border-border p-4 font-mono text-xs space-y-1 overflow-x-auto">
            <p>NEXT_PUBLIC_FIREBASE_* - Firebase client config (7 vars)</p>
            <p>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</p>
            <p>NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</p>
            <p>NEXT_PUBLIC_SITE_URL</p>
            <p>NEXT_PUBLIC_EMPERICA_PORTAL_URL</p>
            <p>NEXT_PUBLIC_ADMIN_EMAILS (comma-separated, optional)</p>
          </div>
          <p className="font-bold text-foreground">Repo files</p>
          <GuideList
            items={[
              "firestore.rules - security rules (deploy via Firebase CLI or Console)",
              "firestore.indexes.json - composite index for active vacancies query",
              "lib/enquiries.ts, lib/vacancies.ts, lib/team-members.ts - data layer",
              "app/api/download/route.ts - Cloudinary download proxy",
            ]}
          />
          <p className="font-bold text-foreground">Firestore collections</p>
          <GuideList
            items={[
              "vacancies - job listings",
              "applications - CV submissions (6 month expiresAt)",
              "enquiries - contact form (status: new | read | archived)",
              "teamMembers - team page profiles",
            ]}
          />
          <GuideCallout variant="info" title="Firestore rules nuance">
            <p>
              The enquiries collection has a field named service. In security rules it must be
              referenced as request.resource.data[&apos;service&apos;] because service is a reserved
              word in Firestore rules syntax.
            </p>
          </GuideCallout>
        </GuideSection>
      </div>

      <div className="mt-8 p-6 rounded-xl bg-deep-navy text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-electric-blue shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Need help with the website?</p>
            <p className="text-ice-blue/80 text-sm mt-1">
              For content changes not covered here, contact your web developer or agency.
            </p>
          </div>
        </div>
        <Button asChild variant="secondary" className="font-bold shrink-0">
          <Link href="/">View live site</Link>
        </Button>
      </div>
    </div>
  )
}
