import { comparePasswords, generateToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { email, password } = await req.json()

	if (!email || !password) {
		return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 })
	}

	const user = await prisma.user.findUnique({ where: { email } })

	if (!user) {
		return NextResponse.json({ error: 'Неверный email или пароль' }, { status: 401 })
	}

	const isValid = await comparePasswords(password, user.password)

	if (!isValid) {
		return NextResponse.json({ error: 'Неверный email или пароль' }, { status: 401 })
	}

	const token = generateToken({ userId: user.id })

	const response = NextResponse.json(
		{ user: { id: user.id, name: user.name, email: user.email } },
		{ status: 200 }
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