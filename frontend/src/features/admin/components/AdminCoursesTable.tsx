'use client'

import { BookOpen } from 'lucide-react'
import { useState } from 'react'
import AdminCourseDetails from '@/features/admin/components/AdminCourseDetails'
import { updateCourseStatus } from '@/features/courses/actions/course-actions'
import { CourseStatus, courseStatusLabels, courseStatusStyles, type AdminCourseSummaryDto } from '@/types/course'
import { toast } from 'sonner'

type Props = {
	courses: AdminCourseSummaryDto[]
}

const courseTabs = [null, ...Object.values(CourseStatus)]

function StatusSelect({ course }: { course: AdminCourseSummaryDto }) {
	const [saving, setSaving] = useState(false)

	async function handleSelect(status: CourseStatus) {
		if (saving || status === course.status) return
		setSaving(true)
		try {
			const result = await updateCourseStatus(course.id, status)
			if (result.success) {
				toast.success('Course status updated')
			} else {
				toast.error(result.error ?? 'Error updating course status')
			}
		} catch {
			toast.error('Error updating course status')
		} finally {
			setSaving(false)
		}
	}

	return (
		<select
			aria-label={`Status for ${course.title}`}
			aria-busy={saving || undefined}
			className={`appearance-none text-center cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait disabled:opacity-60 ${courseStatusStyles[course.status]}`}
			value={course.status}
			onChange={(event) => handleSelect(event.target.value as CourseStatus)}
			disabled={saving}
		>
			{Object.values(CourseStatus).map((status) => (
				<option key={status} value={status}>{courseStatusLabels[status]}</option>
			))}
		</select>
	)
}

export default function AdminCoursesTable({ courses }: Props) {
	const [selectedStatus, setSelectedStatus] = useState<CourseStatus | null>(null)
	const visibleCourses = selectedStatus === null
		? courses
		: courses.filter((course) => course.status === selectedStatus)

	return (
		<div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
			<div className="overflow-x-auto">
				<table className="w-full border-collapse min-w-160">
					<thead>
						<tr className="border-b border-gray-200">
							<td colSpan={4} className="p-0">
								<ul aria-label="Course statuses" className="flex w-max gap-1 px-4">
									{courseTabs.map((status) => {
										const isActive = selectedStatus === status
										const label = status === null ? 'All' : courseStatusLabels[status]
										const count = status === null ? courses.length : courses.filter((course) => course.status === status).length

										return (
											<li key={label}>
												<button
													type="button"
													aria-pressed={isActive}
													onClick={() => setSelectedStatus(status)}
													className={`flex h-12 cursor-pointer items-center gap-2.5 whitespace-nowrap border-b-2 px-3.5 text-sm font-semibold focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 ${isActive ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-indigo-600'}`}
												>
													{label}
													<span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-100 px-1.5 text-xs font-semibold text-gray-500 tabular-nums">
														{count}
													</span>
												</button>
											</li>
										)
									})}
								</ul>
							</td>
						</tr>
						<tr className="bg-gray-50/80 border-b border-gray-200">
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Course</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Instructor</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Status</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 whitespace-nowrap">Students</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{visibleCourses.length === 0 ? (
							<tr>
								<td colSpan={4} className="px-4 sm:px-6 py-16">
									<div className="flex flex-col items-center justify-center text-center">
										<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#4338ca]/10">
											<BookOpen className="h-6 w-6 text-[#4338ca]" />
										</div>
										<p className="text-sm font-semibold text-gray-800">
											{selectedStatus === null ? 'No courses yet' : 'No courses with this status'}
										</p>
									</div>
								</td>
							</tr>
						) : (
							visibleCourses.map((c) => (
								<tr key={c.id} className="transition-colors hover:bg-gray-50/70">
									<td className="px-4 sm:px-6 py-4">
										<AdminCourseDetails course={c} />
									</td>
									<td className="px-4 sm:px-6 py-4">
										<span className="text-sm">
											{c.instructor ?? '—'}
										</span>
									</td>
									<td className="px-4 sm:px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
										<StatusSelect course={c} />
									</td>
									<td className="px-4 sm:px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
										{c.studentsCount.toLocaleString('en-US')}
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
