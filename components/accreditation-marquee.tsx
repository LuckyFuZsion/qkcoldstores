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
  logoClassName,
  priority = false,
}: {
  src: string
  alt: string
  size?: "brcs" | "default"
  scale?: number
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
  return (
    <div className={className} aria-label="Accreditation logos">
      <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-evenly items-center gap-x-5 gap-y-4 md:gap-x-6 lg:gap-x-8 px-4 md:px-6 lg:px-8">
        {accreditationLogos.map((logo, index) => (
          <AccreditationLogoItem
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            size={logo.size}
            scale={logo.scale}
            logoClassName={logoClassName}
            priority={priority && index === 0}
          />
        ))}
      </div>
    </div>
  )
}
