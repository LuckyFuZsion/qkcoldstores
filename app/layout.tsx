import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'QK Coldstores | Precision Cold Storage & Logistics in Grantham',
  description: 'QK Coldstores provides premium temperature-controlled warehousing, blast freezing, and distribution services in Grantham, Marston and the East Midlands. Your trusted partner for cold chain logistics.',
  keywords: ['cold storage', 'cold storage Grantham', 'temperature controlled warehouse', 'blast freezing', 'cold chain logistics', 'Marston', 'East Midlands', 'frozen storage', 'distribution'],
  generator: 'v0.app',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'QK Coldstores | Precision Cold Storage & Logistics',
    description: 'Grantham\'s premier temperature-controlled warehousing solution',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
