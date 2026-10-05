import Logo from "@/components/layout/Logo"
import SignInForm from "@/features/auth/components/SignInForm"

export default function page() {
	
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-12">
			<Logo />

			<SignInForm />
		</div>
	)
}
