import AsideDashboard from '@/components/AsideDashboard'
import InfoBoxDashboard from '@/components/InfoBoxDashboard'
import InfoCourseDashboard from '@/components/InfoCourseDashboard'

export default function Page() {
	return (
		<div className="flex min-h-screen">
			<AsideDashboard />
			<div className="py-8 sm:py-12 px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col mx-auto w-full gap-6 sm:gap-10">
				<div className="flex flex-col justify-start items-start">
					<h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
					<h2 className="text-gray-500 text-sm sm:text-base">You have 3 active courses.</h2>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<InfoBoxDashboard />
					<InfoBoxDashboard />
					<InfoBoxDashboard />
				</div>

				<div className="flex flex-col gap-4">
					<InfoCourseDashboard />
					<InfoCourseDashboard />
					<InfoCourseDashboard />
				</div>
			</div>
		</div>
	)
}