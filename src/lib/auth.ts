import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET! as string

type TokenPayload = {
	userId: string
	role: 'USER' | 'ADMIN'
}

export async function hashPassword(password: string): Promise<string> {
	return await bcrypt.hash(password, 10)
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
	return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: TokenPayload): string {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): TokenPayload | null {
	try {
		return jwt.verify(token, JWT_SECRET) as TokenPayload
	} catch {
		return null
	}
}