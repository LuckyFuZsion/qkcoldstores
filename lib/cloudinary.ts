const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!

export type CloudinaryUploadResult = {
  secureUrl: string
  publicId: string
  resourceType: string
  format: string | null
}

export async function uploadToCloudinary(file: File, folder: string): Promise<string> {
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
  return data.secure_url as string
}

/** Upload CVs, job specs and other documents as raw files. */
export async function uploadDocumentToCloudinary(
  file: File,
  folder: string
): Promise<CloudinaryUploadResult> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
  formData.append("folder", folder)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
    { method: "POST", body: formData }
  )

  if (!res.ok) throw new Error("Upload failed")
  const data = await res.json()

  return {
    secureUrl: data.secure_url as string,
    publicId: data.public_id as string,
    resourceType: data.resource_type as string,
    format: (data.format as string) ?? null,
  }
}

export function getCloudinaryDownloadUrl(secureUrl: string): string {
  const uploadSegment = "/upload/"
  const index = secureUrl.indexOf(uploadSegment)
  if (index === -1) return secureUrl

  return (
    secureUrl.slice(0, index + uploadSegment.length) +
    "fl_attachment/" +
    secureUrl.slice(index + uploadSegment.length)
  )
}

export function getCloudinaryRawUrl(secureUrl: string): string {
  return secureUrl.replace("/image/upload/", "/raw/upload/")
}

export function buildCloudinaryDownloadCandidates(secureUrl: string): string[] {
  const rawUrl = getCloudinaryRawUrl(secureUrl)
  return [
    getCloudinaryDownloadUrl(secureUrl),
    secureUrl,
    getCloudinaryDownloadUrl(rawUrl),
    rawUrl,
  ].filter((url, index, list) => list.indexOf(url) === index)
}

export class CloudinaryDownloadError extends Error {
  code: "PDF_BLOCKED" | "NOT_FOUND" | "FAILED"

  constructor(code: CloudinaryDownloadError["code"], message: string) {
    super(message)
    this.code = code
  }
}

export async function downloadCloudinaryFile(secureUrl: string, fileName: string): Promise<void> {
  const params = new URLSearchParams({
    url: secureUrl,
    filename: fileName,
  })

  const response = await fetch(`/api/download?${params.toString()}`)

  if (!response.ok) {
    let message = "Could not download this file. Please try again."
    try {
      const data = await response.json()
      if (typeof data.message === "string") message = data.message
    } catch {
      // ignore
    }
    throw new CloudinaryDownloadError(
      response.status === 403 ? "PDF_BLOCKED" : "FAILED",
      message
    )
  }

  const blob = await response.blob()
  const blobUrl = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = blobUrl
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(blobUrl)
}
