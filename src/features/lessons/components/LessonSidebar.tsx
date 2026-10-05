import { Play } from 'lucide-react'
import Link from 'next/link'

type Lesson = {
  id: string
  title: string
  duration: string
}

type Module = {
  id: string
  title: string
  order: number
  lessons: Lesson[]
}

type Props = {
  courseId: string
  lessonId: string
  modules: Module[]
}

export default function LessonSidebar({ courseId, lessonId, modules }: Props) {
  return (
    <aside className="flex h-72 shrink-0 flex-col overflow-y-auto border-t border-white/10 bg-[#1a1a2e] lg:h-auto lg:w-80 lg:border-l lg:border-t-0">
      <div className="sticky top-0 z-10 border-b border-white/10 bg-[#1a1a2e]/95 px-4 py-3 backdrop-blur lg:hidden">
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
          Course content
        </p>
      </div>

      {modules.map((module) => (
        <div key={module.id}>
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              Module {module.order}
            </p>
            <h2 className="text-sm font-semibold text-white mt-0.5">
              {module.title}
            </h2>
          </div>

          <div className="flex flex-col">
            {module.lessons.map((lesson) => {
              const isActive = lesson.id === lessonId
              return (
                <Link
                  key={lesson.id}
                  href={`/courses/${courseId}/lessons/${lesson.id}`}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-white/5 ${
                    isActive
                      ? 'bg-[#4f46e5]/20 text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Play className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-[#4f46e5]'}`} />
                  <span className="flex-1 truncate">{lesson.title}</span>
                  <span className="text-xs text-gray-500 shrink-0">{lesson.duration}</span>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </aside>
  )
}
