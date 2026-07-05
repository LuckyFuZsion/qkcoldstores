"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  X,
  User,
  AlertCircle,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  createTeamMember,
  deleteTeamMember,
  getAllTeamMembers,
  importDefaultTeamMembers,
  TEAM_GROUP_LABELS,
  TEAM_GROUP_ORDER,
  updateTeamMember,
  type TeamGroup,
  type TeamMemberRecord,
} from "@/lib/team-members"
import { AdminLoadError } from "@/components/admin/load-error"

export function TeamTab() {
  const [members, setMembers] = useState<TeamMemberRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<TeamMemberRecord | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<TeamMemberRecord | null>(null)
  const [importing, setImporting] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)

  const loadMembers = () => {
    setLoading(true)
    setLoadError(null)
    getAllTeamMembers()
      .then(setMembers)
      .catch(() => setLoadError("Could not load team members. Please try again."))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadMembers()
  }, [])

  const handleSaved = () => {
    setDialogOpen(false)
    setEditing(null)
    loadMembers()
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deleteTeamMember(deleteTarget.id)
    setDeleteTarget(null)
    loadMembers()
  }

  const handleImport = async () => {
    setImporting(true)
    setImportError(null)
    try {
      await importDefaultTeamMembers()
      loadMembers()
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "Import failed.")
    } finally {
      setImporting(false)
    }
  }

  const grouped = TEAM_GROUP_ORDER.map((group) => ({
    group,
    label: TEAM_GROUP_LABELS[group],
    members: members.filter((m) => m.group === group).sort((a, b) => a.sortOrder - b.sortOrder),
  }))

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">Manage Team</h1>
          <p className="text-muted-foreground text-sm font-medium mt-1">
            {members.length} {members.length === 1 ? "member" : "members"} across all groups
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {members.length === 0 && (
            <Button
              variant="outline"
              onClick={handleImport}
              disabled={importing}
              className="font-bold rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              {importing ? "Importing..." : "Import Existing Team"}
            </Button>
          )}
          <Button
            onClick={() => {
              setEditing(null)
              setDialogOpen(true)
            }}
            className="bg-electric-blue text-white hover:bg-electric-blue/90 font-bold rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        </div>
      </div>

      {importError && (
        <div className="mb-6 flex items-center gap-2 text-destructive text-sm font-medium p-4 rounded-xl bg-destructive/10">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {importError}
        </div>
      )}

      {members.length === 0 && !loading && (
        <div className="text-center py-12 rounded-xl bg-card border border-border mb-8">
          <User className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium mb-2">No team members yet.</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Click &quot;Import Existing Team&quot; to upload current staff photos to Cloudinary and
            populate the team page, or add members manually.
          </p>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-card border border-border animate-pulse" />
          ))}
        </div>
      ) : loadError ? (
        <AdminLoadError message={loadError} onRetry={loadMembers} />
      ) : (
        <div className="space-y-12">
          {grouped.map(({ group, label, members: groupMembers }) =>
            groupMembers.length === 0 ? null : (
              <div key={group}>
                <h2 className="text-lg font-black text-electric-blue mb-4 tracking-tight">{label}</h2>
                <div className="space-y-4">
                  {groupMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-card border border-border"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-secondary shrink-0">
                          {member.imageUrl ? (
                            <Image
                              src={member.imageUrl}
                              alt={member.name}
                              fill
                              className="object-cover object-top"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-8 h-8 text-muted-foreground/40" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-black text-foreground text-lg tracking-tight truncate">
                            {member.name}
                          </h3>
                          <p className="text-sm text-muted-foreground font-medium">{member.role}</p>
                          <p className="text-xs text-muted-foreground mt-1">Order: {member.sortOrder}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditing(member)
                            setDialogOpen(true)
                          }}
                          className="font-bold text-xs"
                        >
                          <Pencil className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteTarget(member)}
                          className="font-bold text-xs text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setDialogOpen(false)
            setEditing(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-lg rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-black text-xl tracking-tight">
              {editing ? "Edit Team Member" : "Add Team Member"}
            </DialogTitle>
          </DialogHeader>
          <TeamMemberForm
            member={editing}
            onSaved={handleSaved}
            onCancel={() => {
              setDialogOpen(false)
              setEditing(null)
            }}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black">Delete Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deleteTarget?.name}? This cannot be undone.
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

function TeamMemberForm({
  member,
  onSaved,
  onCancel,
}: {
  member: TeamMemberRecord | null
  onSaved: () => void
  onCancel: () => void
}) {
  const [name, setName] = useState(member?.name ?? "")
  const [role, setRole] = useState(member?.role ?? "")
  const [bio, setBio] = useState(member?.bio ?? "")
  const [group, setGroup] = useState<TeamGroup>(member?.group ?? "senior")
  const [sortOrder, setSortOrder] = useState(String(member?.sortOrder ?? 0))
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const payload = {
        name,
        role,
        bio,
        group,
        sortOrder: Number.parseInt(sortOrder, 10) || 0,
      }

      if (member) {
        await updateTeamMember(member.id, payload, photoFile ?? undefined)
      } else {
        await createTeamMember(payload, photoFile ?? undefined)
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
        <Label className="font-bold text-sm uppercase tracking-wider">Name *</Label>
        <Input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl h-12"
          placeholder="e.g. Jane Smith"
        />
      </div>

      <div className="space-y-2">
        <Label className="font-bold text-sm uppercase tracking-wider">Role *</Label>
        <Input
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-xl h-12"
          placeholder="e.g. Operations Manager"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="font-bold text-sm uppercase tracking-wider">Group *</Label>
          <Select value={group} onValueChange={(v) => setGroup(v as TeamGroup)}>
            <SelectTrigger className="rounded-xl h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TEAM_GROUP_ORDER.map((g) => (
                <SelectItem key={g} value={g}>
                  {TEAM_GROUP_LABELS[g]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="font-bold text-sm uppercase tracking-wider">Display Order</Label>
          <Input
            type="number"
            min={0}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-xl h-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-bold text-sm uppercase tracking-wider">Bio</Label>
        <Textarea
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="rounded-xl resize-none"
          placeholder="Optional short bio..."
        />
      </div>

      <div className="space-y-2">
        <Label className="font-bold text-sm uppercase tracking-wider">Photo</Label>
        {member?.imageUrl && !photoFile && (
          <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-secondary mb-2">
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              className="object-cover object-top"
              unoptimized
            />
          </div>
        )}
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-electric-blue/50 hover:bg-electric-blue/5 transition-all"
        >
          {photoFile ? (
            <div className="flex items-center justify-center gap-3">
              <span className="font-bold text-foreground text-sm">{photoFile.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setPhotoFile(null)
                }}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm font-bold text-foreground">Click to upload photo</p>
              <p className="text-xs text-muted-foreground">JPG, PNG or WEBP</p>
            </>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          className="hidden"
          onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
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
          {saving ? "Saving..." : member ? "Update Member" : "Add Member"}
        </Button>
      </div>
    </form>
  )
}
