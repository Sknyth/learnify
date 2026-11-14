import { CourseDto } from '@/types'
import Course from './Course'
import { serverFetch } from '@/lib/serverApi'

async function getCourses(): Promise<CourseDto[]> {
	try {
		const res = await serverFetch('/api/courses?limit=6')
		if (!res.ok) throw new Error('Failed to fetch courses')
		return res.json()
	} catch (error) {
		console.error('Error fetching courses:', error)
		return []
	}
}

export default async function CoursesList() {
	const courses = await getCourses()

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 w-full">
			{courses.map((course) => (
				<Course key={course.id} course={course} />
			))}
		</div>
	)
}