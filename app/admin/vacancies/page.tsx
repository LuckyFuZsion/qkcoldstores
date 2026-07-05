"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Briefcase,
  Users,
  User,
  FileText,
  Download,
  X,
  Upload,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Calendar,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Inbox,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAuth } from "@/lib/auth-context"
import {
  getAllVacancies,
  createVacancy,
  updateVacancy,
  deleteVacancy,
  getAllApplications,
  deleteApplication,
  type Vacancy,
  type Application,
} from "@/lib/vacancies"
import { TeamTab } from "@/components/admin/team-tab"
import { EnquiriesTab } from "@/components/admin/enquiries-tab"
import { GuideTab } from "@/components/admin/guide-tab"
import { AdminLoadError } from "@/components/admin/load-error"
import { downloadCloudinaryFile } from "@/lib/cloudinary"
import Image from "next/image"
import Link from "next/link"

type Tab = "vacancies" | "applications" | "enquiries" | "team" | "guide"

export default function AdminVacanciesPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>("vacancies")

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-electric-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center rounded-full bg-white p-2 shadow-sm">
                <Image
                  src="/images/qk-logo.png"
                  alt="QK Cold Stores"
                  width={120}
                  height={60}
                  className="h-6 w-auto"
                />
              </div>
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Admin Panel</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                asChild
                className="font-bold text-sm rounded-xl"
              >
                <Link href="/">Back to Website</Link>
              </Button>
              <Button
                variant="ghost"
                onClick={async () => {
                  await logout()
                  router.replace("/admin")
                }}
                className="font-bold text-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {[
              { key: "vacancies" as Tab, label: "Vacancies", icon: Briefcase },
              { key: "applications" as Tab, label: "Applications", icon: Users },
              { key: "enquiries" as Tab, label: "Enquiries", icon: Inbox },
              { key: "team" as Tab, label: "Team", icon: User },
              { key: "guide" as Tab, label: "Guide", icon: BookOpen },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-4 font-bold text-sm uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === tab.key
                    ? "border-electric-blue text-electric-blue"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "vacancies" ? (
          <VacanciesTab />
        ) : activeTab === "applications" ? (
          <ApplicationsTab />
        ) : activeTab === "enquiries" ? (
          <EnquiriesTab />
        ) : activeTab === "team" ? (
          <TeamTab />
        ) : (
          <GuideTab />
        )}
      </div>
    </div>
  )
}

// ---------- Vacancies Tab ----------

