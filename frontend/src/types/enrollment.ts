export interface EnrollmentDto {
  id: string
  userId: string
  courseId: string
  progress: number
  completedLessons: string[]
  enrolledAt: string
}