import AsideAdmin from '@/features/admin/components/AsideAdmin'
import InfoBoxDashboard from '@/features/dashboard/components/InfoBoxDashboard'
import MonthsCharts from '@/features/dashboard/components/MonthsCharts'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { prisma } from '@/lib/prisma'
import { BookOpen, Star, TrendingUp, Users } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getCurrentUser()
	const users = await prisma.user.findMany()
	const courses = await prisma.course.findMany()
  const enrollments = await prisma.enrollment.findMany({
    include: { course: { select: { price: true } } },
  })

	
  if (!user || user.role !== 'ADMIN') redirect('/dashboard/myCourses')

	const avgRating = courses.length > 0 ? Math.round((courses.reduce((sum, course) => sum + course.rating, 0) / courses.length) * 10) / 10 : 0

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const monthlyRevenue = enrollments
    .filter((e) => e.enrolledAt >= startOfMonth)
    .reduce((sum, e) => sum + e.course.price, 0)

  const months = Array.from({ length: 6 }, (_, i) => {
    const start = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1)

    const revenue = enrollments
      .filter((e) => e.enrolledAt >= start && e.enrolledAt < end)
      .reduce((sum, e) => sum + e.course.price, 0)

    return {
      id: i,
      name: start.toLocaleString('en-US', { month: 'short' }),
      value: revenue,
    }
  })

  return (
    <div className="flex">
      <AsideAdmin />
      <div className="py-8 sm:py-12 px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col mx-auto w-full gap-6 sm:gap-10">
        <div className="flex flex-col justify-start items-start gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <h2 className="text-gray-500 text-sm sm:text-base">
						Welcome back, Admin. Here&apos;s what&apos;s happening.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoBoxDashboard Icon={TrendingUp} count={monthlyRevenue} desc="Monthly Revenue" isMoney={true} />
          <InfoBoxDashboard Icon={Users} count={users.length} desc="Total Users" />
          <InfoBoxDashboard Icon={BookOpen} count={courses.length} desc="Active Courses" />
          <InfoBoxDashboard Icon={Star} count={avgRating} desc="Avg. Rating" />
        </div>

        <div className="bg-white border rounded-2xl p-6 gap-5 flex flex-col">
					<h1 className="font-bold text-xl">Revenue (last 6 months)</h1>
					<div className="flex justify-between items-center gap-4">
						<MonthsCharts data={months} />
					</div>
				</div>
      </div>
    </div>
  )
}