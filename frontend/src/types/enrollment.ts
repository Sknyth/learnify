export interface EnrollmentDto {
  id: string
  userId: string
  courseId: string
  progress: number
  completedLessons: string[]
  enrolledAt: string
  course: {
    id: string
    title: string
    price: number
  } | null
}

export interface MyEnrollmentDto {
  id: string
  progress: number
  completedLessons: string[]
  enrolledAt: Date
  course: {
    id: string
    title: string
    imageUrl: string
    price: number
    modules: {
      id: string
      title: string
      order: number
      lessons: { id: string; title: string; order: number }[]
    }[]
  }
}

export interface OrderEnrollmentDto {
  id: string
	course: { id: string, title: string, price: number }
	enrolledAt: Date
	status: Status
}

export enum Status {
  Paid = 'Paid',
  Refunded = 'Refunded',
  Failed = 'Failed',
}