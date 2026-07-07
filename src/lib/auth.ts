import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET! as string

export async function hashPassword(password: string): Promise<string> {
	return await bcrypt.hash(password, 10)
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
	return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: object): string {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { userId: string } | null {
	try {
		return jwt.verify(token, JWT_SECRET) as { userId: string }
	} catch {
		return null
	}
}