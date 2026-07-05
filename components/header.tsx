"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

type NavLink = { href: string; label: string }

type NavEntry =
  | { type: "link"; href: string; label: string }
  | { type: "group"; label: string; items: NavLink[] }

const navItems: NavEntry[] = [
  { type: "link", href: "/", label: "Home" },
  {
    type: "group",
    label: "About",
    items: [
      { href: "/about", label: "About Us" },
      { href: "/team", label: "Our Team" },
      { href: "/location", label: "Location" },
    ],
  },
  { type: "link", href: "/services", label: "Services" },
  {
    type: "group",
    label: "More",
    items: [
      { href: "/faq", label: "FAQ" },
      { href: "/vacancies", label: "Vacancies" },
    ],
  },
  { type: "link", href: "/contact", label: "Contact" },
]

const navTriggerClass =
  "px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors h-auto shadow-none !bg-transparent !text-deep-navy hover:!bg-transparent hover:!text-electric-blue focus:!bg-transparent focus:!text-deep-navy focus-visible:!ring-0 data-[state=open]:!bg-transparent data-[state=open]:!text-electric-blue data-[state=open]:hover:!bg-transparent data-[state=open]:hover:!text-electric-blue data-[state=open]:focus:!bg-transparent [&_svg]:!text-current"

const navLinkClass =
  "px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors h-auto shadow-none !bg-transparent !text-deep-navy hover:!bg-transparent hover:!text-electric-blue focus:!bg-transparent focus:!text-deep-navy focus-visible:!ring-0 data-[active=true]:!bg-transparent data-[active=true]:!text-electric-blue"

