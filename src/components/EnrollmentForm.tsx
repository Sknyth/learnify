'use client'

import { Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
	courseId: string
	price: number
}

export default function EnrollmentForm({ courseId, price }: Props) {
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const [name, setName] = useState("")
	const [nameError, setNameError] = useState("")
	const [number, setNumber] = useState("")
	const [numberError, setNumberError] = useState("")
	const [expiry, setExpiry] = useState("")
	const [expiryError, setExpiryError] = useState("")
	const [cvc, setCvc] = useState("")
	const [cvcError, setCvcError] = useState("")

	function validateName(value: string) {
		if (!value.trim()) {
			setNameError("Enter the cardholder's name")
			return false
		}
		if (value.trim().length < 3) {
			setNameError("The name is too short.")
			return false
		}
		setNameError("")
		return true
	}

	function validateNumber(value: string) {
		const digits = value.replace(/\D/g, "")
		if (!digits) {
			setNumberError("Enter the card number")
			return false
		}
		if (digits.length < 16) {
			setNumberError("The number is too short.")
			return false
		}
		setNumberError("")
		return true
	}

	function validateExpiry(value: string) {
		if (!value) {
			setExpiryError("Enter the card expiry date")
			return false
		}
		if (value.length < 5) {
			setExpiryError("Expiry date must be in MM/YY format")
			return false
		}
		setExpiryError("")
		return true
	}

	function validateCvc(value: string) {
			if (!value.trim()) {
				setCvcError("Enter the card CVC")
				return false
			}
			if (value.trim().length < 3) {
				setCvcError("CVC is too short")
				return false
			}
			setCvcError("")
			return true
		}

	function formatExpiry(value: string) {
		const digits = value.replace(/\D/g, "").slice(0, 4)

		if (digits.length >= 2) {
			return `${digits.slice(0, 2)}/${digits.slice(2)}`
		}

		return digits
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError("")

		const isNameValid = validateName(name)
		const isNumberValid = validateNumber(number)
		const isExpiryValid = validateExpiry(expiry)
		const isCvcValid = validateCvc(cvc)
		
		if (!isNameValid || !isNumberValid || !isExpiryValid || !isCvcValid) return
		
		setLoading(true)

		try {
			const res = await fetch("/api/enrollment/enroll", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ courseId }),
			})

			const data = await res.json()

			if (!res.ok) {
				setError(data.error)
				return
			}

			router.push("/dashboard/myCourses")
			router.refresh()
		} catch {
			setError("Something went wrong. Please try again.")
		} finally {
			setLoading(false)
		}
	}
	
	return (
		<form onSubmit={handleSubmit} className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 flex flex-col gap-6">
			<h1 className="font-bold text-xl">Payment Details</h1>

			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wide">Name on card</label>
					<input
						type="text"
						id="name"
						name="name"
						onChange={(e) => {
							setName(e.target.value)
							if (nameError) validateName(e.target.value)
						}}
						onBlur={() => validateName(name)}
						placeholder="Jordan Mitchell"
						className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
					/>
					{nameError && <p className="text-red-500 text-xs">{nameError}</p>}
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="number" className="text-xs font-bold text-gray-400 uppercase tracking-wide">Card number</label>
					<input
						type="text"
						id="number"
						name="number"
						onChange={(e) => {
							setNumber(e.target.value)
							if (numberError) validateNumber(e.target.value)
						}}
						onBlur={() => validateNumber(number)}
						inputMode="numeric"
						maxLength={16}
						placeholder="4242 4242 4242 4242"
						className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
					/>
					{numberError && <p className="text-red-500 text-xs">{numberError}</p>}
				</div>

				<div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
					<div className="flex flex-col gap-2">
						<label htmlFor="expiry" className="text-xs font-bold text-gray-400 uppercase tracking-wide">Expiry</label>
						<input
							type="text"
							id="expiry"
							name="expiry"
							value={expiry}
							onChange={(e) => {
								const formatted = formatExpiry(e.target.value)
								setExpiry(formatted)
								if (expiryError) validateExpiry(formatted)
							}}
							onBlur={() => validateExpiry(expiry)}
							placeholder="MM/YY"
							maxLength={5}
							inputMode="numeric"
							className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
						/>
						{expiryError && <p className="text-red-500 text-xs">{expiryError}</p>}
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="cvc" className="text-xs font-bold text-gray-400 uppercase tracking-wide">CVC</label>
						<input
							type="text"
							id="cvc"
							name="cvc"
							placeholder="123"
							onChange={(e) => {
								setCvc(e.target.value)
								if (cvcError) validateCvc(e.target.value)
							}}
							onBlur={() => validateCvc(cvc)}
							maxLength={4}
							className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
						/>
						{cvcError && <p className="text-red-500 text-xs">{cvcError}</p>}
					</div>
				</div>
			</div>

			<span className="p-4 bg-gray-100 rounded-xl border border-gray-200 flex items-center gap-3">
				<Shield className="w-5 h-5 text-emerald-500 shrink-0" />
				<p className="text-xs text-gray-600">
					Your payment is encrypted and secured by Stripe. We never store your card details.
				</p>
			</span>

			{error && <p className="text-red-500 text-sm">{error}</p>}

			<button
				type="submit"
				disabled={loading}
				className="w-full bg-[#4338ca] hover:bg-[#3730a3] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white font-bold flex items-center justify-center gap-2 rounded-2xl p-4 sm:p-5 text-base sm:text-lg cursor-pointer"
			>
				<Shield className="w-5 h-5 shrink-0" />
				{loading ? "Processing..." : `Pay $${price} · Enroll Now`}
			</button>

			<p className="text-xs text-gray-400 text-center">
				By enrolling you agree to our <a href="#" className="text-[#4f46e5] hover:underline">Terms of Service</a>
			</p>
		</form>
	)
}