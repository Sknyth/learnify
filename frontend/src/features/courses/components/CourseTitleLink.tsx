import Link from 'next/link'
import { CourseStatus } from '@/types/course'

type Props = {
  course: { id: string; title: string; status: CourseStatus }
  className?: string
}

export default function CourseTitleLink({ course, className }: Props) {
  if (course.status !== CourseStatus.Published) {
    return <span className={`${className ?? ''} text-gray-900`}>{course.title}</span>
  }

  return (
    <Link
      href={`/courses/${encodeURIComponent(course.id)}`}
      className={`${className ?? ''} text-indigo-700 underline-offset-4 hover:underline focus-visible:underline`}
    >
      {course.title}
    </Link>
  )
}
