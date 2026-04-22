import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Facebook, Linkedin, Twitter } from "lucide-react"

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Meet the Team", href: "/team" },
  { label: "What We Offer", href: "/services" },
  { label: "Location", href: "/location" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Customer Portal", href: "/portal" },
]

const services = [
  "Bulk Cold Storage",
  "Blast Freezing",
  "Distribution",
  "Inventory Management",
  "Cross-Docking",
  "Order Fulfilment",
]

export function Footer() {
  return (
    <footer className="bg-deep-navy text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/images/qk-logo.png"
                alt="QK Coldstores"
                width={140}
                height={70}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-ice-blue/70 mb-6">
              Grantham&apos;s premier temperature-controlled warehousing and 
              logistics provider. Trusted by businesses across the East Midlands.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-electric-blue transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-electric-blue transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-electric-blue transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-ice-blue/70 hover:text-electric-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link 
                    href="/services" 
                    className="text-ice-blue/70 hover:text-electric-blue transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-electric-blue flex-shrink-0 mt-0.5" />
                <span className="text-ice-blue/70">
                  QK Cold Stores (Marston) Ltd<br />
                  2 Toll Bar Road<br />
                  Marston, Grantham<br />
                  NG32 2HT
                </span>
              </li>
              <li>
                <a href="tel:+441234567890" className="flex items-center gap-3 text-ice-blue/70 hover:text-electric-blue transition-colors">
                  <Phone className="h-5 w-5 text-electric-blue" />
                  01234 567 890
                </a>
              </li>
              <li>
                <a href="mailto:info@qkcoldstores.co.uk" className="flex items-center gap-3 text-ice-blue/70 hover:text-electric-blue transition-colors">
                  <Mail className="h-5 w-5 text-electric-blue" />
                  info@qkcoldstores.co.uk
                </a>
              </li>
              <li className="flex items-center gap-3 text-ice-blue/70">
                <Clock className="h-5 w-5 text-electric-blue" />
                24/7 Operations
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Area Coverage - SEO Section */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h4 className="font-semibold text-sm mb-3 text-ice-blue/80">Areas We Serve</h4>
          <p className="text-ice-blue/60 text-sm leading-relaxed">
            Providing cold storage and logistics services across <strong className="text-ice-blue/80">Grantham</strong>, <strong className="text-ice-blue/80">Marston</strong>, 
            Newark, Sleaford, Stamford, Melton Mowbray, Bourne, and the wider <strong className="text-ice-blue/80">East Midlands</strong> region 
            including Lincolnshire, Nottinghamshire, Leicestershire, and Rutland. Nationwide distribution available.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-ice-blue/60">
            <p>&copy; {new Date().getFullYear()} QK Coldstores. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-electric-blue transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-electric-blue transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-electric-blue transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
