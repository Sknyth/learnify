"use client"

import { Menu, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from '@/lib/utils'
import Logo from './Logo'
import { useState } from 'react'
import { adminNavItems, dashboardNavItems, primaryNavItems, type NavItem } from './navigation'

type MobileNavUser = {
	id: string
	name: string
	email: string
	role: 'USER' | 'ADMIN'
} | null

function MobileNavLink({
	item,
	pathname,
	onNavigate,
	withIcon = false,
}: {
	item: NavItem
	pathname: string
	onNavigate: () => void
	withIcon?: boolean
}) {
	const Icon = item.icon
	const isActive = pathname === item.href

	return (
		<Link
			href={item.href}
			className={cn(
				"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2",
				!withIcon && "py-3",
				isActive && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
			)}
			onClick={onNavigate}
		>
			{withIcon && Icon && <Icon className="w-4 h-4" />}
			{item.label}
		</Link>
	)
}

export default function MobileNav({ user }: { user: MobileNavUser }) {
	const router = useRouter()
	const pathname = usePathname()
	const [open, setOpen] = useState(false)

	async function handleLogout() {
		setOpen(false)
		await fetch("/api/auth/logout", { method: "POST" })
		router.push("/")
		router.refresh()
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
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
					{primaryNavItems.map((item) => (
						<MobileNavLink key={item.href} item={item} pathname={pathname} onNavigate={() => setOpen(false)} />
					))}

					<div className="h-px bg-gray-200 my-2" />

					{user ? (
						<>
							<div className="flex items-center gap-2 px-4 py-2">
								<div className="w-8 h-8 rounded-full bg-[#4f46e5] text-white flex items-center justify-center font-bold shrink-0">
									{user.name?.[0]?.toUpperCase() ?? "?"}
								</div>
								<span className="text-sm font-bold text-gray-700 truncate">{user.name}</span>
							</div>

							<span className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 pb-1">
								Dashboard
							</span>
							{dashboardNavItems.map((item) => (
								<MobileNavLink
									key={item.href}
									item={item}
									pathname={pathname}
									onNavigate={() => setOpen(false)}
									withIcon
								/>
							))}

							{user.role === 'ADMIN' && (
								<>
									<div className="h-px bg-gray-200 my-2" />
									<span className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 pb-1">
										Admin
									</span>
									{adminNavItems.map((item) => (
										<MobileNavLink
											key={item.href}
											item={item}
											pathname={pathname}
											onNavigate={() => setOpen(false)}
											withIcon
										/>
									))}
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
							<Link
							 href="/signIn" className="text-sm font-bold text-center text-gray-600 border border-gray-300 hover:border-gray-400 transition-colors rounded-lg px-4 py-3"
							 onClick={() => setOpen(false)}>
								Sign In
							</Link>
							<Link 
							href="/signUp" className="text-sm font-bold text-center text-white bg-[#4f46e5] hover:bg-[#4338ca] transition-colors rounded-lg px-4 py-3"
							onClick={() => setOpen(false)}>
								Sign Up
							</Link>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
