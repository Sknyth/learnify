import Course from './Course'
import { prisma } from '@/lib/prisma'

export default async function CoursesList() {
	const courses = await prisma.course.findMany({
		take: 6,
		orderBy: { createdAt: 'desc' },
	})

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 w-full">
			{courses.map((course) => (
				<Course key={course.id} course={course} />
			))}
		</div>
	)
}