"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Furniture", href: "/furniture" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-lg"
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="RR Driver Services"
              width={48}
              height={48}
              className="h-10 md:h-12 transition-transform group-hover:scale-105"
              style={{ width: "auto" }}
            />
            <span className="font-semibold text-foreground hidden sm:block">
              RR Driver Services
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-muted-foreground hover:text-foreground font-medium transition-colors text-sm py-2 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:07312261976" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              <Phone className="h-4 w-4" />
              07312 261 976
            </a>
            <Button size="sm" className="group" asChild>
              <a href="https://www.facebook.com/profile.php?id=61565363504277" target="_blank" rel="noopener noreferrer">
                Get Quote
                <span className="ml-1 transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </a>
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-foreground hover:bg-card rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </nav>

      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile menu panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-72 bg-background border-l border-border shadow-2xl z-50 lg:hidden transition-transform duration-300 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-semibold text-foreground">Menu</span>
          <button
            type="button"
            className="p-2 text-foreground hover:bg-card rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col p-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground hover:bg-card hover:text-primary px-4 py-3 rounded-lg font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col gap-4 pt-6 mt-4 border-t border-border">
            <a href="tel:07312261976" className="flex items-center gap-3 text-muted-foreground hover:text-foreground px-4 transition-colors">
              <Phone className="h-5 w-5" />
              07312 261 976
            </a>
            <Button asChild className="mx-4">
              <a href="https://www.facebook.com/profile.php?id=61565363504277" target="_blank" rel="noopener noreferrer">
                Get a Free Quote
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
