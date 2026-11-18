'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { UserDto } from '@/types'
import { BookOpen, Check, ChevronDown, GraduationCap, ShieldCheck } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const WORKSPACES = [
  {
    id: 'student',
    label: 'Student portal',
    name: 'Student',
    description: 'Learning and certificates',
    basePath: '/dashboard',
    href: '/dashboard/overview',
    icon: GraduationCap,
    roles: ['STUDENT', 'INSTRUCTOR', 'ADMIN'],
  },
  {
    id: 'instructor',
    label: 'Instructor portal',
    name: 'Instructor',
    description: 'Courses, students and sales',
    basePath: '/instructor',
    href: '/instructor',
    icon: BookOpen,
    roles: ['INSTRUCTOR', 'ADMIN'],
  },
  {
    id: 'admin',
    label: 'Admin portal',
    name: 'Admin',
    description: 'Marketplace operations',
    basePath: '/admin',
    href: '/admin/dashboard',
    icon: ShieldCheck,
    roles: ['ADMIN'],
  },
]

export function WorkspaceSwitcher({ user }: { user: UserDto }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const userRole = user?.role?.replace('ROLE_', '').toUpperCase() ?? 'STUDENT'

  const availableWorkspaces = WORKSPACES.filter((w) => w.roles.includes(userRole))

  const activeWorkspace =
    availableWorkspaces.find((w) => pathname.startsWith(w.basePath)) ??
    availableWorkspaces[0]

  const hasMultipleWorkspaces = availableWorkspaces.length > 1

  if (!hasMultipleWorkspaces) {
    return (
      <div className="flex w-full min-w-0 items-center justify-between rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-left">
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
            Workspace
          </span>
          <span className="truncate text-sm font-bold text-gray-900">
            {activeWorkspace.label}
          </span>
        </span>
      </div>
    )
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className="flex w-full min-w-0 items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338ca]/30 cursor-pointer"
      >
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
            Switch workspace
          </span>
          <span className="truncate text-sm font-bold text-gray-900">
            {activeWorkspace.label}
          </span>
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="w-(--anchor-width) rounded-2xl border border-gray-200 bg-white p-2 shadow-lg"
      >
        {availableWorkspaces.map((item) => {
          const Icon = item.icon
          const isSelected = item.id === activeWorkspace.id

          return (
            <DropdownMenuItem
              key={item.id}
              onClick={() => router.push(item.href)}
              className={cn(
                'flex cursor-pointer items-center gap-2.5 rounded-xl p-2 outline-none transition-colors',
                isSelected
                  ? 'bg-[#4338ca]/10 focus:bg-[#4338ca]/15'
                  : 'hover:bg-gray-50 focus:bg-gray-50'
              )}
            >
              <div
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors',
                  isSelected
                    ? 'bg-[#4338ca] text-white'
                    : 'bg-gray-100 text-gray-600'
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <span
                  className={cn(
                    'text-[13px] font-bold',
                    isSelected ? 'text-[#4338ca]' : 'text-gray-900'
                  )}
                >
                  {item.name}
                </span>
                <span className="truncate text-[11px] text-gray-500">
                  {item.description}
                </span>
              </div>

              {isSelected && (
                <Check className="h-4 w-4 shrink-0 text-[#4338ca]" />
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}