'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { BookOpen, Check, ChevronRight, Clock, ExternalLink, Eye, Star, Tag, Users, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import CourseTitleLink from '@/features/courses/components/CourseTitleLink'
import { CourseStatus, courseStatusLabels, type AdminCourseSummaryDto, type CourseDto } from '@/types/course'

const priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function getExternalUrl(source: string | null | undefined) {
  if (!source?.trim()) return null

  try {
    const url = new URL(source)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null
  } catch {
    return null
  }
}

function getCoverSource(imageUrl: string | null | undefined) {
  const source = imageUrl?.trim()
  if (source?.startsWith('/') && !source.startsWith('//') && !source.includes('\\')) return source
  return getExternalUrl(source)
}

function CourseCover({ imageUrl, title, status }: Pick<CourseDto, 'imageUrl' | 'title' | 'status'>) {
  const [failedImage, setFailedImage] = useState<string | null>(null)
  const source = getCoverSource(imageUrl)

  return (
    <div className="relative isolate flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-indigo-50 to-slate-200 sm:aspect-3/1">
      {source && source !== failedImage ? (
        <Image
          src={source}
          alt={`${title} cover`}
          fill
          sizes="(min-width: 768px) 720px, 90vw"
          className="object-cover"
          unoptimized={source.startsWith('http:')}
          onError={() => setFailedImage(source)}
        />
      ) : (
        <div className="flex flex-col items-center gap-2 text-sm font-medium text-slate-600">
          <BookOpen aria-hidden="true" className="size-7 text-indigo-500" />
          Cover unavailable
        </div>
      )}
      <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm ring-1 ring-slate-900/5">
        {courseStatusLabels[status]}
      </span>
    </div>
  )
}

