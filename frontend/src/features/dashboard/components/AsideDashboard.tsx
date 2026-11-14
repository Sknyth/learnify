import LogoutButton from '@/features/auth/components/LogoutButton'
import { getCurrentUser } from '@/lib/getCurrentUser'
import DashboardNav from './DashboardNav'

export default async function AsideDashboard() {
	const user = await getCurrentUser()

	return (
		<aside className="hidden md:flex md:flex-col w-64 shrink-0 gap-6 bg-white border border-gray-200">
			<div className="flex items-center gap-2 px-4 pt-6">
				<div className="w-12 h-12 rounded-full bg-[#4f46e5] text-white flex items-center justify-center font-bold text-lg shrink-0">
					{user?.name?.[0]?.toUpperCase() ?? "?"}
				</div>
				<div className="flex flex-col items-start gap-1 min-w-0">
					<span className="text font-bold text-gray-600 truncate">{user?.name}</span>
					<span className="text-sm text-gray-400 truncate">{user?.email}</span>
				</div>
			</div>

			<hr className="w-full" />

			<DashboardNav />

			<hr className="w-full" />

			<div className="flex flex-col gap-2 px-4">
				<LogoutButton />
			</div>
		</aside>
	)
}