import type { CourseForm, CourseWithModules } from "./course-form-types"
import { Category, Level } from "@/types/course"

export const emptyCourseForm: CourseForm = {
  title: "",
  description: "",
  category: Category.WebDev,
  level: Level.Beginner,
  price: 0,
  duration: "",
  imageUrl: "",
  learningPoints: [],
  modules: [],
}

export function toCourseForm(c: CourseWithModules): CourseForm {
  return {
    title: c.title,
    description: c.description,
    category: c.category,
    level: c.level,
    price: c.price,
    duration: c.duration,
    imageUrl: c.imageUrl,
    learningPoints: c.learningPoints,
    modules: c.modules.map((m) => ({
      tempId: m.id,
      title: m.title,
      lessons: m.lessons.map((l) => ({
        tempId: l.id,
        title: l.title,
        duration: l.duration ?? '',
        videoUrl: l.videoUrl ?? '',
      })),
    })),
  }
}
