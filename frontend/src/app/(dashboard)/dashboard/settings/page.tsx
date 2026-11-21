import ProfileForm from '@/features/profile/components/ProfileForm'
import { requireUser } from '@/lib/get-current-user'

export default async function SettingsPage() {
  const user = await requireUser()

  return (
    <div className="flex">
      <div className="min-w-0 flex-1 md:ml-64 py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-6 sm:gap-10">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-2xl sm:text-3xl font-bold">Profile settings</h1>
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
