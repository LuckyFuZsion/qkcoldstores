import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import { OPENING_HOURS_TEXT, footerServiceLinks, serviceHref } from "@/lib/services-content"
import { AccreditationMarquee } from "@/components/accreditation-marquee"

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Meet the Team", href: "/team" },
  { label: "What We Offer", href: "/services" },
  { label: "Location", href: "/location" },
  { label: "FAQ", href: "/faq" },
  { label: "Vacancies", href: "/vacancies" },
  { label: "Customer Portal", href: "/portal" },
  { label: "Contact Us", href: "/contact" },
]

const services = footerServiceLinks

export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Company Info */}
          <div className="space-y-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center transition-transform hover:scale-105 rounded-full bg-white p-4 dark:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            >
              <Image
                src="/images/qk-logo.png"
                alt="QK Coldstores"
                width={160}
                height={80}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
              Premium temperature-controlled warehousing and value-added services for the food manufacturing sector.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-black text-xl uppercase tracking-tight mb-8">Company</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-electric-blue font-bold flex items-center group transition-colors"
                  >
                    <span className="mr-2 h-0.5 w-0 bg-electric-blue transition-all group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-black text-xl uppercase tracking-tight mb-8">Services</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.label}>
                  <Link 
                    href={serviceHref(service.slug)} 
                    className="text-muted-foreground hover:text-electric-blue font-bold flex items-center group transition-colors"
                  >
                    <span className="mr-2 h-0.5 w-0 bg-electric-blue transition-all group-hover:w-4" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="font-black text-xl uppercase tracking-tight mb-8">Get in Touch</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+441400259300"
                  className="text-muted-foreground hover:text-electric-blue font-bold flex items-center group transition-colors"
                >
                  <span className="mr-2 h-0.5 w-0 bg-electric-blue transition-all group-hover:w-4" />
                  01400 259300
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@qkcoldstores.co.uk"
                  className="text-muted-foreground hover:text-electric-blue font-bold flex items-center group transition-colors"
                >
                  <span className="mr-2 h-0.5 w-0 bg-electric-blue transition-all group-hover:w-4" />
                  info@qkcoldstores.co.uk
                </a>
              </li>
            </ul>

            <div>
              <h3 className="font-black text-xl uppercase tracking-tight mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-electric-blue" />
                Opening Hours
              </h3>
              <ul className="space-y-2 text-muted-foreground font-bold text-sm">
                <li>{OPENING_HOURS_TEXT.operational}</li>
                <li>{OPENING_HOURS_TEXT.operationalNote}</li>
                <li>{OPENING_HOURS_TEXT.office}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <AccreditationMarquee
        className="bg-white border-t border-border py-6 md:py-8"
        logoClassName="h-12 md:h-16"
      />

      {/* Bottom Bar */}
      <div className="bg-card border-t border-border py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <Link href="/privacy" className="hover:text-deep-navy transition-colors">Privacy Policy</Link>
              <Link href="/cookies" className="hover:text-deep-navy transition-colors">Cookie Policy</Link>
            </div>
            <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">
              &copy; {new Date().getFullYear()} QK Coldstores (Marston) Ltd.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
