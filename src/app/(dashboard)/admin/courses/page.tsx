import AsideAdmin from '@/components/AsideAdmin'
import CoursesTable from '@/components/CoursesTable'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function Page() {
	const user = await getCurrentUser()
	if (!user || user.role !== 'ADMIN') redirect('/dashboard/myCourses')

	const courses = await prisma.course.findMany({
		include: { enrollments: true },
		orderBy: { createdAt: 'desc' }
	})

	return (
		<div className="flex flex-col md:flex-row">
			<AsideAdmin />
			<div className="min-w-0 py-6 sm:py-12 px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col mx-auto w-full gap-6 sm:gap-10">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
					<h1 className="text-2xl sm:text-3xl font-bold">Courses</h1>
					<button
						type="button"
						className="text-white hover:bg-indigo-700 transition-colors bg-indigo-600 cursor-pointer w-full sm:w-auto h-11 sm:h-full px-6 font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
					>
						+ New Course
					</button>
				</div>

				<CoursesTable courses={courses} />
			</div>
		</div>
	)
}