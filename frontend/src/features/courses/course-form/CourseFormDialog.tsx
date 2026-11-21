'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React from "react"
import { addCourse, editCourse } from '@/features/courses/actions/course-actions'
import { BasicInfoSection } from "@/features/courses/course-form/BasicInfoSection"
import { CourseFormFooter } from "@/features/courses/course-form/CourseFormFooter"
import { CurriculumSection } from "@/features/courses/course-form/CurriculumSection"
import { LearningPointsSection } from "@/features/courses/course-form/LearningPointsSection"
import type { CourseForm, CourseWithModules } from "@/features/courses/course-form/course-form-types"
import { emptyCourseForm, toCourseForm } from "./course-form-data"
import { toast } from 'sonner'

export type { CourseForm, CourseWithModules } from "@/features/courses/course-form/course-form-types"

type Props = {
  trigger: React.ReactElement
  courseId?: string
}

export default function CourseFormDialog({ courseId, trigger }: Props) {
  const isEditing = !!courseId
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [form, setForm] = React.useState<CourseForm>(emptyCourseForm)
  const [isPending, startTransition] = React.useTransition()

  async function loadCourse() {
    if (!courseId) return
    setLoading(true)
    try {
      const r = await fetch(`/api/courses/${encodeURIComponent(courseId)}/edit`, { cache: 'no-store' })
      if (!r.ok) throw new Error()
      const c: CourseWithModules = await r.json()
      setForm(toCourseForm(c))
    } catch {
      toast.error('Failed to load course')
      setOpen(false)
    } finally {
      setLoading(false)
    }
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (next && !loading && !isPending) loadCourse()
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading || isPending) return

    startTransition(async () => {
      try {
        const res = courseId ? await editCourse(form, courseId) : await addCourse(form)

        if (!res.success) {
          toast.error(res.error ?? 'Something went wrong')
          return
        }

        toast.success(courseId ? 'Course updated' : 'Course added')
        setOpen(false)
        if (!courseId) setForm(emptyCourseForm)
      } catch {
        toast.error('Something went wrong')
      }
    })
  }

  const lessonsTotal = form.modules.reduce((sum, m) => sum + m.lessons.length, 0)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />

      <DialogContent className="flex max-h-[90dvh] w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="gap-0.5 border-b border-gray-200 px-4 py-4 sm:px-6">
          <DialogTitle>{isEditing ? 'Edit Course' : 'New Course'}</DialogTitle>
          <DialogDescription className="text-xs">
            {form.modules.length} modules · {lessonsTotal} lessons
          </DialogDescription>
        </DialogHeader>

        <form
          id="course-form"
          className="min-h-0 flex-1 space-y-6 overflow-y-auto px-4 py-5 sm:space-y-8 sm:px-6 sm:py-6"
          onSubmit={handleSubmit}
        >
          <BasicInfoSection form={form} setForm={setForm} />
          <LearningPointsSection form={form} setForm={setForm} />
          <CurriculumSection form={form} setForm={setForm} />
        </form>

        <CourseFormFooter
          isEditing={isEditing}
          isPending={isPending || loading}
          isLoading={loading}
          lessonsTotal={lessonsTotal}
          modulesTotal={form.modules.length}
        />
      </DialogContent>
    </Dialog>
  )
}
