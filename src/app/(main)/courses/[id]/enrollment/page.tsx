import { prisma } from '@/lib/prisma'
import { Shield, Star } from 'lucide-react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import EnrrollmentForm from '@/components/EnrrollmentForm'

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
				
				<EnrrollmentForm courseId={id} price={course.price} />

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