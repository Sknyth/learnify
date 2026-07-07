'use client'

import MobileNav from './MobileNav'
import Logo from './Logo'
import Link from 'next/link'
import { useUserStore } from '@/store/userStore'

export default function Header() {
	const user = useUserStore((state) => state.user)
	
	return (
		<header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 h-16 sm:h-20">
			<div className="h-full flex items-center justify-between px-8 sm:px-12 lg:px-24">

				<Logo />

				<div className="hidden md:flex items-center gap-2">
					<Link href="/courses" className="text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2">Courses</Link>
					{user && (<Link href="dashboard" className="text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2">Dashboard</Link>
					)}
					{/* <a href="#" className="text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2">Admin</a> */}
				</div>

				<div className="hidden md:flex items-center gap-4">
					{
						!user ? 
						<Link href="/signIn" className="text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2">Sign In</Link> :
						<div className="flex items-center gap-2"> 
							<div className="w-8 h-8 rounded-full bg-[#4f46e5] text-white flex items-center justify-center font-bold"> 
								{user.name[0].toUpperCase()}
							</div>
							<span className="text-sm font-bold text-gray-600">{user.name}</span>
						</div> 

					}
					{!user && <Link href="/signUp" className="text-sm font-bold text-white bg-[#4f46e5] hover:bg-[#4338ca] transition-colors rounded-lg px-4 py-2">Sign Up</Link>}
				</div>

				<MobileNav />
			</div>
		</header>
	)
}