import { FAQ_ITEMS } from "@/lib/faq-content"
import { SITE_ADDRESS, SITE_URL, SOCIAL_PROFILES } from "@/lib/site-config"
import type { Vacancy } from "@/lib/vacancies"

export const OG_IMAGE_PATH = "/images/facility-013-hero.webp"

export function buildLocalBusinessJsonLd() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "QK Cold Stores (Marston) Ltd",
    description:
      "Premium temperature-controlled warehousing, blast freezing, and distribution services in Grantham, Marston and the East Midlands.",
    url: SITE_URL,
    telephone: "+441400259300",
    email: "info@qkcoldstores.co.uk",
    logo: `${SITE_URL}/images/qk-logo.webp`,
    image: `${SITE_URL}${OG_IMAGE_PATH}`,
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
              "State-of-the-art blast freezing capabilities handling approximately 800 tonnes per week.",
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

export function buildFAQPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
