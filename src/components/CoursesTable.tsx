'use client'

import { BookOpen, PenLine, Trash } from 'lucide-react'
import Image from 'next/image'

type Props = {
	courses: {
		id: string
		title: string
		price: number
		imageUrl: string
		category: string
		studentsCount: number
	}[]
}

export default function CoursesTable({ courses }: Props) {
	return (
		<div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
			<div className="overflow-x-auto">
				<table className="w-full border-collapse min-w-160">
					<thead>
						<tr className="bg-gray-50/80 border-b border-gray-200">
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Course</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Category</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Students</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Price</th>
							<th className="text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap text-right">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{courses.length === 0 ? (
							<tr>
								<td colSpan={5} className="px-4 sm:px-6 py-16">
									<div className="flex flex-col items-center justify-center text-center">
										<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#4338ca]/10">
											<BookOpen className="h-6 w-6 text-[#4338ca]" />
										</div>
										<p className="text-sm font-semibold text-gray-800">No courses yet</p>
										<p className="mt-1 max-w-xs text-sm text-gray-400">
											Courses you create will appear here.
										</p>
									</div>
								</td>
							</tr>
						) : (
							courses.map((c) => (
								<tr key={c.id} className="transition-colors hover:bg-gray-50/70">
									<td className="px-4 sm:px-6 py-4">
										<div className="flex max-w-xs min-w-0 items-center gap-3">
											<Image
												alt=""
												src={c.imageUrl}
												width={46}
												height={60}
												className=" shrink-0 rounded-lg object-cover"
											/>
											<span className="min-w-0 truncate text-sm font-semibold text-gray-800">
												{c.title}
											</span>
										</div>
									</td>
									<td className="px-4 sm:px-6 py-4">
										<span className="inline-flex items-center gap-1.5 whitespace-nowrap bg-[#4338ca]/10 text-[#4338ca] px-2.5 py-1 rounded-full text-xs font-bold">
											{c.category}
										</span>
									</td>
									<td className="px-4 sm:px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
										{c.studentsCount.toLocaleString('en-US')}
									</td>
									<td className="px-4 sm:px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
										${c.price.toLocaleString('en-US', { maximumFractionDigits: 2 })}
									</td>
									<td className="px-4 sm:px-6 py-4">
										<div className="flex items-center justify-end gap-1">
											<button
												type="button"
												aria-label="Edit"
												className="group inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-[#4338ca]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4338ca]"
											>
												<PenLine className="h-4 w-4 text-gray-400 transition-colors group-hover:text-[#4338ca]" />
											</button>
											<button
												type="button"
												aria-label="Delete"
												className="group inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
											>
												<Trash className="h-4 w-4 text-gray-400 transition-colors group-hover:text-red-500" />
											</button>
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}