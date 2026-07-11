'use client'

import AsideDashboard from '@/components/AsideDashboard'
import { useUserStore } from '@/store/userStore'
import ProfileForm from '@/components/ProfileForm'

export default function Page() {
	const user = useUserStore((state) => state.user)

	if (!user) return null

	return (
		<div className="flex min-h-screen">
			<AsideDashboard />
			<div className="py-8 sm:py-12 px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col mx-auto w-full gap-6 sm:gap-10">
				<div className="flex flex-col justify-start items-start">
					<h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>
				</div>

				<ProfileForm key={user.id} user={user} />
			</div>
		</div>
	)
}