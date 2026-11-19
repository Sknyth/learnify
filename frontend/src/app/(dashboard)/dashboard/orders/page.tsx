import { getCurrentUser } from '@/lib/getCurrentUser'
import { redirect } from 'next/navigation'
import { serverFetch } from '@/lib/serverApi'
import OrdersTable from '@/features/dashboard/components/OrdersTable'
import { OrderEnrollmentDto } from '@/types'

async function getOrders(): Promise<OrderEnrollmentDto[]> {
	try {
		const res = await serverFetch('/api/enrollments/orders')
		if (!res.ok) throw new Error('Failed to fetch orders')
		return res.json()
	} catch (error) {
		console.error('Error fetching orders:', error)
		return []
	}
}

export default async function Page() {
	const user = await getCurrentUser()
	if (!user) redirect('/signIn')

	const orders = await getOrders()
	return (
		<div className="flex">
			<div className="min-w-0 flex-1 md:ml-64 py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-6 sm:gap-10 pt-16 sm:pt-20">
				<div className="flex flex-col justify-start items-start gap-1">
					<h1 className="text-2xl sm:text-3xl font-bold">Orders</h1>
				</div>

				<OrdersTable orders={orders} />
			</div>
		</div>
	)
}
