import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"
import { uploadToCloudinary } from "./cloudinary"
import { DEFAULT_TEAM_MEMBERS, type TeamGroup } from "./team-seed-data"

export type { TeamGroup } from "./team-seed-data"

export const TEAM_GROUP_LABELS: Record<TeamGroup, string> = {
  senior: "Senior Leadership Team",
  operational: "Extended Leadership - Operational",
  support: "Extended Leadership - Support Services",
}

export const TEAM_GROUP_ORDER: TeamGroup[] = ["senior", "operational", "support"]

export interface TeamMemberRecord {
  id: string
  name: string
  role: string
  bio: string
  imageUrl: string | null
  group: TeamGroup
  sortOrder: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

async function localPublicUrlToFile(publicPath: string): Promise<File | null> {
  try {
    const res = await fetch(publicPath)
    if (!res.ok) return null
    const blob = await res.blob()
    const filename = publicPath.split("/").pop() ?? "photo.webp"
    return new File([blob], filename, { type: blob.type || "image/webp" })
  } catch {
    return null
  }
}

export async function getAllTeamMembers(): Promise<TeamMemberRecord[]> {
  const snapshot = await getDocs(collection(db, "teamMembers"))
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as TeamMemberRecord))
}

export function groupTeamMembers(members: TeamMemberRecord[]): Record<TeamGroup, TeamMemberRecord[]> {
  const grouped: Record<TeamGroup, TeamMemberRecord[]> = {
    senior: [],
    operational: [],
    support: [],
  }

  for (const member of members) {
    if (grouped[member.group]) {
      grouped[member.group].push(member)
    }
  }

  for (const group of TEAM_GROUP_ORDER) {
    grouped[group].sort((a, b) => a.sortOrder - b.sortOrder)
  }

  return grouped
}

export async function createTeamMember(
  data: {
    name: string
    role: string
    bio?: string
    group: TeamGroup
    sortOrder: number
  },
  imageFile?: File
): Promise<string> {
  let imageUrl: string | null = null

  if (imageFile) {
    imageUrl = await uploadToCloudinary(imageFile, "qk-staff")
  }

  const docRef = await addDoc(collection(db, "teamMembers"), {
    name: data.name,
    role: data.role,
    bio: data.bio ?? "",
    group: data.group,
    sortOrder: data.sortOrder,
    imageUrl,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return docRef.id
}

export async function updateTeamMember(
  id: string,
  data: Partial<{
    name: string
    role: string
    bio: string
    group: TeamGroup
    sortOrder: number
  }>,
  imageFile?: File
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updates: Record<string, any> = { ...data, updatedAt: serverTimestamp() }

  if (imageFile) {
    updates.imageUrl = await uploadToCloudinary(imageFile, "qk-staff")
  }

  await updateDoc(doc(db, "teamMembers", id), updates)
}

export async function deleteTeamMember(id: string): Promise<void> {
  await deleteDoc(doc(db, "teamMembers", id))
}

export async function importDefaultTeamMembers(): Promise<number> {
  const existing = await getAllTeamMembers()
  if (existing.length > 0) {
    throw new Error("Team members already exist. Delete existing records first or add members manually.")
  }

  const sortCounters: Record<TeamGroup, number> = {
    senior: 0,
    operational: 0,
    support: 0,
  }

  let imported = 0

  for (const member of DEFAULT_TEAM_MEMBERS) {
    let imageFile: File | undefined

    if (member.localImage) {
      const file = await localPublicUrlToFile(member.localImage)
      if (file) imageFile = file
    }

    await createTeamMember(
      {
        name: member.name,
        role: member.role,
        group: member.group,
        sortOrder: sortCounters[member.group]++,
      },
      imageFile
    )
    imported++
  }

  return imported
}
