'use server'

import { getCurrentUser } from '@/lib/getCurrentUser'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteUser(userId: string) {
	const currentUser = await getCurrentUser()
	if (!currentUser || currentUser.role !== 'ADMIN') {
		return { success: false, error: 'Unauthorized' }
	}
	if (currentUser.id === userId) {
		return { success: false, error: 'Cannot delete yourself' }
	}
	await prisma.user.delete({ where: { id: userId } })
	revalidatePath('/admin/users')
	return { success: true }
}

export async function updateUserRole(userId: string, newRole: 'USER' | 'ADMIN') {
	const currentUser = await getCurrentUser()
	if (!currentUser || currentUser.role !== 'ADMIN') {
		return { success: false, error: 'Unauthorized' }
	}
	if (currentUser.id === userId) {
		return { success: false, error: 'Cannot change your own role' }
	}
	await prisma.user.update({
		where: { id: userId },
		data: { role: newRole },
	})
	revalidatePath('/admin/users')
	return { success: true }
}