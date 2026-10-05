'use client'

import { useEffect, useState } from 'react'

type MonthData = {
	name: string
	value: number
}

type Props = {
	data: MonthData[]
}

export default function MonthsCharts({ data }: Props) {
	const [mounted, setMounted] = useState(false)
	const max = Math.max(...data.map(d => d.value), 100)

	useEffect(() => {
		const t = requestAnimationFrame(() => setMounted(true))
		return () => cancelAnimationFrame(t)
	}, [])

	return (
		<div className="flex w-full gap-2">
			{data.map(({ name, value }, i) => {
				const heightPercent = Math.min(100, Math.max(0, (value / max) * 100))
				return (
					<div
						key={name}
						className="group flex flex-col items-center w-full cursor-pointer"
					>
						<p className="text-sm text-gray-500 mb-1 transition-all duration-300 group-hover:text-gray-800 group-hover:font-medium"
							style={{ opacity: mounted ? 1 : 0 }}
						>
							${value}{value > 999 ? 'k' : ''}
						</p>
						<div className="w-full h-32 bg-gray-100 rounded-t-2xl flex items-end overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_0_0_1px_rgba(0,0,0,0.04)]">
							<div
								className="w-full bg-[#4f46e5] rounded-t-2xl transition-[height,transform,background-color] ease-out duration-300 origin-bottom group-hover:scale-y-[1.03] group-hover:bg-[#22c55e] group-hover:shadow-[0_-4px_12px_rgba(34,197,94,0.35)]"
								style={{
									height: mounted ? `${heightPercent}%` : '0%',
									transitionDuration: mounted ? '300ms' : '700ms',
									transitionDelay: mounted ? '0ms' : `${i * 80}ms`,
								}}
							></div>
						</div>
						<p className="text-sm text-gray-500 mt-1 transition-colors duration-300 group-hover:text-gray-900">
							{name}
						</p>
					</div>
				)
			})}
		</div>
	)
}