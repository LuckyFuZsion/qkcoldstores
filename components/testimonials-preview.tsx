"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight, MessageSquare } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    quote: "Easy access from the A1, very pleasant and helpful security and staff on arrival. Large yard area with loading docking facilities and good turnaround times. If only every delivery point was this good!",
    author: "Garry Wainwright",
    company: "HGV Logistics",
  },
  {
    quote: "Warehouse lads had my 40ft container loaded and sealed in under 20 minutes. Absolutely rapid service and friendly people in the office. A great place to work with.",
    author: "Jon Robinson",
    company: "Container Transport",
  },
  {
    quote: "Decent turnaround on both loading and unloading. You always get pleasantly spoken to and nothing seems to become a problem. Highly professional team.",
    author: "Pav Vigi Logistics Ltd",
    company: "Logistics Partner",
  },
  {
    quote: "Quick and efficient service, straight on the bay and loaded quickly. Security gate staff are very friendly and helpful. One of the better sites we visit.",
    author: "Lord Neil Kuhl",
    company: "Supply Chain Solutions",
  },
  {
    quote: "Never there more than half an hour, even if being fully loaded. Can't fault them at all. Consistent and reliable every time.",
    author: "Stretch",
    company: "Independent Haulage",
  },
]

export function TestimonialsPreview() {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 text-electric-blue text-xs font-black uppercase tracking-widest mb-6">
            <MessageSquare className="w-4 h-4" />
            Testimonials
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-deep-navy mt-3 mb-6 tracking-tight leading-none">
            Trusted by <br />
            <span className="text-electric-blue">Industry Leaders</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            See what drivers and logistics partners say about their experience 
            at our Grantham facility.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-12 mb-20"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6 flex">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.author} className="pl-6 md:basis-1/2 lg:basis-1/3 flex">
                  <Card className="border-slate-100 flex flex-col w-full transition-all duration-500 hover:shadow-2xl hover:border-electric-blue/30 rounded-[2.5rem] bg-slate-50/50">
                    <CardContent className="p-10 flex flex-col h-full">
                      {/* Stars section */}
                      <div className="flex gap-1 mb-8 shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-electric-blue text-electric-blue" />
                        ))}
                      </div>
                      
                      {/* Quote section */}
                      <div className="flex-grow flex flex-col justify-center mb-10">
                        <blockquote className="text-deep-navy text-lg font-bold leading-relaxed text-pretty italic">
                          &quot;{testimonial.quote}&quot;
                        </blockquote>
                      </div>
                      
                      {/* Author section */}
                      <div className="flex items-center gap-4 pt-8 border-t border-slate-200 shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-deep-navy flex items-center justify-center text-white font-black text-xl shrink-0 shadow-lg">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-deep-navy text-lg truncate uppercase tracking-tight">{testimonial.author}</div>
                          <div className="text-electric-blue text-xs font-black uppercase tracking-widest truncate">
                            {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12 w-12 h-12 rounded-2xl border-2 border-slate-100 bg-white text-deep-navy hover:bg-deep-navy hover:text-white transition-all shadow-xl" />
            <CarouselNext className="-right-12 w-12 h-12 rounded-2xl border-2 border-slate-100 bg-white text-deep-navy hover:bg-deep-navy hover:text-white transition-all shadow-xl" />
          </Carousel>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <Button asChild size="lg" className="bg-deep-navy text-white hover:bg-black font-bold px-10 py-8 rounded-2xl shadow-2xl transition-all hover:-translate-y-1">
            <Link href="/testimonials">
              Read All Reviews
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
