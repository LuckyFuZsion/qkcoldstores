import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Database, Eye, Lock, UserCheck, FileText, Mail, Clock } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | QK Coldstores",
  description: "Privacy policy for QK Cold Stores (Marston) Ltd. Learn how we collect, use, and protect your personal data.",
}

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-deep-navy via-deep-navy/95 to-deep-navy/90">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-electric-blue/20 mb-6">
              <Shield className="h-8 w-8 text-electric-blue" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
              Privacy Policy
            </h1>
            <p className="text-xl text-ice-blue/80">
              QK Cold Stores (Marston) Ltd.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-muted-foreground leading-relaxed">
                This is the website of QK Cold Stores (Marston) Ltd. (&apos;we&apos;, &apos;us&apos;, &apos;our&apos;, &apos;QK Cold Stores (Marston)&apos;). 
                This policy discloses our information gathering and dissemination practices relating to this website. 
                In order to fully understand your rights, we encourage you to read this in full.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We are not responsible for the content or privacy practices of other websites. We reserve the right 
                to modify this privacy policy at any time. Each time you use this website you shall be bound by the 
                then current privacy policy and accordingly you should review the privacy policy each time you use this website.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This policy governs the online processing activities of this website. For offline processing of personal data, 
                please request a copy of our data protection policy using the contact details below.
              </p>
            </div>

            {/* Key Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center">
                      <Database className="h-6 w-6 text-electric-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">About Us</h3>
                      <p className="text-sm text-muted-foreground">
                        We are QK Cold Stores (Marston). We are a company specialising in cold storage and distribution.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center">
                      <UserCheck className="h-6 w-6 text-electric-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Data Controller</h3>
                      <p className="text-sm text-muted-foreground">
                        QK Cold Stores (Marston) Ltd. is the controller of the personal data it processes. 
                        Contact details are available on our contact page.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Protection Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="h-6 w-6 text-electric-blue" />
                <h2 className="text-2xl font-bold text-foreground">Data Protection</h2>
              </div>
              <div className="bg-secondary/30 rounded-xl p-6 border border-border/50">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We take our responsibility to protect your data seriously and will not collect any personal information 
                  about you on this website without your clear knowledge and permission.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Any personal information which you volunteer to us will be treated strictly in accordance with Data Protection law. 
                  Where data is submitted it will be used for the stated purpose and any reasonably incidental purposes only.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell or distribute your personal information to third parties for purposes of allowing them to market 
                  products and services to you. Communicating via the internet and sending information to you by other means 
                  necessarily involves your personal information passing through or being handled by third-parties.
                </p>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="h-6 w-6 text-electric-blue" />
                <h2 className="text-2xl font-bold text-foreground">The Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">Statistical Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      For general web-browsing certain statistical information is automatically logged and may be processed 
                      by us in order to obtain statistical information relating to patterns of use. This information is not 
                      linked to identifiable individuals.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">Contact Form Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Where you submit an enquiry via our contact form we require you to submit personal data such as your name 
                      and email address. We use this information to respond to and process your enquiry.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">Email Communications</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      In the event that you choose to contact us through email, we may retain information in order to adequately 
                      respond to your queries.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-electric-blue" />
                <h2 className="text-2xl font-bold text-foreground">How We Use Your Information</h2>
              </div>
              <div className="bg-secondary/30 rounded-xl p-6 border border-border/50">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect from you to provide and improve our services to you. 
                  The purposes for which we may use your information include:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-electric-blue mt-2"></span>
                    <span>To respond to enquiries submitted via our contact form or email</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-electric-blue mt-2"></span>
                    <span>To provide you with information about our services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-electric-blue mt-2"></span>
                    <span>To improve the content and functionality of our website</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-electric-blue mt-2"></span>
                    <span>To comply with legal obligations</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="h-6 w-6 text-electric-blue" />
                <h2 className="text-2xl font-bold text-foreground">Your Rights</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Under data protection law, you have rights including:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Right of Access", desc: "You have the right to ask us for copies of your personal information." },
                  { title: "Right to Rectification", desc: "You have the right to ask us to correct information you think is inaccurate." },
                  { title: "Right to Erasure", desc: "You have the right to ask us to erase your personal information in certain circumstances." },
                  { title: "Right to Restriction", desc: "You have the right to ask us to restrict the processing of your information." },
                  { title: "Right to Object", desc: "You have the right to object to the processing of your personal data." },
                  { title: "Right to Portability", desc: "You have the right to ask that we transfer the information you gave us to another organisation." },
                ].map((right, index) => (
                  <div key={index} className="bg-card rounded-lg p-4 border border-border/50">
                    <h4 className="font-medium text-foreground mb-1">{right.title}</h4>
                    <p className="text-sm text-muted-foreground">{right.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-6 w-6 text-electric-blue" />
                <h2 className="text-2xl font-bold text-foreground">Data Retention</h2>
              </div>
              <div className="bg-secondary/30 rounded-xl p-6 border border-border/50">
                <p className="text-muted-foreground leading-relaxed">
                  We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, 
                  including for the purposes of satisfying any legal, accounting, or reporting requirements. To determine the 
                  appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, 
                  the potential risk of harm from unauthorised use or disclosure of your personal data, the purposes for which we 
                  process your personal data and whether we can achieve those purposes through other means, and the applicable legal requirements.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="h-6 w-6 text-electric-blue" />
                <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
              </div>
              <Card className="border-border/50 bg-deep-navy text-white">
                <CardContent className="p-6">
                  <p className="leading-relaxed mb-4">
                    If you have any questions about this privacy policy or our data practices, please contact us:
                  </p>
                  <div className="space-y-2 text-ice-blue/90">
                    <p><strong className="text-white">QK Cold Stores (Marston) Ltd.</strong></p>
                    <p>Gonerby Road, Marston</p>
                    <p>Grantham, Lincolnshire NG32 2HT</p>
                    <p className="mt-4">
                      <a href="mailto:info@qkcoldstores.co.uk" className="text-electric-blue hover:underline">
                        info@qkcoldstores.co.uk
                      </a>
                    </p>
                    <p>
                      <a href="tel:+441onal476577117" className="text-electric-blue hover:underline">
                        01476 577117
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ICO Notice */}
            <div className="text-center text-sm text-muted-foreground border-t border-border/50 pt-8">
              <p>
                If you are not satisfied with our response to any complaint or believe our processing of your information 
                does not comply with data protection law, you can make a complaint to the Information Commissioner&apos;s Office (ICO).
              </p>
              <p className="mt-2">
                <a 
                  href="https://ico.org.uk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-electric-blue hover:underline"
                >
                  www.ico.org.uk
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
