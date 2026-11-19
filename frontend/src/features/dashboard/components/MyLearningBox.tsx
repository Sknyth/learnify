import type { Category } from '@/types/course'
import { ArrowRight, CircleCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  title: string
  imageUrl: string
  lastLesson: string
  progress: number
  courseId: string
  lessonId: string
  category: Category
}

export default function MyLearningBox({
  title,
  imageUrl,
  lastLesson,
  progress,
  courseId,
  lessonId,
  category,
}: Props) {
  const isCompleted = progress === 100

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-gray-300 sm:flex-row sm:items-center sm:p-5">
      <Image
        src={imageUrl}
        className="h-36 w-full rounded-xl bg-gray-100 object-cover sm:h-24 sm:w-36 sm:shrink-0"
        width={600}
        height={340}
        alt={title}
      />

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
            {category}
          </span>
          <h2 className="mt-0.5 truncate text-base font-bold text-gray-900">
            {title}
          </h2>
          {lastLesson && (
            <p className="mt-0.5 truncate text-xs text-gray-400">
              {isCompleted ? 'Last lesson' : 'Up next'}: {lastLesson}
            </p>
          )}
        </div>

        <div className="mt-3">
          <div
            className="h-1.5 overflow-hidden rounded-full bg-gray-100"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-indigo-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-gray-500">
              {progress}% complete
            </span>

            {!isCompleted ? (
              <Link
                href={`/courses/${courseId}/lessons/${lessonId}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 transition hover:text-indigo-700"
              >
                Continue
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <CircleCheck className="h-3.5 w-3.5" />
                Completed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
