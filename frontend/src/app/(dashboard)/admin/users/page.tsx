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
  if (!user || user.role !== 'ADMIN') redirect('/dashboard/myCourses')
  const users = await getUsers()

  return (
    <div className="flex">
      <AsideAdmin />
      <div className="min-w-0 py-8 sm:py-12 px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col mx-auto w-full gap-6 sm:gap-10">
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