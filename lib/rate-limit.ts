// Best-effort in-memory rate limiter. On serverless hosts each instance keeps its own
// counters, so this slows abuse rather than guaranteeing a hard limit.
const buckets = new Map<string, number[]>()

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs)

  if (hits.length >= limit) {
    buckets.set(key, hits)
    return true
  }

  hits.push(now)
  buckets.set(key, hits)

  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t >= windowMs)) buckets.delete(k)
    }
  }
  return false
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  return (
    request.headers.get("x-real-ip") ||
    forwarded?.split(",")[0]?.trim() ||
    "unknown"
  )
}
