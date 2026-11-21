import { serverFetch } from '@/lib/server-api'

export async function getEnrollmentStatus(courseId: string): Promise<boolean> {
  const response = await serverFetch(`/api/enrollments/courses/${encodeURIComponent(courseId)}/status`)
  return response.ok && (await response.json()) === true
}