function CourseDetailsBody({ courseId }: { courseId: string }) {
  const [details, setDetails] = useState<CourseDto | 'error' | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadDetails() {
      try {
        const response = await fetch(`/api/courses/${encodeURIComponent(courseId)}/edit`, {
          cache: 'no-store',
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('Failed to load course details')
        const course: CourseDto = await response.json()
        if (!controller.signal.aborted) setDetails(course)
      } catch {
        if (!controller.signal.aborted) setDetails('error')
      }
    }

    void loadDetails()
    return () => controller.abort()
  }, [courseId, attempt])

  if (details === null) {
    return <p role="status" className="text-sm text-muted-foreground">Loading course details…</p>
  }

  if (details === 'error') {
    return (
      <div className="space-y-2">
        <p role="alert" className="text-sm text-red-700">Couldn&apos;t load course details.</p>
        <button
          type="button"
          className="cursor-pointer text-sm font-semibold text-indigo-700 underline"
          onClick={() => {
            setDetails(null)
            setAttempt((current) => current + 1)
          }}
        >
          Try again
        </button>
      </div>
    )
  }

  const stats = [
    { label: 'Price', value: details.price == null ? '—' : priceFormat.format(details.price), icon: Tag },
    { label: 'Duration', value: details.duration || '—', icon: Clock },
    { label: 'Students', value: details.studentsCount.toLocaleString('en-US'), icon: Users },
    { label: 'Rating', value: details.rating != null && details.reviewsCount > 0 ? `${details.rating.toFixed(1)} / 5 (${details.reviewsCount})` : '—', icon: Star },
  ]

  return (
    <div className="space-y-6">
      <CourseCover imageUrl={details.imageUrl} title={details.title} status={details.status} />

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
        <div className="min-w-0">
          <dt className="text-xs font-medium text-slate-500">Instructor</dt>
          <dd className="mt-1 wrap-break-word font-semibold text-slate-900">{details.instructor ?? '—'}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-slate-500">Category</dt>
          <dd className="mt-1 font-semibold text-slate-900">{details.category}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-slate-500">Level</dt>
          <dd className="mt-1 font-semibold text-slate-900">{details.level}</dd>
        </div>
      </dl>

      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="min-w-0 rounded-xl border border-slate-200/80 bg-slate-50 p-3">
            <dt className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <Icon aria-hidden="true" className="size-3.5 shrink-0 text-indigo-600" />
              {label}
            </dt>
            <dd className="mt-1 wrap-break-word font-semibold text-slate-950 tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>

      {details.description && (
        <section>
          <h3 className="mb-2 text-base font-semibold text-slate-950">Description</h3>
          <p className="wrap-break-word whitespace-pre-wrap leading-relaxed text-slate-600">{details.description}</p>
        </section>
      )}

      {details.learningPoints.length > 0 && (
        <section>
          <h3 className="mb-2 text-base font-semibold text-slate-950">Learning outcomes</h3>
          <ul className="space-y-2 text-slate-600">
            {details.learningPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-indigo-600" />
                <span className="min-w-0 wrap-break-word">{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3 className="mb-2 text-base font-semibold text-slate-950">Curriculum</h3>
        {details.modules.length === 0 ? (
          <p className="mt-1 text-gray-600">No modules yet.</p>
        ) : (
          <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200">
            {details.modules.map((module) => (
              <li key={module.id} className="px-3.5">
                <details className="group">
                  <summary className="flex cursor-pointer items-center gap-2 py-3 font-medium text-slate-800 hover:text-indigo-700">
                    <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-indigo-600 transition-transform group-open:rotate-90" />
                    <span className="min-w-0 wrap-break-word">{module.title}</span>
                    <span className="ml-auto shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-normal text-slate-600">{module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}</span>
                  </summary>
                  <ul className="space-y-2 pb-3 pl-6 text-slate-600">
                    {module.lessons.map((lesson) => {
                      const videoUrl = getExternalUrl(lesson.videoUrl)

                      return (
                        <li key={lesson.id} className="flex items-start justify-between gap-3">
                          {videoUrl ? (
                            <a
                              href={videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-w-0 items-start gap-1.5 font-medium text-indigo-700 underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              <span className="min-w-0 wrap-break-word">{lesson.title}</span>
                              <ExternalLink aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                              <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                          ) : (
                            <span className="min-w-0 wrap-break-word">{lesson.title}</span>
                          )}
                          <span className="shrink-0 text-xs text-gray-500">{lesson.duration}</span>
                        </li>
                      )
                    })}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default function AdminCourseDetails({ course }: { course: Pick<AdminCourseSummaryDto, 'id' | 'title' | 'status'> }) {
  const isPublished = course.status === CourseStatus.Published

  return (
    <div className="flex max-w-xs items-center gap-2">
      {isPublished && <CourseTitleLink course={course} className="min-w-0 wrap-break-word text-sm font-semibold" />}
      <Dialog>
        {isPublished ? (
          <DialogTrigger
            render={<Button variant="ghost" size="icon-sm" />}
            aria-label={`View details for ${course.title}`}
            title="View course details"
            className="cursor-pointer text-slate-500 hover:text-indigo-700"
          >
            <Eye aria-hidden="true" />
          </DialogTrigger>
        ) : (
          <DialogTrigger
            type="button"
            className="min-w-0 cursor-pointer wrap-break-word text-left text-sm font-semibold text-gray-900 underline-offset-4 hover:text-indigo-700 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {course.title}
          </DialogTrigger>
        )}
        <DialogContent showCloseButton={false} className="flex max-h-[90dvh] flex-col gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-3xl">
          <DialogHeader className="flex-row items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
            <DialogTitle className="min-w-0 wrap-break-word text-xl leading-snug font-semibold text-slate-950 sm:text-2xl">{course.title}</DialogTitle>
            <DialogClose render={<Button variant="ghost" size="icon" aria-label="Close" />}>
              <X aria-hidden="true" />
            </DialogClose>
          </DialogHeader>
          <div className="min-h-0 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
            <CourseDetailsBody courseId={course.id} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
