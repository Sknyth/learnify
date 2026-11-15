import { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

export function getAuthUser(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) return null
  try {
    return verifyToken(token) || null
  } catch {
    return null
  }
}