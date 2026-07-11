import { prisma } from '@/lib/prisma'
import { Shield, Star } from 'lucide-react'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	if (!id) return notFound()

	const course = await prisma.course.findUnique({ where: { id } })

	if (!course) return notFound()

	const originalPrice = Math.round(course.price / 0.45)
	const discount = originalPrice - course.price

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-4 gap-8">
			<div className="flex flex-col gap-2 text-center">
				<h1 className="font-bold text-3xl">Complete your enrollment</h1>
				<p className="text-sm text-gray-500">Secure checkout · 30-day money-back guarantee</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full max-w-5xl">
				<div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 flex flex-col gap-6">
					<h1 className="font-bold text-xl">Payment Details</h1>

					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wide">Name on card</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="Jordan Mitchell"
								className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="number" className="text-xs font-bold text-gray-400 uppercase tracking-wide">Card number</label>
							<input
								type="text"
								id="number"
								name="number"
								placeholder="4242 4242 4242 4242"
								className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
							/>
						</div>

						<div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
							<div className="flex flex-col gap-2">
								<label htmlFor="expiry" className="text-xs font-bold text-gray-400 uppercase tracking-wide">Expiry</label>
								<input
									type="text"
									id="expiry"
									name="expiry"
									placeholder="MM/YY"
									className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label htmlFor="cvc" className="text-xs font-bold text-gray-400 uppercase tracking-wide">CVC</label>
								<input
									type="text"
									id="cvc"
									name="cvc"
									placeholder="123"
									className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
								/>
							</div>
						</div>
					</div>

					<span className="p-4 bg-gray-100 rounded-xl border border-gray-200 flex items-center gap-3">
						<Shield className="w-5 h-5 text-emerald-500 shrink-0" />
						<p className="text-xs text-gray-600">
							Your payment is encrypted and secured by Stripe. We never store your card details.
						</p>
					</span>

					<button className="w-full bg-[#4338ca] hover:bg-[#3730a3] transition-colors text-white font-bold flex items-center justify-center gap-2 rounded-2xl p-4 sm:p-5 text-base sm:text-lg cursor-pointer">
						<Shield className="w-5 h-5 shrink-0" />
						Pay ${course.price} · Enroll Now
					</button>

					<p className="text-xs text-gray-400 text-center">
						By enrolling you agree to our <a href="#" className="text-[#4f46e5] hover:underline">Terms of Service</a>
					</p>
				</div>

				<div className="lg:col-span-2 flex flex-col gap-4">
					<div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-5">
						<h1 className="font-bold text-xl">Order Summary</h1>

						<div className="flex gap-3">
							<div className="w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden shrink-0 relative">
								<Image
									src={course.imageUrl}
									alt={course.title}
									fill
									className="object-cover"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<h2 className="font-bold text-sm sm:text-base leading-tight">{course.title}</h2>
								<div className="flex items-center gap-1">
									<div className="flex items-center gap-0.5">
										{Array.from({ length: 5 }).map((_, i) => (
											<Star
												key={i}
												className={`w-4 h-4 ${i < Math.round(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
											/>
										))}
									</div>
									<span className="text-xs font-bold">{course.rating.toFixed(1)}</span>
								</div>
							</div>
						</div>

						<hr className="border-gray-200" />

						<div className="flex flex-col gap-2 text-sm">
							<div className="flex justify-between text-gray-500">
								<span>Original price</span>
								<span className="line-through">${originalPrice}</span>
							</div>
							<div className="flex justify-between text-emerald-600">
								<span>Discount</span>
								<span>-${discount}</span>
							</div>
						</div>

						<hr className="border-gray-200" />

						<div className="flex justify-between items-center">
							<span className="font-bold text-lg">Total</span>
							<span className="font-bold text-lg">${course.price}</span>
						</div>
					</div>

					<div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col gap-1">
						<div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
							<Shield className="w-4 h-4" />
							30-Day Guarantee
						</div>
						<p className="text-xs text-emerald-700">
							Not satisfied? Get a full refund within 30 days, no questions asked.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}