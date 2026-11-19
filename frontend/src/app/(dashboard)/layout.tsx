import DashboardHeader from '@/components/layout/DashboardHeader'
import Aside from '@/components/layout/Aside'
import { getCurrentUser } from '@/lib/getCurrentUser'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  return (
    <>
      <DashboardHeader />
      <Aside user={user} />
      <main className="flex-1 bg-[#f8f9fc] pt-8">
        {children}
      </main>
    </>
  )
}
