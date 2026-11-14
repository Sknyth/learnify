import Logo from './Logo'

export default function Footer() {
	return (
		<footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm">
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 py-6 sm:py-4 px-8 sm:px-12 lg:px-24">
				<Logo />

				<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 order-3 sm:order-2">
					<a href="#" className="text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2">Privacy Policy</a>
					<a href="#" className="text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2">Terms of Service</a>
				</div>

				<p className="text-sm text-gray-600 text-center order-2 sm:order-3">&copy; 2026 Learnify. All rights reserved.</p>
			</div>
		</footer>
	)
}