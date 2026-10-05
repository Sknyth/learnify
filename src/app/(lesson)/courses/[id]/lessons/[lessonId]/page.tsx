import LessonHeader from '@/features/lessons/components/LessonHeader'
import ButtonCompleteLesson from '@/features/lessons/components/ButtonCompleteLesson'
import LessonPlayer from '@/features/lessons/components/LessonPlayer'
import LessonSidebar from '@/features/lessons/components/LessonSidebar'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>
}) {
  const { id, lessonId } = await params

  const user = await getCurrentUser()
  if (!user || !user.id) {
    redirect('/signIn')
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: id } },
  })

  if (!enrollment) {
    redirect(`/courses/${id}`)
  }

  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      module: { courseId: id },
    },
    include: {
      module: {
        include: {
          course: {
            include: {
              modules: {
                orderBy: { order: 'asc' },
                include: {
                  lessons: { orderBy: { order: 'asc' } },
                },
              },
            },
          },
        },
      },
    },
  })

  if (!lesson) return notFound()

  const course = lesson.module.course
  const modules = course.modules

  const allLessons = modules.flatMap((m) => m.lessons)
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId)
  const lessonNumber = currentIndex + 1
  const totalLessons = allLessons.length
  const moduleName = lesson.module.title

  const isCompleted = enrollment.completedLessons.includes(lessonId)
  const nextLesson = allLessons[currentIndex + 1]

  return (
    <div className="flex flex-col h-screen bg-[#0f0f1a]">
      <LessonHeader
        courseId={course.id}
        lessonTitle={lesson.title}
        progress={enrollment.progress}
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
        <div className="flex min-h-0 flex-1 flex-col">
          <LessonPlayer videoUrl={lesson.videoUrl} />

          <div className="flex flex-col gap-4 border-t border-gray-200 bg-white px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h1 className="font-bold text-lg text-gray-900">{lesson.title}</h1>
              <p className="text-sm text-gray-500">
                {moduleName} · Lesson {lessonNumber} of {totalLessons}
              </p>
            </div>
            <ButtonCompleteLesson 
              lessonId={lessonId}
              courseId={id}
              isCompleted={isCompleted}
              nextLessonId={nextLesson?.id} 
            />
          </div>
        </div>

        <LessonSidebar courseId={id} lessonId={lessonId} modules={modules} />
      </div>
    </div>
  )
}
