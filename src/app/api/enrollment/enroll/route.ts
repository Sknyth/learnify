import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const token = req.cookies.get('token')?.value
	const payload = token && verifyToken(token)

	if (!payload) {
		return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
	}

	const { courseId } = await req.json()

	if (!courseId) {
		return NextResponse.json({ error: 'courseId is required' }, { status: 400 })
	}

	const course = await prisma.course.findUnique({ where: { id: courseId } })
	if (!course) {
		return NextResponse.json({ error: 'Course not found' }, { status: 404 })
	}

	const existing = await prisma.enrollment.findUnique({
		where: { userId_courseId: { userId: payload.userId, courseId } }
	})
	if (existing) {
		return NextResponse.json({ error: 'Already enrolled' }, { status: 409 })
	}

	try {
		const enrollment = await prisma.enrollment.create({
			data: { userId: payload.userId, courseId }
		})
		return NextResponse.json({ enrollment }, { status: 201 })
	} catch {
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}