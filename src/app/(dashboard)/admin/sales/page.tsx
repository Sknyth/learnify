import AsideAdmin from '@/components/AsideAdmin'
import SalesTable from '@/components/SalesTable'
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
		<div className="flex">
			<AsideAdmin />
			<div className="min-w-0 py-8 sm:py-12 px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col mx-auto w-full gap-6 sm:gap-10">
				<div className="flex flex-col justify-start items-start gap-1">
					<h1 className="text-2xl sm:text-3xl font-bold">Sales</h1>
					<h2 className="text-gray-500 text-sm sm:text-base">
						Revenue breakdown by course
					</h2>
				</div>

				<SalesTable courses={courses} />
			</div>
		</div>
	)
}