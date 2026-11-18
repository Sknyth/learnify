'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

function formatSegment(segment: string) {
	return decodeURIComponent(segment)
		.replace(/[-_]/g, ' ')
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/^\w/, (c) => c.toUpperCase())
}

export default function DashboardHeader() {
	const pathname = usePathname()
	const segments = pathname.split('/').filter(Boolean)

	const crumbs = segments.map((segment, index) => ({
		label: formatSegment(segment),
		href: '/' + segments.slice(0, index + 1).join('/'),
	}))

	return (
		<header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center border-b border-gray-200 bg-white px-4 sm:h-20 sm:px-6 md:left-64 justify-between">
			<nav aria-label="Breadcrumb">
				<ol className="flex items-center gap-1.5 text-sm">
					{crumbs.map((crumb, index) => {
						const isLast = index === crumbs.length - 1
						const hasRoute = index > 0
						return (
							<li key={crumb.href} className="flex items-center gap-1.5">
								{index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
								{isLast ? (
									<span aria-current="page" className="font-semibold text-gray-800">{crumb.label}</span>
								) : hasRoute ? (
									<Link href={crumb.href} className="text-gray-500 hover:text-gray-800 transition-colors">
										{crumb.label}
									</Link>
								) : (
									<span className="text-gray-400">{crumb.label}</span>
								)}
							</li>
						)
					})}
				</ol>
			</nav>

			<Link href="/courses" className="h-10 items-center justify-center gap-2 rounded-[10px] px-4 text-sm font-semibold transition-all border border-border bg-card text-foreground hover:bg-muted hidden sm:inline-flex cursor-pointer">
				Browse courses
			</Link>
		</header>
	)
}
