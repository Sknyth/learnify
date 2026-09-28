'use client'

import { useUserStore } from '@/store/userStore'
import { BookOpen, Shield, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function AsideAdmin() {
	const user = useUserStore((state) => state.user)
	const pathname = usePathname()

	const isActiveDashboard = pathname === "/admin/dashboard"
	const isActiveUsers = pathname === "/admin/users"
	const isActiveSales = pathname === "/admin/sales"

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
		<aside className="hidden md:flex md:flex-col w-64 shrink-0 gap-6 bg-white border-r border-gray-200 sticky top-16 sm:top-20 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] self-start overflow-y-auto">
			<div className="flex items-center gap-2 px-4 pt-6">
				<div className="w-12 h-12 rounded-full bg-[#4f46e5] text-white flex items-center justify-center font-bold text-lg shrink-0">
					<Shield className="w-6 h-6" />
				</div>
				<div className="flex flex-col items-start gap-1 min-w-0">
					<span className="text font-bold text-gray-600 truncate">Admin Panel</span>
				</div>
			</div>

			<hr className="w-full" />

			<div className="flex flex-col gap-2 px-4">
				<Link href="/admin/dashboard" className={cn(
						"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer",
						isActiveDashboard && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
					)}>
					<BookOpen className="w-4 h-4" />
						Dashboard
				</Link>
				<Link href="/admin/users" className={cn(
						"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer",
						isActiveUsers && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
					)}>
					<BookOpen className="w-4 h-4" />
						Users
				</Link>
				<Link href="/admin/sales" className={cn(
						"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer",
						isActiveSales && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
					)}>
					<TrendingUp className="w-4 h-4" />
						Sales
				</Link>
			</div>
		</aside>
	)
}