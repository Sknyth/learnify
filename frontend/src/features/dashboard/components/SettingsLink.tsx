'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SettingsLink() {
  const pathname = usePathname()
  const isActive = pathname === '/dashboard/settings'

  return (
    <div className="px-4">
      <Link
        href="/dashboard/settings"
        className={cn(
          'text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2',
          isActive && 'bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca]'
        )}
      >
        <Settings className="w-4 h-4" />
        Settings
      </Link>
    </div>
  )
}