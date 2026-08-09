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
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image-config"
import { EMPERICA_PORTAL_URL } from "@/lib/site-config"

type NavLink = { href: string; label: string }

type NavEntry =
  | { type: "link"; href: string; label: string }
  | { type: "group"; label: string; items: NavLink[] }
  | { type: "cta"; href: string; label: string }

const leftNavItems: NavEntry[] = [
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
]

const rightNavItems: NavEntry[] = [
  {
    type: "group",
    label: "More",
    items: [
      { href: "/faq", label: "FAQ" },
      { href: "/vacancies", label: "Vacancies" },
    ],
  },
  { type: "cta", href: "/contact", label: "Contact" },
]

const mobileNavItems: NavEntry[] = [
  ...leftNavItems,
  ...rightNavItems.filter((item) => item.type !== "cta"),
  { type: "link", href: "/contact", label: "Contact" },
]

const navTriggerClass =
  "px-3 xl:px-4 py-2 text-sm xl:text-base font-bold uppercase tracking-[0.12em] transition-colors h-auto shadow-none !bg-transparent !text-deep-navy hover:!bg-transparent hover:!text-electric-blue focus:!bg-transparent focus:!text-deep-navy focus-visible:!ring-0 data-[state=open]:!bg-transparent data-[state=open]:!text-electric-blue data-[state=open]:hover:!bg-transparent data-[state=open]:hover:!text-electric-blue data-[state=open]:focus:!bg-transparent [&_svg]:!text-current [&_svg]:!size-4"

const navLinkClass =
  "px-3 xl:px-4 py-2 text-sm xl:text-base font-bold uppercase tracking-[0.12em] transition-colors h-auto shadow-none !bg-transparent !text-deep-navy hover:!bg-transparent hover:!text-electric-blue focus:!bg-transparent focus:!text-deep-navy focus-visible:!ring-0 data-[active=true]:!bg-transparent data-[active=true]:!text-electric-blue"

function ThemeToggle({ mounted, theme, setTheme }: {
  mounted: boolean
  theme: string | undefined
  setTheme: (theme: string) => void
}) {
  return (
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
  )
}

