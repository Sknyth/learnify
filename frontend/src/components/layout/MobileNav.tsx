"use client"

import { LayoutDashboard, LogOut, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { WorkspaceSwitcher } from '@/features/dashboard/components/WorkspaceSwitcher'
import type { UserDto } from '@/types'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import Logo from './Logo'
import { adminNavItems, dashboardNavItems, primaryNavItems, type NavItem } from './navigation'

type MobileNavUser = {
	id: string
	name: string
	email: string
	role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN'
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
				'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900',
				!withIcon && 'py-2.5',
				isActive && 'bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]'
			)}
			onClick={onNavigate}
		>
			{withIcon && Icon && <Icon className="h-5 w-5 shrink-0" />}
			<span>{item.label}</span>
		</Link>
	)
}

export default function MobileNav({ user }: { user: MobileNavUser }) {
	const router = useRouter()
	const pathname = usePathname()
	const [open, setOpen] = useState(false)
	const activeWorkspace = pathname.startsWith('/admin')
		? 'admin'
		: pathname.startsWith('/instructor')
			? 'instructor'
			: 'student'

	async function handleLogout() {
		setOpen(false)
		try {
			const response = await fetch('/api/auth/logout', { method: 'POST' })
			if (!response.ok) {
				toast.error('Не удалось выйти из аккаунта')
				return
			}

			router.push('/')
			router.refresh()
		} catch {
			toast.error('Не удалось выполнить запрос. Попробуйте ещё раз.')
		}
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger
				render={
					<button className="-mr-2 rounded-lg p-2 transition-colors hover:bg-gray-50 md:hidden" aria-label="Toggle menu">
						<Menu className="h-6 w-6" />
					</button>
				}
			/>
			<SheetContent side="right" className="w-[min(88vw,24rem)] gap-0 overflow-hidden p-0">
				<SheetHeader className="shrink-0 border-b border-gray-100 px-5 py-5">
					<Logo />
				</SheetHeader>

				<div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
					<div className="flex flex-col gap-5 px-5 py-5">
						<nav aria-label="Main navigation" className="flex flex-col gap-1">
							{primaryNavItems.map((item) => (
								<MobileNavLink key={item.href} item={item} pathname={pathname} onNavigate={() => setOpen(false)} />
							))}
						</nav>

						{user ? (
							<>
								<div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4f46e5] font-bold text-white">
										{user.name?.[0]?.toUpperCase() ?? '?'}
									</div>
									<div className="min-w-0">
										<p className="truncate text-sm font-bold text-gray-900">{user.name}</p>
										<p className="truncate text-xs text-gray-500">{user.email}</p>
									</div>
								</div>

								{user.role !== 'STUDENT' && <WorkspaceSwitcher user={user as UserDto} />}

								<nav aria-label="Workspace navigation" className="flex flex-col gap-2">
									<span className="px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
										{activeWorkspace === 'instructor' ? 'Instructor' : activeWorkspace === 'admin' ? 'Admin' : 'Student'}
									</span>
									{activeWorkspace === 'student' && dashboardNavItems.map((item) => (
										<MobileNavLink key={item.href} item={item} pathname={pathname} onNavigate={() => setOpen(false)} withIcon />
									))}
									{activeWorkspace === 'instructor' && (
										<MobileNavLink
											item={{ href: '/instructor/overview', label: 'Overview', icon: LayoutDashboard }}
											pathname={pathname}
											onNavigate={() => setOpen(false)}
											withIcon
										/>
									)}
									{activeWorkspace === 'admin' && user.role === 'ADMIN' && adminNavItems.map((item) => (
										<MobileNavLink key={item.href} item={item} pathname={pathname} onNavigate={() => setOpen(false)} withIcon />
									))}
								</nav>
							</>
						) : (
							<div className="flex flex-col gap-2 pt-1">
								<Link href="/signIn" className="rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50" onClick={() => setOpen(false)}>
									Sign In
								</Link>
								<Link href="/signUp" className="rounded-xl bg-[#4f46e5] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#4338ca]" onClick={() => setOpen(false)}>
									Sign Up
								</Link>
							</div>
						)}
					</div>
				</div>

				{user && (
					<div className="shrink-0 border-t border-gray-100 bg-white p-4">
						<button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50">
							<LogOut className="h-4 w-4" />
							Log Out
						</button>
					</div>
				)}
			</SheetContent>
		</Sheet>
	)
}
