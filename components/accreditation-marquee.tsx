"use client"

import Image from "next/image"
import { accreditationLogos, brcsLogoHeightClass } from "@/lib/services-content"
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image-config"
import { cn } from "@/lib/utils"

type AccreditationMarqueeProps = {
  className?: string
  logoClassName?: string
  priority?: boolean
}

function AccreditationLogoItem({
  src,
  alt,
  size = "default",
  scale = 1,
  ariaHidden = false,
  logoClassName,
  priority = false,
}: {
  src: string
  alt: string
  size?: "brcs" | "default"
  scale?: number
  ariaHidden?: boolean
  logoClassName: string
  priority?: boolean
}) {
  const isBrcs = size === "brcs"

  return (
    <div
      className={cn(
        "shrink-0 flex items-center justify-center",
        isBrcs ? brcsLogoHeightClass : cn("px-2 py-1", logoClassName)
      )}
      aria-hidden={ariaHidden || undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={200}
        height={80}
        sizes={IMAGE_SIZES.accreditation}
        quality={IMAGE_QUALITY.accreditation}
        loading={priority ? undefined : "lazy"}
        priority={priority}
        className={cn(
          "object-contain w-auto",
          isBrcs ? "h-full" : "h-full max-h-full"
        )}
        style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
        draggable={false}
      />
    </div>
  )
}

export function AccreditationMarquee({
  className,
  logoClassName = "h-10 md:h-12",
  priority = false,
}: AccreditationMarqueeProps) {
  const marqueeLogos = [...accreditationLogos, ...accreditationLogos]

  return (
    <div className={className}>
      <div
        className="overflow-hidden pointer-events-none select-none motion-reduce:hidden"
        aria-label="Accreditation logos"
      >
        <div className="accreditation-marquee-track flex w-max items-center gap-6 md:gap-10 pr-6 md:pr-10">
          {marqueeLogos.map((logo, index) => (
            <AccreditationLogoItem
              key={`${logo.src}-${index}`}
              src={logo.src}
              alt={logo.alt}
              size={logo.size}
              scale={logo.scale}
              ariaHidden={index >= accreditationLogos.length}
              logoClassName={logoClassName}
              priority={priority && index === 0}
            />
          ))}
        </div>
      </div>

      <div className="hidden motion-reduce:flex flex-wrap justify-center items-center gap-6 md:gap-10 px-4">
        {accreditationLogos.map((logo) => (
          <AccreditationLogoItem
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            size={logo.size}
            scale={logo.scale}
            logoClassName={logoClassName}
            priority={priority}
          />
        ))}
      </div>
    </div>
  )
}
