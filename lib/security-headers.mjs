const contentSecurityPolicy = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "https://va.vercel-scripts.com",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://apis.google.com",
    "https://www.gstatic.com",
    "https://*.gstatic.com",
    "https://*.googleapis.com",
    "https://*.firebaseio.com",
  ].join(" "),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com",
  [
    "img-src 'self' data: blob:",
    "https://res.cloudinary.com",
    "https://www.google-analytics.com",
    "https://*.googleusercontent.com",
    "https://*.gstatic.com",
    "https://*.tile.openstreetmap.org",
    "https://tile.openstreetmap.org",
    "https://*.basemaps.cartocdn.com",
    "https://server.arcgisonline.com",
    "https://*.arcgisonline.com",
  ].join(" "),
  "font-src 'self' data: https://fonts.gstatic.com",
  [
    "connect-src 'self'",
    "https://*.googleapis.com",
    "https://*.google-analytics.com",
    "https://*.analytics.google.com",
    "https://vitals.vercel-insights.com",
    "https://va.vercel-scripts.com",
    "https://api.cloudinary.com",
    "https://res.cloudinary.com",
    "https://*.firebaseio.com",
    "https://*.firebaseapp.com",
    "https://*.cloudfunctions.net",
    "wss://*.firebaseio.com",
    "https://*.tile.openstreetmap.org",
    "https://*.basemaps.cartocdn.com",
    "https://server.arcgisonline.com",
    "https://*.arcgisonline.com",
  ].join(" "),
  [
    "frame-src 'self'",
    "https://www.google.com",
    "https://maps.google.com",
    "https://www.openstreetmap.org",
    "https://apis.google.com",
    "https://*.firebaseapp.com",
    "https://*.google.com",
  ].join(" "),
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ")

/** Security headers applied to all routes (Vercel + Next.js). */
export const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
]
