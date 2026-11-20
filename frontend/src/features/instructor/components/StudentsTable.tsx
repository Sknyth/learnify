'use client'

import { StudentEnrollmentDto } from '@/types'
import { BarChart3 } from 'lucide-react'

type Props = {
  enrollments: StudentEnrollmentDto[]
}

export default function StudentsTable({ enrollments }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-160">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200">
              <th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">Student</th>
              <th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">Course</th>
              <th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">Enrolled</th>
              <th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 sm:px-6 py-16">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#4338ca]/10">
                      <BarChart3 className="h-6 w-6 text-[#4338ca]" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">No students yet</p>
                    <p className="mt-1 max-w-xs text-sm text-gray-400">
                      Your students will appear here.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              enrollments.map((e) => (
                <tr key={e.id} className="transition-colors hover:bg-gray-50/70">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="text-sm">{e.user.name}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">{e.course.title}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-400 whitespace-nowrap">
                    {new Date(e.enrolledAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {e.progress}%
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}