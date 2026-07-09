'use client'

import { useUserStore } from '@/store/userStore'
import { BookOpen, Settings, Users } from 'lucide-react'
import LogoutButton from './LogoutButton'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function AsideDashboard() {
	const user = useUserStore((state) => state.user)
	const pathname = usePathname()

	const isActiveMyCourses = pathname === "/dashboard/myCourses"
	const isActiveProfile = pathname === "/dashboard/profile"
	const isActiveSettings = pathname === "/dashboard/settings"

	if (!user) {
		return (
			<aside className="w-64 shrink-0 items-start justify-start gap-6 px-4 py-12 bg-white border border-gray-200">
				<div className="flex items-center gap-2">
					<span className="text-sm font-bold text-gray-600">Not logged in</span>
				</div>
			</aside>
		)
	}

	return (
		<aside className="hidden md:flex md:flex-col w-64 shrink-0 gap-6 bg-white border border-gray-200">
			<div className="flex items-center gap-2 px-4 pt-6">
				<div className="w-12 h-12 rounded-full bg-[#4f46e5] text-white flex items-center justify-center font-bold text-lg shrink-0">
					{user.name?.[0]?.toUpperCase() ?? "?"}
				</div>
				<div className="flex flex-col items-start gap-1 min-w-0">
					<span className="text font-bold text-gray-600 truncate">{user.name}</span>
					<span className="text-sm text-gray-400 truncate">{user.email}</span>
				</div>
			</div>

			<hr className="w-full" />

			<div className="flex flex-col gap-2 px-4">
				<Link href="/dashboard/myCourses" className={cn(
						"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer",
						isActiveMyCourses && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
					)}>
					<BookOpen className="w-4 h-4" />
					My Courses
				</Link>
				<Link href="/dashboard/profile" className={cn(
						"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer",
						isActiveProfile && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
					)}>
					<Users className="w-4 h-4" />
					Profile
				</Link>
				<Link href="/dashboard/settings" className={cn(
						"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer",
						isActiveSettings && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
					)}>
					<Settings className="w-4 h-4" />
					Settings
				</Link>
			</div>

			<hr className="w-full" />

			<div className="flex flex-col gap-2 px-4">
				<LogoutButton />
			</div>
		</aside>
	)
}