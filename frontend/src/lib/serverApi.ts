import { cookies } from "next/headers"

export async function serverFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = (await cookies()).get("token")?.value
  return fetch(`${process.env.API_URL}${path}`, {
    ...init,
    headers: { ...init.headers, ...(token ? { Cookie: `token=${token}` } : {}) },
    cache: "no-store",
  })
}