'use client'

import { Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { UserDto } from '@/types'
import { cn } from '@/lib/utils'
import Logo from '@/components/layout/Logo'
import LogoutButton from '@/features/auth/components/LogoutButton'
import { WorkspaceSwitcher } from '@/features/dashboard/components/WorkspaceSwitcher'
import { workspaceNavItems } from '@/components/layout/navigation'

export default function DashboardSidebar({ user }: { user: UserDto | null }) {
	const pathname = usePathname()
	const workspace = pathname.startsWith('/admin')
		? 'admin'
		: pathname.startsWith('/instructor')
			? 'instructor'
			: 'student'
	const items = workspaceNavItems[workspace]

	return (
		<aside className="fixed inset-y-0 left-0 hidden w-64 shrink-0 flex-col border-r border-gray-200 bg-white md:flex">
			<div className="flex h-16 shrink-0 items-center border-b border-gray-200 px-4 sm:h-20">
				<Logo />
			</div>

			{user && user.role !== 'STUDENT' && (
				<div className="px-4 pt-5">
					<WorkspaceSwitcher user={user} />
				</div>
			)}

			<nav aria-label={`${workspace} navigation`} className="flex-1 space-y-2 overflow-y-auto px-4 pt-5">
				<p className="px-3 text-[10px] font-bold uppercase tracking-[.14em] text-muted-foreground">
					{workspace === 'instructor' ? 'Instructor' : workspace === 'admin' ? 'Admin' : 'Student'}
				</p>
				{items.map(({ href, label, icon: Icon }) => {
					const isActive = pathname === href
					return (
						<Link
							key={href}
							href={href}
							className={cn(
								'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900',
								isActive && 'bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]'
							)}
							aria-current={isActive ? 'page' : undefined}
						>
							{Icon && <Icon className="h-4 w-4" />}
							{label}
						</Link>
					)
				})}
			</nav>

			<div className="mt-auto shrink-0 space-y-2 border-t border-gray-100 py-3">
				<div className="px-4">
					<Link
						href="/dashboard/settings"
						className={cn(
							'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900',
							pathname === '/dashboard/settings' && 'bg-[#4338ca]/10 text-[#4338ca]'
						)}
					>
						<Settings className="h-4 w-4" />
						Settings
					</Link>
				</div>
				{user && <LogoutButton user={user} />}
			</div>
		</aside>
	)
}
