"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    document.body.style.touchAction = isMenuOpen ? "none" : ""
    return () => {
      document.body.style.overflow = ""
      document.body.style.touchAction = ""
    }
  }, [isMenuOpen])

  const close = () => setIsMenuOpen(false)

  const navLinks = [
    { href: "/about", label: "About Us" },
    { href: "/team", label: "Meet the Team" },
    { href: "/services", label: "What We Offer" },
    { href: "/location", label: "Location" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Us" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] isolate pointer-events-auto transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/qk-logo.png"
              alt="QK Coldstores"
              width={120}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-electric-blue ${
                  isScrolled ? "text-deep-navy" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              asChild
              className="bg-electric-blue hover:bg-electric-blue/90 text-white font-semibold shadow-lg"
            >
              <Link href="/portal">Customer Portal</Link>
            </Button>
          </div>

          {/* Mobile hamburger trigger */}
          {!isMenuOpen && (
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={false}
              aria-controls="mobile-navigation"
              className={`lg:hidden fixed top-4 right-4 z-[1003] flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg backdrop-blur-xl transition-all duration-200 touch-manipulation cursor-pointer ${
                isScrolled
                  ? "border-slate-200/80 bg-white/95 text-deep-navy hover:bg-white"
                  : "border-white/20 bg-deep-navy/45 text-white hover:bg-deep-navy/60"
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="lg:hidden fixed top-4 right-4 z-[1003] w-[min(22rem,calc(100vw-2rem))] max-h-[calc(100svh-2rem)] flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-top-right-2 duration-200"
        >
            {/* Header stripe with close button */}
          <div className="relative shrink-0 bg-gradient-to-br from-deep-navy via-deep-navy to-electric-blue px-5 pt-4 pb-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Menu</p>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white backdrop-blur-sm touch-manipulation cursor-pointer hover:bg-white/25 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable nav links */}
          <div className="overflow-y-auto overscroll-contain p-3 border-none">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-deep-navy transition-all hover:bg-slate-100 hover:text-electric-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue/40"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Link>
              ))}
            </div>

            <div className="mt-3 rounded-2xl bg-slate-50 p-3 border-none">
              <p className="text-sm font-medium text-deep-navy">Need live account access?</p>
              <p className="mt-1 text-sm text-slate-600">
                Sign in to your customer portal for stock and account information.
              </p>
              <Button
                asChild
                className="mt-3 h-11 w-full rounded-xl bg-electric-blue text-white font-semibold shadow-sm hover:bg-electric-blue/90"
              >
                <Link href="/portal" onClick={close}>Customer Portal</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
