import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!

export interface Vacancy {
  id: string
  title: string
  salary: string
  description: string
  specDocumentUrl: string | null
  specDocumentName: string | null
  status: "active" | "closed"
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Application {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  cvUrl: string
  cvFileName: string
  vacancyId: string | null
  vacancyTitle: string | null
  submittedAt: Timestamp
  expiresAt: Timestamp
}

async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
  formData.append("folder", folder)
  formData.append("resource_type", "auto")

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
    { method: "POST", body: formData }
  )

  if (!res.ok) throw new Error("Upload failed")
  const data = await res.json()
  return data.secure_url
}

// --- Vacancies ---

export async function getActiveVacancies(): Promise<Vacancy[]> {
  const q = query(
    collection(db, "vacancies"),
    where("status", "==", "active"),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Vacancy))
}

export async function getAllVacancies(): Promise<Vacancy[]> {
  const q = query(collection(db, "vacancies"), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Vacancy))
}

export async function getVacancy(id: string): Promise<Vacancy | null> {
  const snap = await getDoc(doc(db, "vacancies", id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Vacancy
}

export async function createVacancy(
  data: { title: string; salary: string; description: string },
  specFile?: File
): Promise<string> {
  let specDocumentUrl: string | null = null
  let specDocumentName: string | null = null

  if (specFile) {
    specDocumentUrl = await uploadToCloudinary(specFile, "qk-job-specs")
    specDocumentName = specFile.name
  }

  const docRef = await addDoc(collection(db, "vacancies"), {
    ...data,
    specDocumentUrl,
    specDocumentName,
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateVacancy(
  id: string,
  data: Partial<{ title: string; salary: string; description: string; status: "active" | "closed" }>,
  specFile?: File
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updates: Record<string, any> = { ...data, updatedAt: serverTimestamp() }

  if (specFile) {
    updates.specDocumentUrl = await uploadToCloudinary(specFile, "qk-job-specs")
    updates.specDocumentName = specFile.name
  }

  await updateDoc(doc(db, "vacancies", id), updates)
}

export async function deleteVacancy(id: string): Promise<void> {
  await deleteDoc(doc(db, "vacancies", id))
}

// --- Applications ---

export async function submitApplication(
  data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    message: string
    vacancyId: string | null
    vacancyTitle: string | null
  },
  cvFile: File
): Promise<string> {
  const cvUrl = await uploadToCloudinary(cvFile, "qk-cvs")

  const now = new Date()
  const expiresAt = new Date(now)
  expiresAt.setMonth(expiresAt.getMonth() + 6)

  const docRef = await addDoc(collection(db, "applications"), {
    ...data,
    cvUrl,
    cvFileName: cvFile.name,
    submittedAt: serverTimestamp(),
    expiresAt: Timestamp.fromDate(expiresAt),
  })
  return docRef.id
}

export async function getAllApplications(): Promise<Application[]> {
  const q = query(
    collection(db, "applications"),
    orderBy("submittedAt", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Application))
}

export async function deleteApplication(id: string): Promise<void> {
  await deleteDoc(doc(db, "applications", id))
}
