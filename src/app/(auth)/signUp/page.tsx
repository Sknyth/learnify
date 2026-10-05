import Logo from "@/components/layout/Logo"
import SignUpForm from "@/features/auth/components/SignUpForm"

export default function page() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-12">
			<Logo />
			<SignUpForm />
		</div>
	)
}


