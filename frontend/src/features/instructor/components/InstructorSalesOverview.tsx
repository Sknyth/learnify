import type { summarizeInstructorSales } from '@/features/instructor/lib/summarize-instructor-sales'
import CourseTitleLink from '@/features/courses/components/CourseTitleLink'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
})
const compactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
})
const shortMonth = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' })
const fullMonth = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export default function InstructorSalesOverview({ months, topCourses }: Pick<ReturnType<typeof summarizeInstructorSales>, 'months' | 'topCourses'>) {
  const periodRevenue = months.reduce((sum, month) => sum + month.revenue, 0)
  const peakRevenue = Math.max(1, ...months.map(month => month.revenue))
  const period = `${fullMonth.format(months[0].date)} – ${fullMonth.format(months[months.length - 1].date)}`

  return (
    <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <section aria-labelledby="revenue-heading" className="min-w-0 rounded-2xl border bg-white p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 id="revenue-heading" className="text-lg font-semibold">Estimated revenue</h2>
            <p className="mt-1 text-sm text-gray-500">{period}</p>
          </div>
          <p className="text-2xl font-bold tabular-nums">{currency.format(periodRevenue)}</p>
        </div>

        <ul aria-label="Monthly estimated revenue" className="mt-6 grid grid-cols-6 gap-1 sm:gap-3">
          {months.map(month => (
            <li key={month.key} className="min-w-0 text-center">
              <span className="sr-only">{fullMonth.format(month.date)}, {currency.format(month.revenue)}</span>
              <div aria-hidden="true" className="flex flex-col gap-2" title={currency.format(month.revenue)}>
                <div className="flex h-40 items-end justify-center border-b border-indigo-100 bg-indigo-50/50">
                  <div
                    className="w-3/5 max-w-12 rounded-t-md bg-indigo-500"
                    style={{ height: month.revenue > 0 ? `max(3px, ${month.revenue / peakRevenue * 88}%)` : 0 }}
                  />
                </div>
                <span className="text-xs text-gray-500">{shortMonth.format(month.date)}</span>
                <span className="text-[11px] font-semibold tabular-nums sm:text-xs">{compactCurrency.format(month.revenue)}</span>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-gray-500">Based on enrollment counts and current course prices.</p>
      </section>

      <section aria-labelledby="top-courses-heading" className="min-w-0 rounded-2xl border bg-white p-4 sm:p-6">
        <h2 id="top-courses-heading" className="text-lg font-semibold">Top-selling courses</h2>
        <p className="mt-1 text-sm text-gray-500">{period} · Ranked by paid-course enrollments</p>

        {topCourses.length ? (
          <ol className="mt-3 divide-y">
            {topCourses.map((course, index) => (
              <li key={course.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3">
                <span aria-hidden="true" className="grid size-8 place-items-center rounded-lg bg-indigo-50 text-sm font-semibold text-indigo-700">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <CourseTitleLink course={course} className="wrap-break-word text-sm font-medium" />
                  <p className="mt-0.5 text-xs text-gray-500">
                    {course.sales} {course.sales === 1 ? 'enrollment' : 'enrollments'}
                  </p>
                </div>
                <span className="text-sm font-semibold tabular-nums">{currency.format(course.revenue)}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-5 rounded-xl border border-dashed bg-gray-50 p-5 text-sm text-gray-600">
            No paid-course enrollments in this period.
          </p>
        )}
      </section>
    </div>
  )
}
