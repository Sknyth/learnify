import { BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function Logo() {
	return (
		<div>
			<Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
				<div className="w-8 h-8 rounded-lg bg-[#4f46e5] flex items-center justify-center shrink-0">
					<BookOpen className="w-4 h-4 text-white" strokeWidth={2} />
				</div>
				Learnify
			</Link>
		</div>
	)
}
