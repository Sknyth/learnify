import DashboardHeader from '@/components/layout/DashboardHeader'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import { getCurrentUser } from '@/lib/get-current-user'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  return (
    <>
      <DashboardHeader user={user} />
      <DashboardSidebar user={user} />
      <main className="flex-1 bg-[#f8f9fc] pt-8">
        {children}
      </main>
    </>
  )
}
