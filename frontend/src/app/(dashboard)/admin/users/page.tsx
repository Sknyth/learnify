import AsideAdmin from '@/features/admin/components/AsideAdmin'
import UsersTable from '@/features/admin/components/UsersTable'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { serverFetch } from '@/lib/serverApi'
import { UserDto } from '@/types'
import { redirect } from 'next/navigation'

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

export default async function Page() {
  const user = await getCurrentUser()
  if (!user || user.role !== 'ADMIN') redirect('/dashboard/overview')
  const users = await getUsers()

  return (
    <div className="flex">
      <AsideAdmin />
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
