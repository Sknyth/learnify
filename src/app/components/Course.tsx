import { Star } from 'lucide-react'
import Image from 'next/image'

export default function Course() {
	return (
		<div className="flex flex-col items-start bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg w-full cursor-pointer group hover:scale-[1.01] hover:translate-y-[-2px] transition-all duration-300 ease-in-out">

			<div className="w-full h-44 overflow-hidden">
				<Image 
					src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop&auto=format" 
					alt="Full-Stack React & Node.js" 
					height={340} 
					width={600} 
					className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
				/>
			</div>

			<div className="flex flex-col items-start p-4 gap-2 w-full">
				<div className="flex items-start gap-2 w-full">
					<span className="bg-[#4f46e5]/10 text-[#4f46e5] text-xs font-bold px-2 py-1 rounded-full">
						Web Dev
					</span>
					<span className="text-gray-300 text-sm font-bold">
						Intermediate
					</span>
				</div>

				<h1 className="text-lg font-bold text-gray-900 m-0 p-0 transition-colors group-hover:text-[#4f46e5]">
					Full-Stack React & Node.js
				</h1>

				<h2 className="text-sm text-gray-600 m-0 p-0">
					by Sarah Chen
				</h2>
				
				<div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-0.5">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </div>
          <span className="font-bold text-sm">4.9/5</span>
					<span className="text-gray-400 text-sm">(12,490)</span>
        </div>

				<div className="flex items-center justify-between w-full pt-2">
					<h2 className="text-xl font-bold text-gray-900">$89</h2>
					<a href="#" className="text-sm font-bold text-white bg-[#4f46e5] hover:bg-[#4338ca] transition-colors rounded-xl px-2 py-2">View Course</a>
				</div>

			</div>
		</div>
	)
}