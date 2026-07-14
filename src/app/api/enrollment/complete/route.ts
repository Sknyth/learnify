import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const payload = token && verifyToken(token)

  if (!payload) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  }

  const { lessonId, courseId } = await req.json()

  if (!lessonId || !courseId) {
    return NextResponse.json({ error: 'lessonId and courseId are required' }, { status: 400 })
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: payload.userId, courseId } },
  })

  if (!enrollment) {
    return NextResponse.json({ error: 'Not enrolled' }, { status: 404 })
  }

  if (enrollment.completedLessons.includes(lessonId)) {
    return NextResponse.json({ enrollment })
  }

  const totalLessons = await prisma.lesson.count({
    where: { module: { courseId } },
  })

  const newCompletedLessons = [...enrollment.completedLessons, lessonId]
  const progress = Math.round((newCompletedLessons.length / totalLessons) * 100)

  const updated = await prisma.enrollment.update({
    where: { userId_courseId: { userId: payload.userId, courseId } },
    data: {
      completedLessons: newCompletedLessons,
      progress,
    },
  })

  return NextResponse.json({ enrollment: updated })
}