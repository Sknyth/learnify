import Header from "@/components/Header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 sm:pt-20 min-h-screen bg-[#f8f9fc]">
        {children}
      </main>
    </>
  )
}