import { BookOpen } from 'lucide-react'
import MobileNav from './MobileNav'

export default function Header() {
	return (
		<header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 h-16 sm:h-20">
			<div className="h-full flex items-center justify-between px-8 sm:px-12 lg:px-24">
				<a href="#" className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
					<div className="w-8 h-8 rounded-lg bg-[#4f46e5] flex items-center justify-center shrink-0">
						<BookOpen className="w-4 h-4 text-white" strokeWidth={2} />
					</div>
					Learnify
				</a>

				<div className="hidden md:flex items-center gap-2">
					<a href="#" className="text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2">Courses</a>
					<a href="#" className="text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2">Dashboard</a>
					<a href="#" className="text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2">Admin</a>
				</div>

				<div className="hidden md:flex items-center gap-4">
					<a href="#" className="text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2">Login</a>
					<a href="#" className="text-sm font-bold text-white bg-[#4f46e5] hover:bg-[#4338ca] transition-colors rounded-lg px-4 py-2">Sign Up</a>
				</div>

				<MobileNav />
			</div>
		</header>
	)
}