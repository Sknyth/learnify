'use client'

import { Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { enrollInCourse } from '../lib/enrollment-client'
import {
	emptyPaymentErrors,
	formatExpiry,
	validatePayment,
	validatePaymentField,
	type PaymentField,
	type PaymentValues,
} from '../lib/payment-validation'

type Props = {
	courseId: string
	price: number
}

export default function EnrollmentForm({ courseId, price }: Props) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [values, setValues] = useState<PaymentValues>({
		name: '',
		number: '',
		expiry: '',
		cvc: '',
	})
	const [errors, setErrors] = useState(emptyPaymentErrors)

	function updateField(field: PaymentField, value: string) {
		const nextValue = field === 'expiry' ? formatExpiry(value) : value

		setValues((current) => ({ ...current, [field]: nextValue }))
		if (errors[field]) {
			setErrors((current) => ({
				...current,
				[field]: validatePaymentField(field, nextValue),
			}))
		}
	}

	function validateField(field: PaymentField) {
		setErrors((current) => ({
			...current,
			[field]: validatePaymentField(field, values[field]),
		}))
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		const result = validatePayment(values)
		setErrors(result.errors)

		if (!result.isValid) return

		setLoading(true)

		try {
			await enrollInCourse(courseId)
			toast.success("Enrolled successfully")
			router.push("/dashboard/myCourses")
			router.refresh()
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.")
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
						value={values.name}
						onChange={(e) => updateField('name', e.target.value)}
						onBlur={() => validateField('name')}
						placeholder="Jordan Mitchell"
						className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
					/>
					{errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="number" className="text-xs font-bold text-gray-400 uppercase tracking-wide">Card number</label>
					<input
						type="text"
						id="number"
						name="number"
						value={values.number}
						onChange={(e) => updateField('number', e.target.value)}
						onBlur={() => validateField('number')}
						inputMode="numeric"
						maxLength={16}
						placeholder="4242 4242 4242 4242"
						className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
					/>
					{errors.number && <p className="text-red-500 text-xs">{errors.number}</p>}
				</div>

				<div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
					<div className="flex flex-col gap-2">
						<label htmlFor="expiry" className="text-xs font-bold text-gray-400 uppercase tracking-wide">Expiry</label>
						<input
							type="text"
							id="expiry"
							name="expiry"
							value={values.expiry}
							onChange={(e) => updateField('expiry', e.target.value)}
							onBlur={() => validateField('expiry')}
							placeholder="MM/YY"
							maxLength={5}
							inputMode="numeric"
							className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
						/>
						{errors.expiry && <p className="text-red-500 text-xs">{errors.expiry}</p>}
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="cvc" className="text-xs font-bold text-gray-400 uppercase tracking-wide">CVC</label>
						<input
							type="text"
							id="cvc"
							name="cvc"
							placeholder="123"
							value={values.cvc}
							onChange={(e) => updateField('cvc', e.target.value)}
							onBlur={() => validateField('cvc')}
							maxLength={4}
							inputMode="numeric"
							className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
						/>
						{errors.cvc && <p className="text-red-500 text-xs">{errors.cvc}</p>}
					</div>
				</div>
			</div>

			<span className="p-4 bg-gray-100 rounded-xl border border-gray-200 flex items-center gap-3">
				<Shield className="w-5 h-5 text-emerald-500 shrink-0" />
				<p className="text-xs text-gray-600">
					Your payment is encrypted and secured by Stripe. We never store your card details.
				</p>
			</span>

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
