import { cookies } from "next/headers"
import { cache } from "react"
import { verifyToken } from "@/lib/auth"

export const getCurrentUser = cache(async () => {
  const token = (await cookies()).get("token")?.value
  if (!token) return null

  const payload = verifyToken(token)
  if (!payload) return null

  try {
    const res = await fetch(
      `${process.env.API_URL ?? "http://localhost:8080"}/api/users/${encodeURIComponent(payload.userId)}`,
      {
        headers: { Cookie: `token=${token}` },
        cache: "no-store",
      }
    )
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
})
