import CoursesBrowser from "@/features/courses/components/CoursesBrowser"
import { serverFetch } from '@/lib/serverApi'
import { CourseDto } from '@/types'

async function getCourses(): Promise<CourseDto[]> {
	try {
		const res = await serverFetch('/api/courses?limit=6', {}, { auth: false })
		if (!res.ok) throw new Error('Failed to fetch courses')
		return res.json()
	} catch (error) {
		console.error('Error fetching courses:', error)
		return []
	}
}

export default async function Page() {
	const courses = await getCourses()

	return (
		<CoursesBrowser courses={courses} />
	)
}
