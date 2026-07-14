'use client'

import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
	lessonId: string
	courseId: string
	isCompleted: boolean
	nextLessonId?: string
}

export default function MarkCompleteButton({ lessonId, courseId, isCompleted, nextLessonId }: Props) {
	const [completed, setCompleted] = useState(isCompleted)
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	async function handleComplete() {
		if (completed) return
		setLoading(true)

		try {
			const res = await fetch('/api/enrollment/complete', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ lessonId, courseId }),
			})

			if (res.ok) {
				setCompleted(true)
				if (nextLessonId) {
					router.push(`/courses/${courseId}/lessons/${nextLessonId}`)
				} else {
					router.refresh()
				}
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<button
			onClick={handleComplete}
			disabled={loading || completed}
			className={`flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors ${
				completed
					? 'bg-green-500 text-white cursor-default'
					: 'bg-[#4f46e5] hover:bg-[#4338ca] text-white'
			}`}
		>
			<CheckCircle className="w-4 h-4" />
			{completed ? 'Completed' : loading ? 'Saving...' : 'Mark as completed'}
		</button>
	)
}