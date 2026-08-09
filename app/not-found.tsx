import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "Page Not Found | QK Cold Stores",
  description: "The page you are looking for could not be found.",
  path: "/404",
  noIndex: true,
})

export default function NotFound() {
  return (
    <main>
      <Header />
      <section className="min-h-[70vh] flex items-center justify-center bg-background py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4">
            404
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
            Page not found
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            The page you are looking for does not exist or may have been moved.
          </p>
          <Button asChild size="lg" className="bg-electric-blue hover:bg-electric-blue/90">
            <Link href="/">Back to homepage</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  )
}
