import AsideAdmin from '@/components/AsideAdmin'
import InfoBoxDashboard from '@/components/InfoBoxDashboard'
import MonthsCharts from '@/components/MonthsCharts'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { prisma } from '@/lib/prisma'
import { BookOpen, Star, TrendingUp, Users } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getCurrentUser()
	const users = await prisma.user.findMany()
	const courses = await prisma.course.findMany()

	const months = [
    { id: 1, name: 'Jan', value: 11 },
    { id: 2, name: 'Feb', value: 18 },
    { id: 3, name: 'Mar', value: 24 },
		{ id: 4, name: 'Apr', value: 45 },
		{ id: 5, name: 'May', value: 34 },
		{ id: 6, name: 'Jun', value: 39 },
  ];
	
  if (!user || user.role !== 'ADMIN') redirect('/dashboard/myCourses')

	const avgRating = courses.length > 0 ? Math.round((courses.reduce((sum, course) => sum + course.rating, 0) / courses.length) * 10) / 10 : 0


  return (
    <div className="flex min-h-screen">
      <AsideAdmin />
      <div className="py-8 sm:py-12 px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col mx-auto w-full gap-6 sm:gap-10">
        <div className="flex flex-col justify-start items-start gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <h2 className="text-gray-500 text-sm sm:text-base">
						Welcome back, Admin. Here&apos;s what&apos;s happening.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoBoxDashboard Icon={TrendingUp} count={38700} desc="Monthly Revenue" isMoney={true} />
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