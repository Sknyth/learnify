import InfoBoxDashboard from '@/features/dashboard/components/InfoBoxDashboard'
import AsideInstructor from '@/features/instructor/components/AsideInstructor'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { BookOpen, Clock, Medal } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getCurrentUser()

  if (!user) redirect('/')

  return (
    <div className="flex">
      <AsideInstructor />
      <div className="min-w-0 flex-1 md:ml-64 py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-6 sm:gap-10 pt-16 sm:pt-20">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-2xl sm:text-3xl font-bold">Overview</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* <InfoBoxDashboard Icon={BookOpen} count={enrollments.length} desc="Courses" /> */}
          <InfoBoxDashboard Icon={Clock} count={0} desc="Hours watched" />
          {/* <InfoBoxDashboard Icon={Medal} count={completedCourses} desc="Certificates" /> */}
        </div>

      </div>
    </div>
  )
}
