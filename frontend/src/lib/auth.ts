type TokenPayload = {
  userId: string
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN'
}

function decodeBase64Url(value: string): Uint8Array {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  const binary = atob(padded)
  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const secret = process.env.JWT_SECRET
    if (!secret) return null

    const [encodedHeader, encodedPayload, encodedSignature, extra] = token.split('.')
    if (!encodedHeader || !encodedPayload || !encodedSignature || extra !== undefined) return null

    const decoder = new TextDecoder()
    const header = JSON.parse(decoder.decode(decodeBase64Url(encodedHeader)))
    if (header.alg !== 'HS256') return null

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    )
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      decodeBase64Url(encodedSignature).buffer as ArrayBuffer,
      new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`),
    )
    if (!isValid) return null

    const payload = JSON.parse(decoder.decode(decodeBase64Url(encodedPayload)))
    if (
      typeof payload.sub !== 'string' ||
      (payload.role !== 'STUDENT' && payload.role !== 'INSTRUCTOR' && payload.role !== 'ADMIN') ||
      typeof payload.exp !== 'number' ||
      payload.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null
    }

    return { userId: payload.sub, role: payload.role }
  } catch {
    return null
  }
}
