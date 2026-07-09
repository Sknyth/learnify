import { create } from 'zustand'

export type Course = {
	id: string
	title: string
	description: string
	category: string
	level: string
	price: number
	duration: string
	imageUrl: string
	rating: number
	reviewsCount: number
	studentsCount: number
}

type CoursesStore = {
	courses: Course[]
	setCourses: (courses: Course[]) => void
}

export const useCoursesStore = create<CoursesStore>((set) => ({
	courses: [],
	setCourses: (courses) => set({ courses }),
}))