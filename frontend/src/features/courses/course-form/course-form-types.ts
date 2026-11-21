import type { Category, CourseEditDto, Level } from "@/types/course"

type LessonForm = { title: string; duration: string; videoUrl: string; tempId: string }

type ModuleForm = {
  title: string
  tempId: string
  lessons: LessonForm[]
}

export type CourseWithModules = CourseEditDto

export type CourseForm = {
  title: string
  description: string
  category: Category
  level: Level
  price: number
  duration: string
  imageUrl: string
  learningPoints: string[]
  modules: ModuleForm[]
}
