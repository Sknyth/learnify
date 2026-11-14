export interface CourseDto {
  id: string
  title: string
  description: string
  category: string
  level: string
  price: number
  duration: string
  imageUrl: string
  rating: number
  reviewsCount: number
  studentsCount: number
  learningPoints?: string[]
}

export interface CourseSalesDto {
  id: string
  title: string
  price: number
  enrollmentsCount: number
}