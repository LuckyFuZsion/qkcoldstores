"use client"

import { CheckCircle2, Award, Users, Clock, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stats = [
  { icon: Clock, value: "30+", label: "Years Experience" },
  { icon: Users, value: "40+", label: "Active Customers" },
  { icon: Award, value: "30K+", label: "Pallet Capacity" },
]

export function AboutSection() {
  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-card">
              <img
                src="/images/qk-coldstores-4.webp"
                alt="Industrial Cold Storage Racking"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
            </div>
            
            {/* Floating stats card */}
            <div className="absolute -bottom-10 -right-10 bg-card rounded-[2rem] shadow-2xl p-10 hidden sm:block border border-border">
              <div className="flex items-center gap-10">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="h-8 w-8 text-electric-blue mx-auto mb-4" />
                    <div className="text-3xl font-black text-foreground mb-1">{stat.value}</div>
                    <div className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block">About QK Cold Stores</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tight leading-[1.1]">
              Providers of <br />
              <span className="text-electric-blue">Temperature-Controlled Storage</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
              Providers of temperature-controlled storage services for an ever-growing food industry, with over 30 years of experience.
            </p>
            
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Our facility is strategically located on the outskirts of Grantham, in Lincolnshire. We offer a comprehensive range of services, including but not limited to storage, blast freezing and tempering, as well as fresh packing and order picking.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {[
                "BRCGS Accredited Storage and Distribution",
                "Organic Certified",
                "Red Tractor Approved",
                "BRCGS Food Safety"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-electric-blue" />
                  </div>
                  <span className="text-foreground font-bold text-sm uppercase tracking-tight">{item}</span>
                </div>
              ))}
            </div>

            <Button asChild size="lg" className="bg-deep-navy text-white hover:bg-black font-bold px-8 py-7 rounded-2xl shadow-xl">
              <Link href="/about">
                Read Our Story <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
