import { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export async function getAuthUser(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) return null
  try {
		return (await verifyToken(token)) || null
  } catch {
    return null
  }
}