function VacanciesTab() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Vacancy | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Vacancy | null>(null)

  const loadVacancies = () => {
    setLoading(true)
    setLoadError(null)
    getAllVacancies()
      .then(setVacancies)
      .catch(() => setLoadError("Could not load vacancies. Please try again."))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadVacancies() }, [])

  const handleSaved = () => {
    setDialogOpen(false)
    setEditing(null)
    loadVacancies()
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deleteVacancy(deleteTarget.id)
    setDeleteTarget(null)
    loadVacancies()
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">Manage Vacancies</h1>
          <p className="text-muted-foreground text-sm font-medium mt-1">
            {vacancies.length} {vacancies.length === 1 ? "vacancy" : "vacancies"} total
          </p>
        </div>
        <Button
          onClick={() => { setEditing(null); setDialogOpen(true) }}
          className="bg-electric-blue text-white hover:bg-electric-blue/90 font-bold rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Vacancy
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-card border border-border animate-pulse" />
          ))}
        </div>
      ) : loadError ? (
        <AdminLoadError message={loadError} onRetry={loadVacancies} />
      ) : vacancies.length === 0 ? (
        <div className="text-center py-16 rounded-xl bg-card border border-border">
          <Briefcase className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">No vacancies yet. Click "Add Vacancy" to create one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {vacancies.map((v) => (
            <div
              key={v.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-card border border-border"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-black text-foreground text-lg tracking-tight truncate">{v.title}</h3>
                  <Badge
                    variant={v.status === "active" ? "default" : "secondary"}
                    className={v.status === "active"
                      ? "bg-green-100 text-green-800 border-0"
                      : "bg-muted text-muted-foreground border-0"
                    }
                  >
                    {v.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-medium">{v.salary}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    updateVacancy(v.id, { status: v.status === "active" ? "closed" : "active" })
                      .then(loadVacancies)
                  }}
                  className="font-bold text-xs"
                >
                  {v.status === "active" ? (
                    <><EyeOff className="w-4 h-4 mr-1" /> Close</>
                  ) : (
                    <><Eye className="w-4 h-4 mr-1" /> Reopen</>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setEditing(v); setDialogOpen(true) }}
                  className="font-bold text-xs"
                >
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteTarget(v)}
                  className="font-bold text-xs text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) { setDialogOpen(false); setEditing(null) } }}>
        <DialogContent className="sm:max-w-lg rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-black text-xl tracking-tight">
              {editing ? "Edit Vacancy" : "Add Vacancy"}
            </DialogTitle>
          </DialogHeader>
          <VacancyForm
            vacancy={editing}
            onSaved={handleSaved}
            onCancel={() => { setDialogOpen(false); setEditing(null) }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black">Delete Vacancy</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteTarget?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl font-bold">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl font-bold"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

// ---------- Vacancy Form ----------

function VacancyForm({
  vacancy,
  onSaved,
  onCancel,
}: {
  vacancy: Vacancy | null
  onSaved: () => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(vacancy?.title ?? "")
  const [salary, setSalary] = useState(vacancy?.salary ?? "")
  const [description, setDescription] = useState(vacancy?.description ?? "")
  const [specFile, setSpecFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      if (vacancy) {
        await updateVacancy(vacancy.id, { title, salary, description }, specFile ?? undefined)
      } else {
        await createVacancy({ title, salary, description }, specFile ?? undefined)
      }
      onSaved()
    } catch (err) {
      console.error(err)
      setError("Failed to save. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label className="font-bold text-sm uppercase tracking-wider">Job Title *</Label>
        <Input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-xl h-12"
          placeholder="e.g. Warehouse Operative"
        />
      </div>

      <div className="space-y-2">
        <Label className="font-bold text-sm uppercase tracking-wider">Salary *</Label>
        <Input
          required
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="rounded-xl h-12"
          placeholder="e.g. 25,000 - 30,000 per annum"
        />
      </div>

      <div className="space-y-2">
        <Label className="font-bold text-sm uppercase tracking-wider">Description *</Label>
        <Textarea
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-xl resize-none"
          placeholder="Enter the job description..."
        />
      </div>

      <div className="space-y-2">
        <Label className="font-bold text-sm uppercase tracking-wider">
          Job Specification Document
        </Label>
        {vacancy?.specDocumentName && !specFile && (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Current: {vacancy.specDocumentName}
          </p>
        )}
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-electric-blue/50 hover:bg-electric-blue/5 transition-all"
        >
          {specFile ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="w-6 h-6 text-electric-blue" />
              <span className="font-bold text-foreground text-sm">{specFile.name}</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setSpecFile(null) }}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm font-bold text-foreground">Click to upload</p>
              <p className="text-xs text-muted-foreground">PDF, DOC or DOCX</p>
            </>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => setSpecFile(e.target.files?.[0] ?? null)}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm font-medium p-3 rounded-xl bg-destructive/10">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 rounded-xl font-bold">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={saving}
          className="flex-1 bg-deep-navy text-white hover:bg-black rounded-xl font-bold"
        >
          {saving ? "Saving..." : vacancy ? "Update Vacancy" : "Create Vacancy"}
        </Button>
      </div>
    </form>
  )
}

// ---------- Applications Tab ----------

function ApplicationsTab() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null)

  const loadApplications = () => {
    setLoading(true)
    setLoadError(null)
    getAllApplications()
      .then(setApplications)
      .catch(() => setLoadError("Could not load applications. Please try again."))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadApplications() }, [])

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deleteApplication(deleteTarget.id)
    setDeleteTarget(null)
    loadApplications()
  }

  const handleDeleteAllExpired = async () => {
    const expired = applications.filter(
      (app) => app.expiresAt && app.expiresAt.toDate() < new Date()
    )
    for (const app of expired) {
      await deleteApplication(app.id)
    }
    loadApplications()
  }

  const formatDate = (timestamp: { toDate: () => Date } | null) => {
    if (!timestamp) return "N/A"
    return timestamp.toDate().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const isExpired = (app: Application) =>
    app.expiresAt && app.expiresAt.toDate() < new Date()

  const expiredCount = applications.filter(isExpired).length

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-foreground tracking-tight">Applications</h1>
        <p className="text-muted-foreground text-sm font-medium mt-1">
          {applications.length} {applications.length === 1 ? "application" : "applications"} received
        </p>
      </div>

      {!loading && expiredCount > 0 && (
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl bg-destructive/10 border border-destructive/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-destructive">
                {expiredCount} expired {expiredCount === 1 ? "application" : "applications"}
              </p>
              <p className="text-sm text-destructive/80 mt-1">
                {expiredCount === 1 ? "This application has" : "These applications have"} exceeded
                the 6-month retention period and should be deleted to comply with GDPR.
              </p>
            </div>
          </div>
          <Button
            onClick={handleDeleteAllExpired}
            variant="destructive"
            className="font-bold rounded-xl shrink-0"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete All Expired
          </Button>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-card border border-border animate-pulse" />
          ))}
        </div>
      ) : loadError ? (
        <AdminLoadError message={loadError} onRetry={loadApplications} />
      ) : applications.length === 0 ? (
        <div className="text-center py-16 rounded-xl bg-card border border-border">
          <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">No applications received yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className={`rounded-xl bg-card border overflow-hidden ${
                isExpired(app) ? "border-destructive/40 bg-destructive/5" : "border-border"
              }`}
            >
              <button
                onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-black text-foreground tracking-tight">
                      {app.firstName} {app.lastName}
                    </h3>
                    {isExpired(app) && (
                      <Badge className="bg-destructive/10 text-destructive border-0 font-bold uppercase tracking-wider text-xs">
                        Expired
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    {app.vacancyTitle && (
                      <span className="text-sm text-electric-blue font-bold">{app.vacancyTitle}</span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      Submitted: {formatDate(app.submittedAt)}
                    </span>
                    <span className={`text-xs ${isExpired(app) ? "text-destructive font-bold" : "text-muted-foreground"}`}>
                      Expires: {formatDate(app.expiresAt)}
                    </span>
                  </div>
                </div>
                {expandedId === app.id ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </button>

              {expandedId === app.id && (
                <div className="px-6 pb-6 border-t border-border pt-4 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-electric-blue shrink-0" />
                      <a href={`mailto:${app.email}`} className="text-foreground font-medium hover:text-electric-blue">
                        {app.email}
                      </a>
                    </div>
                    {app.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-electric-blue shrink-0" />
                        <a href={`tel:${app.phone}`} className="text-foreground font-medium hover:text-electric-blue">
                          {app.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-electric-blue shrink-0" />
                      <span className="text-foreground font-medium">Submitted {formatDate(app.submittedAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground font-medium">Expires {formatDate(app.expiresAt)}</span>
                    </div>
                  </div>

                  {app.message && (
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Cover Note</p>
                      <p className="text-sm text-foreground leading-relaxed bg-background rounded-lg p-4">
                        {app.message}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg font-bold text-xs"
                      onClick={async () => {
                        try {
                          await downloadCloudinaryFile(app.cvUrl, app.cvFileName)
                        } catch (err) {
                          alert(
                            err instanceof Error
                              ? err.message
                              : "Could not download this CV. Please try again."
                          )
                        }
                      }}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download CV ({app.cvFileName})
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteTarget(app)}
                      className="rounded-lg font-bold text-xs text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black">Delete Application</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {deleteTarget?.firstName} {deleteTarget?.lastName}&apos;s application and CV. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl font-bold">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl font-bold"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
