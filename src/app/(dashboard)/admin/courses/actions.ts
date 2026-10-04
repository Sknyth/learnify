'use server'

import type { CourseForm } from '@/components/course-form/types'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addCourse(course: CourseForm) {
	const currentUser = await getCurrentUser()
	if (!currentUser || currentUser.role !== 'ADMIN') {
		return { success: false, error: 'Unauthorized' }
	}

	const { modules, ...data } = course

	await prisma.course.create({
		data: {
			...data,
			modules: {
				create: modules.map((m, moduleIndex) => ({
					title: m.title,
					order: moduleIndex,
					lessons: {
						create: m.lessons.map((l, lessonIndex) => ({
							title: l.title,
							duration: l.duration,
							videoUrl: l.videoUrl,
							order: lessonIndex,
						})),
					},
				})),
			},
		},
	})

	revalidatePath('/admin/courses')
	return { success: true }
}

export async function editCourse(course: CourseForm, courseId: string) {
	const currentUser = await getCurrentUser()
	if (!currentUser || currentUser.role !== 'ADMIN') {
		return { success: false, error: 'Unauthorized' }
	}

	const { modules, ...data } = course

	await prisma.$transaction([
		prisma.module.deleteMany({ where: { courseId } }),
		prisma.course.update({
			where: { id: courseId },
			data: {
				...data,
				modules: {
					create: modules.map((m, moduleIndex) => ({
						title: m.title,
						order: moduleIndex,
						lessons: {
							create: m.lessons.map((l, lessonIndex) => ({
								title: l.title,
								duration: l.duration,
								videoUrl: l.videoUrl,
								order: lessonIndex,
							})),
						},
					})),
				},
			},
		}),
	])

	revalidatePath('/admin/courses')
	return { success: true }
}

export async function deleteCourse(courseId: string) {
	const currentUser = await getCurrentUser()
	if (!currentUser || currentUser.role !== 'ADMIN') {
		return { success: false, error: 'Unauthorized' }
	}
	await prisma.course.delete({ where: { id: courseId } })
	revalidatePath('/admin/courses')
	return { success: true }
}
