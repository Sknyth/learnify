'use client'

import { PenLine } from 'lucide-react'
import CourseFormDialog from '@/features/courses/course-form/CourseFormDialog'
import { CourseDto } from '@/types'

type Props = {
  course: CourseDto
}

export default function EditCourseButton({ course }: Props) {
  return (
    <CourseFormDialog
      course={course}
      trigger={
        <button
          type="button"
          aria-label="Edit"
          className="group inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-[#4338ca]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4338ca]"
        >
          <PenLine className="h-4 w-4 text-gray-400 transition-colors group-hover:text-[#4338ca]" />
        </button>
      }
    />
  )
}
