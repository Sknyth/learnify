'use client'

import { PendingButton } from '@/components/ui/pending-button'
import { LogOut } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import type { UserDto } from '@/types'

export default function LogoutButton({ user }: { user: UserDto }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' })

      if (!res.ok) {
        toast.error('Failed to log out')
        return
      }

      toast.success('Logged out')
      router.push('/')
      router.refresh()
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2 border-t border-gray-200 p-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#d8d5ff] text-xs font-bold text-indigo-800">
        {user?.name?.[0]?.toUpperCase() ?? '?'}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-bold text-gray-800">
          {user?.name ?? 'User'}
        </span>
        <span className="truncate text-xs text-gray-500">
          {user?.email ?? ''}
        </span>
      </div>
      <PendingButton
        pending={loading}
        pendingLabel="Logging out…"
        iconOnly
        type="button"
        onClick={handleLogout}
        aria-label="Log out"
        title="Log out"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 cursor-pointer"
      >
        <LogOut className="h-5 w-5" />
      </PendingButton>
    </div>
  )
}
