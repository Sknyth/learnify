import { BookOpen } from 'lucide-react'

export default function InfoBoxDashboard() {
	return (
		<div className="bg-white border rounded-2xl p-6 gap-5 flex flex-col">
			<div className="rounded-3xl bg-[#4f46e5]/10 w-9 h-9 items-center flex justify-center">
				<BookOpen className="text-[#4f46e5] w-5 h-5" />
			</div>

			<div>
				<h1 className="font-bold text-2xl">3</h1>

				<p className="text-sm text-gray-500 p-0 m-0">Courses</p>
			</div>
		</div>
	)
}
