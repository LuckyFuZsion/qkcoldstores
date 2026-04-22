import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, ExternalLink, Lock, FileText, BarChart3 } from "lucide-react"

export function ClientPortalSection() {
  return (
    <section className="py-24 bg-deep-navy relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-electric-blue rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ice-blue rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-electric-blue/20 border border-electric-blue/30 rounded-full px-4 py-2 mb-6">
              <Shield className="h-4 w-4 text-electric-blue" />
              <span className="text-electric-blue text-sm font-medium">Secure Client Access</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
              Emperica Stock Management Portal
            </h2>
            
            <p className="text-ice-blue/80 text-lg mb-8 text-pretty">
              Access real-time inventory data, track shipments, and manage your stock 
              with our secure Emperica integration. Available 24/7 with enterprise-grade security.
            </p>

            {/* Features list */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                { icon: BarChart3, text: "Real-time stock levels" },
                { icon: FileText, text: "Order history & reports" },
                { icon: Lock, text: "Secure SSL encryption" },
                { icon: ExternalLink, text: "24/7 system access" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-white/90">
                  <div className="w-10 h-10 rounded-lg bg-electric-blue/20 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-electric-blue" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="relative inline-block group">
              <Button
                asChild
                size="lg"
                className="bg-electric-blue hover:bg-electric-blue/90 text-white font-semibold text-lg px-8 py-6 shadow-xl shadow-electric-blue/25"
              >
                <a 
                  href="https://emperica.example.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Lock className="h-5 w-5" />
                  Access Emperica Stock System
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              {/* Tooltip */}
              <div className="absolute -bottom-8 left-0 text-ice-blue/60 text-sm flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Redirecting to secure external portal
              </div>
            </div>
          </div>

          {/* Visual card */}
          <div className="relative">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
              <CardContent className="p-8">
                {/* Mock dashboard preview */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-electric-blue/30 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-electric-blue" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Emperica Portal</div>
                        <div className="text-ice-blue/60 text-sm">Secure Connection</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Online
                    </div>
                  </div>

                  {/* Mock stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Active Pallets", value: "12,847" },
                      { label: "Orders Today", value: "156" },
                      { label: "Temp Status", value: "Normal" },
                      { label: "Alerts", value: "0" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/5 rounded-lg p-4">
                        <div className="text-ice-blue/60 text-sm">{stat.label}</div>
                        <div className="text-white text-xl font-bold">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Login prompt */}
                  <div className="bg-electric-blue/10 border border-electric-blue/30 rounded-lg p-4 text-center">
                    <Lock className="h-8 w-8 text-electric-blue mx-auto mb-2" />
                    <div className="text-white font-medium">Login Required</div>
                    <div className="text-ice-blue/60 text-sm">Enter your credentials to access the full dashboard</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-electric-blue/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-ice-blue/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
