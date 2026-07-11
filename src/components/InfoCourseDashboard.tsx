import { Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
	title: string
	imageUrl: string
	lastLesson: string
	progress: number
	courseId: string
}

export default function InfoCourseDashboard({ title, imageUrl, lastLesson, progress, courseId }: Props) {
	return (
		<div className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:p-6">
			<Image
				src={imageUrl}
				className="h-40 w-full rounded-xl bg-gray-100 object-cover sm:h-24 sm:w-36 sm:shrink-0"
				width={600}
				height={340}
				alt={title}
			/>

			<div className="min-w-0 flex-1">
				<div className="flex items-start justify-between gap-4">
					<div className="min-w-0">
						<h2 className="truncate text-lg font-semibold text-gray-950">
							{title}
						</h2>
						<p className="mt-1 truncate text-sm text-gray-500">
							Last lesson: {lastLesson}
						</p>
					</div>

					<span className="inline-flex h-7 shrink-0 items-center rounded-full bg-indigo-50 px-3 text-sm font-semibold text-indigo-600">
						{progress}%
					</span>
				</div>

				<div className="mt-5">
					<div className="mb-2 flex items-center justify-between text-sm">
						<span className="font-medium text-gray-700">Progress</span>
						<span className="text-gray-500">{progress}% completed</span>
					</div>

					<div
						className="h-2 overflow-hidden rounded-full bg-gray-100"
						role="progressbar"
						aria-valuenow={progress}
						aria-valuemin={0}
						aria-valuemax={100}
					>
						<div
							className="h-full rounded-full bg-indigo-600 transition-all"
							style={{ width: `${progress}%` }}
						/>
					</div>
				</div>

				<Link
					className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 sm:w-auto"
					href={`/courses/${courseId}`}
				>
					<Play className="h-4 w-4" />
					Continue Learning
				</Link>
			</div>
		</div>
	)
}