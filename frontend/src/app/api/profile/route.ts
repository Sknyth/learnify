import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@/generated/prisma/client'
import { getAuthUser } from '@/lib/getAuthUser'

export async function PATCH(req: NextRequest) {
	const payload = getAuthUser(req)
	if (!payload) {
		return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
	}

	const body = await req.json().catch(() => null)

	const name = typeof body?.name === 'string' ? body.name.trim() : ''
	const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
	const phone = typeof body?.phone === 'string' ? body.phone.trim() || null : null
	const jobTitle = typeof body?.jobTitle === 'string' ? body.jobTitle.trim() || null : null

	if (!name || !email) {
		return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
	}

	try {
		const user = await prisma.user.update({
			where: { id: payload.userId },
			data: { name, email, phone, jobTitle },
			select: {
				id: true,
				email: true,
				name: true,
				phone: true,
				jobTitle: true,
				role: true,
				createdAt: true,
			},
		})

		return NextResponse.json({ user })
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
			return NextResponse.json({ error: 'This email is already in use.' }, { status: 409 })
		}
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}