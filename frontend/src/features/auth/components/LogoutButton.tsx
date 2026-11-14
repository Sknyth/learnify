'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from "next/navigation"
import { toast } from 'sonner'

export default function LogoutButton() {
	const router = useRouter()

	async function handleLogout() {
		try {
			const res = await fetch("/api/auth/logout", { method: "POST" })

			if (!res.ok) {
				toast.error("Failed to log out")
				return
			}

			toast.success("Logged out")
			router.push("/")
			router.refresh()
		} catch {
			toast.error("Something went wrong. Please try again.")
		}
	}

	return (
		<button className="text-sm font-bold text-gray-600 hover:text-red-700 hover:bg-red-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer" onClick={handleLogout} >
			<LogOut className="w-4 h-4" />
			Logout
		</button>
	)
}
