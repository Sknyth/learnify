'use client'

import { deleteUser, updateUserRole } from '@/app/(dashboard)/admin/users/actions'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

type UserRow = {
	id: string
	name: string | null
	email: string
	createdAt: Date
	enrollments: { id: string }[]
	role: 'USER' | 'ADMIN'
}

function RoleSelect({ user, disabled }: { user: UserRow; disabled: boolean }) {
	const [role, setRole] = useState(user.role)

	const handleChange = (newRole: 'USER' | 'ADMIN') => {
		const previous = role
		setRole(newRole)

		updateUserRole(user.id, newRole).then((result) => {
			if (result.success) {
				toast.success('User role updated')
			} else {
				setRole(previous)
				toast.error(result?.error ?? 'Error updating user role')
			}
		})
	}

	return (
		<select
			className={`appearance-none cursor-pointer text-center px-4 py-1.5 rounded-full text-xs font-semibold border transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${
				role === 'ADMIN'
					? 'bg-red-50 text-red-600 border-red-200 focus:ring-red-300 hover:bg-red-100'
					: 'bg-[#4338ca]/10 text-[#4338ca] border-[#4338ca]/20 focus:ring-[#4338ca]/40 hover:bg-[#4338ca]/15'
			}`}
			value={role}
			onChange={(e) => handleChange(e.target.value as 'USER' | 'ADMIN')}
			disabled={disabled}
		>
			<option value="USER">User</option>
			<option value="ADMIN">Admin</option>
		</select>
	)
}

type Props = {
	users: UserRow[]
}

export default function UsersTable({ users }: Props) {
	const [isPending, startTransition] = useTransition()

	const handleDelete = (userId: string, userName: string | null) => {
		toast('Delete this user?', {
			description: `${userName ?? 'This user'} will be permanently removed.`,
			action: {
				label: 'Delete',
				onClick: () => {
					startTransition(async () => {
						const result = await deleteUser(userId)
						if (result?.success) {
							toast.success('User deleted')
						} else {
							toast.error(result?.error ?? 'Error deleting user')
						}
					})
				}
			},
			cancel: { label: 'Cancel', onClick: () => {} }
		})
	}

	return (
		<div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
			<div className="overflow-x-auto">
				<table className="w-full border-collapse min-w-160">
					<thead>
						<tr className="bg-gray-50/80 border-b border-gray-200">
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">User</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 hidden sm:table-cell">Courses</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3 hidden md:table-cell">Joined</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">Role</th>
							<th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 sm:px-6 py-3">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{users.map((u) => (
							<tr key={u.id} className="transition-colors hover:bg-gray-50/70">
								<td className="px-4 sm:px-6 py-4">
									<div className="flex items-center gap-3 min-w-0">
										<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-[#6366f1] to-[#4338ca] text-white flex items-center justify-center font-bold text-sm shrink-0 ring-1 ring-black/5">
											{u.name?.[0]?.toUpperCase() ?? "?"}
										</div>
										<div className="flex flex-col min-w-0">
											<span className="text-sm font-semibold text-gray-800 truncate">{u.name}</span>
											<span className="text-xs text-gray-400 truncate">{u.email}</span>
										</div>
									</div>
								</td>
								<td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
									<span className="inline-flex items-center gap-1.5 bg-[#4338ca]/10 text-[#4338ca] font-medium px-2.5 py-1 rounded-full text-xs whitespace-nowrap">
										{u.enrollments.length} {u.enrollments.length === 1 ? 'course' : 'courses'}
									</span>
								</td>
								<td className="px-4 sm:px-6 py-4 text-sm text-gray-500 hidden md:table-cell whitespace-nowrap">
									{new Date(u.createdAt).toLocaleDateString('en-US', {
										day: 'numeric',
										month: 'short',
										year: 'numeric'
									})}
								</td>
								<td className="px-4 sm:px-6 py-4 text-sm">
									<RoleSelect user={u} disabled={isPending} />
								</td>
								<td className="px-4 sm:px-6 py-4 text-sm text-gray-500">
									<button
										className="text-white hover:bg-[#b91c1c] font-medium transition-colors bg-[#dc2626] cursor-pointer px-2.5 py-1 rounded-md disabled:opacity-50 whitespace-nowrap"
										onClick={() => handleDelete(u.id, u.name)}
										disabled={isPending}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{users.length === 0 && (
				<div className="px-6 py-12 text-center text-gray-400 text-sm">
					No users yet
				</div>
			)}
		</div>
	)
}