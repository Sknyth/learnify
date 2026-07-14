import ButtonCompleteLesson from '@/components/ButtonCompleteLesson'
import LessonHeader from '@/components/LessonHeader'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { prisma } from '@/lib/prisma'
import { Play } from 'lucide-react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

function getYouTubeEmbedUrl(url: string): string {
  const videoId = url.includes('watch?v=')
    ? url.split('watch?v=')[1].split('&')[0]
    : url.split('/').pop()
  return `https://www.youtube.com/embed/${videoId}`
}

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
        progress={Math.round((lessonNumber / totalLessons) * 100)}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex-1 bg-black flex items-center justify-center">
            {lesson.videoUrl ? (
              <iframe
                src={getYouTubeEmbedUrl(lesson.videoUrl)}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-gray-500">
                <Play className="w-12 h-12" />
                <p>No video available</p>
              </div>
            )}
          </div>

          <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
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

        <aside className="hidden lg:flex flex-col w-80 shrink-0 bg-[#1a1a2e] border-l border-white/10 overflow-y-auto">
          {modules.map((module) => (
            <div key={module.id}>
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  Module {module.order}
                </p>
                <h2 className="text-sm font-semibold text-white mt-0.5">
                  {module.title}
                </h2>
              </div>

              <div className="flex flex-col">
                {module.lessons.map((l) => {
                  const isActive = l.id === lessonId
                  return (
                    <Link
                      key={l.id}
                      href={`/courses/${id}/lessons/${l.id}`}
                      className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-white/5 ${
                        isActive
                          ? 'bg-[#4f46e5]/20 text-white'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Play className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-[#4f46e5]'}`} />
                      <span className="flex-1 truncate">{l.title}</span>
                      <span className="text-xs text-gray-500 shrink-0">{l.duration}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}