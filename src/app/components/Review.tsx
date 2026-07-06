import { Star } from 'lucide-react'
import Image from 'next/image'

export default function Review() {
	return (
		<div className="flex flex-col items-start bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg w-full h-full transition-all duration-200 ease-in-out p-4 sm:p-6 gap-3 sm:gap-4">
			<div className="flex items-center gap-0.5">
				<Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
				<Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
				<Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
				<Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
				<Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
			</div>

			<p className="text-gray-700 text-sm sm:text-base flex-1">
				&quot;Learnify completely changed my career trajectory. The React course is the best I&apos;ve ever taken — practical, modern, and taught by someone who clearly builds real things.&quot;
			</p>

			<div className="flex items-center gap-3">
				<Image
					src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&auto=format"
					alt="Jordan Mitchell"
					width={40}
					height={40}
					className="rounded-full w-10 h-10 object-cover shrink-0"
				/>
				<div className="flex flex-col items-start gap-0.5">
					<span className="font-bold text-sm sm:text-base">Jordan Mitchell</span>
					<span className="text-gray-600 text-xs sm:text-sm">Senior Frontend Engineer @ Vercel</span>
				</div>
			</div>
		</div>
	)
}