function NavEntries({ items }: { items: NavEntry[] }) {
  return (
    <>
      {items.map((entry) => {
        if (entry.type === "link") {
          return (
            <NavigationMenuItem key={entry.href}>
              <NavigationMenuLink asChild>
                <Link href={entry.href} className={navLinkClass}>
                  {entry.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        }

        if (entry.type === "cta") {
          return (
            <NavigationMenuItem key={entry.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={entry.href}
                  className="ml-1 inline-flex items-center rounded-full border-2 border-deep-navy px-5 py-2 text-sm xl:text-base font-bold uppercase tracking-[0.12em] text-deep-navy transition-colors hover:bg-deep-navy hover:text-white"
                >
                  {entry.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        }

        return (
          <NavigationMenuItem key={entry.label}>
            <NavigationMenuTrigger className={navTriggerClass}>
              {entry.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="!bg-white !text-deep-navy border border-slate-200 shadow-xl rounded-xl overflow-hidden !top-full !mt-1 z-50">
              <ul className="grid min-w-[12rem] gap-0.5 p-2 !bg-white">
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
      })}
    </>
  )
}

function DesktopNav({ items, align }: { items: NavEntry[]; align: "left" | "right" }) {
  return (
    <NavigationMenu
      viewport={false}
      className={cn(
        "max-w-none [&_[data-slot=navigation-menu-trigger]]:!text-deep-navy [&_[data-slot=navigation-menu-trigger]]:data-[state=open]:!text-electric-blue [&_[data-slot=navigation-menu-trigger]]:!bg-transparent [&_[data-slot=navigation-menu-trigger]]:data-[state=open]:!bg-transparent [&_[data-slot=navigation-menu-link]]:!text-deep-navy [&_[data-slot=navigation-menu-link]]:hover:!text-electric-blue [&_[data-slot=navigation-menu-link]]:!bg-transparent [&_[data-slot=navigation-menu-content]]:!bg-white [&_[data-slot=navigation-menu-content]]:!text-deep-navy",
        align === "right" && "justify-end"
      )}
    >
      <NavigationMenuList className={cn("gap-1", align === "right" && "justify-end")}>
        <NavEntries items={items} />
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
      {mobileNavItems.map((entry) =>
        entry.type === "link" || entry.type === "cta" ? (
          <Link
            key={entry.href}
            href={entry.href}
            onClick={onNavigate}
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 text-sm font-bold text-deep-navy uppercase tracking-[0.16em] transition-all active:scale-95 border border-slate-100/50"
          >
            <span>{entry.label}</span>
            <ChevronRight className="h-4 w-4 text-electric-blue" />
          </Link>
        ) : (
          <Collapsible
            key={entry.label}
            open={openGroups[entry.label]}
            onOpenChange={() => toggleGroup(entry.label)}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between p-3.5 rounded-xl bg-slate-50 text-sm font-bold text-deep-navy uppercase tracking-[0.16em] border border-slate-100/50">
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
                  className="flex items-center justify-between py-2.5 text-xs font-bold text-deep-navy uppercase tracking-[0.14em] hover:text-electric-blue transition-colors"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-electric-blue/60" />
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
      <header className="fixed top-0 left-0 right-0 z-[1000] overflow-visible pointer-events-none">
        <div className="pointer-events-auto relative z-[1001] bg-white border-b border-slate-100 shadow-sm">
          {/* Mobile / tablet bar: logo + hamburger */}
          <nav className="xl:hidden container mx-auto px-4 sm:px-6 flex h-16 items-center gap-3">
            {!isMenuOpen && (
              <>
                <Link
                  href="/"
                  className="shrink-0 transition-transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Image
                    src="/images/qk-logo.webp"
                    alt="QK Cold Stores"
                    width={280}
                    height={140}
                    sizes={IMAGE_SIZES.headerLogo}
                    quality={IMAGE_QUALITY.logo}
                    priority
                    className="h-12 w-auto object-contain"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="Open menu"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-deep-navy shadow-sm"
                >
                  <Menu className="h-6 w-6" />
                </button>

                <div className="ml-auto">
                  <ThemeToggle mounted={mounted} theme={theme} setTheme={setTheme} />
                </div>
              </>
            )}
          </nav>

          {/* Desktop bar: left links | centered logo | right links */}
          <nav className="hidden xl:grid container mx-auto px-6 xl:px-8 h-24 grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="flex items-center justify-end min-w-0">
              <DesktopNav items={leftNavItems} align="right" />
            </div>

            <Link
              href="/"
              className="shrink-0 justify-self-center transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              <Image
                src="/images/qk-logo.webp"
                alt="QK Cold Stores"
                width={358}
                height={179}
                sizes={IMAGE_SIZES.headerLogo}
                quality={IMAGE_QUALITY.logo}
                priority
                className="h-[4.75rem] w-auto object-contain"
              />
            </Link>

            <div className="flex items-center justify-start gap-3 min-w-0">
              <DesktopNav items={rightNavItems} align="left" />
              <ThemeToggle mounted={mounted} theme={theme} setTheme={setTheme} />
              <Button
                asChild
                className="bg-deep-navy hover:bg-black text-white font-bold px-5 py-5 text-sm rounded-xl shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <a
                  href={EMPERICA_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Customer Portal
                </a>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="xl:hidden fixed inset-0 z-[1002] bg-white animate-in fade-in duration-300"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
              <Link href="/" onClick={close} className="shrink-0">
                <Image
                  src="/images/qk-logo.webp"
                  alt="QK Cold Stores"
                  width={280}
                  height={140}
                  sizes={IMAGE_SIZES.headerLogo}
                  quality={IMAGE_QUALITY.logo}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="h-11 w-11 flex items-center justify-center rounded-xl bg-slate-50 text-deep-navy border border-slate-200"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="ml-auto">
                <ThemeToggle mounted={mounted} theme={theme} setTheme={setTheme} />
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
                <a
                  href={EMPERICA_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                >
                  Customer Portal
                </a>
              </Button>
              <p className="mt-4 text-center text-slate-400 text-[10px] font-medium uppercase tracking-[0.3em]">
                QK Cold Stores (Marston) Ltd
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
