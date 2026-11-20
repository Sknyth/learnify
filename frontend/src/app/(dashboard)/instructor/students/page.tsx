import { getCurrentUser } from '@/lib/getCurrentUser'
import { redirect } from 'next/navigation'
import { StudentEnrollmentDto } from '@/types'
import { serverFetch } from '@/lib/serverApi'
import StudentsTable from '@/features/instructor/components/StudentsTable'

async function getEnrollments(): Promise<StudentEnrollmentDto[]> {
	try {
		const res = await serverFetch('/api/enrollments/students')
		if (!res.ok) throw new Error('Failed to fetch students')
		return res.json()
	} catch (error) {
		console.error('Error students orders:', error)
		return []
	}
}

export default async function Page() {
	const user = await getCurrentUser()
	if (!user || (user.role !== 'INSTRUCTOR' && user.role !== 'ADMIN')) redirect('/')

	const enrollments = await getEnrollments()

	return (
		<div className="flex flex-col md:flex-row">
			<div className="min-w-0 flex-1 md:ml-64 py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-6 sm:gap-10 pt-16 sm:pt-20">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
					<h1 className="text-2xl sm:text-3xl font-bold">Students</h1>
				</div>


				<StudentsTable enrollments={enrollments} />
			</div>
		</div>
	)
}
