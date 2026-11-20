import { CourseDto } from '@/types'
import CourseCard from '@/features/courses/components/CourseCard'
import { serverFetch } from '@/lib/server-api'

async function getCourses(): Promise<CourseDto[] | null> {
	try {
		const res = await serverFetch('/api/courses?limit=6', { signal: AbortSignal.timeout(10_000) }, { auth: false })
		if (!res.ok) throw new Error('Failed to fetch courses')
		return await res.json()
	} catch (error) {
		console.error('Error fetching courses:', error)
		return null
	}
}

export default async function FeaturedCourses() {
	const courses = await getCourses()
	if (!courses) return <p className="text-sm text-gray-600">Courses are temporarily unavailable.</p>

	const sorted = [...courses].sort(
		(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
	).slice(0,6)

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 w-full">
			{sorted.map((course) => (
				<CourseCard key={course.id} course={course} />
			))}
		</div>
	)
}