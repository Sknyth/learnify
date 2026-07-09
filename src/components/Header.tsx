'use client'

import MobileNav from './MobileNav'
import Logo from './Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import { cn } from '@/lib/utils'

export default function Header() {
	const user = useUserStore((state) => state.user)
	const pathname = usePathname()

	const isActiveCourses = pathname === "/courses"
	const isDashboard = pathname.startsWith('/dashboard')

	return (
		<header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 h-16 sm:h-20">
			<div className="h-full flex items-center justify-between px-8 sm:px-12 lg:px-24">

				<Logo />

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

				<MobileNav />
			</div>
		</header>
	)
}