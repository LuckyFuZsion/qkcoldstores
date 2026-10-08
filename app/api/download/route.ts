import { NextRequest, NextResponse } from "next/server"
import { buildCloudinaryDownloadCandidates } from "@/lib/cloudinary"
import { isAdminEmail } from "@/lib/site-config"

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const MAX_BYTES = 20 * 1024 * 1024
const MAX_REDIRECTS = 3

const ALLOWED_FOLDERS = ["/qk-cvs/", "/qk-job-specs/"]

/** The Cloudinary account is shared with another site, so only QK's own folders may be proxied. */
function isAllowedCloudinaryUrl(url: string): boolean {
  if (!CLOUD_NAME) return false
  try {
    const parsed = new URL(url)
    return (
      parsed.protocol === "https:" &&
      parsed.hostname === "res.cloudinary.com" &&
      parsed.pathname.startsWith(`/${CLOUD_NAME}/`) &&
      ALLOWED_FOLDERS.some((folder) => parsed.pathname.includes(folder))
    )
  } catch {
    return false
  }
}

/** CVs contain personal data, so they are only served to signed-in admins. */
function isCvUrl(url: string): boolean {
  return new URL(url).pathname.includes("/qk-cvs/")
}

async function isAdminRequest(request: NextRequest): Promise<boolean> {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "")
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  if (!token || !apiKey) return false

  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      }
    )
    if (!res.ok) return false
    const data = (await res.json()) as {
      users?: { email?: string }[]
    }
    const user = data.users?.[0]
    return isAdminEmail(user?.email)
  } catch {
    return false
  }
}

/** Fetch without blindly following redirects off our own Cloudinary account. */
async function fetchAllowed(url: string): Promise<Response> {
  let current = url
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const res = await fetch(current, { redirect: "manual" })
    if (res.status < 300 || res.status >= 400) return res
    const location = res.headers.get("location")
    if (!location) return res
    const next = new URL(location, current).toString()
    if (!isAllowedCloudinaryUrl(next)) throw new Error("Redirect not allowed")
    current = next
  }
  throw new Error("Too many redirects")
}

function classifyCloudinaryError(status: number, errorHeader: string | null): {
  status: number
  code: string
  message: string
} {
  const error = errorHeader?.toLowerCase() ?? ""

  if (status === 401 || error.includes("deny") || error.includes("acl")) {
    return {
      status: 403,
      code: "PDF_BLOCKED",
      message:
        "Cloudinary is blocking this PDF download. In your Cloudinary dashboard, go to Settings > Security and allow PDF and ZIP file delivery, then try again.",
    }
  }

  if (status === 404 || error.includes("not found")) {
    return {
      status: 404,
      code: "NOT_FOUND",
      message: "This file could not be found in Cloudinary. It may have been removed.",
    }
  }

  return {
    status: 502,
    code: "FAILED",
    message: "Could not download this file from Cloudinary. Please try again.",
  }
}

export async function GET(request: NextRequest) {
  const secureUrl = request.nextUrl.searchParams.get("url")
  const fileName = request.nextUrl.searchParams.get("filename") ?? "download"

  if (!secureUrl || !isAllowedCloudinaryUrl(secureUrl)) {
    return NextResponse.json({ error: "Invalid download URL." }, { status: 400 })
  }

  if (isCvUrl(secureUrl) && !(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 })
  }

  const safeFileName = fileName.replace(/[^\w\s.-]/g, "_").trim() || "download"
  const candidates = buildCloudinaryDownloadCandidates(secureUrl)
  let lastFailure: ReturnType<typeof classifyCloudinaryError> | null = null

  for (const candidate of candidates) {
    try {
      const upstream = await fetchAllowed(candidate)
      if (!upstream.ok) {
        lastFailure = classifyCloudinaryError(
          upstream.status,
          upstream.headers.get("x-cld-error")
        )
        continue
      }

      const declared = Number(upstream.headers.get("content-length") ?? 0)
      if (declared > MAX_BYTES) {
        return NextResponse.json(
          { code: "FAILED", message: "This file is too large to download." },
          { status: 413 }
        )
      }
      const buffer = await upstream.arrayBuffer()
      if (buffer.byteLength > MAX_BYTES) {
        return NextResponse.json(
          { code: "FAILED", message: "This file is too large to download." },
          { status: 413 }
        )
      }
      const contentType =
        upstream.headers.get("content-type") ?? "application/octet-stream"

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${safeFileName}"`,
          "Cache-Control": "private, no-cache",
        },
      })
    } catch {
      continue
    }
  }

  if (lastFailure) {
    return NextResponse.json(
      { code: lastFailure.code, message: lastFailure.message },
      { status: lastFailure.status }
    )
  }

  return NextResponse.json(
    {
      code: "FAILED",
      message: "Could not download this file from Cloudinary. Please try again.",
    },
    { status: 502 }
  )
}
