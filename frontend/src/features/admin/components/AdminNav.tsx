"use client"

import { BookOpen, ChartNoAxesColumn, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function AdminNav() {
	const pathname = usePathname()

	const items = [
		{ href: "/admin/dashboard", label: "Dashboard", icon: ChartNoAxesColumn },
		{ href: "/admin/courses", label: "Courses", icon: BookOpen },
		{ href: "/admin/users", label: "Users", icon: Users },
		{ href: "/admin/sales", label: "Sales", icon: TrendingUp },
	]

	return (
		<div className="flex flex-col gap-2 px-4">
			{items.map((item) => {
				const Icon = item.icon
				const isActive = pathname === item.href

				return (
					<Link key={item.href} href={item.href} className={cn(
						"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer",
						isActive && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]"
					)}>
						<Icon className="w-4 h-4" />
						{item.label}
					</Link>
				)
			})}
		</div>
	)
}
