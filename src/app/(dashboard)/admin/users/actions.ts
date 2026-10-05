'use server'

import {
  deleteUser as deleteUserAction,
  updateUserRole as updateUserRoleAction,
} from '@/features/admin/actions/user-actions'

export async function deleteUser(userId: string) {
  return deleteUserAction(userId)
}

export async function updateUserRole(userId: string, newRole: 'USER' | 'ADMIN') {
  return updateUserRoleAction(userId, newRole)
}
