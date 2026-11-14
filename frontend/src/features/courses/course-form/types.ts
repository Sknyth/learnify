import type { Course, Lesson, Module } from "@/generated/prisma/client"

export type CourseWithModules = Course & {
  modules: (Module & { lessons: Lesson[] })[]
}

type LessonForm = Pick<Lesson, "title" | "duration" | "videoUrl"> & { tempId: string }

type ModuleForm = Pick<Module, "title"> & {
  tempId: string
  lessons: LessonForm[]
}

export type CourseForm = Omit<
  Course,
  "id" | "rating" | "reviewsCount" | "studentsCount" | "createdAt" | "updatedAt"
> & {
  modules: ModuleForm[]
}
