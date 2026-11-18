import { getCurrentUser } from '@/lib/getCurrentUser'
import Logo from '@/components/layout/Logo'
import LogoutButton from '@/features/auth/components/LogoutButton'
import AdminNav from './AdminNav'
import { WorkspaceSwitcher } from '@/features/dashboard/components/WorkspaceSwitcher'
import SettingsLink from '@/features/dashboard/components/SettingsLink'

export default async function AsideAdmin() {
	const user = await getCurrentUser()

	return (
		<aside className="hidden md:flex md:flex-col md:fixed md:top-0 md:left-0 w-64 shrink-0 bg-white border-r border-gray-200 h-screen">
			<div className="border-b border-gray-200 h-16 sm:h-20 flex items-center px-4">
				<Logo />
			</div>

			<div className="w-full px-4 pt-5 pb-4">
        {user && <WorkspaceSwitcher user={user} />}
      </div>

			<div className="flex-1 overflow-y-auto">
				<AdminNav />
			</div>

			<div className="mt-auto flex flex-col gap-2">
        <SettingsLink />
        <LogoutButton user={user} />
      </div>
		</aside>
	)
}
