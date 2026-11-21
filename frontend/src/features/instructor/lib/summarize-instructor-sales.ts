import type { StudentEnrollmentDto } from '@/types'

export function summarizeInstructorSales(enrollments: StudentEnrollmentDto[], now: Date) {
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5 + index, 1))
    return { key: date.toISOString().slice(0, 7), date, revenue: 0 }
  })
  const monthsByKey = new Map(months.map(month => [month.key, month]))
  const paidCourses = new Map<string, Pick<StudentEnrollmentDto['course'], 'id' | 'title' | 'status'> & { sales: number; revenue: number }>()
  let totalRevenue = 0

  for (const enrollment of enrollments) {
    const { course, enrolledAt } = enrollment
    if (!course || course.price <= 0) continue

    totalRevenue += course.price
    const month = monthsByKey.get(enrolledAt?.slice(0, 7))
    if (!month) continue

    month.revenue += course.price
    const sales = paidCourses.get(course.id) ?? {
      id: course.id,
      title: course.title,
      status: course.status,
      sales: 0,
      revenue: 0,
    }
    sales.sales += 1
    sales.revenue += course.price
    paidCourses.set(course.id, sales)
  }

  const topCourses = [...paidCourses.values()]
    .sort((a, b) => b.sales - a.sales || b.revenue - a.revenue || a.title.localeCompare(b.title))
    .slice(0, 5)

  return { months, topCourses, totalRevenue }
}
