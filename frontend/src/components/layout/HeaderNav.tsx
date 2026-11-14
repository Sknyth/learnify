"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import MobileNav from './MobileNav'

type HeaderUser = {
	id: string
	name: string
	email: string
	role: 'USER' | 'ADMIN'
} | null

export default function HeaderNav({ user }: { user: HeaderUser }) {
	const pathname = usePathname()

	const isActiveCourses = pathname === "/courses"
	const isDashboard = pathname.startsWith('/dashboard')
	const isAdmin = pathname.startsWith('/admin')

	return (
		<>
			<div className="hidden md:flex items-center gap-2">
				<Link href="/courses" className={cn(
					"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2",
					isActiveCourses && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
				)}>
					Courses
				</Link>
				{user && (
					<Link href="/dashboard/myCourses" className={cn(
						"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2",
						isDashboard && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
					)}>
						Dashboard
					</Link>
				)}
				{user?.role === 'ADMIN' && (
					<Link href="/admin/dashboard" className={cn(
						"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2",
						isAdmin && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
					)}>
						Admin
					</Link>
				)}
			</div>

			<div className="hidden md:flex items-center gap-2 lg:gap-4 min-w-0">
				{!user ? (
					<Link href="/signIn" className="text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2">Sign In</Link>
				) : (
					<div className="flex items-center gap-2 min-w-0">
						<div className="w-8 h-8 rounded-full bg-[#4f46e5] text-white flex items-center justify-center font-bold shrink-0">
							{user.name?.[0]?.toUpperCase() ?? "?"}
						</div>
						<span className="text-sm font-bold text-gray-600 truncate max-w-25 lg:max-w-none">
							{user.name}
						</span>
					</div>
				)}
				{!user && (
					<Link href="/signUp" className="text-sm font-bold text-white bg-[#4f46e5] hover:bg-[#4338ca] transition-colors rounded-lg px-4 py-2 shrink-0">Sign Up</Link>
				)}
			</div>

			<MobileNav user={user} />
		</>
	)
}
