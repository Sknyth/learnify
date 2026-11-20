'use client'

import { ChevronDown, GraduationCap, Settings, Shield } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { UserDto } from '@/types'

export default function HeaderAccountMenu({ user }: { user: UserDto }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button type="button" aria-label="Account menu" className="flex min-w-0 cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white py-1 pl-1 pr-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50">
            <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-md bg-indigo-50 font-semibold text-indigo-700">
              {user.name?.[0]?.toUpperCase() ?? '?'}
            </span>
            <span className="max-w-36 truncate">{user.name}</span>
            <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-gray-500" />
          </button>
        }
      />
      <DropdownMenuContent align="end" sideOffset={10} className="w-56 p-1.5">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="truncate px-2 py-2">{user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem render={<Link href="/dashboard/settings" />} className="gap-2 px-2 py-2">
            <Settings aria-hidden="true" /> Settings
          </DropdownMenuItem>
          {user.role !== 'STUDENT' && (
            <DropdownMenuItem render={<Link href="/instructor/overview" />} className="gap-2 px-2 py-2">
              <GraduationCap aria-hidden="true" /> Instructor
            </DropdownMenuItem>
          )}
          {user.role === 'ADMIN' && (
            <DropdownMenuItem render={<Link href="/admin/dashboard" />} className="gap-2 px-2 py-2">
              <Shield aria-hidden="true" /> Admin
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
