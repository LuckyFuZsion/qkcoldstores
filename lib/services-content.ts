import {
  Warehouse,
  Snowflake,
  Thermometer,
  Container,
  Package,
  Boxes,
  type LucideIcon,
} from "lucide-react"

export const FACILITY_IMAGE = "/images/facility-013-hero.webp"

export type AccreditationLogo = {
  src: string
  alt: string
  size?: "brcs" | "default"
  scale?: number
}

const BRCS_LOGO_HEIGHT = "h-16 md:h-20"

export const accreditationLogos: AccreditationLogo[] = [
  { src: "/QK-New/Certifications/brcs-food-safety.webp", alt: "BRCGS Food Safety", size: "brcs" },
  { src: "/QK-New/Certifications/brcs-storage.webp", alt: "BRCGS Storage and Distribution", size: "brcs", scale: 0.9 },
  { src: "/QK-New/Certifications/brcs-start.webp", alt: "BRCGS START", size: "brcs" },
  { src: "/QK-New/Certifications/red-tractor.webp", alt: "Red Tractor" },
  { src: "/QK-New/Certifications/organic-food-federation.webp", alt: "Organic Food Federation" },
  { src: "/QK-New/Certifications/high-standards.webp", alt: "Cold Store Federation" },
  { src: "/bfff.webp", alt: "BFFF - British Frozen Food Federation" },
]

export const brcsLogoHeightClass = BRCS_LOGO_HEIGHT

export type ServicePreview = {
  icon: LucideIcon
  title: string
  slug: string
  description: string
}

export type ServiceDetail = ServicePreview & {
  features: string[]
}

export const SERVICE_SLUGS = {
  storage: "storage",
  blastFreezing: "blast-freezing",
  tempering: "tempering",
  containerLoading: "container-loading",
  freshPacking: "fresh-packing",
  handling: "handling",
  environment: "environment",
} as const

export function serviceHref(slug: string) {
  return `/services#${slug}`
}

export const servicePreviewItems: ServicePreview[] = [
  {
    icon: Warehouse,
    title: "Storage",
    slug: SERVICE_SLUGS.storage,
    description:
      "In excess of 250,000 sq ft of cold storage for frozen, chilled and ambient goods, with capacity for over 50,000 pallets.",
  },
  {
    icon: Snowflake,
    title: "Blast Freezing",
    slug: SERVICE_SLUGS.blastFreezing,
    description:
      "Blast freezing capabilities handling approximately 800 tonnes per week, ensuring efficient and high-quality freezing for large volumes of goods.",
  },
  {
    icon: Thermometer,
    title: "Tempering",
    slug: SERVICE_SLUGS.tempering,
    description:
      "Controlled tempering services ensuring safe and gradual thawing of frozen goods to optimal temperatures for further processing or distribution.",
  },
  {
    icon: Container,
    title: "Container Loading and Unloading",
    slug: SERVICE_SLUGS.containerLoading,
    description:
      "Efficient container loading and unloading with experienced personnel, appropriate handling equipment, and strict temperature management procedures.",
  },
  {
    icon: Package,
    title: "Fresh Packing",
    slug: SERVICE_SLUGS.freshPacking,
    description:
      "Since its inception in 2020, our fresh packing line has steadily grown to handling an average of 300 tonnes per week in 2026, handling all protein products to customer specification.",
  },
  {
    icon: Boxes,
    title: "Handling",
    slug: SERVICE_SLUGS.handling,
    description:
      "Specialised cold store handling including case picking, handballing, labelling and de-topping.",
  },
]

export const serviceDetailItems: ServiceDetail[] = [
  {
    icon: Warehouse,
    title: "Storage",
    slug: SERVICE_SLUGS.storage,
    description:
      "QK Cold Stores provides in excess of 250,000 square feet of cold storage capacity for frozen, chilled and ambient goods, with the ability to accommodate over 50,000 pallets simultaneously.",
    features: [
      "250,000+ sq ft of capacity",
      "50,000+ pallet positions",
      "Frozen, chilled and ambient storage",
      "24/7 temperature auditable monitoring",
    ],
  },
  {
    icon: Snowflake,
    title: "Blast Freezing",
    slug: SERVICE_SLUGS.blastFreezing,
    description:
      "Blast freezing is a crucial process for preserving the quality and freshness of perishable goods. Our facility is equipped with blast freezing capabilities, with the capacity to handle approximately 800 tonnes per week, ensuring efficient and high-quality freezing for large volumes of goods.",
    features: [
      "~800 tonnes per week capacity",
      "Rapid blast freezing",
      "Quality and freshness preserved",
      "Large volume handling",
    ],
  },
  {
    icon: Thermometer,
    title: "Tempering",
    slug: SERVICE_SLUGS.tempering,
    description:
      "Our cold store is fully equipped to offer controlled tempering services, ensuring safe and gradual thawing of frozen goods to optimal temperatures for further processing or distribution.",
    features: [
      "Controlled tempering services",
      "Safe gradual thawing",
      "Optimal temperatures for processing",
      "Distribution-ready goods",
    ],
  },
  {
    icon: Container,
    title: "Container Loading and Unloading",
    slug: SERVICE_SLUGS.containerLoading,
    description:
      "Our cold store provides efficient container loading and unloading services to support the smooth movement of temperature-controlled products throughout the supply chain. With experienced personnel, appropriate handling equipment, and strict temperature management procedures, we can safely unload incoming refrigerated containers and load outbound shipments while maintaining product integrity.",
    features: [
      "Incoming refrigerated container unloading",
      "Outbound shipment loading",
      "Experienced personnel",
      "Strict temperature management",
    ],
  },
  {
    icon: Package,
    title: "Fresh Packing",
    slug: SERVICE_SLUGS.freshPacking,
    description:
      "Since its inception in 2020, our fresh packing line has steadily grown to handling an average of 300 tonnes per week in 2026. Our facility handles a wide variety of protein products, packing to each customer's exact specifications with quality and efficiency at every stage.",
    features: [
      "Operating since 2020",
      "300+ tonnes per week",
      "All protein products handled",
      "Packed to customer specification",
    ],
  },
  {
    icon: Boxes,
    title: "Handling",
    slug: SERVICE_SLUGS.handling,
    description:
      "Cold store handling requires specialised training and equipment to ensure activities are carried out efficiently and in compliance with food safety regulations, keeping perishable goods at optimal conditions throughout the storage and handling process.",
    features: [
      "Case picking",
      "Handballing",
      "Labelling",
      "De-topping",
    ],
  },
]

export const footerServiceLinks = [
  { label: "Storage", slug: SERVICE_SLUGS.storage },
  { label: "Blast Freezing", slug: SERVICE_SLUGS.blastFreezing },
  { label: "Tempering", slug: SERVICE_SLUGS.tempering },
  { label: "Container Loading", slug: SERVICE_SLUGS.containerLoading },
  { label: "Fresh Packing", slug: SERVICE_SLUGS.freshPacking },
  { label: "Handling", slug: SERVICE_SLUGS.handling },
]

export const additionalServices = [
  "Case packing",
  "Importing and exporting services",
  "Vets services",
  "Catch weighting",
  "Picking",
  "Labelling",
]

export const OPENING_HOURS_TEXT = {
  operational: "24/7 Operational",
  operationalNote: "Intake hours may vary",
  office: "Office hours: Monday to Friday, 9am - 5pm",
}
