'use server'

import { serverFetch } from '@/lib/serverApi'
import { revalidatePath } from 'next/cache'

export async function deleteUser(userId: string) {
	const res = await serverFetch(`/api/users/delete/${encodeURIComponent(userId)}`, {
		method: 'DELETE',
	})

  if (!res.ok){
		const data = await res.json().catch(() => null)
		return { success: false, error: data?.error ?? `Request failed (${res.status})` }
	} 

  revalidatePath('/admin/users')
  return { success: true }
}

export async function updateUserRole(userId: string, newRole: 'USER' | 'ADMIN') {
  const res = await serverFetch('/api/users/update/role', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, role: newRole }),
  })

  if (!res.ok){
		const data = await res.json().catch(() => null)
		return { success: false, error: data?.error ?? `Request failed (${res.status})` }
	} 

  revalidatePath('/admin/users')
  return { success: true }
}