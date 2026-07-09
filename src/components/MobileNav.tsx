"use client"

import { BookOpen, Menu, Settings, Users, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useUserStore } from '@/store/userStore'
import { cn } from '@/lib/utils'
import Logo from './Logo'

export default function MobileNav() {
	const user = useUserStore((state) => state.user)
	const clearUser = useUserStore((state) => state.clearUser)
	const router = useRouter()
	const pathname = usePathname()

	const isDashboard = pathname.startsWith('/dashboard')
	const isActiveCourses = pathname === "/courses"
	const isActiveMyCourses = pathname === "/dashboard/myCourses"
	const isActiveProfile = pathname === "/dashboard/profile"
	const isActiveSettings = pathname === "/dashboard/settings"

	async function handleLogout() {
		await fetch("/api/auth/logout", { method: "POST" })
		clearUser()
		router.push("/")
		router.refresh()
	}

	return (
		<Sheet>
			<SheetTrigger
				render={
					<button className="md:hidden p-2 -mr-2 rounded-lg hover:bg-gray-50 transition-colors" aria-label="Toggle menu">
						<Menu className="w-6 h-6" />
					</button>
				}
			/>
			<SheetContent side="right" className="w-72">
				<SheetHeader>
					<Logo />
				</SheetHeader>

				<div className="flex flex-col gap-1 px-4">
					<Link href="/courses" className={cn(
							"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-3",
							isActiveCourses && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
						)}>
						Courses
					</Link>
					{user && (
						<Link href="/dashboard/myCourses" className={cn(
								"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-3",
								isDashboard && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
							)}>
							Dashboard
						</Link>
					)}

					<div className="h-px bg-gray-200 my-2" />

					{user ? (
						<>
							<div className="flex items-center gap-2 px-4 py-2">
								<div className="w-8 h-8 rounded-full bg-[#4f46e5] text-white flex items-center justify-center font-bold shrink-0">
									{user.name?.[0]?.toUpperCase() ?? "?"}
								</div>
								<span className="text-sm font-bold text-gray-700 truncate">{user.name}</span>
							</div>

							{isDashboard && (
								<>
									<Link href="/dashboard/myCourses" className={cn(
											"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2",
											isActiveMyCourses && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
										)}>
										<BookOpen className="w-4 h-4" />
										My Courses
									</Link>
									<Link href="/dashboard/profile" className={cn(
											"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2",
											isActiveProfile && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
										)}>
										<Users className="w-4 h-4" />
										Profile
									</Link>
									<Link href="/dashboard/settings" className={cn(
											"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2",
											isActiveSettings && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
										)}>
										<Settings className="w-4 h-4" />
										Settings
									</Link>
								</>
							)}

							<div className="h-px bg-gray-200 my-2" />

							<button
								onClick={handleLogout}
								className="text-sm font-bold text-red-600 hover:bg-red-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2 text-left"
							>
								<LogOut className="w-4 h-4" />
								Log Out
							</button>
						</>
					) : (
						<div className="flex flex-col gap-2">
							<Link href="/signIn" className="text-sm font-bold text-center text-gray-600 border border-gray-300 hover:border-gray-400 transition-colors rounded-lg px-4 py-3">
								Sign In
							</Link>
							<Link href="/signUp" className="text-sm font-bold text-center text-white bg-[#4f46e5] hover:bg-[#4338ca] transition-colors rounded-lg px-4 py-3">
								Sign Up
							</Link>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}