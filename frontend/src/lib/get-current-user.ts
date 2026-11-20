import { cookies } from "next/headers"
import { cache } from "react"
import { serverFetch } from "@/lib/server-api"

export const getCurrentUser = cache(async () => {
  if (!(await cookies()).get("token")?.value) return null

  try {
    const res = await serverFetch("/api/auth/me", { signal: AbortSignal.timeout(10_000) })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
})