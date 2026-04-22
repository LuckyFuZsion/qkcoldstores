import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Facebook, Linkedin, Twitter, ArrowUpRight } from "lucide-react"

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Meet the Team", href: "/team" },
  { label: "What We Offer", href: "/services" },
  { label: "Location", href: "/location" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
]

const services = [
  "Bulk Cold Storage",
  "Blast Freezing",
  "Up-Tempering",
  "Integrated Logistics",
  "Export & Import",
  "Inventory Management",
]

export function Footer() {
  return (
    <footer className="bg-white text-deep-navy border-t border-slate-100">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Company Info */}
          <div className="space-y-8">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <Image
                src="/images/qk-logo.png"
                alt="QK Coldstores"
                width={160}
                height={80}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Premium temperature-controlled warehousing and value-added services for the food manufacturing sector.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Twitter, label: "Twitter" },
              ].map((social) => (
                <a 
                  key={social.label}
                  href="#" 
                  className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-deep-navy hover:bg-electric-blue hover:text-white transition-all duration-300 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-black text-xl uppercase tracking-tight mb-8">Company</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-slate-500 hover:text-electric-blue font-bold flex items-center group transition-colors"
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
                <li key={service}>
                  <Link 
                    href="/services" 
                    className="text-slate-500 hover:text-electric-blue font-bold flex items-center group transition-colors"
                  >
                    <span className="mr-2 h-0.5 w-0 bg-electric-blue transition-all group-hover:w-4" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="font-black text-xl uppercase tracking-tight mb-8">Get in Touch</h3>
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
              <a href="tel:+441234567890" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-electric-blue shadow-sm group-hover:bg-electric-blue group-hover:text-white transition-all">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="font-black text-lg">01246 854999</span>
              </a>
              <a href="mailto:info@qkcoldstores.co.uk" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-electric-blue shadow-sm group-hover:bg-electric-blue group-hover:text-white transition-all">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="font-bold text-slate-600 break-all">enquiries@qkcoldstores.co.uk</span>
              </a>
              <div className="pt-4 border-t border-slate-200">
                <Link href="/location" className="flex items-center justify-between font-black text-sm uppercase tracking-widest text-electric-blue hover:gap-2 transition-all">
                  View Our Sites <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-50 border-t border-slate-100 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold uppercase tracking-widest text-slate-400">
              <Link href="/privacy" className="hover:text-deep-navy transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-deep-navy transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-deep-navy transition-colors">Cookie Policy</Link>
            </div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
              &copy; {new Date().getFullYear()} QK Coldstores (Marston) Ltd.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
