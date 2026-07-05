"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function HeroLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="flex justify-center mb-8"
    >
      <div className="bg-white/95 rounded-2xl lg:rounded-3xl shadow-2xl px-6 py-4 lg:px-10 lg:py-6 border border-white/20">
        <Image
          src="/images/qk-logo.png"
          alt="QK Coldstores"
          width={480}
          height={240}
          className="h-16 sm:h-20 lg:h-28 w-auto object-contain"
          priority
        />
      </div>
    </motion.div>
  )
}
