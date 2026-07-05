"use client"

import { FACILITY_IMAGE } from "@/lib/services-content"

type HeroBackgroundProps = {
  backgroundImage?: string
}

export function HeroBackground({ backgroundImage = FACILITY_IMAGE }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-deep-navy/90 via-deep-navy/80 to-deep-navy/70 pointer-events-none" />
    </div>
  )
}
