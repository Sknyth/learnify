import HeaderNav from './HeaderNav'
import Logo from './Logo'

type HeaderUser = {
	id: string
	name: string
	email: string
	role: 'USER' | 'ADMIN'
} | null

export default function Header({ user }: { user: HeaderUser }) {
	return (
		<header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 h-16 sm:h-20">
			<div className="h-full flex items-center justify-between px-8 sm:px-12 lg:px-24">
				<Logo />
				<HeaderNav user={user} />
			</div>
		</header>
	)
}
