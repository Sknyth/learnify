import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { getCurrentUser } from "@/lib/getCurrentUser"

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  return (
    <>
      <Header user={user} />
      <main className="flex-1 pt-16 sm:pt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}
