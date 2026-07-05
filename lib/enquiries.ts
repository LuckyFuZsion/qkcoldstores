import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"

export type EnquiryStatus = "new" | "read" | "archived"

export interface Enquiry {
  id: string
  name: string
  company: string | null
  email: string
  phone: string | null
  service: string | null
  message: string
  status: EnquiryStatus
  submittedAt: Timestamp
}

export type EnquiryInput = {
  name: string
  company?: string
  email: string
  phone?: string
  service?: string
  message: string
}

export async function submitEnquiry(data: EnquiryInput): Promise<string> {
  const docRef = await addDoc(collection(db, "enquiries"), {
    name: data.name.trim(),
    company: data.company?.trim() || null,
    email: data.email.trim(),
    phone: data.phone?.trim() || null,
    service: data.service?.trim() || null,
    message: data.message.trim(),
    status: "new" as EnquiryStatus,
    submittedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  const q = query(collection(db, "enquiries"), orderBy("submittedAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Enquiry))
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus
): Promise<void> {
  await updateDoc(doc(db, "enquiries", id), { status })
}

export async function deleteEnquiry(id: string): Promise<void> {
  await deleteDoc(doc(db, "enquiries", id))
}
