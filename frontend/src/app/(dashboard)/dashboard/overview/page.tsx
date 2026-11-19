import InfoBoxDashboard from '@/features/dashboard/components/InfoBoxDashboard'
import InfoCourseDashboard from '@/features/dashboard/components/InfoCourseDashboard'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { serverFetch } from '@/lib/serverApi'
import { MyEnrollmentDto } from '@/types'
import { BookOpen, Clock, Medal } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function getEnrollments(): Promise<MyEnrollmentDto[]> {
  try {
    const res = await serverFetch('/api/enrollments/my')
    if (!res.ok) throw new Error(`Failed to fetch enrollments: ${res.status}`)
    return res.json()
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return []
  }
}
export default async function Page() {
  const user = await getCurrentUser()

  if (!user) redirect('/')

  const enrollments = await getEnrollments()


  const completedCourses = enrollments.reduce((count, enrollment) => {
    if (enrollment.progress === 100) return count + 1
    return count
  }, 0)

  return (
    <div className="flex">
      <div className="min-w-0 flex-1 md:ml-64 py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-6 sm:gap-10 pt-16 sm:pt-20">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-2xl sm:text-3xl font-bold">Overview</h1>
          <h2 className="text-gray-500 text-sm sm:text-base">
            You have {enrollments.length} active course{enrollments.length !== 1 ? 's' : ''}.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <InfoBoxDashboard Icon={BookOpen} count={enrollments.length} desc="Courses" />
          <InfoBoxDashboard Icon={Clock} count={0} desc="Hours watched" />
          <InfoBoxDashboard Icon={Medal} count={completedCourses} desc="Certificates" />
        </div>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Continue learning</h2>
              <p className="mt-0.5 text-xs text-gray-400">
                Pick up right where you left off
              </p>
            </div>

            <Link
              href="/dashboard/myLearning"
              className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              View all
            </Link>
          </div>

          {enrollments.length === 0 ? (
            <p className="py-6 text-sm text-gray-500">
              You haven&apos;t enrolled in any courses yet.
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {enrollments.slice(0, 3).map((enrollment, index) => {
                const allLessons = enrollment.course?.modules.flatMap((m) => m.lessons) ?? []

                const nextLesson = allLessons.find(
                  (lesson) => !enrollment.completedLessons.includes(lesson.id)
                )

                const targetLesson = nextLesson || allLessons[allLessons.length - 1]
                const lessonId = targetLesson?.id || ''
                const lastLessonTitle = targetLesson?.title || 'No lessons'

                return (
                  <InfoCourseDashboard
                    key={enrollment.id}
                    title={enrollment.course?.title ?? ''}
                    imageUrl={enrollment.course?.imageUrl ?? ''}
                    category={enrollment.course?.category}
                    lastLesson={lastLessonTitle}
                    progress={enrollment.progress}
                    courseId={enrollment.course?.id ?? ''}
                    lessonId={lessonId}
                    isPrimary={index === 0}
                  />
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
