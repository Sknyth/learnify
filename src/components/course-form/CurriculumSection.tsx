'use client'

import { Play, Plus, Trash2, X } from "lucide-react"
import type React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import type { CourseForm } from "@/components/course-form/types"

type Props = {
  form: CourseForm
  setForm: React.Dispatch<React.SetStateAction<CourseForm>>
}

export function CurriculumSection({ form, setForm }: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">
          Curriculum
        </h2>
        <button
          type="button"
          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-100"
          onClick={() => {
            setForm({
              ...form,
              modules: [...form.modules, { tempId: crypto.randomUUID(), title: "", lessons: [] }],
            })
          }}
        >
          <Plus className="h-4 w-4" />
          Add Module
        </button>
      </div>

      <Accordion multiple={false} className="flex flex-col gap-3">
        {form.modules.map((m, moduleIndex) => (
          <AccordionItem
            key={m.tempId}
            value={m.tempId}
            className="overflow-hidden rounded-2xl border border-gray-200"
          >
            <AccordionTrigger className="items-center gap-2 border-b border-gray-100 bg-slate-50 px-3 py-4 hover:no-underline sm:gap-3 sm:px-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                {moduleIndex + 1}
              </span>
              <Input
                required
                className="min-w-0 flex-1 truncate border-0 bg-transparent text-sm font-semibold text-gray-400 shadow-none focus:border-0 focus-visible:ring-0"
                placeholder={`Module ${moduleIndex + 1} title`}
                value={m.title}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  setForm({
                    ...form,
                    modules: form.modules.map((mod, i) =>
                      i === moduleIndex ? { ...mod, title: e.target.value } : mod
                    ),
                  })
                }
              />
              <span className="hidden shrink-0 text-xs text-gray-400 sm:inline">
                {m.lessons.length} lessons
              </span>
              <span
                role="button"
                className="shrink-0 cursor-pointer text-gray-300 hover:text-red-500"
                aria-label="Delete module"
                onClick={(e) => {
                  e.stopPropagation()
                  setForm({
                    ...form,
                    modules: form.modules.filter((_, i) => i !== moduleIndex),
                  })
                }}
              >
                <Trash2 className="h-4 w-4" />
              </span>
            </AccordionTrigger>

            <AccordionContent className="p-0">
              {m.lessons.map((l, lessonIndex) => (
                <div
                  key={l.tempId}
                  className="grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-2 border-b border-gray-100 px-3 py-3 sm:flex sm:gap-3 sm:px-4"
                >
                  <span className="w-6 shrink-0 font-mono text-sm text-gray-300">
                    {lessonIndex + 1}.
                  </span>
                  <Play className="h-4 w-4 shrink-0 text-gray-300" />

                  {(["title", "videoUrl", "duration"] as const).map((field) => (
                    <Input
                      required
                      key={field}
                      className={
                        field === "title"
                          ? "min-w-0 flex-1 truncate border-0 bg-transparent text-sm font-semibold text-gray-400 shadow-none focus:border-0 focus-visible:ring-0"
                          : field === "videoUrl"
                            ? "col-span-4 row-start-2 min-w-0 rounded-xl border border-gray-200 bg-slate-50 text-sm text-gray-500 sm:col-auto sm:row-auto sm:w-56 sm:flex-none"
                            : "col-span-4 row-start-3 w-full rounded-xl border border-gray-200 bg-slate-50 text-center font-mono text-sm text-gray-500 sm:col-auto sm:row-auto sm:w-24 sm:shrink-0"
                      }
                      placeholder={
                        field === "title" ? "Lesson title" : field === "videoUrl" ? "Video URL" : "mm:ss"
                      }
                      value={l[field]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          modules: form.modules.map((mod, i) =>
                            i === moduleIndex
                              ? {
                                  ...mod,
                                  lessons: mod.lessons.map((les, j) =>
                                    j === lessonIndex ? { ...les, [field]: e.target.value } : les
                                  ),
                                }
                              : mod
                          ),
                        })
                      }
                    />
                  ))}

                  <button
                    type="button"
                    aria-label="Delete lesson"
                    className="shrink-0 cursor-pointer text-gray-300 hover:text-red-500"
                    onClick={() =>
                      setForm({
                        ...form,
                        modules: form.modules.map((mod, i) =>
                          i === moduleIndex
                            ? { ...mod, lessons: mod.lessons.filter((_, j) => j !== lessonIndex) }
                            : mod
                        ),
                      })
                    }
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                onClick={() =>
                  setForm({
                    ...form,
                    modules: form.modules.map((mod, i) =>
                      i === moduleIndex
                        ? {
                            ...mod,
                            lessons: [
                              ...mod.lessons,
                              { tempId: crypto.randomUUID(), title: "", duration: "", videoUrl: "" },
                            ],
                          }
                        : mod
                    ),
                  })
                }
              >
                <Plus className="h-4 w-4" />
                Add Lesson
              </button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}