'use client'

import CourseFormDialog from './CourseFormDialog'

export default function AddCourseButton() {
  return (
    <CourseFormDialog
      trigger={
        <button
          type="button"
          className="w-full sm:w-auto whitespace-nowrap cursor-pointer rounded-xl bg-indigo-600 px-6 py-2 font-bold text-white transition-colors hover:bg-indigo-700"
        >
          + New Course
        </button>
      }
    />
  )
}