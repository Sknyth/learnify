'use server'

import {
  addCourse as addCourseAction,
  deleteCourse as deleteCourseAction,
  editCourse as editCourseAction,
} from '@/features/courses/actions/course-actions'
import type { CourseForm } from '@/features/courses/course-form/types'

export async function addCourse(course: CourseForm) {
  return addCourseAction(course)
}

export async function editCourse(course: CourseForm, courseId: string) {
  return editCourseAction(course, courseId)
}

export async function deleteCourse(courseId: string) {
  return deleteCourseAction(courseId)
}
