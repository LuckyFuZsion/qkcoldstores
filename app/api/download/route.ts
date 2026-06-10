import { NextRequest, NextResponse } from "next/server"
import { buildCloudinaryDownloadCandidates } from "@/lib/cloudinary"

function isAllowedCloudinaryUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.hostname === "res.cloudinary.com"
  } catch {
    return false
  }
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

  const safeFileName = fileName.replace(/[^\w\s.-]/g, "_").trim() || "download"
  const candidates = buildCloudinaryDownloadCandidates(secureUrl)
  let lastFailure: ReturnType<typeof classifyCloudinaryError> | null = null

  for (const candidate of candidates) {
    try {
      const upstream = await fetch(candidate, { redirect: "follow" })
      if (!upstream.ok) {
        lastFailure = classifyCloudinaryError(
          upstream.status,
          upstream.headers.get("x-cld-error")
        )
        continue
      }

      const buffer = await upstream.arrayBuffer()
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
