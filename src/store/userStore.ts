import { create } from 'zustand'

type User = {
	id: string
	name: string
	email: string
} | null

type UserStore = {
	user: User
	setUser: (user: User) => void
	clearUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	clearUser: () => set({ user: null })
}))