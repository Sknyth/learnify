'use client'

import { BookOpen } from 'lucide-react'
import EditCourseButton from '@/features/courses/components/EditCourseButton'

import { CourseDto } from '@/types'

type Props = {
	courses: CourseDto[]
}

export default function CoursesTable({ courses }: Props) {
	
	return (
		<div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
			<div className="overflow-x-auto">
				<table className="w-full border-collapse min-w-160">
					<thead>
						<tr className="bg-gray-50/80 border-b border-gray-200">
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Course</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Instructor</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Status</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Students</th>
							<th className="text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap text-right">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{courses.length === 0 ? (
							<tr>
								<td className="px-4 sm:px-6 py-16">
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
											<span className="text-sm font-semibold text-gray-900">
												{c.title}
											</span>
										</div>
									</td>
									<td className="px-4 sm:px-6 py-4">
										<span className="text-sm">
											{c.instructor}
										</span>
									</td>
									<td className="px-4 sm:px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
										{/* {c.status} */}
										status
									</td>
									<td className="px-4 sm:px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
										{c.studentsCount.toLocaleString('en-US')}
									</td>
									<td className="px-4 sm:px-6 py-4">
										<div className="flex items-center justify-end gap-1">
											<EditCourseButton course={c} />

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
