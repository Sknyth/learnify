import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Suspense } from "react"
import { getCurrentUser } from "@/lib/get-current-user"

async function MainHeader() {
  const user = await getCurrentUser()
  return <Header user={user} />
}

export default function MainLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Suspense>
        <MainHeader />
      </Suspense>
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </>
  )
}
