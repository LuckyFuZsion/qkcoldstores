"use client"

import Image from "next/image"
import { FACILITY_IMAGE } from "@/lib/services-content"

type HeroBackgroundProps = {
  backgroundImage?: string
  priority?: boolean
}

export function HeroBackground({
  backgroundImage = FACILITY_IMAGE,
  priority = false,
}: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={backgroundImage}
        alt="QK Coldstores temperature-controlled cold storage facility in Grantham"
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-center pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-deep-navy/90 via-deep-navy/80 to-deep-navy/70 pointer-events-none" />
    </div>
  )
}
