import { useUserStore } from '@/store/userStore'
import { LogOut } from 'lucide-react'
import { useRouter } from "next/navigation"
import React from 'react'

export default function LogoutButton() {
	const router = useRouter()
	const clearUser = useUserStore((state) => state.clearUser)

	async function handleLogout() {
		await fetch("/api/auth/logout", { method: "POST" })
		clearUser()
		router.push("/")
		router.refresh()
	}

	return (
		<button className="text-sm font-bold text-gray-600 hover:text-red-700 hover:bg-red-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer" onClick={handleLogout} >
			<LogOut className="w-4 h-4" />
			Logout
		</button>
	)
}
