import CoursesTable from '@/features/admin/components/CoursesTable'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { redirect } from 'next/navigation'
import AddCourseButton from '@/features/courses/components/AddCourseButton'
import { CourseDto } from '@/types'
import { serverFetch } from '@/lib/serverApi'

async function getCourses(): Promise<CourseDto[]> {
	try {
		const res = await serverFetch('/api/courses?limit=6')
		if (!res.ok) throw new Error('Failed to fetch courses')
		return res.json()
	} catch (error) {
		console.error('Error fetching courses:', error)
		return []
	}
}

export default async function Page() {
	const user = await getCurrentUser()
	if (!user || user.role !== 'ADMIN') redirect('/dashboard/overview')

	const courses = await getCourses()

	return (
		<div className="flex flex-col md:flex-row">
			<div className="min-w-0 flex-1 md:ml-64 py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-6 sm:gap-10 pt-16 sm:pt-20">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
					<h1 className="text-2xl sm:text-3xl font-bold">Courses</h1>
					<AddCourseButton /> 
				</div>

				<CoursesTable courses={courses} />
			</div>
		</div>
	)
}
