import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type Props = {
  courseId: string
  lessonTitle: string
  progress: number
}

export default function LessonHeader({ courseId, lessonTitle, progress }: Props) {
  return (
    <div className="bg-[#0f0f1a] border-b border-white/10 flex items-center justify-between px-6 py-3 shrink-0 gap-4">
      <div className="flex gap-4 items-center min-w-0">
        <Link
          className="text-gray-400 flex items-center font-semibold gap-1 hover:text-gray-300 transition-colors shrink-0"
          href={`/courses/${courseId}`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to course
        </Link>

        <div className="w-px h-4 bg-white/10 shrink-0" />

        <h1 className="text-white text-sm font-medium truncate">{lessonTitle}</h1>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-gray-400 text-sm">{progress}%</span>
        <div
          className="w-32 h-2 overflow-hidden rounded-full bg-gray-700"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-indigo-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}