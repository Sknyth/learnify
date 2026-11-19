
import Link from 'next/link'
import MobileNav from './MobileNav'
import { getCurrentUser } from '@/lib/getCurrentUser'
import BreadCrumb from './BreadCrumb'


export default async function DashboardHeader() {
	const user = await getCurrentUser()

	return (
		<header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center border-b border-gray-200 bg-white px-4 sm:h-20 sm:px-6 md:left-64 justify-between">
			
			<BreadCrumb />

			<Link href="/courses" className="h-10 items-center justify-center gap-2 rounded-[10px] px-4 text-sm font-semibold transition-all border border-border bg-card text-foreground hover:bg-muted hidden md:inline-flex cursor-pointer">
				Browse courses
			</Link>

			<MobileNav user={user} />
		</header>
	)
}
