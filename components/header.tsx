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
    { href: "/about", label: "About" },
    { href: "/team", label: "Team" },
    { href: "/services", label: "Services" },
    { href: "/location", label: "Location" },
    { href: "/testimonials", label: "Reviews" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm" 
          : "bg-transparent py-6"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-transform hover:scale-105 active:scale-95">
            <Image
              src="/images/qk-logo.png"
              alt="QK Coldstores"
              width={160}
              height={80}
              className="h-12 md:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all rounded-xl hover:bg-deep-navy/5 ${
                  isScrolled ? "text-deep-navy" : "text-deep-navy"
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
              className="bg-deep-navy hover:bg-black text-white font-bold px-6 py-5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
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
              className={`lg:hidden flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 ${
                isScrolled
                  ? "border-slate-200 bg-white text-deep-navy shadow-sm"
                  : "border-deep-navy/20 bg-white/50 backdrop-blur-md text-deep-navy"
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden fixed inset-0 z-[1001] bg-white animate-in fade-in duration-300"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <Image
                src="/images/qk-logo.png"
                alt="QK Coldstores"
                width={140}
                height={70}
                className="h-10 w-auto"
              />
              <button
                type="button"
                onClick={close}
                className="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 text-deep-navy"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 text-xl font-black text-deep-navy uppercase tracking-tight transition-all active:scale-95"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-6 w-6 text-electric-blue" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100">
              <Button
                asChild
                className="w-full h-16 rounded-2xl bg-deep-navy text-white font-bold text-xl shadow-xl"
              >
                <Link href="/portal" onClick={close}>Customer Portal</Link>
              </Button>
              <p className="mt-6 text-center text-slate-400 text-sm font-medium uppercase tracking-widest">
                QK Coldstores (Marston) Ltd
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
