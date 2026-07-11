import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function PATCH(req: NextRequest) {
	const token = req.cookies.get('token')?.value
	const payload = token && verifyToken(token)

	if (!payload) {
		return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
	}

	const { name, email, phone, jobTitle } = await req.json()

	if (!name || !email) {
		return NextResponse.json({ error: 'Имя и email обязательны' }, { status: 400 })
	}

	const user = await prisma.user.update({
		where: { id: payload.userId },
		data: { name, email, phone, jobTitle },
	})

	return NextResponse.json({ user })
}