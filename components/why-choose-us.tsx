"use client"

import { ShieldCheck, Snowflake, Clock, Award, CheckCircle2, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  {
    icon: Snowflake,
    title: "Blast Freezing",
    description: "Rapid temperature reduction to lock in product freshness and extend shelf life.",
  },
  {
    icon: ShieldCheck,
    title: "Up-Tempering",
    description: "Controlled tempering facilities to safely bring products to required temperatures.",
  },
  {
    icon: Clock,
    title: "24/7 Operations",
    description: "Round-the-clock access and monitoring to meet the food sector's demands.",
  },
  {
    icon: Award,
    title: "BRC Accredited",
    description: "Upholding the highest operational standards with AA standard accreditation.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Choice Partner</span>
            <h2 className="text-4xl md:text-6xl font-black text-deep-navy mb-8 tracking-tight leading-[1.1]">
              Cold Storage for the <br />
              <span className="text-electric-blue">Food Manufacturing Sector</span>
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed font-medium">
              For over 25 years, we have been a trusted leader in temperature-controlled 
              storage solutions across the East Midlands. We help our food partners 
              not only fulfil their storage needs but also alleviate complexity in the cold chain.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "BRC and Soil Association certified facilities",
                "Members of the British Frozen Food Federation",
                "Advanced Empirica stock management system",
                "Strategically located adjacent to the A1"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-deep-navy font-bold">
                  <CheckCircle2 className="w-6 h-6 text-electric-blue shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="bg-deep-navy text-white hover:bg-black font-bold px-8 py-7 rounded-2xl shadow-xl">
              <Link href="/contact">Make an Enquiry</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
              <img 
                src="/portrait.png" 
                alt="Temperature Controlled Cold Store Facility" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Stat */}
            <div className="absolute -bottom-10 -left-10 bg-electric-blue p-8 rounded-[2rem] shadow-2xl text-white max-w-[200px]">
              <div className="text-4xl font-black mb-1">30K+</div>
              <div className="text-sm font-bold uppercase tracking-wider opacity-80 leading-tight">Pallet Positions Available</div>
            </div>
          </motion.div>
        </div>

        {/* Integrated Services Grid */}
        <div className="pt-24 border-t border-slate-100">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-black text-deep-navy mb-6 tracking-tight">Integrated Cold Chain Services</h3>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              We provide a complete solution for your temperature-sensitive products, 
              helping you shorten your cold chain and reduce risk.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-electric-blue/30 hover:bg-white hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-deep-navy group-hover:bg-electric-blue group-hover:text-white transition-all duration-300 shadow-sm mb-6">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-black text-deep-navy mb-4 tracking-tight uppercase group-hover:text-electric-blue transition-colors">{feature.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">{feature.description}</p>
                <Link href="/services" className="inline-flex items-center gap-2 text-electric-blue font-bold text-sm group-hover:gap-3 transition-all">
                  LEARN MORE <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
