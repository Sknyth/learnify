import AsideAdmin from '@/features/admin/components/AsideAdmin'
import SalesTable from '@/features/admin/components/SalesTable'
import InfoBoxSales from '@/features/admin/components/InfoBoxSales'
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

	const enrollments = await prisma.enrollment.findMany({
		include: { course: { select: { price: true } } },
	})

	const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const monthlyRevenue = enrollments
    .filter((e) => e.enrolledAt >= startOfMonth)
    .reduce((sum, e) => sum + e.course.price, 0)

	const avgOrder = enrollments.length > 0 ? enrollments.reduce((sum, e) => sum + e.course.price, 0) / enrollments.length : 0

	const totalRevenue = enrollments.reduce((sum, e) => sum + e.course.price, 0)

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

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
					<InfoBoxSales title={"Total Revenue"} count={totalRevenue} desc={"all time"} />
					<InfoBoxSales title={"This Month"} count={monthlyRevenue} desc={new Date().toLocaleDateString('en-US', {
						month: 'short',
						year: 'numeric'
					})} />
					<InfoBoxSales title={"Avg. Order"} count={avgOrder} desc={"all time"} />
				</div>

				<SalesTable courses={courses} />
			</div>
		</div>
	)
}