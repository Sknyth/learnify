import Logo from "@/components/Logo"
import SignInForm from "@/components/SignInForm"

export default function page() {
	
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-12">
			<Logo />

			<SignInForm />
		</div>
	)
}
