import { getCurrentUser } from '@/lib/get-current-user'
import { redirect } from 'next/navigation'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  if (await getCurrentUser()) redirect('/dashboard/overview')

  return <>{children}</>
}
