import type { Metadata } from "next"
import { OG_IMAGE_PATH } from "@/lib/json-ld"
import { SITE_URL } from "@/lib/site-config"

export const SITE_NAME = "QK Cold Stores"

const OG_IMAGE_ALT = "QK Cold Stores temperature-controlled cold storage facility in Grantham"

const sharedOpenGraphImages = [
  {
    url: OG_IMAGE_PATH,
    width: 1200,
    height: 630,
    alt: OG_IMAGE_ALT,
  },
]

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  noIndex?: boolean
}

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    authors: [{ name: "QK Cold Stores", url: SITE_URL }],
    creator: "QK Cold Stores",
    publisher: "QK Cold Stores (Marston) Ltd",
    alternates: {
      canonical: path,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: "website",
      images: sharedOpenGraphImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_PATH],
    },
  }
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "QK Cold Stores | Precision Cold Storage and Logistics in Grantham",
  description:
    "QK Cold Stores provides premium temperature-controlled warehousing, blast freezing, and distribution services in Grantham, Marston and the East Midlands. Your trusted partner for cold chain logistics.",
  authors: [{ name: "QK Cold Stores", url: SITE_URL }],
  creator: "QK Cold Stores",
  publisher: "QK Cold Stores (Marston) Ltd",
  keywords: [
    "cold storage",
    "cold storage Grantham",
    "temperature controlled warehouse",
    "blast freezing",
    "cold chain logistics",
    "Marston",
    "East Midlands",
    "frozen storage",
    "distribution",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "XuRbxIctTFbl8DP1VB6keBkaf0trmv2ne3dwngjbqOo",
  },
  openGraph: {
    title: "QK Cold Stores | Precision Cold Storage and Logistics in Grantham",
    description:
      "Grantham's premier temperature-controlled warehousing solution for the food manufacturing sector.",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
    images: sharedOpenGraphImages,
  },
  twitter: {
    card: "summary_large_image",
    title: "QK Cold Stores | Precision Cold Storage and Logistics in Grantham",
    description:
      "Grantham's premier temperature-controlled warehousing solution for the food manufacturing sector.",
    images: [OG_IMAGE_PATH],
  },
}
