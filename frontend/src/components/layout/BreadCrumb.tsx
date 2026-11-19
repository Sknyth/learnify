'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function formatSegment(segment: string) {
	return decodeURIComponent(segment)
		.replace(/[-_]/g, ' ')
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/^\w/, (c) => c.toUpperCase())
}

export default function BreadCrumb() {

	const pathname = usePathname()
	const segments = pathname.split('/').filter(Boolean)

	const crumbs = segments.map((segment, index) => ({
		label: formatSegment(segment),
		href: '/' + segments.slice(0, index + 1).join('/'),
	}))

	return (
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
		)
}
