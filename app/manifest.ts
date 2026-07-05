import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "QK Coldstores",
    short_name: "QK Coldstores",
    description:
      "Temperature-controlled cold storage, blast freezing, and logistics in Grantham.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1628",
    theme_color: "#0066cc",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/images/qk-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
