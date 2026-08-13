export const IMAGE_QUALITY = {
  hero: 68,
  content: 72,
  logo: 85,
  accreditation: 80,
} as const

export const IMAGE_SIZES = {
  heroBackground: "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px",
  heroLogo: "(max-width: 640px) 240px, (max-width: 1024px) 320px, 480px",
  headerLogo: "(max-width: 768px) 120px, 180px",
  footerLogo: "160px",
  accreditation: "(max-width: 768px) 96px, 160px",
  contentHalf: "(max-width: 1024px) 100vw, 50vw",
  contentThird: "(max-width: 768px) 100vw, 33vw",
  avatar: "(max-width: 640px) 128px, 160px",
  siteMap: "(max-width: 1024px) 100vw, 50vw",
} as const

export const PAGE_HERO_BACKGROUND = "/images/website-background.webp"
