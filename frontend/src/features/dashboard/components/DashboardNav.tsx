'use client'

import { BookOpen, Settings, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
	{ href: '/dashboard/myCourses', label: 'My Courses', icon: BookOpen },
	{ href: '/dashboard/profile', label: 'Profile', icon: Users },
	{ href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function DashboardNav() {
	const pathname = usePathname()

	return (
		<nav className="flex flex-col gap-2 px-4">
			{links.map(({ href, label, icon: Icon }) => {
				const isActive = pathname === href
				return (
					<Link
						key={href}
						href={href}
						className={cn(
							"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2",
							isActive && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
						)}
					>
						<Icon className="w-4 h-4" />
						{label}
					</Link>
				)
			})}
		</nav>
	)
}