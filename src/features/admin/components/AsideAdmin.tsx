import { Shield } from 'lucide-react'
import AdminNav from './AdminNav'

export default function AsideAdmin() {
	return (
		<aside className="hidden md:flex md:flex-col w-64 shrink-0 gap-6 bg-white border-r border-gray-200 sticky top-16 sm:top-20 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] self-start overflow-y-auto">
			<div className="flex items-center gap-2 px-4 pt-6">
				<div className="w-12 h-12 rounded-full bg-[#4f46e5] text-white flex items-center justify-center font-bold text-lg shrink-0">
					<Shield className="w-6 h-6" />
				</div>
				<div className="flex flex-col items-start gap-1 min-w-0">
					<span className="text font-bold text-gray-600 truncate">Admin Panel</span>
				</div>
			</div>

			<hr className="w-full" />
			<AdminNav />
		</aside>
	)
}
