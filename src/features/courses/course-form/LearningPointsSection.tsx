'use client'

import { Plus, X } from "lucide-react"
import type React from "react"
import { Input } from "@/components/ui/input"
import type { CourseForm } from "@/features/courses/course-form/types"

type Props = {
  form: CourseForm
  setForm: React.Dispatch<React.SetStateAction<CourseForm>>
}

export function LearningPointsSection({ form, setForm }: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">
          Learning Points
        </h2>
        <button
          type="button"
          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-100"
          onClick={() => {
            setForm({
              ...form,
              learningPoints: [...form.learningPoints, ""],
            })
          }}
        >
          <Plus className="h-4 w-4" />
          Add Point
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {form.learningPoints.map((point, index) => (
          <div key={index} className="flex items-center gap-2 sm:gap-3">
            <span className="w-6 shrink-0 text-sm text-gray-300">{index + 1}.</span>
            <Input
              required
              className="min-w-0 flex-1 truncate border-0 bg-transparent text-sm font-semibold text-gray-400 shadow-none focus:border-0 focus-visible:ring-0"
              placeholder="Learning point"
              value={point}
              onChange={(e) => {
                const updatedPoints = [...form.learningPoints]
                updatedPoints[index] = e.target.value
                setForm({ ...form, learningPoints: updatedPoints })
              }}
            />
            <button
              type="button"
              className="shrink-0 cursor-pointer text-gray-300 hover:text-red-500"
              aria-label="Delete learning point"
              onClick={() => {
                const updatedPoints = form.learningPoints.filter((_, i) => i !== index)
                setForm({ ...form, learningPoints: updatedPoints })
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}