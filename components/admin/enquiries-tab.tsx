"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Mail,
  Phone,
  Calendar,
  ChevronDown,
  ChevronUp,
  Trash2,
  Building2,
  Inbox,
  Copy,
  Check,
  Archive,
  Search,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Reply,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
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
  deleteEnquiries,
  getAllEnquiries,
  updateEnquiryStatus,
  updateEnquiryStatuses,
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

function formatShortDate(timestamp: { toDate: () => Date } | null) {
  if (!timestamp) return ""
  const date = timestamp.toDate()

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function previewText(message: string, max = 90) {
  const compact = message.replace(/\s+/g, " ").trim()
  if (compact.length <= max) return compact
  return `${compact.slice(0, max).trim()}…`
}

function enquiryTitle(enquiry: Enquiry) {
  return enquiry.service?.trim() || "General enquiry"
}

function buildReplyMailto(enquiry: Enquiry) {
  const subject = `Re: ${enquiryTitle(enquiry)}`
  const received = formatDate(enquiry.submittedAt)
  const quotedMessage = enquiry.message
    .split(/\r?\n/)
    .map((line) => `> ${line}`)
    .join("\n")

  const detailLines = [
    `From: ${enquiry.name} <${enquiry.email}>`,
    enquiry.company ? `Company: ${enquiry.company}` : null,
    enquiry.phone ? `Phone: ${enquiry.phone}` : null,
    `Received: ${received}`,
    `Subject: ${enquiryTitle(enquiry)}`,
  ].filter(Boolean)

  const body = [
    "",
    "",
    "---------- Original enquiry ----------",
    ...detailLines,
    "",
    quotedMessage,
  ].join("\n")

  return `mailto:${enquiry.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

type SortKey = "from" | "subject" | "preview" | "received"

function compareEnquiries(a: Enquiry, b: Enquiry, key: SortKey, direction: "asc" | "desc") {
  const factor = direction === "asc" ? 1 : -1
  let result = 0

  switch (key) {
    case "from":
      result = a.name.localeCompare(b.name, "en", { sensitivity: "base" })
      if (result === 0) {
        result = a.email.localeCompare(b.email, "en", { sensitivity: "base" })
      }
      break
    case "subject":
      result = enquiryTitle(a).localeCompare(enquiryTitle(b), "en", { sensitivity: "base" })
      break
    case "preview":
      result = a.message.localeCompare(b.message, "en", { sensitivity: "base" })
      break
    case "received": {
      const aTime = a.submittedAt?.toMillis?.() ?? 0
      const bTime = b.submittedAt?.toMillis?.() ?? 0
      result = aTime - bTime
      break
    }
  }

  return result * factor
}

function SortHeaderButton({
  label,
  active,
  direction,
  align = "left",
  onClick,
}: {
  label: string
  active: boolean
  direction: "asc" | "desc"
  align?: "left" | "right"
  onClick: () => void
}) {
  const Icon = !active ? ArrowUpDown : direction === "asc" ? ArrowUp : ArrowDown

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 hover:text-electric-blue transition-colors ${
        align === "right" ? "justify-end w-full" : ""
      } ${active ? "text-electric-blue" : "text-muted-foreground"}`}
    >
      <span>{label}</span>
      <Icon className="w-3.5 h-3.5" />
    </button>
  )
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? "Copied" : "Copy email address"}
      className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-xs font-medium text-muted-foreground hover:text-electric-blue hover:bg-electric-blue/10 transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
      <span className="max-w-[14rem] truncate">{email}</span>
      <span className="sr-only">{copied ? "Email copied" : "Copy email"}</span>
    </button>
  )
}

