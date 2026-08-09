"use client"

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"
import { FACILITY_ADDRESS, FACILITY_COORDS, FACILITY_LABEL } from "@/lib/location"
import { cn } from "@/lib/utils"

type FacilityMapProps = {
  className?: string
  zoom?: number
}

export function FacilityMap({ className, zoom = 15 }: FacilityMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<{ remove: () => void } | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    let cancelled = false
    let resizeObserver: ResizeObserver | null = null

    async function initMap() {
      const L = (await import("leaflet")).default

      if (cancelled || !containerRef.current || mapRef.current) return

      const map = L.map(containerRef.current, {
        center: [FACILITY_COORDS.lat, FACILITY_COORDS.lng],
        zoom,
        scrollWheelZoom: true,
        zoomControl: true,
      })

      // Detailed colour street map (closer to Google Maps styling than flat greyscale basemaps)
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            'Tiles &copy; <a href="https://www.esri.com/" target="_blank" rel="noreferrer">Esri</a>',
          maxZoom: 19,
        }
      ).addTo(map)

      const icon = L.divIcon({
        className: "qk-facility-marker",
        html: `
          <div class="qk-facility-marker__wrap">
            <svg viewBox="0 0 24 24" width="44" height="44" aria-hidden="true">
              <path
                fill="#3b82f6"
                stroke="#0f172a"
                stroke-width="1.25"
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
              />
            </svg>
            <span class="qk-facility-marker__label">${FACILITY_LABEL}</span>
          </div>
        `,
        iconSize: [160, 72],
        iconAnchor: [80, 44],
      })

      L.marker([FACILITY_COORDS.lat, FACILITY_COORDS.lng], {
        icon,
        title: FACILITY_LABEL,
        riseOnHover: true,
      })
        .addTo(map)
        .bindPopup(`<strong>${FACILITY_LABEL}</strong><br />${FACILITY_ADDRESS}`)

      mapRef.current = map

      const invalidate = () => map.invalidateSize()
      requestAnimationFrame(invalidate)
      window.setTimeout(invalidate, 100)
      window.setTimeout(invalidate, 400)

      resizeObserver = new ResizeObserver(invalidate)
      resizeObserver.observe(containerRef.current)
    }

    void initMap()

    return () => {
      cancelled = true
      resizeObserver?.disconnect()
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [zoom])

  return (
    <div
      ref={containerRef}
      className={cn("qk-facility-map h-full w-full", className)}
      role="img"
      aria-label={`${FACILITY_LABEL} location map`}
    />
  )
}
