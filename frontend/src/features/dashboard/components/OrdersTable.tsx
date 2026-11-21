'use client'

import CourseTitleLink from '@/features/courses/components/CourseTitleLink'
import { Status, type OrderEnrollmentDto } from '@/types/enrollment'
import { BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  orders: OrderEnrollmentDto[]
}

const STATUS_STYLES: Record<Status, string> = {
  [Status.Paid]: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  [Status.Failed]: 'border-red-200 bg-red-50 text-red-700',
  [Status.Refunded]: 'border-purple-200 bg-purple-50 text-purple-700',
}

export default function OrdersTable({ orders }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-160">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200">
              <th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">Order</th>
              <th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">Course</th>
              <th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">Date</th>
              <th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">Amount</th>
              <th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">Status</th>
              <th className="px-4 sm:px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 sm:px-6 py-16">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#4338ca]/10">
                      <BarChart3 className="h-6 w-6 text-[#4338ca]" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">No orders yet</p>
                    <p className="mt-1 max-w-xs text-sm text-gray-400">
                      Your orders will appear here.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="transition-colors hover:bg-gray-50/70">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-xs text-gray-500">{o.id.slice(0,8)}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <CourseTitleLink course={o.course} className="text-sm font-semibold" />
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-400 whitespace-nowrap">
                    {new Date(o.enrolledAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      ${Number(o.course.price).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      className={cn(
                        'inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold',
                        STATUS_STYLES[o.status] ?? 'border-gray-200 bg-gray-50 text-gray-700'
                      )}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                    <button
                      type="button"
                      className="text-sm font-semibold text-[#4338ca] hover:text-[#3730a3] cursor-pointer"
                    >
                      Receipt
                    </button>
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
