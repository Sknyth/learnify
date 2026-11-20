import DashboardMetricCard from '@/features/dashboard/components/DashboardMetricCard'
import InstructorSalesOverview from '@/features/instructor/components/InstructorSalesOverview'
import { summarizeInstructorSales } from '@/features/instructor/lib/summarize-instructor-sales'
import { getCurrentUser } from '@/lib/get-current-user'
import { serverFetch } from '@/lib/server-api'
import type { CourseDto, StudentEnrollmentDto } from '@/types'
import { ArrowRight, BookOpen, CircleDollarSign, Users } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function fetchOverviewData<T>(path: string): Promise<T> {
  const response = await serverFetch(path)
  if (!response.ok) throw new Error(`Overview request failed: ${path} (${response.status})`)
  return response.json()
}

export default async function InstructorOverviewPage() {
  const user = await getCurrentUser()

  if (!user || (user.role !== 'ADMIN' && user.role !== 'INSTRUCTOR')) redirect('/')

  const [enrollments, courses] = await Promise.allSettled([
    fetchOverviewData<StudentEnrollmentDto[]>('/api/enrollments/students'),
    fetchOverviewData<CourseDto[]>('/api/courses/mine'),
  ])
  const summary = enrollments.status === 'fulfilled' ? summarizeInstructorSales(enrollments.value, new Date()) : null
  if (enrollments.status === 'rejected') console.error(enrollments.reason)
  if (courses.status === 'rejected') console.error(courses.reason)

  return (
    <div className="flex">
      <div className="min-w-0 flex-1 md:ml-64 px-4 pb-8 pt-16 sm:px-8 sm:pb-12 sm:pt-20 lg:px-12 xl:px-16">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4 sm:mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl">Overview</h1>
          <Link href="/instructor/myCourses" className="inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
            My courses <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </header>

        {(enrollments.status === 'rejected' || courses.status === 'rejected') && (
          <p role="status" className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {enrollments.status === 'rejected' && courses.status === 'rejected'
              ? 'Overview data could not be loaded.'
              : enrollments.status === 'rejected'
                ? 'Enrollment data could not be loaded.'
                : 'The course count could not be loaded.'} Refresh the page to try again.
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {summary && <DashboardMetricCard Icon={CircleDollarSign} count={summary.totalRevenue} desc="Estimated revenue · All time" isMoney />}
          {enrollments.status === 'fulfilled' && <DashboardMetricCard Icon={Users} count={enrollments.value.length} desc="Enrollments · All time" />}
          {courses.status === 'fulfilled' && <DashboardMetricCard Icon={BookOpen} count={courses.value.length} desc="My courses" />}
        </div>

        {summary && <InstructorSalesOverview months={summary.months} topCourses={summary.topCourses} />}
      </div>
    </div>
  )
}
