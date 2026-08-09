"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { HeroLogo } from "@/components/hero-logo"
import { HeroBackground } from "@/components/hero-background"
import { PAGE_HERO_BACKGROUND } from "@/lib/image-config"

type PageHeroProps = {
  title: ReactNode
  subtitle?: ReactNode
  eyebrow?: ReactNode
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[90svh] flex items-center justify-center overflow-x-hidden bg-deep-navy pt-16 xl:pt-24">
      <HeroBackground backgroundImage={PAGE_HERO_BACKGROUND} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12">
        <div className="max-w-5xl mx-auto text-center">
          <HeroLogo />

          {eyebrow ? (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-electric-blue font-bold text-sm uppercase tracking-[0.2em] mb-4 block"
            >
              {eyebrow}
            </motion.span>
          ) : null}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: eyebrow ? 0.3 : 0.2 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]"
          >
            {title}
          </motion.h1>

          {subtitle ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: eyebrow ? 0.5 : 0.4 }}
              className="text-xl md:text-2xl text-ice-blue/90 max-w-3xl mx-auto font-medium leading-relaxed"
            >
              {subtitle}
            </motion.p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
