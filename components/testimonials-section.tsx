"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    quote: "QK Coldstores has been instrumental in scaling our frozen food distribution. Their reliable temperature control and professional team give us complete peace of mind.",
    author: "Michael Crawford",
    role: "Supply Chain Director",
    company: "Premium Foods Ltd",
    rating: 5,
  },
  {
    quote: "The Emperica stock management system provides real-time visibility that has transformed how we manage inventory. Exceptional service and communication throughout.",
    author: "Helen Foster",
    role: "Operations Manager",
    company: "Midlands Fresh Produce",
    rating: 5,
  },
  {
    quote: "We've partnered with QK for over 10 years. Their flexibility, reliability, and commitment to food safety standards make them an invaluable part of our supply chain.",
    author: "Robert Jennings",
    role: "Logistics Manager",
    company: "British Seafood Co.",
    rating: 5,
  },
  {
    quote: "The blast freezing service exceeded our expectations. Fast turnaround, quality preservation, and competitive pricing. Highly recommended for any food manufacturer.",
    author: "Anna Whitmore",
    role: "Production Director",
    company: "Gourmet Ready Meals",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-electric-blue font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-navy mt-3 mb-6 text-balance">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our clients say about partnering with QK Coldstores for their 
            cold chain logistics needs.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-deep-navy to-deep-navy/90 border-none shadow-2xl overflow-hidden">
            <CardContent className="p-8 sm:p-12 relative">
              {/* Quote icon */}
              <Quote className="absolute top-8 right-8 h-24 w-24 text-electric-blue/10" />
              
              {/* Testimonial content */}
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-electric-blue text-electric-blue" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-xl sm:text-2xl text-white font-medium mb-8 leading-relaxed text-pretty">
                  &quot;{testimonials[currentIndex].quote}&quot;
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-electric-blue/30 flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[currentIndex].author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonials[currentIndex].author}</div>
                    <div className="text-ice-blue/70 text-sm">
                      {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false)
                        setCurrentIndex(index)
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? "w-8 bg-electric-blue" 
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrevious}
                    className="border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNext}
                    className="border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
