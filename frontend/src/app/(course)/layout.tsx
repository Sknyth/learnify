import Header from "@/components/layout/Header"
import { getCurrentUser } from "@/lib/get-current-user"

export default async function CoursesLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  return (
    <>
      <Header user={user} />
      <main className="flex-1 pt-16">
        {children}
      </main>
    </>
  )
}
