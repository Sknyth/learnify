"use client"

import { BookOpen, Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function MobileNav() {
	return (
		<Sheet>
			<SheetTrigger
				render={
					<button className="md:hidden p-2 -mr-2 rounded-lg hover:bg-gray-50 transition-colors" aria-label="Toggle menu">
						<Menu className="w-6 h-6" />
					</button>
				}
			/>
			<SheetContent side="right" className="w-72">
				<SheetHeader>
					<SheetTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
						<div className="w-8 h-8 rounded-lg bg-[#4f46e5] flex items-center justify-center shrink-0">
							<BookOpen className="w-4 h-4 text-white" strokeWidth={2} />
						</div>
						Learnify
					</SheetTitle>
				</SheetHeader>

				<div className="flex flex-col gap-1 px-4">
					<a href="#" className="text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-3">Courses</a>
					<a href="#" className="text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-3">Dashboard</a>
					<a href="#" className="text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-3">Admin</a>

					<div className="h-px bg-gray-200 my-3" />

					<div className="flex flex-col gap-2">
						<a href="#" className="text-sm font-bold text-center text-gray-600 border border-gray-300 hover:border-gray-400 transition-colors rounded-lg px-4 py-3">
							Login
						</a>
						<a href="#" className="text-sm font-bold text-center text-white bg-[#4f46e5] hover:bg-[#4338ca] transition-colors rounded-lg px-4 py-3">
							Sign Up
						</a>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}