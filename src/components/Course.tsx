import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Course as CourseType } from '@/store/coursesStore'

export default function Course({ course }: { course: CourseType }) {
	return (
		<Link
			// href={`/courses/${course.id}`}
			href="#"
			className="flex flex-col items-start bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg w-full cursor-pointer group hover:scale-[1.01] hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
		>
			<div className="w-full h-44 overflow-hidden">
				<Image
					src={course.imageUrl}
					alt={course.title}
					height={340}
					width={600}
					className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
				/>
			</div>

			<div className="flex flex-col items-start p-4 gap-2 w-full">
				<div className="flex items-start gap-2 w-full">
					<span className="bg-[#4f46e5]/10 text-[#4f46e5] text-xs font-bold px-2 py-1 rounded-full">
						{course.category}
					</span>
					<span className="text-gray-300 text-sm font-bold">
						{course.level}
					</span>
				</div>

				<h1 className="text-lg font-bold text-gray-900 m-0 p-0 transition-colors group-hover:text-[#4f46e5]">
					{course.title}
				</h1>

				<h2 className="text-sm text-gray-600 m-0 p-0">
					{course.duration}
				</h2>

				<div className="flex items-center gap-2 flex-wrap">
					<div className="flex items-center gap-0.5">
						{Array.from({ length: 5 }).map((_, i) => (
							<Star
								key={i}
								className={`w-4 h-4 ${i < Math.round(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
							/>
						))}
					</div>
					<span className="font-bold text-sm">{course.rating.toFixed(1)}/5</span>
					<span className="text-gray-400 text-sm">({course.reviewsCount.toLocaleString()})</span>
				</div>

				<div className="flex items-center justify-between w-full pt-2">
					<h2 className="text-xl font-bold text-gray-900">${course.price}</h2>
					<span className="text-sm font-bold text-white bg-[#4f46e5] group-hover:bg-[#4338ca] transition-colors rounded-xl px-2 py-2">
						View Course
					</span>
				</div>
			</div>
		</Link>
	)
}