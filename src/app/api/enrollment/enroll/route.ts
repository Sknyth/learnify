import { getAuthUser } from '@/lib/getAuthUser'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@/generated/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const payload = getAuthUser(req)
	if (!payload) {
		return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
	}

	const body = await req.json().catch(() => null)
	const courseId = body?.courseId

	if (typeof courseId !== 'string' || !courseId) {
		return NextResponse.json({ error: 'courseId is required' }, { status: 400 })
	}

	const course = await prisma.course.findUnique({
		where: { id: courseId },
		select: { id: true },
	})
	if (!course) {
		return NextResponse.json({ error: 'Course not found' }, { status: 404 })
	}

	try {
		const enrollment = await prisma.$transaction(async (tx) => {
			const created = await tx.enrollment.create({
				data: { userId: payload.userId, courseId },
			})
			await tx.course.update({
				where: { id: courseId },
				data: { studentsCount: { increment: 1 } },
			})
			return created
		})
		return NextResponse.json({ enrollment }, { status: 201 })
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
			return NextResponse.json({ error: 'Already enrolled' }, { status: 409 })
		}
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}