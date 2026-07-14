import AsideDashboard from '@/components/AsideDashboard'
import InfoBoxDashboard from '@/components/InfoBoxDashboard'
import InfoCourseDashboard from '@/components/InfoCourseDashboard'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { prisma } from '@/lib/prisma'
import { BookOpen, Clock, Medal } from 'lucide-react'

export default async function Page() {
  const user = await getCurrentUser()

  if (!user) return null

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: user.id },
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
    orderBy: { enrolledAt: 'desc' },
  })

  return (
    <div className="flex min-h-screen">
      <AsideDashboard />
      <div className="py-8 sm:py-12 px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col mx-auto w-full gap-6 sm:gap-10">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <h2 className="text-gray-500 text-sm sm:text-base">
            You have {enrollments.length} active course{enrollments.length !== 1 ? 's' : ''}.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoBoxDashboard Icon={BookOpen} count={enrollments.length} desc="Courses" />
          <InfoBoxDashboard Icon={Clock} count={0} desc="Hours watched" />
          <InfoBoxDashboard Icon={Medal} count={0} desc="Certificates" />
        </div>

        <div className="flex flex-col gap-4">
          {enrollments.length === 0 ? (
            <p className="text-gray-500 text-sm">You haven&apos;t enrolled in any courses yet.</p>
          ) : (
            enrollments.map((enrollment) => {
              const allLessons = enrollment.course.modules.flatMap((m) => m.lessons)
              
              const nextLesson = allLessons.find(
                (lesson) => !enrollment.completedLessons.includes(lesson.id)
              )

              const targetLesson = nextLesson || allLessons[allLessons.length - 1]
              const lessonId = targetLesson?.id || ''
              const lastLessonTitle = targetLesson?.title || 'No lessons'

              return (
                <InfoCourseDashboard
                  key={enrollment.id}
                  title={enrollment.course.title}
                  imageUrl={enrollment.course.imageUrl}
                  lastLesson={lastLessonTitle}
                  progress={enrollment.progress}
                  courseId={enrollment.course.id}
                  lessonId={lessonId}
                />
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}