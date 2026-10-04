import { getAuthUser } from '@/lib/getAuthUser'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const payload = getAuthUser(req)
  if (!payload) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const lessonId = body?.lessonId
  const courseId = body?.courseId

  if (typeof lessonId !== 'string' || typeof courseId !== 'string') {
    return NextResponse.json({ error: 'lessonId and courseId are required' }, { status: 400 })
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: payload.userId, courseId } },
  })
  if (!enrollment) {
    return NextResponse.json({ error: 'Not enrolled' }, { status: 403 })
  }

  // урок должен принадлежать именно этому курсу
  const lesson = await prisma.lesson.findFirst({
    where: { id: lessonId, module: { courseId } },
    select: { id: true },
  })
  if (!lesson) {
    return NextResponse.json({ error: 'Lesson not found in this course' }, { status: 404 })
  }

  if (enrollment.completedLessons.includes(lessonId)) {
    return NextResponse.json({ enrollment })
  }

  const totalLessons = await prisma.lesson.count({
    where: { module: { courseId } },
  })

  const newCompletedLessons = [...enrollment.completedLessons, lessonId]
  const progress = totalLessons
    ? Math.min(100, Math.round((newCompletedLessons.length / totalLessons) * 100))
    : 0

  const updated = await prisma.enrollment.update({
    where: { userId_courseId: { userId: payload.userId, courseId } },
    data: { completedLessons: newCompletedLessons, progress },
  })

  return NextResponse.json({ enrollment: updated })
}