export function EnquiriesTab({
  onNewCountChange,
}: {
  onNewCountChange?: (count: number) => void
} = {}) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [archiving, setArchiving] = useState(false)
  const [markingUnread, setMarkingUnread] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("received")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const loadEnquiries = () => {
    setLoading(true)
    setLoadError(null)
    getAllEnquiries()
      .then((items) => {
        setEnquiries(items)
        onNewCountChange?.(items.filter((e) => e.status === "new").length)
        setSelectedIds((prev) => {
          const valid = new Set(items.map((item) => item.id))
          return new Set([...prev].filter((id) => valid.has(id)))
        })
      })
      .catch(() => setLoadError("Could not load enquiries. Please try again."))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadEnquiries()
  }, [])

  const visibleEnquiries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const filtered = query
      ? enquiries.filter((enquiry) => {
          const haystack = [
            enquiry.name,
            enquiry.email,
            enquiry.company ?? "",
            enquiry.phone ?? "",
            enquiryTitle(enquiry),
            enquiry.message,
            enquiry.status,
          ]
            .join(" ")
            .toLowerCase()
          return haystack.includes(query)
        })
      : enquiries

    return [...filtered].sort((a, b) => compareEnquiries(a, b, sortKey, sortDirection))
  }, [enquiries, searchQuery, sortKey, sortDirection])

  const allSelected =
    visibleEnquiries.length > 0 && visibleEnquiries.every((e) => selectedIds.has(e.id))
  const someSelected =
    visibleEnquiries.some((e) => selectedIds.has(e.id)) && !allSelected
  const selectedCount = selectedIds.size
  const selectedEnquiries = useMemo(
    () => enquiries.filter((e) => selectedIds.has(e.id)),
    [enquiries, selectedIds]
  )
  const canArchiveSelected = selectedEnquiries.some((e) => e.status !== "archived")
  const canMarkUnreadSelected = selectedEnquiries.some((e) => e.status !== "new")
  const newCount = useMemo(
    () => enquiries.filter((e) => e.status === "new").length,
    [enquiries]
  )

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
      return
    }
    setSortKey(key)
    setSortDirection(key === "received" ? "desc" : "asc")
  }

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(visibleEnquiries.map((e) => e.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const toggleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  const handleExpand = async (enquiry: Enquiry) => {
    const nextExpanded = expandedId === enquiry.id ? null : enquiry.id
    setExpandedId(nextExpanded)
    if (nextExpanded && enquiry.status === "new") {
      try {
        await updateEnquiryStatus(enquiry.id, "read")
        setEnquiries((prev) => {
          const next = prev.map((e) =>
            e.id === enquiry.id ? { ...e, status: "read" as const } : e
          )
          onNewCountChange?.(next.filter((e) => e.status === "new").length)
          return next
        })
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    setDeleting(true)
    try {
      await deleteEnquiries([...selectedIds])
      setConfirmBulkDelete(false)
      setSelectedIds(new Set())
      setExpandedId(null)
      loadEnquiries()
    } catch (err) {
      console.error(err)
    } finally {
      setDeleting(false)
    }
  }

  const handleBulkArchive = async () => {
    if (selectedIds.size === 0) return
    setArchiving(true)
    try {
      const ids = selectedEnquiries
        .filter((e) => e.status !== "archived")
        .map((e) => e.id)
      if (ids.length > 0) {
        await updateEnquiryStatuses(ids, "archived")
      }
      setSelectedIds(new Set())
      setExpandedId(null)
      loadEnquiries()
    } catch (err) {
      console.error(err)
    } finally {
      setArchiving(false)
    }
  }

  const handleBulkMarkUnread = async () => {
    if (selectedIds.size === 0) return
    setMarkingUnread(true)
    try {
      const ids = selectedEnquiries
        .filter((e) => e.status !== "new")
        .map((e) => e.id)
      if (ids.length > 0) {
        await updateEnquiryStatuses(ids, "new")
      }
      setSelectedIds(new Set())
      setExpandedId(null)
      loadEnquiries()
    } catch (err) {
      console.error(err)
    } finally {
      setMarkingUnread(false)
    }
  }

  const bulkBusy = archiving || deleting || markingUnread

  const bulkActions =
    selectedCount > 0 ? (
      <div className="flex flex-wrap items-center gap-2">
        {canMarkUnreadSelected && (
          <Button
            variant="outline"
            className="rounded-xl font-bold"
            onClick={handleBulkMarkUnread}
            disabled={bulkBusy}
          >
            <Mail className="w-4 h-4 mr-2" />
            {markingUnread ? "Updating…" : `Mark unread (${selectedCount})`}
          </Button>
        )}
        {canArchiveSelected && (
          <Button
            variant="outline"
            className="rounded-xl font-bold"
            onClick={handleBulkArchive}
            disabled={bulkBusy}
          >
            <Archive className="w-4 h-4 mr-2" />
            {archiving ? "Archiving…" : `Archive selected (${selectedCount})`}
          </Button>
        )}
        <Button
          variant="destructive"
          className="rounded-xl font-bold"
          onClick={() => setConfirmBulkDelete(true)}
          disabled={bulkBusy}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete selected ({selectedCount})
        </Button>
      </div>
    ) : null

  return (
    <>
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-foreground tracking-tight">Contact Enquiries</h1>
            <p className="text-muted-foreground text-sm font-medium mt-1">
              {enquiries.length} {enquiries.length === 1 ? "enquiry" : "enquiries"}
              {newCount > 0 ? ` - ${newCount} new/unread` : ""}
              {searchQuery.trim()
                ? ` - showing ${visibleEnquiries.length} match${
                    visibleEnquiries.length === 1 ? "" : "es"
                  }`
                : ""}
            </p>
          </div>
          {bulkActions}
        </div>

        {enquiries.length > 0 && !loadError && !loading && (
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, email, company, subject, message..."
                className="pl-9 rounded-xl"
                aria-label="Search enquiries"
              />
            </div>
            <div className="flex md:hidden items-center gap-2">
              <label htmlFor="enquiry-sort" className="text-xs font-bold uppercase tracking-wider text-muted-foreground shrink-0">
                Sort
              </label>
              <select
                id="enquiry-sort"
                value={`${sortKey}-${sortDirection}`}
                onChange={(e) => {
                  const [key, direction] = e.target.value.split("-") as [SortKey, "asc" | "desc"]
                  setSortKey(key)
                  setSortDirection(direction)
                }}
                className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium"
              >
                <option value="received-desc">Received (newest)</option>
                <option value="received-asc">Received (oldest)</option>
                <option value="from-asc">From (A-Z)</option>
                <option value="from-desc">From (Z-A)</option>
                <option value="subject-asc">Subject (A-Z)</option>
                <option value="subject-desc">Subject (Z-A)</option>
                <option value="preview-asc">Preview (A-Z)</option>
                <option value="preview-desc">Preview (Z-A)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="rounded-xl border border-border overflow-hidden bg-card">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 border-b border-border last:border-0 animate-pulse bg-muted/30" />
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
        <div className="rounded-xl border border-border overflow-hidden bg-card shadow-sm">
          <div className="flex flex-wrap items-center gap-3 px-3 sm:px-4 py-2.5 border-b border-border bg-secondary/40">
            <Checkbox
              checked={allSelected ? true : someSelected ? "indeterminate" : false}
              onCheckedChange={(value) => toggleSelectAll(value === true)}
              aria-label="Select all visible enquiries"
            />
            {selectedCount > 0 ? (
              <>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {selectedCount} selected
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {canMarkUnreadSelected && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg font-bold text-xs"
                      onClick={handleBulkMarkUnread}
                      disabled={bulkBusy}
                    >
                      <Mail className="w-3.5 h-3.5 mr-1" />
                      {markingUnread ? "Updating…" : "Mark unread"}
                    </Button>
                  )}
                  {canArchiveSelected && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg font-bold text-xs"
                      onClick={handleBulkArchive}
                      disabled={bulkBusy}
                    >
                      <Archive className="w-3.5 h-3.5 mr-1" />
                      {archiving ? "Archiving…" : "Archive"}
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-lg font-bold text-xs"
                    onClick={() => setConfirmBulkDelete(true)}
                    disabled={bulkBusy}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    Delete
                  </Button>
                </div>
              </>
            ) : (
              <>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Select
                </span>
                <div className="hidden md:grid md:grid-cols-[minmax(10rem,14rem)_minmax(9rem,12rem)_1fr_7.5rem] gap-3 flex-1 text-[11px] font-bold uppercase tracking-wider pl-2">
                  <SortHeaderButton
                    label="From"
                    active={sortKey === "from"}
                    direction={sortDirection}
                    onClick={() => toggleSort("from")}
                  />
                  <SortHeaderButton
                    label="Subject"
                    active={sortKey === "subject"}
                    direction={sortDirection}
                    onClick={() => toggleSort("subject")}
                  />
                  <SortHeaderButton
                    label="Preview"
                    active={sortKey === "preview"}
                    direction={sortDirection}
                    onClick={() => toggleSort("preview")}
                  />
                  <SortHeaderButton
                    label="Received"
                    active={sortKey === "received"}
                    direction={sortDirection}
                    align="right"
                    onClick={() => toggleSort("received")}
                  />
                </div>
              </>
            )}
          </div>

          {visibleEnquiries.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No enquiries match your search.</p>
            </div>
          ) : (
          <div className="divide-y divide-border">
            {visibleEnquiries.map((enquiry) => {
              const isExpanded = expandedId === enquiry.id
              const isSelected = selectedIds.has(enquiry.id)
              const isUnread = enquiry.status === "new"

              return (
                <div
                  key={enquiry.id}
                  className={`${
                    isUnread ? "bg-electric-blue/[0.04]" : "bg-card"
                  } ${isSelected ? "bg-electric-blue/10" : ""} ${
                    isExpanded ? "bg-secondary/20" : ""
                  }`}
                >
                  <div className="flex items-stretch gap-2 sm:gap-3 px-3 sm:px-4">
                    <div className="flex items-center py-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(value) => toggleSelect(enquiry.id, value === true)}
                        aria-label={`Select enquiry from ${enquiry.name}`}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>

                    <div
                      onClick={() => handleExpand(enquiry)}
                      className="flex-1 min-w-0 py-3 text-left cursor-pointer"
                    >
                      <div className="md:hidden space-y-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p
                              className={`truncate text-sm ${
                                isUnread ? "font-black text-foreground" : "font-semibold text-foreground"
                              }`}
                            >
                              {enquiry.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {enquiryTitle(enquiry)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {isUnread && (
                              <Badge className="bg-electric-blue text-white border-0 text-[10px] font-black uppercase">
                                New
                              </Badge>
                            )}
                            <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                              {formatShortDate(enquiry.submittedAt)}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {previewText(enquiry.message, 110)}
                        </p>
                      </div>

                      <div className="hidden md:grid md:grid-cols-[minmax(10rem,14rem)_minmax(9rem,12rem)_1fr_7.5rem] gap-3 items-center">
                        <div className="min-w-0">
                          <p
                            className={`truncate text-sm ${
                              isUnread ? "font-black text-foreground" : "font-medium text-foreground"
                            }`}
                          >
                            {enquiry.name}
                          </p>
                          <div onClick={(e) => e.stopPropagation()}>
                            <CopyEmailButton email={enquiry.email} />
                          </div>
                        </div>
                        <div className="min-w-0 flex items-center gap-2">
                          {isUnread && (
                            <span className="w-2 h-2 rounded-full bg-electric-blue shrink-0" aria-hidden />
                          )}
                          <p
                            className={`truncate text-sm ${
                              isUnread ? "font-bold text-foreground" : "font-medium text-foreground/90"
                            }`}
                          >
                            {enquiryTitle(enquiry)}
                          </p>
                        </div>
                        <p className="truncate text-sm text-muted-foreground">
                          {previewText(enquiry.message, 120)}
                        </p>
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatShortDate(enquiry.submittedAt)}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-3 sm:px-4 pb-4 pl-11 sm:pl-12">
                      <div className="rounded-xl border border-border bg-background p-4 space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          {enquiry.status === "new" && (
                            <Badge className="bg-electric-blue/10 text-electric-blue border-0 font-bold uppercase tracking-wider text-xs">
                              New
                            </Badge>
                          )}
                          {enquiry.status === "read" && (
                            <Badge className="bg-muted text-muted-foreground border-0 font-bold uppercase tracking-wider text-xs">
                              Read
                            </Badge>
                          )}
                          {enquiry.status === "archived" && (
                            <Badge className="bg-secondary text-muted-foreground border-0 font-bold uppercase tracking-wider text-xs">
                              Archived
                            </Badge>
                          )}
                          <span className="text-sm font-bold text-foreground">{enquiryTitle(enquiry)}</span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 min-w-0">
                            <Mail className="w-4 h-4 text-electric-blue shrink-0" />
                            <CopyEmailButton email={enquiry.email} />
                          </div>
                          {enquiry.phone && (
                            <div className="flex items-center gap-2">
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
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-electric-blue shrink-0" />
                              <span className="text-foreground font-medium">{enquiry.company}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
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
                          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                            {enquiry.message}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                          <Button
                            asChild
                            size="sm"
                            className="rounded-lg font-bold text-xs bg-electric-blue hover:bg-electric-blue/90 text-white"
                          >
                            <a
                              href={buildReplyMailto(enquiry)}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Reply className="w-3.5 h-3.5 mr-1" />
                              Reply
                            </a>
                          </Button>
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
                              <Archive className="w-3.5 h-3.5 mr-1" />
                              Archive
                            </Button>
                          )}
                          {enquiry.status !== "new" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-lg font-bold text-xs"
                              onClick={async () => {
                                await updateEnquiryStatus(enquiry.id, "new")
                                loadEnquiries()
                              }}
                            >
                              <Mail className="w-3.5 h-3.5 mr-1" />
                              Mark as Unread
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
                            onClick={() => {
                              setSelectedIds(new Set([enquiry.id]))
                              setConfirmBulkDelete(true)
                            }}
                            className="rounded-lg font-bold text-xs text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          )}
        </div>
      )}

      <AlertDialog
        open={confirmBulkDelete}
        onOpenChange={(open) => {
          if (!open) setConfirmBulkDelete(false)
        }}
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black">
              Delete {selectedCount === 1 ? "enquiry" : `${selectedCount} enquiries`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes{" "}
              {selectedCount === 1 ? "this enquiry" : `the ${selectedCount} selected enquiries`}{" "}
              from the admin panel. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl font-bold" disabled={deleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl font-bold"
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
