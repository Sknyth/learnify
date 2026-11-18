'use client'

import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
	{ href: '/instructor/overview', label: 'Overview', icon: LayoutDashboard },
]

export default function NavInstructor() {
	const pathname = usePathname()

	return (
		<nav className="flex flex-col gap-2 px-4">
			<p className="px-3 text-[10px] font-bold uppercase tracking-[.14em] text-muted-foreground">Menu</p>
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