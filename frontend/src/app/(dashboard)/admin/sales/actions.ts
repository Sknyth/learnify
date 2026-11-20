'use server'

import { serverFetch } from '@/lib/server-api'

export async function serverGet<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await serverFetch(path)
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`)
    return await res.json()
  } catch (error) {
    console.error(error)
    return fallback
  }
}