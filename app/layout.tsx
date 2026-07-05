import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { UnregisterServiceWorkers } from "@/components/unregister-service-workers"
import { ConsentGatedAnalytics } from "@/components/consent-gated-analytics"
import { CookieConsentBanner } from "@/components/cookie-consent-banner"
import { rootMetadata } from "@/lib/metadata"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata = rootMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <UnregisterServiceWorkers />
          <ConsentGatedAnalytics />
          {children}
          <CookieConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  )
}
