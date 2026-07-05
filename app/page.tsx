import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesPreview } from "@/components/services-preview"
import { EnvironmentPreview } from "@/components/environment-preview"
import { WhyChooseUs } from "@/components/why-choose-us"
import { LocationPreview } from "@/components/location-preview"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

// JSON-LD Schema for Local Business SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://qkcoldstores.co.uk",
  name: "QK Cold Stores (Marston) Ltd",
  description: "Premium temperature-controlled warehousing, blast freezing, and distribution services in Grantham, Marston and the East Midlands.",
  url: "https://qkcoldstores.co.uk",
  telephone: "+441400259300",
  email: "info@qkcoldstores.co.uk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2 Toll Bar Road",
    addressLocality: "Marston, Grantham",
    addressRegion: "Lincolnshire",
    postalCode: "NG32 2HT",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.9659668,
    longitude: -0.6936068,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
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
  priceRange: "$$",
  image: "https://qkcoldstores.co.uk/images/facility-013.webp",
  sameAs: [],
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Header />
        <HeroSection />
        <AboutSection />
        <ServicesPreview />
        <EnvironmentPreview />
        <WhyChooseUs />
        <LocationPreview />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
