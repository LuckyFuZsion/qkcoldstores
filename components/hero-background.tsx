"use client"

import Image from "next/image"
import { FACILITY_IMAGE } from "@/lib/services-content"
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image-config"

type HeroBackgroundProps = {
  backgroundImage?: string
  priority?: boolean
  quality?: number
}

export function HeroBackground({
  backgroundImage = FACILITY_IMAGE,
  priority = false,
  quality = IMAGE_QUALITY.hero,
}: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 min-h-[90svh]">
      <Image
        src={backgroundImage}
        alt=""
        aria-hidden
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        quality={quality}
        sizes={IMAGE_SIZES.heroBackground}
        className="object-cover object-center pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-deep-navy/90 via-deep-navy/80 to-deep-navy/70 pointer-events-none" />
    </div>
  )
}
