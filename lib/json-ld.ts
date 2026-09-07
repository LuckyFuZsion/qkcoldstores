import { FAQ_ITEMS } from "@/lib/faq-content"
import {
  SITE_ADDRESS,
  SITE_DATE_MODIFIED,
  SITE_DATE_PUBLISHED,
  SITE_URL,
  SOCIAL_PROFILES,
} from "@/lib/site-config"
import type { Vacancy } from "@/lib/vacancies"

export const OG_IMAGE_PATH = "/images/facility-013-hero.webp"

export function buildOrganizationJsonLd() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "QK Cold Stores",
    legalName: "QK Cold Stores (Marston) Ltd",
    url: SITE_URL,
    logo: `${SITE_URL}/images/qk-logo.webp`,
    image: `${SITE_URL}${OG_IMAGE_PATH}`,
    email: "enquiries@qkcoldstores.co.uk",
    telephone: "+441400259300",
    foundingLocation: {
      "@type": "Place",
      name: "Marston, Grantham",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_ADDRESS.streetAddress,
      addressLocality: SITE_ADDRESS.addressLocality,
      addressRegion: SITE_ADDRESS.addressRegion,
      postalCode: SITE_ADDRESS.postalCode,
      addressCountry: SITE_ADDRESS.addressCountry,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+441400259300",
        contactType: "customer service",
        email: "enquiries@qkcoldstores.co.uk",
        areaServed: "GB",
        availableLanguage: ["English"],
      },
    ],
  }

  if (SOCIAL_PROFILES.length > 0) {
    schema.sameAs = SOCIAL_PROFILES
  }

  return schema
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "QK Cold Stores",
    description:
      "Premium temperature-controlled warehousing, blast freezing, and distribution services in Grantham, Marston and the East Midlands.",
    inLanguage: "en-GB",
    datePublished: SITE_DATE_PUBLISHED,
    dateModified: SITE_DATE_MODIFIED,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    about: {
      "@id": `${SITE_URL}/#localbusiness`,
    },
  }
}

export function buildWebPageJsonLd({
  path,
  name,
  description,
}: {
  path: string
  name: string
  description: string
}) {
  const normalisedPath = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`
  const pageUrl = normalisedPath === "/" ? SITE_URL : `${SITE_URL}${normalisedPath}`

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    description,
    inLanguage: "en-GB",
    datePublished: SITE_DATE_PUBLISHED,
    dateModified: SITE_DATE_MODIFIED,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    author: {
      "@id": `${SITE_URL}/#organization`,
    },
  }
}

export function buildLocalBusinessJsonLd() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: "QK Cold Stores (Marston) Ltd",
    description:
      "Premium temperature-controlled warehousing, blast freezing, and distribution services in Grantham, Marston and the East Midlands.",
    url: SITE_URL,
    telephone: "+441400259300",
    email: "enquiries@qkcoldstores.co.uk",
    logo: `${SITE_URL}/images/qk-logo.webp`,
    image: `${SITE_URL}${OG_IMAGE_PATH}`,
    parentOrganization: {
      "@id": `${SITE_URL}/#organization`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_ADDRESS.streetAddress,
      addressLocality: SITE_ADDRESS.addressLocality,
      addressRegion: SITE_ADDRESS.addressRegion,
      postalCode: SITE_ADDRESS.postalCode,
      addressCountry: SITE_ADDRESS.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_ADDRESS.latitude,
      longitude: SITE_ADDRESS.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
        description: "Operational access - 24/7",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
        description: "Office hours",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Grantham" },
      { "@type": "City", name: "Newark" },
      { "@type": "City", name: "Nottingham" },
      { "@type": "City", name: "Lincoln" },
      { "@type": "City", name: "Leicester" },
      { "@type": "City", name: "Peterborough" },
      { "@type": "AdministrativeArea", name: "East Midlands" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cold Storage Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Storage",
            description:
              "In excess of 250,000 sq ft of cold storage for frozen, chilled and ambient goods, with capacity for over 50,000 pallets.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Blast Freezing",
            description:
              "Blast freezing capabilities handling approximately 800 tonnes per week.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tempering",
            description:
              "Controlled tempering services for safe and gradual thawing of frozen goods.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Container Loading and Unloading",
            description:
              "Efficient container loading and unloading with strict temperature management procedures.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fresh Packing",
            description:
              "Since its inception in 2020, our fresh packing line has steadily grown to handling an average of 300 tonnes per week in 2026, handling all protein products to customer specification.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Handling",
            description:
              "Specialised cold store handling including case picking, handballing, labelling and de-topping.",
          },
        },
      ],
    },
  }

  if (SOCIAL_PROFILES.length > 0) {
    schema.sameAs = SOCIAL_PROFILES
  }

  return schema
}

export function buildHomePageJsonLd() {
  return [
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildLocalBusinessJsonLd(),
    buildWebPageJsonLd({
      path: "/",
      name: "QK Cold Stores | Cold Storage and Logistics in Grantham",
      description:
        "QK Cold Stores provides premium temperature-controlled warehousing, blast freezing, and distribution services in Grantham, Marston and the East Midlands.",
    }),
  ]
}

export function buildFAQPageJsonLd() {
  const pageUrl = `${SITE_URL}/faq`

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    name: "Frequently Asked Questions | QK Cold Stores",
    description:
      "Frequently asked questions about QK Cold Stores cold storage services, facilities, and capabilities in Grantham.",
    inLanguage: "en-GB",
    datePublished: SITE_DATE_PUBLISHED,
    dateModified: SITE_DATE_MODIFIED,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    mainEntity: FAQ_ITEMS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function buildJobPostingJsonLd(vacancy: Vacancy) {
  const datePosted = vacancy.createdAt?.toDate?.()
    ? vacancy.createdAt.toDate().toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0]

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: vacancy.title,
    description: `${vacancy.description}\n\nSalary: ${vacancy.salary}`,
    datePosted,
    hiringOrganization: {
      "@type": "Organization",
      name: "QK Cold Stores (Marston) Ltd",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/images/qk-logo.webp`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_ADDRESS.streetAddress,
        addressLocality: SITE_ADDRESS.addressLocality,
        addressRegion: SITE_ADDRESS.addressRegion,
        postalCode: SITE_ADDRESS.postalCode,
        addressCountry: SITE_ADDRESS.addressCountry,
      },
    },
    employmentType: "FULL_TIME",
  }
}
