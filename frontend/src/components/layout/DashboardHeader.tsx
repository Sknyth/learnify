
import Link from 'next/link'
import MobileNav from './MobileNav'
import type { UserDto } from '@/types'
import DashboardBreadcrumbs from '@/components/layout/DashboardBreadcrumbs'

export default function DashboardHeader({ user }: { user: UserDto | null }) {
	return (
		<header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center border-b border-gray-200 bg-white px-4 sm:h-20 sm:px-6 md:left-64 justify-between">
			<DashboardBreadcrumbs />

			<Link href="/courses" className="hidden rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:inline-flex">
				Browse courses
			</Link>

			<MobileNav user={user} />
		</header>
	)
}
