import LessonHeader from '@/features/lessons/components/LessonHeader'
import CompleteLessonButton from '@/features/lessons/components/CompleteLessonButton'
import LessonPlayer from '@/features/lessons/components/LessonPlayer'
import LessonSidebar from '@/features/lessons/components/LessonSidebar'
import { getCurrentUser } from '@/lib/get-current-user'
import { serverFetch } from '@/lib/server-api'
import type { LessonPageDto } from '@/types'
import { notFound, redirect } from 'next/navigation'

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>
}) {
  const { id, lessonId } = await params

  const user = await getCurrentUser()
  if (!user || !user.id) redirect('/signIn')

  const res = await serverFetch(`/api/courses/${encodeURIComponent(id)}/lessons/${encodeURIComponent(lessonId)}`)
  if (!res.ok) {
  console.error('LESSON STATUS', res.status, await res.text())
  if (res.status === 401) redirect('/signIn')
  if (res.status === 403) redirect(`/courses/${id}`)
  if (res.status === 404) notFound()
  throw new Error(`Failed to load lesson: ${res.status}`)
}

  const data: LessonPageDto = await res.json()
  const { lesson, modules } = data

  const allLessons = modules.flatMap((m) => m.lessons)
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId)
  const lessonNumber = currentIndex + 1
  const totalLessons = allLessons.length

  const isCompleted = data.completedLessons.includes(lessonId)
  const nextLesson = allLessons[currentIndex + 1]

  return (
    <div className="flex flex-col h-screen bg-[#0f0f1a]">
      <LessonHeader
        lessonTitle={lesson.title}
        progress={data.progress}
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
        <div className="flex min-h-0 flex-1 flex-col">
          <LessonPlayer videoUrl={lesson.videoUrl} />

          <div className="flex flex-col gap-4 border-t border-gray-200 bg-white px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h1 className="font-bold text-lg text-gray-900">{lesson.title}</h1>
              <p className="text-sm text-gray-500">
                {data.moduleTitle} · Lesson {lessonNumber} of {totalLessons}
              </p>
            </div>
            <CompleteLessonButton
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
