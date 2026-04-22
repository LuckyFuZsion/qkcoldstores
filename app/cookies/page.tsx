import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Cookie, Database, Eye, Clock, Shield, Settings } from "lucide-react"

export const metadata = {
  title: "Cookie Policy | QK Coldstores",
  description: "Learn about how QK Coldstores uses cookies and similar technologies on our website.",
}

export default function CookiePolicyPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-deep-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
              Cookie Policy
            </h1>
            <p className="text-xl text-ice-blue/80">
              QK Cold Stores (Marston) Ltd. - How we use cookies and similar technologies
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Cookies are small files containing specific information that may be placed on your device 
                when you use a website. Cookies help us to remember your preferences and to tailor our 
                digital content according to your interests.
              </p>
            </div>

            {/* Cookie Types Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-16">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center mb-4">
                  <Cookie className="h-6 w-6 text-electric-blue" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">First Party Cookies</h3>
                <p className="text-muted-foreground">
                  These are cookies that are set and read by our own website. They store information 
                  such as your preferences, usage and login credentials.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-electric-blue" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">Third Party Cookies</h3>
                <p className="text-muted-foreground">
                  Cookies set by another domain which are read by the code on our website. These cookies 
                  track your internet use across a number of sites and can be used to profile you for 
                  advertising networks.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-electric-blue" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">Session Cookies</h3>
                <p className="text-muted-foreground">
                  These are cookies which are only related to a single session (a single visit to our website) 
                  and are automatically deleted when you close your web browser – these are typically 
                  considered as necessary for our website to function.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-electric-blue" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">Persistent Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies remain on your device after you&apos;ve finished your session. Other cookies 
                  (such as tracking cookies or authentication cookies) are often saved for an extended 
                  period of time from days to years.
                </p>
              </div>
            </div>

            {/* Local Storage Section */}
            <div className="bg-secondary/30 rounded-xl p-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-deep-navy flex items-center justify-center flex-shrink-0">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-foreground mb-3">Local Storage</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    This is a small database within your browser that websites can use to store limited 
                    amounts of information. Local storage is used by web applications to store persistent 
                    and offline data, as well as authentication tokens between site visits.
                  </p>
                </div>
              </div>
            </div>

            {/* Cookies on Our Site */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Cookies and Local Storage on Our Site</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We use a range of technologies on our website <strong>www.qkcoldstores.co.uk</strong>, some of 
                which are controlled by us (first party) and some are controlled by other organisations 
                (third party). These technologies include (but are not limited to) cookies, scripts, fonts 
                and images; some of which are considered as necessary for us to be able to deliver the 
                website to you and others which we use to enhance our understanding of how you use our site.
              </p>
            </div>

            {/* Cookie Categories Table */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Cookie Categories</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Category</th>
                      <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Purpose</th>
                      <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border px-4 py-3 text-foreground font-medium">Necessary</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">Essential for website functionality, security, and user sessions</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">First Party</td>
                    </tr>
                    <tr className="bg-secondary/20">
                      <td className="border border-border px-4 py-3 text-foreground font-medium">Functional</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">Remember preferences and settings to enhance user experience</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">First Party</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-3 text-foreground font-medium">Analytics</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">Help us understand how visitors interact with our website</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">Third Party</td>
                    </tr>
                    <tr className="bg-secondary/20">
                      <td className="border border-border px-4 py-3 text-foreground font-medium">Marketing</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">Used to deliver relevant advertisements and track campaigns</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">Third Party</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="bg-card border border-border rounded-xl p-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                  <Settings className="h-6 w-6 text-electric-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-foreground mb-3">Managing Your Cookie Preferences</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You can control and manage cookies in various ways. Please keep in mind that removing 
                    or blocking cookies can negatively impact your user experience and parts of our website 
                    may no longer be fully accessible.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Most browsers automatically accept cookies, but you can choose whether or not to accept 
                    cookies through your browser controls, often found in your browser&apos;s &quot;Tools&quot; or 
                    &quot;Preferences&quot; menu. For more information on how to modify your browser settings or how 
                    to block, manage or filter cookies, please refer to your browser&apos;s help file or visit{" "}
                    <a 
                      href="https://www.aboutcookies.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-electric-blue hover:underline"
                    >
                      www.aboutcookies.org
                    </a>.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-deep-navy rounded-xl p-8 text-white">
              <h3 className="font-bold text-xl mb-4">Questions About Our Cookie Policy?</h3>
              <p className="text-ice-blue/80 mb-6">
                If you have any questions about our use of cookies or other technologies, please contact us.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="mailto:info@qkcoldstores.co.uk"
                  className="inline-flex items-center gap-2 bg-electric-blue hover:bg-electric-blue/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Email Us
                </a>
                <a 
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Contact Page
                </a>
              </div>
            </div>

            {/* Last Updated */}
            <p className="text-sm text-muted-foreground mt-8 text-center">
              This cookie policy was last updated in April 2026.
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
