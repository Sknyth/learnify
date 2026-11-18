import { Category } from '@/generated/prisma/enums'
import { ArrowRight, CircleCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  title: string
  imageUrl: string
  lastLesson: string
  progress: number
  courseId: string
  lessonId: string
  category?: Category
  isPrimary?: boolean
}

export default function InfoCourseDashboard({
  title,
  imageUrl,
  lastLesson,
  progress,
  courseId,
  lessonId,
  category,
  isPrimary = false,
}: Props) {
  const isCompleted = progress === 100

  return (
    <div className="group flex flex-col gap-4 py-5 transition-colors first:pt-2 last:pb-2 sm:flex-row sm:items-center sm:gap-5">
      <Image
        src={imageUrl}
        className="h-36 w-full rounded-xl bg-gray-100 object-cover sm:h-20 sm:w-32 sm:shrink-0"
        width={600}
        height={340}
        alt={title}
      />

      <div className="min-w-0 flex-1">
        {category && (
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
            {category}
          </span>
        )}
        <h3
          title={lastLesson ? `Next: ${lastLesson}` : undefined}
          className="mt-0.5 truncate text-base font-bold text-gray-900"
        >
          {title}
        </h3>

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

          <div className="mt-1.5 flex items-center justify-between text-xs">
            <span className="truncate text-gray-400">
              {lastLesson}
            </span>
            <span className="shrink-0 font-semibold text-gray-600">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      <div className="sm:shrink-0">
        {!isCompleted ? (
          <Link
            href={`/courses/${courseId}/lessons/${lessonId}`}
            className={cn(
              'inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] px-4 py-2 text-xs font-semibold transition sm:w-auto',
              isPrimary
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'border border-gray-200 bg-white text-gray-700 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white'
            )}
          >
            Continue
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <span className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-600 sm:w-auto">
            <CircleCheck className="h-3.5 w-3.5" />
            Completed
          </span>
        )}
      </div>
    </div>
  )
}