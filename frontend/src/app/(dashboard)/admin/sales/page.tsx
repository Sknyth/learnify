import CourseSalesTable from '@/features/admin/components/CourseSalesTable'
import SalesMetricCard from '@/features/admin/components/SalesMetricCard'
import { getCurrentUser } from '@/lib/get-current-user'
import { redirect } from 'next/navigation'
import { CourseSalesDto, MyEnrollmentDto } from '@/types'
import { serverFetch } from '@/lib/server-api'
import { serverGet } from './actions'

async function getEnrollments(): Promise<MyEnrollmentDto[]> {
	try {
		const res = await serverFetch('/api/enrollments')
		if (!res.ok) throw new Error('Failed to fetch enrollments')
		return res.json()
	} catch (error) {
		console.error('Error fetching enrollments:', error)
		return []
	}
}

export default async function AdminSalesPage() {
	const user = await getCurrentUser()
	if (!user || user.role !== 'ADMIN') redirect('/dashboard/overview')

	const courses = await serverGet<CourseSalesDto[]>('/api/courses/sales', [])

	const enrollments = await getEnrollments()

	const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const monthlyRevenue = enrollments
    .filter((e) => new Date(e.enrolledAt) >= startOfMonth)
    .reduce((sum, e) => sum + e.course.price, 0)

	const avgOrder = enrollments.length > 0 ? enrollments.reduce((sum, e) => sum + e.course.price, 0) / enrollments.length : 0

	const totalRevenue = enrollments.reduce((sum, e) => sum + e.course.price, 0)

	return (
		<div className="flex">
			<div className="min-w-0 flex-1 md:ml-64 py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-6 sm:gap-10 pt-16 sm:pt-20">
				<div className="flex flex-col justify-start items-start gap-1">
					<h1 className="text-2xl sm:text-3xl font-bold">Sales</h1>
					<h2 className="text-gray-500 text-sm sm:text-base">
						Revenue breakdown by course
					</h2>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
					<SalesMetricCard title={"Total Revenue"} count={totalRevenue} desc={"all time"} />
					<SalesMetricCard title={"This Month"} count={monthlyRevenue} desc={new Date().toLocaleDateString('en-US', {
						month: 'short',
						year: 'numeric'
					})} />
					<SalesMetricCard title={"Avg. Order"} count={avgOrder} desc={"all time"} />
				</div>

				<CourseSalesTable courses={courses} />
			</div>
		</div>
	)
}
