import { getCurrentUser } from '@/lib/getCurrentUser'
import DashboardNav from './NavDashboard'
import Logo from '@/components/layout/Logo'
import SettingsLink from './SettingsLink'
import { WorkspaceSwitcher } from './WorkspaceSwitcher'
import LogoutButton from '@/features/auth/components/LogoutButton'

export default async function AsideDashboard() {
  const user = await getCurrentUser()

  return (
    <aside className="hidden md:flex md:flex-col md:fixed md:top-0 md:left-0 w-64 shrink-0 bg-white border-r border-gray-200 h-screen">
      <div className="border-b border-gray-200 h-16 sm:h-20 flex items-center px-4">
        <Logo />
      </div>

      {user && user.role !== 'STUDENT' && (
        <div className="w-full px-4 pt-5">
          <WorkspaceSwitcher user={user} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto pt-4">
        <DashboardNav />
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <SettingsLink />
        <LogoutButton user={user} />
      </div>
    </aside>
  )
}
