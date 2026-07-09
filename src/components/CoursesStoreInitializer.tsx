"use client"

import { useEffect } from "react"
import { useCoursesStore, Course } from "@/store/coursesStore"

export default function CoursesStoreInitializer({ courses }: { courses: Course[] }) {
	const setCourses = useCoursesStore((state) => state.setCourses)

	useEffect(() => {
		setCourses(courses)
	}, [courses, setCourses])

	return null
}