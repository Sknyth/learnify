import Logo from "@/components/Logo"
import SignUpForm from "@/components/SignUpForm"

export default function page() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-12">
			<Logo />
			<SignUpForm />
		</div>
	)
}


