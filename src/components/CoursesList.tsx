"use client"

import { useCoursesStore } from '@/store/coursesStore'
import Course from './Course'

export default function CoursesList() {
	const courses = useCoursesStore((state) => state.courses)

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 w-full">
			{courses.map((course) => (
				<Course key={course.id} course={course} />
			))}
		</div>
	)
}