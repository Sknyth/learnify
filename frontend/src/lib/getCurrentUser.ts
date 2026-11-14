import { cache } from "react"
import { serverFetch } from "@/lib/serverApi"

export const getCurrentUser = cache(async () => {
  try {
    const res = await serverFetch("/api/auth/me")
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
})