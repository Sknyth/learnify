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

export enum CourseStatus {
  Published = 'Published',
  PendingReview = 'PendingReview',
  NeedsChanges = 'NeedsChanges',
}

export const courseStatusLabels: Record<CourseStatus, string> = {
  [CourseStatus.Published]: 'Published',
  [CourseStatus.PendingReview]: 'Pending review',
  [CourseStatus.NeedsChanges]: 'Needs changes',
}

export const courseStatusStyles: Record<CourseStatus, string> = {
  [CourseStatus.Published]: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  [CourseStatus.PendingReview]: 'border-amber-200 bg-amber-50 text-amber-800',
  [CourseStatus.NeedsChanges]: 'border-red-200 bg-red-50 text-red-700',
}

export interface CourseDto {
  id: string
  title: string
  instructor: string | null
  instructorId: string | null
  description: string
  category: Category
  level: Level
  status: CourseStatus
  price: number
  duration: string
  imageUrl: string
  rating: number
  reviewsCount: number
  studentsCount: number
  learningPoints: string[]
  createdAt: Date
  updatedAt: Date
}

export interface CourseLessonDto {
  id: string
  title: string
  order: number
  duration: string | null
}

export type CourseDetailDto<Lesson extends CourseLessonDto = CourseLessonDto> =
  Omit<CourseDto, 'createdAt' | 'updatedAt'> & {
    modules: { id: string; title: string; order: number; lessons: Lesson[] }[]
  }

export type CourseEditDto = CourseDetailDto<CourseLessonDto & { videoUrl: string | null }>

export interface AdminCourseSummaryDto {
  id: string
  title: string
  instructor: string | null
  studentsCount: number
  status: CourseStatus
}

export interface CourseSalesDto {
  id: string
  title: string
  price: number
  enrollmentsCount: number
  status: CourseStatus
}
