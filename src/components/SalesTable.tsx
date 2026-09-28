'use client'

type Props = {
	courses: {
		id: string
		title: string
		price: number
		enrollments: { id: string }[]
	}[]
}

export default function SalesTable({ courses }: Props) {
	const sorted = [...courses].sort((a, b) => b.enrollments.length - a.enrollments.length)
	const maxSales = Math.max(...courses.map((c) => c.enrollments.length), 1)

	return (
		<div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
			<div className="overflow-x-auto">
				<table className="w-full border-collapse min-w-160">
					<thead>
						<tr className="bg-gray-50/80 border-b border-gray-200">
							<th colSpan={4} className="text-left font-bold tracking-wide px-4 sm:px-6 py-3">
								Top Selling Courses
							</th>
						</tr>
						<tr className="bg-gray-50/80 border-b border-gray-200">
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">Course</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">Sales</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">Revenue</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">Trend</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{sorted.map((c) => {
							const sales = c.enrollments.length
							const percent = Math.round((sales / maxSales) * 100)

							return (
								<tr key={c.id} className="transition-colors hover:bg-gray-50/70">
									<td className="px-4 sm:px-6 py-4">
										<div className="flex flex-col min-w-0">
											<span className="text-sm font-semibold text-gray-800 truncate">{c.title}</span>
										</div>
									</td>
									<td className="px-4 sm:px-6 py-4 whitespace-nowrap">
										<span className="text-sm">
											{sales} {sales === 1 ? 'sale' : 'sales'}
										</span>
									</td>
									<td className="px-4 sm:px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
										${c.price * sales}
									</td>
									<td className="px-4 sm:px-6 py-4">
										<div className="flex items-center gap-3">
											<div className="w-32 h-2 rounded-full bg-gray-100 overflow-hidden shrink-0">
												<div
													className="h-full rounded-full bg-[#4f46e5] transition-all duration-700 ease-out"
													style={{ width: `${percent}%` }}
												/>
											</div>
											<span className="text-sm font-medium text-gray-400 tabular-nums">
												{percent}%
											</span>
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}