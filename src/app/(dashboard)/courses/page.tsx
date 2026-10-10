import { prisma } from "@/lib/prisma"
import CoursesBrowser from "@/features/courses/components/CoursesBrowser"

export default async function Page() {
	const courses = await prisma.course.findMany({
		orderBy: { createdAt: 'desc' },
	})

	return (
		<CoursesBrowser courses={courses} />
	)
}
