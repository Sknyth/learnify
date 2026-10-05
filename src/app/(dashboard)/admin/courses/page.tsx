import AsideAdmin from '@/features/admin/components/AsideAdmin'
import CoursesTable from '@/features/admin/components/CoursesTable'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import AddCourseButton from '@/features/courses/components/AddCourseButton'

export default async function Page() {
	const user = await getCurrentUser()
	if (!user || user.role !== 'ADMIN') redirect('/dashboard/myCourses')

	const courses = await prisma.course.findMany({
	include: {
		_count: { select: { enrollments: true } },
		modules: {
			orderBy: { order: 'asc' },
			include: {
				lessons: { orderBy: { order: 'asc' } },
			},
		},
	},
	orderBy: { createdAt: 'desc' },
})

	return (
		<div className="flex flex-col md:flex-row">
			<AsideAdmin />
			<div className="min-w-0 py-6 sm:py-12 px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col mx-auto w-full gap-6 sm:gap-10">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
					<h1 className="text-2xl sm:text-3xl font-bold">Courses</h1>
					<AddCourseButton /> 
				</div>

				<CoursesTable courses={courses} />
			</div>
		</div>
	)
}
