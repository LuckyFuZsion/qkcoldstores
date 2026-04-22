"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight } from "lucide-react"
import Link from "next/link"
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
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-electric-blue font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-navy mt-3 mb-6 text-balance">
            Trusted by Logistics Professionals
          </h2>
          <p className="text-muted-foreground text-lg">
            See what drivers and logistics partners say about their experience 
            at our Grantham facility.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-5xl mx-auto px-12 mb-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 flex">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.author} className="pl-4 md:basis-1/2 lg:basis-1/3 flex">
                  <Card className="border-border/50 flex flex-col w-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Stars section */}
                      <div className="flex gap-1 mb-4 shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-electric-blue text-electric-blue" />
                        ))}
                      </div>
                      
                      {/* Quote section */}
                      <div className="flex-grow flex flex-col justify-center mb-6">
                        <blockquote className="text-foreground text-sm leading-relaxed text-pretty italic">
                          &quot;{testimonial.quote}&quot;
                        </blockquote>
                      </div>
                      
                      {/* Author section */}
                      <div className="flex items-center gap-3 pt-4 border-t border-border/50 shrink-0">
                        <div className="w-10 h-10 rounded-full bg-deep-navy flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-foreground text-sm truncate">{testimonial.author}</div>
                          <div className="text-muted-foreground text-[10px] uppercase tracking-wider truncate">
                            {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12" />
            <CarouselNext className="-right-12" />
          </Carousel>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="border-deep-navy text-deep-navy hover:bg-deep-navy hover:text-white">
            <Link href="/testimonials">
              Read More Reviews
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
