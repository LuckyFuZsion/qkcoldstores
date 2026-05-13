"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

type PageHeroProps = {
  title: ReactNode
  subtitle?: ReactNode
  eyebrow?: ReactNode
  backgroundImage?: string
  bgOpacityClass?: string
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  backgroundImage = "/landscape.png",
  bgOpacityClass = "opacity-30",
}: PageHeroProps) {
  return (
    <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden bg-deep-navy">
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none ${bgOpacityClass}`}
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-deep-navy/90 via-deep-navy/80 to-deep-navy/70 pointer-events-none" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
        {eyebrow ? (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block"
          >
            {eyebrow}
          </motion.span>
        ) : null}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]"
        >
          {title}
        </motion.h1>

        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-ice-blue/90 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>
    </section>
  )
}
