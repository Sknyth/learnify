export interface LessonPageDto {
  courseId: string
  lesson: { id: string; title: string; videoUrl: string | null }
  moduleTitle: string
  progress: number
  completedLessons: string[]
  modules: {
		id: string
		title: string
		order: number
		lessons: { id: string; title: string; order: number; duration: string | null }[]
	}[]
}