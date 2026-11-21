import EnrolledCourseCard from '@/features/dashboard/components/EnrolledCourseCard'
import { requireUser } from '@/lib/get-current-user'
import { serverFetch } from '@/lib/server-api'
import { MyEnrollmentDto } from '@/types'

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

export default async function MyLearningPage() {
  await requireUser()
	
	const enrollments = await getEnrollments()

  return (
    <div className="flex">
      <div className="min-w-0 flex-1 md:ml-64 py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-6 sm:gap-10 pt-16 sm:pt-20">
				<div className="flex flex-col justify-start items-start gap-1">
					<h1 className="text-2xl sm:text-3xl font-bold">My learning</h1>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {enrollments.length === 0 ? (
            <p className="text-gray-500 text-sm">You have no courses available to continue right now.</p>
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
                <EnrolledCourseCard
									key={enrollment.id}
									title={enrollment.course.title}
									imageUrl={enrollment.course.imageUrl}
									lastLesson={lastLessonTitle}
									progress={enrollment.progress}
									courseId={enrollment.course.id}
									lessonId={lessonId} category={enrollment.course.category}             
									/>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
