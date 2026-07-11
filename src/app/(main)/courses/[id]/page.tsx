import Curriculum from '@/components/AccordionModuleCourse'
import { prisma } from '@/lib/prisma'
import { CheckCircle, CirclePlay, Clock, Globe, Star, Shield, Award, Infinity as InfinityIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	if (!id) return notFound()

	const course = await prisma.course.findUnique({
		where: { id },
		include: {
			modules: {
				orderBy: { order: 'asc' },
				include: {
					lessons: { orderBy: { order: 'asc' } }
				}
			}
		}
	})

	if (!course) return notFound()

	const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0)

	return (
		<div className="min-h-screen">
			<section className="flex flex-col items-start justify-center gap-4 py-12 px-8 sm:px-12 lg:px-24 bg-[#0f0f1a] text-white">
				<div className="flex gap-2">
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#4f46e5] text-white">
						{course.category}
					</span>
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-white">
						{course.level}
					</span>
				</div>
				<h1 className="font-bold text-3xl sm:text-4xl">{course.title}</h1>
				<p className="text-gray-400 text-base sm:text-lg w-full sm:w-2/3">{course.description}</p>

				<div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
					<div className="flex flex-wrap items-center gap-4 text-gray-300">
						<span className="flex items-center gap-1.5">
							<Clock className="w-4 h-4" />
							{course.duration}
						</span>
						<span className="flex items-center gap-1.5">
							<CirclePlay className="w-4 h-4" />
							{totalLessons} lessons
						</span>
						<span className="flex items-center gap-1.5">
							<Globe className="w-4 h-4" />
							English
						</span>
					</div>

					<div className="flex items-center gap-2 flex-wrap">
						<div className="flex items-center gap-0.5">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									className={`w-4 h-4 ${i < Math.round(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
								/>
							))}
						</div>
						<span className="font-bold text-sm">{course.rating.toFixed(1)}/5</span>
						<span className="text-gray-400 text-sm">({course.reviewsCount.toLocaleString()})</span>
					</div>
				</div>
			</section>

			<section className="flex flex-col lg:flex-row items-start justify-center gap-8 py-12 px-8 sm:px-12 lg:px-24">
				<div className="flex flex-col gap-8 w-full lg:w-2/3">
					<div className="border py-6 p-4 rounded-2xl flex flex-col gap-4">
						<h1 className="text-lg font-bold">What you will learn</h1>
						<div className="grid sm:grid-cols-2 gap-3">
							{course.learningPoints.map((point, i) => (
								<div key={i} className="flex items-start gap-2">
									<CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
									<span>{point}</span>
								</div>
							))}
						</div>
					</div>

					<Curriculum modules={course.modules} />
				</div>

				<aside className="w-full lg:w-1/3 lg:sticky lg:top-24 flex flex-col gap-4">
					<div className="border rounded-2xl overflow-hidden">
						<div className="w-full h-48 relative">
							<Image
								src={course.imageUrl}
								alt={course.title}
								fill
								className="object-cover"
							/>
						</div>

						<div className="p-6 flex flex-col gap-4">
							<div className="flex items-center gap-2">
								<span className="text-3xl font-bold">${course.price}</span>
							</div>

							<Link href={`/courses/${id}/enrollment`} className="w-full bg-[#4f46e5] hover:bg-[#4338ca] transition-colors text-white font-bold py-3 rounded-xl text-center">
								Enroll Now
							</Link>
							<button className="w-full border border-gray-300 hover:border-gray-400 transition-colors font-bold py-3 rounded-xl">
								Try Free Preview
							</button>

							<div className="flex flex-col gap-3 pt-2 text-sm text-gray-600">
								<span className="flex items-center gap-2">
									<Clock className="w-4 h-4" />
									{course.duration} of video content
								</span>
								<span className="flex items-center gap-2">
									<InfinityIcon className="w-4 h-4" />
									Full lifetime access
								</span>
								<span className="flex items-center gap-2">
									<Shield className="w-4 h-4" />
									30-day money-back guarantee
								</span>
								<span className="flex items-center gap-2">
									<Award className="w-4 h-4" />
									Certificate of completion
								</span>
							</div>
						</div>
					</div>
				</aside>
			</section>
		</div>
	)
}