import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, MessageSquare, ShieldCheck, Zap, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Testimonials | QK Coldstores",
  description: "Read what our clients and logistics partners say about QK Coldstores. Trusted for rapid turnaround and professional service in Grantham.",
}

const testimonials = [
  {
    name: "Garry Wainwright",
    role: "Local Guide",
    company: "HGV Logistics",
    content: "Please note this review is from a delivery / collection point of view 'HGV'. Easy access from the A1, very pleasant and helpful security and staff on arrival. Large yard area with loading docking facilities. Good turnaround times, if only every delivery point was this good! 10 out of 10.",
    rating: 5,
    size: "large",
    color: "navy"
  },
  {
    name: "Jon Robinson",
    role: "HGV Driver",
    company: "Jon Robinson Logistics",
    content: "Turned up late due to a series of accidents on route, goods in office were understanding friendly people. Warehouse lads had my 40ft container loaded and sealed in under 20 minutes, absolutely rapid good place.",
    rating: 5,
    size: "medium",
    color: "blue"
  },
  {
    name: "Pav Vigi Logistics Ltd",
    role: "Logistics Partner",
    company: "Pav Vigi Logistics",
    content: "Decent turnaround on both loading or unloading. You get always pleasantly spoken to and nothing seems to become a problem. Highly professional and efficient service.",
    rating: 5,
    size: "small",
    color: "white"
  },
  {
    name: "Stretch",
    role: "Local Guide",
    company: "Haulage Services",
    content: "Never there more than half an hour, even if being fully loaded. Can't fault them. Efficient, reliable, and always consistent with their turnaround times.",
    rating: 5,
    size: "medium",
    color: "white"
  },
  {
    name: "Lord Neil Kuhl",
    role: "Local Guide",
    company: "Logistics Solutions",
    content: "Quick and efficient service, straight on bay and loaded quickly. Security gate very friendly and helpful. A well-managed facility that understands the needs of drivers.",
    rating: 5,
    size: "large",
    color: "blue"
  },
  {
    name: "gary james",
    role: "Local Guide",
    company: "James Transport",
    content: "Easy place to find and get to, security guys are great, never been there more than an hour. One of the best sites in the East Midlands for quick turnarounds.",
    rating: 5,
    size: "small",
    color: "navy"
  },
  {
    name: "Damien McClarey",
    role: "Local Guide",
    company: "McClarey Logistics",
    content: "Great place to tip, was fairly busy when I got there but got tipped quite quickly. The staff manage the yard flow very well even during peak times.",
    rating: 5,
    size: "medium",
    color: "white"
  },
  {
    name: "Patrickmc1",
    role: "Local Guide",
    company: "Patrick Haulage",
    content: "Staff friendly, canteen and toilets available with microwave and kettles and vending machines. Usually takes 30 mins to tip once on a bay. Easy access from the A1.",
    rating: 5,
    size: "small",
    color: "blue"
  },
]

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      {/* Modern Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-deep-navy">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-ice-blue rounded-full blur-[120px] -ml-64 -mb-64" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-ice-blue text-sm font-medium mb-6 animate-fade-in">
              <MessageSquare className="w-4 h-4" />
              <span>Real Feedback from the Road</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              What the Industry <span className="text-electric-blue text-glow">Says About Us</span>
            </h1>
            <p className="text-xl text-ice-blue/80 leading-relaxed max-w-2xl mx-auto text-pretty">
              From independent drivers to national fleet managers, we've built our reputation on 
              speed, safety, and professional service.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Stats Grid */}
      <section className="relative z-20 -mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: ShieldCheck, label: "BRC Accredited", sub: "Safety First" },
              { icon: Zap, label: "20 Min Loading", sub: "Rapid Turnaround" },
              { icon: Award, label: "4.8/5 Rating", sub: "Google Verified" },
              { icon: MessageSquare, label: "500+ Reviews", sub: "Trusted Partner" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-4 group hover:border-electric-blue/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-ice-blue/20 flex items-center justify-center text-deep-navy group-hover:bg-electric-blue group-hover:text-white transition-colors">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-deep-navy text-lg">{stat.label}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry-style Testimonial Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {testimonials.map((t, i) => (
              <div key={i} className="break-inside-avoid animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <Card className={`
                  relative overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
                  ${t.color === 'navy' ? 'bg-deep-navy text-white border-none' : 
                    t.color === 'blue' ? 'bg-electric-blue text-white border-none' : 
                    'bg-white text-deep-navy border-slate-100 shadow-lg'}
                `}>
                  <CardContent className="p-8">
                    <Quote className={`w-12 h-12 mb-6 opacity-20 ${t.color === 'white' ? 'text-electric-blue' : 'text-white'}`} />
                    
                    <div className="flex gap-1 mb-6">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 fill-current ${t.color === 'white' ? 'text-electric-blue' : 'text-ice-blue'}`} />
                      ))}
                    </div>

                    <blockquote className={`
                      leading-relaxed mb-8 text-pretty
                      ${t.size === 'large' ? 'text-xl font-medium' : 'text-base'}
                    `}>
                      &quot;{t.content}&quot;
                    </blockquote>

                    <div className={`flex items-center gap-4 pt-6 border-t ${t.color === 'white' ? 'border-slate-100' : 'border-white/10'}`}>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0
                        ${t.color === 'white' ? 'bg-deep-navy text-white' : 'bg-white/20 text-white'}
                      `}>
                        {t.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold truncate">{t.name}</div>
                        <div className={`text-xs uppercase tracking-widest opacity-70 truncate`}>
                          {t.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}

            {/* Decorative Blurb Card */}
            <div className="break-inside-avoid">
              <div className="bg-ice-blue/10 rounded-[2.5rem] p-10 border-2 border-dashed border-ice-blue/30 text-center">
                <h3 className="text-2xl font-bold text-deep-navy mb-4">The QK Standard</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We don't just store pallets; we manage time. Every review here reflects our 
                  commitment to getting drivers back on the road in record time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-deep-navy mb-6">
              Ready to experience <br />
              <span className="text-electric-blue">the rapid turnaround?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Join hundreds of satisfied logistics partners. Contact our commercial team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-deep-navy text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg hover:shadow-deep-navy/20"
              >
                Book Storage Space
              </a>
              <a
                href="tel:+441234567890"
                className="px-8 py-4 bg-white text-deep-navy border-2 border-deep-navy font-bold rounded-2xl hover:bg-slate-50 transition-all"
              >
                Call Commercial Team
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
