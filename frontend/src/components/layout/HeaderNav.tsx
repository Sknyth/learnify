'use client'

import { BookOpen, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { UserDto } from '@/types'
import { cn } from '@/lib/utils'
import HeaderAccountMenu from './HeaderAccountMenu'
import MobileNav from './MobileNav'

const navLinkClass = 'inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-lg px-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900'

export default function HeaderNav({ user }: { user: UserDto | null }) {
  const pathname = usePathname()
  const isCourseSection = pathname === '/courses' || pathname.startsWith('/courses/')

  return (
    <>
      <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
        <Link
          href="/courses"
          aria-current={pathname === '/courses' ? 'page' : undefined}
          className={cn(navLinkClass, isCourseSection && 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800')}
        >
          <BookOpen aria-hidden="true" className="size-4" />
          Courses
        </Link>
        {user && (
          <Link href="/dashboard/overview" className={navLinkClass}>
            <LayoutDashboard aria-hidden="true" className="size-4" />
            Dashboard
          </Link>
        )}
      </nav>

      <div className="hidden min-w-0 items-center justify-end gap-2 md:flex">
        {user ? (
          <HeaderAccountMenu user={user} />
        ) : (
          <>
            <Link href="/signIn" className={navLinkClass}>Sign In</Link>
            <Link href="/signUp" className="inline-flex min-h-10 items-center whitespace-nowrap rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700">
              Sign Up
            </Link>
          </>
        )}
      </div>

      <MobileNav user={user} />
    </>
  )
}
