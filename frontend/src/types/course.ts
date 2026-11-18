export enum Category {
  WebDev = 'WebDev',
  Design = 'Design',
  DataScience = 'DataScience',
  DevOps = 'DevOps',
  Mobile = 'Mobile',
}

export enum Level {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export interface CourseDto {
  id: string
  title: string
  instructor: string
  description: string
  category: Category
  level: Level
  price: number
  duration: string
  imageUrl: string
  rating: number
  reviewsCount: number
  studentsCount: number
  learningPoints: string[]
  modules: {
		id: string
		title: string
		order: number
		lessons: { id: string; title: string; order: number; duration: string | null; videoUrl: string | null }[]
	}[]
  createdAt: Date
  updatedAt: Date
}
export interface CourseSalesDto {
  id: string
  title: string
  price: number
  enrollmentsCount: number
}
