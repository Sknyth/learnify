"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useCoursesStore } from "@/store/coursesStore"
import Course from "@/components/Course"

const categories = ["All", "WebDev", "Design", "DataScience", "DevOps", "Mobile"]
const categoryLabels: Record<string, string> = {
	All: "All",
	WebDev: "Web Dev",
	Design: "Design",
	DataScience: "Data Science",
	DevOps: "DevOps",
	Mobile: "Mobile",
}

const levels = ["All", "Beginner", "Intermediate", "Advanced"]

export default function Page() {
	const courses = useCoursesStore((state) => state.courses)
	const [search, setSearch] = useState("")
	const [category, setCategory] = useState("All")
	const [level, setLevel] = useState("All")

	const filteredCourses = courses.filter((course) => {
		const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase())
		const matchesCategory = category === "All" || course.category === category
		const matchesLevel = level === "All" || course.level === level
		return matchesSearch && matchesCategory && matchesLevel
	})

	return (
		<main className="min-h-screen">
			<section className="flex flex-col items-start justify-center gap-6 sm:gap-8 py-12 px-8 sm:px-12 lg:px-24">
				<div className="flex flex-col gap-2">
					<h1 className="text-4xl font-bold">Explore Courses</h1>
					<p className="text-gray-600">500+ courses across every discipline.</p>
				</div>

				<input
					type="search"
					id="search"
					name="search"
					placeholder="Search courses..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full sm:w-1/2"
				/>
			</section>

			<section className="flex flex-col lg:flex-row items-start justify-center gap-6 py-12 px-8 sm:px-12 lg:px-24 border bg-gray-100">
				<aside className="flex flex-col gap-6 p-4 bg-white rounded-2xl border w-full lg:w-56 shrink-0">
					<div className="flex flex-col gap-1">
						<h1 className="text-gray-400 uppercase font-bold text-sm px-4">Category</h1>
						<ul className="flex flex-col gap-1">
							{categories.map((cat) => (
								<li
									key={cat}
									onClick={() => setCategory(cat)}
									className={cn(
										"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer",
										category === cat && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca] font-semibold"
									)}
								>
									{categoryLabels[cat]}
								</li>
							))}
						</ul>
					</div>

					<div className="flex flex-col gap-1">
						<h1 className="text-gray-400 uppercase font-bold text-sm px-4">Level</h1>
						<ul className="flex flex-col gap-1">
							{levels.map((lvl) => (
								<li
									key={lvl}
									onClick={() => setLevel(lvl)}
									className={cn(
										"text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer",
										level === lvl && "bg-[#4338ca]/10 text-[#4338ca] hover:bg-[#4338ca]/10 hover:text-[#4338ca] font-semibold"
									)}
								>
									{lvl}
								</li>
							))}
						</ul>
					</div>
				</aside>

				<div className="flex-1 w-full">
					{filteredCourses.length === 0 ? (
						<p className="text-gray-500 text-sm px-4">No courses found.</p>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
							{filteredCourses.map((course) => (
								<Course key={course.id} course={course} />
							))}
						</div>
					)}
				</div>
			</section>
		</main>
	)
}