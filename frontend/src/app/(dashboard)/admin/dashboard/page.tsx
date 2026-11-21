import DashboardMetricCard from '@/features/dashboard/components/DashboardMetricCard'
import MonthlyRevenueChart from '@/features/admin/components/MonthlyRevenueChart'
import { requireUser } from '@/lib/get-current-user'
import { serverFetch } from '@/lib/server-api'
import { CourseDto, EnrollmentDto, UserDto } from '@/types'
import { BookOpen, Star, TrendingUp, Users } from 'lucide-react'

async function getCourses(): Promise<CourseDto[]> {
	try {
		const res = await serverFetch('/api/courses')
		if (!res.ok) throw new Error('Failed to fetch courses')
		return res.json()
	} catch (error) {
		console.error('Error fetching courses:', error)
		return []
	}
}

async function getUsers(): Promise<UserDto[]> {
  try {
    const res = await serverFetch('/api/users')
    if (!res.ok) throw new Error('Failed to fetch users')
    return res.json()
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

async function getEnrollments(): Promise<EnrollmentDto[]> {
  try {
    const res = await serverFetch('/api/enrollments')
    if (!res.ok) throw new Error(`Failed to fetch enrollments: ${res.status}`)
    return res.json()
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return []
  }
}

export default async function AdminDashboardPage() {
  await requireUser('ADMIN')

  const [users, courses, enrollments] = await Promise.all([
    getUsers(),
    getCourses(),
    getEnrollments(),
  ])

	const avgRating = courses.length > 0 ? Math.round((courses.reduce((sum, course) => sum + course.rating, 0) / courses.length) * 10) / 10 : 0

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const monthlyRevenue = enrollments
    .filter((e) => new Date(e.enrolledAt) >= startOfMonth)
    .reduce((sum, e) => sum + (e.course?.price ?? 0), 0)

  const months = Array.from({ length: 6 }, (_, i) => {
    const start = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1)

    const revenue = enrollments
      .filter((e) => {
        const d = new Date(e.enrolledAt)
        return d >= start && d < end
      })
      .reduce((sum, e) => sum + (e.course?.price ?? 0), 0)

    return {
      id: i,
      name: start.toLocaleString('en-US', { month: 'short' }),
      value: revenue,
    }
  })

  return (
    <div className="flex">
      <div className="min-w-0 flex-1 md:ml-64 py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-6 sm:gap-10 pt-16 sm:pt-20">
        <div className="flex flex-col justify-start items-start gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Overview</h1>
          <h2 className="text-gray-500 text-sm sm:text-base">
						Welcome back, Admin. Here&apos;s what&apos;s happening.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardMetricCard Icon={TrendingUp} count={monthlyRevenue} desc="Monthly Revenue" isMoney={true} />
          <DashboardMetricCard Icon={Users} count={users.length} desc="Total Users" />
          <DashboardMetricCard Icon={BookOpen} count={courses.length} desc="Active Courses" />
          <DashboardMetricCard Icon={Star} count={avgRating} desc="Avg. Rating" />
        </div>

        <div className="bg-white border rounded-2xl p-6 gap-5 flex flex-col">
					<h1 className="font-bold text-xl">Revenue (last 6 months)</h1>
					<div className="flex justify-between items-center gap-4">
						<MonthlyRevenueChart data={months} />
					</div>
				</div>
      </div>
    </div>
  )
}
