import Header from "@/components/layout/Header"
import { getCurrentUser } from "@/lib/getCurrentUser"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  return (
    <>
      <Header user={user} />
      <main className="flex-1 pt-16 sm:pt-20 bg-[#f8f9fc]">
        {children}
      </main>
    </>
  )
}
