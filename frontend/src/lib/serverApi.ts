import { cookies } from "next/headers"

export async function serverFetch(path: string, init: RequestInit = {}, options: { auth?: boolean } = {}): Promise<Response> {
  const token = options.auth === false ? undefined : (await cookies()).get("token")?.value
  return fetch(`${process.env.API_URL}${path}`, {
    ...init,
    headers: { ...init.headers, ...(token ? { Cookie: `token=${token}` } : {}) },
    cache: "no-store",
  })
}
