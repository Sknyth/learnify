'use server'

import type { CourseForm } from '@/features/courses/course-form/types'
import { serverFetch } from '@/lib/serverApi'
import { revalidatePath } from 'next/cache'

async function send(path: string, method: string, body?: unknown) {
	const res = await serverFetch(path, {
		method,
		headers: { 'Content-Type': 'application/json' },
		body: body ? JSON.stringify(body) : undefined,
	})

	if (!res.ok) {
		const data = await res.json().catch(() => null)
		return { success: false, error: data?.error ?? `Request failed (${res.status})` }
	}

	revalidatePath('/instructor/myCourses')
	return { success: true }
}

export async function addCourse(course: CourseForm) {
	return send('/api/courses', 'POST', course)
}

export async function editCourse(course: CourseForm, courseId: string) {
	return send(`/api/courses/${encodeURIComponent(courseId)}`, 'PUT', course)
}

export async function deleteCourse(courseId: string) {
	return send(`/api/courses/${encodeURIComponent(courseId)}`, 'DELETE')
}
