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
import type { CourseForm, CourseWithModules } from "@/features/courses/course-form/types"
import { toast } from 'sonner'

export type { CourseForm, CourseWithModules } from "@/features/courses/course-form/types"

type Props = {
  trigger: React.ReactElement
  course?: CourseWithModules
}

const emptyForm: CourseForm = {
  title: "",
  description: "",
  category: "WebDev",
  level: "Beginner",
  price: 0,
  duration: "",
  imageUrl: "",
  learningPoints: [],
  modules: [],
}

export default function CourseFormDialog({ course, trigger }: Props) {
  const isEditing = !!course
  const [open, setOpen] = React.useState(false)

  const [form, setForm] = React.useState<CourseForm>(() =>
    course
      ? {
          title: course.title,
          description: course.description,
          category: course.category,
          level: course.level,
          price: course.price,
          duration: course.duration,
          imageUrl: course.imageUrl,
          learningPoints: course.learningPoints,
          modules: course.modules.map((m) => ({
            tempId: m.id,
            title: m.title,
            lessons: m.lessons.map((l) => ({
              tempId: l.id,
              title: l.title,
              duration: l.duration,
              videoUrl: l.videoUrl,
            })),
          })),
        }
      : emptyForm
  )

  const [isPending, startTransition] = React.useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    startTransition(async () => {
      const res = course ? await editCourse(form, course.id) : await addCourse(form)

      if (!res.success) {
        toast.error(res.error ?? 'Something went wrong')
        return
      }

      toast.success(course ? 'Course updated' : 'Course added')
      setOpen(false)
      if (!course) setForm(emptyForm)
    })
  }

  const lessonsTotal = form.modules.reduce((sum, m) => sum + m.lessons.length, 0)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          isPending={isPending}
          lessonsTotal={lessonsTotal}
          modulesTotal={form.modules.length}
        />
      </DialogContent>
    </Dialog>
  )
}