function DesktopNav() {
  return (
    <NavigationMenu
      viewport={false}
      className="max-w-none [&_[data-slot=navigation-menu-trigger]]:!text-deep-navy [&_[data-slot=navigation-menu-trigger]]:data-[state=open]:!text-electric-blue [&_[data-slot=navigation-menu-trigger]]:!bg-transparent [&_[data-slot=navigation-menu-trigger]]:data-[state=open]:!bg-transparent [&_[data-slot=navigation-menu-link]]:!text-deep-navy [&_[data-slot=navigation-menu-link]]:hover:!text-electric-blue [&_[data-slot=navigation-menu-link]]:!bg-transparent [&_[data-slot=navigation-menu-content]]:!bg-white [&_[data-slot=navigation-menu-content]]:!text-deep-navy"
    >
      <NavigationMenuList className="gap-0">
        {navItems.map((entry) =>
          entry.type === "link" ? (
            <NavigationMenuItem key={entry.href}>
              <NavigationMenuLink asChild>
                <Link href={entry.href} className={navLinkClass}>
                  {entry.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={entry.label}>
              <NavigationMenuTrigger className={navTriggerClass}>
                {entry.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="!bg-white !text-deep-navy border border-slate-200 shadow-xl rounded-xl overflow-hidden !top-full !mt-1 z-50">
                <ul className="grid min-w-[11rem] gap-0.5 p-2 !bg-white">
                  {entry.items.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="block rounded-lg px-3 py-2.5 text-sm font-bold !text-deep-navy uppercase tracking-wide !bg-transparent hover:!bg-transparent hover:!text-electric-blue transition-colors focus:!bg-transparent focus:!text-electric-blue"
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {navItems.map((entry) =>
        entry.type === "link" ? (
          <Link
            key={entry.href}
            href={entry.href}
            onClick={onNavigate}
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 text-[11px] font-bold text-deep-navy uppercase tracking-[0.2em] transition-all active:scale-95 border border-slate-100/50"
          >
            <span>{entry.label}</span>
            <ChevronRight className="h-3.5 w-3.5 text-electric-blue" />
          </Link>
        ) : (
          <Collapsible
            key={entry.label}
            open={openGroups[entry.label]}
            onOpenChange={() => toggleGroup(entry.label)}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between p-3.5 rounded-xl bg-slate-50 text-[11px] font-bold text-deep-navy uppercase tracking-[0.2em] border border-slate-100/50">
              <span>{entry.label}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-electric-blue transition-transform",
                  openGroups[entry.label] && "rotate-180"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 ml-2 space-y-1 border-l-2 border-electric-blue/30 pl-3 bg-white">
              {entry.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className="flex items-center justify-between py-2.5 text-[10px] font-bold text-deep-navy uppercase tracking-[0.15em] hover:text-electric-blue transition-colors"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-3 w-3 text-electric-blue/60" />
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )
      )}
    </div>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    document.body.style.touchAction = isMenuOpen ? "none" : ""
    return () => {
      document.body.style.overflow = ""
      document.body.style.touchAction = ""
    }
  }, [isMenuOpen])

  const close = () => setIsMenuOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] overflow-visible transition-all duration-500 pointer-events-none`}
      >
        <Link
          href="/"
          className="pointer-events-auto absolute left-0 top-0 z-[1002] transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          <div className="bg-white border border-slate-100 border-l-0 rounded-br-xl lg:rounded-br-2xl shadow-lg px-2.5 py-2 pb-3 sm:px-3 sm:py-2.5 sm:pb-4 lg:px-4 lg:py-3 lg:pb-5">
            <Image
              src="/images/qk-logo.png"
              alt="QK Coldstores"
              width={358}
              height={179}
              className="h-[2.8rem] sm:h-[3.2rem] lg:h-[4.8rem] w-auto object-contain block"
              priority
            />
          </div>
        </Link>

        <div className="pointer-events-auto relative z-[1001] bg-white border-b border-slate-100 shadow-sm">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 lg:h-16 items-center justify-between gap-2">
            <div className="hidden lg:block w-[8.8rem] shrink-0" aria-hidden="true" />

            <div className="hidden lg:flex items-center flex-1 justify-center min-w-0">
              <DesktopNav />
            </div>

            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <Sun className="h-4 w-4 text-slate-500" />
                {mounted ? (
                  <Switch
                    aria-label="Toggle dark mode"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                ) : (
                  <div className="h-[1.15rem] w-8 rounded-full bg-slate-200" aria-hidden="true" />
                )}
                <Moon className="h-4 w-4 text-slate-500" />
              </div>
              <Button
                asChild
                className="bg-deep-navy hover:bg-black text-white font-bold px-5 py-5 text-sm rounded-xl shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Link href="/portal">Customer Portal</Link>
              </Button>
            </div>

            {!isMenuOpen && (
              <div className="lg:hidden flex items-center gap-3 ml-auto shrink-0">
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <Sun className="h-4 w-4 text-slate-500" />
                  {mounted ? (
                    <Switch
                      aria-label="Toggle dark mode"
                      checked={theme === "dark"}
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                  ) : (
                    <div className="h-[1.15rem] w-8 rounded-full bg-slate-200" aria-hidden="true" />
                  )}
                  <Moon className="h-4 w-4 text-slate-500" />
                </div>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="Open menu"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 border-slate-200 bg-white text-deep-navy shadow-sm"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden fixed inset-0 z-[1002] bg-white animate-in fade-in duration-300"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
              <Image
                src="/images/qk-logo.png"
                alt="QK Coldstores"
                width={280}
                height={140}
                className="h-16 w-auto object-contain"
              />
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <Sun className="h-4 w-4 text-slate-500" />
                  {mounted ? (
                    <Switch
                      aria-label="Toggle dark mode"
                      checked={theme === "dark"}
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                  ) : (
                    <div className="h-[1.15rem] w-8 rounded-full bg-slate-200" aria-hidden="true" />
                  )}
                  <Moon className="h-4 w-4 text-slate-500" />
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 text-deep-navy border border-slate-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto px-6 py-4">
              <MobileNav onNavigate={close} />
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 mt-auto">
              <Button
                asChild
                className="w-full h-12 rounded-xl bg-deep-navy text-white font-bold text-base shadow-lg"
              >
                <Link href="/portal" onClick={close}>Customer Portal</Link>
              </Button>
              <p className="mt-4 text-center text-slate-400 text-[10px] font-medium uppercase tracking-[0.3em]">
                QK Coldstores (Marston) Ltd
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
