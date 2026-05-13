"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

type AnimatedHeadingProps = {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
  className?: string
}

export function AnimatedHeading({
  children,
  delay = 0,
  y = 20,
  duration = 0.8,
  className,
}: AnimatedHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
