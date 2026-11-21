import AdminCoursesTable from '@/features/admin/components/AdminCoursesTable'
import { requireUser } from '@/lib/get-current-user'
import { serverFetch } from '@/lib/server-api'
import type { AdminCourseSummaryDto } from '@/types'

async function getCourses(): Promise<AdminCourseSummaryDto[]> {
	try {
		const res = await serverFetch('/api/courses/admin/summary')
		if (!res.ok) throw new Error('Failed to fetch courses')
		return res.json()
	} catch (error) {
		console.error('Error fetching courses:', error)
		return []
	}
}

export default async function AdminCoursesPage() {
  await requireUser('ADMIN')
  const courses = await getCourses()

  return (
    <div className="flex">
      <div className="min-w-0 flex-1 md:ml-64 py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-6 sm:gap-10 pt-16 sm:pt-20">
        <div className="flex flex-col justify-start items-start gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Courses</h1>
        </div>

        <AdminCoursesTable courses={courses} />
      </div>
    </div>
  )
}
