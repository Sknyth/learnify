'use client'

import CourseTitleLink from '@/features/courses/components/CourseTitleLink'
import { PendingButton } from '@/components/ui/pending-button'
import { BookOpen, Trash } from 'lucide-react'
import Image from 'next/image'
import EditCourseButton from '@/features/courses/components/EditCourseButton'

import { deleteCourse } from '@/features/courses/actions/course-actions'
import { toast } from 'sonner'
import { useState, useTransition } from 'react'
import { courseStatusLabels, courseStatusStyles, type CourseDto } from '@/types/course'

type Props = {
	courses: CourseDto[]
}

export default function InstructorCoursesTable({ courses }: Props) {
	const [isPending, startTransition] = useTransition()
	const [deletingId, setDeletingId] = useState<string>()

	const handleDelete = (courseId: string, courseTitle: string | null) => {
		toast('Delete this course?', {
			id: 'confirm-delete-course',
			description: `${courseTitle ?? 'This course'} will be permanently removed.`,
			action: {
				label: 'Delete',
				onClick: () => {
					setDeletingId(courseId)
					startTransition(async () => {
						try {
							const result = await deleteCourse(courseId)
							if (result?.success) {
								toast.success('Course deleted')
							} else {
								toast.error(result?.error ?? 'Error deleting course')
							}
						} catch {
							toast.error('Error deleting course')
						}
					})
				},
			},
			cancel: { label: 'Cancel', onClick: () => {} },
		})
	}
	
	return (
		<div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
			<div className="overflow-x-auto">
				<table className="w-full border-collapse min-w-160">
					<thead>
						<tr className="bg-gray-50/80 border-b border-gray-200">
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Course</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Category</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Status</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Students</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Price</th>
							<th className="text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap text-right">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{courses.length === 0 ? (
							<tr>
								<td colSpan={6} className="px-4 sm:px-6 py-16">
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
												alt={c.title}
												src={c.imageUrl}
												width={64}
												height={40}
												className="h-10 w-16 shrink-0 rounded-lg object-cover"
											/>
											<CourseTitleLink course={c} className="min-w-0 truncate text-sm font-semibold" />
										</div>
									</td>
									<td className="px-4 sm:px-6 py-4">
										<span className="inline-flex items-center gap-1.5 whitespace-nowrap bg-[#4338ca]/10 text-[#4338ca] px-2.5 py-1 rounded-full text-xs font-bold">
											{c.category}
										</span>
									</td>
									<td className="px-4 sm:px-6 py-4 whitespace-nowrap">
										<span className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${courseStatusStyles[c.status]}`}>
											{courseStatusLabels[c.status]}
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
											<EditCourseButton courseId={c.id} />
											<PendingButton
												pending={isPending && deletingId === c.id}
												pendingLabel="Deleting…"
												iconOnly
												disabled={isPending}
												aria-label="Delete"
												className="group inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
												onClick={() => handleDelete(c.id, c.title)}
											>
												<Trash className="h-4 w-4 text-gray-400 transition-colors group-hover:text-red-500" />
											</PendingButton>
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
