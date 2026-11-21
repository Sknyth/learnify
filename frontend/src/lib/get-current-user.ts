import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"
import { serverFetch } from "@/lib/server-api"
import type { Role, UserDto } from "@/types/user"

export const getCurrentUser = cache(async (): Promise<UserDto | null> => {
  if (!(await cookies()).get("token")?.value) return null

  try {
    const res = await serverFetch("/api/auth/me", { signal: AbortSignal.timeout(10_000) })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
})

export async function requireUser(...roles: Role[]): Promise<UserDto> {
  const user = await getCurrentUser()
  if (!user) redirect("/signIn")
  if (roles.length && !roles.includes(user.role)) redirect("/dashboard/overview")
  return user
}
