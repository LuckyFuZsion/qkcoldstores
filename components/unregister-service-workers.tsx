"use client"

import { useEffect } from "react"

export function UnregisterServiceWorkers() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return

    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister()
      })
    })
  }, [])

  return null
}
