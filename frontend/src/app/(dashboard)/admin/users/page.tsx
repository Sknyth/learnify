import UsersTable from '@/features/admin/components/UsersTable'
import { requireUser } from '@/lib/get-current-user'
import { serverFetch } from '@/lib/server-api'
import { UserDto } from '@/types'

async function getUsers(): Promise<UserDto[]> {
  try {
    const res = await serverFetch('/api/users')
    if (!res.ok) throw new Error('Failed to fetch users')
    return res.json()
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

export default async function AdminUsersPage() {
  await requireUser('ADMIN')
  const users = await getUsers()

  return (
    <div className="flex">
      <div className="min-w-0 flex-1 md:ml-64 py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-6 sm:gap-10 pt-16 sm:pt-20">
        <div className="flex flex-col justify-start items-start gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Users</h1>
          <h2 className="text-gray-500 text-sm sm:text-base">
            {users.length} registered learners
          </h2>
        </div>

        <UsersTable users={users} />
      </div>
    </div>
  )
}
