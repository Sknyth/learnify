import { generateToken, hashPassword } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { name, email, password } = await req.json()
	
	if(!name || !email || !password) {
		return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 })
	}

	const existingUser = await prisma.user.findUnique({ where: { email}})
	if(existingUser) {
		return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 })
	}

	const hashedPassword = await hashPassword(password)

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword
		}
	})

	const token = generateToken({ userId: user.id })

	const response = NextResponse.json(
		{ user: { id: user.id, name: user.name, email: user.email } },
		{ status: 201 }
	)

	response.cookies.set('token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7,
		path: '/',
	})

	return response
}