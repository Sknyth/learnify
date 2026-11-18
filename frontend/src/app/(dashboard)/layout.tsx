import DashboardHeader from '@/components/layout/DashboardHeader'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <DashboardHeader />
      <main className="flex-1 bg-[#f8f9fc] pt-8">
        {children}
      </main>
    </>
  )
}
