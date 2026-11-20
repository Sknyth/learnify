import type { UserDto } from '@/types'
import HeaderNav from './HeaderNav'
import Logo from './Logo'

export default function Header({ user }: { user: UserDto | null }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-8 sm:px-12 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-24">
        <Logo />
        <HeaderNav user={user} />
      </div>
    </header>
  )
}
