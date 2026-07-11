import AsideDashboard from '@/components/AsideDashboard'
import InfoBoxDashboard from '@/components/InfoBoxDashboard'
import InfoCourseDashboard from '@/components/InfoCourseDashboard'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function Page() {
	const user = await getCurrentUser()

	if (!user) redirect('/signIn')

	const enrollments = await prisma.enrollment.findMany({
		where: { userId: user.id },
		include: {
			course: true,
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
					<InfoBoxDashboard />
					<InfoBoxDashboard />
					<InfoBoxDashboard />
				</div>

				<div className="flex flex-col gap-4">
					{enrollments.length === 0 ? (
						<p className="text-gray-500 text-sm">You haven&apos;t enrolled in any courses yet.</p>
					) : (
						enrollments.map((enrollment) => (
							<InfoCourseDashboard
								key={enrollment.id}
								title={enrollment.course.title}
								imageUrl={enrollment.course.imageUrl}
								lastLesson="—"
								progress={enrollment.progress}
								courseId={enrollment.course.id}
							/>
						))
					)}
				</div>
			</div>
		</div>
	)
}