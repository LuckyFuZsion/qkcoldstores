"use client"

import { useEffect, useState } from "react"
import {
  Mail,
  Phone,
  Calendar,
  ChevronDown,
  ChevronUp,
  Trash2,
  MessageSquare,
  Building2,
  Inbox,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import {
  deleteEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  type Enquiry,
} from "@/lib/enquiries"
import { AdminLoadError } from "@/components/admin/load-error"

function formatDate(timestamp: { toDate: () => Date } | null) {
  if (!timestamp) return "N/A"
  return timestamp.toDate().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function statusBadge(status: Enquiry["status"]) {
  if (status === "new") {
    return (
      <Badge className="bg-electric-blue/10 text-electric-blue border-0 font-bold uppercase tracking-wider text-xs">
        New
      </Badge>
    )
  }
  if (status === "read") {
    return (
      <Badge className="bg-muted text-muted-foreground border-0 font-bold uppercase tracking-wider text-xs">
        Read
      </Badge>
    )
  }
  return (
    <Badge className="bg-secondary text-muted-foreground border-0 font-bold uppercase tracking-wider text-xs">
      Archived
    </Badge>
  )
}

export function EnquiriesTab() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Enquiry | null>(null)

  const loadEnquiries = () => {
    setLoading(true)
    setLoadError(null)
    getAllEnquiries()
      .then(setEnquiries)
      .catch(() => setLoadError("Could not load enquiries. Please try again."))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadEnquiries()
  }, [])

  const handleExpand = async (enquiry: Enquiry) => {
    const nextExpanded = expandedId === enquiry.id ? null : enquiry.id
    setExpandedId(nextExpanded)
    if (nextExpanded && enquiry.status === "new") {
      try {
        await updateEnquiryStatus(enquiry.id, "read")
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiry.id ? { ...e, status: "read" } : e))
        )
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deleteEnquiry(deleteTarget.id)
    setDeleteTarget(null)
    loadEnquiries()
  }

  const newCount = enquiries.filter((e) => e.status === "new").length

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-foreground tracking-tight">Contact Enquiries</h1>
        <p className="text-muted-foreground text-sm font-medium mt-1">
          {enquiries.length} {enquiries.length === 1 ? "enquiry" : "enquiries"} received
          {newCount > 0 ? ` - ${newCount} new` : ""}
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-card border border-border animate-pulse" />
          ))}
        </div>
      ) : loadError ? (
        <AdminLoadError message={loadError} onRetry={loadEnquiries} />
      ) : enquiries.length === 0 ? (
        <div className="text-center py-16 rounded-xl bg-card border border-border">
          <Inbox className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">No contact enquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className={`rounded-xl bg-card border overflow-hidden ${
                enquiry.status === "new" ? "border-electric-blue/30" : "border-border"
              }`}
            >
              <button
                onClick={() => handleExpand(enquiry)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-black text-foreground tracking-tight">{enquiry.name}</h3>
                    {statusBadge(enquiry.status)}
                    {enquiry.service && (
                      <span className="text-sm text-electric-blue font-bold">{enquiry.service}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <span className="text-sm text-muted-foreground">{enquiry.email}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(enquiry.submittedAt)}
                    </span>
                  </div>
                </div>
                {expandedId === enquiry.id ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </button>

              {expandedId === enquiry.id && (
                <div className="px-6 pb-6 border-t border-border pt-4 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-electric-blue shrink-0" />
                      <a
                        href={`mailto:${enquiry.email}`}
                        className="text-foreground font-medium hover:text-electric-blue"
                      >
                        {enquiry.email}
                      </a>
                    </div>
                    {enquiry.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-electric-blue shrink-0" />
                        <a
                          href={`tel:${enquiry.phone}`}
                          className="text-foreground font-medium hover:text-electric-blue"
                        >
                          {enquiry.phone}
                        </a>
                      </div>
                    )}
                    {enquiry.company && (
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="w-4 h-4 text-electric-blue shrink-0" />
                        <span className="text-foreground font-medium">{enquiry.company}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-electric-blue shrink-0" />
                      <span className="text-foreground font-medium">
                        {formatDate(enquiry.submittedAt)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                      Message
                    </p>
                    <p className="text-sm text-foreground leading-relaxed bg-background rounded-lg p-4 whitespace-pre-wrap">
                      {enquiry.message}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {enquiry.status !== "archived" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg font-bold text-xs"
                        onClick={async () => {
                          await updateEnquiryStatus(enquiry.id, "archived")
                          loadEnquiries()
                        }}
                      >
                        Archive
                      </Button>
                    )}
                    {enquiry.status === "archived" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg font-bold text-xs"
                        onClick={async () => {
                          await updateEnquiryStatus(enquiry.id, "read")
                          loadEnquiries()
                        }}
                      >
                        Mark as Read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteTarget(enquiry)}
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
            <AlertDialogTitle className="font-black">Delete Enquiry</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the enquiry from {deleteTarget?.name}. This cannot be undone.
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
