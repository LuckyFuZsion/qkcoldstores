"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Star, CheckCircle, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

const features = [
  "Fully insured service",
  "UK-wide coverage",
  "500+ followers trust us",
]

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container relative mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div 
            className={`max-w-xl transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              House Removals{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Made Simple</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Professional removals, transport, and waste clearance in Grantham. 
              Get a free quote in minutes - no obligation, no hassle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="lg" className="h-14 px-8 text-base group" asChild>
                <a href="https://www.facebook.com/profile.php?id=61565363504277" target="_blank" rel="noopener noreferrer">
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base border-border hover:bg-card" asChild>
                <a href="tel:07312261976" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  07312 261 976
                </a>
              </Button>
            </div>
            
            <ul className="flex flex-col sm:flex-row flex-wrap gap-4">
              {features.map((feature, index) => (
                <li 
                  key={feature} 
                  className={`flex items-center gap-2 text-muted-foreground transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }}
                >
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div 
            className={`relative lg:justify-self-end transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <Image
                src="/images/logo.png"
                alt="RR Driver Services Van"
                width={500}
                height={400}
                className="relative w-full max-w-md mx-auto drop-shadow-2xl"
                style={{ height: "auto" }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
