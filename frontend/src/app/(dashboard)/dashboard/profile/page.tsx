import AsideDashboard from '@/features/dashboard/components/AsideDashboard'
import ProfileForm from '@/features/profile/components/ProfileForm'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getCurrentUser()

  if (!user) redirect('/')

  return (
    <div className="flex min-h-screen">
      <AsideDashboard />
      <div className="py-8 sm:py-12 px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col mx-auto w-full gap-6 sm:gap-10">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>
        </div>

        <ProfileForm
          key={user.id}
          user={{
            ...user,
            createdAt: user.createdAt
          }}
        />
      </div>
    </div>
  )
}
